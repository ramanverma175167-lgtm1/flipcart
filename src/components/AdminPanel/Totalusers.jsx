// TotalUsers.jsx

import {
  FaSearch,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function TotalUsers() {

  // DUMMY USERS
  const users = [
    {
      id: 1,
      name: "Mukesh Singh",
      email: "mukesh@gmail.com",
      mobile: "9876543210",
      city: "Delhi",
      orders: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      mobile: "9123456780",
      city: "Mumbai",
      orders: 2,
      status: "Blocked",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman@gmail.com",
      mobile: "9988776655",
      city: "Lucknow",
      orders: 8,
      status: "Active",
    },
    {
      id: 4,
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      mobile: "9871203456",
      city: "Noida",
      orders: 1,
      status: "Pending",
    },
  ];

  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Total Users
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all registered users
          </p>
        </div>

        {/* SEARCH */}
        <div className="w-full md:w-[320px] h-11 border border-gray-300 bg-white flex items-center px-3">

          <FaSearch className="text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search users..."
            className="w-full h-full px-3 text-sm outline-none"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow-sm mt-5 overflow-x-auto">

        <table className="w-full min-w-[900px] border-collapse">

          <thead>

            <tr className="bg-[#f1f3f6] text-left">

              <th className="p-4 text-sm font-semibold">
                ID
              </th>

              <th className="p-4 text-sm font-semibold">
                Name
              </th>

              <th className="p-4 text-sm font-semibold">
                Email
              </th>

              <th className="p-4 text-sm font-semibold">
                Mobile
              </th>

              <th className="p-4 text-sm font-semibold">
                City
              </th>

              <th className="p-4 text-sm font-semibold">
                Orders
              </th>

              <th className="p-4 text-sm font-semibold">
                Status
              </th>

              <th className="p-4 text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 text-sm">
                  #{user.id}
                </td>

                <td className="p-4 text-sm font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="p-4 text-sm">
                  {user.email}
                </td>

                <td className="p-4 text-sm">
                  {user.mobile}
                </td>

                <td className="p-4 text-sm">
                  {user.city}
                </td>

                <td className="p-4 text-sm">
                  {user.orders}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 text-xs font-semibold
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <button className="w-9 h-9 bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-all">
                      <FaEye />
                    </button>

                    <button className="w-9 h-9 bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-all">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}