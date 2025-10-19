/**
 * @fileoverview Custom React hooks for course enrollment management
 * @description Reusable hooks for managing courses, notifications, and modal states
 */

import { useState, useEffect } from "react";
import {
    hasSlotsConflict,
    getNextAvailableColor,
    findStaffOption,
} from "./courseUtils";

/**
 * Custom hook for managing state synchronized with localStorage
 * @param {string} key - The localStorage key to store data under
 * @param {*} initialValue - The initial value to use if no stored value exists
 * @returns {Array} A stateful value and a function to update it, similar to useState
 * 
 * @example
 * // Store user theme preference
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * // Store complex objects
 * const [user, setUser] = useLocalStorage('user', { name: '', preferences: {} });
 */
export const useLocalStorage = (key, initialValue) => {
    // Initialize state with value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Check if window is defined (for SSR compatibility)
            if (typeof window === "undefined") {
                return initialValue;
            }

            // Get item from localStorage
            const item = window.localStorage.getItem(key);

            // Parse stored JSON or return initialValue if nothing is stored
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error occurs (e.g., invalid JSON), log it and return initialValue
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Update localStorage whenever the state changes
    useEffect(() => {
        try {
            // Check if window is defined (for SSR compatibility)
            if (typeof window === "undefined") {
                return;
            }

            // Convert value to JSON and store in localStorage
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            // Handle errors (e.g., localStorage quota exceeded, private browsing mode)
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]); // Re-run effect when key or storedValue changes

    return [storedValue, setStoredValue];
};

/**
 * Custom hook for managing notification state
 * @returns {Object} Notification state and control functions
 */
export const useNotification = () => {
    const [notification, setNotification] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
    });

    /**
     * Shows a notification
     * @param {string} type - Notification type (success, error, warning, info)
     * @param {string} title - Notification title
     * @param {string} message - Notification message
     */
    const showNotification = (type, title, message) => {
        setNotification({ isOpen: true, type, title, message });
    };

    /**
     * Closes the notification
     */
    const closeNotification = () => {
        setNotification({ isOpen: false, type: "info", title: "", message: "" });
    };

    return {
        notification,
        showNotification,
        closeNotification,
    };
};

/**
 * Custom hook for managing available courses
 * Persists available courses to localStorage for data retention across page reloads
 * @returns {Object} Available courses state and management functions
 */
export const useAvailableCourses = (showNotification) => {
    // Use localStorage to persist available courses across page reloads
    const [availableCourses, setAvailableCourses] = useLocalStorage('availableCourses', []);

    /**
     * Adds or updates a course in available courses
     * @param {Object} newCourseData - Course data to add
     */
    const saveCourse = (newCourseData) => {
        const existingCourseIndex = availableCourses.findIndex(
            (c) => c.courseName === newCourseData.courseName
        );

        if (existingCourseIndex !== -1) {
            // Course exists, check if this staff is already in staffOptions
            const existingCourse = availableCourses[existingCourseIndex];
            const staffExists = existingCourse.staffOptions?.some(
                (s) => s.name === newCourseData.staff
            );

            if (!staffExists && newCourseData.staff) {
                // Add new staff with their own time slots
                const updatedCourse = {
                    ...existingCourse,
                    staffOptions: [
                        ...(existingCourse.staffOptions || []),
                        {
                            name: newCourseData.staff,
                            selectedSlots: newCourseData.selectedSlots,
                        },
                    ],
                };

                setAvailableCourses((prev) =>
                    prev.map((c, idx) =>
                        idx === existingCourseIndex ? updatedCourse : c
                    )
                );

                showNotification(
                    "success",
                    "Staff Added Successfully",
                    `Staff "${newCourseData.staff}" has been added to ${newCourseData.courseName}.`
                );
            } else {
                showNotification(
                    "warning",
                    "Staff Already Exists",
                    `This staff member already exists for ${newCourseData.courseName}.`
                );
            }
        } else {
            // New course
            const newAvailableCourse = {
                id: availableCourses.length + 1,
                courseName: newCourseData.courseName,
                staff: newCourseData.staff,
                credits: newCourseData.credits,
                selectedSlots: newCourseData.selectedSlots,
                staffOptions: newCourseData.staff
                    ? [
                        {
                            name: newCourseData.staff,
                            selectedSlots: newCourseData.selectedSlots,
                        },
                    ]
                    : [],
            };

            setAvailableCourses((prev) => [...prev, newAvailableCourse]);
        }
    };

    /**
     * Removes a course from available courses
     * @param {Object} course - Course object to remove
     */
    const deleteCourse = (course) => {
        setAvailableCourses((prev) =>
            prev.filter((c) => c.courseName !== course.courseName)
        );

        showNotification(
            "success",
            "Course Deleted",
            `"${course.courseName}" has been removed from available courses.`
        );
    };

    return {
        availableCourses,
        saveCourse,
        deleteCourse,
    };
};

