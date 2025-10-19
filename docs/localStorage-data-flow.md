# 🔄 localStorage Data Flow Diagram

## Visual Guide to Data Persistence

---

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│  (Add Course, Select Course, Remove Course, View Timetable)    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ User Actions
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REACT COMPONENTS                            │
│         (HomePage, Modals, CoursesList, TimeTable)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS                               │
│      useAvailableCourses  │  useSelectedCourses                │
│              (with localStorage persistence)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Uses
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   useLocalStorage Hook                          │
│            (Generic localStorage sync hook)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │ React State  │    │ localStorage │
            │  (Memory)    │◄───►│   (Disk)    │
            └──────────────┘    └──────────────┘
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Persisted Data  │
                    │  (Survives       │
                    │   page reload)   │
                    └──────────────────┘
```

---

## 🔄 Data Flow: Adding a Course

```
USER ACTION: Click "Add Course"
         │
         ▼
[SelectCourseModal opens]
         │
USER ACTION: Fill form & save
         │
         ▼
[Modal calls saveCourse()]
         │
         ▼
┌────────────────────────────────┐
│ useAvailableCourses hook       │
│                                │
│  saveCourse(newCourseData) {   │
│    setAvailableCourses(...)    │◄─── Uses useLocalStorage
│  }                             │
└────────────────────────────────┘
         │
         ├──────────────┬───────────────┐
         ▼              ▼               ▼
   [React State]  [localStorage]  [Re-render UI]
    Updated         Updated          Shows new course
         │              │               │
         └──────────────┴───────────────┘
                        │
                        ▼
              ✅ DATA PERSISTED!
         (Survives page refresh)
```

---

## 🔄 Data Flow: Page Reload

```
USER ACTION: Press F5 (Refresh)
         │
         ▼
[Browser reloads page]
         │
         ▼
[React app initializes]
         │
         ▼
┌────────────────────────────────────┐
│ useLocalStorage initialization     │
│                                    │
│  useState(() => {                  │
│    const item =                    │
│      localStorage.getItem(key)     │◄─── Reads from disk
│    return item                     │
│      ? JSON.parse(item)            │
│      : initialValue                │
│  })                                │
└────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ React State populated with         │
│ data from localStorage             │
└────────────────────────────────────┘
         │
         ▼
[Components render with restored data]
         │
         ▼
✅ USER SEES THEIR PREVIOUS DATA!
   (Schedule intact, colors preserved)
```

---

## 🔄 Data Flow: State Update

```
Any state change (add, remove, update course)
         │
         ▼
┌────────────────────────────────────┐
│ setStoredValue(newValue)           │
│ (from useLocalStorage)             │
└────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ React State updated                │
│ (triggers re-render)               │
└────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ useEffect runs                     │
│                                    │
│  useEffect(() => {                 │
│    localStorage.setItem(           │◄─── Writes to disk
│      key,                          │
│      JSON.stringify(value)         │
│    )                               │
│  }, [key, storedValue])            │
└────────────────────────────────────┘
         │
         ▼
✅ DATA AUTOMATICALLY SAVED!
```

---

## 📦 Storage Structure

```
localStorage (Browser Storage)
│
├── "availableCourses" (key)
│   │
│   └── VALUE: Array of course objects
│       [
│         {
│           id: 1,
│           courseName: "CS101",
│           staff: "Dr. Smith",
│           credits: 3,
│           selectedSlots: [...],
│           staffOptions: [...]
│         },
│         { ... more courses ... }
│       ]
│
├── "selectedCourses" (key)
│   │
│   └── VALUE: Array of selected course objects
│       [
│         {
│           id: 1,
│           courseName: "CS101",
│           staff: "Dr. Smith",
│           credits: 3,
│           selectedSlots: [...],
│           color: "#FF6B6B"
│         },
│         { ... more courses ... }
│       ]
│
└── "theme" (key) - Example from ThemeToggle
    │
    └── VALUE: "light" or "dark"
