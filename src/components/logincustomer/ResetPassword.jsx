import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetPassword = async () => {
    setError("");

    if (!form.password || !form.confirmPassword) {
      setError("All fields required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://flipcart-1-audl.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      alert("Password reset successful");
      navigate("/login");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">
      <div className="bg-white p-6 rounded-xl w-80 shadow">

        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full h-10 border px-3 rounded-md mt-3"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full h-10 border px-3 rounded-md mt-3"
        />

        <button
          onClick={resetPassword}
          className="w-full mt-4 bg-orange-500 text-white h-10 rounded-md"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}   