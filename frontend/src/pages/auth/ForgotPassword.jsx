import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequestOTP } from "../../services/auth.api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter an email");

    try {
      setLoading(true);

      await forgotPasswordRequestOTP({ email });

      // Store email and purpose for next step
      sessionStorage.setItem("otp-email", email);
      sessionStorage.setItem("otp-purpose", "PASSWORD_RESET");

      navigate("/update-password");
    } catch (err) {
      alert("Failed to send OTP", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-2 text-4xl font-semibold text-cyan-600 drop-shadow-sm">
          TaskHub
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white transition hover:bg-cyan-600 active:scale-95 disabled:bg-gray-300 disabled:text-gray-600"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
