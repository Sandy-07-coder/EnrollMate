# EnrollMate - Application Architecture

## Overview

EnrollMate is a course enrollment management system built with React and Vite. It allows users to manage course schedules, select courses from available options, handle staff assignments, and visualize timetables with conflict detection.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Application header
│   │   ├── Footer.jsx       # Application footer
│   │   ├── TimeTable.jsx    # Timetable visualization grid
│   │   ├── CoursesList.jsx  # Selected courses list sidebar
│   │   ├── AddCourseBtn.jsx # Add new course button
│   │   └── SelectAvailableCourseBtn.jsx # Select from available courses button
│   │
│   ├── Modals/              # Modal components
│   │   ├── SelectCourseModal.jsx        # Modal for adding new courses
│   │   ├── AvailableCoursesModal.jsx    # Modal for browsing available courses
│   │   ├── StaffSelectionModal.jsx      # Modal for selecting staff
│   │   └── NotificationModal.jsx        # Modal for displaying notifications
│   │
│   ├── Pages/               # Page components
│   │   └── HomePage.jsx     # Main application page
│   │
│   ├── utils/               # Utility functions and hooks
│   │   ├── constants.js     # Application constants
│   │   ├── courseUtils.js   # Course management utilities
│   │   └── hooks.js         # Custom React hooks
│   │
│   ├── assets/              # Static assets
│   ├── styles/              # CSS styles
│   ├── App.jsx              # Root application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
│
├── docs/                    # Documentation
├── public/                  # Public assets
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project readme

```

## Core Concepts

### 1. Course Management

- **Available Courses**: System-wide courses configured by administrators with time slots and staff options
- **Selected Courses**: User's personal schedule containing courses they've enrolled in
- **Staff Options**: Multiple instructors can teach the same course at different times

### 2. Time Slot System

- **Days**: Monday through Saturday
- **Time Slots**: 8-10, 10-12, 1-3, 3-5
- **Conflict Detection**: Prevents scheduling conflicts when selecting courses

### 3. Color Coding

- 12-color palette for visual course differentiation
- Smart color assignment avoids duplicates
- Colors persist when changing staff for the same course

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    HomePage (State)                 │
│  - availableCourses (system courses)                │
│  - courses (user schedule)                          │
│  - notification state                               │
└────────────┬────────────────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌──────────┐   ┌──────────────┐
│ TimeTable│   │ CoursesList  │
│ (Display)│   │ (Display)    │
└──────────┘   └──────┬───────┘
                      │
         ┌────────────┴─────────────┐
         │                          │
         ▼                          ▼
┌────────────────┐         ┌────────────────────┐
│ SelectCourse   │         │ AvailableCourses   │
│ Modal          │         │ Modal              │
│ (Add New)      │         │ (Select Existing)  │
└────────────────┘         └──────┬─────────────┘
                                  │
                                  ▼
                          ┌────────────────┐
                          │ StaffSelection │
                          │ Modal          │
                          └────────────────┘
```

## Key Features

### Conflict Checking

- **Add New Course**: No conflict checking (admin operation)
- **Select Available Course**: Full conflict checking enabled
- Prevents double-booking time slots

### Staff Management

- Multiple staff can teach the same course
- Each staff member has independent time slots
- Users can switch between staff by re-selecting the course

### Notification System

- Replaces browser alerts with attractive modals
- Four types: Success, Error, Warning, Info
- Color-coded icons and buttons

## Technology Stack

- **React**: UI library with hooks-based architecture
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript features

## Component Hierarchy

```
App
└── HomePage
    ├── Header
    ├── Main Content
    │   ├── TimeTable
    │   └── Sidebar
    │       ├── CoursesList
    │       │   └── SelectAvailableCourseBtn
    │       └── AddCourseBtn
    ├── Modals
    │   ├── SelectCourseModal
    │   ├── AvailableCoursesModal
    │   │   └── StaffSelectionModal
    │   └── NotificationModal
    └── Footer
```

## State Management

State is managed at the HomePage level using React hooks:

- `useState` for local component state
- Custom hooks (`useNotification`, `useAvailableCourses`, `useSelectedCourses`, `useModals`) for logic separation
- Props drilling for passing data to child components

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), lg (1024px)
- Flexible grid layouts
- Scrollable tables and modals

## Performance Considerations

- Efficient conflict checking algorithms
- Memoization opportunities for computed values
- Minimal re-renders through proper state updates
- Lazy loading potential for large course lists
