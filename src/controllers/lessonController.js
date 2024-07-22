const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createLesson = async (req, res, next) => {
  try {
    const { name, video, courseId } = req.body;
    const lesson = await prisma.lesson.create({
      data: { name, video, courseId },
    });
    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.getAllLessons = async (req, res, next) => {
  try {
    const lessons = await prisma.lesson.findMany();
    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
};

exports.getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await prisma.lesson.findUnique({
      where: { id: parseInt(id) },
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.status(200).json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, video } = req.body;

    const lesson = await prisma.lesson.update({
      where: { id: parseInt(id) },
      data: { name, video },
    });

    res.status(200).json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.lesson.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
