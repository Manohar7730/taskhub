import ProjectModel from "../../models/Project.model.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find({ owner: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
