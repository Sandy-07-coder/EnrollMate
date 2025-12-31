import React, { useState } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { downloadTimetableHTML } from "../libs/downloadPDF";
import { useCourseStore } from "../store/courseStore";
import toast from "react-hot-toast";

const DownloadPDFModal = ({ closeModal }) => {
  const { selectedCourses } = useCourseStore();
  const [filename, setFilename] = useState("my-timetable");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!filename.trim()) {
      toast.error("Please enter a filename");
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error("No courses selected");
      return;
    }

    setIsDownloading(true);

    try {
      const result = await downloadTimetableHTML(selectedCourses, filename);

      if (result.success) {
        toast.success("Timetable downloaded successfully!");
        closeModal();
      } else {
        toast.error(`Failed to download: ${result.error}`);
      }
    } catch (error) {
      toast.error("An error occurred while downloading");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isDownloading) {
      handleDownload();
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={closeModal}
    >
      <div
        className="modal-content max-w-md w-full p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <Download className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Download Timetable</h2>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            disabled={isDownloading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              File Name
            </label>
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter filename"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300"
              disabled={isDownloading}
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              File will be saved as "{filename}.html"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={closeModal}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/10"
            disabled={isDownloading}
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPDFModal;
