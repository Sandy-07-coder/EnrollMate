/**
 * Time slot utilities for handling both 1-hour and 2-hour time slots
 */

// All available 1-hour time slots
export const ONE_HOUR_SLOTS = ["8-9", "9-10", "10-11", "11-12", "1-2", "2-3", "3-4", "4-5"];

// All available 2-hour time slots (legacy)
export const TWO_HOUR_SLOTS = ["8-10", "10-12", "1-3", "3-5"];

// Combined list of all valid slots
export const ALL_TIME_SLOTS = [...ONE_HOUR_SLOTS, ...TWO_HOUR_SLOTS];

export const parseTimeSlot = (slotString) => {
  if (!slotString || typeof slotString !== 'string') {
    return { start: 0, end: 0 };
  }

  const [startStr, endStr] = slotString.split('-').map(s => s.trim());
  let start = parseInt(startStr, 10);
  let end = parseInt(endStr, 10);

  // Convert PM times (1-5) to 24-hour format for afternoon slots
  // Morning slots: 8, 9, 10, 11, 12 stay as is
  // Afternoon slots: 1, 2, 3, 4, 5 become 13, 14, 15, 16, 17
  if (start >= 1 && start <= 5) {
    start += 12;
  }
  if (end >= 1 && end <= 5) {
    end += 12;
  }

  return { start, end };
};

export const doSlotsOverlap = (slot1, slot2) => {
  if (!slot1 || !slot2) return false;

  const time1 = parseTimeSlot(slot1);
  const time2 = parseTimeSlot(slot2);

  // Two ranges overlap if: start1 < end2 AND start2 < end1
  return time1.start < time2.end && time2.start < time1.end;
};

export const getSlotDuration = (slotString) => {
  const { start, end } = parseTimeSlot(slotString);
  return end - start;
};

export const getSlotSpan = (slotString) => {
  return getSlotDuration(slotString);
};

export const isOneHourSlot = (slotString) => {
  return getSlotDuration(slotString) === 1;
};

export const isTwoHourSlot = (slotString) => {
  return getSlotDuration(slotString) === 2;
};

export const getSlotLabel = (slotString) => {
  const [start, end] = slotString.split('-');
  
  const formatHour = (hour) => {
    const h = parseInt(hour, 10);
    if (h >= 8 && h <= 12) {
      return h === 12 ? "12:00 PM" : `${h}:00 AM`;
    }
    return `${h}:00 PM`;
  };

  return `${formatHour(start)} - ${formatHour(end)}`;
};

export const doCoursesOverlap = (course1, course2) => {
  if (!course1?.slots || !course2?.slots) return false;

  for (const slot1 of course1.slots) {
    for (const slot2 of course2.slots) {
      // Check if same day and overlapping time
      if (slot1.day === slot2.day && doSlotsOverlap(slot1.time, slot2.time)) {
        return true;
      }
    }
  }

  return false;
};

export const expandToOneHourSlots = (slotString) => {
  const { start, end } = parseTimeSlot(slotString);
  const slots = [];
  
  for (let hour = start; hour < end; hour++) {
    // Convert back to 12-hour format for display
    const displayStart = hour > 12 ? hour - 12 : hour;
    const displayEnd = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
    slots.push(`${displayStart}-${displayEnd}`);
  }
  
  return slots;
};
