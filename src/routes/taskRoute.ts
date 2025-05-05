import { Router } from 'express';
import { createTaskController } from '../controllers/task.controller';

const router = Router();

router.get("/tasks", (req, res) => {
  res.send("List of tasks");
});

router.post("/tasks", createTaskController);


export default router;
// router.get("/tasks/:id", (req, res) => {
//   const taskId = req.params.id;
//   res.send(`Task with ID: ${taskId}`);
// });

// router.post("/tasks", (req, res) => {
//   const newTask = req.body;
//   res.send(`Task created: ${JSON.stringify(newTask)}`);
// });

// router.put("/tasks/:id", (req, res) => {
//   const taskId = req.params.id;
//   const updatedTask = req.body;
//   res.send(
//     `Task with ID: ${taskId} updated to: ${JSON.stringify(updatedTask)}`
//   );
// });

// router.delete("/tasks/:id", (req, res) => {
//   const taskId = req.params.id;
//   res.send(`Task with ID: ${taskId} deleted`);
// });