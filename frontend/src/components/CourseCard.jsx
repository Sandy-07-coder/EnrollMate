import React from "react";
import { Clock, User, BookOpen } from "lucide-react";

const CourseCard = ({ course, onAdd }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 group">
      {/* Course Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h5 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-emerald-100 transition-colors duration-200">
            {course.courseName}
          </h5>
          <p className="gradient-text text-xs font-medium uppercase">
            {course.displayName}
          </p>
        </div>
      </div>

      {/* Course Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <User size={14} className="text-indigo-400" />
          <span className="truncate">{course.staff}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <BookOpen size={14} className="text-purple-400" />
          <span className="font-mono">{course.uniqueId}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={14} className="text-emerald-400" />
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
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-xs text-gray-400">
          Credits:{" "}
          <span className="text-emerald-400 font-medium">{course.credits}</span>
        </span>
        <button
          onClick={() => onAdd(course.uniqueId)}
          className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
