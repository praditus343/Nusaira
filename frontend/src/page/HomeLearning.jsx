import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ElearningSidebar from "../componen/ElearningSidebar";
import Header from "../componen/Header";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Menggunakan Chevron Right untuk tombol "Selanjutnya"
import img1 from "../assets/img/e-learning/el1.png";
import logo from "../assets/Logo.png";

function Home1() {
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
            <h1 className="text-xl font-bold mb-2">
              Beranda
            </h1>
          </div>
        <div className="flex items-start mb-6">
          {/* Gambar Buku */}
          <img
            src={img1} // Menggunakan import imgBookCover
            alt="World Ocean's Day"
            className="w-24 h-24 mr-4 rounded-lg object-cover"
          />
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-semibold mb-2 flex justify-between">
              Cara Budidaya Lele Menggunakan Metode Bioflok untuk Hasil Maksimal
              <div className="flex space-x-2 text-blue-500 text-lg">
                <button title="Like">👍</button>
                <button title="Share">🔗</button>
                <button title="Bookmark">🔖</button>
              </div>
            </h1>
            <div className="text-gray-500 flex items-center space-y-1">
              <p>Writer: Iqbal Saputra</p>
              <p className="ml-2">⭐ 5.0</p>
            </div>
            <div className="text-gray-500 flex items-center">
              <img
                src={logo} // Menggunakan import logoNusAira
                alt="NusAira Logo"
                className="w-5 h-5 mr-2"
              />
              <p>by NusAira</p>
            </div>
            <p className="text-blue-600">122x Dibaca</p>
          </div>
        </div>

        {/* Garis biru di atas "Kata Pengantar" */}
        <hr className="border-t-2 border-blue-500 mb-6" />

        {/* Section Kata Pengantar */}
        <section className="mb-6">
          <div
            onClick={() => toggleExpand('kataPengantar')}
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-blue-600 mb-2"
          >
            <span>Kata Pengantar</span>
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

        {/* Section Daftar Isi */}
        <section className="mb-6">
          <div
            onClick={() => toggleExpand('daftarIsi')}
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-blue-600 mb-2"
          >
            <span>Daftar Isi</span>
            {isExpanded.daftarIsi ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isExpanded.daftarIsi && (
            <ul className="list-disc ml-6 text-gray-700">
              <li>Sampul Buku</li>
              <li>Kata Pengantar</li>
              <li>Daftar Isi</li>
              <li>Pendahuluan</li>
              <li>Manfaat Bioflok dalam Budidaya Lele</li>
              <li>Persiapan Alat dan Bahan</li>
              <li>Pemilihan Kolam yang Tepat</li>
              <li>Memahami Prinsip Kerja Bioflok</li>
              <li>Cara Membuat Sistem Bioflok</li>
              <li>Penggunaan Probiotik dan Pakan yang Efektif</li>
              <li>Pengelolaan Nutrisi dalam Bioflok</li>
              <li>Pemantauan dan Pengendalian Kualitas Air</li>
              <li>Penanganan Hama dan Penyakit</li>
              <li>Proses Pemanenan Lele Bioflok</li>
              <li>Tips Sukses dan Kendala yang Mungkin Dihadapi</li>
            </ul>
          )}
        </section>

        {/* Section Pendahuluan */}
        <section className="mb-6">
          <div
            onClick={() => toggleExpand('pendahuluan')}
            className="flex items-center justify-between cursor-pointer text-lg font-bold text-blue-600 mb-2"
          >
            <span>Pendahuluan</span>
            {isExpanded.pendahuluan ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isExpanded.pendahuluan && (
            <p className="text-gray-700 leading-relaxed">
              Budidaya lele merupakan salah satu usaha perikanan yang semakin diminati oleh masyarakat, terutama di
              Indonesia, yang memiliki potensi pasar yang sangat besar. Lele dikenal sebagai ikan yang memiliki
              pertumbuhan cepat, daya tahan yang baik...
            </p>
          )}
        </section>

        {/* Tombol Selanjutnya */}
        <div className="absolute bottom-1 left-4">
          <Link to="/Home2Learning" className="text-blue-500 font-bold flex items-center">
            Selanjutnya <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
}

function HomeLearning() {
  return (
    <div className="flex h-screen">
      <ElearningSidebar />
      <div className="flex-1 overflow-auto">
        <Home1 />
        <AIFloatingButton />
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomeLearning;
