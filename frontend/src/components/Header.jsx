import React, { useState, useRef, useEffect } from "react";
import logo from "../../public/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useCourseStore } from "../store/courseStore";
import { showConflictToast } from "../utils/toasts/conflict.toast";
import { showDuplicateToast } from "../utils/toasts/duplicate.toast";
import { showSameSubjectToast } from "../utils/toasts/sameSubject.toast";
import { showSuccessToast } from "../utils/toasts/success.toast";
import { FaFilter } from "react-icons/fa";
import { FaX, FaCheck } from "react-icons/fa6";
import hasConflict from "../utils/hasConflict";

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

  const {
    searchedCourses,
    searchCourses,
    addSelectedCourses,
    removeSearchedCourses,
    selectedCourses,
  } = useCourseStore();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      return;
    }
    searchCourses(query);
  };

  // Handle click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    removeSearchedCourses();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Handle result selection
  const handleResultSelect = (selectedCourse) => {
    const result = addSelectedCourses(selectedCourse.uniqueId);

    if (result.isDuplicate) {
      showDuplicateToast();
    } else if (result.isSameSubjects) {
      showSameSubjectToast();
    } else if (result.isConflict) {
      showConflictToast(() => {
        openConflictModal(result);
      });
    } else if (!result.isError) {
      showSuccessToast();
    }

    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
    removeSearchedCourses();
  };

  return (
    <header className="sticky top-0 w-full glass border-b border-white/10 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <img src={logo} alt="EnrollMate Logo" className="h-9 w-9 sm:h-10 sm:w-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-0 blur-lg"></div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold whitespace-nowrap gradient-text">
              EnrollMate
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div
            className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8"
            ref={searchRef}
          >
            <div className="relative w-full">
              <div className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => {
                    setIsSearchOpen(true);
                    if (searchQuery.trim() !== "") {
                      handleSearch(searchQuery);
                    }
                  }}
                  placeholder="Search courses, instructors, or course codes..."
                  className="w-full px-4 py-3 pl-12 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                />
                <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-indigo-400 transition-colors duration-300" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                )}
              </div>

              {/* Desktop Search Results Dropdown */}
              {isSearchOpen && searchedCourses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card max-h-96 overflow-y-auto animate-fade-in-down">
                  {searchedCourses.map((result) => (
                    <div
                      key={result._id || result.id}
                      onClick={() => handleResultSelect(result)}
                      className="px-4 py-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors duration-200"
                    >
                      <div className="space-y-2">
                        {/* Course Name and Credits */}
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium text-sm flex-1">
                            {result.courseName}
                          </h3>
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full ml-2 shrink-0 font-medium">
                            {result.credits} Credits
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between text-gray-400 text-xs">
                          <div>
                            <span>{result.staff}</span>
                            <span className="mx-2 text-gray-600">•</span>
                            <span className="text-indigo-400 font-mono">
                              {result.uniqueId}
                            </span>
                          </div>
                          <div className="pr-2 sm:pr-4 relative group">
                            {hasConflict(result, selectedCourses) ? (
                              <div className="flex items-center gap-1.5 text-red-400">
                                <FaX className="text-xs" />
                                <span className="text-xs font-medium">Conflict</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <FaCheck className="text-sm" />
                                <span className="text-xs font-medium">Available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {isSearchOpen &&
                searchQuery?.trim() !== "" &&
                searchedCourses.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 glass-card animate-fade-in-down">
                    <div className="px-4 py-8 text-center text-gray-400">
                      <CiSearch className="mx-auto text-4xl mb-3 opacity-40" />
                      <p className="font-medium">No courses found for "{searchQuery}"</p>
                      <p className="text-sm mt-1 text-gray-500">
                        Try searching for course names, instructors, or course codes
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Desktop Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 text-white group"
            aria-label="Filter courses"
          >
            <FaFilter className="text-sm text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
            <span className="text-sm font-medium">Filter</span>
          </button>

          {/* Mobile Action Buttons */}
          <div className="md:hidden flex items-center gap-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200"
              aria-label="Filter courses"
            >
              <FaFilter className="text-lg text-gray-300" />
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              {isMobileSearchOpen ? (
                <IoCloseOutline className="text-2xl text-gray-300" />
              ) : (
                <CiSearch className="text-2xl text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-4 animate-fade-in-down" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  setIsSearchOpen(true);
                  if (searchQuery?.trim() !== "") {
                    handleSearch(searchQuery);
                  }
                }}
                placeholder="Search courses, instructors..."
                className="w-full px-4 py-3 pl-12 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10"
                autoFocus
              />
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-lg transition-colors duration-200"
                >
                  <IoCloseOutline className="text-xl" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {isSearchOpen && searchedCourses.length > 0 && (
              <div className="mt-2 glass-card max-h-80 overflow-y-auto animate-fade-in-down">
                {searchedCourses.map((result) => (
                  <div
                    key={result._id || result.id}
                    onClick={() => handleResultSelect(result)}
                    className="px-4 py-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0 active:bg-white/10"
                  >
                    <div className="space-y-2">
                      {/* Course Name and Credits */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-medium text-sm flex-1">
                          {result.courseName}
                        </h3>
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full ml-2 shrink-0">
                          {result.credits} Credits
                        </span>
                      </div>

                      {/* Staff, Course ID and conflict */}
                      <div className="w-full flex items-center justify-between text-gray-400 text-xs">
                        <div className="flex flex-col space-y-1">
                          <div>
                            <span>{result.staff}</span>
                          </div>
                          <div className="text-indigo-400 font-mono">
                            {result.uniqueId}
                          </div>
                        </div>
                        <div className="pr-2">
                          {hasConflict(result, selectedCourses) ? (
                            <div className="flex items-center gap-1.5 text-red-400">
                              <FaX className="text-xs" />
                              <span className="text-xs">Conflict</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-emerald-400">
                              <FaCheck className="text-sm" />
                              <span className="text-xs">Available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile No Results */}
            {isSearchOpen &&
              searchQuery?.trim() !== "" &&
              searchedCourses.length === 0 && (
                <div className="mt-2 glass-card animate-fade-in-down">
                  <div className="px-4 py-6 text-center text-gray-400">
                    <CiSearch className="mx-auto text-3xl mb-2 opacity-40" />
                    <p className="text-sm">
                      No courses found for "{searchQuery}"
                    </p>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
