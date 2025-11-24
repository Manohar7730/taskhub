import app from "./app.js";
import connectDB from "./config/db.js";
import AWS from "aws-sdk";

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/api/s3-test", async (req, res) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    await s3
      .putObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `test-${Date.now()}.txt`,
        Body: "S3 connection working!",
        ContentType: "text/plain",
      })
      .promise();

    res.json({ success: true });
  } catch (err) {
    console.error("S3 TEST ERROR:", err);
    res.json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
