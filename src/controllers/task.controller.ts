import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { createTaskService } from "../services/task.service";

export const createTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const task = await createTaskService(req.body);
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    }
);
