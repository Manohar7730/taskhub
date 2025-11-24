import multer from "multer";
import path from "path";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

// ---------------------
// FILE FILTER
// ---------------------
const fileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.includes(ext)
    ? cb(null, true)
    : cb(new Error("Only images and PDFs allowed"));
};

// ---------------------
// LOCAL STORAGE (DEV)
// ---------------------
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads/tasks"));
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  },
});

// ---------------------
// ONLY CREATE S3 STORAGE IF PRODUCTION
// ---------------------
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
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      cb(null, `tasks/${Date.now()}-${cleanName}`);
    },
  });
}

// ---------------------
// CHOOSE STORAGE BASED ON ENV
// ---------------------
const storage =
  process.env.NODE_ENV === "production" ? s3Storage : localStorage;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
