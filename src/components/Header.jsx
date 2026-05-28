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
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    minutes: 30,
    seconds: 0,
  });

  const [search, setSearch] = useState("");

  // =========================
  // LOGGED USER
  // =========================
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // =========================
  // LOAD CART COUNT
  // =========================
// =========================
// LOAD CART COUNT
// =========================
const loadCartCount = () => {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  // FIXED HERE
  const validCart = cart.filter(
    (item) => item && item.productId
  );

  localStorage.setItem(
    "cart",
    JSON.stringify(validCart)
  );

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
  // CART UPDATE
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

  // =========================
  // SEARCH
  // =========================
  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(
      `/search?q=${encodeURIComponent(search)}`
    );
  };

  // =========================
  // LOGOUT
  // =========================
const handleLogout = () => {

  // REMOVE LOGIN DATA
  localStorage.removeItem("token");

  localStorage.removeItem(
    "loggedInUser"
  );

  // CLOSE MENU
  setMenuOpen(false);

  // FORCE REDIRECT + CLEAR HISTORY
  window.location.replace("/login");
};

  return (
    <div className="w-full bg-[#f1f3f6] overflow-x-hidden">

      {/* ================= SIDEBAR OVERLAY ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 shadow-xl ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="bg-[#2874f0] p-4 flex justify-between items-center">

          <div className="flex items-center gap-2 text-white">

            <FaUserCircle size={30} />

            <div>

              <p className="text-sm font-semibold">

                {loggedInUser
                  ? `Hello, ${loggedInUser.name}`
                  : "Hello Guest"}

              </p>

              <p className="text-xs">

                {loggedInUser
                  ? "Welcome back"
                  : "Please login"}

              </p>

            </div>

          </div>

          <FaTimes
            className="text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />

        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col p-3 text-sm">

          {/* HOME */}
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaHome />
            Home
          </button>

          {/* CART */}
          <button
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaShoppingCart />
            My Cart
          </button>

          {/* ORDERS */}
          <button
            onClick={() => {
              navigate("/orders");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaBoxOpen />
            My Orders
          </button>

          {/* LOGIN */}
          {!loggedInUser && (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 py-3 border-b"
            >
              <FaUserCircle />
              Login / Signup
            </button>
          )}

          {/* ABOUT */}
          <button
            className="flex items-center gap-3 py-3 border-b"
          >
            <FaInfoCircle />
            About Us
          </button>

          {/* LOGOUT */}
          {loggedInUser && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-3 text-red-600 font-semibold"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 bg-[#2874f0] shadow-md">
        {/* USER STATUS */}


        <div className="flex items-center justify-between px-3 py-2">

          {/* MENU BUTTON */}
          <button onClick={() => setMenuOpen(true)}>

            <svg
              fill="#FFF"
              height="24"
              width="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>

          </button>

          {/* LOGO */}
          <img
            src="/logo.webp"
            alt="logo"
            className="h-7 object-contain"
          />

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >

            <FaShoppingCart
              className="text-white"
              size={22}
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}

          </div>

        </div>

        {/* SEARCH */}
        <div className="px-3 pb-3 flex gap-2">

          <div className="flex items-center w-full h-11 bg-white px-3 rounded-md">

            <FaSearch className="text-gray-400" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              type="text"
              placeholder="Search for Products..."
              className="w-full h-full px-3 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

          </div>

          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 rounded-md text-sm font-semibold"
          >
            Go
          </button>

        </div>

      </header>

      {/* ================= BANNERS ================= */}
      <div className="mt-1">

        <img
          src="/bannertop.jpg"
          alt="banner"
          className="w-full"
        />

      </div>

      <div className="mt-2">

        <img
          src="/sliderflip.jpg"
          alt="banner"
          className="w-full"
        />

      </div>

      {/* ================= DEALS ================= */}
      <div className="bg-white mt-2 px-3 py-4 shadow-sm">

        <div className="flex justify-between items-center">

          <h2 className="font-bold text-sm sm:text-base">
            Deals of the Day
          </h2>

          <div className="text-red-600 text-sm font-semibold flex items-center gap-1">

            <FaClock />

            {String(timeLeft.minutes).padStart(
              2,
              "0"
            )}
            :
            {String(timeLeft.seconds).padStart(
              2,
              "0"
            )}

          </div>

          <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded">

            SALE LIVE

          </button>

        </div>

      </div>

      {/* ================= BOTTOM BANNER ================= */}
      <div className="mt-2">

        <img
          src="/bannersecdownn.webp"
          alt="banner"
          className="w-full"
        />

      </div>

    </div>
  );
}