/**
 * Custom hook for managing selected courses (user's schedule)
 * Persists selected courses to localStorage for data retention across page reloads
 * @returns {Object} Selected courses state and management functions
 */
export const useSelectedCourses = (showNotification) => {
    // Use localStorage to persist selected courses (user's schedule) across page reloads
    const [courses, setCourses] = useLocalStorage('selectedCourses', []);

    /**
     * Adds or updates a course in the user's schedule
     * @param {Object} courseData - Course data with time slots
     */
    const selectCourse = (courseData) => {
        // Validate that course has time slots
        if (!courseData.selectedSlots || courseData.selectedSlots.length === 0) {
            showNotification(
                "error",
                "No Time Slots Configured",
                "This course doesn't have time slots configured. Please contact the administrator."
            );
            return;
        }

        // Check if course already exists
        const existingCourseIndex = courses.findIndex(
            (c) => c.courseName === courseData.courseName
        );

        if (existingCourseIndex !== -1) {
            // Course exists - replace with new staff selection
            const existingCourse = courses[existingCourseIndex];

            // Check for conflicts with OTHER courses
            const hasConflict = hasSlotsConflict({
                slots: courseData.selectedSlots,
                courses,
                excludeCourseIndex: existingCourseIndex,
            });

            if (hasConflict) {
                showNotification(
                    "error",
                    "Schedule Conflict",
                    "This course has time conflicts with your existing schedule. Please choose a different staff or course."
                );
                return;
            }

            // Update course, preserving color and ID
            const updatedCourse = {
                ...existingCourse,
                ...courseData,
                id: existingCourse.id,
                color: existingCourse.color,
            };

            setCourses((prev) =>
                prev.map((c, idx) => (idx === existingCourseIndex ? updatedCourse : c))
            );
            return;
        }

        // New course selection - check for conflicts
        const hasConflict = hasSlotsConflict({
            slots: courseData.selectedSlots,
            courses,
        });

        if (hasConflict) {
            showNotification(
                "error",
                "Schedule Conflict",
                "This course has time conflicts with your existing schedule. Please choose a different course or time."
            );
            return;
        }

        // Assign color and add course
        const selectedColor = getNextAvailableColor(courses);
        const newCourse = {
            id: courses.length + 1,
            ...courseData,
            color: selectedColor,
        };

        setCourses((prev) => [...prev, newCourse]);
    };

    /**
     * Removes a course from the user's schedule
     * @param {number} courseId - ID of the course to remove
     */
    const removeCourse = (courseId) => {
        setCourses((prev) => prev.filter((course) => course.id !== courseId));
    };

    return {
        courses,
        selectCourse,
        removeCourse,
    };
};

/**
 * Custom hook for managing modal states
 * @returns {Object} Modal states and toggle functions
 */
export const useModals = () => {
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
    const [isAvailableCoursesModalOpen, setIsAvailableCoursesModalOpen] =
        useState(false);

    return {
        isAddCourseModalOpen,
        isAvailableCoursesModalOpen,
        openAddCourseModal: () => setIsAddCourseModalOpen(true),
        closeAddCourseModal: () => setIsAddCourseModalOpen(false),
        openAvailableCoursesModal: () => setIsAvailableCoursesModalOpen(true),
        closeAvailableCoursesModal: () => setIsAvailableCoursesModalOpen(false),
    };
};
