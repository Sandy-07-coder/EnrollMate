/**
 * @fileoverview AddCourseBtn - Button to open course creation modal
 * @description Button for administrators to add new courses to the system
 */

import React from "react";

/**
 * AddCourseBtn Component
 * Button to open the "Add New Course" modal
 *
 * Features:
 * - Blue-to-purple gradient background
 * - Hover scale animation
 * - Plus icon
 * - Full width in sidebar
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Callback when button is clicked
 * @returns {JSX.Element} AddCourseBtn component
 */
const AddCourseBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-blue-500/30"
      aria-label="Add new course"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="text-sm font-semibold">Add New Course</span>
      </div>
    </button>
  );
};

export default AddCourseBtn;
