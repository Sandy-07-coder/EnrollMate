import React from "react";
import { Clock, User, BookOpen } from "lucide-react";

const CourseCard = ({ course, onAdd }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200">
      {/* Course Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h5 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {course.courseName}
          </h5>
          <p className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-400 to-pink-500 text-xs font-medium uppercase">
            {course.displayName}
          </p>
        </div>
      </div>

      {/* Course Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <User size={14} className="text-blue-400" />
          <span className="truncate">{course.staff}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <BookOpen size={14} className="text-purple-400" />
          <span>{course.uniqueId}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={14} className="text-green-400" />
          <span>
            {course.slots?.map((slot, idx) => (
              <span key={idx}>
                {slot.day?.substring(0, 3)} {slot.time}
                {idx < course.slots.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Credits and Add Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <span className="text-xs text-gray-400">
          Credits:{" "}
          <span className="text-green-400 font-medium">{course.credits}</span>
        </span>
        <button
          onClick={() => onAdd(course.uniqueId)}
          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors duration-200"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
