import ProjectModel from "../../models/Project.model.js";
import TaskModel from "../../models/Task.model.js";

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const tasks = await TaskModel.find({ project: project._id });

    res.json({ project, tasks });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
