import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://nusaira-be.vercel.app/api/buku');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
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
                <img
                  src={book.image}
                  alt={book.judul}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold mb-2">{book.judul}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3 flex-grow">{book.deskripsi}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4 mt-2">
                    <span className="mr-2">Tanggal Terbit:</span>
                    <span>{formatDate(book.tanggal_terbit)}</span>
                  </div>
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