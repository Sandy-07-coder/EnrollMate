import findConflictingCourses from "./findConfictingCourse";


const filterByNotConflict = (courses, selectedCourses) => {
    const filteredCourses = [];

    for (const course of courses) {

        const conflicts = findConflictingCourses(course, selectedCourses);

        if (conflicts.length === 0) {
            filteredCourses.push(course);
        }
    }

    return filteredCourses;

}

export default filterByNotConflict;