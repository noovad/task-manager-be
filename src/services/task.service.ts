import { TaskStatus } from "../enum/taskStatus.enum";
import { TaskRepository, taskRequest } from "../repositories/task.repositories";

export const createTaskService = async (data: taskRequest) => {
    data.status = TaskStatus.TODO;
    const task = await TaskRepository.createTask(data);
    return task;
};