import Attachment from "../../../models/Attachment.model.js";

export const uploadAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { taskId } = req.params;

    const attachment = await Attachment.create({
      task: taskId,
      fileName: req.file.originalname,
      filePath: req.file.location || `tasks/${req.file.filename}`,
      fileKey: req.file.key || null,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: req.user.userId,
    });

    return res.status(201).json({ message: "Uploaded", attachment });
  } catch (err) {
    console.error("UPLOAD ERROR:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    // Extra info about the uploaded file (if any)
    if (req.file) {
      console.error("File details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        location: req.file.location,
        key: req.file.key,
      });
    } else {
      console.error("No file data was provided by Multer");
    }

    // Log current environment
    console.error("NODE_ENV:", process.env.NODE_ENV);

    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};
