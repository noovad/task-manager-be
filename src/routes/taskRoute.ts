import { Router } from 'express';
import { createTaskController } from '../controllers/task.controller';

const router = Router();

router.get("/tasks", (req, res) => {
  res.send("List of tasks");
});

router.post("/tasks", createTaskController);


export default router;

