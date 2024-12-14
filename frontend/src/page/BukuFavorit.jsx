import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import AIFloatingButton from "../componen/AiFloatingButton";
import Error404Page from "../componen/ErrorPage";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";

const ELearningBooks = () => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [books, setBooks] = useState([]);
  const [favoriteBookIds, setFavoriteBookIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://nusaira-be.vercel.app/api/buku');
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || 'Gagal mengambil daftar buku'
      });
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://nusaira-be.vercel.app/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (Array.isArray(response.data.favorites)) {
        // console.log("Favorites Data:", response.data.favorites); 
  
        const favoriteBooks = response.data.favorites.map(fav => ({
          buku_id: fav.buku_id,
          created_at: fav.created_at,
        }));
        // console.log("Mapped Favorite Books:", favoriteBooks);
  
        setFavoriteBookIds(favoriteBooks);
      }
    } catch (err) {
      setError(err.message);
      // console.error("Error fetching favorites:", err); 
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || 'Gagal mengambil daftar favorit'
      });
    }
  };
  
  

  const handleDeleteBooks = async () => {
    try {
      const deletedBooksPromises = selectedBooks.map(async (bukuId) => {
        await axios.delete(`https://nusaira-be.vercel.app/api/favorites/${bukuId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return bukuId; 
      });
  
      const deletedBooks = await Promise.all(deletedBooksPromises);
  
      
      setFavoriteBookIds((prev) => prev.filter(id => !deletedBooks.includes(id)));
      setSelectedBooks([]);
      setIsSelectionMode(false);
  
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Buku favorit yang dipilih berhasil dihapus'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal menghapus buku favorit'
      });
    }
  };
  
  const sortBooks = () => {
    if (!favoriteBookIds.length || !books.length) return [];
  
    const favoriteBooks = favoriteBookIds.map(fav => {
      const book = books.find(book => book.id === fav.buku_id);
      return book ? { ...book, created_at: fav.created_at } : null;
    }).filter(book => book !== null);

    const sortedBooks = [...favoriteBooks].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" 
        ? dateB - dateA 
        : dateA - dateB;
    });
  
    return sortedBooks;
  };
  

  useEffect(() => {
    if (token) {
      fetchBooks();
      fetchFavorites();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedBooks([]);
  };

  const toggleBookSelection = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const displayBooks = React.useMemo(() => {
    return sortBooks();
  }, [books, favoriteBookIds, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <Error404Page />;
  }

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="p-6 bg-white mr-5 ml-5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold mb-2">Buku Favorit Kamu</h1>
            <p className="text-gray-600">
              Buku-buku favorit Anda siap untuk dibaca! Ayo nikmati setiap halaman
              <br /> yang penuh dengan inspirasi dan ide-ide brilian
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isSelectionMode ? (
              <button
                onClick={handleDeleteBooks}
                className="flex items-center gap-3 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-6 h-6" />
                <span className="text-lg font-medium">Hapus Buku Saya</span>
              </button>
            ) : (
              <button
                onClick={toggleSelectionMode}
                className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-300"
              >
                <Trash2 className="w-8 h-8 text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center mb-10">
          <div className="relative flex items-center">
            <select
              className="block w-[300px] pr-8 pl-4 border rounded-lg py-2 appearance-none"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Baru Ditambahkan</option>
              <option value="oldest">Ditambahkan Lama</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg pointer-events-none z-10"
            />
          </div>
        </div>

        <div className="mt-4 border border-blue-600 rounded-lg max-h-[800px] overflow-y-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            {displayBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow relative border border-gray-300"
              >
                {isSelectionMode && (
                  <div
                    className="absolute top-4 right-4 z-10"
                    onClick={() => toggleBookSelection(book.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded border-2 cursor-pointer flex items-center justify-center
                            ${selectedBooks.includes(book.id)
                          ? "bg-red-500 border-red-500"
                          : "border-blue-300 bg-white border"
                        }`}
                    >
                      {selectedBooks.includes(book.id) && (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                )}
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2">
                <div className="flex items-center justify-between">
                  <div>
                  <h3 className="font-semibold mb-2">{book.judul}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {book.deskripsi}
                  </p>
                  <div className="flex justify-center p-2">
                    <a
                      href={book.link_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 mt-5"
                    >
                      Baca Buku
                    </a>
                  </div>
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

function BukuFavorit() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ELearningBooks />
        <AIFloatingButton />
        <Footer />
      </div>
    </div>
  );
}

export default BukuFavorit;
