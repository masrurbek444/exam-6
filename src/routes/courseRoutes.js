const express = require('express');
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.post('/', isAdmin, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', isAdmin, updateCourse);
router.delete('/:id', isAdmin, deleteCourse);

module.exports = router;
