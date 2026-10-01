# EnrollMate — AI Agent Skill File

## Project Overview

EnrollMate is a **frontend-only** React SPA for university course timetable planning. Students paste raw text from their CAMU enrollment page, then search, filter, select courses, detect scheduling conflicts, and export a PDF timetable. There is no backend, no database, no server-side API, and no `.env` configuration that the app depends on at runtime.

## Architecture

```
frontend/           ← The entire application lives here
├── src/
│   ├── main.jsx            Entry point (BrowserRouter, theme init)
│   ├── App.jsx             Two routes: / (LandingPage), /home (HomePage)
│   ├── index.css           Design system (CSS custom properties, animations, component classes)
│   ├── pages/              Route-level page components
│   ├── components/         Reusable UI components
│   ├── Modals/             Modal dialog components
│   ├── store/              Zustand stores (courseStore, themeStore)
│   ├── utils/              Pure logic — parsing, filtering, conflict detection, toasts
│   ├── libs/               PDF generation and cn() utility
│   └── types/              Course data shape, factory, validation
└── public/                 Static assets (logos, clear-storage utility page)
```

## Directory Responsibilities

| Directory | Purpose | Rules |
|-----------|---------|-------|
| `src/pages/` | Route-level components. Each maps to one route in `App.jsx`. | One component per file. Composes components from `components/` and `Modals/`. |
| `src/components/` | Reusable UI components consumed by pages. | Stateless where possible; receive data via props or Zustand selectors. |
| `src/components/ui/` | Animated UI primitives (3D pin, animated cards). | Currently unused by the main app — kept as a library. |
| `src/Modals/` | Modal dialogs. Named `*.Modal.jsx` (except PasteDataModal). | Each modal manages its own local state. Receives open/close callbacks via props. |
| `src/store/` | Zustand stores. | `courseStore.js` owns all course state; `themeStore.js` owns theme. Both persist to localStorage. |
| `src/utils/` | Pure functions — no React, no side effects (except toasts). | All conflict/filter/parse logic lives here. Import these rather than duplicating logic. |
| `src/utils/toasts/` | Toast notification factories using `react-hot-toast`. | Each file exports one `show*Toast()` function. |
| `src/libs/` | Heavier utilities: PDF generation, className merging. | `downloadPDF.js` builds an HTML document, renders it offscreen, and converts to PDF. |
| `src/types/` | Course data shape definition and validation. | `createCourse()` normalizes input; `validateCourse()` checks required fields and valid slot values. |
| `public/` | Static assets served at root. | `clear-storage.html` is a diagnostic utility page. |

## Critical Files to Inspect Before Making Changes

- **`src/store/courseStore.js`** — Central state for all course logic. Almost every component reads from or writes to this store. Understand its shape and actions before modifying any feature.
- **`src/utils/parseRawCourseData.js`** — The CAMU text parser. If the CAMU page format changes, this is the only file that needs updating.
- **`src/utils/timeSlots.js`** — Time slot parsing and overlap detection. Used by the timetable renderer, conflict detection, and filtering. The app supports both 1-hour and 2-hour slots.
- **`src/index.css`** — The design system. All CSS custom properties (colors, shadows, radii, timing), reusable classes (`.btn-primary`, `.btn-brand`, `.clean-card`, `.modal-overlay`), and animations are defined here.
- **`src/App.jsx`** — Routes and auto-redirect to `/home` when persisted courses exist.
- **`src/libs/downloadPDF.js`** — PDF generation. Contains its own inline HTML template and reimplements time-slot parsing internally.

## Component Patterns

- **Pages** compose layout from components and modals. `HomePage` holds local state for modal open/close and passes callbacks down.
- **Components** read from Zustand via `useCourseStore()` selector hooks, not via prop drilling from pages.
- **Modals** use the pattern: parent manages `isOpen` boolean state, passes an `onClose`/`closeModal` callback. Modals render `null` when not open, or use the global `.modal-overlay` / `.modal-content` CSS classes.
- **Toast notifications** are triggered by calling `show*Toast()` functions imported from `src/utils/toasts/`. These use `toast.custom()` from `react-hot-toast`.
- **Search results** in the Header are rendered inline as a dropdown, not as a separate page or modal.

## State Management

Two Zustand stores, both using `create()`:

### courseStore (persisted)

