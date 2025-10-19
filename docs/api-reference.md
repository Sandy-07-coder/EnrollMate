# API Reference

## Utility Functions

### courseUtils.js

#### hasTimeSlotConflict()

Checks if a single time slot conflicts with existing courses.

**Signature**:

```javascript
hasTimeSlotConflict({ day, time, courses }) => boolean
```

**Parameters**:

- `day` (string): Day of the week
- `time` (string): Time slot (e.g., "8-10")
- `courses` (Array): Array of course objects

**Returns**: `true` if conflict exists, `false` otherwise

**Example**:

```javascript
const hasConflict = hasTimeSlotConflict({
  day: "Monday",
  time: "8-10",
  courses: selectedCourses,
});
```

---

#### hasSlotsConflict()

Checks if multiple time slots conflict with existing courses.

**Signature**:

```javascript
hasSlotsConflict({ slots, courses, excludeCourseIndex }) => boolean
```

**Parameters**:

- `slots` (Array): Array of slot objects `{ day, time }`
- `courses` (Array): Array of course objects
- `excludeCourseIndex` (number, optional): Index to exclude from check (default: -1)

**Returns**: `true` if any conflict exists, `false` otherwise

**Example**:

```javascript
const hasConflict = hasSlotsConflict({
  slots: [
    { day: "Monday", time: "8-10" },
    { day: "Wednesday", time: "8-10" },
  ],
  courses: selectedCourses,
  excludeCourseIndex: 2, // Exclude course at index 2
});
```

---

#### getNextAvailableColor()

Returns the next available color for a new course.

**Signature**:

```javascript
getNextAvailableColor(courses) => string
```

**Parameters**:

- `courses` (Array): Array of courses with `color` property

**Returns**: Tailwind color class (string)

**Example**:

```javascript
const color = getNextAvailableColor(selectedCourses);
// Returns: "bg-blue-600" (or next available color)
```

---

#### findCourseForSlot()

Finds a course scheduled for a specific time slot.

**Signature**:

```javascript
findCourseForSlot({ day, time, courses }) => Object|undefined
```

**Parameters**:

- `day` (string): Day of the week
- `time` (string): Time slot
- `courses` (Array): Array of courses to search

**Returns**: Course object if found, `undefined` otherwise

**Example**:

```javascript
const course = findCourseForSlot({
  day: "Monday",
  time: "8-10",
  courses: selectedCourses,
});
// Returns: { id: 1, courseName: "Data Structures", ... }
```

---

#### validateCourseData()

Validates course data before saving.

**Signature**:

```javascript
validateCourseData(courseData) => { isValid: boolean, errors: Array }
```

**Parameters**:

- `courseData` (Object): Course data with `courseName`, `staff`, `credits`, `selectedSlots`

**Returns**: Validation result object

**Example**:

```javascript
const result = validateCourseData({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});
// Returns: { isValid: true, errors: [] }

const result2 = validateCourseData({
  courseName: "",
  staff: "",
  credits: 0,
  selectedSlots: []
});
// Returns: {
//   isValid: false,
//   errors: [
//     "Course name is required",
//     "Staff name is required",
//     "Credits must be between 1 and 10",
//     "At least one time slot must be selected"
//   ]
// }
```

---

#### calculateTotalCredits()

Calculates total credits for an array of courses.

**Signature**:

```javascript
calculateTotalCredits(courses) => number
```

**Parameters**:

- `courses` (Array): Array of courses with `credits` property

**Returns**: Total credits (number)

**Example**:

```javascript
const total = calculateTotalCredits(selectedCourses);
// Returns: 18 (sum of all course credits)
```

---

#### hasTimeSlots()

Checks if a course has any time slots configured.

**Signature**:

```javascript
hasTimeSlots(course) => boolean
```

**Parameters**:

- `course` (Object): Course object with `selectedSlots` and/or `staffOptions`

**Returns**: `true` if course has slots, `false` otherwise

**Example**:

```javascript
const hasSlots = hasTimeSlots(availableCourse);
// Returns: true if course or any staff has time slots
```

---

#### findStaffOption()

Finds a staff option by name in a course's staff options.

**Signature**:

```javascript
findStaffOption(course, staffName) => Object|undefined
```

**Parameters**:

- `course` (Object): Course object with `staffOptions` array
- `staffName` (string): Name of the staff member

**Returns**: Staff option object if found, `undefined` otherwise

**Example**:

```javascript
const staffOption = findStaffOption(course, "Dr. Smith");
// Returns: { name: "Dr. Smith", selectedSlots: [...] }
```

---

#### createSlotKey()

Creates a unique slot key for a day and time combination.

**Signature**:

```javascript
createSlotKey(day, time) => string
```

**Parameters**:

- `day` (string): Day of the week
- `time` (string): Time slot

**Returns**: Unique slot key (string)

**Example**:

```javascript
const key = createSlotKey("Monday", "8-10");
// Returns: "Monday-8-10"
```

---

## Custom Hooks

### useNotification()

**File**: `src/utils/hooks.js`

Manages notification state for displaying user feedback.

**Returns**:

```javascript
{
  notification: {
    isOpen: boolean,
    type: string,    // "success" | "error" | "warning" | "info"
    title: string,
    message: string
  },
  showNotification: (type, title, message) => void,
  closeNotification: () => void
}
```

**Example**:

```javascript
const { notification, showNotification, closeNotification } = useNotification();

showNotification("success", "Course Added", "Course successfully added");
```

---

### useAvailableCourses(showNotification)

