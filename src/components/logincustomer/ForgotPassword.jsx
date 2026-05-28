import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://flipcart-1-audl.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setMessage("OTP sent to your email");

      navigate("/verify-otp", { state: { email } });

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">
      <div className="bg-white p-6 rounded-xl w-80 shadow">

        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 border px-3 rounded-md mt-3"
        />

        {/* SEND OTP BUTTON */}
        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white h-10 rounded-md flex items-center justify-center disabled:opacity-60"
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Send OTP"
          )}
        </button>

      </div>
    </div>
  );
}