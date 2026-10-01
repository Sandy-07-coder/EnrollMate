# EnrollMate

A client-side course enrollment planner that helps university students build conflict-free timetables. Paste your CAMU enrollment page data (or receive it from a companion Chrome extension), pick courses, detect scheduling conflicts instantly, apply filters, and export your finalized timetable as a PDF.

## Features

- **Paste-to-parse data loading** — Copy the full text of your CAMU enrollment page, paste it into the app, and the parser extracts every course section with its schedule slots, instructor, and credits.
- **Visual weekly timetable** — A Monday–Saturday grid with 2-hour blocks (8–10, 10–12, 1–3, 3–5) that renders both 1-hour and 2-hour course slots with color-coded blocks.
- **Course search** — Real-time search by course name, instructor, or section ID from the header bar (desktop and mobile).
- **Conflict detection** — When adding a course, the app checks for time-slot overlaps against already-selected courses and surfaces a detailed conflict modal showing which existing course clashes and on which day/time.
- **Duplicate and same-subject guards** — Prevents adding the same section twice or two different sections of the same subject.
- **Advanced filtering** — Filter the full course catalog by free days, free time slots, non-conflicting courses only, and non-selected subjects only. Results are grouped by subject first, then drill into individual sections.
- **Selected courses sidebar** — Lists all chosen courses with instructor, section code (click-to-copy), and credit count. Shows total course count and credit sum.
- **PDF timetable export** — Download a styled PDF of your selected courses rendered in a dark terminal-themed HTML layout via html2canvas + jsPDF.
- **Dark mode** — Toggle between light and dark themes; preference is persisted in `localStorage`.
- **Responsive design** — Fully usable on mobile devices with a collapsible search bar and adaptive grid layout.
- **Persistent state** — Selected courses and full course catalog are persisted in `localStorage` via Zustand middleware, surviving page refreshes.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 7 |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + CSS custom properties design system |
| State management | Zustand 5 with `persist` middleware |
| Routing | React Router DOM 6 |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| Icons | Lucide React, React Icons |
| UI primitives | Radix UI (Checkbox) |
| PDF generation | jsPDF + html2canvas |
| Utilities | clsx, tailwind-merge |
| Linting | ESLint 9 with React Hooks and React Refresh plugins |

## Architecture

EnrollMate is a **frontend-only** single-page application. There is no backend, no database, and no server-side API. All data processing happens in the browser.

```
Data Input                    State Layer                  UI Layer
─────────────────────────────────────────────────────────────────────
Paste raw text ──► parseRawCourseData() ──► Zustand courseStore ──► Pages / Components
                                                     │
                                                     ▼
                                              localStorage
                                           (course-storage key)
```

**Data flow:**

1. Course data enters via the **PasteDataModal** (raw CAMU page text parsed by `parseRawCourseData`).
2. Parsed courses are stored in the **Zustand `courseStore`**, which persists `courses` and `selectedCourses` to `localStorage` under the key `course-storage`.
3. The **Header** component provides search, which filters the store's `courses` array in-memory and shows results in a dropdown.
4. Adding a course runs conflict/duplicate/same-subject checks via utility functions, then appends to `selectedCourses`.
5. The **TimeTable** component reads `selectedCourses` and renders them into a day/time grid, handling both 1-hour and 2-hour slot placement.
6. The **FilterModal** applies day/time/conflict/subject filters against the full course list, groups results by subject, and lets the user drill into individual sections via **SubjectCard** → **CourseCard**.
7. **DownloadPDFModal** generates an HTML document from selected courses, renders it in a hidden iframe with html2canvas, and saves the result as a PDF via jsPDF.

## Project Structure

