import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter an email");

    try {
      setLoading(true);

      await api.post("/auth/password/request-otp", { email });

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
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white shadow-xl p-6">

        <h1 className="text-4xl font-semibold text-cyan-600 drop-shadow-sm mb-2">
          TaskHub
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-3 py-2 rounded-md border border-gray-300 
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2 rounded-md bg-cyan-500 text-white font-medium 
              transition hover:bg-cyan-600 active:scale-95
              disabled:bg-gray-300 disabled:text-gray-600
            "
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
