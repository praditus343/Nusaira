import React from 'react';
import { useNavigate } from 'react-router-dom';
import imgPayment from "../assets/img/pembayaran/pmy3.png"

const SuccessfulPayment = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/Home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      <div className="text-center">
        <img src={imgPayment} alt="Successful Payment" className="w-96 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil</h2>
        <p className="text-gray-600">Anda sudah berlangganan Premium 6 Bulan</p>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="border-2 border-green-600 hover:bg-green-300 text-gray-700 px-20 py-2 rounded-md text-green-600"
          onClick={() => handleGoHome()}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default SuccessfulPayment;