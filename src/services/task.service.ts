import { Prisma } from "@prisma/client";
import { TaskStatus } from "../enum/taskStatus.enum";
import { TaskRepository, taskRequest } from "../repositories/task.repositories";
import { handlePrismaError } from "../utils/handlePrismaError";

export const createTaskService = async (data: taskRequest) => {
  try {
    data.status = TaskStatus.TODO;
    const task = await TaskRepository.createTask(data);
    return task;

  } catch (error) {
    handlePrismaError(error);
  }
};