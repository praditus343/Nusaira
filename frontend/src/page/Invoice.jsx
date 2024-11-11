import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import React from "react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";

function TransactionItem({ title, date, status }) {
  return (
    <div className="flex items-start bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4 w-full">
      <div className="bg-blue-500 w-3 h-3 rounded-full mr-4 mt-2"></div>
      <div className="flex-grow">
        <h3 className="text-blue-500 font-semibold text-lg">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-600 mr-2 break-words">{status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <i className="fas fa-chevron-right text-blue-500 mt-7"></i>{" "}
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-1">
          Mengenal Penyakit dan Tantangan dalam Budidaya Lele
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Pelajari Cara Mengatasi Penyakit dan Tantangan Budidaya Lele dengan
          Solusi Tepat! Dapatkan Tips Praktis untuk Meningkatkan Kualitas dan
          Produktivitas Tambak Anda
        </p>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Daftar Transaksi</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Tagihan:</label>
              <select className="bg-blue-50 text-blue-500 border border-blue-300 rounded-md px-3 py-1">
                <option value="belum-bayar">Belum Bayar</option>
                <option value="sudah-bayar">Sudah Bayar</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600">
              + Kolam
            </button>
            <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600">
              <i className="fas fa-cog"></i>
            </button>
            <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600">
              <i className="fas fa-th-large"></i>
            </button>
          </div>
        </div>

        <div className="bg-white border border-blue-200 rounded-lg p-6">
          <h4 className="text-blue-500 font-semibold mb-4">Belum dibayar</h4>

          <TransactionItem
            title="Premium 6 bulan"
            date="10 Oktober 2024"
            status="Kamu Belum Menyelesaikan Pembayaran Akses Premium, Segera Selesaikan agar dapat mengakses semua fitur kami"
          />
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
