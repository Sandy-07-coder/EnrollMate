# localStorage Integration Documentation

## Overview

This document describes the localStorage integration for persisting course data across page refreshes and browser sessions.

## Implementation Date

October 18, 2025

---

## Features Implemented

### 1. `useLocalStorage` Hook

**Location**: `src/utils/hooks.js`

A custom React hook that synchronizes React state with browser localStorage.

#### Features:

- ✅ Automatic localStorage synchronization
- ✅ JSON serialization/deserialization for complex data types
- ✅ Error handling for localStorage failures
- ✅ SSR (Server-Side Rendering) compatibility
- ✅ Initial value support

#### API:

```javascript
const [value, setValue] = useLocalStorage(key, initialValue);
```

#### Parameters:

- `key` (string): The localStorage key to store data under
- `initialValue` (any): Default value if no stored value exists

#### Returns:

- Array: `[storedValue, setStoredValue]` - Similar to `useState`

#### Example Usage:

```javascript
const [theme, setTheme] = useLocalStorage("theme", "light");
const [user, setUser] = useLocalStorage("user", { name: "", email: "" });
```

---

### 2. Available Courses Persistence

**Hook**: `useAvailableCourses`  
**Storage Key**: `'availableCourses'`  
**Data Type**: Array of course objects

#### What is Stored:

```javascript
[
  {
    id: 1,
    courseName: "Introduction to Computer Science",
    staff: "Dr. Smith",
    credits: 3,
    selectedSlots: ["Monday-9:00-10:00", "Wednesday-9:00-10:00"],
    staffOptions: [
      {
        name: "Dr. Smith",
        selectedSlots: ["Monday-9:00-10:00", "Wednesday-9:00-10:00"],
      },
      {
        name: "Prof. Johnson",
        selectedSlots: ["Tuesday-10:00-11:00", "Thursday-10:00-11:00"],
      },
    ],
  },
  // ... more courses
];
```

#### Behavior:

- **On Page Load**: Restores all available courses from localStorage
- **On Course Addition**: Automatically saves to localStorage
- **On Staff Addition**: Updates the course and saves to localStorage
- **Persistence**: Data survives page refresh, browser restart, and tab closure

---

### 3. Selected Courses Persistence

**Hook**: `useSelectedCourses`  
**Storage Key**: `'selectedCourses'`  
**Data Type**: Array of selected course objects

#### What is Stored:

```javascript
[
  {
    id: 1,
    courseName: "Introduction to Computer Science",
    staff: "Dr. Smith",
    credits: 3,
    selectedSlots: ["Monday-9:00-10:00", "Wednesday-9:00-10:00"],
    color: "#FF6B6B",
  },
  {
    id: 2,
    courseName: "Data Structures",
    staff: "Prof. Johnson",
    credits: 4,
    selectedSlots: ["Tuesday-10:00-11:00", "Thursday-10:00-11:00"],
    color: "#4ECDC4",
  },
  // ... more selected courses
];
```

#### Behavior:

- **On Page Load**: Restores user's complete course schedule from localStorage
- **On Course Selection**: Automatically saves to localStorage
- **On Course Removal**: Updates localStorage immediately
- **On Course Update**: Preserves course color and ID, updates other fields
- **Persistence**: User's schedule survives page refresh and browser restart

---

## Benefits

### 1. **User Experience**

- ✅ No data loss on accidental page refresh
- ✅ Schedule persists across browser sessions
- ✅ Seamless continuation of work
- ✅ No need for manual save actions

### 2. **Development**

- ✅ Simple API - works like `useState`
- ✅ Automatic synchronization
- ✅ No manual localStorage management needed
- ✅ Type-safe with JSON serialization

### 3. **Reliability**

- ✅ Graceful error handling
- ✅ Falls back to initial values on errors
- ✅ Handles corrupted localStorage data
- ✅ Works in private browsing mode (with limitations)

---

## Browser Compatibility

### Supported Browsers:

- ✅ Chrome/Edge (all recent versions)
- ✅ Firefox (all recent versions)
- ✅ Safari (all recent versions)
- ✅ Opera (all recent versions)

### Storage Limits:

- **Standard Limit**: 5-10 MB per domain
- **Recommended Usage**: Keep total data under 5 MB
- **Current Usage**: Approximately 10-50 KB for typical course data

---

## Data Management

### Clearing Data

Users can clear their data in several ways:

1. **Via Browser DevTools**:

   ```javascript
   // In browser console
   localStorage.removeItem("availableCourses");
   localStorage.removeItem("selectedCourses");
   // or
   localStorage.clear();
   ```

2. **Via Browser Settings**:

   - Chrome: Settings → Privacy → Clear browsing data → Cookies and other site data
   - Firefox: Settings → Privacy & Security → Clear Data
   - Safari: Preferences → Privacy → Manage Website Data

3. **Programmatically** (future feature):
   ```javascript
   const clearAllCourseData = () => {
     localStorage.removeItem("availableCourses");
     localStorage.removeItem("selectedCourses");
     window.location.reload();
   };
   ```

### Data Migration

If data structure changes in the future:

```javascript
// Example: Migrate old data to new format
const [courses, setCourses] = useLocalStorage("selectedCourses", []);

useEffect(() => {
  // Check if migration needed
  if (courses.length > 0 && !courses[0].hasOwnProperty("newField")) {
    const migratedCourses = courses.map((course) => ({
      ...course,
      newField: "defaultValue",
    }));
    setCourses(migratedCourses);
  }
}, []);
```

