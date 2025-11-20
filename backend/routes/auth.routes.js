import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import * as AuthController from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", auth, AuthController.me);

// unified OTP verification
router.post("/verify-otp", AuthController.verifyOtp);

// forgot/reset password
router.post("/password/request-otp", AuthController.requestPasswordOtp);
router.post("/password/update", AuthController.updatePassword);

export default router;
