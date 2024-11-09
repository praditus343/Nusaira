import React from "react";
import { FaBook, FaTags, FaHistory, FaCheck } from "react-icons/fa";
import ElearningSidebar from "../componen/ElearningSidebar";
import Header from "../componen/Header";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import img1 from "../assets/img/e-learning/el1.png";
import img2 from "../assets/img/e-learning/el2.png";
import img3 from "../assets/img/e-learning/el3.png";
import img4 from "../assets/img/e-learning/el4.png";
import img5 from "../assets/img/e-learning/el5.png";
import img6 from "../assets/img/e-learning/el6.png";
import img7 from "../assets/img/e-learning/el7.png";
import img8 from "../assets/img/e-learning/el8.png";

const books = [
  {
    title: "Cara Budidaya Lele Menggunakan Metode Bioflok untuk Hasil Maksimal",
    progress: 18,
    total: 100,
    pages: 20,
    image: img1,
  },
  {
    title: "Cara Budidaya Udang di Tambak",
    progress: 40,
    total: 100,
    pages: 30,
    image: img2,
  },
  {
    title: "Pemanfaatan Air Bersih dalam Budidaya",
    progress: 60,
    total: 100,
    pages: 25,
    image: img3,
  },
  {
    title: "Teknik Filter Kolam yang Efektif",
    progress: 80,
    total: 100,
    pages: 15,
    image: img4,
  },
];

const recommendations = [
  {
    title: "World Ocean's Day",
    description: "Teknik budidaya untuk menjaga lingkungan perairan tetap lestari",
    rating: 5,
    image: img5,
  },
  {
    title: "Teknik Meminimalkan Sampah Laut",
    description: "Kampanye menjaga kebersihan laut untuk masa depan bumi",
    rating: 5,
    image: img6,
  },
  {
    title: "Kampanye Menyelamatkan Terumbu Karang",
    description: "Upaya konservasi dan pemulihan ekosistem laut",
    rating: 5,
    image: img7,
  },
  {
    title: "Cara Agar Budidaya Ramah Lingkungan",
    description: "Mengoptimalkan budidaya dengan pendekatan ramah lingkungan",
    rating: 5,
    image: img8,
  },
];

function Dashboard() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 p-6 font-sans">
        {/* Top Section with Icons */}
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            <FaBook className="text-yellow-500 text-3xl mb-2" />
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-500 mb-2">Sedang dibaca</p>
            <span className="block w-8 h-1 bg-yellow-500 mt-1 rounded"></span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            <FaTags className="text-red-500 text-3xl mb-2" />
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-500 mb-2">Kategori</p>
            <span className="block w-8 h-1 bg-red-500 mt-1 rounded"></span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            <FaHistory className="text-blue-500 text-3xl mb-2" />
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-500 mb-2">History</p>
            <span className="block w-8 h-1 bg-blue-500 mt-1 rounded"></span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            <FaCheck className="text-green-500 text-3xl mb-2" />
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-500 mb-2">Selesai dibaca</p>
            <span className="block w-8 h-1 bg-green-500 mt-1 rounded"></span>
          </div>
        </div>

        {/* Books Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Baru di baca</h3>
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Judul Buku</th>
                <th className="py-3 px-6 text-left">Progress</th>
                <th className="py-3 px-6 text-center">Halaman</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {books.map((book, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <img src={book.image} alt="Book cover" className="w-10 h-10 rounded mr-3" />
                      <span>{book.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>
                        {book.progress}/{book.total} (
                        {Math.round((book.progress / book.total) * 100)}%)
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">{book.pages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommendations Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Rekomendasi untuk kamu</h3>
          <div className="grid grid-cols-4 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between" style={{ minHeight: "300px" }}>
                <div>
                  <img src={rec.image} alt="Recommendation cover" className="w-full h-32 object-cover rounded mb-4" />
                  <h4 className="text-md font-semibold mb-2">{rec.title}</h4>
                  <p className="text-gray-500 text-sm mb-2">{rec.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md">
                    Lihat selengkapnya
                  </button>
                  <div className="flex items-center text-yellow-500">
                    <span>★</span>
                    <span className="ml-1 text-gray-700">5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RingkasanLearning() {
  return (
    <div className="flex h-screen">
      <ElearningSidebar />
      <div className="flex-1 overflow-auto">
        <Dashboard />
        <AIFloatingButton />
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RingkasanLearning;
