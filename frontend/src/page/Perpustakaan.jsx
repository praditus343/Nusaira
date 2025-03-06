import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import Error404Page from "../componen/ErrorPage";
import axios from 'axios';
import Swal from 'sweetalert2';
import apiClient from "../service/axiosInstance";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const PerpustakaanBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const token = localStorage.getItem('token');
  const fetchBooks = async () => {
    try {
      const response = await apiClient.get('/buku');
      setBooks(response.data);
  } catch (err) {
      setError(err.message);
  }  
  };

  const fetchFavorites = async () => {
    try {
      const response = await apiClient.get('/favorites');
  
      if (Array.isArray(response.data.favorites)) {
          setFavorites(response.data.favorites.map(fav => fav.buku_id));
      } else {
          setFavorites([]);
      }
  } catch (err) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengambil daftar favorit'
      });
  }  
  };

  const toggleFavorite = async (bookId) => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Masuk Diperlukan',
        text: 'Silakan login terlebih dahulu untuk menambahkan buku favorit'
      });
      return;
    }

    try {
      await apiClient.post('/favorites', { buku_id: bookId });

      if (favorites.includes(bookId)) {
          setFavorites(prevFavorites => prevFavorites.filter(id => id !== bookId));
          Swal.fire({
              icon: 'info',
              title: 'Favorit',
              text: 'Buku dihapus dari favorit',
              showConfirmButton: false,
              timer: 1500
          });
      } else {
          setFavorites(prevFavorites => [...prevFavorites, bookId]);
          Swal.fire({
              icon: 'success',
              title: 'Favorit',
              text: 'Buku berhasil ditambahkan ke favorit',
              showConfirmButton: false,
              timer: 1500
          });
      }

  } catch (err) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: err.response?.data?.message || 'Gagal menambahkan favorit'
      });
  }
  };

  useEffect(() => {
    const initFetch = async () => {
      await fetchBooks();
      if (token) {
        await fetchFavorites();
      }
      setLoading(false);
    };

    initFetch();
  }, [token]);

  const filteredBooks = books.filter((book) =>
    book.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );


  ;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error404Page />
      </div>
    );
  }

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
                className="bg-white rounded-lg overflow-hidden shadow relative border border-gray-300 flex flex-col"
              >
                {token && (
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="absolute top-2 right-2 z-10 text-white hover:text-red-500 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="w-6 h-6 text-red-500"
                    />

                  </button>
                )}
                <img
                  src={book.image}
                  alt={book.judul}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold mb-2">{book.judul}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4 mt-2">
                    <span className="mr-2">Tanggal Terbit:</span>
                    <span>{formatDate(book.tanggal_terbit)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">{book.deskripsi}</p>
                  <div className="flex justify-center">
                    <a
                      href={book.link_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
                    >
                      Baca Buku
                    </a>
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
      <Sidebar />
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