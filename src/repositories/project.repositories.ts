import prisma from '../configs/prismaClient';
import { projectRequest } from '../dto/project.dto';

export const create = async (data: projectRequest, userId: string) => {
  return await prisma.project.create({
    data: {
      ...data,
      ownerId: userId,
      members: {
        create: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      },
    },
  });
};

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
    include: {
      members: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
    },
  });
};

export const findByUserAndProject = async (
  userId: string,
  projectId: string
) => {
  return await prisma.project.findFirst({
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

export const update = async (data: projectRequest, id: string) => {
  return await prisma.project.update({
    where: {
      id,
    },
    data,
  });
};

export const remove = async (id: string) => {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};
