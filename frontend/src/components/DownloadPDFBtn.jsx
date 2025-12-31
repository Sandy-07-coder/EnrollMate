import React from "react";
import { Download } from "lucide-react";

const DownloadPDFBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] group"
      aria-label="Download Timetable"
    >
      <Download className="w-5 h-5 group-hover:animate-bounce" />
      <span>Download Timetable</span>
    </button>
  );
};

export default DownloadPDFBtn;
