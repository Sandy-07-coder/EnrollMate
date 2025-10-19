# EnrollMate - Course Enrollment Management System

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC.svg)

A modern, responsive course enrollment management system built with React and Tailwind CSS. EnrollMate helps administrators manage courses and students build their schedules with intelligent conflict detection.

## ✨ Features

- 📅 **Interactive Timetable**: Visual weekly schedule with color-coded courses
- 👥 **Multi-Staff Support**: Courses can have multiple instructors with different time slots
- ⚠️ **Conflict Detection**: Prevents scheduling conflicts automatically
- 🎨 **Smart Color Assignment**: 12-color palette with intelligent assignment
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔔 **Beautiful Notifications**: Attractive modal-based feedback system
- 🎯 **Intuitive UX**: Smooth staff changes without disruptive popups

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── TimeTable.jsx
│   │   ├── CoursesList.jsx
│   │   ├── TimeSlotGrid.jsx
│   │   ├── CourseCard.jsx
│   │   ├── AddCourseBtn.jsx
│   │   └── SelectAvailableCourseBtn.jsx
│   │
│   ├── Modals/              # Modal components
│   │   ├── SelectCourseModal.jsx
│   │   ├── AvailableCoursesModal.jsx
│   │   ├── StaffSelectionModal.jsx
│   │   └── NotificationModal.jsx
│   │
│   ├── Pages/               # Page components
│   │   └── HomePage.jsx
│   │
│   ├── utils/               # Utility functions and hooks
│   │   ├── constants.js     # Application constants
│   │   ├── courseUtils.js   # Course management utilities
│   │   └── hooks.js         # Custom React hooks
│   │
│   ├── styles/              # CSS styles
│   ├── assets/              # Static assets
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── docs/                    # Documentation
│   ├── architecture.md      # System architecture
│   ├── components.md        # Component documentation
│   ├── state-management.md  # State management guide
│   ├── usage-examples.md    # Usage examples
│   └── api-reference.md     # API reference
│
├── public/                  # Public assets
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

## 📚 Documentation

### Core Documentation

- **[Architecture Guide](docs/architecture.md)** - System design and data flow
- **[Component Documentation](docs/components.md)** - All components explained
- **[State Management](docs/state-management.md)** - State structure and patterns
- **[Usage Examples](docs/usage-examples.md)** - Common workflows and examples
- **[API Reference](docs/api-reference.md)** - Complete API documentation

### Quick Links

- [Installation](#installation)
- [Features](#-features)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)

## 🎯 Usage Guide

### For Administrators

1. **Add New Course**

   - Click "Add New Course" button
   - Fill in course details (name, staff, credits)
   - Select time slots
   - Click "Add Course"

2. **Add Multiple Staff for Same Course**
   - Add the same course with a different staff name
   - System automatically creates staff options

### For Students

1. **Browse Available Courses**

   - Click "Select Available Course"
   - View all courses with time slot information
   - Courses show staff options count

2. **Select a Course**

   - Click on a course
   - If multiple staff available, choose preferred instructor
   - Course is added to your schedule with conflict checking

3. **Change Staff**

   - Click the same course again
   - Select a different staff member
   - Course updates without duplication

4. **Remove Course**
   - Click "Remove" button on any course
   - Course is removed from schedule

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3+
- **State Management**: React Hooks (custom hooks)
- **Language**: JavaScript (ES6+)

## 🏗️ Architecture Highlights

### Custom Hooks

- `useNotification()` - Notification management
- `useAvailableCourses()` - System courses management
- `useSelectedCourses()` - User schedule management
- `useModals()` - Modal state management

### Utility Functions

- **Conflict Detection**: `hasTimeSlotConflict()`, `hasSlotsConflict()`
- **Color Management**: `getNextAvailableColor()`
- **Data Validation**: `validateCourseData()`
- **Course Lookups**: `findCourseForSlot()`, `findStaffOption()`

### Key Constants

- `DAYS` - Days of the week
- `TIME_SLOTS` - Available time slots
- `COURSE_COLORS` - 12-color palette
- `NOTIFICATION_TYPES` - Notification type constants

## 🎨 Design System

### Color Palette

12 distinct colors for course differentiation:

- Blue, Green, Purple, Pink, Indigo, Teal
- Orange, Cyan, Rose, Lime, Amber, Violet

### Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## 📝 Code Quality

### JSDoc Documentation

All functions and components are documented with JSDoc comments including:

- Purpose and description
- Parameters with types
- Return values
- Usage examples

### Code Organization

- Logical file structure with clear separation of concerns
- Reusable components extracted from complex components
- Utility functions centralized for reusability
- Constants defined in single location

### Best Practices

- Functional components with hooks
- Immutable state updates
- PropTypes validation (consider adding)
- Consistent naming conventions
- Comprehensive error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use JSDoc comments for all functions and components
- Follow existing code structure and naming conventions
- Write self-documenting code
- Add comments for complex logic
- Keep components small and focused

## 🐛 Bug Reports

If you find a bug, please create an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

## 📄 License

This project is part of a learning exercise. Feel free to use and modify as needed.

## 👥 Credits

- **Concept**: Prahathieswaran
- **Development**: Santhosh
- **Built with**: ❤️ and lots of ☕

## 🔮 Future Enhancements

### Planned Features

- [ ] User authentication
- [ ] Backend API integration
- [ ] Course recommendations
- [ ] Schedule export (PDF, iCal)
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and search
- [ ] Undo/Redo functionality
- [ ] Drag-and-drop time slot selection
- [ ] Course prerequisites
- [ ] Capacity management

### Technical Improvements

- [ ] Unit tests with Jest
- [ ] E2E tests with Cypress
- [ ] Performance optimization
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Progressive Web App (PWA)
- [ ] State persistence (localStorage/API)
- [ ] TypeScript migration
- [ ] Component library extraction

## 📞 Support

For questions or support:

- Open an issue on GitHub
- Check the [documentation](docs/)
- Review [usage examples](docs/usage-examples.md)

---

**Made with ❤️ by Santhosh | Concept by Prahathieswaran**

_EnrollMate - Making course enrollment simple and beautiful_
