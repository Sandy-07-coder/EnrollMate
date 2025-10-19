# Component Documentation

## Overview

This document describes all components in the EnrollMate application, including their purpose, props, and usage examples.

---

## Page Components

### HomePage

**File**: `src/Pages/HomePage.jsx`

**Purpose**: Main application page that orchestrates all functionality, manages state, and renders the course enrollment interface.

**State Management**:

- `availableCourses`: System-wide available courses
- `courses`: User's selected courses (schedule)
- `notification`: Current notification state
- `modalStates`: Open/closed states for various modals

**Key Functions**:

- `handleSaveCourse(courseData)`: Adds/updates courses in available courses
- `handleSelectCourseFromAvailable(courseData)`: Adds course to user's schedule with conflict checking
- `handleRemoveCourse(courseId)`: Removes course from schedule
- `showNotification(type, title, message)`: Displays notification modal

**Usage**: Root component for the main application view.

---

## UI Components

### Header

**File**: `src/components/Header.jsx`

**Purpose**: Displays the application header with the EnrollMate branding.

**Props**: None

**Styling**:

- Sticky positioning at top
- Responsive text sizing
- Dark theme with bottom border

**Usage Example**:

```jsx
import Header from "./components/Header";

function App() {
  return <Header />;
}
```

---

### Footer

**File**: `src/components/Footer.jsx`

**Purpose**: Displays application footer with credits and copyright information.

**Props**: None

**Features**:

- Gradient text effects for creator names
- Animated heart icon
- Responsive layout (column on mobile, row on desktop)
- Dynamic copyright year

**Usage Example**:

```jsx
import Footer from "./components/Footer";

function App() {
  return <Footer />;
}
```

---

### TimeTable

**File**: `src/components/TimeTable.jsx`

**Purpose**: Visualizes the weekly course schedule in a grid format.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| courses | Array | [] | Array of selected courses with time slots |

**Course Object Structure**:

```javascript
{
  id: number,
  courseName: string,
  staff: string,
  credits: number,
  color: string,  // Tailwind color class
  selectedSlots: [
    { day: string, time: string, slotKey: string }
  ]
}
```

**Features**:

- 6-day week (Monday - Saturday)
- 4 time slots per day (8-10, 10-12, 1-3, 3-5)
- Color-coded course cells
- Responsive scrolling on mobile
- Hover effects

**Usage Example**:

```jsx
import TimeTable from "./components/TimeTable";

const courses = [
  {
    id: 1,
    courseName: "Data Structures",
    staff: "Dr. Smith",
    credits: 3,
    color: "bg-blue-600",
    selectedSlots: [
      { day: "Monday", time: "8-10", slotKey: "Monday-8-10" },
      { day: "Wednesday", time: "8-10", slotKey: "Wednesday-8-10" },
    ],
  },
];

<TimeTable courses={courses} />;
```

---

### CoursesList

**File**: `src/components/CoursesList.jsx`

**Purpose**: Displays the sidebar list of selected courses with summary information.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| courses | Array | Yes | Array of selected courses |
| onSelectAvailableCourse | Function | Yes | Callback to open available courses modal |
| onRemoveCourse | Function | Yes | Callback to remove a course |

**Features**:

- Displays course name, staff, and credits
- Color indicator dot for each course
- Remove button for each course
- Total courses and credits summary
- Empty state message

**Usage Example**:

```jsx
import CoursesList from "./components/CoursesList";

<CoursesList
  courses={selectedCourses}
  onSelectAvailableCourse={() => setModalOpen(true)}
  onRemoveCourse={(id) => removeCourse(id)}
/>;
```

---

### AddCourseBtn

**File**: `src/components/AddCourseBtn.jsx`

**Purpose**: Button to open the "Add New Course" modal for administrators.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onClick | Function | Yes | Callback when button is clicked |

**Styling**:

- Blue-to-purple gradient
- Hover scale effect
- Plus icon

**Usage Example**:

```jsx
import AddCourseBtn from "./components/AddCourseBtn";

<AddCourseBtn onClick={() => setAddModalOpen(true)} />;
```

---

### SelectAvailableCourseBtn

**File**: `src/components/SelectAvailableCourseBtn.jsx`

**Purpose**: Button to open the "Available Courses" modal for course selection.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onClick | Function | Yes | Callback when button is clicked |

**Styling**:

- Green-to-teal gradient
- Hover scale effect
- Clipboard check icon

**Usage Example**:

