import React from "react";
import { FaXmark } from "react-icons/fa6";
import { MdWarning } from "react-icons/md";

const ShowConflictsModal = ({ closeConflictModal, conflictData }) => {
  return (
    <div className="modal-overlay" onClick={closeConflictModal}>
      <div
        className="modal-content w-full max-w-md max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <MdWarning className="text-2xl text-yellow-300" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Schedule Conflict</h2>
          </div>
          <button
            onClick={closeConflictModal}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all duration-200"
            aria-label="Close modal"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
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
              const messageMatch =
                conflict.message?.match(/on (\w+) at ([\d-]+)/);
              const day = messageMatch?.[1] || "Unknown";
              const time = messageMatch?.[2] || "Unknown";

              return (
                <div
                  key={index}
                  className="bg-white/5 border border-red-500/20 rounded-xl p-4 hover:border-red-500/40 transition-all duration-200"
                >
                  {/* Course Name & Code */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-medium text-sm flex-1">
                      {conflict.confictingCourse?.courseName}
                    </h3>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full font-mono shrink-0">
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
        <div className="bg-white/5 px-5 sm:px-6 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={closeConflictModal}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowConflictsModal;
