import AWS from "aws-sdk";
import fs from "fs";
import Attachment from "../../../models/Attachment.model.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await Attachment.findById(id);

    if (!attachment) {
      return res.status(404).json({ message: "Not found" });
    }

    if (attachment.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete from S3 if the file is stored remotely
    if (attachment.filePath.startsWith("http")) {
      const Key =
        attachment.fileKey || attachment.filePath.split(".amazonaws.com/")[1];

      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key,
        })
        .promise();
    } else {
      // Delete from local storage
      fs.unlink(`uploads/${attachment.filePath}`, () => {});
    }

    await attachment.deleteOne();

    return res.json({ message: "Attachment deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
