import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // =========================
  // CART COUNT
  // =========================
  const [cartCount, setCartCount] =
    useState(0);

  // =========================
  // LOAD CART COUNT
  // =========================
  const loadCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) ||
      [];

    // TOTAL QTY
    const totalQty = cart.reduce(
      (total, item) =>
        total + Number(item.qty || 1),
      0
    );

    setCartCount(totalQty);
  };

  // =========================
  // LISTENER
  // =========================
  useEffect(() => {
    loadCartCount();

    window.addEventListener(
      "cartUpdated",
      loadCartCount
    );

    window.addEventListener(
      "storage",
      loadCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );

      window.removeEventListener(
        "storage",
        loadCartCount
      );
    };
  }, []);

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
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#ffc200] text-black text-[10px] font-bold flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  );
}