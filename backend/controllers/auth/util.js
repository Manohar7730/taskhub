import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateOtp = () =>
  crypto.randomInt(100000, 999999).toString();

export const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10h",
      issuer: "myapp.com",
      audience: user._id.toString(),
    }
  );
};
