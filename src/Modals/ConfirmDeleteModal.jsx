/**
 * @fileoverview ConfirmDeleteModal - Modal for confirming course deletion
 * @description Confirmation dialog before deleting an available course
 */

import React from "react";

/**
 * ConfirmDeleteModal Component
 * Modal for confirming deletion of an available course
 *
 * Features:
 * - Warning message with course details
 * - Confirm/Cancel actions
 * - Visual warning indicators
 * - Prevents accidental deletions
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal closes
 * @param {Function} props.onConfirm - Callback when deletion is confirmed
 * @param {Object} props.course - Course object to be deleted
 * @returns {JSX.Element|null} ConfirmDeleteModal component or null if closed
 */
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, course }) => {
  if (!isOpen || !course) return null;

  /**
   * Handles confirm button click
   */
  const handleConfirm = () => {
    onConfirm(course);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[70] p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border-2 border-red-500/50">
        <div className="p-6">
          {/* Warning Icon and Title */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500/20 rounded-full p-3">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white text-center mb-2">
            Delete Available Course?
          </h3>

          <p className="text-gray-300 text-center mb-4">
            Are you sure you want to delete this course from available courses?
          </p>

          {/* Course Details */}
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div>
                <span className="text-gray-400 text-sm">Course Name:</span>
                <p className="text-white font-semibold">{course.courseName}</p>
              </div>
              {course.credits && (
                <div>
                  <span className="text-gray-400 text-sm">Credits:</span>
                  <p className="text-white">{course.credits}</p>
                </div>
              )}
              {course.staffOptions && course.staffOptions.length > 0 && (
                <div>
                  <span className="text-gray-400 text-sm">
                    Staff Members ({course.staffOptions.length}):
                  </span>
                  <p className="text-white">
                    {course.staffOptions.map((s) => s.name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-yellow-200 text-sm font-semibold">
                  Warning!
                </p>
                <p className="text-yellow-200/80 text-xs mt-1">
                  This action cannot be undone. The course will be permanently
                  removed from available courses.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
