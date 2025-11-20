import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import * as ProjectController from "../controllers/project/project.controller.js";

const router = express.Router();

router.post("/", auth, ProjectController.createProject);
router.get("/", auth, ProjectController.getProjects);
router.get("/:id", auth, ProjectController.getProjectById);
router.put("/:id", auth, ProjectController.updateProject);
router.delete("/:id", auth, ProjectController.deleteProject);

export default router;
