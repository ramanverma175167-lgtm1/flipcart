// PurchasedItems.jsx

import {
  FaShoppingBag,
  FaEye,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";

export default function PurchasedItems() {

  const orders = [
    {
      id: "#ORD1001",
      customer: "Mukesh Singh",
      product: "iPhone 15 Pro Max",
      amount: "₹42,000",
      payment: "Paid",
      status: "Delivered",
      date: "26 May 2026",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=600",
    },

    {
      id: "#ORD1002",
      customer: "Rahul Kumar",
      product: "Samsung S24 Ultra",
      amount: "₹68,999",
      payment: "Paid",
      status: "Shipping",
      date: "25 May 2026",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600",
    },

    {
      id: "#ORD1003",
      customer: "Aman Verma",
      product: "MacBook Air M3",
      amount: "₹92,500",
      payment: "Pending",
      status: "Pending",
      date: "24 May 2026",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=600",
    },

    {
      id: "#ORD1004",
      customer: "Rohit Sharma",
      product: "AirPods Pro",
      amount: "₹18,999",
      payment: "Paid",
      status: "Cancelled",
      date: "23 May 2026",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=600",
    },
  ];

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="bg-white shadow-sm rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Purchased Items
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all purchased products & customer orders
          </p>

        </div>

        <button className="h-11 px-5 bg-[#2874f0] text-white rounded-lg font-medium">
          Download Report
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

        {/* TOTAL */}
        <div className="bg-white shadow-sm rounded-xl p-5 border-l-4 border-blue-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                1,240
              </h2>

            </div>

            <FaShoppingBag className="text-4xl text-blue-500" />

          </div>

        </div>

        {/* DELIVERED */}
        <div className="bg-white shadow-sm rounded-xl p-5 border-l-4 border-green-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Delivered
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                980
              </h2>

            </div>

            <FaCheckCircle className="text-4xl text-green-500" />

          </div>

        </div>

        {/* SHIPPING */}
        <div className="bg-white shadow-sm rounded-xl p-5 border-l-4 border-yellow-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Shipping
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                190
              </h2>

            </div>

            <FaTruck className="text-4xl text-yellow-500" />

          </div>

        </div>

        {/* CANCELLED */}
        <div className="bg-white shadow-sm rounded-xl p-5 border-l-4 border-red-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Cancelled
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                70
              </h2>

            </div>

            <FaTimesCircle className="text-4xl text-red-500" />

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow-sm rounded-xl mt-6 overflow-hidden">

        {/* TOP */}
        <div className="p-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Recent Purchased Products
          </h2>

          <input
            type="text"
            placeholder="Search orders..."
            className="w-full md:w-[300px] h-11 border border-gray-300 rounded-lg px-4 outline-none"
          />

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-[#f5f7fb]">

              <tr>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Product
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Order ID
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Customer
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Payment
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all"
                >

                  {/* PRODUCT */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />

                      <div>

                        <h3 className="text-sm font-semibold text-gray-800">
                          {item.product}
                        </h3>

                        <p className="text-xs text-gray-500">
                          Electronics
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ORDER ID */}
                  <td className="p-4 text-sm font-medium text-gray-700">
                    {item.id}
                  </td>

                  {/* CUSTOMER */}
                  <td className="p-4 text-sm text-gray-700">
                    {item.customer}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-4 text-sm font-semibold text-gray-800">
                    {item.amount}
                  </td>

                  {/* PAYMENT */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.payment === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.payment}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Shipping"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* DATE */}
                  <td className="p-4 text-sm text-gray-600">
                    {item.date}
                  </td>

                  {/* ACTION */}
                  <td className="p-4">

                    <button className="h-9 px-4 bg-[#2874f0] text-white rounded-lg text-sm flex items-center gap-2">

                      <FaEye />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}