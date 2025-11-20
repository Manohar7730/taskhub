import React, { useState } from "react";
import useAuth from "../context/useAuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    const { name, email, password } = formData;
    register(name, email, password);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white shadow-xl p-6">

        <h1 className="text-4xl font-semibold text-cyan-600 drop-shadow-sm mb-2">
          TaskHub
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          Create a new account
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            className="
              w-full px-3 py-2 rounded-md border border-gray-300 
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="
              w-full px-3 py-2 rounded-md border border-gray-300 
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
            "
          />

          {/* Password */}
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="
              w-full px-3 py-2 rounded-md border border-gray-300 
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
            "
          />

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleChange}
            className="
              w-full px-3 py-2 rounded-md border border-gray-300 
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
            "
          />

          {/* Show Password Toggle */}
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-2 rounded-md bg-cyan-500 text-white font-medium 
              transition hover:bg-cyan-600 active:scale-95
            "
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-cyan-600 hover:underline"
          >
            Already have an account? Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
