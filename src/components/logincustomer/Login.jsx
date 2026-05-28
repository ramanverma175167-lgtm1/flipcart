import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // LOGIN SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://flipcart-1-audl.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ❌ LOGIN FAILED
      if (!data.success) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      console.log("USER OBJECT:", data.user);

      // ❌ SAFETY CHECK (IMPORTANT FIX)
      if (!data.user) {
        setError("Login failed: user data missing");
        setLoading(false);
        return;
      }

      // ✅ SAVE USER SAFELY
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      // ✅ REDIRECT
      navigate("/account");

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f3f6] to-[#e6ecff] px-3">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#2874f0] p-6 text-center text-white">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm opacity-90">
            Login to continue shopping
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-center text-sm p-2">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full h-11 border rounded-md px-3 outline-none focus:border-[#2874f0]"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-11 border rounded-md px-3 pr-10 outline-none focus:border-[#2874f0]"
            />

            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-[#2874f0] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#fb641b] text-white font-semibold rounded-md active:scale-95 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#2874f0] font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>

        </form>

        <div className="text-center text-[11px] text-gray-400 pb-4">
          By continuing, you agree to Terms & Privacy Policy
        </div>

      </div>
    </div>
  );
}