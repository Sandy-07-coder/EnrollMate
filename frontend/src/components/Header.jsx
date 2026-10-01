import React, { useState, useRef, useEffect } from "react";
import logo from "../../public/logo-transparent.png";
import { useCourseStore } from "../store/courseStore";
import { showConflictToast } from "../utils/toasts/conflict.toast";
import { showDuplicateToast } from "../utils/toasts/duplicate.toast";
import { showSameSubjectToast } from "../utils/toasts/sameSubject.toast";
import { showSuccessToast } from "../utils/toasts/success.toast";
import hasConflict from "../utils/hasConflict";
import { Search, X, SlidersHorizontal, Check, AlertCircle, Sun, Moon, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

const Header = ({
  openConflictModal,
  isFilterModalOpen,
  setIsFilterModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const {
    searchedCourses,
    searchCourses,
    addSelectedCourses,
    removeSearchedCourses,
    selectedCourses,
  } = useCourseStore();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") return;
    searchCourses(query);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    removeSearchedCourses();
    inputRef.current?.blur();
  };

  const handleResultSelect = (selectedCourse) => {
    const result = addSelectedCourses(selectedCourse.uniqueId);

    if (result.isDuplicate) {
      showDuplicateToast();
    } else if (result.isSameSubjects) {
      showSameSubjectToast();
    } else if (result.isConflict) {
      showConflictToast(() => openConflictModal(result));
    } else if (!result.isError) {
      showSuccessToast();
    }

    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
    removeSearchedCourses();
  };

  const SearchResultItem = ({ result }) => {
    const conflict = hasConflict(result, selectedCourses);
    return (
      <div
        onClick={() => handleResultSelect(result)}
        className="px-4 py-3 hover:bg-[var(--bg-off)] cursor-pointer border-b border-[rgba(34,42,53,0.06)] dark:border-white/10 last:border-b-0 transition-colors duration-100 active:bg-[var(--bg-subtle)] group"
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-semibold text-[var(--text-charcoal)] truncate group-hover:text-[var(--text-midnight)] transition-colors">
              {result.courseName}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-[#898989]">{result.staff}</span>
              <span className="text-[#e0e0e0]">·</span>
              <span className="text-[11px] text-[#b0b0b0] font-mono">{result.uniqueId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            <span className="badge-clean">
              {result.credits} cr
            </span>
            {conflict ? (
              <AlertCircle size={13} className="text-[#dc2626]" />
            ) : (
              <Check size={13} strokeWidth={3} className="text-[#16a34a]" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 w-full bg-[var(--bg-white)]/95 backdrop-blur-sm z-50 transition-colors duration-200"
      style={{ boxShadow: "var(--shadow-ring)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <img src={logo} alt="EnrollMate" className="h-12 w-12 object-contain bg-transparent" />
          <span className="font-display text-[15px] font-bold text-[var(--text-charcoal)] tracking-tight hidden sm:block">
            EnrollMate
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-lg" ref={searchRef}>
          <div className="relative w-full">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => { handleSearch(e.target.value); setIsSearchOpen(true); }}
                onFocus={() => { setIsSearchOpen(true); if (searchQuery.trim()) handleSearch(searchQuery); }}
                placeholder="Search courses..."
                className="w-full h-9 px-3 pl-9 pr-8 bg-[var(--bg-subtle)] border-none rounded-lg text-[13px] text-[var(--text-charcoal)] placeholder-[var(--text-subtle)] transition-all duration-150 focus:outline-none focus:bg-[var(--bg-white)] focus:shadow-[0_0_0_1px_rgba(34,42,53,0.12),0_0_0_3px_rgba(36,36,36,0.06)] hover:bg-[var(--bg-off)]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] w-3.5 h-3.5" />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text-mid)] p-0.5 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results Dropdown */}
            {isSearchOpen && searchedCourses.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1.5 bg-[var(--bg-white)] rounded-xl max-h-[360px] overflow-y-auto animate-fade-in-down"
                style={{ boxShadow: "var(--shadow-modal)" }}
              >
                <div className="py-1">
                  {searchedCourses.map((result) => (
                    <SearchResultItem key={result._id || result.id} result={result} />
                  ))}
                </div>
              </div>
            )}

            {isSearchOpen && searchQuery?.trim() !== "" && searchedCourses.length === 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1.5 bg-[var(--bg-white)] rounded-xl animate-fade-in-down"
                style={{ boxShadow: "var(--shadow-modal)" }}
              >
                <div className="px-4 py-8 text-center">
                  <Search className="mx-auto text-[var(--text-subtle)] mb-2" size={28} />
                  <p className="text-[14px] text-[var(--text-mid)] font-medium">No results for "{searchQuery}"</p>
                  <p className="text-[12px] text-[var(--text-subtle)] mt-0.5">Try course name, code, or instructor</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative">
            {/* Notification Badge pointing to button */}
            <div 
              className="absolute -top-9 -right-2 animate-bounce cursor-pointer z-50 origin-bottom" 
              style={{ animationDuration: '2s' }}
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            >
               <div className="bg-[var(--text-midnight)] text-[var(--bg-white)] text-[10px] font-bold px-2 py-1 rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-1 whitespace-nowrap border border-[var(--bg-subtle)]">
                 Use Filter
                 {/* Triangle pointer */}
                 <div className="absolute -bottom-[5px] right-5 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#333] pointer-events-none"></div>
                 <div className="absolute -bottom-[4px] right-5 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#111111] pointer-events-none z-10"></div>
               </div>
            </div>

            <button
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              className="relative inline-flex items-center gap-1.5 h-9 px-3 bg-[var(--bg-white)] rounded-lg text-[13px] font-medium text-[var(--text-mid)] hover:text-[var(--text-charcoal)] transition-all duration-150"
              style={{ boxShadow: "var(--shadow-ring), var(--shadow-contact)" }}
            >
              <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping bg-[#3b82f6] opacity-75 absolute inline-flex h-full w-full rounded-full"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
              </div>
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Change Data */}
          <button
            onClick={() => navigate('/', { state: { skipRedirect: true } })}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[13px] font-medium text-[var(--text-mid)] hover:text-[var(--text-charcoal)] hover:bg-[var(--bg-off)] transition-all"
            title="Change course data"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Change Data</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[var(--bg-off)] transition-colors text-[var(--text-mid)] hover:text-[var(--text-charcoal)]"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[var(--bg-off)] transition-colors"
          >
            {isMobileSearchOpen ? <X size={18} className="text-[var(--text-mid)]" /> : <Search size={18} className="text-[var(--text-mid)]" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-2 animate-fade-in-down" style={{ borderTop: "1px solid rgba(34,42,53,0.06)" }} ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { handleSearch(e.target.value); setIsSearchOpen(true); }}
              onFocus={() => { setIsSearchOpen(true); if (searchQuery?.trim()) handleSearch(searchQuery); }}
              placeholder="Search courses..."
              className="w-full h-9 px-3 pl-9 pr-8 bg-[#f5f5f5] border-none rounded-lg text-[13px] text-[#242424] placeholder-[#b0b0b0] focus:outline-none focus:bg-white focus:shadow-[0_0_0_1px_rgba(34,42,53,0.12)]"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] w-3.5 h-3.5" />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#898989] p-0.5">
                <X size={14} />
              </button>
            )}
          </div>

          {isSearchOpen && searchedCourses.length > 0 && (
            <div className="mt-1.5 bg-white rounded-xl max-h-72 overflow-y-auto" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="py-1">
                {searchedCourses.map((result) => (
                  <SearchResultItem key={result._id || result.id} result={result} />
                ))}
              </div>
            </div>
          )}

          {isSearchOpen && searchQuery?.trim() !== "" && searchedCourses.length === 0 && (
            <div className="mt-1.5 bg-white rounded-xl" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="p-4 text-center text-[14px] text-[#898989]">No results for "{searchQuery}"</div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
