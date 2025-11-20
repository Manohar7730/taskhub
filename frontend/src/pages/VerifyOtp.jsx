import React, { useEffect } from "react";
import OtpInput from "../components/OtpInput";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const registerEmail = sessionStorage.getItem("register-email");
  const email = registerEmail;
  const isRegisterFlow = !!registerEmail;
  useEffect(() => {
    if (!registerEmail) navigate("/login");
  });
  const handleOtpComplete = async (otp) => {
    if (isRegisterFlow) {
      await api.post("/auth/verify-otp", {
        email,
        code: otp,
        purpose: "VERIFY_EMAIL",
      });

      alert("Email Verified!");
      sessionStorage.removeItem("register-email");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[360px] flex-col items-center rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-2 text-4xl font-semibold text-cyan-600 drop-shadow-sm">
          TaskHub
        </h1>

        <h2 className="mb-4 text-lg font-medium text-gray-700">Enter OTP</h2>

        <p className="mb-6 text-center text-sm text-gray-500">
          OTP sent to <span className="font-medium text-gray-700">{email}</span>
        </p>

        <OtpInput length={6} onComplete={handleOtpComplete} />
      </div>
    </div>
  );
}
