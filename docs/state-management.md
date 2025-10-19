# State Management Documentation

## Overview

EnrollMate uses React's built-in state management with custom hooks to organize application state. This document describes the state structure, management patterns, and data flow.

---

## State Architecture

### State Location

All primary application state is managed at the **HomePage** level using custom hooks:

- `useNotification`: Notification system state
- `useAvailableCourses`: System-wide available courses
- `useSelectedCourses`: User's personal schedule
- `useModals`: Modal open/closed states

---

## Data Structures

### Course Object (Selected)

Represents a course in the user's personal schedule.

```javascript
{
  id: number,              // Unique identifier
  courseName: string,      // Course name
  staff: string,           // Selected staff member
  credits: number,         // Course credits (1-10)
  color: string,           // Tailwind color class (e.g., "bg-blue-600")
  selectedSlots: [         // Time slots for this course
    {
      day: string,         // Day of week (e.g., "Monday")
      time: string,        // Time slot (e.g., "8-10")
      slotKey: string      // Unique key (e.g., "Monday-8-10")
    }
  ]
}
```

### Available Course Object

Represents a course available in the system (configured by admin).

```javascript
{
  id: number,              // Unique identifier
  courseName: string,      // Course name
  staff: string,           // Default/primary staff member
  credits: number,         // Course credits
  selectedSlots: Array,    // Default time slots (backward compatibility)
  staffOptions: [          // Multiple staff options
    {
      name: string,        // Staff member name
      department: string,  // Department (optional)
      selectedSlots: [     // Staff-specific time slots
        {
          day: string,
          time: string,
          slotKey: string
        }
      ]
    }
  ]
}
```

### Notification Object

```javascript
{
  isOpen: boolean,         // Whether notification is visible
  type: string,            // "success" | "error" | "warning" | "info"
  title: string,           // Notification title
  message: string          // Notification message
}
```

---

## Custom Hooks

### useNotification()

**File**: `src/utils/hooks.js`

**Purpose**: Manages notification state and provides helper functions.

**Returns**:

```javascript
{
  notification: Object,            // Current notification state
  showNotification: Function,      // (type, title, message) => void
  closeNotification: Function      // () => void
}
```

**Usage Example**:

```javascript
const { notification, showNotification, closeNotification } = useNotification();

// Show success notification
showNotification(
  "success",
  "Course Added",
  "Course successfully added to schedule"
);

// In JSX
<NotificationModal
  isOpen={notification.isOpen}
  onClose={closeNotification}
  type={notification.type}
  title={notification.title}
  message={notification.message}
/>;
```

---

### useAvailableCourses(showNotification)

**File**: `src/utils/hooks.js`

**Purpose**: Manages system-wide available courses.

**Parameters**:

- `showNotification`: Function to show notifications

**Returns**:

```javascript
{
  availableCourses: Array,         // List of available courses
  saveCourse: Function             // (courseData) => void
}
```

**Logic**:

1. Check if course exists by name
2. If exists, check if staff already exists
3. If staff is new, add to staffOptions array
4. If course is new, create with initial staff option
5. Show appropriate notification

**Usage Example**:

```javascript
const { availableCourses, saveCourse } = useAvailableCourses(showNotification);

const newCourse = {
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
};

saveCourse(newCourse);
```

---

### useSelectedCourses(showNotification)

**File**: `src/utils/hooks.js`

**Purpose**: Manages user's selected courses (personal schedule).

**Parameters**:

- `showNotification`: Function to show notifications

**Returns**:

```javascript
{
  courses: Array,                  // User's selected courses
  selectCourse: Function,          // (courseData) => void
  removeCourse: Function           // (courseId) => void
}
```

**Logic for selectCourse**:

1. Validate course has time slots
2. Check if course already exists
3. If exists, validate no conflicts (excluding itself)
4. If valid, update course preserving color and ID
5. If new, validate no conflicts with any course
6. If valid, assign color and add course
7. Show appropriate notification on error

**Usage Example**:

```javascript
const { courses, selectCourse, removeCourse } = useSelectedCourses(showNotification);

// Add course to schedule
selectCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});

// Remove course
removeCourse(1);
```

---

### useModals()

**File**: `src/utils/hooks.js`

**Purpose**: Manages modal open/closed states.

**Returns**:

```javascript
{
  isAddCourseModalOpen: boolean,
  isAvailableCoursesModalOpen: boolean,
  openAddCourseModal: Function,          // () => void
  closeAddCourseModal: Function,         // () => void
  openAvailableCoursesModal: Function,   // () => void
  closeAvailableCoursesModal: Function   // () => void
}
```

