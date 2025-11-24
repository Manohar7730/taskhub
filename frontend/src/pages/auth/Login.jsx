import React, { useState } from "react";
import useAuth from "../../context/useAuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-2 text-4xl font-semibold text-cyan-600 drop-shadow-sm">
          TaskHub
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          {/* Email field */}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
          />

          {/* Password field */}
          <div className="w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
            />

            <label className="mt-1 flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white transition hover:bg-cyan-600 active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-4 flex w-full items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-cyan-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <div className="mt-1">
            <Link
              to="/register"
              className="text-sm text-cyan-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
