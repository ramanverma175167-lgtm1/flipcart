
import React, { useState } from "react";

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState("qr");

    return (
        <div className="min-h-screen bg-[#f1f3f6] p-2 sm:p-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* LEFT SECTION */}
                <div className="lg:col-span-2 flex flex-col gap-4">

                    {/* TOP STEPS */}
                    <div className="bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">

                            {/* ADDRESS */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                                    ✓
                                </div>

                                <p className="text-xs font-semibold text-green-600 mt-1">
                                    Address
                                </p>
                            </div>

                            <div className="flex-1 h-[2px] bg-green-500 mx-1"></div>

                            {/* ORDER SUMMARY */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                                    ✓
                                </div>

                                <p className="text-xs font-semibold text-green-600 mt-1">
                                    Order Summary
                                </p>
                            </div>

                            <div className="flex-1 h-[2px] bg-green-500 mx-1"></div>

                            {/* PAYMENT */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-8 h-8 rounded-full bg-[#2874f0] text-white text-sm font-bold flex items-center justify-center">
                                    3
                                </div>

                                <p className="text-xs font-semibold text-[#2874f0] mt-1">
                                    Payment
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT METHODS */}
                    <div className="bg-white shadow-sm overflow-hidden">

                        {/* QR OPTION */}
                        <div
                            onClick={() => setSelectedMethod("qr")}
                            className={`border-b cursor-pointer transition-all ${selectedMethod === "qr"
                                    ? "border-l-4 border-l-[#2874f0] bg-blue-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        Pay Using QR Code
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Scan QR with any UPI App
                                    </p>
                                </div>

                                <input
                                    type="radio"
                                    checked={selectedMethod === "qr"}
                                    readOnly
                                />
                            </div>

                            {selectedMethod === "qr" && (
                                <div className="px-4 pb-5 flex flex-col items-center">
                                    <div className="w-52 h-52 border border-gray-200 p-2 bg-white">
                                        <img
                                            src="/qrcode.avif"
                                            alt="QR Code"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <p className="text-xs text-gray-600 mt-3 text-center leading-5">
                                        Open any UPI app like PhonePe, Google Pay,
                                        Paytm or BHIM and scan this QR code.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* BANK OPTION */}
                        <div
                            onClick={() => setSelectedMethod("bank")}
                            className={`cursor-pointer transition-all ${selectedMethod === "bank"
                                    ? "border-l-4 border-l-[#2874f0] bg-blue-50"
                                    : ""
                                }`}
                        >
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        Bank Account Transfer
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Transfer amount directly to bank account
                                    </p>
                                </div>

                                <input
                                    type="radio"
                                    checked={selectedMethod === "bank"}
                                    readOnly
                                />
                            </div>

                            {selectedMethod === "bank" && (
                                <div className="px-4 pb-5">
                                    <div className="border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-3">

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-500">
                                                Bank Name
                                            </span>

                                            <span className="text-right font-semibold">
                                                State Bank of India
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-500">
                                                Account Holder
                                            </span>

                                            <span className="text-right font-semibold">
                                                Mukesh Singh
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-500">
                                                Account Number
                                            </span>

                                            <span className="text-right font-semibold">
                                                123456789012
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-500">
                                                IFSC Code
                                            </span>

                                            <span className="text-right font-semibold">
                                                SBIN0001234
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-gray-500">
                                                Branch
                                            </span>

                                            <span className="text-right font-semibold">
                                                New Delhi Main Branch
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div>
                    <div className="bg-white shadow-sm p-4 sticky top-3">

                        <h2 className="text-sm font-bold text-gray-500 border-b border-gray-200 pb-3 uppercase">
                            Payment Details
                        </h2>

                        <div className="flex items-center justify-between mt-4 text-sm">
                            <span>Product Price</span>
                            <span>₹52,000</span>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-sm">
                            <span>Discount</span>
                            <span className="text-green-600">- ₹10,000</span>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-sm">
                            <span>Delivery Charges</span>
                            <span className="text-green-600">FREE</span>
                        </div>

                        <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex items-center justify-between font-bold text-base">
                            <span>Total Payable</span>
                            <span>₹42,000</span>
                        </div>

                        <button className="w-full h-11 bg-[#fb641b] text-white font-semibold mt-5 active:scale-[0.98] transition-all">
                            Confirm Payment
                        </button>

                        <p className="text-[11px] text-gray-500 text-center mt-3 leading-5">
                            Your payment information is secure and encrypted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
