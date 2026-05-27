import {
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

export default function AdminPanel() {
  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="bg-white shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Admin
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage orders, users and system settings
          </p>
        </div>

        <button className="h-10 px-5 bg-[#2874f0] text-white text-sm font-semibold w-fit">
          View Reports
        </button>

      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

        {/* TOTAL ORDERS */}
        <div className="bg-white p-5 shadow-sm border-l-4 border-blue-500">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                248
              </h2>
            </div>

            <FaShoppingBag className="text-3xl text-blue-500" />

          </div>

        </div>

        {/* PENDING ORDERS */}
        <div className="bg-white p-5 shadow-sm border-l-4 border-yellow-500">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                42
              </h2>
            </div>

            <FaClock className="text-3xl text-yellow-500" />

          </div>

        </div>

        {/* COMPLETED ORDERS */}
        <div className="bg-white p-5 shadow-sm border-l-4 border-green-500">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Completed Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                186
              </h2>
            </div>

            <FaCheckCircle className="text-3xl text-green-500" />

          </div>

        </div>

        {/* TOTAL USERS */}
        <div className="bg-white p-5 shadow-sm border-l-4 border-red-500">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                520
              </h2>
            </div>

            <FaUsers className="text-3xl text-red-500" />

          </div>

        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white shadow-sm mt-6 p-5 overflow-x-auto">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h2>

          <button className="text-sm text-[#2874f0] font-medium">
            View All
          </button>

        </div>

        <table className="w-full min-w-[700px] border-collapse">

          <thead>

            <tr className="bg-[#f1f3f6] text-left">

              <th className="p-3 text-sm font-semibold">
                Order ID
              </th>

              <th className="p-3 text-sm font-semibold">
                Customer
              </th>

              <th className="p-3 text-sm font-semibold">
                Amount
              </th>

              <th className="p-3 text-sm font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-3 text-sm">
                #ORD1025
              </td>

              <td className="p-3 text-sm">
                Mukesh Singh
              </td>

              <td className="p-3 text-sm">
                ₹42,000
              </td>

              <td className="p-3">

                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  Pending
                </span>

              </td>

            </tr>

            <tr className="border-b">

              <td className="p-3 text-sm">
                #ORD1026
              </td>

              <td className="p-3 text-sm">
                Rahul Kumar
              </td>

              <td className="p-3 text-sm">
                ₹18,999
              </td>

              <td className="p-3">

                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold">
                  Completed
                </span>

              </td>

            </tr>

            <tr>

              <td className="p-3 text-sm">
                #ORD1027
              </td>

              <td className="p-3 text-sm">
                Aman Verma
              </td>

              <td className="p-3 text-sm">
                ₹12,499
              </td>

              <td className="p-3">

                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold">
                  Cancelled
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}