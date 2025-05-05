import { TaskModel } from '../models/task.model';

export const createTaskService = async (data: TaskModel) => {
  try {
    const task = await TaskModel.createTask(data);
    return task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};
