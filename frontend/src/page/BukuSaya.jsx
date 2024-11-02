import React, { useState, useEffect } from 'react';
import ElearningSidebar from '../componen/ElearningSidebar';
import Header from '../componen/Header';
import AIFloatingButton from '../componen/AiFloatingButton';
import Footer from '../componen/Footer';
import { Star, Trash2, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import img1 from "../assets/img/e-learning/el1.png"
import img2 from "../assets/img/e-learning/el2.png"
import img3 from "../assets/img/e-learning/el3.png"
import img4 from "../assets/img/e-learning/el4.png"
import img5 from "../assets/img/e-learning/el5.png"
import img6 from "../assets/img/e-learning/el6.png"
import img7 from "../assets/img/e-learning/el7.png"
import img8 from "../assets/img/e-learning/el8.png"

const ELearningBooks = () => {
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "Teknik Budidaya",
            image: img1,
            description: "Ini adalah buku budidaya lele, dimana jika kita merawat telur ikan 90% akan berhasil jika berhasil dan...",
            rating: 5.0,
            addedDate: new Date('2023-10-30')
        },
        {
            id: 2,
            title: "Teknik Memimin...",
            image: img2,
            description: "Ini adalah buku budidaya lele, dimana jika kita merawat telur ikan 90% akan berhasil jika berhasil dan...",
            rating: 5.0,
            addedDate: new Date('2023-10-25')
        },
        {
            id: 3,
            title: "Kampanye menye...",
            image: img3,
            description: "Ini adalah buku budidaya lele, dimana jika kita merawat telur ikan 90% akan berhasil jika berhasil dan...",
            rating: 5.0,
            addedDate: new Date('2023-10-28')
        },
        {
            id: 4,
            title: "Cara Agar Bud...",
            image: img4,
            description: "Ini adalah buku budidaya lele, dimana jika kita merawat telur ikan 90% akan berhasil jika berhasil dan...",
            rating: 5.0,
            addedDate: new Date('2023-10-20')
        },
        {
            id: 5,
            title: "Strategi Pemasaran Ikan",
            image: img5,
            description: "Buku ini menjelaskan berbagai strategi pemasaran untuk ikan lele dan teknik pemasaran yang efektif.",
            rating: 4.8,
            addedDate: new Date('2023-10-18')
        },
        {
            id: 6,
            title: "Pengelolaan Kolam Ikan",
            image: img6,
            description: "Panduan lengkap tentang cara mengelola kolam ikan secara efektif dan efisien.",
            rating: 4.5,
            addedDate: new Date('2023-10-22')
        },
        {
            id: 7,
            title: "Kesehatan Ikan Lele",
            image: img7,
            description: "Menjelaskan berbagai penyakit yang umum terjadi pada ikan lele dan cara mengatasinya.",
            rating: 4.9,
            addedDate: new Date('2023-10-15')
        },
        {
            id: 8,
            title: "Inovasi dalam Budidaya Ikan",
            image: img8,
            description: "Buku ini membahas inovasi terbaru dalam budidaya ikan, termasuk teknologi dan metode baru.",
            rating: 4.7,
            addedDate: new Date('2023-10-10')
        }
    ]);


    const sortBooks = () => {
        const sortedBooks = [...books].sort((a, b) => {
            if (sortOrder === "newest") {
                return b.addedDate - a.addedDate;
            } else if (sortOrder === "oldest") {
                return a.addedDate - b.addedDate;
            }
            return 0;
        });
        setBooks(sortedBooks);
    };

    useEffect(() => {
        sortBooks();
    }, [sortOrder]);

    const toggleSelectionMode = () => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedBooks([]);
    };

    const toggleBookSelection = (bookId) => {
        setSelectedBooks(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const handleDeleteBooks = () => {
        const updatedBooks = books.filter(book => !selectedBooks.includes(book.id));
        setBooks(updatedBooks);
        setIsSelectionMode(false);
        setSelectedBooks([]);
    };

    return (
        <div className='bg-white w-full min-h-screen'>
            <Header />
            <div className="p-6 bg-white mr-5 ml-5">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-bold mb-2">Buku-buku Anda Menunggu untuk Dibaca!</h1>
                        <p className="text-gray-600">Ayo mulai perjalanan membaca Anda dan temukan inspirasi<br /> dalam setiap halaman yang menunggu</p>
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
                            className="block w-[300px] pr-10 pl-4 border rounded-lg py-2 appearance-none"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Baru Ditambahkan</option>
                            <option value="oldest">Ditambahkan Lama</option>
                        </select>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                        />
                    </div>
                </div>
                <div className="mt-4 border border-blue-600 rounded-lg max-h-[800px] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow relative border border-gray-300 border">
                                {isSelectionMode && (
                                    <div
                                        className="absolute top-4 right-4 z-10"
                                        onClick={() => toggleBookSelection(book.id)}
                                    >
                                        <div className={`w-6 h-6 rounded border-2 cursor-pointer flex items-center justify-center
                            ${selectedBooks.includes(book.id)
                                                ? 'bg-red-500 border-red-500'
                                                : 'border-blue-300 bg-white border'
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
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">{book.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{book.description}</p>
                                    <div className="flex justify-between items-center">
                                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm">
                                            Lanjut Baca
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

function MyBooks() {
    return (
        <div className="flex h-screen">
            <ElearningSidebar />
            <div className="flex-1 overflow-auto">
                <ELearningBooks />
                <AIFloatingButton />
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MyBooks;
