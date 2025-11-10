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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600/20 p-2 rounded-lg">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Download Timetable</h2>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-lg"
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
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              disabled={isDownloading}
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1.5">
              File will be saved as "{filename}.html"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
            disabled={isDownloading}
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
