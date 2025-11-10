import React, { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, X, Filter, ArrowLeft } from "lucide-react";
import { useCourseStore } from "../store/courseStore";
import SubjectCard from "../components/SubjectCard";
import CourseCard from "../components/CourseCard";
import { showConflictToast } from "../utils/toasts/conflict.toast";
import { showDuplicateToast } from "../utils/toasts/duplicate.toast";
import { showSameSubjectToast } from "../utils/toasts/sameSubject.toast";
import { showSuccessToast } from "../utils/toasts/success.toast";

const FilterModal = ({ isFilterModalOpen, setIsFilterModalOpen }) => {
  const {
    filterOptions,
    filteredCourses,
    filterCourses,
    setFilterOptions,
    subjectDetails,
    getSubjectDetails,
    getCourseByName,
    courseByName,
    addSelectedCourses,
  } = useCourseStore();

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const TIME_SLOTS = ["8-10", "10-12", "1-3", "3-5"];

  // Local state for checkboxes
  const [selectedDays, setSelectedDays] = useState(filterOptions.days || []);
  const [selectedTimes, setSelectedTimes] = useState(filterOptions.times || []);
  const [notConflict, setNotConflict] = useState(
    filterOptions.notConflict || false
  );
  const [showCourses, setShowCourses] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    getSubjectDetails(filteredCourses);
  }, [filteredCourses, getSubjectDetails]);

  useEffect(() => {
    handleApplyFilters();
  }, [isFilterModalOpen]);

  // Handle day checkbox change
  const handleDayChange = (day, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    }
  };

  // Handle time checkbox change
  const handleTimeChange = (time, checked) => {
    if (checked) {
      setSelectedTimes([...selectedTimes, time]);
    } else {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    }
  };

  // Apply filters
  const handleApplyFilters = () => {
    setFilterOptions(selectedDays, selectedTimes, notConflict);
    filterCourses();
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedDays([]);
    setSelectedTimes([]);
    setNotConflict(false);
    setFilterOptions([], [], false);
    filterCourses();
    handleBackToSubjects();
  };

  // Handle subject card click
  const handleSubjectClick = (courseName) => {
    setSelectedSubject(courseName);
    getCourseByName(courseName);
    setShowCourses(true);
  };

  // Handle back to subjects
  const handleBackToSubjects = () => {
    setShowCourses(false);
    setSelectedSubject(null);
  };

  // Handle add course
  const handleAddCourse = (uniqueId) => {
    const result = addSelectedCourses(uniqueId);

    if (result.isDuplicate) {
      showDuplicateToast();
      return;
    }

    if (result.isSameSubjects) {
      showSameSubjectToast();
      return;
    }

    if (result.isConflict) {
      showConflictToast(() => {
        // Optional: You can handle viewing conflict details here if needed
        console.log("Conflict details:", result.conflicts);
      });
      return;
    }

    // Success - course added
    showSuccessToast();

    // Navigate back to subjects view
    handleBackToSubjects();
    // Re-apply filters to update the results
    handleApplyFilters();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="text-white" size={24} />
              <h2 className="text-xl font-semibold text-white">
                Filter Courses
              </h2>
            </div>
            <button
              onClick={() => {
                setIsFilterModalOpen(false);
              }}
              className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column - Days and Times (2 columns) */}
              <div className="space-y-6 lg:col-span-2">
                {/* Free Days Section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Free Days
                  </h3>
                  <div className="space-y-3">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                      >
                        <Checkbox.Root
                          checked={selectedDays.includes(day)}
                          onCheckedChange={(checked) =>
                            handleDayChange(day, checked)
                          }
                          className="w-5 h-5 bg-gray-700 border-2 border-gray-600 rounded flex items-center justify-center hover:border-blue-500 transition-colors duration-200 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          id={`day-${day}`}
                        >
                          <Checkbox.Indicator>
                            <CheckIcon className="text-white" size={16} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          htmlFor={`day-${day}`}
                          className="text-gray-300 cursor-pointer flex-1"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Hours Section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Free Hours
                  </h3>
                  <div className="space-y-3">
                    {TIME_SLOTS.map((time) => (
                      <div
                        key={time}
                        className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                      >
                        <Checkbox.Root
                          checked={selectedTimes.includes(time)}
                          onCheckedChange={(checked) =>
                            handleTimeChange(time, checked)
                          }
                          className="w-5 h-5 bg-gray-700 border-2 border-gray-600 rounded flex items-center justify-center hover:border-green-500 transition-colors duration-200 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          id={`time-${time}`}
                        >
                          <Checkbox.Indicator>
                            <CheckIcon className="text-white" size={16} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          htmlFor={`time-${time}`}
                          className="text-gray-300 cursor-pointer flex-1"
                        >
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Conflicting Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Conflict Filter
                  </h3>
                  <div className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900 transition-colors duration-200">
                    <Checkbox.Root
                      checked={notConflict}
                      onCheckedChange={(checked) => setNotConflict(checked)}
                      className="w-5 h-5 bg-gray-700 border-2 border-gray-600 rounded flex items-center justify-center hover:border-purple-500 transition-colors duration-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      id="not-conflict"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon className="text-white" size={16} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      htmlFor="not-conflict"
                      className="text-gray-300 cursor-pointer flex-1"
                    >
                      Show only non-conflicting courses
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Filtered Results (3 columns) */}
              <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-700/50 lg:col-span-3 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  {showCourses && (
                    <button
                      onClick={handleBackToSubjects}
                      className="text-white hover:text-blue-400 transition-colors duration-200"
                      aria-label="Back to subjects"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {showCourses ? (
                      <>
                        Courses in {selectedSubject}
                        <span className="text-sm text-gray-400 ml-2">
                          ({courseByName?.length || 0} courses)
                        </span>
                      </>
                    ) : (
                      <>
                        Filtered Results
                        <span className="text-sm text-gray-400 ml-2">
                          ({subjectDetails.length} subjects found)
                        </span>
                      </>
                    )}
                  </h3>
                </div>
                {/* Scrollable Results Area with Custom Scrollbar */}
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-700 hover:scrollbar-thumb-gray-300">
                  {showCourses ? (
                    // Show courses for selected subject
                    courseByName && courseByName.length > 0 ? (
                      <div className="space-y-3">
                        {courseByName.map((course, index) => (
                          <CourseCard
                            key={index}
                            course={course}
                            onAdd={handleAddCourse}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm text-center py-12">
                        <Filter className="mx-auto mb-3 opacity-50" size={48} />
                        <p>No courses found</p>
                      </div>
                    )
                  ) : subjectDetails.length > 0 ? (
                    // Show subjects
                    <div className="space-y-3">
                      {subjectDetails.map((subject, index) => (
                        <SubjectCard
                          key={index}
                          courseName={subject.courseName}
                          displayName={subject.displayName}
                          credits={subject.credits}
                          totalCourses={subject.totalCourses}
                          onClick={() => handleSubjectClick(subject.courseName)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-12">
                      <Filter className="mx-auto mb-3 opacity-50" size={48} />
                      <p>No results yet</p>
                      <p className="text-xs mt-2">
                        Select filters and click "Apply Filters" to see results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700 flex justify-between items-center gap-4">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              Reset Filters
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleApplyFilters();
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
