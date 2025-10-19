/**
 * @fileoverview Utility functions for course management
 * @description Helper functions for conflict checking, color assignment, and course validation
 */

import { COURSE_COLORS } from "./constants";

/**
 * Checks if a time slot conflicts with existing courses
 * @param {Object} params - Parameters object
 * @param {string} params.day - Day of the week
 * @param {string} params.time - Time slot (e.g., "8-10")
 * @param {Array<Object>} params.courses - Array of existing courses
 * @returns {boolean} True if there's a conflict, false otherwise
 */
export const hasTimeSlotConflict = ({ day, time, courses }) => {
    return courses.some((course) =>
        course.selectedSlots?.some(
            (slot) => slot.day === day && slot.time === time
        )
    );
};

/**
 * Checks if multiple time slots conflict with existing courses
 * @param {Object} params - Parameters object
 * @param {Array<Object>} params.slots - Array of time slots to check
 * @param {Array<Object>} params.courses - Array of existing courses
 * @param {number} [params.excludeCourseIndex] - Index of course to exclude from check
 * @returns {boolean} True if any slot has a conflict, false otherwise
 */
export const hasSlotsConflict = ({ slots, courses, excludeCourseIndex = -1 }) => {
    return slots.some((slot) =>
        courses.some(
            (course, idx) =>
                idx !== excludeCourseIndex &&
                course.selectedSlots?.some(
                    (existingSlot) =>
                        existingSlot.day === slot.day && existingSlot.time === slot.time
                )
        )
    );
};

/**
 * Gets the next available color for a new course
 * @param {Array<Object>} courses - Array of existing courses with color property
 * @returns {string} Tailwind color class (e.g., "bg-blue-600")
 */
export const getNextAvailableColor = (courses) => {
    const usedColors = courses.map((course) => course.color);
    const availableColors = COURSE_COLORS.filter(
        (color) => !usedColors.includes(color)
    );

    // Return first available color, or cycle through colors if all are used
    return availableColors.length > 0
        ? availableColors[0]
        : COURSE_COLORS[courses.length % COURSE_COLORS.length];
};

/**
 * Finds a course scheduled for a specific time slot
 * @param {Object} params - Parameters object
 * @param {string} params.day - Day of the week
 * @param {string} params.time - Time slot
 * @param {Array<Object>} params.courses - Array of courses to search
 * @returns {Object|undefined} Course object if found, undefined otherwise
 */
export const findCourseForSlot = ({ day, time, courses }) => {
    return courses.find((course) =>
        course.selectedSlots?.some(
            (slot) => slot.day === day && slot.time === time
        )
    );
};

/**
 * Validates course data before saving
 * @param {Object} courseData - Course data to validate
 * @param {string} courseData.courseName - Name of the course
 * @param {string} courseData.staff - Staff member name
 * @param {number} courseData.credits - Number of credits
 * @param {Array<Object>} courseData.selectedSlots - Selected time slots
 * @returns {Object} Validation result with isValid and errors array
 */
export const validateCourseData = (courseData) => {
    const errors = [];

    if (!courseData.courseName?.trim()) {
        errors.push("Course name is required");
    }

    if (!courseData.staff?.trim()) {
        errors.push("Staff name is required");
    }

    if (!courseData.credits || courseData.credits < 1 || courseData.credits > 10) {
        errors.push("Credits must be between 1 and 10");
    }

    if (!courseData.selectedSlots || courseData.selectedSlots.length === 0) {
        errors.push("At least one time slot must be selected");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Calculates total credits for an array of courses
 * @param {Array<Object>} courses - Array of courses with credits property
 * @returns {number} Total credits
 */
export const calculateTotalCredits = (courses) => {
    return courses.reduce((sum, course) => sum + (course.credits || 0), 0);
};

/**
 * Checks if a course has any time slots configured
 * @param {Object} course - Course object
 * @returns {boolean} True if course has time slots, false otherwise
 */
export const hasTimeSlots = (course) => {
    // Check if course itself has slots
    if (course.selectedSlots && course.selectedSlots.length > 0) {
        return true;
    }

    // Check if any staff option has slots
    if (course.staffOptions && Array.isArray(course.staffOptions)) {
        return course.staffOptions.some(
            (staffOption) =>
                staffOption.selectedSlots && staffOption.selectedSlots.length > 0
        );
    }

    return false;
};

/**
 * Finds a staff option by name in a course's staff options
 * @param {Object} course - Course object with staffOptions array
 * @param {string} staffName - Name of the staff member
 * @returns {Object|undefined} Staff option object if found
 */
export const findStaffOption = (course, staffName) => {
    return course.staffOptions?.find((option) => option.name === staffName);
};

/**
 * Creates a unique slot key for a day and time combination
 * @param {string} day - Day of the week
 * @param {string} time - Time slot
 * @returns {string} Unique slot key
 */
export const createSlotKey = (day, time) => {
    return `${day}-${time}`;
};
