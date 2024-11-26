import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ElearningSidebar from "../componen/ElearningSidebar";
import Header from "../componen/Header";

import Footer from "../componen/Footer";
import { Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/img/e-learning/el1.png";
import img2 from "../assets/img/e-learning/el2.png";
import img3 from "../assets/img/e-learning/el3.png";
import img4 from "../assets/img/e-learning/el4.png";
import img5 from "../assets/img/e-learning/el5.png";
import img6 from "../assets/img/e-learning/el6.png";
import img7 from "../assets/img/e-learning/el7.png";
import img8 from "../assets/img/e-learning/el8.png";
import AIFloatingButton from "../componen/AIFloatingButton";

const PerpustakaanBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const [books] = useState([
    { id: 1, title: "Teknik Budidaya", image: img1, description: "Ini adalah buku budidaya lele...", rating: 5.0},
    { id: 2, title: "Teknik Memimin...", image: img2, description: "Ini adalah buku budidaya lele...", rating: 5.0},
    { id: 3, title: "Kampanye menye...", image: img3, description: "Ini adalah buku budidaya lele...", rating: 5.0 },
    { id: 4, title: "Cara Agar Bud...", image: img4, description: "Ini adalah buku budidaya lele...", rating: 5.0},
    { id: 5, title: "Strategi Pemasaran Ikan", image: img5, description: "Strategi pemasaran untuk ikan lele...", rating: 4.8},
    { id: 6, title: "Pengelolaan Kolam Ikan", image: img6, description: "Panduan mengelola kolam ikan...", rating: 4.5},
    { id: 7, title: "Kesehatan Ikan Lele", image: img7, description: "Penyakit umum pada ikan lele...", rating: 4.9},
    { id: 8, title: "Inovasi dalam Budidaya Ikan", image: img8, description: "Inovasi terbaru dalam budidaya ikan...", rating: 4.7},
  ]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="p-6 bg-white mr-5 ml-5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold mb-2">Buku-buku Anda Menunggu untuk Dibaca!</h1>
            <p className="text-gray-600">
             Ayo mulai perjalanan membaca Anda dan temukan inspirasi
              <br /> dalam setiap halaman yang menunggu
            </p>
          </div>
        </div>
        <div className="flex items-center mb-10">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 border rounded-lg py-2 border-blue-600"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
            />
          </div>
        </div>
        <div className="mt-4 border border-blue-600 rounded-lg max-h-[800px] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow relative border border-gray-300"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{book.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/HomeLearning`)} // Use navigate to redirect
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm"
                    >
                      Baca
                    </button>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{book.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Perpustakaan() {
  return (
    <div className="flex h-screen">
      <ElearningSidebar />
      <div className="flex-1 overflow-auto">
        <PerpustakaanBooks />
        <AIFloatingButton />
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Perpustakaan;
