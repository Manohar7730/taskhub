import multer from "multer";
import path from "path";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";

const fileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.includes(ext)
    ? cb(null, true)
    : cb(new Error("Only images and PDFs allowed"));
};

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve("uploads/tasks");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const upload = multer({
  storage: localStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const s3UploadMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[UPLOAD] Dev Mode: Keeping file locally.");
    return next();
  }

  try {
    if (!req.file) return next();

    console.log("[UPLOAD] Prod Mode: Moving file to S3...");

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = req.file.filename;
    const Key = `tasks/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Body: fileBuffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    req.file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
    req.file.key = Key;

    fs.unlinkSync(filePath); 

    console.log("[UPLOAD] Prod Mode: S3 Success. Local file cleaned.");
    next();
  } catch (err) {
    console.error("[S3 UPLOAD FAILED]", err);
    
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ 
        message: "Production Upload Failed: S3 is unreachable.", 
        error: err.message 
    });
  }
};

export default upload;