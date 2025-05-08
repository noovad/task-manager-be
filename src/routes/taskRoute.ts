import { Router } from 'express';
import { createTaskController } from '../controllers/task.controller';
import { createTaskValidator } from '../validators/task.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post("/tasks", createTaskValidator, validate, createTaskController);

export default router;