```
courses[]              — Full catalog (all loaded course sections)
selectedCourses[]      — User's chosen courses (shown on timetable)
searchedCourses[]      — Current search results (transient)
filteredCourses[]      — Courses after filter application (transient)
subjectDetails[]       — Grouped subject summaries (transient)
filterOptions{}        — { days[], times[], notConflict, notSameSubject }
courseByName[]          — Courses for a specific subject name (transient)
```

Persisted fields (via Zustand `persist` middleware, key `course-storage`): `courses`, `selectedCourses`.

### themeStore (manually persisted)

```
isDarkMode             — boolean (localStorage key: enrollmate-theme)
toggleTheme()          — Flips isDarkMode, updates localStorage and document class
initTheme()            — Called once at boot in main.jsx
```

## Routing

React Router DOM v6, configured in `App.jsx`:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `LandingPage` | Marketing page with features, how-it-works, credits, paste-data modal |
| `/home` | `HomePage` | Main application — timetable, sidebar, search, filter, download modals |

Navigation happens via `useNavigate()` — after loading courses (paste or extension), the app redirects to `/home`.

## Styling Conventions

- **CSS custom properties** in `index.css` define the full color palette, shadow system, timing, and radii. Use `var(--*)` references, not hardcoded colors, for anything theme-aware.
- **Dark mode** is toggled by adding/removing the `dark` class on `<html>`. The `.dark` selector in `index.css` overrides all custom properties.
- **Tailwind CSS 4** is used for utility classes. The Tailwind config is implicit (no `tailwind.config.js`) — it's loaded via the `@tailwindcss/vite` plugin.
- **Inline `style` attributes** are used for dynamic shadows (e.g., `style={{ boxShadow: "var(--shadow-card)" }}`). This is intentional — Tailwind doesn't support multi-layered CSS variable shadows natively.
- **Responsive breakpoints** follow Tailwind defaults: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px). Mobile-first approach. The timetable grid switches to side-scrollable on small screens.
- **Font:** "Be Vietnam Pro" loaded from Google Fonts in `index.html`. Referenced as `font-display` class.
- **Button classes:** `.btn-primary` (charcoal), `.btn-secondary` (white/shadow), `.btn-brand` (blue). Use these rather than creating new button styles.
- **Card class:** `.clean-card` for shadow-first depth cards. Modals use `.modal-overlay` + `.modal-content`.
- **Animations:** Use the predefined `.animate-fade-in`, `.animate-fade-in-up`, etc. classes with `.stagger-N` for delays.
- **`prefers-reduced-motion`** is respected — all animations are suppressed.

## Data and API Patterns

There is **no backend API**. All data comes from:

1. **Raw text parsing** (`parseRawCourseData.js`) — Parses the full text of a CAMU enrollment page line by line, extracting course codes, credits, section IDs, instructor names, and day/time slots.
2. **Zustand persistence** — On subsequent visits, previously loaded courses are restored from localStorage (key `course-storage`).

All filtering, searching, conflict detection, and grouping happen in-memory using pure utility functions in `src/utils/`.

The `.env` file contains `VITE_API_URL` pointing to a legacy localhost backend. This variable is **not used** by any current code. Do not add API calls unless the architecture is intentionally changed.

## Common Development Tasks

### Adding a new page

1. Create a component in `src/pages/`.
2. Add a `<Route>` in `App.jsx`.
3. Use `useNavigate()` for programmatic navigation.

### Adding a new component

1. Create in `src/components/`.
2. Import and use in the relevant page or parent component.
3. Read state from Zustand via `useCourseStore(state => state.someField)`.
4. Use existing CSS classes (`.btn-brand`, `.clean-card`, `.badge-clean`, etc.) from the design system.

### Adding a new modal

1. Create in `src/Modals/` following the `*.Modal.jsx` naming convention.
2. Accept an `onClose` or `closeModal` prop.
3. Use `.modal-overlay` and `.modal-content` classes for consistent styling.
4. Manage open/close state in the parent page.

### Adding a new filter

1. Add the filter option to `filterOptions` in `courseStore.js`.
2. Update `setFilterOptions` and `filterCourses` actions.
3. Add the UI control in `Filter.Modal.jsx`.
4. Implement the filter logic as a pure function in `src/utils/`.

### Adding a new toast notification