**File**: `src/utils/hooks.js`

Manages system-wide available courses.

**Parameters**:

- `showNotification` (Function): Function to display notifications

**Returns**:

```javascript
{
  availableCourses: Array,
  saveCourse: (courseData) => void
}
```

**Example**:

```javascript
const { availableCourses, saveCourse } = useAvailableCourses(showNotification);

saveCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});
```

---

### useSelectedCourses(showNotification)

**File**: `src/utils/hooks.js`

Manages user's selected courses (personal schedule).

**Parameters**:

- `showNotification` (Function): Function to display notifications

**Returns**:

```javascript
{
  courses: Array,
  selectCourse: (courseData) => void,
  removeCourse: (courseId) => void
}
```

**Example**:

```javascript
const { courses, selectCourse, removeCourse } = useSelectedCourses(showNotification);

selectCourse({
  courseName: "Data Structures",
  staff: "Dr. Smith",
  credits: 3,
  selectedSlots: [...]
});

removeCourse(1);
```

---

### useModals()

**File**: `src/utils/hooks.js`

Manages modal open/closed states.

**Returns**:

```javascript
{
  isAddCourseModalOpen: boolean,
  isAvailableCoursesModalOpen: boolean,
  openAddCourseModal: () => void,
  closeAddCourseModal: () => void,
  openAvailableCoursesModal: () => void,
  closeAvailableCoursesModal: () => void
}
```

**Example**:

```javascript
const { isAddCourseModalOpen, openAddCourseModal } = useModals();

<button onClick={openAddCourseModal}>Add Course</button>;
```

---

## Constants

### constants.js

#### DAYS

Array of days used in the timetable.

```javascript
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
```

---

#### TIME_SLOTS

Array of available time slots.

```javascript
const TIME_SLOTS = ["8-10", "10-12", "1-3", "3-5"];
```

---

#### COURSE_COLORS

Array of Tailwind color classes for courses.

```javascript
const COURSE_COLORS = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-orange-600",
  "bg-cyan-600",
  "bg-rose-600",
  "bg-lime-600",
  "bg-amber-600",
  "bg-violet-600",
];
```

---

#### NOTIFICATION_TYPES

Object containing notification type constants.

```javascript
const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};
```

---

#### CREDITS_CONFIG

Object containing course credits validation constraints.

```javascript
const CREDITS_CONFIG = {
  MIN: 1,
  MAX: 10,
};
```

---

## Component Props

### TimeTable

| Prop    | Type  | Default | Required | Description                          |
| ------- | ----- | ------- | -------- | ------------------------------------ |
| courses | Array | []      | No       | Array of selected courses to display |

---

### CoursesList

| Prop                    | Type     | Default | Required | Description                              |
| ----------------------- | -------- | ------- | -------- | ---------------------------------------- |
| courses                 | Array    | -       | Yes      | Array of selected courses                |
| onSelectAvailableCourse | Function | -       | Yes      | Callback to open available courses modal |
| onRemoveCourse          | Function | -       | Yes      | Callback to remove a course              |

---

### SelectCourseModal

| Prop            | Type     | Default | Required | Description                          |
| --------------- | -------- | ------- | -------- | ------------------------------------ |
| isOpen          | Boolean  | false   | No       | Controls modal visibility            |
| onClose         | Function | -       | Yes      | Callback when modal closes           |
| onSave          | Function | -       | Yes      | Callback with course data when saved |
| existingCourses | Array    | []      | No       | Courses for conflict checking        |
| prefilledCourse | Object   | null    | No       | Pre-fill course data                 |
| checkConflicts  | Boolean  | false   | No       | Enable/disable conflict checking     |

---

### AvailableCoursesModal

| Prop             | Type     | Default | Required | Description                      |
| ---------------- | -------- | ------- | -------- | -------------------------------- |
| isOpen           | Boolean  | false   | No       | Controls modal visibility        |
| onClose          | Function | -       | Yes      | Callback when modal closes       |
| availableCourses | Array    | []      | No       | List of available courses        |
| selectedCourses  | Array    | []      | No       | User's current schedule          |
| onSelectCourse   | Function | -       | Yes      | Callback when course is selected |

---

### StaffSelectionModal

| Prop          | Type     | Default | Required | Description                  |
| ------------- | -------- | ------- | -------- | ---------------------------- |
| isOpen        | Boolean  | -       | Yes      | Controls modal visibility    |
| onClose       | Function | -       | Yes      | Callback when modal closes   |
| course        | Object   | -       | Yes      | Course with staff options    |
| onSelectStaff | Function | -       | Yes      | Callback with selected staff |

---

### NotificationModal

| Prop    | Type     | Default | Required | Description                |
| ------- | -------- | ------- | -------- | -------------------------- |
| isOpen  | Boolean  | false   | No       | Controls modal visibility  |
| onClose | Function | -       | Yes      | Callback when modal closes |
| type    | String   | "info"  | No       | Notification type          |
| title   | String   | -       | Yes      | Notification title         |
| message | String   | -       | Yes      | Notification message       |

---

### AddCourseBtn

| Prop    | Type     | Default | Required | Description                     |
| ------- | -------- | ------- | -------- | ------------------------------- |
| onClick | Function | -       | Yes      | Callback when button is clicked |

---

### SelectAvailableCourseBtn

| Prop    | Type     | Default | Required | Description                     |
| ------- | -------- | ------- | -------- | ------------------------------- |
| onClick | Function | -       | Yes      | Callback when button is clicked |
