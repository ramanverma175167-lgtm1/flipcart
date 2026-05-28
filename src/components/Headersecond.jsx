import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaUserCircle,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // =========================
  // CART COUNT
  // =========================
  const [cartCount, setCartCount] = useState(0);

  // =========================
  // MENU STATE
  // =========================
  const [menuOpen, setMenuOpen] = useState(false);

  const loadCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const totalQty = cart.reduce(
      (total, item) => total + Number(item.qty || 1),
      0
    );

    setCartCount(totalQty);
  };

  useEffect(() => {
    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  // =========================
  // LOGOUT (FIXED + CLEAN)
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("pendingOrder");

    setCartCount(0);
    setMenuOpen(false);

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* SIDEBAR OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP */}
        <div className="bg-[#2874f0] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <FaUserCircle size={28} />
            <div>
              <p className="text-sm font-semibold">Hello User</p>
              <p className="text-xs">Welcome</p>
            </div>
          </div>

          <FaTimes
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* MENU */}
        <div className="flex flex-col p-3 text-sm">

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaHome /> Home
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaShoppingCart /> My Cart
          </button>

          <button
            onClick={() => {
              navigate("/orders");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaBoxOpen /> Orders
          </button>

          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaUserCircle /> Login / Signup
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 text-red-600 font-semibold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* HEADER */}
      <header className="w-full h-14 bg-[#2874f0] flex items-center justify-between px-4 shadow-md sticky top-0 z-50">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-xl"
          >
            ☰
          </button>

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
        </div>

        {/* CART */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <FaShoppingCart className="text-white w-7 h-7" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#ffc200] text-black text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </header>
    </>
  );
}