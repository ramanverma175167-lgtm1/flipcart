import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= LOGIN CHECK =================
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    const parsed = JSON.parse(storedUser);
    setUser(parsed);
  }, [navigate]);

  // ================= FETCH ADDRESSES FROM DB =================
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user?.id) return;

        const res = await fetch(
          `https://flipcart-1-audl.onrender.com/api/address/${user.id}`
        );

        const data = await res.json();

        if (data.success) {
          setAddresses(data.addresses);
        }
      } catch (error) {
        console.log("ADDRESS FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // ================= SELECT ADDRESS =================
  const handleSelect = (addr) => {
    setSelectedAddress(addr);
  };

  // ================= ADD ADDRESS =================
  const handleAddAddress = () => {
    navigate("/address");
  };

  // ================= PROCEED =================
  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(selectedAddress)
    );

    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-5">

        <h2 className="text-lg font-bold mb-4">
          Select Delivery Address
        </h2>

        {/* ADDRESS LIST */}
        <div className="space-y-3">

          {addresses.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No address found. Please add one.
            </p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => handleSelect(addr)}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedAddress?._id === addr._id
                    ? "border-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                <p className="font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-600">
                  {addr.house}, {addr.colony}
                </p>
                <p className="text-sm text-gray-600">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  📞 {addr.mobile}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ADD ADDRESS */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleAddAddress}
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
          >
            <FaPlus />
          </button>
        </div>

        {/* PROCEED */}
        <button
          onClick={handleProceed}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded font-semibold"
        >
          Proceed to Payment
        </button>

      </div>
    </div>
  );
}