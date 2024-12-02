import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";

function TransactionItem({ title, date, status }) {
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-start bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4 w-full">
      <div className="bg-blue-500 w-3 h-3 rounded-full mr-4 mt-2"></div>
      <div className="flex-grow">
        <h3 className="text-blue-500 font-semibold text-lg">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-600 mr-2 break-words">{status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <i className="fas fa-chevron-right text-blue-500 mt-7"></i>
      </div>
    </div>
  );
}

function Content() {
  const [tagihan, setTagihan] = useState([]); // Inisialisasi state dengan array kosong
  const [filter, setFilter] = useState("belum-bayar"); // Filter untuk status tagihan

  useEffect(() => {
    const fetchTagihan = async () => {
      try {
        const response = await axios.get("https://nusaira-be.vercel.app/api/tagihan"); // Ganti dengan URL API yang sesuai
        console.log("Response Data:", response.data);

        // Pastikan data yang diterima benar
        const formattedData = response.data.map((item) => ({
          ...item,
          status: item.status === 0 ? "Belum Bayar" : "Sudah Bayar", // Menyesuaikan status
        }));
        setTagihan(formattedData); // Menyimpan data tagihan ke state
      } catch (error) {
        console.error("Error fetching tagihan:", error);
      }
    };
    fetchTagihan();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  // Filter tagihan berdasarkan status
  const filteredTagihan = tagihan.filter((item) =>
    filter === "belum-bayar"
      ? item.status === "Belum Bayar"
      : item.status === "Sudah Bayar"
  );

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-1">Tagihan Terkini</h2>
        <p className="text-sm text-gray-500 mb-6">
          Cek status tagihan dan pembayaran Anda di sini.
        </p>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Daftar Tagihan</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Filter Status:</label>
              <select
                className="bg-blue-50 text-blue-500 border border-blue-300 rounded-md px-3 py-1"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Mengubah filter
              >
                <option value="belum-bayar">Belum Bayar</option>
                <option value="sudah-bayar">Sudah Bayar</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600">
              <i className="fas fa-th-large"></i>
            </button>
          </div>
        </div>

        <div className="bg-white border border-blue-200 rounded-lg p-6">
          <h4 className="text-blue-500 font-semibold mb-4">
            {filter === "belum-bayar" ? "Belum Dibayar" : "Sudah Dibayar"}
          </h4>

          {filteredTagihan.length > 0 ? (
            filteredTagihan.map((item) => (
              <TransactionItem
                key={item.id}
                title={item.name} 
                date={item.dueDate}
                status={item.status}
              />
            ))
          ) : (
            <p className="text-gray-500">Tidak ada transaksi ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Invoice() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Content />
        <AIFloatingButton />
        <Footer />
      </div>
    </div>
  );
}

export default Invoice;
