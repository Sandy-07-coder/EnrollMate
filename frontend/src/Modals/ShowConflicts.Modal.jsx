import React from "react";
import { FaXmark } from "react-icons/fa6";
import { MdWarning } from "react-icons/md";

const ShowConflictsModal = ({ closeConflictModal, conflictData }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md text-white relative border border-gray-700 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MdWarning className="text-2xl text-yellow-300" />
            <h2 className="text-xl font-semibold">Schedule Conflict</h2>
          </div>
          <button
            onClick={closeConflictModal}
            className="text-white hover:bg-red-800 rounded-lg p-1.5 transition-colors duration-200"
            aria-label="Close modal"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Main Message */}
          <div className="mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {conflictData?.message?.split("due to conflicts:")[0]}
              <span className="text-red-400 font-medium">
                due to conflicts:
              </span>
            </p>
          </div>

          {/* Conflict List */}
          <div className="space-y-3">
            {conflictData?.conflicts?.map((conflict, index) => {
              // Extract day and time from the message string
              // Format: "Course Name" (CODE) is already scheduled on Day at Time
              const messageMatch =
                conflict.message?.match(/on (\w+) at ([\d-]+)/);
              const day = messageMatch?.[1] || "Unknown";
              const time = messageMatch?.[2] || "Unknown";

              return (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-red-900/30 rounded-lg p-4 hover:border-red-700/50 transition-colors duration-200"
                >
                  {/* Course Name & Code */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-medium text-sm flex-1">
                      {conflict.confictingCourse?.courseName}
                    </h3>
                    <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full font-mono shrink-0">
                      {conflict.confictingCourse?.uniqueId}
                    </span>
                  </div>

                  {/* Conflict Details */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">Conflicts on</span>
                    <span className="text-red-400 font-medium">{day}</span>
                    <span className="text-gray-400">at</span>
                    <span className="text-red-400 font-medium">{time}</span>
                  </div>

                  {/* Staff Info */}
                  {conflict.confictingCourse?.staff && (
                    <div className="mt-2 text-xs text-gray-500">
                      Instructor: {conflict.confictingCourse.staff}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
          <button
            onClick={closeConflictModal}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowConflictsModal;
