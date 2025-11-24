import UserModel from "../../models/User.model.js";
import { signToken } from "./util.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.warn(`[LOGIN] Invalid email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      console.warn(`[LOGIN] Email not verified: ${email}`);
      return res.status(400).json({ message: "Email not verified" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.warn(`[LOGIN] Wrong password for: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    console.info(`[LOGIN] Success: ${email}`);

    return res.status(200).json({
      message: "Login success",
      user,
      token,
    });

  } catch (error) {
    console.error(`[LOGIN ERROR] ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default login;
