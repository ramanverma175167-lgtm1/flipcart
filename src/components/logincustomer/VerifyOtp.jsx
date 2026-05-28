import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // ======================
  // VERIFY OTP
  // ======================
  const verifyOtp = async () => {
    setError("");

    try {
      setLoading(true);

      const res = await fetch("https://flipcart-1-audl.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          otp,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      navigate("/reset-password", { state: { email: state.email } });

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  // ======================
  // RESEND OTP
  // ======================
  const resendOtp = async () => {
    setError("");
    setMessage("");

    try {
      const res = await fetch("https://flipcart-1-audl.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage("OTP resent successfully");

      // 30 sec cooldown
      setResendTimer(30);

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">
      <div className="bg-white p-6 rounded-xl w-80 shadow">

        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full h-10 border px-3 rounded-md mt-3"
        />

        {/* VERIFY BUTTON */}
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-4 bg-green-600 text-white h-10 rounded-md flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* RESEND OTP */}
        {resendTimer > 0 ? (
          <p className="text-xs text-gray-500 mt-3 text-center">
            Resend OTP in {resendTimer}s
          </p>
        ) : (
          <button
            onClick={resendOtp}
            className="text-blue-600 text-sm mt-3 w-full hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}