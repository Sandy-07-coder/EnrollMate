/**
 * @fileoverview CoursesList - Selected courses sidebar
 * @description Displays the user's selected courses with details and management actions
 */

import React from "react";
import SelectAvailableCourseBtn from "./SelectAvailableCourseBtn";
import { calculateTotalCredits } from "../utils/courseUtils";

/**
 * CoursesList Component
 * Sidebar component displaying the user's selected courses
 *
 * Features:
 * - List of selected courses with details
 * - Color indicator for each course
 * - Remove button for each course
 * - Total courses and credits summary
 * - Empty state message
 * - Button to select more courses
 *
 * @param {Object} props - Component props
 * @param {Array} props.courses - Array of selected courses
 * @param {Function} props.onSelectAvailableCourse - Callback to open available courses modal
 * @param {Function} props.onRemoveCourse - Callback to remove a course
 * @returns {JSX.Element} CoursesList component
 */
const CoursesList = ({ courses, onSelectAvailableCourse, onRemoveCourse }) => {
  const totalCredits = calculateTotalCredits(courses);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-fit">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        Selected Courses
      </h3>

      <div className="mb-4">
        <SelectAvailableCourseBtn onClick={onSelectAvailableCourse} />
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-700 rounded-lg p-3 border border-gray-600 hover:bg-gray-650 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {course.courseName}
                  </h4>
                  <p className="text-gray-400 text-xs">Staff: {course.staff}</p>
                  <p className="text-gray-300 text-xs">
                    Credits: {course.credits}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveCourse(course.id)}
                className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No courses selected</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-600">
        <div className="flex justify-between text-gray-300 text-xs">
          <span>Total Courses: {courses.length}</span>
          <span>Total Credits: {totalCredits}</span>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
