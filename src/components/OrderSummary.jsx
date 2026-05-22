import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddressForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    colony: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE ADDRESS
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(formData)
    );

    alert("Address Saved Successfully");
  };

  return (
    <div className="w-full min-h-screen bg-[#f1f3f6] flex justify-center sm:p-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-md p-4 sm:p-5">
        {/* TOP STEPS */}
<div className="w-full flex items-center justify-between mb-5 border-b border-gray-200 pb-4">

  {/* ADDRESS */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-7 h-7 bg-[#2874f0] text-white text-xs font-bold flex items-center justify-center rounded-full">
      1
    </div>

    <p className="text-[11px] sm:text-xs font-semibold text-[#2874f0] mt-1">
      Address
    </p>
  </div>

  {/* LINE */}
  <div className="flex-1 h-[2px] bg-gray-300 mx-1"></div>

  {/* ORDER SUMMARY */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-7 h-7 bg-gray-300 text-black text-xs font-bold flex items-center justify-center rounded-full">
      2
    </div>

    <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
      Order Summary
    </p>
  </div>

  {/* LINE */}
  <div className="flex-1 h-[2px] bg-gray-300 mx-1"></div>

  {/* PAYMENT */}
  <div className="flex flex-col items-center flex-1">
    <div className="w-7 h-7 bg-gray-300 text-black text-xs font-bold flex items-center justify-center rounded-full">
      3
    </div>

    <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
      Payment
    </p>
  </div>

</div>

        {/* TITLE */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Delivery Address
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name (Required)*"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs sm:placeholder:text-sm outline-none focus:border-blue-500"
            required
          />

          {/* MOBILE */}
          <input
            type="number"
            name="mobile"
            placeholder="Mobile Number (Required)*"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs sm:placeholder:text-sm outline-none focus:border-blue-500"
            required
          />

          {/* PINCODE */}
          <input
            type="number"
            name="pincode"
            placeholder="Pincode (Required)*"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs sm:placeholder:text-sm outline-none focus:border-blue-500"
            required
          />

          {/* CITY + STATE */}
          <div className="flex gap-2 w-full">

            <input
              type="text"
              name="city"
              placeholder="City (Required)*"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 min-w-0 h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs outline-none focus:border-blue-500"
              required
            />

            <select
  name="state"
  value={formData.state}
  onChange={handleChange}
  className="w-1/2 min-w-0 h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm outline-none focus:border-blue-500 bg-white"
  required
>
  <option value="">Select State *</option>

  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>

  <option value="Andaman and Nicobar Islands">
    Andaman and Nicobar Islands
  </option>
  <option value="Chandigarh">Chandigarh</option>
  <option value="Dadra and Nagar Haveli and Daman and Diu">
    Dadra and Nagar Haveli and Daman and Diu
  </option>
  <option value="Delhi">Delhi</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
  <option value="Ladakh">Ladakh</option>
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Puducherry">Puducherry</option>
</select>

          </div>

          {/* HOUSE */}
          <input
            type="text"
            name="house"
            placeholder="House No / Building (Required)*"
            value={formData.house}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs sm:placeholder:text-sm outline-none focus:border-blue-500"
            required
          />

          {/* COLONY */}
          <input
            type="text"
            name="colony"
            placeholder="Road Name / Area / Colony (Required)*"
            value={formData.colony}
            onChange={handleChange}
            className="w-full h-11 border border-[rgba(0,0,0,.24)] px-3 text-sm placeholder:text-xs sm:placeholder:text-sm outline-none focus:border-blue-500"
            required
          />

          {/* BUTTON */}
         <button
  type="submit"
  onClick={() => navigate("/order-summary-details")}
  className="w-full h-11 bg-[#ffc200] text-black font-semibold text-sm active:scale-95 transition-all mt-2"
>
  Save Address
</button>

        </form>
      </div>
    </div>
  );
}