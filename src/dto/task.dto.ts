import { TaskPriority } from "../enum/taskPriority.enum";
import { TaskStatus } from "../enum/taskStatus.enum";

export interface taskRequest {
    projectId: string;
    title: string;
    priority: TaskPriority;
    assignedUsers: string;
    dueDate: Date;
    status: TaskStatus;
    description?: string;
    notes?: string;
}

export interface taskSorting {
    title?: string;
    projectName?: string;
    dueDate?: Date;
    status?: TaskStatus;
}