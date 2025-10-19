/**
 * @fileoverview TimeTable - Weekly course schedule visualization
 * @description Displays courses in a grid format showing weekly time slots
 */

import React from "react";
import { DAYS, TIME_SLOTS } from "../utils/constants";
import { findCourseForSlot } from "../utils/courseUtils";

/**
 * TimeTable Component
 * Displays a weekly timetable grid with scheduled courses
 *
 * Features:
 * - 6-day week (Monday-Saturday)
 * - 4 time slots per day
 * - Color-coded course cells
 * - Responsive design with horizontal scrolling on mobile
 * - Hover effects on cells
 *
 * @param {Object} props - Component props
 * @param {Array} props.courses - Array of selected courses with time slots
 * @returns {JSX.Element} TimeTable component
 */
const TimeTable = ({ courses = [] }) => {
  /**
   * Finds the course scheduled for a specific day and time
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   * @returns {Object|undefined} Course object if found
   */
  const getCourseForSlot = (day, time) => {
    return findCourseForSlot({ day, time, courses });
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-2 py-2 sm:px-3 sm:py-2 text-left text-white font-semibold border-b border-gray-600 w-24 sm:w-32">
                Day / Time
              </th>
              {TIME_SLOTS.map((slot) => (
                <th
                  key={slot}
                  className="px-2 py-2 sm:px-3 sm:py-2 text-center text-white font-semibold border-b border-l border-gray-600"
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, dayIndex) => (
              <tr
                key={day}
                className={`${
                  dayIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                } hover:bg-gray-700 transition-colors duration-200`}
              >
                <td className="px-2 py-2 sm:px-3 sm:py-2 text-white font-medium border-b border-gray-600 text-xs sm:text-sm">
                  {day}
                </td>
                {TIME_SLOTS.map((slot) => {
                  const scheduledCourse = getCourseForSlot(day, slot);

                  return (
                    <td
                      key={`${day}-${slot}`}
                      className="px-2 py-2 sm:px-3 sm:py-2 text-center border-b border-l border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="min-h-[24px] sm:min-h-[32px] flex items-center justify-center">
                        {scheduledCourse ? (
                          <div
                            className={`px-2 py-1 rounded text-xs text-white ${scheduledCourse.color} w-full text-center`}
                          >
                            <div className="font-medium truncate">
                              {scheduledCourse.courseName}
                            </div>
                            <div className="text-xs opacity-90 truncate">
                              {scheduledCourse.staff}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">Free</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
