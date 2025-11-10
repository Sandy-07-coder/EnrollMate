const findSubjectDetails = (courses) => {
    const subjectDetails = [];

    const courseNames = [...new Set(courses.map(course => course.courseName))];

    for (const courseName of courseNames) {

        const course = courses.find(course => course.courseName === courseName);
        const displayName = course.displayName;
        const credits = course.credits;

        const totalCourses = courses.filter(course => course.courseName === courseName).length;

        const data = { courseName: courseName, displayName: displayName, credits: credits, totalCourses: totalCourses };

        subjectDetails.push(data);

    }

    return subjectDetails


}

export default findSubjectDetails;