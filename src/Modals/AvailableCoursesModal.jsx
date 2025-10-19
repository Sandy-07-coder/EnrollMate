/**
 * @fileoverview AvailableCoursesModal - Modal for browsing available courses
 * @description Allows users to browse and select from system-wide available courses
 */

import React, { useState } from "react";
import SelectCourseModal from "./SelectCourseModal";
import StaffSelectionModal from "./StaffSelectionModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CourseCard from "../components/CourseCard";
import {
  hasTimeSlots as checkHasTimeSlots,
  findStaffOption,
} from "../utils/courseUtils";

/**
 * AvailableCoursesModal Component
 * Modal for browsing and selecting from available courses
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Array} props.availableCourses - List of available courses in the system
 * @param {Array} props.selectedCourses - User's currently selected courses
 * @param {Function} props.onSelectCourse - Callback when a course is selected
 * @param {Function} props.onDeleteCourse - Callback when a course is deleted
 * @returns {JSX.Element} AvailableCoursesModal component
 */
const AvailableCoursesModal = ({
  isOpen,
  onClose,
  availableCourses = [],
  selectedCourses = [],
  onSelectCourse,
  onDeleteCourse,
}) => {
  // Modal state for nested modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedCourseToSchedule, setSelectedCourseToSchedule] =
    useState(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [selectedCourseForStaff, setSelectedCourseForStaff] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  if (!isOpen) return null;

  /**
   * Handles course card click
   * @param {Object} course - Course object that was clicked
   */
  const handleCourseClick = (course) => {
    // Check if course has time slots configured
    const hasTimeSlots = checkHasTimeSlots(course);

    if (!hasTimeSlots) {
      return; // No time slots configured
    }

    // Check if course has staff options
    if (course.staffOptions && course.staffOptions.length > 0) {
      // Show staff selection modal
      setSelectedCourseForStaff(course);
      setIsStaffModalOpen(true);
    } else {
      // Directly add the course (no staff options)
      onSelectCourse(course);
      onClose();
    }
  };

  /**
   * Handles staff selection from StaffSelectionModal
   * @param {Object} course - Course object
   * @param {string} selectedStaffName - Name of selected staff member
   */
  const handleStaffSelection = (course, selectedStaffName) => {
    // Find the selected staff's specific time slots
    const selectedStaffOption = findStaffOption(course, selectedStaffName);

    // Create course object with selected staff and their time slots
    const courseWithSelectedStaff = {
      ...course,
      staff: selectedStaffName,
      selectedSlots:
        selectedStaffOption?.selectedSlots || course.selectedSlots || [],
    };

    onSelectCourse(courseWithSelectedStaff);
    setIsStaffModalOpen(false);
    onClose();
  };

  /**
   * Closes staff selection modal
   */
  const handleStaffModalClose = () => {
    setIsStaffModalOpen(false);
    setSelectedCourseForStaff(null);
  };

  /**
   * Handles delete request from staff modal
   * @param {Object} course - Course to delete
   */
  const handleDeleteRequest = (course) => {
    setCourseToDelete(course);
    setIsStaffModalOpen(false); // Close staff modal
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  /**
   * Handles confirmed deletion
   * @param {Object} course - Course to delete
   */
  const handleConfirmDelete = (course) => {
    if (onDeleteCourse) {
      onDeleteCourse(course);
    }
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  /**
   * Closes delete confirmation modal
   */
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

  /**
   * Closes schedule modal
   */
  const handleScheduleModalClose = () => {
    setIsScheduleModalOpen(false);
    setSelectedCourseToSchedule(null);
  };

  /**
   * Handles saving schedule from nested modal
   * @param {Object} courseWithSchedule - Course with schedule data
   */
  const handleSaveSchedule = (courseWithSchedule) => {
    onSelectCourse(courseWithSchedule);
    handleScheduleModalClose();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gray-800 border-b border-gray-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Available Courses</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="text-gray-300 mb-6">
              Browse and select from available courses. Click on a course to
              select staff and add to your schedule. You can change staff by
              selecting the course again.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableCourses.map((course) => {
                const isAlreadySelected = selectedCourses.some(
                  (c) => c.courseName === course.courseName
                );
                const hasTimeSlots = checkHasTimeSlots(course);

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isSelected={isAlreadySelected}
                    hasTimeSlots={hasTimeSlots}
                    onClick={() => handleCourseClick(course)}
                  />
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-gray-800 border-t border-gray-600 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Selection Modal */}
      {selectedCourseToSchedule && (
        <SelectCourseModal
          isOpen={isScheduleModalOpen}
          onClose={handleScheduleModalClose}
          onSave={handleSaveSchedule}
          existingCourses={selectedCourses}
          prefilledCourse={selectedCourseToSchedule}
        />
      )}

      {/* Staff Selection Modal */}
      <StaffSelectionModal
        isOpen={isStaffModalOpen}
        onClose={handleStaffModalClose}
        course={selectedCourseForStaff}
        onSelectStaff={handleStaffSelection}
        onDeleteCourse={handleDeleteRequest}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleConfirmDelete}
        course={courseToDelete}
      />
    </>
  );
};

export default AvailableCoursesModal;
