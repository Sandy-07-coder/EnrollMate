/**
 * @fileoverview SelectCourseModal - Modal for adding new courses
 * @description Allows users to add new courses with time slot selection and conflict checking
 */

import React, { useState, useEffect } from "react";
import TimeSlotGrid from "../components/TimeSlotGrid";
import {
  hasTimeSlotConflict,
  createSlotKey,
  findCourseForSlot,
} from "../utils/courseUtils";
import { CREDITS_CONFIG } from "../utils/constants";

/**
 * SelectCourseModal Component
 * Modal for adding new courses to the system with time slot selection
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Function} props.onSave - Callback with course data when saved
 * @param {Array} props.existingCourses - Existing courses for conflict checking
 * @param {Object} props.prefilledCourse - Pre-filled course data (for editing)
 * @param {boolean} props.checkConflicts - Enable/disable conflict checking
 * @returns {JSX.Element} SelectCourseModal component
 */
const SelectCourseModal = ({
  isOpen,
  onClose,
  onSave,
  existingCourses = [],
  prefilledCourse = null,
  checkConflicts = false,
}) => {
  // Course data state
  const [courseData, setCourseData] = useState({
    courseName: "",
    staff: "",
    credits: "",
    selectedSlots: [],
  });

  // Conflict popup state
  const [showConflictPopup, setShowConflictPopup] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);

  // Pre-fill course data if provided (edit mode)
  useEffect(() => {
    if (prefilledCourse) {
      setCourseData({
        courseName: prefilledCourse.courseName || "",
        staff: prefilledCourse.staff || "",
        credits: prefilledCourse.credits || "",
        selectedSlots: [],
      });
    }
  }, [prefilledCourse]);

  /**
   * Checks if a time slot has a conflict
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   * @returns {boolean} True if conflict exists
   */
  const checkTimeConflict = (day, time) => {
    return hasTimeSlotConflict({ day, time, courses: existingCourses });
  };

  /**
   * Handles time slot selection/deselection
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   */
  const handleSlotToggle = (day, time) => {
    const slotKey = createSlotKey(day, time);

    // Check for conflicts if enabled
    if (checkConflicts) {
      const isConflict = checkTimeConflict(day, time);

      if (isConflict) {
        const conflictingCourse = findCourseForSlot({
          day,
          time,
          courses: existingCourses,
        });

        setConflictDetails({
          day,
          time,
          conflictingCourse: conflictingCourse?.courseName || "Unknown Course",
        });
        setShowConflictPopup(true);
        return;
      }
    }

    // Toggle slot selection
    setCourseData((prev) => {
      const newSlot = { day, time, slotKey };
      const isSelected = prev.selectedSlots.some(
        (slot) => slot.slotKey === slotKey
      );

      return {
        ...prev,
        selectedSlots: isSelected
          ? prev.selectedSlots.filter((slot) => slot.slotKey !== slotKey)
          : [...prev.selectedSlots, newSlot],
      };
    });
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !courseData.courseName?.trim() ||
      !courseData.staff?.trim() ||
      !courseData.credits ||
      courseData.selectedSlots.length === 0
    ) {
      alert("Please fill all fields and select at least one time slot");
      return;
    }

    onSave(courseData);
    handleClose();
  };

  /**
   * Handles modal close and resets form
   */
  const handleClose = () => {
    setCourseData({
      courseName: "",
      staff: "",
      credits: "",
      selectedSlots: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gray-800 border-b border-gray-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Add New Course</h2>
            <button
              onClick={handleClose}
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
          <form onSubmit={handleSubmit} className="p-6">
            {/* Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseData.courseName}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      courseName: e.target.value,
                    }))
                  }
                  disabled={!!prefilledCourse}
                  className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    prefilledCourse ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Staff Name *
                </label>
                <input
                  type="text"
                  value={courseData.staff}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      staff: e.target.value,
                    }))
                  }
                  disabled={!!prefilledCourse}
                  className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    prefilledCourse ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="Enter staff name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Credits *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={courseData.credits}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      credits: parseInt(e.target.value) || "",
                    }))
                  }
                  disabled={!!prefilledCourse}
                  className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    prefilledCourse ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  placeholder="Enter credits"
                  required
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Select Time Slots *
              </h3>
              <TimeSlotGrid
                selectedSlots={courseData.selectedSlots}
                onSlotToggle={handleSlotToggle}
                checkConflict={checkTimeConflict}
                checkConflicts={checkConflicts}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-end sm:space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Conflict Popup */}
      {showConflictPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Time Conflict Detected
                </h3>
              </div>

              <p className="text-gray-300 mb-4">
                The time slot{" "}
                <span className="font-semibold text-white">
                  {conflictDetails?.day} {conflictDetails?.time}
                </span>{" "}
                is already occupied by{" "}
                <span className="font-semibold text-blue-400">
                  {conflictDetails?.conflictingCourse}
                </span>
                .
              </p>

              <p className="text-gray-400 text-sm mb-6">
                Please select a different time slot to avoid scheduling
                conflicts.
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowConflictPopup(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectCourseModal;
