import React from "react";
import { useCourseStore } from "../store/courseStore";
import { doSlotsOverlap, getSlotDuration } from "../utils/timeSlots";

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

  // Modern gradient colors for courses
  const courseGradients = [
    "from-indigo-600 to-purple-600",
    "from-purple-600 to-pink-600",
    "from-emerald-600 to-teal-600",
    "from-orange-500 to-amber-500",
    "from-rose-600 to-pink-600",
    "from-blue-600 to-cyan-600",
    "from-violet-600 to-indigo-600",
    "from-teal-500 to-emerald-500",
    "from-fuchsia-600 to-purple-600",
    "from-amber-500 to-orange-500",
  ];

  // Function to get a consistent gradient for each course based on uniqueId
  const getCourseGradient = (uniqueId) => {
    if (!uniqueId) return courseGradients[0];

    const allCourseIds = selectedCourses.map((c) => c.uniqueId).sort();
    const colorIndex = allCourseIds.indexOf(uniqueId);

    return colorIndex !== -1
      ? courseGradients[colorIndex % courseGradients.length]
      : courseGradients[0];
  };

  // Get all courses that overlap with a given 2-hour time block
  const getCoursesForBlock = (day, blockSlot) => {
    if (!selectedCourses || selectedCourses.length === 0) return { left: null, right: null, full: null };

    const result = { left: null, right: null, full: null };

    const [blockStart, blockEnd] = blockSlot.split('-').map(s => parseInt(s, 10));
    const leftSlot = `${blockStart}-${blockStart + 1}`;
    const rightSlot = `${blockStart + 1}-${blockEnd}`;

    selectedCourses.forEach((course) => {
      if (!course.slots || course.slots.length === 0) return;

      course.slots.forEach((slot) => {
        if (slot.day !== day) return;

        const duration = getSlotDuration(slot.time);

        if (doSlotsOverlap(slot.time, blockSlot)) {
          if (duration === 2) {
            if (slot.time === blockSlot) {
              result.full = course;
            }
          } else if (duration === 1) {
            if (slot.time === leftSlot || doSlotsOverlap(slot.time, leftSlot)) {
              result.left = course;
            } else if (slot.time === rightSlot || doSlotsOverlap(slot.time, rightSlot)) {
              result.right = course;
            }
          }
        }
      });
    });

    return result;
  };

  return (
    <div className="h-full bg-transparent p-3 sm:p-5 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2">
          Course Schedule
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
          Your weekly course timetable overview
        </p>
      </div>

      {/* Timetable Container */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <table
            className="w-full border-separate border-spacing-0 text-sm"
            style={{ minWidth: "100%" }}
          >
            <thead>
              <tr>
                {/* Day Column */}
                <th
                  className="px-2 py-2 sm:px-3 sm:py-3 text-left text-gray-300 font-semibold text-[10px] sm:text-xs lg:text-sm bg-white/5 rounded-tl-xl border-b border-r border-white/10"
                  style={{ width: "15%" }}
                >
                  <div className="truncate">Day/Time</div>
                </th>
                {/* Time Slot Columns */}
                {TIME_SLOTS.map((slot, index) => (
                  <th
                    key={slot}
                    className={`px-2 py-2 sm:px-3 sm:py-3 text-center text-gray-300 font-semibold text-[10px] sm:text-xs lg:text-sm bg-white/5 border-b border-white/10 ${index === TIME_SLOTS.length - 1 ? 'rounded-tr-xl' : 'border-r'}`}
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
                  className="group"
                >
                  {/* Day Cell */}
                  <td className={`px-2 py-2 sm:px-3 sm:py-3 text-gray-300 font-medium text-[10px] sm:text-xs lg:text-sm border-r border-white/10 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-200 ${dayIndex === DAYS.length - 1 ? 'rounded-bl-xl border-b-0' : 'border-b border-white/10'}`}>
                    <div className="truncate">
                      <span className="sm:hidden">{day.substring(0, 3)}</span>
                      <span className="hidden sm:inline">{day}</span>
                    </div>
                  </td>

                  {/* Time Slot Cells */}
                  {TIME_SLOTS.map((slot, slotIndex) => {
                    const { left, right, full } = getCoursesForBlock(day, slot);
                    const isLastRow = dayIndex === DAYS.length - 1;
                    const isLastCol = slotIndex === TIME_SLOTS.length - 1;

                    return (
                      <td
                        key={`${day}-${slot}`}
                        className={`px-1 py-1.5 sm:px-2 sm:py-2 relative bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-200 ${isLastRow ? 'border-b-0' : 'border-b border-white/10'} ${isLastCol ? (isLastRow ? 'rounded-br-xl' : '') : 'border-r border-white/10'}`}
                      >
                        <div className="min-h-14 sm:min-h-18 flex items-center justify-center overflow-hidden relative">
                          {full ? (
                            <div
                              className={`px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg text-white bg-gradient-to-br ${getCourseGradient(full.uniqueId)} w-full h-full text-center shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer`}
                              title={`${full.courseName} - ${full.staff} (${full.uniqueId})`}
                            >
                              <div className="font-semibold text-[10px] sm:text-xs truncate w-full">
                                {full.displayName
                                  ? full.displayName.toUpperCase()
                                  : full.courseName}
                              </div>
                              <div className="text-[9px] sm:text-[10px] lg:text-xs opacity-90 truncate mt-0.5 w-full font-light">
                                {full.staff}
                              </div>
                            </div>
                          ) : (left || right) ? (
                            <div className="flex w-full h-full gap-1">
                              {/* Left Half */}
                              <div className="flex-1 flex items-center justify-center">
                                {left ? (
                                  <div
                                    className={`px-1 py-1 sm:px-1.5 sm:py-1 rounded-lg text-white bg-gradient-to-br ${getCourseGradient(left.uniqueId)} w-full h-full text-center shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer`}
                                    title={`${left.courseName} - ${left.staff} (${left.uniqueId})`}
                                  >
                                    <div className="font-semibold text-[9px] sm:text-[10px] truncate w-full">
                                      {left.displayName
                                        ? left.displayName.toUpperCase()
                                        : left.courseName}
                                    </div>
                                    <div className="text-[8px] sm:text-[9px] opacity-90 truncate mt-0.5 w-full">
                                      {left.staff}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-600 text-[9px] sm:text-[10px]">—</span>
                                )}
                              </div>

                              {/* Right Half */}
                              <div className="flex-1 flex items-center justify-center">
                                {right ? (
                                  <div
                                    className={`px-1 py-1 sm:px-1.5 sm:py-1 rounded-lg text-white bg-gradient-to-br ${getCourseGradient(right.uniqueId)} w-full h-full text-center shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer`}
                                    title={`${right.courseName} - ${right.staff} (${right.uniqueId})`}
                                  >
                                    <div className="font-semibold text-[9px] sm:text-[10px] truncate w-full">
                                      {right.displayName
                                        ? right.displayName.toUpperCase()
                                        : right.courseName}
                                    </div>
                                    <div className="text-[8px] sm:text-[9px] opacity-90 truncate mt-0.5 w-full">
                                      {right.staff}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-600 text-[9px] sm:text-[10px]">—</span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-600 text-[10px] sm:text-xs">
                              —
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
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          <span>{selectedCourses.length} course(s) scheduled</span>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs">
            {DAYS.length} days
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs">
            {TIME_SLOTS.length} periods
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
