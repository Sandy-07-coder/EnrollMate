import { doSlotsOverlap } from './timeSlots';

const hasConflict = (newCourse, selectedCourses) => {
    for (const course of selectedCourses) {
        for (const courseSlot of course.slots) {
            for (const newSlot of newCourse.slots) {
                // Check if same day and overlapping time
                if (courseSlot.day === newSlot.day && doSlotsOverlap(courseSlot.time, newSlot.time)) {
                    return true;
                }
            }
        }
    }

    return false;
}

export default hasConflict;