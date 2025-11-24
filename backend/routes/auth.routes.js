import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import * as AuthController from "../controllers/auth/auth.controller.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 requests
  message: { message: "Too many attempts, please try again later" },
});

const router = express.Router();

router.use(authLimiter);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", auth, AuthController.me);

// unified OTP verification
router.post("/verify-otp", AuthController.verifyOtp);

// forgot/reset password
router.post("/password/request-otp", AuthController.requestPasswordOtp);
router.post("/password/update", AuthController.updatePassword);

export default router;
