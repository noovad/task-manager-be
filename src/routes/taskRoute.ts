import { Router } from 'express';
import { createTaskController, getAllTasksController } from '../controllers/task.controller';
import { createTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post("/tasks", createTaskValidator, validate, createTaskController);
router.get("/tasks", getAllTasksController);
export default router;

