import ProjectModel from "../../models/Project.model.js";

export const updateProject = async (req, res) => {
  try {
    const updated = await ProjectModel.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Project not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
