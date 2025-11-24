import UserModel from "../../models/User.model.js";
import OtpTokenModel from "../../models/OtpToken.model.js";
import { sendEmail } from "../../services/email.service.js";
import { generateOtp } from "./util.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const exists = await UserModel.findOne({ email });
    if (exists) {
      console.warn(`[REGISTER] Email already exists: ${email}`);
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the new user
    const user = await UserModel.create({ name, email, password });

    // Generate an OTP for verifying the user's email
    const code = generateOtp();
    await OtpTokenModel.create({
      email,
      code,
      purpose: "VERIFY_EMAIL",
      used: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    console.info(`[REGISTER] OTP created for: ${email}`);

    // Send the OTP to the user's email
    await sendEmail(email, "Verify your email", `Your OTP is ${code}`);

    console.info(`[REGISTER] OTP email sent to: ${email}`);

    return res.status(201).json({
      message:
        "Registration successful. Please verify your email using the OTP sent.",
      email,
    });
  } catch (error) {
    console.error(`[REGISTER ERROR] ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default register;
