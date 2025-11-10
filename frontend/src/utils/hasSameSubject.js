
const hasSameSubjects = (newCourse, selectedCourses) => {
    for (const existingCourse of selectedCourses) {
        const courseName = existingCourse.courseName;
        const newCourseName = newCourse.courseName;

        if (courseName === newCourseName) return true;
    }

    return false;
};

export default hasSameSubjects;