const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCourse = async (data) => {
  return prisma.course.create({ data });
};

const getAllCourses = async (page, size) => {
  const { limit, offset } = getPagination(page, size);
  return prisma.course.findMany({
    skip: offset,
    take: limit,
  });
};

const getCourseById = async (id) => {
  return prisma.course.findUnique({
    where: { id: parseInt(id) },
    include: { lessons: true },
  });
};

const updateCourse = async (id, data) => {
  return prisma.course.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteCourse = async (id) => {
  return prisma.course.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse };
