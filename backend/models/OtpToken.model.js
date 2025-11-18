import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    purpose: { type: String, enum: ["VERIFY_EMAIL", "PASSWORD_RESET"], required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("OtpToken", otpSchema);