---

## Testing

### Manual Testing Steps:

1. **Test Available Courses Persistence**:

   - Add a new course via "Add Course" button
   - Refresh the page (F5)
   - Verify the course still appears
   - Close and reopen the browser
   - Verify the course still appears

2. **Test Selected Courses Persistence**:

   - Select courses from "Available Courses"
   - Verify they appear in the timetable
   - Refresh the page (F5)
   - Verify all selected courses and their colors are preserved
   - Close and reopen the browser
   - Verify the complete schedule is restored

3. **Test Conflict Detection with Persisted Data**:

   - Select a course with specific time slots
   - Refresh the page
   - Try to select another course with conflicting time slots
   - Verify conflict detection still works

4. **Test Data Integrity**:
   - Add multiple courses with different staff options
   - Refresh the page
   - Verify all staff options are preserved
   - Select different staff for a course
   - Refresh and verify the selection is maintained

### Browser Console Inspection:

```javascript
// View stored data
console.log(
  "Available Courses:",
  JSON.parse(localStorage.getItem("availableCourses"))
);
console.log(
  "Selected Courses:",
  JSON.parse(localStorage.getItem("selectedCourses"))
);

// Check storage size
const availableCoursesSize = new Blob([
  localStorage.getItem("availableCourses"),
]).size;
const selectedCoursesSize = new Blob([localStorage.getItem("selectedCourses")])
  .size;
console.log("Storage usage:", {
  availableCourses: `${(availableCoursesSize / 1024).toFixed(2)} KB`,
  selectedCourses: `${(selectedCoursesSize / 1024).toFixed(2)} KB`,
  total: `${((availableCoursesSize + selectedCoursesSize) / 1024).toFixed(
    2
  )} KB`,
});
```

---

## Troubleshooting

### Issue: Data not persisting

**Possible Causes**:

- Private browsing/incognito mode with strict settings
- Browser localStorage disabled
- Storage quota exceeded

**Solutions**:

1. Check browser console for localStorage errors
2. Verify localStorage is enabled in browser settings
3. Clear old localStorage data
4. Try in a different browser

### Issue: Data corruption

**Symptoms**: App crashes or shows errors after refresh

**Solutions**:

1. Open browser console
2. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```
3. Refresh the page

### Issue: Old data structure causing errors

**Solution**: Implement data migration in the hook

---

## Future Enhancements

### Potential Improvements:

1. **Data Export/Import**

   - Allow users to export their schedule as JSON
   - Import schedules from previous semesters

2. **Version Control**

   - Add version numbers to stored data
   - Automatic migration between versions

3. **Compression**

   - Compress data before storing for larger datasets
   - Use libraries like `lz-string`

4. **Cloud Sync** (requires backend)

   - Sync localStorage to cloud storage
   - Multi-device synchronization

5. **Data Backup**

   - Automatic periodic backups
   - Restore from backup feature

6. **Clear Data Button**
   - UI button to clear all stored data
   - Confirmation dialog before clearing

---

## Code Examples

### Adding localStorage to a new hook:

```javascript
// Before (no persistence)
export const useMyData = () => {
  const [data, setData] = useState([]);

  return { data, setData };
};

// After (with persistence)
export const useMyData = () => {
  const [data, setData] = useLocalStorage("myDataKey", []);

  return { data, setData };
};
```

### Reading stored data in DevTools:

```javascript
// Pretty print stored data
console.table(JSON.parse(localStorage.getItem("selectedCourses")));
```

### Checking if data exists:

```javascript
const hasStoredCourses = () => {
  const stored = localStorage.getItem("selectedCourses");
  return stored && JSON.parse(stored).length > 0;
};
```

---

## Security Considerations

### What to Store:

- ✅ Course schedules
- ✅ User preferences
- ✅ UI state
- ✅ Non-sensitive configuration

### What NOT to Store:

- ❌ Passwords
- ❌ Authentication tokens
- ❌ Personal identification numbers
- ❌ Payment information
- ❌ API keys

### Best Practices:

1. Never store sensitive data in localStorage
2. Validate data read from localStorage
3. Handle corrupted data gracefully
4. Consider localStorage as public data
5. Implement proper error handling

---

## Related Files

- `src/utils/hooks.js` - All custom hooks including `useLocalStorage`
- `src/components/ThemeToggle.jsx` - Example usage component
- `src/Pages/HomePage.jsx` - Main usage of persisted hooks
- `docs/state-management.md` - Overall state management documentation

---

## Changelog

### October 18, 2025

- ✅ Implemented `useLocalStorage` hook
- ✅ Integrated localStorage into `useAvailableCourses`
- ✅ Integrated localStorage into `useSelectedCourses`
- ✅ Created `ThemeToggle` example component
- ✅ Added comprehensive documentation
- ✅ Tested persistence across page reloads

---

## Summary

The localStorage integration provides a seamless, automatic persistence layer for course data. Users can now:

- Add courses without fear of losing data
- Close and reopen the application with their schedule intact
- Work confidently knowing their progress is saved automatically

The implementation uses a clean, reusable `useLocalStorage` hook that can be easily extended to other parts of the application.
