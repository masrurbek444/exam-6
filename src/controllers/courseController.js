const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../utils/pagination');

exports.createCourse = async (req, res, next) => {
  try {
    const { name, photo, description, lessonCount } = req.body;
    const course = await prisma.course.create({
      data: { name, photo, description, lessonCount },
    });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const courses = await prisma.course.findMany({
      skip: offset,
      take: limit,
    });

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: { lessons: true },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, photo, description, lessonCount } = req.body;

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { name, photo, description, lessonCount },
    });

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
