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
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer"
    >
      {/* Course Name */}
      <h4 className="text-white font-semibold text-base mb-2 line-clamp-2">
        {courseName}
      </h4>

      {/* Display Name */}
      <p className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-400 to-pink-500 text-sm font-medium uppercase mb-3">
        ({displayName})
      </p>

      {/* Credits and Total Courses */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Credits: <span className="text-green-400 font-medium">{credits}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          Courses:{" "}
          <span className="text-blue-400 font-medium">{totalCourses}</span>
        </span>
      </div>
    </div>
  );
};

export default SubjectCard;
