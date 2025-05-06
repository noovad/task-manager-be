import { Request, Response } from "express";
import { createTaskService } from "../services/task.service";

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const taskData = req.body;
        const task = await createTaskService(taskData);

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
