import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const maskEmail = (mail) => {
    if (!mail.includes("@")) return mail;
    const [name, domain] = mail.split("@");
    return `${name.slice(0, 2)}****@${domain}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const masked = maskEmail(email);

    navigate("otp", {
      state: { message: `A 4 digit OTP has been sent to ${masked}` },
    });

    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16 relative">

      {/* Title */}
      <h1 className="absolute top-6 sm:top-10 text-3xl sm:text-4xl font-extrabold 
        bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text
      ">
        OpenWork
      </h1>

      {/* Card */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md mt-20 sm:mt-24">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
          Enter your email to receive a one-time password (OTP).
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full px-4 py-3 text-gray-700
              border border-gray-300 rounded-xl 
              bg-gray-50 shadow-sm hover:shadow-md
              focus:ring-2 focus:ring-indigo-500 focus:outline-none
              transition-all placeholder-gray-400
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="
              w-full py-3 text-white text-lg font-semibold rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              shadow-md hover:opacity-90 transition
            "
          >
            Send OTP
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Remember your password?{" "}
          <NavLink
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
