
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-14 bg-[#2874f0] flex items-center justify-between px-4 shadow-md sticky top-0 z-50">
      
      {/* LEFT LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer"
      >
        <img
          src="/logo.webp"
          alt="logo"
          className="h-8 object-contain"
        />
      </div>

      {/* RIGHT CART */}
      <div
        onClick={() => navigate("/cart")}
        className="relative cursor-pointer"
      >
        <FaShoppingCart className="text-white w-7 h-7" />

        {/* CART COUNT */}
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ffc200] text-black text-[10px] font-bold flex items-center justify-center">
          2
        </span>
      </div>
    </header>
  );
}

