const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLesson = async (data) => {
  return prisma.lesson.create({ data });
};

const getAllLessons = async () => {
  return prisma.lesson.findMany();
};

const getLessonById = async (id) => {
  return prisma.lesson.findUnique({
    where: { id: parseInt(id) },
  });
};

const updateLesson = async (id, data) => {
  return prisma.lesson.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteLesson = async (id) => {
  return prisma.lesson.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson };
