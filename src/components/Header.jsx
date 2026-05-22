import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaClock,
  FaSearch,
} from "react-icons/fa";

export default function HomePage() {
  // TIMER
  const [timeLeft, setTimeLeft] = useState({
    minutes: 30,
    seconds: 0,
  });

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

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#2874f0] shadow-md">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between px-3 py-2">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MENU */}
            <button className="text-white">
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
          <div className="relative cursor-pointer">
            <FaShoppingCart
              size={22}
              className="text-white"
            />

            <span className="absolute -top-2 -right-2 bg-[#ffc200] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
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
                  {String(timeLeft.minutes).padStart(2, "0")}
                  :
                  {String(timeLeft.seconds).padStart(2, "0")}
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