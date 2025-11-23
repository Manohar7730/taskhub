import fs from "fs";
import Attachment from "../../../models/Attachment.model.js";

export const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;

    const attachment = await Attachment.findById(id);
    if (!attachment) return res.status(404).json({ message: "Not found" });

    if (attachment.owner.toString() !== req.user.userId.toString())
      return res.status(403).json({ message: "Unauthorized" });

    fs.unlink(`uploads/${attachment.filePath}`, () => {});

    await attachment.deleteOne();

    res.json({ message: "Attachment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
