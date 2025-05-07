import { TaskRepository, taskRequest } from "../repositories/task.repositories";

export const createTaskService = async (data: taskRequest) => {
  try {
    const task = await TaskRepository.createTask(data);
    return task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};
