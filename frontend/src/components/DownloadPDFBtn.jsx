import React from "react";
import { Download } from "lucide-react";

const DownloadPDFBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label="Download Timetable"
    >
      <Download className="w-5 h-5 group-hover:animate-bounce" />
      <span>Download Timetable</span>
    </button>
  );
};

export default DownloadPDFBtn;
