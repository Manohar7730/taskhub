import TaskModel from "../../models/Task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({
      project: req.params.projectId,
      owner: req.user.userId
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
