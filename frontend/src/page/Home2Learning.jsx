import React from 'react';
import { Link } from 'react-router-dom';
import ElearningSidebar from "../componen/ElearningSidebar";
import Header from "../componen/Header";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Menggunakan Chevron Right untuk tombol "Selanjutnya"

function Home2() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-6 rounded-lg shadow-md mt-6 relative border border-blue-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold mb-2">Beranda</h1>
        </div>
        
        {/* Section 1 - Manfaat Bioflok dalam Budidaya Lele */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2">Manfaat Bioflok dalam Budidaya Lele</h2>
          <p className="text-gray-700 leading-relaxed">
            Budidaya lele menjadi salah satu pilihan bisnis perikanan yang menjanjikan, terutama di tengah
            meningkatnya kebutuhan pasar akan produk-produk ikan air tawar yang bernutrisi tinggi. Dalam upaya
            meningkatkan produktivitas serta meminimalkan biaya, teknik budidaya dengan metode bioflok telah menjadi
            sorotan di kalangan petani ikan...
          </p>
        </section>

        {/* Section 2 - Persiapan Alat dan Bahan */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2">Persiapan Alat dan Bahan</h2>
          <p className="text-gray-700 leading-relaxed">
            Sebelum memulai budidaya lele menggunakan metode bioflok, penting untuk mempersiapkan alat dan bahan yang diperlukan. 
            Berikut adalah daftar lengkap alat dan bahan yang harus disiapkan:
          </p>
        </section>

        {/* Tombol Selanjutnya dan Sebelumnya */}
        <div className="absolute bottom-4 left-4 flex justify-between w-full px-4">
          <Link to="/HomeLearning" className="text-blue-500 font-bold flex items-center">
            <FontAwesomeIcon icon={faChevronRight} className="mr-2 rotate-180" />
            Sebelumnya
          </Link>
          <Link to="/Perpustakaan" className="text-blue-500 font-bold flex items-center mr-10">
            Selanjutnya <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
}

function Home2Learning() {
  return (
    <div className="flex h-screen">
      <ElearningSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Home2 />
          <AIFloatingButton />
        </div>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
}

export default Home2Learning;