```jsx
import SelectAvailableCourseBtn from "./components/SelectAvailableCourseBtn";

<SelectAvailableCourseBtn onClick={() => setModalOpen(true)} />;
```

---

## Modal Components

### SelectCourseModal

**File**: `src/Modals/SelectCourseModal.jsx`

**Purpose**: Modal for adding new courses with time slot selection.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | Boolean | false | Controls modal visibility |
| onClose | Function | - | Callback when modal closes |
| onSave | Function | - | Callback with course data when saved |
| existingCourses | Array | [] | Courses for conflict checking |
| prefilledCourse | Object | null | Pre-fill course data (edit mode) |
| checkConflicts | Boolean | false | Enable/disable conflict checking |

**Features**:

- Course name, staff, and credits input fields
- Interactive time slot grid
- Conflict detection (when enabled)
- Form validation
- Conflict popup for occupied slots

**Usage Example**:

```jsx
import SelectCourseModal from "./Modals/SelectCourseModal";

<SelectCourseModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={(data) => handleSaveCourse(data)}
  existingCourses={courses}
  checkConflicts={false}
/>;
```

---

### AvailableCoursesModal

**File**: `src/Modals/AvailableCoursesModal.jsx`

**Purpose**: Modal for browsing and selecting from available courses.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | Boolean | false | Controls modal visibility |
| onClose | Function | - | Callback when modal closes |
| availableCourses | Array | [] | List of available courses |
| selectedCourses | Array | [] | User's current schedule |
| onSelectCourse | Function | - | Callback when course is selected |

**Features**:

- Grid display of available courses
- Staff selection for multi-staff courses
- Visual indicators (already selected, no schedule, etc.)
- Click course to select/change staff
- Time slot count display

**Usage Example**:

```jsx
import AvailableCoursesModal from "./Modals/AvailableCoursesModal";

<AvailableCoursesModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  availableCourses={availableCourses}
  selectedCourses={selectedCourses}
  onSelectCourse={(course) => handleSelectCourse(course)}
/>;
```

---

### StaffSelectionModal

**File**: `src/Modals/StaffSelectionModal.jsx`

**Purpose**: Modal for selecting a staff member when a course has multiple instructors.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | Boolean | Yes | Controls modal visibility |
| onClose | Function | Yes | Callback when modal closes |
| course | Object | Yes | Course with multiple staff options |
| onSelectStaff | Function | Yes | Callback with selected staff name |

**Course Structure**:

```javascript
{
  courseName: string,
  staffOptions: [
    {
      name: string,
      department: string (optional),
      selectedSlots: Array
    }
  ]
}
```

**Features**:

- List of staff options
- Time slots preview for each staff
- Click to select staff
- Responsive design

**Usage Example**:

```jsx
import StaffSelectionModal from "./Modals/StaffSelectionModal";

<StaffSelectionModal
  isOpen={isStaffModalOpen}
  onClose={() => setIsStaffModalOpen(false)}
  course={selectedCourse}
  onSelectStaff={(course, staffName) => handleStaffSelection(course, staffName)}
/>;
```

---

### NotificationModal

**File**: `src/Modals/NotificationModal.jsx`

**Purpose**: Attractive modal for displaying notifications (replaces browser alerts).

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | Boolean | false | Controls modal visibility |
| onClose | Function | - | Callback when modal closes |
| type | String | "info" | Notification type (success, error, warning, info) |
| title | String | - | Notification title |
| message | String | - | Notification message |

**Notification Types**:

- **success**: Green, checkmark icon
- **error**: Red, X icon
- **warning**: Yellow, warning triangle icon
- **info**: Blue, info icon

**Features**:

- Color-coded by type
- Animated entrance (fadeIn and slideUp)
- Icon based on type
- Auto-styled button matching type

**Usage Example**:

```jsx
import NotificationModal from "./Modals/NotificationModal";

<NotificationModal
  isOpen={notification.isOpen}
  onClose={() => closeNotification()}
  type="success"
  title="Course Added"
  message="Your course has been successfully added to the schedule."
/>;
```

---

## Component Communication

### Data Flow Pattern

```
HomePage (Parent)
    │
    ├─> Props Down ──> Child Components
    │
    └─> Callbacks Up <── Child Events
```

### Common Callback Patterns

- `onClick`: Button clicks
- `onClose`: Modal dismissal
- `onSave`: Form submission
- `onSelect`: Item selection
- `onRemove`: Item deletion

### State Updates

- All state changes happen at the HomePage level
- Child components are stateless or manage only local UI state
- Ensures single source of truth
