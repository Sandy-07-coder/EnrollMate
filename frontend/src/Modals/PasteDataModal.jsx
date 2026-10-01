import React, { useState } from "react";
import { parseRawCourseData } from "../utils/parseRawCourseData";
import { useCourseStore } from "../store/courseStore";
import { useNavigate } from "react-router-dom";
import { ClipboardPaste, X, Upload, CheckCircle2, AlertCircle } from "lucide-react";

const PasteDataModal = ({ isOpen, onClose }) => {
  const [rawText, setRawText] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const setCourses = useCourseStore((state) => state.setCourses);
  const navigate = useNavigate();

  const handleParse = () => {
    if (!rawText.trim()) {
      setStatus({ type: "error", message: "Please paste your course data first." });
      return;
    }
    setIsLoading(true);
    setStatus(null);

    try {
      const courses = parseRawCourseData(rawText);
      if (courses.length === 0) {
        setStatus({ type: "error", message: "No valid courses found. Make sure you copied the full enrollment page text." });
        setIsLoading(false);
        return;
      }
      setCourses(courses);
      setStatus({ type: "success", message: `Loaded ${courses.length} course sections` });
      setTimeout(() => { onClose(); navigate("/home", { replace: true }); }, 1000);
    } catch (err) {
      setStatus({ type: "error", message: `Parse error: ${err.message}` });
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-brand)" }}>
              <ClipboardPaste size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-display text-[14px] font-bold text-[var(--text-charcoal)]">Paste Course Data</h2>
              <p className="text-[11px] text-[var(--text-subtle)]">From your CAMU enrollment page</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--bg-subtle)] transition-colors">
            <X size={16} className="text-[var(--text-subtle)]" />
          </button>
        </div>

        <div className="border-t border-[rgba(34,42,53,0.08)] dark:border-white/10" />

        {/* Body */}
        <div className="px-6 py-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div className="bg-[var(--bg-off)] rounded-xl p-3" style={{ boxShadow: "var(--shadow-ring)" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-brand)" }}>Step 1</div>
              <div className="text-[12px] text-[var(--text-charcoal)] font-medium leading-tight">Open Enrollment</div>
              <div className="text-[11px] text-[var(--text-mid)] mt-1.5 leading-relaxed">Go to your CAMU Full Registration page.</div>
            </div>
            <div className="bg-[var(--bg-off)] rounded-xl p-3" style={{ boxShadow: "var(--shadow-ring)" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-brand)" }}>Step 2</div>
              <div className="text-[12px] text-[var(--text-charcoal)] font-medium leading-tight">Copy All</div>
              <div className="text-[11px] text-[var(--text-mid)] mt-1.5 leading-relaxed">Press <kbd className="px-1 py-0.5 bg-[var(--bg-white)] rounded font-mono text-[9px] shadow-sm ring-1 ring-black/5 dark:ring-white/10">Ctrl+A</kbd> then <kbd className="px-1 py-0.5 bg-[var(--bg-white)] rounded font-mono text-[9px] shadow-sm ring-1 ring-black/5 dark:ring-white/10">Ctrl+C</kbd>.</div>
            </div>
            <div className="bg-[var(--bg-off)] rounded-xl p-3" style={{ boxShadow: "var(--shadow-ring)" }}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--color-brand)" }}>Step 3</div>
              <div className="text-[12px] text-[var(--text-charcoal)] font-medium leading-tight">Paste Here</div>
              <div className="text-[11px] text-[var(--text-mid)] mt-1.5 leading-relaxed">Click the box below and press <kbd className="px-1 py-0.5 bg-[var(--bg-white)] rounded font-mono text-[9px] shadow-sm ring-1 ring-black/5 dark:ring-white/10">Ctrl+V</kbd>.</div>
            </div>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste the full page text here..."
            className="w-full h-48 bg-[var(--bg-white)] rounded-lg px-4 py-3 text-[13px] text-[var(--text-charcoal)] placeholder-[var(--text-subtle)] resize-none focus:outline-none transition-all font-mono leading-relaxed"
            style={{
              boxShadow: "var(--shadow-ring), var(--shadow-inset)",
            }}
            onFocus={(e) => e.target.style.boxShadow = "var(--shadow-ring), 0px 0px 0px 3px rgba(36,36,36,0.08)"}
            onBlur={(e) => e.target.style.boxShadow = "var(--shadow-ring), var(--shadow-inset)"}
          />

          <div className="flex items-center justify-between text-[11px] text-[var(--text-subtle)]">
            <span>{rawText.length.toLocaleString()} characters</span>
            {rawText.length > 0 && (
              <button onClick={() => { setRawText(""); setStatus(null); }} className="text-red-500/70 hover:text-red-500 font-medium transition-colors">
                Clear
              </button>
            )}
          </div>

          {status && (
            <div className={`flex items-center gap-2 rounded-lg p-3 text-[13px] font-medium ${
              status.type === "success"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`} style={{ boxShadow: "var(--shadow-ring)" }}>
              {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {status.message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 bg-[var(--bg-off)] border-t border-[rgba(34,42,53,0.06)] dark:border-white/10">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[13px] font-medium text-[var(--text-mid)] hover:text-[var(--text-charcoal)] hover:bg-[var(--bg-subtle)] transition-all">
            Cancel
          </button>
          <button
            onClick={handleParse}
            disabled={isLoading || !rawText.trim()}
            className="btn-brand h-9 px-5 text-[13px] font-semibold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Upload size={14} />
            {isLoading ? "Loading..." : "Load Courses"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasteDataModal;
