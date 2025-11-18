import OtpTokenModel from "../../models/OtpToken.model.js";
import UserModel from "../../models/User.model.js";
import { sendEmail } from "../../services/email.service.js";
import { generateOtp } from "./util.js";

/*******************************
 * REQUEST OTP FOR ANY PURPOSE
 *******************************/
export const requestPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "email required" });

    const user = await UserModel.findOne({ email });

    // Always return success, even if user doesn't exist
    const msg = { message: "If the email exists, OTP was sent." };

    if (!user) return res.status(200).json(msg);

    const code = generateOtp();

    await OtpTokenModel.create({
      email,
      code,
      purpose: "PASSWORD_RESET",
      used: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(email, "OTP for Password Reset", `Your OTP is ${code}`);

    return res.status(200).json(msg);
  } catch (err) {
    console.error(`[REQUEST PASSWORD OTP ERROR]`, err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/********************************
 * UPDATE PASSWORD AFTER OTP VERIFIED
 *******************************/
export const updatePassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword)
      return res
        .status(400)
        .json({ message: "email, code, newPassword required" });

    // Find OTP
    const token = await OtpTokenModel.findOne({
      email,
      code,
      purpose: "PASSWORD_RESET",
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid request" });

    user.password = newPassword;
    await user.save();

    // Mark token used
    token.used = true;
    await token.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(`[UPDATE PASSWORD ERROR]`, err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
