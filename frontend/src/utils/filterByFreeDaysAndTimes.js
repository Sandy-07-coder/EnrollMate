
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
            if (days.includes(courseDay) || times.includes(courseTime)) {
                flag = false;
                break;
            }
        }
        if (flag) filteredCourses.push(course);
    }

    return filteredCourses;
}

export default filterByFreeDaysAndTimes;