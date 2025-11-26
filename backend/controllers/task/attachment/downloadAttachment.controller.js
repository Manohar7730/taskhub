import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../../utils/s3.js";
import Attachment from "../../../models/Attachment.model.js";
import path from "path";
import fs from "fs";

export const downloadAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) return res.status(404).json({ message: "File not found" });

    if (process.env.NODE_ENV !== "production") {
      let relativePath = attachment.filePath;
      relativePath = relativePath.replace(/^\/+/, "");

      if (!relativePath.startsWith("tasks/")) {
        relativePath = `tasks/${relativePath}`;
      }

      const localPath = path.resolve("uploads", relativePath);

      if (!fs.existsSync(localPath)) {
        console.error("File missing at:", localPath);
        return res
          .status(404)
          .json({ message: "Local file system error: File not found" });
      }

      const serverUrl =
        process.env.SERVER_URL || `${req.protocol}://${req.get("host")}`;

      const url = `${serverUrl}/uploads/${relativePath}`;

      return res.json({ url });
    }

    const Key = attachment.fileKey
      ? attachment.fileKey
      : attachment.filePath.includes("amazonaws.com")
      ? attachment.filePath.split(".amazonaws.com/")[1]
      : `tasks/${attachment.fileName}`;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ResponseContentDisposition: `attachment; filename="${attachment.fileName}"`,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    return res.json({ url: signedUrl });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default downloadAttachment;
