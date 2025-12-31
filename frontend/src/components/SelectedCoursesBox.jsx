import React from "react";
import { useCourseStore } from "../store/courseStore";
import DownloadPDFBtn from "./DownloadPDFBtn";

const SelectedCoursesBox = ({ onDownloadClick }) => {
  const { selectedCourses, removeSelectedCourse } = useCourseStore();

  // Calculate total credits
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + (course?.credits || 0),
    0
  );

  const handleRemoveSelectedCourse = (uniqueId) => {
    removeSelectedCourse(uniqueId);
  };

  return (
    <div className="glass-card p-4 sm:p-6 h-fit">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text-success mb-4 sm:mb-6 text-center">
        Selected Courses
      </h3>

      <div className="space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1">
        {selectedCourses.length > 0 ? (
          selectedCourses.map((course, index) => (
            <div
              key={course._id || index}
              className="group bg-white/5 hover:bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-200 font-medium text-sm sm:text-base break-words mb-1 leading-tight group-hover:text-white transition-colors duration-200">
                    {course.courseName}
                  </h4>
                  <span className="text-xs sm:text-sm font-semibold gradient-text block">
                    ({course.displayName?.toUpperCase()})
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleRemoveSelectedCourse(course.uniqueId);
                  }}
                  className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 sm:p-2 rounded-lg transition-all duration-200 shrink-0 self-start"
                  aria-label="Remove course"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mb-2.5">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {course.staff}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-400 font-mono text-xs sm:text-sm bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                  {course.uniqueId}
                </span>
                <span className="text-emerald-400 text-xs sm:text-sm font-medium bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {course.credits} Credits
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 sm:py-14">
            <div className="mb-4">
              <svg
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm sm:text-base font-medium">
              No courses selected
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Start by searching and selecting courses
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-gray-300 text-xs sm:text-sm mb-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Total Courses:{" "}
            <span className="font-semibold text-white">
              {selectedCourses.length}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Total Credits:{" "}
            <span className="font-semibold text-white">{totalCredits}</span>
          </span>
        </div>

        {/* Download Button */}
        {selectedCourses.length > 0 && (
          <DownloadPDFBtn onClick={onDownloadClick} />
        )}
      </div>
    </div>
  );
};

export default SelectedCoursesBox;
