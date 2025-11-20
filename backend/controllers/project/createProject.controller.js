import ProjectModel from "../../models/Project.model.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title.trim() || !description.trim() || dueDate < Date.now()) {
      return res.status(400).json({ message: "Details not fulfilled" });
    }
    const project = await ProjectModel.create({
      title,
      description,
      dueDate,
      owner: req.user.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

