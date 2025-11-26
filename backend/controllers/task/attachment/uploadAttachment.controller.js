import Attachment from "../../../models/Attachment.model.js";

export const uploadAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { taskId } = req.params;
    let filePath, fileKey;
    if (process.env.NODE_ENV === "production") {
      if (!req.file.location) {
        throw new Error(
          "Critical: S3 location missing in production environment."
        );
      }
      filePath = req.file.location;
      fileKey = req.file.key;
    } else {
      filePath = `tasks/${req.file.filename}`;
      fileKey = null;
    }

    const attachment = await Attachment.create({
      task: taskId,
      fileName: req.file.originalname,
      filePath,
      fileKey,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: req.user.userId,
    });

    return res.status(201).json({ message: "Uploaded", attachment });
  } catch (err) {
    console.error("UPLOAD CONTROLLER ERROR:", err.message);
    return res.status(500).json({
      message: "Upload failed",
      error: err.message,
    });
  }
};

export default uploadAttachment;
