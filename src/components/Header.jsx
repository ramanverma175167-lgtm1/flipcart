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

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    minutes: 30,
    seconds: 0,
  });

  // ✅ SEARCH STATE ADDED
  const [search, setSearch] = useState("");

  const loadCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const validCart = cart.filter((item) => item && item._id);

    localStorage.setItem("cart", JSON.stringify(validCart));

    const totalQty = validCart.reduce(
      (total, item) => total + Number(item.qty || 1),
      0
    );

    setCartCount(totalQty);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
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

  useEffect(() => {
    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  // ✅ GO TO SEARCH PAGE
  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6] overflow-x-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#2874f0] shadow-md">

        <div className="flex items-center justify-between px-3 py-2">

          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)}>
              <svg fill="#FFF" height="24" width="24" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>

            <img src="/logo.webp" className="h-7" />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-white" size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* SEARCH BAR + GO BUTTON */}
        <div className="px-3 pb-3 flex gap-2">

          <div className="flex items-center w-full h-11 bg-white px-3 rounded-md">
            <FaSearch className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for Products..."
              className="w-full h-full px-3 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
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

      {/* YOUR EXISTING CONTENT (UNCHANGED) */}
      <div className="mt-1">
        <img src="/bannertop.jpg" className="w-full" />
      </div>

      <div className="mt-2">
        <img src="/bannerdown.webp" className="w-full" />
      </div>

      <div className="bg-white mt-2 px-3 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Deals of the Day</h2>

          <div className="text-red-600 text-sm font-semibold flex items-center gap-1">
            <FaClock />
            {timeLeft.minutes}:{timeLeft.seconds}
          </div>

          <button className="bg-blue-600 text-white px-3 py-1 text-xs">
            SALE LIVE
          </button>
        </div>
      </div>

      <div className="mt-2">
        <img src="/bannersecdownn.webp" className="w-full" />
      </div>

    </div>
  );
}