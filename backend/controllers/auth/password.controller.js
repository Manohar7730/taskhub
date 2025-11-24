import OtpTokenModel from "../../models/OtpToken.model.js";
import UserModel from "../../models/User.model.js";
import { sendEmail } from "../../services/email.service.js";
import { generateOtp } from "./util.js";

// Send OTP for password reset request
export const requestPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "email required" });

    const user = await UserModel.findOne({ email });

    // Always return the same message to avoid exposing valid emails
    const msg = { message: "If the email exists, OTP was sent." };

    if (!user) return res.status(200).json(msg);

    const code = generateOtp();

    await OtpTokenModel.create({
      email,
      code,
      purpose: "PASSWORD_RESET",
      used: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // expires in 10 minutes
    });

    // Email the OTP to the user
    await sendEmail(
      email,
      "Password Reset OTP",
      `Your TaskHub password reset OTP is: ${code}`
    );

    console.log(`[PASSWORD OTP] Sent to ${email}`);

    return res.status(200).json(msg);
  } catch (err) {
    console.error(`[REQUEST PASSWORD OTP ERROR]`, err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update password after validating OTP
export const updatePassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "email, code, newPassword required" });
    }

    // Confirm valid OTP for password reset
    const otpRecord = await OtpTokenModel.findOne({
      email,
      code,
      purpose: "PASSWORD_RESET",
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Ensure user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid request" });

    // Apply the new password
    user.password = newPassword;
    await user.save();

    // Mark OTP as used so it cannot be reused
    otpRecord.used = true;
    await otpRecord.save();

    console.log(`[PASSWORD UPDATED] for user: ${email}`);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(`[UPDATE PASSWORD ERROR]`, err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
