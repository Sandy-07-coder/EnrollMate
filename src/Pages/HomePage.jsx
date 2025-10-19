/**
 * @fileoverview HomePage - Main application page
 * @description Orchestrates the course enrollment system, managing state and rendering the UI
 */

import React from "react";
import Header from "../components/Header";
import TimeTable from "../components/TimeTable";
import CoursesList from "../components/CoursesList";
import AddCourseBtn from "../components/AddCourseBtn";
import SelectCourseModal from "../Modals/SelectCourseModal";
import AvailableCoursesModal from "../Modals/AvailableCoursesModal";
import NotificationModal from "../Modals/NotificationModal";
import Footer from "../components/Footer";
import {
  useNotification,
  useAvailableCourses,
  useSelectedCourses,
  useModals,
} from "../utils/hooks";

/**
 * HomePage Component
 * Main container for the course enrollment application
 *
 * Features:
 * - Add new courses to the system (admin function)
 * - Browse and select from available courses
 * - Manage personal course schedule
 * - View timetable visualization
 * - Handle notifications
 *
 * @returns {JSX.Element} HomePage component
 */
const HomePage = () => {
  // Notification system
  const { notification, showNotification, closeNotification } =
    useNotification();

  // Available courses management (system-wide)
  const { availableCourses, saveCourse, deleteCourse } =
    useAvailableCourses(showNotification);

  // Selected courses management (user's schedule)
  const { courses, selectCourse, removeCourse } =
    useSelectedCourses(showNotification);

  // Modal states
  const {
    isAddCourseModalOpen,
    isAvailableCoursesModalOpen,
    openAddCourseModal,
    closeAddCourseModal,
    openAvailableCoursesModal,
    closeAvailableCoursesModal,
  } = useModals();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Application Header */}
      <Header />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 flex-grow">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
          {/* Timetable Section */}
          <div className="lg:col-span-3 py-4 sm:py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6">
              Course Schedule
            </h2>
            <TimeTable courses={courses} />
          </div>

          {/* Sidebar - Course List and Actions */}
          <div className="lg:col-span-1 py-4 sm:py-6">
            <div className="space-y-4">
              <CoursesList
                courses={courses}
                onSelectAvailableCourse={openAvailableCoursesModal}
                onRemoveCourse={removeCourse}
              />
              <AddCourseBtn onClick={openAddCourseModal} />
            </div>
          </div>
        </section>
      </main>

      {/* Add New Course Modal (Admin Function) */}
      <SelectCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={closeAddCourseModal}
        onSave={saveCourse}
        existingCourses={courses}
        checkConflicts={false} // No conflict checking for admin
      />

      {/* Available Courses Modal (Student Selection) */}
      <AvailableCoursesModal
        isOpen={isAvailableCoursesModalOpen}
        onClose={closeAvailableCoursesModal}
        availableCourses={availableCourses}
        selectedCourses={courses}
        onSelectCourse={selectCourse}
        onDeleteCourse={deleteCourse}
      />

      {/* Notification Modal (User Feedback) */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />

      {/* Application Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
