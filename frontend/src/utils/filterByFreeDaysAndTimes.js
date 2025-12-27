import { doSlotsOverlap } from './timeSlots';

const filterByFreeDaysAndTimes = (days, courses, times) => {
    // If no filters selected, return all courses
    if (days.length === 0 && times.length === 0) {
        return courses;
    }

    const filteredCourses = [];

    for (const course of courses) {
        let flag = true;
        for (const courseSlot of course.slots) {
            const courseDay = courseSlot.day;
            const courseTime = courseSlot.time;
            
            // Check if course day matches any selected free day
            if (days.includes(courseDay)) {
                flag = false;
                break;
            }
            
            // Check if course time overlaps with any selected free time
            for (const freeTime of times) {
                if (doSlotsOverlap(courseTime, freeTime)) {
                    flag = false;
                    break;
                }
            }
            
            if (!flag) break;
        }
        if (flag) filteredCourses.push(course);
    }

    return filteredCourses;
}

export default filterByFreeDaysAndTimes;