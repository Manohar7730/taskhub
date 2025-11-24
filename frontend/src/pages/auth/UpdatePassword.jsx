import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuthContext";
import OtpInput from "../../components/OtpInput";
import { updatePassword } from "../../services/auth.api";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const email = sessionStorage.getItem("otp-email");
  const purpose = sessionStorage.getItem("otp-purpose");
  const otpFromStorage = sessionStorage.getItem("otp-code") || "";

  const isForgotFlow = !user;
  const isChangePasswordFlow = !!user;

  useEffect(() => {
    // Redirect if this page was accessed incorrectly
    if (!email || purpose !== "PASSWORD_RESET") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [otp, setOtp] = useState(otpFromStorage);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleOtpComplete = (code) => {
    setOtp(code);
    sessionStorage.setItem("otp-code", code);
  };

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) return alert("Please enter OTP");
    if (formData.newPassword !== formData.confirmPassword)
      return alert("Passwords do not match!");

    try {
      await updatePassword({
        email,
        code: otp,
        newPassword: formData.newPassword,
      });

      alert("Password updated successfully!");

      // Clear OTP session data
      sessionStorage.removeItem("otp-email");
      sessionStorage.removeItem("otp-purpose");
      sessionStorage.removeItem("otp-code");

      if (isForgotFlow) navigate("/login");
      if (isChangePasswordFlow) navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[380px] flex-col items-center rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-2 text-4xl font-semibold text-cyan-600 drop-shadow-sm">
          TaskHub
        </h1>

        <h2 className="mb-4 text-xl font-medium text-gray-700">
          Update Password
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          OTP sent to <span className="font-medium text-gray-700">{email}</span>
        </p>

        {/* OTP input field */}
        <div className="mb-6">
          <OtpInput length={6} onComplete={handleOtpComplete} />
        </div>

        {/* Password update form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 accent-cyan-600"
            />
            Show Password
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white transition hover:bg-cyan-600 active:scale-95"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
