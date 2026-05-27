import React from "react";
import {
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();

  // DEMO USER
  const user = {
    name: "Mukesh Singh",
    mobile: "+91 9876543210",
  };

  const menuItems = [
    {
      title: "My Orders",
      icon: <FaBoxOpen />,
      path: "/orders",
    },
    {
      title: "Order History",
      icon: <FaBoxOpen />,
      path: "/order-history",
    },
    {
      title: "Saved Address",
      icon: <FaMapMarkerAlt />,
      path: "/address",
    },
    {
      title: "Edit Profile",
      icon: <FaEdit />,
      path: "/edit-profile",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6]">

      {/* HEADER */}
      <div className="bg-[#2874f0] px-4 py-4 text-white shadow-md">

        <h2 className="text-lg font-semibold">
          My Account
        </h2>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm">

        {/* PROFILE IMAGE */}
        <div className="w-16 h-16 bg-[#2874f0] text-white flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>

        {/* USER INFO */}
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {user.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {user.mobile}
          </p>
        </div>

      </div>

      {/* MENU */}
      <div className="mt-3 bg-white">

        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 active:bg-gray-50"
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              <span className="text-[#2874f0] text-lg">
                {item.icon}
              </span>

              <span className="text-sm font-medium text-gray-700">
                {item.title}
              </span>

            </div>

            {/* RIGHT */}
            <FaChevronRight className="text-gray-400 text-sm" />

          </button>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="mt-4 bg-white">

        <button
          className="w-full flex items-center gap-3 px-4 py-4 text-red-600 active:bg-red-50"
        >
          <FaSignOutAlt />

          <span className="text-sm font-semibold">
            Logout
          </span>
        </button>

      </div>

    </div>
  );
}