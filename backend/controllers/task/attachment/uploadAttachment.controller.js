import Attachment from "../../../models/Attachment.model.js     ";

export const uploadAttachment = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { taskId } = req.params;

    const attachment = await Attachment.create({
      task: taskId,
      fileName: req.file.originalname,
filePath: `tasks/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: req.user.userId,
    });

    res.status(201).json({ message: "Uploaded", attachment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
