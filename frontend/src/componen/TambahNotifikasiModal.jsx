import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { X } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TambahNotifikasiModal = ({ onNotifikasiAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: "",
        date: "",
        title: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://nusaira-be.vercel.app/api/notifikasi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    created_at: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan notifikasi");
            }

            setFormData({
                type: "",
                date: "",
                title: "",
                description: "",
            });
            setIsOpen(false);

            if (onNotifikasiAdded) {
                onNotifikasiAdded();
            }

            
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Notifikasi berhasil ditambahkan.",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Oke",
            });
        } catch (error) {
            console.error("Error:", error);

            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Gagal menambahkan notifikasi.",
                confirmButtonColor: "#d33",
                confirmButtonText: "Coba Lagi",
            });
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                Tambah Notifikasi
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Tambah Notifikasi Baru</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-700 hover:text-gray-900"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="type" className="block font-medium">
                                    Tipe
                                </label>
                                <div className="relative">
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="border border-blue-500 placeholder-black rounded w-full px-3 py-2 pr-8 appearance-none"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Tipe
                                        </option>
                                        <option value="Sistem">Sistem</option>
                                        <option value="Berita">Berita</option>
                                        <option value="E-learning">E-learning</option>
                                        <option value="Penyakit-Lele">Penyakit-Lele</option>
                                    </select>

                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="date" className="block font-medium">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="border border-blue-500 placeholder-black rounded w-full px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className="block font-medium">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="border border-blue-500 placeholder-black rounded w-full px-3 py-2"
                                    required
                                    placeholder="Masukkan judul notifikasi"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block font-medium">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="border border-blue-500 placeholder-black rounded w-full px-3 py-2"
                                    required
                                    placeholder="Masukkan deskripsi notifikasi"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="w-full mt-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400">
                                    Simpan Notifikasi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TambahNotifikasiModal;
