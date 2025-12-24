import CourseSchedule from "../models/courseSchedule.model.js";


export const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseSchedule.find();
        res.status(200).json({ message: "fetched all courses from db", courses });
    } catch (err) {
        res.status(500).json({ message: "Error from getAllCourses courseSchedule.controller.js ", err })
    }
};

export const getAvailableCoursesName = async (req, res) => {
    try {
        const coursesName = await CourseSchedule.find().select("courseName");
        res.status(200).json({ message: "fetched all courses Names from db", coursesName });
    }
    catch (err) {
        res.status(500).json({ message: "Error from getAvailableCoursesName courseSchedule.controller.js ", err })
    }
};

export const getCoursesByCourseName = async (req, res) => {
    const { subject } = req.params;
    try {
        if (!subject) {
            return res.status(400).json({ message: "Subject is not provided in params getCoursesByCourseName courseSchedule.controller.js" });
        }

        const courses = await CourseSchedule.find({ courseName: subject });
        res.status(200).json({ message: "fetched all courses for given subject from db", courses })
    }
    catch (err) {
        res.status(500).json({ message: "Error from getCoursesByCourseName courseSchedule.controller.js ", err })
    }
};

export const getCoursesBySearch = async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: "query is not provided getCoursesBySearch courseSchedule.controller.js" });
        }
        const courses = await CourseSchedule.find({
            $or: [
                { courseName: { $regex: query, $options: "i" } },
                { staff: { $regex: query, $options: "i" } },
                { uniqueId: { $regex: query, $options: "i" } },
            ]
        });
        res.status(200).json({ message: "fetched searched courses from db", courses });

    } catch (err) {
        res.status(500).json({ message: "Error from getCoursesBySearch courseSchedule.controller.js ", err })
    }
};

export const filterCoursesByDays = async (req, res) => {
    let { days } = req.query;

    try {
        if (!days) {
            return res.status(400).json({ message: "days is not provided in query parameter filterCoursesByDays courseSchedule.controller.js" });
        }

        if (!Array.isArray(days)) {
            days = days.replace(/[\[\]\s]/g, "").split(",");
        }

        const condition = {
            $and: days.map((day) => ({
                slots: { $not: { $elemMatch: { day } } },
            }))
        }

        const filteredCourses = await CourseSchedule.find(condition);
        res.status(200).json({ message: `Courses with no classes on ${days} was fetched from DB`, filteredCourses })

    } catch (err) {
        res.status(500).json({ message: "Error from filterCoursesByDays courseSchedule.controller.js ", error: err.message })
    }
};

export const filterCoursesByTimes = async (req, res) => {
    let { times } = req.query;

    try {
        if (!times) {
            return res.status(400).json({ message: "times is not provided in query parameter filterCoursesByDays courseSchedule.controller.js" });
        }

        if (!Array.isArray(times)) {
            times = times.replace(/[\[\]\s]/g, "").split(",");
        }

        const condition = {
            $and: times.map((time) => ({
                slots: { $not: { $elemMatch: { time } } },
            }))
        };

        const filteredCourses = await CourseSchedule.find(condition);
        res.status(200).json({ message: `Courses with no classes on ${times} was fetched from DB`, filteredCourses })

    } catch (err) {
        res.status(500).json({ message: "Error from filterCoursesByTimes courseSchedule.controller.js ", error: err.message })
    }
};
