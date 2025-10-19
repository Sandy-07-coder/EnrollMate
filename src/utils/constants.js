/**
 * @fileoverview Application-wide constants
 * @description Centralized constants for days, time slots, and color schemes
 */

/**
 * Days of the week used in the timetable
 * @constant {string[]}
 */
export const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

/**
 * Available time slots for course scheduling
 * Format: "StartHour-EndHour" (24-hour format)
 * @constant {string[]}
 */
export const TIME_SLOTS = ["8-10", "10-12", "1-3", "3-5"];

/**
 * Color palette for course visualization
 * Uses Tailwind CSS color classes
 * @constant {string[]}
 */
export const COURSE_COLORS = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-cyan-600",
    "bg-rose-600",
    "bg-lime-600",
    "bg-amber-600",
    "bg-violet-600",
];

/**
 * Notification types with their configurations
 * @constant {Object}
 */
export const NOTIFICATION_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};

/**
 * Course credits validation constraints
 * @constant {Object}
 */
export const CREDITS_CONFIG = {
    MIN: 1,
    MAX: 10,
};
