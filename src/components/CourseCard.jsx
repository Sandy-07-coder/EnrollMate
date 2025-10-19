/**
 * @fileoverview CourseCard - Display card for available courses
 * @description Reusable card component showing course information with selection status
 */

import React from "react";

/**
 * CourseCard Component
 * Displays an available course with its details and selection status
 *
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @param {boolean} props.isSelected - Whether course is already in user's schedule
 * @param {boolean} props.hasTimeSlots - Whether course has time slots configured
 * @param {Function} props.onClick - Callback when card is clicked
 * @param {Function} props.onDelete - Optional callback to delete the course from available courses
 * @param {boolean} props.showDelete - Whether to show delete button
 * @returns {JSX.Element} CourseCard component
 */
const CourseCard = ({ course, isSelected, hasTimeSlots, onClick, onDelete, showDelete = false }) => {
  /**
   * Gets the card border color class based on status
   * @returns {string} CSS class string
   */
  const getBorderColorClass = () => {
    if (!hasTimeSlots) return "border-red-500";
    if (isSelected) return "border-green-500";
    return "border-gray-600";
  };

  /**
   * Gets the hover classes based on status
   * @returns {string} CSS class string
   */
  const getHoverClasses = () => {
    if (!hasTimeSlots) return "opacity-75 cursor-not-allowed";
    return "cursor-pointer hover:border-blue-500 hover:bg-gray-650 hover:shadow-lg";
  };

  /**
   * Gets the status badge based on course state
   * @returns {JSX.Element} Status badge element
   */
  const getStatusBadge = () => {
    if (!hasTimeSlots) {
      return (
        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
          No Schedule
        </span>
      );
    }
    if (isSelected) {
      return (
        <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
          Change Staff
        </span>
      );
    }
    return (
      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
        Click to Add
      </span>
    );
  };

  /**
   * Gets the staff display text
   * @returns {string} Staff information text
   */
  const getStaffText = () => {
    if (course.staffOptions && course.staffOptions.length > 1) {
      return `${course.staffOptions.length} options available`;
    }
    return course.staff || course.staffOptions?.[0]?.name || "TBA";
  };

  /**
   * Gets the time slots information text
   * @returns {string} Time slots information
   */
  const getTimeSlotsText = () => {
    if (!hasTimeSlots) return "";

    if (course.staffOptions && course.staffOptions.length > 0) {
      return `${course.staffOptions.length} staff with schedules`;
    }

    const slotCount = course.selectedSlots?.length || 0;
    return `${slotCount} time slot${slotCount > 1 ? "s" : ""} configured`;
  };

  /**
   * Handles delete button click
   * @param {Event} e - Click event
   */
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (onDelete) {
      onDelete(course.id);
    }
  };

  return (
    <div
      onClick={() => hasTimeSlots && onClick()}
      className={`bg-gray-700 rounded-lg p-4 border transition-all duration-200 ${getBorderColorClass()} ${getHoverClasses()} relative`}
    >
      {/* Delete Button (if enabled) */}
      {showDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 z-10"
          title="Remove from available courses"
        >
          <svg
            className="w-4 h-4"
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
      )}

      {/* Course Name and Status */}
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`text-white font-semibold text-lg ${
            hasTimeSlots
              ? "hover:text-blue-400 cursor-pointer transition-colors duration-200"
              : ""
          }`}
        >
          {course.courseName}
          {hasTimeSlots &&
            course.staffOptions &&
            course.staffOptions.length > 1 && (
              <span className="ml-2 text-xs text-blue-400">
                ({course.staffOptions.length} staff options)
              </span>
            )}
        </h3>
        {getStatusBadge()}
      </div>

      {/* Course Details */}
      <p className="text-gray-400 text-sm mb-1">Staff: {getStaffText()}</p>
      <p className="text-gray-300 text-sm mb-1">Credits: {course.credits}</p>
      {hasTimeSlots && (
        <p className="text-blue-400 text-xs">{getTimeSlotsText()}</p>
      )}
    </div>
  );
};

export default CourseCard;
