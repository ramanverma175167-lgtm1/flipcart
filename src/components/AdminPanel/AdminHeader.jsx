// AdminHeader.jsx

import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaShoppingBag,
  FaBoxOpen,
  FaPlusSquare,
  FaClipboardList,
} from "react-icons/fa";

export default function AdminHeader() {
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6]">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 w-[240px] h-screen bg-[#2874f0] text-white flex flex-col z-50 overflow-y-auto">

        {/* LOGO */}
        <div className="h-16 flex items-center px-5 border-b border-white/20 shrink-0">
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>
        </div>

        {/* MENU */}
        <div className="flex flex-col py-3">

          {/* DASHBOARD */}
          <Link
            to="/admin"
            className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-all"
          >
            <FaTachometerAlt />

            <span className="text-sm font-medium">
              Dashboard
            </span>
          </Link>

          {/* USERS */}
          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-all"
          >
            <FaUsers />

            <span className="text-sm font-medium">
              Total Users
            </span>
          </Link>

          {/* PURCHASED ITEMS */}
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-all"
          >
            <FaShoppingBag />

            <span className="text-sm font-medium">
              Purchased Items
            </span>
          </Link>

          {/* PRODUCTS */}
          <Link
            to="/admin/product-view"
            className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-all"
          >
            <FaBoxOpen />

            <span className="text-sm font-medium">
              Products
            </span>
          </Link>

          {/* ADD PRODUCT */}
          <Link
            to="/admin/add-product"
            className="flex items-center gap-3 px-5 py-4 hover:bg-white/10 transition-all"
          >
            <FaPlusSquare />

            <span className="text-sm font-medium">
              Add Product
            </span>
          </Link>

         

        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-4">

          <button
            onClick={handleLogout}
            className="w-full h-11 bg-red-500 text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-[240px] min-h-screen">

        {/* TOP HEADER */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-40">

          <h2 className="text-lg font-semibold text-gray-800">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">

            {/* NOTIFICATION */}
            <button className="relative">
              <FaBell className="text-gray-600 text-lg" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* ADMIN */}
            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold">
                A
              </div>

              <span className="text-sm font-medium text-gray-700">
                Admin
              </span>

            </div>

          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-5">
          <Outlet />
        </div>

      </div>
    </div>
  );
}