```
frontend/
├── public/
│   ├── logo.png                    App favicon
│   ├── logo-transparent.png        Header/nav logo
│   ├── clear-storage.html          Utility page to clear localStorage
│   └── vite.svg                    Default Vite asset
├── src/
│   ├── main.jsx                    Entry point — BrowserRouter, theme init
│   ├── App.jsx                     Route definitions (/ and /home)
│   ├── index.css                   Design system — CSS variables, animations, component classes
│   ├── App.css                     (empty)
│   ├── pages/
│   │   ├── LandingPage.jsx         Marketing landing page with features, how-it-works, credits
│   │   └── HomePage.jsx            Main app — timetable grid + sidebar + modals
│   ├── components/
│   │   ├── Header.jsx              Sticky header with search, filter button, theme toggle
│   │   ├── TimeTable.jsx           Weekly schedule grid rendering selected courses
│   │   ├── SelectedCoursesBox.jsx  Sidebar listing selected courses with remove/copy actions
│   │   ├── CourseCard.jsx          Individual course card used in filter results
│   │   ├── SubjectCard.jsx         Subject group card used in filter results
│   │   ├── DownloadPDFBtn.jsx      Download timetable button
│   │   ├── Footer.jsx              App footer with credits and GitHub link
│   │   └── ui/                     Reusable animated UI primitives (3d-pin, animated-card, FeatureCard3D)
│   ├── Modals/
│   │   ├── PasteDataModal.jsx      Paste raw CAMU text and parse courses
│   │   ├── Filter.Modal.jsx        Filter courses by day/time/conflict/subject
│   │   ├── ShowConflicts.Modal.jsx Display conflict details when adding a clashing course
│   │   └── DownloadPDF.Modal.jsx   Filename input and PDF download trigger
│   ├── store/
│   │   ├── courseStore.js          Zustand store — courses, selection, search, filtering
│   │   └── themeStore.js           Zustand store — dark/light mode toggle
│   ├── utils/
│   │   ├── parseRawCourseData.js   Parses raw CAMU enrollment page text into course objects
│   │   ├── timeSlots.js            Time slot parsing, overlap detection, duration helpers
│   │   ├── filterByFreeDaysAndTimes.js  Excludes courses on specified free days/times
│   │   ├── filterByNotConflict.js  Excludes courses conflicting with selected courses
│   │   ├── findConfictingCourse.js Returns detailed conflict info for a course vs. selections
│   │   ├── findSubjectDetails.js   Groups courses by subject name with section counts
│   │   ├── hasConflict.js          Boolean conflict check (used for search result indicators)
│   │   ├── hasSameSubject.js       Checks if a course shares a subject with selections
│   │   └── toasts/                 Toast notification factories (conflict, duplicate, sameSubject, success)
│   ├── libs/
│   │   ├── downloadPDF.js          HTML-to-PDF generation logic
│   │   └── utils.js                cn() utility (clsx + tailwind-merge)
│   ├── types/
│   │   └── courseSchedule.types.js  Course shape, factory, and validation functions
│   └── assets/
│       ├── feedback.png            Static image asset
│       └── react.svg               Default React asset
├── index.html                      HTML entry point (Be Vietnam Pro font, meta tags)
├── vite.config.js                  Vite config with React and Tailwind plugins
├── eslint.config.js                ESLint flat config
├── vercel.json                     Vercel SPA rewrite rule
├── Dockerfile                      Docker dev container (Node 20 Alpine)
├── .dockerignore
├── .gitignore
├── .env                            VITE_API_URL (legacy, not used by current code)
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (with `--host` for network access).

## Available Scripts

All scripts are run from the `frontend/` directory.

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server with `--host` flag |
| `build` | `npm run build` | Production build to `dist/` |
| `preview` | `npm run preview` | Preview the production build locally |
| `lint` | `npm run lint` | Run ESLint across the project |

## Application Flow

### Loading course data

1. Open the app at `/` (Landing Page).
2. Click "Paste Course Data".
3. Copy the full text of your CAMU Full Registration page (`Ctrl+A` → `Ctrl+C`).
4. Paste into the modal and click "Load Courses".
5. The parser extracts course sections and navigates to `/home`.
6. On subsequent visits, the app auto-redirects to `/home` if courses are already loaded (persisted in localStorage).

### Building a timetable

1. Use the search bar to find courses by name, instructor, or section ID.
2. Click a search result to add it. The app validates for duplicates, same-subject conflicts, and time-slot overlaps.
3. Alternatively, open the **Filter** modal to browse courses by subject, filtered by your free days/times.
4. Selected courses appear in the sidebar and on the timetable grid.

### Exporting

1. Click "Download Timetable" in the sidebar.
2. Enter a filename and click "Download".
3. A styled PDF is generated and saved to your device.

## Course Data Format

Each course object follows this shape:

```javascript
{
  uniqueId: "priceTab_CSE101_T2-A1",
  courseName: "CSE101 Introduction to Programming [4 Credits]",
  displayName: "Introduction to Programming",
  staff: "Dr. Smith",
  credits: 4,
  slots: [
    { day: "Monday", time: "8-10" },
    { day: "Wednesday", time: "10-11" }
  ]
}
```

**Valid days:** Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

**Valid time slots:** `8-9`, `9-10`, `10-11`, `11-12`, `1-2`, `2-3`, `3-4`, `4-5`, `8-10`, `10-12`, `1-3`, `3-5`

## Styling

The app uses a **Cal.com-inspired monochrome design system** defined entirely through CSS custom properties in `index.css`:

- **Light/dark mode** via `.dark` class on `<html>`, toggled by the theme store.
- **Shadow-first card depth** using multi-layered box-shadows (`--shadow-card`, `--shadow-elevated`, `--shadow-modal`).
- **Typography** via "Be Vietnam Pro" (Google Fonts), loaded in `index.html`.
- **Tailwind CSS 4** for utility classes, extended by custom CSS classes (`.btn-primary`, `.btn-brand`, `.clean-card`, `.badge-clean`, `.input-modern`, `.modal-overlay`, etc.).
- **Animations** defined as CSS `@keyframes` with utility classes (`.animate-fade-in`, `.animate-fade-in-up`, etc.) and stagger delays.
- **Reduced motion** respected via `prefers-reduced-motion` media query.

## State Management

Two Zustand stores:

**`courseStore`** (persisted to `localStorage` as `course-storage`):
- `courses` — full catalog of all loaded courses
- `selectedCourses` — user's chosen courses shown on the timetable
- `searchedCourses` — current search results (not persisted)
- `filteredCourses` — courses after applying filters (not persisted)
- `filterOptions` — current filter state: days, times, notConflict, notSameSubject
- Actions: `setCourses`, `searchCourses`, `addSelectedCourses`, `removeSelectedCourse`, `filterCourses`, `setFilterOptions`, `getCourseByName`, `getSubjectDetails`

**`themeStore`** (persisted manually to `localStorage` as `enrollmate-theme`):
- `isDarkMode` — boolean
- Actions: `toggleTheme`, `initTheme`

## Deployment

### Vercel (recommended)

The project includes `vercel.json` with SPA rewrites. Deploy the `frontend/` directory as a static site:

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Docker

```bash
cd frontend
docker build -t enrollmate .
docker run -p 5173:5173 enrollmate
```

Note: The Dockerfile runs the dev server — for production, build and serve the `dist/` folder with a static server.

### Any static host

Build and deploy the `dist/` output:

```bash
cd frontend
npm run build
# Upload dist/ to Netlify, GitHub Pages, Cloudflare Pages, etc.
```

## Troubleshooting

- **No courses loaded after paste** — Verify you copied the full CAMU page text (not just a table). Check the browser console for parse errors.
- **Courses missing after refresh** — State is persisted under the `course-storage` key in localStorage. Visit `/clear-storage.html` to reset if corrupted.
- **Conflict detection not triggering** — Verify course slot `day` uses full names ("Monday", not "Mon") and `time` matches the valid slot format.
- **PDF export blank or broken** — Ensure at least one course is selected. Check console for html2canvas errors. Popup/download blockers may interfere.
- **State stale after changes** — Clear localStorage via the browser DevTools or the `/clear-storage.html` utility page, then reload.
- **Dev server header size errors** — The dev script includes `--max-http-header-size=524288` to handle large localStorage reads.

## Credits

- **Concept:** Prakathiswararn
- **Built by:** Santhosh Sandy, Bala Saravanan K
- **Via:** Tech Society, Saveetha Engineering College

## License

Educational and personal use.
