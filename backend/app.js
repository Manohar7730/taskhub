import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import attachmentRouter from "./routes/attachment.routes.js";
import path from "path";
import helmet from "helmet";

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(
  cors({
    origin: ["https://taskub.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", attachmentRouter);

export default app;
