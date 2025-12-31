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
  const [notSameSubject, setNotSameSubject] = useState(
    filterOptions.notSameSubject || false
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
    setFilterOptions(selectedDays, selectedTimes, notConflict, notSameSubject);
    filterCourses();
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedDays([]);
    setSelectedTimes([]);
    setNotConflict(false);
    setNotSameSubject(false);
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
        console.log("Conflict details:", result.conflicts);
      });
      return;
    }

    showSuccessToast();
    handleBackToSubjects();
    handleApplyFilters();
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
        <div
          className="modal-content w-full max-w-4xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Filter className="text-white" size={22} />
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Filter Courses
              </h2>
            </div>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Column - Days and Times (2 columns) */}
              <div className="space-y-5 lg:col-span-2">
                {/* Free Days Section */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Free Days
                  </h3>
                  <div className="space-y-2">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                      >
                        <Checkbox.Root
                          checked={selectedDays.includes(day)}
                          onCheckedChange={(checked) =>
                            handleDayChange(day, checked)
                          }
                          className="w-5 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center hover:border-indigo-500/50 transition-all duration-200 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          id={`day-${day}`}
                        >
                          <Checkbox.Indicator>
                            <CheckIcon className="text-white" size={14} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          htmlFor={`day-${day}`}
                          className="text-gray-300 cursor-pointer flex-1 text-sm group-hover:text-white transition-colors duration-200"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Hours Section */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Free Hours
                  </h3>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((time) => (
                      <div
                        key={time}
                        className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                      >
                        <Checkbox.Root
                          checked={selectedTimes.includes(time)}
                          onCheckedChange={(checked) =>
                            handleTimeChange(time, checked)
                          }
                          className="w-5 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center hover:border-emerald-500/50 transition-all duration-200 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                          id={`time-${time}`}
                        >
                          <Checkbox.Indicator>
                            <CheckIcon className="text-white" size={14} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          htmlFor={`time-${time}`}
                          className="text-gray-300 cursor-pointer flex-1 text-sm group-hover:text-white transition-colors duration-200"
                        >
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Conflicting Courses */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Conflict Filter
                  </h3>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group">
                    <Checkbox.Root
                      checked={notConflict}
                      onCheckedChange={(checked) => setNotConflict(checked)}
                      className="w-5 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center hover:border-purple-500/50 transition-all duration-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      id="not-conflict"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon className="text-white" size={14} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      htmlFor="not-conflict"
                      className="text-gray-300 cursor-pointer flex-1 text-sm group-hover:text-white transition-colors duration-200"
                    >
                      Show only non-conflicting courses
                    </label>
                  </div>
                </div>

                {/* Non-Selected Subject only */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Subject Filter
                  </h3>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group">
                    <Checkbox.Root
                      checked={notSameSubject}
                      onCheckedChange={(checked) => setNotSameSubject(checked)}
                      className="w-5 h-5 bg-white/10 border border-white/20 rounded flex items-center justify-center hover:border-amber-500/50 transition-all duration-200 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                      id="not-same-subject"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon className="text-white" size={14} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      htmlFor="not-same-subject"
                      className="text-gray-300 cursor-pointer flex-1 text-sm group-hover:text-white transition-colors duration-200"
                    >
                      Show only non-selected subjects
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Filtered Results (3 columns) */}
              <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 lg:col-span-3 flex flex-col min-h-[300px]">
                <div className="flex items-center gap-3 mb-4">
                  {showCourses && (
                    <button
                      onClick={handleBackToSubjects}
                      className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all duration-200"
                      aria-label="Back to subjects"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {showCourses ? (
                      <>
                        Courses in {selectedSubject}
                        <span className="text-xs sm:text-sm text-gray-400 ml-2 font-normal">
                          ({courseByName?.length || 0} courses)
                        </span>
                      </>
                    ) : (
                      <>
                        Filtered Results
                        <span className="text-xs sm:text-sm text-gray-400 ml-2 font-normal">
                          ({subjectDetails.length} subjects found)
                        </span>
                      </>
                    )}
                  </h3>
                </div>
                {/* Scrollable Results Area */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {showCourses ? (
                    courseByName && courseByName.length > 0 ? (
                      <div className="space-y-2">
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
                        <Filter className="mx-auto mb-3 opacity-40" size={40} />
                        <p>No courses found</p>
                      </div>
                    )
                  ) : subjectDetails.length > 0 ? (
                    <div className="space-y-2">
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
                      <Filter className="mx-auto mb-3 opacity-40" size={40} />
                      <p>No results yet</p>
                      <p className="text-xs mt-2 text-gray-500">
                        Select filters and click "Apply Filters" to see results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white/5 px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
            <button
              onClick={handleResetFilters}
              className="w-full sm:w-auto px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Reset Filters
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 sm:flex-none px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApplyFilters()}
                className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-200 text-sm shadow-lg hover:shadow-indigo-500/25"
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