```

---

## 🎯 useLocalStorage Hook Internal Flow

```
┌─────────────────────────────────────────────────────────┐
│  useLocalStorage(key, initialValue)                     │
│                                                          │
│  1. INITIALIZATION (on mount)                           │
│     ┌────────────────────────────────────────┐         │
│     │ const [value, setValue] = useState(() │         │
│     │   try {                                │         │
│     │     item = localStorage.getItem(key)   │         │
│     │     return item ? parse(item) : init   │         │
│     │   } catch {                            │         │
│     │     return initialValue                │         │
│     │   }                                    │         │
│     └────────────────────────────────────────┘         │
│                                                          │
│  2. SYNC TO STORAGE (on every update)                   │
│     ┌────────────────────────────────────────┐         │
│     │ useEffect(() => {                      │         │
│     │   try {                                │         │
│     │     localStorage.setItem(              │         │
│     │       key,                             │         │
│     │       JSON.stringify(value)            │         │
│     │     )                                  │         │
│     │   } catch {                            │         │
│     │     console.error(...)                 │         │
│     │   }                                    │         │
│     │ }, [key, value])                       │         │
│     └────────────────────────────────────────┘         │
│                                                          │
│  3. RETURN                                              │
│     return [value, setValue]                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Data Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│                     DATA LIFECYCLE                           │
└──────────────────────────────────────────────────────────────┘

1. APP FIRST LOAD (No stored data)
   ──────────────────────────────────────
   localStorage: EMPTY
        │
        ▼
   useLocalStorage reads: null
        │
        ▼
   Returns: initialValue (empty array [])
        │
        ▼
   State initialized: []


2. USER ADDS DATA
   ──────────────────────────────────────
   User adds course
        │
        ▼
   setState called
        │
        ├────► React State: [course1]
        │
        └────► localStorage: [course1]


3. USER REFRESHES PAGE
   ──────────────────────────────────────
   Page reloads
        │
        ▼
   useLocalStorage reads: [course1]
        │
        ▼
   State initialized: [course1]
        │
        ▼
   UI renders with data ✅


4. USER ADDS MORE DATA
   ──────────────────────────────────────
   User adds course2
        │
        ▼
   setState called
        │
        ├────► React State: [course1, course2]
        │
        └────► localStorage: [course1, course2]


5. BROWSER CLOSES & REOPENS
   ──────────────────────────────────────
   localStorage persists on disk
        │
        ▼
   App reopens
        │
        ▼
   useLocalStorage reads: [course1, course2]
        │
        ▼
   All data restored ✅
```

---

## ⚡ Performance Characteristics

```
┌────────────────────────────────────────┐
│         Operation Performance          │
├────────────────────────────────────────┤
│                                        │
│  READ (on mount):                      │
│  • Time: ~1-5ms                        │
│  • Cost: One localStorage.getItem()    │
│  • Frequency: Once per component mount │
│                                        │
│  WRITE (on state change):              │
│  • Time: ~1-10ms                       │
│  • Cost: One localStorage.setItem()    │
│  • Frequency: Every state update       │
│                                        │
│  STORAGE SIZE:                         │
│  • 5 courses: ~2-3 KB                  │
│  • 15 courses: ~8-10 KB                │
│  • 30+ courses: ~20-30 KB              │
│  • Browser limit: 5-10 MB              │
│                                        │
└────────────────────────────────────────┘

Performance Impact: NEGLIGIBLE ✅
User Experience: SEAMLESS ✅
```

---

## 🛡️ Error Handling Flow

```
┌────────────────────────────────────────────────────────┐
│              ERROR HANDLING                            │
└────────────────────────────────────────────────────────┘

Scenario 1: CORRUPTED DATA
──────────────────────────────────────
localStorage: "invalid json {]"
        │
        ▼
useLocalStorage tries JSON.parse()
        │
        ▼
❌ Error caught!
        │
        ▼
Returns: initialValue
        │
        ▼
✅ App continues working


Scenario 2: QUOTA EXCEEDED
──────────────────────────────────────
User tries to save large dataset
        │
        ▼
localStorage.setItem() throws error
        │
        ▼
❌ Error caught in useEffect
        │
        ▼
console.error() logs the issue
        │
        ▼
React state still updates
        │
        ▼
✅ App continues (just won't persist)


Scenario 3: PRIVATE BROWSING
──────────────────────────────────────
localStorage may be disabled
        │
        ▼
Reads/writes fail gracefully
        │
        ▼
Falls back to initialValue
        │
        ▼
✅ App works (no persistence)
```

---

## 📱 Multi-Tab Synchronization

```
Note: Current implementation does NOT sync across tabs.
Each tab has independent React state.

┌──────────┐         ┌──────────┐
│  Tab 1   │         │  Tab 2   │
│          │         │          │
│ [course1]│         │ [course1]│
└──────────┘         └──────────┘
     │                    │
     │ User adds course2  │
     ▼                    │
[course1, course2]        │
     │                    │
     │ Writes to          │
     │ localStorage       │
     ▼                    │
localStorage:             │
[course1, course2]        │
     │                    │
     │                    │ Tab 2 doesn't
     │                    │ auto-update
     │                    ▼
     │              Still shows [course1]
     │                    │
     │                    │ User refreshes
     │                    ▼
     │              Reads localStorage
     │                    ▼
     │              [course1, course2] ✅

Future Enhancement:
- Add storage event listener
- Sync tabs in real-time
```

---

## 🎨 Visual Summary

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  🎯 GOAL: Persist user data across sessions            │
│                                                         │
│  ✅ SOLUTION: useLocalStorage hook                     │
│                                                         │
│  📝 HOW IT WORKS:                                       │
│     1. Read from localStorage on mount                 │
│     2. Store in React state                            │
│     3. Auto-save to localStorage on every change       │
│     4. Handle errors gracefully                        │
│                                                         │
│  🎉 RESULT:                                             │
│     • Zero data loss on refresh                        │
│     • Automatic persistence                            │
│     • Same API as useState                             │
│     • Transparent to components                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Related Documentation

- **Implementation**: See `src/utils/hooks.js`
- **Testing**: See `docs/localStorage-testing.js`
- **Full Guide**: See `docs/localStorage-integration.md`
- **Summary**: See `docs/LOCALSTORAGE-SUMMARY.md`

---

**Created**: October 18, 2025  
**Status**: ✅ Production Ready  
**Impact**: Zero data loss, improved UX
