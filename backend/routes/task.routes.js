import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import * as TaskController from "../controllers/task/task.controller.js";

const router = express.Router();

router.post("/:projectId/tasks", auth, TaskController.createTask);
router.get("/:projectId/tasks", auth, TaskController.getTasks);

router.get("/task/:id", auth, TaskController.getTaskById);
router.put("/task/:id", auth, TaskController.updateTask);
router.delete("/task/:id", auth, TaskController.deleteTask);

export default router;
