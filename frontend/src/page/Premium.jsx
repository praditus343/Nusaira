import Footer from "../componen/Footer";
import React from "react";
import Header from "../componen/Header";
import { useNavigate } from "react-router-dom"; 
import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/SideBar";

function SubscriptionCard({ title, price, discount, duration, originalPrice, paymentLink }) {
  const navigate = useNavigate(); 

  const handleSubscriptionClick = () => {
    window.location.href = paymentLink; 
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-500 p-6 rounded-lg text-center flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-center items-center mb-2">
          {discount && (
            <div className="text-sm bg-blue-100 text-blue-500 py-1 px-3 rounded-full inline-block mr-2">
              Diskon {discount}%
            </div>
          )}
          {originalPrice && (
            <p className="text-gray-500 line-through text-sm">{originalPrice}</p>
          )}
        </div>
        <p className="text-4xl font-bold text-blue-500 mb-4">{price}</p>
        <p className="text-sm text-gray-500 mb-6">{duration}</p>
      </div>
      <button
        onClick={handleSubscriptionClick} 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-blue-600 mt-4"
      >
        Berlangganan Sekarang
      </button>
    </div>
  );
}

function FreeTrialCard() {
  const navigate = useNavigate(); 

  const handleFreeTrialClick = () => {
    navigate("/Pembayaran"); 
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg text-center mt-6 border-2 border-blue-500 shadow-md">
      <h3 className="text-lg font-semibold mb-2">
        Coba premium Gratis Untuk Pengguna Baru Selama 14 Hari
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Rasakan Keunggulan Fitur Premium Tanpa Biaya untuk 14 Hari Pertama
      </p>
      <button
        onClick={handleFreeTrialClick} 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Coba Sekarang
      </button>
      <p className="text-sm text-gray-500 mt-4">
        Batalkan kapan saja. Kami ingatkan 7 hari sebelum uji coba gratis
        berakhir
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="mb-20">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Akses Keahlian Profesional dalam Menghadapi Tantangan Budidaya Lele
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Pengetahuan Mendalam tentang Penyakit & Tantangan dalam Budidaya Lele -
          Fitur Premium untuk Kesuksesan budidaya Anda
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SubscriptionCard
            title="Per Bulan"
            price="Rp.120.000"
            duration="Kolam/Bootcamp"
            paymentLink="https://app.sandbox.midtrans.com/payment-links/1733756972604"
          />
          <SubscriptionCard
            title="Per 6 Bulan"
            price="Rp.648.000"
            originalPrice="Rp.720.000"
            discount={10}
            duration="Kolam/Bootcamp"
            paymentLink="https://app.sandbox.midtrans.com/payment-links/1733757061121" 
          />
          <SubscriptionCard
            title="Per Tahun"
            price="Rp.1.200.000"
            duration="Kolam/Bootcamp"
            paymentLink="https://app.sandbox.midtrans.com/payment-links/1733757107107" 
          />
        </div>
        <FreeTrialCard />
      </div>
    </div>
  );
}

function Premium() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-grow">
          <Content />
        </div>
        <AIFloatingButton />
        <Footer />
      </div>
    </div>
  );
}

export default Premium;