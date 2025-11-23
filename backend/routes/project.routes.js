import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import * as ProjectController from "../controllers/project/project.controller.js";
import * as TaskController from "../controllers/task/task.controller.js";

const router = express.Router();

router.post("/", auth, ProjectController.createProject);
router.get("/", auth, ProjectController.getProjects);
router.get("/project/:id", auth, ProjectController.getProjectById);
router.put("/project/:id", auth, ProjectController.updateProject);
router.delete("/project/:id", auth, ProjectController.deleteProject);

router.post("/:projectId/tasks", auth, TaskController.createTask);
router.get("/:projectId/tasks", auth, TaskController.getTasks);

export default router;
