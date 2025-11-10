
const findConflictingCourses = (newCourse, selectedCourses) => {
    const conflicts = [];

    if (selectedCourses.length === 0) return conflicts

    for (const existingCourse of selectedCourses) {
        for (const existingSlot of existingCourse.slots) {
            for (const newSlot of newCourse.slots) {
                if (existingSlot.day === newSlot.day && existingSlot.time === newSlot.time) {
                    conflicts.push({
                        confictingCourse: existingCourse,
                        message: `"${existingCourse.courseName}" (${existingCourse.uniqueId}) is already scheduled on ${existingSlot.day} at ${existingSlot.time}`
                    })
                }
            }
        }
    }

    return conflicts;
};

export default findConflictingCourses;