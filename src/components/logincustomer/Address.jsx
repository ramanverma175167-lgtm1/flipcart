import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

export default function AddressForm() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    colony: "",
  });

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // ================= LOGIN =================
  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [navigate]);

  // ================= FETCH =================
  const fetchAddresses = async () => {
    if (!user?.id) return;

    const res = await fetch(
      `https://flipcart-1-audl.onrender.com/api/address/${user.id}`
    );

    const data = await res.json();

    if (data.success) {
      setSavedAddresses(data.addresses);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ================= CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= EDIT =================
  const handleEdit = (addr) => {
    setEditId(addr._id);

    setFormData({
      name: addr.name || "",
      mobile: addr.mobile || "",
      pincode: addr.pincode || "",
      city: addr.city || "",
      state: addr.state || "",
      house: addr.house || "",
      colony: addr.colony || "",
    });

    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await fetch(
      `https://flipcart-1-audl.onrender.com/api/address/delete/${id}`,
      { method: "DELETE" }
    );

    setSavedAddresses((prev) =>
      prev.filter((a) => a._id !== id)
    );

    if (selectedAddress?._id === id) {
      setSelectedAddress(null);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `https://flipcart-1-audl.onrender.com/api/address/update/${editId}`
      : `https://flipcart-1-audl.onrender.com/api/address/add`;

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        ...formData,
      }),
    });

    setFormData({
      name: "",
      mobile: "",
      pincode: "",
      city: "",
      state: "",
      house: "",
      colony: "",
    });

    setEditId(null);
    setShowForm(false);
    fetchAddresses();
  };

  // ================= PROCEED =================
  const handleProceed = () => {
    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(selectedAddress)
    );

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-4">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FaMapMarkerAlt />
          Select Address
        </h2>

        <button
          onClick={() => {
            setEditId(null);
            setFormData({
              name: "",
              mobile: "",
              pincode: "",
              city: "",
              state: "",
              house: "",
              colony: "",
            });
            setShowForm(true);
          }}
          className="w-10 h-10 bg-[#2874f0] text-white rounded-full flex items-center justify-center shadow"
        >
          <FaPlus />
        </button>
      </div>

      {/* EMPTY STATE */}
      {savedAddresses.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl text-center shadow">
          <div className="text-5xl">📍</div>
          <h3 className="font-semibold mt-2">
            No address saved
          </h3>
          <p className="text-sm text-gray-500">
            Add delivery address to continue
          </p>
        </div>
      )}

      {/* ADDRESS LIST */}
      <div className="max-w-3xl mx-auto grid gap-3 mt-4">
        {savedAddresses.map((addr) => {
          const isSelected =
            selectedAddress?._id === addr._id;

          return (
            <div
              key={addr._id}
              onClick={() => setSelectedAddress(addr)}
              className={`bg-white p-4 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "hover:shadow"
              }`}
            >
              <div className="flex justify-between">

                {/* DETAILS */}
                <div>
                  <p className="font-bold">
                    {addr.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.mobile}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.house}, {addr.colony}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>

                {/* RADIO */}
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() => setSelectedAddress(addr)}
                  className="accent-blue-600"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(addr);
                  }}
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(addr._id);
                  }}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROCEED BUTTON */}
      {selectedAddress && (
        <div className="max-w-3xl mx-auto mt-6">
          <button
            onClick={handleProceed}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Deliver Here
          </button>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md p-5 rounded-xl"
          >
            <h2 className="font-bold mb-3">
              {editId ? "Update Address" : "Add Address"}
            </h2>

            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key}
                className="border w-full p-2 mb-2 rounded"
              />
            ))}

            <button className="bg-green-600 text-white w-full py-2 rounded mt-2">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}