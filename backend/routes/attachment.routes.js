import express from "express";
import upload from "../middleware/upload.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { deleteAttachment } from "../controllers/task/attachment/deleteAttachment.controller.js";
import { getTaskAttachments } from "../controllers/task/attachment/getTaskAttachments.controller.js";
import { uploadAttachment } from "../controllers/task/attachment/uploadAttachment.controller.js";
import Attachment from "../models/Attachment.model.js";
import path from "path";
import fs from "fs";


const router = express.Router();

router.post(
  "/tasks/:taskId/attachments",
  auth,
  upload.single("file"),
  uploadAttachment
);

router.get("/tasks/:taskId/attachments", auth, getTaskAttachments);

router.delete("/attachments/:id", auth, deleteAttachment);
router.get("/attachments/:id/download", auth, async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) return res.status(404).send("File not found");

    // If file is stored on S3 (starts with http)
    if (attachment.filePath.startsWith("http")) {
      return res.redirect(attachment.filePath);  // redirect to S3 URL
    }

    // Local dev mode download
    const filePath = path.resolve("uploads", attachment.filePath);

    console.log("DB filePath:", attachment.filePath);
    console.log("Full path:", filePath);
    console.log("Exists:", fs.existsSync(filePath));

    res.download(filePath, attachment.fileName, (err) => {
      if (err) {
        console.log("Download error:", err);
        return res.status(500).send("Error downloading file");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
