/**
 * @fileoverview TimeSlotGrid - Interactive time slot selection grid
 * @description Reusable component for selecting time slots in a weekly timetable format
 */

import React from "react";
import { DAYS, TIME_SLOTS } from "../utils/constants";
import { createSlotKey } from "../utils/courseUtils";

/**
 * TimeSlotGrid Component
 * Displays an interactive grid for selecting course time slots
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedSlots - Currently selected time slots
 * @param {Function} props.onSlotToggle - Callback when a slot is toggled (day, time)
 * @param {Function} props.checkConflict - Function to check if slot has conflict (day, time)
 * @param {boolean} props.checkConflicts - Whether to enable conflict checking
 * @returns {JSX.Element} TimeSlotGrid component
 */
const TimeSlotGrid = ({
  selectedSlots = [],
  onSlotToggle,
  checkConflict,
  checkConflicts = false,
}) => {
  /**
   * Checks if a specific slot is selected
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   * @returns {boolean} True if slot is selected
   */
  const isSlotSelected = (day, time) => {
    return selectedSlots.some((slot) => slot.day === day && slot.time === time);
  };

  /**
   * Gets the CSS classes for a slot button
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   * @returns {string} CSS class string
   */
  const getSlotButtonClasses = (day, time) => {
    const isSelected = isSlotSelected(day, time);
    const isConflict = checkConflicts && checkConflict(day, time);

    if (isSelected) {
      return "bg-blue-600 text-white";
    }
    if (isConflict) {
      return "bg-red-600 text-white cursor-not-allowed opacity-75";
    }
    return "bg-gray-600 text-gray-300 hover:bg-gray-500";
  };

  /**
   * Gets the button label text
   * @param {string} day - Day of the week
   * @param {string} time - Time slot
   * @returns {string} Button label
   */
  const getSlotButtonLabel = (day, time) => {
    const isSelected = isSlotSelected(day, time);
    const isConflict = checkConflicts && checkConflict(day, time);

    if (isConflict) return "Conflict";
    if (isSelected) return "Selected";
    return "Available";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-700 border border-gray-600 rounded-lg">
        <thead>
          <tr className="bg-gray-600">
            <th className="px-3 py-2 text-left text-white font-semibold border-b border-gray-500">
              Day / Time
            </th>
            {TIME_SLOTS.map((slot) => (
              <th
                key={slot}
                className="px-3 py-2 text-center text-white font-semibold border-b border-l border-gray-500"
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
                dayIndex % 2 === 0 ? "bg-gray-700" : "bg-gray-750"
              }`}
            >
              <td className="px-3 py-2 text-white font-medium border-b border-gray-600">
                {day}
              </td>
              {TIME_SLOTS.map((time) => {
                const isConflict = checkConflicts && checkConflict(day, time);

                return (
                  <td
                    key={createSlotKey(day, time)}
                    className="px-3 py-2 text-center border-b border-l border-gray-600"
                  >
                    <button
                      type="button"
                      onClick={() => onSlotToggle(day, time)}
                      disabled={isConflict}
                      className={`w-full h-10 rounded transition-all duration-200 ${getSlotButtonClasses(
                        day,
                        time
                      )}`}
                    >
                      {getSlotButtonLabel(day, time)}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-2">
        Selected slots: {selectedSlots.length}
      </p>
    </div>
  );
};

export default TimeSlotGrid;
