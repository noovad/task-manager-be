import prisma from '../configs/prismaClient';

export const findAll = async (userId: string) => {
  return await prisma.project.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });
};

export const findById = async (id: string) => {
  return await prisma.project.findUnique({
    where: {
      id,
    },
  });
};

export const findByUserAndProject = async (
  userId: string,
  projectId: string
) => {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
      members: {
        some: {
          userId,
        },
      },
    },
  });
};
