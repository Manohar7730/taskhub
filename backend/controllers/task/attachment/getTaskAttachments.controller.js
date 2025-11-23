import Attachment from "../../../models/Attachment.model.js";

export const getTaskAttachments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const attachments = await Attachment.find({ task: taskId }).sort({
      createdAt: -1,
    });

    res.json(attachments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
