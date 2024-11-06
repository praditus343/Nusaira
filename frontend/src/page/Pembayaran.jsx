import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import { FaQrcode, FaCreditCard, FaWallet, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("qr");
  const [isLoading, setIsLoading] = useState(false);

  // Payment Data
  const paymentData = {
    invoiceNumber: "J715SSQR09",
    dueDate: "28 OKTOBER 2024 20:33 WIB",
    amount: 450000,
    tax: 2500,
    total: 452500,
    description: "Langganan Premium 6 Bulan",
  };

  // Payment Methods
  const paymentMethods = [
    { id: "qr", name: "QR Code", icon: <FaQrcode /> },
    { id: "ewallet", name: "E-Wallet", icon: <FaWallet /> },
    { id: "card", name: "Kartu Kredit/Debit", icon: <FaCreditCard /> },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle payment
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate payment process

      Swal.fire({
        title: "Pembayaran Berhasil!",
        text: "Terima kasih atas pembayaran Anda",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      Swal.fire({
        title: "Pembayaran Gagal",
        text: "Terjadi kesalahan dalam proses pembayaran",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    Swal.fire({
      title: "Batalkan Pembayaran?",
      text: "Anda yakin ingin membatalkan proses pembayaran?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Batalkan",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Payment Header */}
            <div className="bg-blue-500 text-white p-6">
              <h1 className="text-2xl font-bold">Pembayaran</h1>
              <p className="mt-2">Invoice: #{paymentData.invoiceNumber}</p>
            </div>

            {/* Payment Timer */}
            <div className="bg-yellow-50 p-4 border-b">
              <div className="flex items-center justify-between text-gray-700">
                <span>Batas Waktu Pembayaran:</span>
                <span className="font-medium">{paymentData.dueDate}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold mb-4">Pilih Metode Pembayaran</h2>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all
                      ${selectedMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
                    onClick={() => setSelectedMethod(method.id)}
                    aria-label={`Pilih metode pembayaran ${method.name}`}
                  >
                    <div className="text-2xl mb-2 text-blue-500">{method.icon}</div>
                    <span className="text-sm font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Payment Method Details */}
            <div className="p-6 border-b">
              {selectedMethod === "qr" && (
                <div className="flex justify-center">
                  <img src="/qr-code.png" alt="QR Code" className="h-48 w-48" />
                </div>
              )}
              {selectedMethod === "ewallet" && (
                <div className="flex justify-center space-x-4">
                  {/* Add e-wallet provider logos here */}
                </div>
              )}
              {selectedMethod === "card" && (
                <div className="max-w-md mx-auto">
                  {/* Add credit card form here */}
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Ringkasan Pembayaran</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{paymentData.description}</span>
                  <span>{formatCurrency(paymentData.amount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>PPN</span>
                  <span>{formatCurrency(paymentData.tax)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Pembayaran</span>
                  <span className="text-blue-600">{formatCurrency(paymentData.total)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800"
                  aria-label="Kembali ke halaman sebelumnya"
                >
                  <FaArrowLeft className="mr-2" />
                  Kembali
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-lg text-white font-medium transition-all
                    ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                  aria-label="Lakukan pembayaran"
                >
                  {isLoading ? "Memproses..." : "Bayar Sekarang"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
