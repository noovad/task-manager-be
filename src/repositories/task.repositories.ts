import prisma from "../configs/prismaClient";
import { TaskPriority } from "../enum/taskPriority.enum";
import { TaskStatus } from "../enum/taskStatus.enum";

export interface taskRequest {
  projectName: string;
  name: string;
  priority: TaskPriority;
  assignedUsers: string;
  dueDate: Date;
  status: TaskStatus;
  description?: string;
  notes?: string;
}

export const TaskRepository = {
  createTask: async (data: taskRequest) => {
    return prisma.task.create({
      data,
    });
  },
};
