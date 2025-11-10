/**
 * Downloads the timetable as a styled HTML file
 * @param {Array} selectedCourses - Array of selected courses
 * @param {string} filename - The name for the HTML file
 * @returns {Promise<Object>}
 */
export const downloadTimetableHTML = async (selectedCourses, filename = 'timetable') => {
    try {
        // Days and time slots
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = [
            { label: '8:00 AM - 10:00 AM', value: '8-10' },
            { label: '10:00 AM - 12:00 PM', value: '10-12' },
            { label: '1:00 PM - 3:00 PM', value: '1-3' },
            { label: '3:00 PM - 5:00 PM', value: '3-5' }
        ];

        // Create timetable grid
        const timetableGrid = {};
        days.forEach(day => {
            timetableGrid[day] = {};
        });

        // Fill timetable with courses
        selectedCourses.forEach(course => {
            if (course.slots && Array.isArray(course.slots)) {
                course.slots.forEach(slot => {
                    if (!timetableGrid[slot.day]) {
                        timetableGrid[slot.day] = {};
                    }
                    timetableGrid[slot.day][slot.time] = course;
                });
            }
        });

        // Generate color for each course
        const courseColors = {};
        const colors = [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
            '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#84CC16'
        ];
        selectedCourses.forEach((course, index) => {
            courseColors[course.uniqueId] = colors[index % colors.length];
        });

        // Calculate total credits
        const totalCredits = selectedCourses.reduce((sum, course) => sum + (course?.credits || 0), 0);

        // Generate HTML content
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Timetable - EnrollMate</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1e293b 0%, #111827 100%);
      color: #e5e7eb;
      padding: 40px 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: rgba(31, 41, 55, 0.8);
      border-radius: 20px;
      border: 1px solid rgba(75, 85, 99, 0.5);
    }
    
    .header h1 {
      font-size: 42px;
      background: linear-gradient(to right, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #9ca3af;
      font-size: 16px;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
    }
    
    .stat-item {
      background: rgba(55, 65, 81, 0.5);
      padding: 15px 30px;
      border-radius: 12px;
      border: 1px solid rgba(75, 85, 99, 0.3);
    }
    
    .stat-label {
      color: #9ca3af;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    .stat-value {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }
    
    .timetable-container {
      background: rgba(31, 41, 55, 0.8);
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 40px;
      border: 1px solid rgba(75, 85, 99, 0.5);
      overflow-x: auto;
    }
    
    .timetable {
      width: 100%;
      border-collapse: collapse;
      min-width: 1000px;
    }
    
    .timetable th {
      background: rgba(55, 65, 81, 0.8);
      padding: 15px 10px;
      text-align: center;
      font-weight: 600;
      border: 1px solid rgba(75, 85, 99, 0.5);
      color: #60a5fa;
    }
    
    .timetable td {
      padding: 10px;
      border: 1px solid rgba(75, 85, 99, 0.5);
      text-align: center;
      min-height: 80px;
      background: rgba(17, 24, 39, 0.5);
    }
    
    .time-slot {
      background: rgba(55, 65, 81, 0.6);
      font-weight: 600;
      color: #9ca3af;
      font-size: 13px;
    }
    
    .course-cell {
      padding: 12px 8px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      line-height: 1.4;
    }
    
    .course-name {
      margin-bottom: 4px;
    }
    
    .course-id {
      font-size: 11px;
      opacity: 0.9;
    }
    
    .courses-list {
      background: rgba(31, 41, 55, 0.8);
      border-radius: 20px;
      padding: 30px;
      border: 1px solid rgba(75, 85, 99, 0.5);
    }
    
    .courses-list h2 {
      font-size: 28px;
      background: linear-gradient(to right, #34d399, #14b8a6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 25px;
      text-align: center;
    }
    
    .course-item {
      background: rgba(55, 65, 81, 0.6);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 15px;
      border: 1px solid rgba(75, 85, 99, 0.5);
    }
    
    .course-item h3 {
      color: #fff;
      font-size: 18px;
      margin-bottom: 8px;
    }
    
    .course-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 10px;
      font-size: 14px;
    }
    
    .detail-item {
      color: #9ca3af;
    }
    
    .detail-label {
      color: #60a5fa;
      font-weight: 600;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
    }
    
    @media print {
      body {
        background: white;
        color: black;
      }
      .timetable-container, .courses-list, .header {
        background: white;
        border: 1px solid #ccc;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📚 My Timetable</h1>
      <p>Generated by EnrollMate</p>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-label">Total Courses</div>
          <div class="stat-value">${selectedCourses.length}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Total Credits</div>
          <div class="stat-value">${totalCredits}</div>
        </div>
      </div>
    </div>
    
    <div class="timetable-container">
      <table class="timetable">
        <thead>
          <tr>
            <th style="width: 120px;">Time</th>
            ${days.map(day => `<th>${day}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${timeSlots.map(slot => `
            <tr>
              <td class="time-slot">${slot.label}</td>
              ${days.map(day => {
            const course = timetableGrid[day][slot.value];
            if (course) {
                return `
                    <td>
                      <div class="course-cell" style="background: ${courseColors[course.uniqueId]};">
                        <div class="course-name">${course.courseName}</div>
                        <div class="course-id">${course.uniqueId}</div>
                      </div>
                    </td>
                  `;
            }
            return '<td></td>';
        }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="courses-list">
      <h2>📖 Selected Courses</h2>
      ${selectedCourses.map((course, index) => `
        <div class="course-item">
          <h3>
            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: ${courseColors[course.uniqueId]}; margin-right: 8px;"></span>
            ${course.courseName}
          </h3>
          <div class="course-details">
            <div class="detail-item">
              <span class="detail-label">Unique Id:</span> ${course.uniqueId}
            </div>
            <div class="detail-item">
              <span class="detail-label">Staff:</span> ${course.staff}
            </div>
            <div class="detail-item">
              <span class="detail-label">Credits:</span> ${course.credits}
            </div>
            <div class="detail-item">
              <span class="detail-label">Display Name:</span> ${course.displayName?.toUpperCase() || 'N/A'}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="footer">
      <p>💡 Concept by Prahathieswaran | 💻 Built with ❤️ by Santhosh</p>
      <p>© ${new Date().getFullYear()} EnrollMate. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

        // Create blob and download
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Error generating HTML:', error);
        return { success: false, error: error.message };
    }
};
