import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../../utils/s3.js";
import fs from "fs";
import Attachment from "../../../models/Attachment.model.js";
import path from "path";

export const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await Attachment.findById(id);

    if (!attachment) return res.status(404).json({ message: "Not found" });

    if (attachment.owner.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    if (process.env.NODE_ENV === "production" && attachment.fileKey) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: attachment.fileKey,
        })
      );
    } else {
      const localPath = path.resolve("uploads", attachment.filePath);
      if (fs.existsSync(localPath)) {
        try {
          fs.unlinkSync(localPath);
        } catch (err) {
          console.warn("Could not delete local file:", err.message);
        }
      }
    }

    await attachment.deleteOne();

    res.json({ message: "Attachment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default deleteAttachment;
