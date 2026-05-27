import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaClock,
  FaSearch,
  FaUserCircle,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState({
      minutes: 30,
      seconds: 0,
    });

  // =========================
  // LOAD CART COUNT
  // =========================
// =========================
// LOAD CART COUNT
// =========================
const loadCartCount = () => {
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  // REMOVE INVALID ITEMS
  const validCart = cart.filter(
    (item) => item && item._id
  );

  // SAVE CLEAN CART
  localStorage.setItem(
    "cart",
    JSON.stringify(validCart)
  );

  // TOTAL QTY
  const totalQty = validCart.reduce(
    (total, item) =>
      total + Number(item.qty || 1),
    0
  );

  setCartCount(totalQty);
};

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            minutes = 30;
            seconds = 0;
          }
        }

        return { minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // CART UPDATE LISTENER
  // =========================
 // =========================
// CART UPDATE LISTENER
// =========================
useEffect(() => {
  // FIRST LOAD
  loadCartCount();

  // CUSTOM EVENT
  window.addEventListener(
    "cartUpdated",
    loadCartCount
  );

  // STORAGE EVENT
  window.addEventListener(
    "storage",
    loadCartCount
  );

  // AUTO REFRESH
  const interval = setInterval(() => {
    loadCartCount();
  }, 300);

  return () => {
    window.removeEventListener(
      "cartUpdated",
      loadCartCount
    );

    window.removeEventListener(
      "storage",
      loadCartCount
    );

    clearInterval(interval);
  };
}, []);

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6] overflow-x-hidden">

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* TOP */}
        <div className="bg-[#2874f0] h-16 flex items-center justify-between px-4">

          <div className="flex items-center gap-2">

            <FaUserCircle className="text-white text-3xl" />

            <div>
              <p className="text-white text-sm font-semibold">
                Hello User
              </p>

              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-xs text-white"
              >
                Login / Signup
              </button>
            </div>

          </div>

          <button
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <FaTimes className="text-white text-xl" />
          </button>

        </div>

        {/* MENU */}
        <div className="flex flex-col py-2">

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-4 text-sm border-b border-gray-100"
          >
            <FaHome className="text-gray-600" />
            Home
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-4 text-sm border-b border-gray-100"
          >
            <FaShoppingCart className="text-gray-600" />
            My Cart
          </button>

          <button className="flex items-center gap-3 px-4 py-4 text-sm border-b border-gray-100">
            <FaBoxOpen className="text-gray-600" />
            Orders
          </button>

          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-4 text-sm border-b border-gray-100"
          >
            <FaUserCircle className="text-gray-600" />
            My Account
          </button>

          <button className="flex items-center gap-3 px-4 py-4 text-sm border-b border-gray-100">
            <FaInfoCircle className="text-gray-600" />
            About Us
          </button>

        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#2874f0] shadow-md">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between px-3 py-2">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MENU BUTTON */}
            <button
              className="text-white"
              onClick={() =>
                setMenuOpen(true)
              }
            >
              <svg
                fill="#FFF"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>

            {/* LOGO */}
            <img
              src="/logo.webp"
              alt="logo"
              className="h-7 object-contain"
            />

          </div>

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() =>
              navigate("/cart")
            }
          >

            <FaShoppingCart
              size={22}
              className="text-white"
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ffc200] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </div>
        </div>

        {/* SEARCH */}
        <div className="px-3 pb-3">

          <div className="w-full h-11 bg-white flex items-center px-3 shadow-sm">

            <FaSearch className="text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full h-full px-3 text-sm text-gray-700 outline-none bg-white placeholder:text-gray-400"
            />

          </div>

        </div>
      </header>

      {/* TOP BANNER */}
      <div className="mt-1">

        <img
          src="/bannertop.jpg"
          alt="banner"
          className="w-full object-cover"
        />

      </div>

      {/* SECOND BANNER */}
      <div className="mt-2">

        <img
          src="/bannerdown.webp"
          alt="banner"
          className="w-full object-cover"
        />

      </div>

      {/* DEAL SECTION */}
      <div className="bg-white mt-2 px-3 py-4 shadow-sm">

        <div className="flex items-center justify-between gap-2">

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-base sm:text-lg font-bold text-gray-800">
                Deals of the Day
              </h2>

              <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">

                <FaClock className="text-xs" />

                <span>
                  {String(
                    timeLeft.minutes
                  ).padStart(2, "0")}
                  :
                  {String(
                    timeLeft.seconds
                  ).padStart(2, "0")}
                </span>

              </div>

            </div>

            <p className="text-xs text-gray-500 mt-1">
              Best offers ending soon
            </p>

          </div>

          {/* BUTTON */}
          <button className="h-9 px-4 bg-[#2874f0] text-white text-xs sm:text-sm font-semibold active:scale-95 transition-all">
            SALE LIVE
          </button>

        </div>

      </div>

      {/* BOTTOM BANNER */}
      <div className="mt-2">

        <img
          src="/bannersecdownn.webp"
          alt="banner"
          className="w-full object-cover"
        />

      </div>

    </div>
  );
}