**Usage Example**:

```javascript
const {
  isAddCourseModalOpen,
  openAddCourseModal,
  closeAddCourseModal
} = useModals();

<AddCourseBtn onClick={openAddCourseModal} />

<SelectCourseModal
  isOpen={isAddCourseModalOpen}
  onClose={closeAddCourseModal}
  onSave={saveCourse}
/>
```

---

## State Update Patterns

### Adding Available Course

```javascript
// New course
saveCourse({
  courseName: "New Course",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});

// Result: New course added with one staff option
```

### Adding Staff to Existing Course

```javascript
// Same course name, different staff
saveCourse({
  courseName: "Existing Course",
  staff: "Dr. Johnson",  // Different staff
  credits: 3,
  selectedSlots: [...]
});

// Result: Staff added to existing course's staffOptions array
```

### Selecting Course for Schedule

```javascript
// First time selection
selectCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});

// Result: Course added with auto-assigned color
```

### Changing Staff for Selected Course

```javascript
// Select same course with different staff
selectCourse({
  courseName: "Data Structures",  // Same course
  staff: "Dr. Johnson",            // Different staff
  credits: 3,
  selectedSlots: [...]             // Different time slots
});

// Result: Existing course updated with new staff and slots, color preserved
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│         HomePage Component State            │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │    useNotification()                 │  │
│  │  - notification state                │  │
│  │  - show/close functions              │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │    useAvailableCourses()             │  │
│  │  - availableCourses array            │  │
│  │  - saveCourse function               │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │    useSelectedCourses()              │  │
│  │  - courses array (user schedule)     │  │
│  │  - selectCourse function             │  │
│  │  - removeCourse function             │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │    useModals()                       │  │
│  │  - modal states                      │  │
│  │  - open/close functions              │  │
│  └──────────────────────────────────────┘  │
└─────────────────┬───────────────────────────┘
                  │
                  │ Props Down
                  ▼
    ┌─────────────────────────────┐
    │   Child Components          │
    │  - TimeTable                │
    │  - CoursesList              │
    │  - Modals                   │
    │  - etc.                     │
    └─────────────────────────────┘
                  │
                  │ Callbacks Up
                  ▼
    ┌─────────────────────────────┐
    │   State Update Functions    │
    │  - saveCourse()             │
    │  - selectCourse()           │
    │  - removeCourse()           │
    │  - showNotification()       │
    └─────────────────────────────┘
```

---

## Best Practices

### 1. Single Source of Truth

- All critical state lives in HomePage
- Child components receive data via props
- Changes propagate through callbacks

### 2. Immutable Updates

```javascript
// ✅ Correct: Create new array
setCourses((prev) => [...prev, newCourse]);

// ❌ Wrong: Mutate existing array
courses.push(newCourse);
setCourses(courses);
```

### 3. Functional Updates

```javascript
// ✅ Correct: Use functional update when depending on previous state
setCourses((prev) => prev.filter((c) => c.id !== courseId));

// ❌ Risky: Direct reference to state
setCourses(courses.filter((c) => c.id !== courseId));
```

### 4. Derived State

Compute values from state rather than storing them:

```javascript
// ✅ Correct: Compute when needed
const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

// ❌ Wrong: Store derived value in state
const [totalCredits, setTotalCredits] = useState(0);
```

---

## Common State Operations

### Check if Course Exists in Schedule

```javascript
const courseExists = courses.some((c) => c.courseName === courseName);
```

### Find Course by ID

```javascript
const course = courses.find((c) => c.id === courseId);
```

### Update Specific Course

```javascript
setCourses((prev) =>
  prev.map((c) => (c.id === courseId ? { ...c, staff: newStaff } : c))
);
```

### Filter Courses

```javascript
setCourses((prev) => prev.filter((c) => c.id !== courseId));
```

### Calculate Totals

```javascript
const totalCourses = courses.length;
const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
```

---

## State Persistence

Currently, state is **not persisted** and resets on page reload. For persistence, consider:

1. **localStorage**: Simple key-value storage

   ```javascript
   // Save
   localStorage.setItem("courses", JSON.stringify(courses));

   // Load
   const saved = JSON.parse(localStorage.getItem("courses") || "[]");
   ```

2. **sessionStorage**: Session-only persistence

3. **Backend API**: Server-side persistence

   - Save courses to database
   - Fetch on component mount
   - Sync on changes

4. **State Management Libraries**: Redux, Zustand, Jotai for complex apps
