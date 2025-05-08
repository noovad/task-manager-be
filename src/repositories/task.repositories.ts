import prisma from "../configs/prismaClient";
import { taskRequest, taskSorting } from "../dto/task.dto";

export const createTask = async (data: taskRequest) => {
  return prisma.task.create({
    data,
  });
};

export const getAllTasks = async (options: {
  page?: number;
  limit?: number;
  title?: string;
  projectName?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  sortBy?: keyof taskSorting;
  sortOrder?: "asc" | "desc";
}) => {
  const {
    page,
    limit,
    title,
    projectName,
    dueDateFrom,
    dueDateTo,
    sortBy = "dueDate",
    sortOrder = "desc",
  } = options;

  const where: any = {};

  if (title) {
    where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  if (projectName) {
    where.project = {
      title: projectName,
    };
  }

  if (dueDateFrom || dueDateTo) {
    where.dueDate = {};
    if (dueDateFrom) {
      where.dueDate.gte = dueDateFrom;
    }
    if (dueDateTo) {
      where.dueDate.lte = dueDateTo;
    }
  }

  const pagination: { take?: number; skip?: number } = {};
  if (limit) {
    pagination['take'] = limit;
  }
  if (page && limit) {
    pagination['skip'] = (page - 1) * limit;
  }

  return prisma.task.findMany({
    ...pagination,
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
};

export const getTaskById = async (id: string) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const updateTask = async (id: string, data: taskRequest) => {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({
    where: {
      id,
    },
  });
};
