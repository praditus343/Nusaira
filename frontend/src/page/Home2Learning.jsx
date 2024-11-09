import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ElearningSidebar from "../componen/ElearningSidebar";
import Header from "../componen/Header";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Menggunakan Chevron Right untuk tombol "Selanjutnya"

function Home2() {
  const [isExpanded, setIsExpanded] = useState({
    kataPengantar: false,
    daftarIsi: false,
    pendahuluan: false,
  });

  const toggleExpand = (section) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 relative">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-xl font-bold mb-2">Beranda</h1>
        </div>
        
        {/* Section 1 */}
        <section className="mb-6">
          <div
            onClick={() => toggleExpand('kataPengantar')}
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-blue-600 mb-2"
          >
            <span>Manfaat Bioflok dalam Budidaya Lele</span>
            {isExpanded.kataPengantar ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isExpanded.kataPengantar && (
            <p className="text-gray-700 leading-relaxed">
              Budidaya lele menjadi salah satu pilihan bisnis perikanan yang menjanjikan, terutama di tengah
              meningkatnya kebutuhan pasar akan produk-produk ikan air tawar yang bernutrisi tinggi. Dalam upaya
              meningkatkan produktivitas serta meminimalkan biaya, teknik budidaya dengan metode bioflok telah menjadi
              sorotan di kalangan petani ikan...
            </p>
          )}
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <div
            onClick={() => toggleExpand('pendahuluan')}
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-blue-600 mb-2"
          >
            <span>Persiapan Alat dan Bahan</span>
            {isExpanded.pendahuluan ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isExpanded.pendahuluan && (
            <p className="text-gray-700 leading-relaxed">
              Sebelum memulai budidaya lele menggunakan metode bioflok, penting untuk mempersiapkan alat dan bahan yang diperlukan. 
              Berikut adalah daftar lengkap alat dan bahan yang harus disiapkan:
            </p>
          )}
        </section>

        {/* Tombol Selanjutnya dan Sebelumnya */}
        <div className="absolute bottom-4 left-4 flex justify-between w-full px-4">
          <Link to="/HomeLearning" className="text-blue-500 font-bold flex items-center">
            <FontAwesomeIcon icon={faChevronRight} className="mr-2 rotate-180" />
            Sebelumnya
          </Link>
          <Link to="/halaman-berikutnya" className="text-blue-500 font-bold flex items-center mr-10">
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
      <div className="flex-1 overflow-auto">
        <Home2 />
        <AIFloatingButton />
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home2Learning;
