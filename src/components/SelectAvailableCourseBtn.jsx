/**
 * @fileoverview SelectAvailableCourseBtn - Button to open available courses modal
 * @description Button for students to browse and select from available courses
 */

import React from "react";

/**
 * SelectAvailableCourseBtn Component
 * Button to open the "Available Courses" modal
 *
 * Features:
 * - Green-to-teal gradient background
 * - Hover scale animation
 * - Clipboard check icon
 * - Full width in sidebar
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Callback when button is clicked
 * @returns {JSX.Element} SelectAvailableCourseBtn component
 */
const SelectAvailableCourseBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-green-500/30"
      aria-label="Select available course"
    >
      <div className="flex items-center justify-center space-x-2">
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <span className="text-sm font-semibold">Select Available Course</span>
      </div>
    </button>
  );
};

export default SelectAvailableCourseBtn;
