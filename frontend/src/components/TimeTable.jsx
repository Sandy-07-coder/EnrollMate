import React from "react";
import { useCourseStore } from "../store/courseStore";

const TimeTable = () => {
  const { selectedCourses } = useCourseStore();
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const TIME_SLOTS = ["8-10", "10-12", "1-3", "3-5"];

  // Array of colors for different courses
  const courseColors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-orange-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-teal-600",
    "bg-rose-600",
    "bg-cyan-600",
    "bg-amber-600",
  ];

  // Function to get a consistent color for each course based on uniqueId
  const getCourseColor = (uniqueId) => {
    if (!uniqueId) return courseColors[0];

    const allCourseIds = selectedCourses.map((c) => c.uniqueId).sort();

    const colorIndex = allCourseIds.indexOf(uniqueId);

    return colorIndex !== -1
      ? courseColors[colorIndex % courseColors.length]
      : courseColors[0];
  };

  // Function to find course for a specific day and time slot
  const getCourseForSlot = (day, timeSlot) => {
    if (!selectedCourses || selectedCourses.length === 0) return null;

    const course = selectedCourses.find((course) => {
      if (!course.slots || course.slots.length === 0) return false;

      return course.slots.some((slot) => {
        return slot.day === day && slot.time === timeSlot;
      });
    });

    return course || null;
  };

  return (
    <div className="h-full bg-transparent p-2 sm:p-4 lg:p-8">
      {/* Header */}
      <div className="mb-3 sm:mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mb-1 sm:mb-2">
          Course Schedule
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm lg:text-lg">
          Your weekly course timetable overview
        </p>
      </div>

      {/* Timetable Container */}
      <div className="w-full">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table
            className="w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg text-sm table-fixed"
            style={{ minWidth: "100%" }}
          >
            <thead>
              <tr className="bg-gray-700">
                {/* Day Column - Fixed width */}
                <th
                  className="px-1 py-1.5 sm:px-2 sm:py-2 text-left text-white font-semibold border-b border-gray-600 text-[10px] sm:text-xs lg:text-sm"
                  style={{ width: "15%" }}
                >
                  <div className="truncate">Day/Time</div>
                </th>
                {/* Time Slot Columns - Equal width distribution */}
                {TIME_SLOTS.map((slot) => (
                  <th
                    key={slot}
                    className="px-1 py-1.5 sm:px-2 sm:py-2 text-center text-white font-semibold border-b border-l border-gray-600 text-[10px] sm:text-xs lg:text-sm"
                    style={{ width: `${85 / TIME_SLOTS.length}%` }}
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
                  {/* Day Cell - Fixed width */}
                  <td className="px-1 py-1.5 sm:px-2 sm:py-2 text-white font-medium border-b border-gray-600 text-[10px] sm:text-xs lg:text-sm">
                    <div className="truncate">
                      {/* Show first 3 letters on mobile, full name on tablet+ */}
                      <span className="sm:hidden">{day.substring(0, 3)}</span>
                      <span className="hidden sm:inline">{day}</span>
                    </div>
                  </td>

                  {/* Time Slot Cells - Equal width distribution */}
                  {TIME_SLOTS.map((slot) => {
                    const scheduledCourse = getCourseForSlot(day, slot);

                    return (
                      <td
                        key={`${day}-${slot}`}
                        className="px-0.5 py-1 sm:px-1 sm:py-2 text-center border-b border-l border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                      >
                        <div className="min-h-12 sm:min-h-16 flex items-center justify-center overflow-hidden">
                          {scheduledCourse ? (
                            <div
                              className={`px-1 py-0.5 sm:px-1.5 sm:py-1 rounded text-white ${getCourseColor(
                                scheduledCourse.uniqueId
                              )} w-full text-center shadow-md hover:shadow-lg transition-shadow duration-200`}
                              title={`${scheduledCourse.courseName} - ${scheduledCourse.staff} (${scheduledCourse.uniqueId})`}
                            >
                              {/* Display Name - Always visible */}
                              <div className="font-semibold text-[10px] sm:text-xs truncate">
                                {scheduledCourse.displayName
                                  ? scheduledCourse.displayName.toUpperCase()
                                  : scheduledCourse.courseName}
                              </div>

                              {/* Staff - Always visible */}
                              <div className=" text-[9px] sm:text-[10px] md:text[16px] opacity-90 truncate mt-0.5">
                                {scheduledCourse.staff}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-[10px] sm:text-xs">
                              Free
                            </span>
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

      {/* Footer Stats */}
      <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 text-[10px] sm:text-xs lg:text-sm text-gray-400">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
          {selectedCourses.length} course(s) scheduled
        </span>
        <div className="flex gap-2 sm:gap-4 text-[10px] sm:text-xs">
          <span className="bg-gray-700/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            {DAYS.length} days
          </span>
          <span className="bg-gray-700/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            {TIME_SLOTS.length} periods
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
