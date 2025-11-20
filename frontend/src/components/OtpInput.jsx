import React, { useRef, useState } from "react";

export default function OtpInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="mt-4 flex justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onClick={(e) => e.target.select()}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-12 w-10 rounded-xl border-2 border-gray-300 text-center text-2xl font-semibold transition-all outline-none hover:border-cyan-400 focus:border-cyan-500 focus:shadow-md focus:shadow-cyan-200 active:scale-95"
        />
      ))}
    </div>
  );
}
