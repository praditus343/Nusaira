import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PenyakitLeleUpload from './PenyakitLeleUploads';
import { X } from 'lucide-react';

export const PenyakitLeleCards = ({ penyakitData, onDataUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://nusaira-be.vercel.app/api/penyakit-lele/${id}`,
            { method: 'DELETE' }
          );

          if (!response.ok) {
            throw new Error('Gagal menghapus data.');
          }

          Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');

          onDataUpdate(id);
        } catch (error) {
          console.error('Error saat menghapus data:', error.message);
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
        }
      }
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-8 ml-4"
      >
        Tambah Data Penyakit
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <div className="flex justify-between items-center mb-8 ">
              <h2 className="text-xl font-bold text-gray-800 text-left">
                Tambah Penyakit Lele
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
              >
                <X size={24} />
              </button>
            </div>
            <PenyakitLeleUpload onClose={closeModal} />
          </div>
        </div>
      )}
      <div className="space-y-8 p-4">
        {penyakitData.length > 0 ? (
          penyakitData.map((item) => (
            <div
              key={item.id}
              id={`penyakit-card-${item.id}`}
              className="bg-white rounded shadow flex items-center p-4 gap-4 border border-gray-300 relative"
            >
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-10 py-3 mr-2 mt-2 rounded text-sm hover:bg-red-600"
              >
                Hapus
              </button>
              <img
                src={item.image}
                alt={item.title}
                className="w-72 h-72 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Tanggal:</strong> {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">{item.excerpt}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Indikasi:</strong> {item.indikasi}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Penyebab:</strong> {item.penyebab}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Pencegahan:</strong> {item.pencegahan}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Penanganan:</strong> {item.penanganan}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Gejala Tambahan:</strong> {item.gejalaTambahan}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Referensi:</strong> {Array.isArray(item.referensi)
                      ? item.referensi.join(', ')
                      : item.referensi}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Tidak ada data penyakit lele.</p>
        )}
      </div>
    </>
  );
};

export default PenyakitLeleCards;
