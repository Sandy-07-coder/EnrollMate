const hasConflict = (newCourse, selectedCourses) => {



    for (const course of selectedCourses) {
        for (const courseSlot of course.slots) {
            // console.log(courseSlot);
            for (const newSlot of newCourse.slots)
                if (courseSlot.day === newSlot.day && courseSlot.time === newSlot.time) {
                    return true;
                }
        }
    }

    return false;
}

export default hasConflict;