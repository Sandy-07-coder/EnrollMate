# Usage Examples

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Adding New Courses (Admin)](#adding-new-courses-admin)
3. [Selecting Courses (Student)](#selecting-courses-student)
4. [Managing Staff](#managing-staff)
5. [Handling Conflicts](#handling-conflicts)
6. [Common Workflows](#common-workflows)

---

## Basic Setup

### Starting the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Initial State

When the application first loads:

- Available courses list is empty
- User's schedule is empty
- No time slots are occupied

---

## Adding New Courses (Admin)

### Example 1: Add a Simple Course

```javascript
// User clicks "Add New Course" button
// Fills in the form:
{
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [
    { day: "Monday", time: "8-10", slotKey: "Monday-8-10" },
    { day: "Wednesday", time: "8-10", slotKey: "Wednesday-8-10" }
  ]
}

// Result: Course added to availableCourses
```

### Example 2: Add Multiple Staff for Same Course

```javascript
// First staff member
{
  courseName: "Operating Systems",
  staff: "Dr. Johnson",
  credits: 4,
  selectedSlots: [
    { day: "Tuesday", time: "10-12" },
    { day: "Thursday", time: "10-12" }
  ]
}

// Second staff member (same course name)
{
  courseName: "Operating Systems",  // Same name
  staff: "Prof. Williams",           // Different staff
  credits: 4,
  selectedSlots: [
    { day: "Monday", time: "1-3" },
    { day: "Wednesday", time: "1-3" }
  ]
}

// Result: One course with two staff options
availableCourses = [{
  courseName: "Operating Systems",
  credits: 4,
  staffOptions: [
    {
      name: "Dr. Johnson",
      selectedSlots: [...]  // Tuesday/Thursday slots
    },
    {
      name: "Prof. Williams",
      selectedSlots: [...]  // Monday/Wednesday slots
    }
  ]
}]
```

### Example 3: Add Course Without Conflict Checking

```javascript
// Admin adds a course
// checkConflicts = false for "Add New Course" modal

// Even if time slots conflict with existing courses,
// the course is still added to availableCourses
// This allows admins to set up the course catalog
```

---

## Selecting Courses (Student)

### Example 1: Select First Course

```javascript
// User clicks "Select Available Course"
// Browses available courses
// Clicks on "Data Structures"

// If course has only one staff:
// Course is immediately added to schedule with auto-assigned color

// Result:
courses = [{
  id: 1,
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  color: "bg-blue-600",  // Auto-assigned
  selectedSlots: [...]
}]
```

### Example 2: Select Course with Multiple Staff

```javascript
// User clicks "Operating Systems"
// Modal appears showing staff options:
// 1. Dr. Johnson (Tuesday/Thursday 10-12)
// 2. Prof. Williams (Monday/Wednesday 1-3)

// User selects "Dr. Johnson"

// Result:
courses = [
  {
    id: 1,
    courseName: "Operating Systems",
    staff: "Dr. Johnson", // Selected staff
    credits: 4,
    color: "bg-green-600",
    selectedSlots: [
      { day: "Tuesday", time: "10-12" },
      { day: "Thursday", time: "10-12" },
    ],
  },
];
```

### Example 3: Change Staff for Existing Course

```javascript
// User already has "Operating Systems" with Dr. Johnson
// User clicks "Operating Systems" again
// Modal shows "Change Staff" indicator
// User selects "Prof. Williams"

// Result:
// Course is UPDATED, not duplicated
// Color and ID are preserved
courses = [
  {
    id: 1, // Same ID
    courseName: "Operating Systems",
    staff: "Prof. Williams", // Updated staff
    credits: 4,
    color: "bg-green-600", // Same color
    selectedSlots: [
      { day: "Monday", time: "1-3" },
      { day: "Wednesday", time: "1-3" },
    ], // Updated slots
  },
];
```

### Example 4: Remove Course

```javascript
// User clicks "Remove" button on a course

removeCourse(courseId);

// Result: Course removed from schedule
// Time slots become available
// Color returns to pool
```

---

## Managing Staff

### Scenario: Course with 3 Instructors

```javascript
// Available course configuration
{
  courseName: "Database Systems",
  credits: 3,
  staffOptions: [
    {
      name: "Dr. Anderson",
      selectedSlots: [
        { day: "Monday", time: "8-10" },
        { day: "Wednesday", time: "8-10" }
      ]
    },
    {
      name: "Dr. Martinez",
      selectedSlots: [
        { day: "Tuesday", time: "1-3" },
        { day: "Thursday", time: "1-3" }
      ]
    },
    {
      name: "Prof. Chen",
      selectedSlots: [
        { day: "Friday", time: "10-12" },
        { day: "Saturday", time: "10-12" }
      ]
    }
  ]
}

// Student workflow:
// 1. Click "Database Systems"
// 2. See all 3 options with time slots preview
// 3. Select preferred instructor based on schedule
// 4. Course added with selected instructor's slots
```

---

## Handling Conflicts

### Example 1: Conflict Prevention

```javascript
// User has selected:
courses = [
  {
    courseName: "Data Structures",
    selectedSlots: [{ day: "Monday", time: "8-10" }],
  },
];

// User tries to select "Operating Systems" with slot:
// Monday 8-10 (same as Data Structures)

// Result: ❌ Conflict detected
// Notification shown: "Schedule Conflict"
// Course NOT added to schedule
```

### Example 2: Conflict When Changing Staff

```javascript
// User has:
courses = [
  {
    id: 1,
    courseName: "Database Systems",
    staff: "Dr. Anderson",
    selectedSlots: [{ day: "Monday", time: "8-10" }],
  },
  {
    id: 2,
    courseName: "Operating Systems",
    staff: "Dr. Johnson",
    selectedSlots: [{ day: "Tuesday", time: "10-12" }],
  },
];

// User tries to change "Database Systems" to "Prof. Chen"
// Prof. Chen's slots: Tuesday 10-12 (conflicts with Operating Systems)

// Result: ❌ Conflict detected
// Notification shown: "Schedule Conflict"
// Original staff (Dr. Anderson) preserved
```

### Example 3: No Conflict When Changing Staff (Success)

```javascript
// User has:
courses = [
  {
    id: 1,
    courseName: "Database Systems",
    staff: "Dr. Anderson",
    selectedSlots: [{ day: "Monday", time: "8-10" }],
  },
];

// User changes to "Dr. Martinez"
// Dr. Martinez's slots: Tuesday 1-3 (no conflicts)

// Result: ✅ Success
// Course updated with new staff and slots
// No other courses affected
```

---

## Common Workflows

### Workflow 1: Complete Setup (Admin → Student)

```javascript
// ADMIN: Add courses to system
// Step 1: Add Data Structures
saveCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});

// Step 2: Add another staff for same course
saveCourse({
  courseName: "Data Structures",
  staff: "Prof. Davis",
  credits: 3,
  selectedSlots: [...]
});

// Step 3: Add different course
saveCourse({
  courseName: "Web Development",
  staff: "Dr. Lee",
  credits: 4,
  selectedSlots: [...]
});

// STUDENT: Build schedule
// Step 1: Select Data Structures (choose Dr. Smith)
selectCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  ...
});

// Step 2: Select Web Development
selectCourse({
  courseName: "Web Development",
  staff: "Dr. Lee",
  ...
});

// Step 3: Decide to change to Prof. Davis
selectCourse({
  courseName: "Data Structures",
  staff: "Prof. Davis",  // Changed
  ...
});

// Final schedule has 2 courses with chosen instructors
```

### Workflow 2: Handling Full Schedule

```javascript
// User builds a full schedule
const fullSchedule = [
  {
    courseName: "Course A",
    selectedSlots: [
      { day: "Monday", time: "8-10" },
      { day: "Wednesday", time: "8-10" },
    ],
  },
  {
    courseName: "Course B",
    selectedSlots: [
      { day: "Monday", time: "10-12" },
      { day: "Wednesday", time: "10-12" },
    ],
  },
  {
    courseName: "Course C",
    selectedSlots: [
      { day: "Tuesday", time: "8-10" },
      { day: "Thursday", time: "8-10" },
    ],
  },
  {
    courseName: "Course D",
    selectedSlots: [
      { day: "Tuesday", time: "1-3" },
      { day: "Thursday", time: "1-3" },
    ],
  },
  {
    courseName: "Course E",
    selectedSlots: [{ day: "Friday", time: "10-12" }],
  },
];

// Visual result: Colorful timetable with no conflicts
// Total: 5 courses, distributed across the week
```

### Workflow 3: Error Recovery

```javascript
// User accidentally tries to add conflicting course
selectCourse(conflictingCourse);

// Result: Error notification appears
// User clicks "Got it" on notification
// Notification closes
// User can try different course or staff option
// Original schedule unchanged
```

---

## Code Integration Examples

### Example 1: Using Custom Hooks in HomePage

```jsx
import React from "react";
import {
  useNotification,
  useAvailableCourses,
  useSelectedCourses,
  useModals,
} from "../utils/hooks";

function HomePage() {
  // Set up hooks
  const { notification, showNotification, closeNotification } =
    useNotification();
  const { availableCourses, saveCourse } =
    useAvailableCourses(showNotification);
  const { courses, selectCourse, removeCourse } =
    useSelectedCourses(showNotification);
  const { isAddCourseModalOpen, openAddCourseModal, closeAddCourseModal } =
    useModals();

  return (
    <div>
      {/* Components */}
      <TimeTable courses={courses} />
      <CoursesList courses={courses} onRemoveCourse={removeCourse} />

      {/* Modals */}
      <SelectCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={closeAddCourseModal}
        onSave={saveCourse}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={closeNotification}
        {...notification}
      />
    </div>
  );
}
```

### Example 2: Using Utility Functions

```jsx
import {
  hasTimeSlotConflict,
  getNextAvailableColor,
} from "../utils/courseUtils";
import { DAYS, TIME_SLOTS, COURSE_COLORS } from "../utils/constants";

// Check for conflict
const hasConflict = hasTimeSlotConflict({
  day: "Monday",
  time: "8-10",
  courses: selectedCourses,
});

// Get next color
const newColor = getNextAvailableColor(selectedCourses);

// Use constants
DAYS.forEach((day) => {
  TIME_SLOTS.forEach((time) => {
    // Create timetable grid
  });
});
```

---

## Testing Scenarios

### Test 1: Add and Select Course

1. Click "Add New Course"
2. Fill in: Name="Test Course", Staff="Dr. Test", Credits=3
3. Select Monday 8-10, Wednesday 8-10
4. Click "Add Course"
5. Click "Select Available Course"
6. Click on "Test Course"
7. ✅ Course should appear in timetable with color

### Test 2: Conflict Detection

1. Add course with Monday 8-10
2. Try to add another course with Monday 8-10
3. ✅ Should show conflict error
4. ✅ Second course should NOT be added

### Test 3: Staff Change

1. Add course with 2 staff options
2. Select course with Staff A
3. Click course again, select Staff B
4. ✅ Course should update (not duplicate)
5. ✅ Color should remain same
6. ✅ Time slots should change to Staff B's slots

### Test 4: Remove Course

1. Select 3 courses
2. Remove middle course
3. ✅ Course should disappear from list and timetable
4. ✅ Its time slots should become free
5. ✅ Other courses should remain unchanged
