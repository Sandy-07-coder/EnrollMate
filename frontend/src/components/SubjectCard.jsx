import React from "react";

const SubjectCard = ({
  courseName,
  displayName,
  credits,
  totalCourses,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer group"
    >
      {/* Course Name */}
      <h4 className="text-white font-semibold text-sm sm:text-base mb-1.5 line-clamp-2 group-hover:text-indigo-100 transition-colors duration-200">
        {courseName}
      </h4>

      {/* Display Name */}
      <p className="gradient-text text-xs sm:text-sm font-medium uppercase mb-3">
        ({displayName})
      </p>

      {/* Credits and Total Courses */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          Credits: <span className="text-emerald-400 font-medium">{credits}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          Courses:{" "}
          <span className="text-indigo-400 font-medium">{totalCourses}</span>
        </span>
      </div>
    </div>
  );
};

export default SubjectCard;
