import TaskModel from "../../models/Task.model.js";

export const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      owner: req.user.userId
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
