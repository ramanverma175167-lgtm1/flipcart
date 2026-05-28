import React, { useEffect, useState } from "react";

export default function AddressForm() {
  const storedUser = localStorage.getItem("loggedInUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    colony: "",
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setMessage("");
  };

  // ================= FETCH =================
  const fetchAddresses = async () => {
    if (!user?.id) return;

    try {
      setFetching(true);

      const res = await fetch(
        `http://localhost:5000/api/address/${user.id}`
      );

      const data = await res.json();

      if (data.success) {
        setSavedAddresses(data.addresses);
      }
    } catch (err) {
      setMessage("Failed to load addresses");
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name required";
    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";
    if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode";
    if (!formData.city) newErrors.city = "City required";
    if (!formData.state) newErrors.state = "State required";
    if (!formData.house) newErrors.house = "House required";
    if (!formData.colony) newErrors.colony = "Area required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const url = editId
        ? `http://localhost:5000/api/address/update/${editId}`
        : "http://localhost:5000/api/address/add";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setMessage("Failed to save address");
        return;
      }

      setMessage("Address saved successfully ✔");

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
    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  // ================= EDIT =================
  const handleEdit = (addr) => {
    setFormData(addr);
    setEditId(addr._id);
    setShowForm(true);
    setErrors({});
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/address/delete/${deleteId}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        setSavedAddresses((prev) =>
          prev.filter((a) => a._id !== deleteId)
        );

        if (selectedAddress?._id === deleteId) {
          setSelectedAddress(null);
        }

        setMessage("Address deleted successfully ✔");
      }

      setDeleteId(null);
    } catch (err) {
      setMessage("Delete failed");
    }
  };

  // ================= PROCEED =================
  const handleProceed = () => {
    if (!selectedAddress) {
      setMessage("Please select an address");
      return;
    }

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(selectedAddress)
    );

    window.location.href = "/gateway";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Delivery Address</h2>

          <button
            onClick={() => setShowForm(true)}
            className="w-11 h-11 bg-blue-600 text-white rounded-full text-2xl"
          >
            +
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 p-3 bg-white border text-sm rounded">
            {message}
          </div>
        )}

        {/* ADDRESS LIST */}
        <div className="grid md:grid-cols-2 gap-4">
          {savedAddresses.map((addr) => {
            const isSelected = selectedAddress?._id === addr._id;

            return (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-4 border rounded cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 border-blue-600"
                    : "bg-white"
                }`}
              >
                <p className="font-bold">{addr.name}</p>
                <p className="text-sm">{addr.mobile}</p>
                <p className="text-sm">
                  {addr.house}, {addr.colony}
                </p>
                <p className="text-sm">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>

                <div className="flex gap-3 mt-2 text-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(addr);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(addr._id);
                    }}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROCEED */}
        {selectedAddress && (
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Proceed with Selected Address
          </button>
        )}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-5 rounded-xl">

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">

              <input name="name" placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.name}</p>

              <input name="mobile" placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.mobile}</p>

              <input name="pincode" placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.pincode}</p>

              <input name="city" placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.city}</p>

              {/* ✅ STATE DROPDOWN RESTORED */}
              <select
  name="state"
  value={formData.state}
  onChange={handleChange}
  className="border p-2"
>
  <option value="">Select State / UT</option>

  {/* STATES */}
  <option>Andhra Pradesh</option>
  <option>Arunachal Pradesh</option>
  <option>Assam</option>
  <option>Bihar</option>
  <option>Chhattisgarh</option>
  <option>Goa</option>
  <option>Gujarat</option>
  <option>Haryana</option>
  <option>Himachal Pradesh</option>
  <option>Jharkhand</option>
  <option>Karnataka</option>
  <option>Kerala</option>
  <option>Madhya Pradesh</option>
  <option>Maharashtra</option>
  <option>Manipur</option>
  <option>Meghalaya</option>
  <option>Mizoram</option>
  <option>Nagaland</option>
  <option>Odisha</option>
  <option>Punjab</option>
  <option>Rajasthan</option>
  <option>Sikkim</option>
  <option>Tamil Nadu</option>
  <option>Telangana</option>
  <option>Tripura</option>
  <option>Uttar Pradesh</option>
  <option>Uttarakhand</option>
  <option>West Bengal</option>

  {/* UNION TERRITORIES */}
  <option>Andaman and Nicobar Islands</option>
  <option>Chandigarh</option>
  <option>Dadra and Nagar Haveli and Daman and Diu</option>
  <option>Delhi</option>
  <option>Jammu and Kashmir</option>
  <option>Ladakh</option>
  <option>Lakshadweep</option>
  <option>Puducherry</option>
</select>
              <p className="text-red-500 text-xs">{errors.state}</p>

              <input name="house" placeholder="House"
                value={formData.house}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.house}</p>

              <input name="colony" placeholder="Area"
                value={formData.colony}
                onChange={handleChange}
                className="border p-2" />
              <p className="text-red-500 text-xs">{errors.colony}</p>

              <button className="bg-blue-600 text-white py-2 mt-2">
                {loading ? "Saving..." : "Save"}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded text-center">

            <p>Delete this address?</p>

            <div className="flex gap-3 justify-center mt-4">
              <button onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button onClick={handleDelete} className="text-red-600">
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}