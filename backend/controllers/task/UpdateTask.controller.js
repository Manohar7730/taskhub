import TaskModel from "../../models/Task.model.js";

export const updateTask = async (req, res) => {
  try {
    const updated = await TaskModel.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
