import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert("Login Successful");
    } else {
      alert("Signup Successful");
    }

    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6] flex items-center justify-center p-3">

      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-md overflow-hidden">

        {/* TOP */}
        <div className="bg-[#2874f0] px-5 py-6 text-white">

          <h2 className="text-2xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <p className="text-sm mt-2 text-blue-100">
            {isLogin
              ? "Get access to your Orders & Wishlist"
              : "Create account to continue shopping"}
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-4"
        >

          {/* SIGNUP NAME */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm outline-none focus:border-[#2874f0]"
              required
            />
          )}

          {/* MOBILE */}
          <input
            type="number"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm outline-none focus:border-[#2874f0]"
            required
          />

          {/* SIGNUP EMAIL */}
          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm outline-none focus:border-[#2874f0]"
              required
            />
          )}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm outline-none focus:border-[#2874f0]"
            required
          />

          {/* TERMS */}
          <p className="text-xs text-gray-500 leading-5">
            By continuing, you agree to Flipkart's
            Terms of Use and Privacy Policy.
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-11 bg-[#fb641b] text-white font-semibold text-sm active:scale-95 transition-all"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* SWITCH */}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#2874f0] text-sm font-semibold"
          >
            {isLogin
              ? "New to Flipkart? Create an account"
              : "Existing User? Login"}
          </button>

        </form>
      </div>
    </div>
  );
}