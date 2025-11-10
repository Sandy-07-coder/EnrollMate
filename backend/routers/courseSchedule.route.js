import express from "express";
import CourseSchedule from "../models/courseSchedule.model.js";
import { filterCoursesByDays, filterCoursesByTimes, getAllCourses, getAvailableCoursesName, getCoursesByCourseName, getCoursesBySearch } from "../controllers/courseSchedule.controller.js";

const router = express.Router();


router.get('/', getAllCourses);

// For future use, in case of scalability

router.get('/subjects', getAvailableCoursesName);
router.get('/search', getCoursesBySearch);

// filtering Routes

router.get('/filter/free-days', filterCoursesByDays);
router.get('/filter/free-times', filterCoursesByTimes);

router.get('/:subject', getCoursesByCourseName);



export default router;