1. Create a new file in `src/utils/toasts/` following the existing pattern.
2. Export a `show*Toast()` function using `toast.custom()`.
3. Import and call it from the relevant component.

### Modifying the timetable grid

1. Edit `src/components/TimeTable.jsx`.
2. The `DAYS` and `TIME_SLOTS` arrays define the grid structure.
3. `getCoursesForBlock()` determines which courses appear in each cell.
4. Slot overlap logic is in `src/utils/timeSlots.js`.

### Updating the PDF export

1. Edit `src/libs/downloadPDF.js`.
2. The HTML template is inline in the function. Modify the `htmlContent` template string.
3. Note: this file has its own copies of `parseTimeSlot` and `doSlotsOverlap` — keep them in sync with `timeSlots.js`.

## Rules for AI Agents

1. **Do not introduce a backend, database, or server-side API.** This is a frontend-only project by design.
2. **Do not add `.env` dependencies.** The existing `.env` file is legacy and unused.
3. **Reuse existing components and CSS classes** before creating new ones. Check `index.css` for available classes and `components/` for existing components.
4. **Preserve the design system.** Use `var(--*)` custom properties for colors, shadows, and timing. Do not hardcode hex colors in components (dark mode will break).
5. **Preserve responsive behavior.** Test changes at mobile, tablet, and desktop widths. The header search collapses on mobile; the timetable side-scrolls.
6. **Follow existing naming conventions:**
   - Pages: PascalCase in `pages/`
   - Components: PascalCase in `components/`
   - Modals: `*.Modal.jsx` in `Modals/`
   - Utils: camelCase in `utils/`
   - Stores: `*Store.js` in `store/`
7. **Keep utility functions pure.** No React imports, no side effects, no store access in `utils/` (except toast factories).
8. **Do not duplicate time-slot logic.** Import from `src/utils/timeSlots.js`. (Note: `downloadPDF.js` currently has its own copy — this is a known inconsistency.)
9. **Persist only what's necessary.** Only `courses` and `selectedCourses` should be persisted via Zustand middleware. Transient state (search results, filter results) should not be persisted.
10. **Respect `prefers-reduced-motion`.** Do not add animations that bypass the existing media query.
11. **Do not add unnecessary dependencies.** The project already has Framer Motion for animation, Lucide + React Icons for icons, and Radix for accessible primitives.
12. **Keep the CAMU parser format-specific.** `parseRawCourseData.js` is tightly coupled to the CAMU enrollment page format. Changes should be based on actual CAMU page samples.

## Verification

After making changes, run:

```bash
cd frontend
npm run lint          # ESLint check
npm run build         # Production build (catches import/syntax errors)
npm run dev           # Manual verification in browser
```

There is no test suite configured. Verify features manually:

1. **Paste flow** — Paste sample CAMU text, verify courses load and redirect to `/home`.
2. **Search** — Search by course name, instructor, and section ID.
3. **Add/remove courses** — Verify timetable updates, conflict toasts appear, duplicate/same-subject guards work.
4. **Filters** — Apply day/time/conflict/subject filters, verify results update.
5. **PDF export** — Download a timetable, verify the PDF contains all selected courses.
6. **Dark mode** — Toggle and verify all components render correctly.
7. **Responsive** — Test at mobile width; verify header collapses, timetable scrolls, modals are usable.
8. **Persistence** — Refresh the page; verify selected courses survive.

## Known Limitations

- **No test suite** — There are no unit or integration tests. All verification is manual.
- **`downloadPDF.js` duplicates time-slot logic** — It reimplements `parseTimeSlot` and `doSlotsOverlap` instead of importing from `timeSlots.js`.
- **PDF export excludes Saturday** — The download function's `days` array only includes Monday–Friday, while the timetable grid shows Monday–Saturday.
- **`VITE_API_URL` in `.env`** — Legacy configuration from the previous MERN stack architecture. Not used by any current code.
- **`components/ui/` is unused** — `3d-pin.jsx`, `animated-card-chart.jsx`, and `FeatureCard3D.jsx` are not imported by any page or component in the current app.
- **No type checking** — The project uses plain JavaScript. `@types/react` and `@types/react-dom` are in devDependencies but there is no TypeScript configuration.
- **`axios` is listed as a dependency** — It is not imported anywhere in the current codebase and can be removed.
