import OtpTokenModel from "../../models/OtpToken.model.js";
import UserModel from "../../models/User.model.js";

export const verifyOtp = async (req, res) => {
  try {
    const { email, code, purpose } = req.body;

    if (!email || !code || !purpose) {
      return res.status(400).json({ message: "email, code, purpose required" });
    }

    // Look up the matching OTP record
    const token = await OtpTokenModel.findOne({
      email,
      code,
      purpose,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Apply the action associated with this OTP purpose
    if (purpose === "VERIFY_EMAIL") {
      await UserModel.updateOne({ email }, { isEmailVerified: true });
    }

    // Mark this OTP as used
    token.used = true;
    await token.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(`[VERIFY OTP ERROR]`, err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
