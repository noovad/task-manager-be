import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as taskService from "../services/task.service";
import { taskSorting } from "../dto/task.dto";
import { HttpResponse } from "../utils/httpResponse";

export const createTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const task = await taskService.createTaskService(req.body);
        res.status(201).json(
            HttpResponse.CREATED('Task created successfully', task)
        );
    }
);

export const getAllTasksController = asyncHandler(
    async (req: Request, res: Response) => {
        const { title, projectName, dueDateFrom, dueDateTo, sortBy, sortOrder, limit, page } = req.query;
        const tasks = await taskService.getAllTasksService(
            title as string,
            projectName as string,
            dueDateFrom ? new Date(dueDateFrom as string) : undefined,
            dueDateTo ? new Date(dueDateTo as string) : undefined,
            sortBy as keyof taskSorting,
            sortOrder as "asc" | "desc",
            Number(limit),
            Number(page)
        );
        res.status(200).json(
            HttpResponse.OK('Tasks retrieved successfully', tasks)
        );
    }
);

export const getTaskByIdController = asyncHandler(
    async (req: Request, res: Response) => {
        console.log(req.params.id);
        const task = await taskService.getTaskByIdService(req.params.id);
        res.status(200).json(
            HttpResponse.OK('Task retrieved successfully', task)
        );
    }
);

export const updateTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const task = await taskService.updateTaskService(req.params.id, req.body);
        res.status(200).json(
            HttpResponse.OK('Task updated successfully', task)
        );
    }
);

export const deleteTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        await taskService.deleteTaskService(req.params.id);
        res.status(200).json(
            HttpResponse.OK('Task deleted successfully')
        );
    }
);
