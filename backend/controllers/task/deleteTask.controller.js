import TaskModel from "../../models/Task.model.js";

export const deleteTask = async (req, res) => {
  try {
    const deleted = await TaskModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId
    });

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
