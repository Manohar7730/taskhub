import ProjectModel from "../../models/Project.model.js";
import TaskModel from "../../models/Task.model.js";

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId
    });

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    // delete related tasks
    await TaskModel.deleteMany({ project: project._id });

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
