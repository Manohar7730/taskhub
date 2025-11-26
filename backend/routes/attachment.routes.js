import express from "express";
import upload, { s3UploadMiddleware } from "../middleware/upload.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import uploadAttachment from "../controllers/task/attachment/uploadAttachment.controller.js";
import getTaskAttachments from "../controllers/task/attachment/getTaskAttachments.controller.js";
import deleteAttachment from "../controllers/task/attachment/deleteAttachment.controller.js";
import downloadAttachment from "../controllers/task/attachment/downloadAttachment.controller.js";

const router = express.Router();

router.post(
  "/tasks/:taskId/attachments",
  auth,
  upload.single("file"),
  s3UploadMiddleware,
  uploadAttachment
);

router.get("/tasks/:taskId/attachments", auth, getTaskAttachments);

router.delete("/attachments/:id", auth, deleteAttachment);

router.get("/attachments/:id/download", auth, downloadAttachment);

export default router;
