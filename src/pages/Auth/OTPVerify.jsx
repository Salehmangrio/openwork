import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const location = useLocation();
  console.table(location);
  const message = location.state?.message || "A OTP has been sent to your email.";

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 4) {
      alert("Please enter the full OTP.");
      return;
    }
    alert("OTP Verified: " + code);
  };

  const handleResend = () => {
    alert("OTP resent!");
    setTimer(30);
    setResendDisabled(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">

      {/* PLATFORM NAME ON TOP */}
      <div className="absolute top-8 text-center">
        <NavLink to="/login">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text drop-shadow-md">
          OpenWork
        </h1>
        </NavLink>
      </div>

      {/* CARD */}
      <div className="bg-white  rounded-2xl p-10 w-full max-w-md mt-20 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">

        {/* Header */}
        <h1 className="text-3xl font-bold text-indigo-700 text-center">
          OTP Verification
        </h1>
        <p className="text-gray-600 text-center mt-2">
          {message.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="font-semibold text-midnight-600">
            {message.split(" ").slice(-1)}
          </span>
        </p>


        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="
                w-14 h-14 text-center text-2xl font-semibold 
                border border-gray-300 rounded-xl 
                bg-gray-50 shadow-sm hover:shadow-md
                focus:ring-2 focus:ring-indigo-600 focus:outline-none
                transition-all
              "
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleVerify}
          className="
            w-full mt-8 py-3 
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:opacity-90 
            text-white text-lg font-semibold
            rounded-xl shadow-md transition-all
          "
        >
          Continue
        </button>

        {/* Resend */}
        <div className="mt-6 text-center text-gray-700">
          Didn’t receive the code?
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className={`
              ml-2 font-semibold
              ${resendDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-indigo-600 hover:underline"}
            `}
          >
            Resend
          </button>
        </div>

        {resendDisabled && (
          <p className="mt-2 text-center text-sm text-gray-500">
            You can resend in {timer}s
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPVerify;
