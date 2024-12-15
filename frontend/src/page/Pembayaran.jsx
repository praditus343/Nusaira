import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";

const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 max-w-4xl mx-auto p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-yellow-100 text-yellow-800 p-6 text-center">
              <h1 className="text-2xl font-bold">Mode Trial Sedang Tidak Tersedia</h1>
              <p className="mt-2">Silakan coba lagi dalam beberapa hari kedepan.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
