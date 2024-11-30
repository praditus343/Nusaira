import React, { useState, useEffect } from "react";
import { BeritaInputModal } from "./BeritaInputModal";
import Swal from "sweetalert2";

export const BeritaCards = ({ onAddBerita }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

 
  const fetchBerita = async () => {
    try {
      const response = await fetch("https://nusaira-be.vercel.app/api/berita");
      if (!response.ok) throw new Error("Gagal mengambil data dari API.");
      const result = await response.json();
      // console.log("Data fetched:", result); 
      setData(result);
    } catch (err) {
      console.error("Error fetching berita data:", err);
      setError(err.message);
    }
  };

  const handleDeleteBerita = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Berita ini akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });
  
      if (result.isConfirmed) {
        const response = await fetch(`https://nusaira-be.vercel.app/api/berita/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          await fetchBerita(); 
          Swal.fire("Terhapus!", "Berita berhasil dihapus.", "success");
        } else {
          throw new Error("Penghapusan gagal");
        }
      }
    } catch (error) {
      console.error("Error deleting berita:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus berita.", "error");
    }
  };

  const handleAddBerita = async (newBerita) => {
    await onAddBerita(newBerita);
    setIsModalOpen(false);
    await fetchBerita();
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  return (
    <div className="relative">
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !data.berita || !data.berita.length ? ( 
        <p className="text-center text-gray-500">Tidak ada berita yang tersedia.</p>
      ) : (
        <div className="space-y-4 p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Blog Berita
          </button>
  
          {data.berita.map((item) => ( 
            <div key={item.id} className="bg-white rounded shadow p-4 relative border border-gray-300">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.title || "Gambar Berita"}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-black">
                {item.title || "Judul Tidak Tersedia"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Tanggal:</strong>{" "}
                {item.date
                  ? new Date(item.date).toLocaleDateString()
                  : "Tanggal Tidak Tersedia"}
              </p>
              <p className="text-gray-700 mt-2">
                {item.excerpt || "Tidak ada kutipan."}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                {item.content ? item.content.slice(0, 200) + "..." : "Konten tidak tersedia."}
              </p>
              <button
                onClick={() => handleDeleteBerita(item.id)}
                className="mt-4 bg-red-500 text-white px-10 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <BeritaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBerita}
      />
    </div>
  );
  
};

export default BeritaCards;
