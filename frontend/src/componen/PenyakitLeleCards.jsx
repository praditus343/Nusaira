import React, { useState } from 'react';
import PenyakitLeleUpload from './PenyakitLeleUploads';
import { X } from 'lucide-react';

export const PenyakitLeleCards = ({ penyakitData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-8 ml-4 "
      >
        Tambah Data Penyakit
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <div className="flex justify-between items-center mb-8">
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
        {penyakitData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow flex items-center p-4 gap-4 border border-gray-300"
          >
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
        ))}
      </div>
    </>
  );
};

export default PenyakitLeleCards;
