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
    removeSearchedCourses(); // Clear the search results
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from input
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
      // Success - course added
      showSuccessToast();
    }

    setSearchQuery(""); // Clear search immediately
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
    removeSearchedCourses(); // Clear search results
  };

  return (
    <header className="sticky top-0 w-full bg-gray-900 text-white border-b border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="EnrollMate Logo" className="h-8 w-8" />
            <h1 className="text-2xl sm:text-3xl font-semibold whitespace-nowrap">
              EnrollMate
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div
            className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8"
            ref={searchRef}
          >
            <div className="relative w-full">
              <div className="relative">
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
                  className="w-full px-4 py-2.5 pl-12 pr-10 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                />
                <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                )}
              </div>

              {/* Desktop Search Results Dropdown */}
              {isSearchOpen && searchedCourses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                  {searchedCourses.map((result) => (
                    <div
                      key={result._id || result.id}
                      onClick={() => handleResultSelect(result)}
                      className="px-4 py-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors duration-150"
                    >
                      <div className="space-y-2">
                        {/* Course Name and Credits */}
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium text-sm flex-1">
                            {result.courseName}
                          </h3>
                          <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full ml-2 shrink-0">
                            {result.credits} Credits
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between text-gray-400 text-xs">
                          <div>
                            <span>{result.staff}</span>
                            <span className="mx-2">•</span>
                            <span className="text-blue-400 font-mono">
                              {result.uniqueId}
                            </span>
                          </div>
                          <div className="pr-2 sm:pr-4 relative group">
                            {/* Check for conflict  */}
                            {hasConflict(result, selectedCourses) ? (
                              <>
                                <FaX className="text-red-600 text-xs sm:text-sm" />
                                <span className="absolute right-0 top-6 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
                                  Conflict
                                </span>
                              </>
                            ) : (
                              <>
                                <FaCheck className="text-green-500 text-sm sm:text-md" />
                                <span className="absolute right-0 top-6 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
                                  No Conflict
                                </span>
                              </>
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
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
                    <div className="px-4 py-6 text-center text-gray-400">
                      <CiSearch className="mx-auto text-3xl mb-2 opacity-50" />
                      <p>No courses found for "{searchQuery}"</p>
                      <p className="text-sm mt-1">
                        Try searching for course names, instructors, or course
                        codes
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Desktop Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 text-white"
            aria-label="Filter courses"
          >
            <FaFilter className="text-sm" />
            <span className="text-sm font-medium">Filter</span>
          </button>

          {/* Mobile Action Buttons */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Filter courses"
            >
              <FaFilter className="text-lg" />
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              {isMobileSearchOpen ? (
                <IoCloseOutline className="text-2xl" />
              ) : (
                <CiSearch className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-4" ref={searchRef}>
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
                className="w-full px-4 py-2.5 pl-12 pr-10 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                autoFocus
              />
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <IoCloseOutline className="text-xl" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {isSearchOpen && searchedCourses.length > 0 && (
              <div className="mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                {searchedCourses.map((result) => (
                  <div
                    key={result._id || result.id}
                    onClick={() => handleResultSelect(result)}
                    className="px-4 py-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                  >
                    <div className="space-y-2">
                      {/* Course Name and Credits */}
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-medium text-sm flex-1">
                          {result.courseName}
                        </h3>
                        <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full ml-2 shrink-0">
                          {result.credits} Credits
                        </span>
                      </div>

                      {/* Staff, Course ID and conflict */}
                      <div className="w-full flex items-center justify-between text-gray-400 text-xs">
                        <div className="flex flex-col space-y-1">
                          <div>
                            <span>{result.staff}</span>
                          </div>
                          <div className="text-blue-400 font-mono">
                            {result.uniqueId}
                          </div>
                        </div>
                        <div className="pr-2 sm:pr-4 relative group">
                          {/* Check for conflict */}
                          {hasConflict(result, selectedCourses) ? (
                            <>
                              <FaX className="text-red-600 text-xs sm:text-sm" />
                              <span className="absolute right-0 top-6 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
                                Conflict
                              </span>
                            </>
                          ) : (
                            <>
                              <FaCheck className="text-green-500 text-sm sm:text-md" />
                              <span className="absolute right-0 top-6 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
                                No Conflict
                              </span>
                            </>
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
                <div className="mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl">
                  <div className="px-4 py-6 text-center text-gray-400">
                    <CiSearch className="mx-auto text-3xl mb-2 opacity-50" />
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
