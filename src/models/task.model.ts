import prisma from "../configs/prismaClient";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface TaskModel {
  projectName: string;
  name: string;
  priority: TaskPriority;
  assignedUsers: string;
  dueDate: Date;
  status: TaskStatus;
  description?: string;
  notes?: string;
}

export const TaskModel = {
  createTask: async (data: TaskModel) => {
    return prisma.task.create({
      data,
    });
  },
};
