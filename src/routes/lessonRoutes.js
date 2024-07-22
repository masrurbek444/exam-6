const express = require('express');
const { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.post('/', isAdmin, createLesson);
router.get('/', getAllLessons);
router.get('/:id', getLessonById);
router.put('/:id', isAdmin, updateLesson);
router.delete('/:id', isAdmin, deleteLesson);

module.exports = router;
