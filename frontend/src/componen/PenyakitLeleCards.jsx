import React from 'react';

export const PenyakitLeleCards = ({ penyakitData }) => (
  <div className="space-y-4 p-4">
    {penyakitData.map((item) => (
      <div 
        key={item.id} 
        className="bg-white rounded shadow flex items-center p-4 gap-4"
      >
        {/* Gambar */}
        <img
          src={item.image}
          alt={item.title}
          className="w-72 h-72 object-cover rounded"
        />

        {/* Konten */}
        <div className="flex-1">
          {/* Judul */}
          <h3 className="text-xl font-bold">{item.title}</h3>

          {/* Informasi Dasar */}
          <p className="text-sm text-gray-600 mt-2">
            <strong>Tanggal:</strong> {new Date(item.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mt-2">{item.excerpt}</p>
          
          {/* Informasi Detail */}
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
);

export default PenyakitLeleCards;