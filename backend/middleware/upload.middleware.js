import multer from "multer";
import path from "path";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

// File type filter for uploads
const fileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.includes(ext)
    ? cb(null, true)
    : cb(new Error("Only images and PDFs allowed"));
};

// Local storage configuration (used in development)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads/tasks"));
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${Date.now()}-${cleanName}`);
  },
});

// S3 storage (only created when running in production)
let s3Storage = null;

if (process.env.NODE_ENV === "production") {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  s3Storage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      cb(null, `tasks/${Date.now()}-${cleanName}`);
    },
  });
}

// Choose storage method based on environment
const storage =
  process.env.NODE_ENV === "production" ? s3Storage : localStorage;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
