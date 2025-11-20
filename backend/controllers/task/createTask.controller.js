import ProjectModel from "../../models/Project.model.js";
import TaskModel from "../../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectModel.findOne({
      _id: projectId,
      owner: req.user.userId
    });

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    const task = await TaskModel.create({
      ...req.body,
      project: projectId,
      owner: req.user.userId
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
