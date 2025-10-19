/**
 * @fileoverview StaffSelectionModal - Modal for selecting course instructor
 * @description Allows users to choose from multiple staff options for a course
 */

import React from "react";

/**
 * StaffSelectionModal Component
 * Modal for selecting a staff member when a course has multiple instructors
 *
 * Features:
 * - List of available staff options
 * - Time slots preview for each staff member
 * - Click to select preferred instructor
 * - Department information display
 * - Option to delete the course from available courses
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Object} props.course - Course object with staffOptions array
 * @param {Function} props.onSelectStaff - Callback with course and selected staff name
 * @param {Function} props.onDeleteCourse - Callback to delete the course (optional)
 * @returns {JSX.Element|null} StaffSelectionModal component or null if closed
 */
const StaffSelectionModal = ({
  isOpen,
  onClose,
  course,
  onSelectStaff,
  onDeleteCourse,
}) => {
  if (!isOpen || !course) return null;

  /**
   * Handles staff selection
   * @param {string} staffName - Name of selected staff member
   */
  const handleStaffClick = (staffName) => {
    onSelectStaff(course, staffName);
    onClose();
  };

  /**
   * Handles delete button click
   */
  const handleDeleteClick = () => {
    if (onDeleteCourse) {
      onDeleteCourse(course);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">
              Select Staff for {course.courseName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
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

          <p className="text-gray-400 text-sm mb-4">
            This course is taught by multiple staff members. Please select your
            preferred instructor:
          </p>

          <div className="space-y-3">
            {course.staffOptions?.map((staffOption, index) => (
              <button
                key={index}
                onClick={() => handleStaffClick(staffOption.name)}
                className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-500 rounded-lg p-4 text-left transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {staffOption.name}
                    </h4>
                    {staffOption.department && (
                      <p className="text-gray-400 text-sm mt-1">
                        {staffOption.department}
                      </p>
                    )}
                    {staffOption.selectedSlots &&
                      staffOption.selectedSlots.length > 0 && (
                        <div className="mt-2">
                          <p className="text-blue-400 text-xs mb-1">
                            Time Slots:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {staffOption.selectedSlots.map((slot, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded"
                              >
                                {slot.day.slice(0, 3)} {slot.time}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                  <svg
                    className="w-5 h-5 text-blue-400 ml-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Delete Course Button */}
          {onDeleteCourse && (
            <div className="mt-6 pt-4 border-t border-gray-600">
              <button
                onClick={handleDeleteClick}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete This Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffSelectionModal;
