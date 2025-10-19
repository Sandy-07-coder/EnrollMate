# 🎓 EnrollMate — Course Enrollment Management System

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC.svg)

**EnrollMate** is a modern and responsive course enrollment management system built with **React** and **Tailwind CSS**.  
It helps administrators manage courses and staff, and allows students to build schedules easily with **intelligent conflict detection** and a **visual timetable**.

---

## ✨ Features

- 📅 **Interactive Timetable** – Dynamic weekly schedule with color-coded courses
- 👥 **Multi-Staff Support** – Assign multiple instructors for the same course
- ⚠️ **Conflict Detection** – Automatically prevents overlapping course timings
- 🎨 **Smart Color Assignment** – 12-color intelligent palette for visual clarity
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile
- 🔔 **Smooth Notifications** – Modal-based feedback for better user experience
- 🎯 **Clean UX** – Change staff or courses without pop-ups or reloads

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v14+**
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Once started, your app will be available at:
👉 http://localhost:5173

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── Modals/              # Modal-based interactions
│   ├── Pages/               # Page-level components
│   ├── utils/               # Utility functions and custom hooks
│   ├── styles/              # Tailwind and custom CSS
│   ├── assets/              # Static assets
│   ├── App.jsx              # Root component
│   └── main.jsx             # Application entry point
│
├── docs/                    # Documentation files
├── public/                  # Public assets
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind setup
└── README.md                # You're here
```

## 📚 Documentation

- 🧩 [Architecture Overview](docs/architecture.md)
- ⚙️ [Component Details](docs/components.md)
- 🧠 [State Management Guide](docs/state-management.md)
- 📘 [Usage Examples](docs/usage-examples.md)
- 🔗 [API Reference](docs/api-reference.md)

## 🎯 Usage Guide

### 👨‍💼 For Administrators

1. Click "Add New Course"
2. Enter course name, staff, and credits
3. Select time slots and click "Add"
4. Add multiple staff for the same course if needed — system groups them automatically

### 🎓 For Students

1. Browse available courses using "Select Available Course"
2. Choose your desired course and instructor
3. The course appears in your timetable (with conflict prevention)
4. Change staff or remove a course anytime with a single click

## 🛠️ Technology Stack

| Category           | Technology         |
| ------------------ | ------------------ |
| Frontend Framework | React 18+          |
| Styling            | Tailwind CSS 3+    |
| Build Tool         | Vite               |
| Language           | JavaScript (ES6+)  |
| State Management   | Custom React Hooks |

## 🏗️ Architecture Highlights

### 🔄 Custom Hooks

- `useNotification()` – For handling notifications
- `useAvailableCourses()` – Manages system-wide course data
- `useSelectedCourses()` – Handles student-selected schedules
- `useModals()` – Controls modal visibility and states

### ⚙️ Utilities

- `hasTimeSlotConflict()` – Detects overlapping schedules
- `getNextAvailableColor()` – Assigns unique course colors
- `validateCourseData()` – Ensures course details are valid

## 🎨 Design System

### 🎨 Color Palette

12 distinct Tailwind colors for course differentiation:
Blue, Green, Purple, Pink, Indigo, Teal, Orange, Cyan, Rose, Lime, Amber, Violet

### 📱 Responsive Breakpoints

| Device  | Width          |
| ------- | -------------- |
| Mobile  | < 640px        |
| Tablet  | 640px – 1024px |
| Desktop | > 1024px       |

## 🧪 Testing & Quality

```bash
# Run tests (future)
npm test

# Run linter
npm run lint
```

### Code Standards

- Functional components with Hooks
- Reusable modular components
- Centralized constants and utilities
- JSDoc comments for all functions
- Consistent naming and formatting

## 🤝 Contributing

We welcome contributions! 🎉

1. Fork this repo
2. Create a new branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m "Add awesome feature"`
4. Push your branch: `git push origin feature/awesome-feature`
5. Open a Pull Request

## 🐞 Reporting Issues

If you encounter a bug:

1. Create an issue on GitHub
2. Describe the bug and steps to reproduce
3. Attach screenshots if possible
4. Include browser/OS details

## 🔮 Future Enhancements

### 💡 Features

- [ ] User authentication
- [ ] Backend integration
- [ ] Course recommendations
- [ ] Schedule export (PDF / iCal)
- [ ] Dark / Light mode
- [ ] Advanced filtering & search
- [ ] Undo / Redo functionality
- [ ] Drag-and-drop slot selection
- [ ] Course prerequisites
- [ ] Capacity limits

### ⚙️ Technical Goals

- [ ] Unit tests with Jest
- [ ] E2E tests with Cypress
- [ ] Accessibility (WCAG 2.1)
- [ ] PWA support
- [ ] LocalStorage / API persistence
- [ ] TypeScript migration
- [ ] Performance optimization

## 👥 Credits

- 💡 **Concept**: Prahathieswaran
- 💻 **Development**: Santhosh
- ⚙️ **Built With**: React, Tailwind CSS, and ☕

## 📄 License

This project was created as part of a learning exercise.
Feel free to use, modify, and build upon it for educational purposes.
