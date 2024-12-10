import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BukuInputModal from './BukuInputModal';

const BukuCards = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [highlightedBook, setHighlightedBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://nusaira-be.vercel.app/api/buku");
            setBooks(response.data);
        } catch (err) {
            console.error("Error fetching buku data:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDeleteBuku = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Apakah Anda yakin?",
                text: "Buku ini akan dihapus secara permanen!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Ya, Hapus!",
                cancelButtonText: "Batal",
            });

            if (result.isConfirmed) {
                await axios.delete(`https://nusaira-be.vercel.app/api/buku/${id}`);
                await fetchBooks();
                Swal.fire("Terhapus!", "Buku berhasil dihapus.", "success");
            }
        } catch (error) {
            console.error("Error deleting buku:", error);
            Swal.fire("Error", "Terjadi kesalahan saat menghapus buku.", "error");
        }
    };

    const handleAddOrUpdateBook = async (book) => {
        await fetchBooks();
        setIsModalOpen(false);
        setEditingBook(null);
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleHighlightBook = (book) => {
        setHighlightedBook(book);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Tambah Buku Baru
            </button>

            <div className="relative border-gray-300 border mt-10 rounded-lg min-h-screen shadow-lg mb-10">
                <h2 className="border-b-2 p-6">Daftar Buku</h2>
                {error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : !books.length ? (
                    <p className="text-center text-gray-500 mt-64">Tidak ada buku yang tersedia.</p>
                ) : (
                    <div className="space-y-6 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white rounded shadow relative border border-gray-300 flex flex-col min-h-[400px]"
                                >
                                    <img
                                        src={book.image || "https://via.placeholder.com/150"}
                                        alt={book.judul || "Gambar Buku"}
                                        className="w-full h-64 object-cover rounded mb-4"
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-black">
                                            {book.judul || "Judul Tidak Tersedia"}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            <strong>Tanggal Terbit:</strong>{" "}
                                            {book.tanggal_terbit
                                                ? new Date(book.tanggal_terbit).toLocaleDateString()
                                                : "Tanggal Tidak Tersedia"}
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            {book.deskripsi || "Tidak ada deskripsi."}
                                        </p>

                                        {book.link_pdf && (
                                            <div className="flex justify-start mt-auto mb-4">
                                                <button
                                                    onClick={() => window.open(book.link_pdf, "_blank")}
                                                    className="text-blue-600 hover:underline w-full sm:w-auto  py-2 rounded-lg"
                                                >
                                                    Baca Buku
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex justify-between mt-4 space-x-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditBook(book);
                                                }}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center w-full sm:w-auto"
                                            >
                                                <Edit className="mr-2" size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteBuku(book.id);
                                                }}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center w-full sm:w-auto"
                                            >
                                                <Trash2 className="mr-2" size={16} /> Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <BukuInputModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingBook(null);
                        }}
                        initialData={editingBook}
                        onSubmit={handleAddOrUpdateBook}
                    />
                )}
            </div>
        </div>
    );
};

export default BukuCards;
