import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post("/tasks", createTaskValidator, validate, taskController.createTaskController);
router.get("/tasks", taskController.getAllTasksController);
router.get("/tasks/:id", taskController.getTaskByIdController);
router.put("/tasks/:id", updateTaskValidator, validate, taskController.updateTaskController);
router.delete("/tasks/:id", taskController.deleteTaskController);

export default router;

