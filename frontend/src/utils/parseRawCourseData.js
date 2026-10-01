// Parses raw CAMU enrollment text into EnrollMate course format

const VALID_TIMES = ["8-9", "9-10", "10-11", "11-12", "1-2", "2-3", "3-4", "4-5", "8-10", "10-12", "1-3", "3-5"];
const VALID_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function convertHour(h) {
  return h >= 13 ? h - 12 : h;
}

function parseTimeSlotsFromLine(timeStr) {
  const segments = [];
  const regex = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/g;
  let match;
  while ((match = regex.exec(timeStr)) !== null) {
    const start = parseInt(match[1]);
    const end = parseInt(match[3]);
    if (start < 8 || start >= 20 || end <= 8 || end > 17) continue;
    if (!segments.find(s => s.start === start && s.end === end)) {
      segments.push({ start, end });
    }
  }

  segments.sort((a, b) => a.start - b.start);

  // Merge consecutive 1-hour segments into 2-hour blocks
  const merged = [];
  let i = 0;
  while (i < segments.length) {
    if (i + 1 < segments.length && segments[i].end === segments[i + 1].start) {
      merged.push({ start: segments[i].start, end: segments[i + 1].end });
      i += 2;
    } else {
      merged.push(segments[i]);
      i++;
    }
  }

  return merged
    .map(s => `${convertHour(s.start)}-${convertHour(s.end)}`)
    .filter(t => VALID_TIMES.includes(t));
}

export function parseRawCourseData(rawText) {
  const lines = rawText.split(/\r?\n/).map(l => l.trim());
  const coursesMap = new Map();

  let courseCode = '';
  let credits = 0;
  let displayName = '';
  let section = '';
  let staff = '';
  let slots = [];
  let expectName = false;

  function saveSection() {
    if (section && slots.length > 0 && courseCode) {
      const uid = `priceTab_${courseCode}_${section}`;
      if (!coursesMap.has(uid)) {
        coursesMap.set(uid, {
          uniqueId: uid,
          courseName: `${courseCode} ${displayName} [${credits} Credits]`,
          displayName: displayName || courseCode,
          staff,
          credits,
          slots: [...slots]
        });
      }
    }
    section = '';
    staff = '';
    slots = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line || /^(Full Registration|Courses offered|All Enrolled|Type a subject|No\. of attempts)/.test(line)) continue;

    // Course code line
    const cm = line.match(/^([\dA-Z][\dA-Z\w-]*)\s*\[(\d+)\s*Credits?\]/i);
    if (cm) {
      saveSection();
      courseCode = cm[1];
      credits = parseInt(cm[2]);
      expectName = false;
      continue;
    }

    // Category lines
    if (/OPEN ELECTIVE|PROFESSIONAL|ENGINEERING SCIENCES|HUMANITIES|BASIC SCIENCES|EMPLOYABILITY|OTHERS/i.test(line)) continue;

    if (line === 'Course overview') { expectName = true; continue; }

    if (expectName && !line.startsWith('UG') && !line.startsWith('Date:')) {
      displayName = line;
      expectName = false;
      continue;
    }

    // Section line
    const sm = line.match(/^UG\s*-\s*\d+,\s*(T\d+-[\w-]+),\s*\w+\s*-\s*(.+)$/);
    if (sm) {
      saveSection();
      section = sm[1];
      staff = sm[2].trim();
      slots = [];
      continue;
    }

    if (line.startsWith('Date:')) continue;

    // Day line
    const dm = line.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday):\s*(.+)$/);
    if (dm) {
      const day = dm[1];
      const times = parseTimeSlotsFromLine(dm[2]);
      for (const time of times) {
        if (!slots.find(s => s.day === day && s.time === time)) {
          slots.push({ day, time });
        }
      }
    }
  }

  saveSection();
  return Array.from(coursesMap.values());
}
