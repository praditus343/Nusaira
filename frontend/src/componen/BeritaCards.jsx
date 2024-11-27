import React from 'react';

export const BeritaCards = ({ beritaData }) => {
  if (!beritaData.length) {
    return (
      <p className="text-center text-gray-500">Tidak ada berita yang tersedia.</p>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {beritaData.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded shadow flex flex-col md:flex-row items-start md:items-center p-4 gap-4"
        >
          {/* Gambar Berita */}
          <img
            src={item.image || 'https://via.placeholder.com/150'} 
            alt={item.title || 'Gambar Berita'}
            className="w-78 h-[400px] object-cover rounded"
          />

          {/* Konten Berita */}
          <div className="flex-1">
            {/* Judul */}
            <h3 className="text-2xl font-bold text-black">
              {item.title || 'Judul Tidak Tersedia'}
            </h3>

            {/* Informasi Dasar */}
            <p className="text-sm text-gray-500 mt-2">
              <strong>Tanggal:</strong>{' '}
              {item.date
                ? new Date(item.date).toLocaleDateString()
                : 'Tanggal Tidak Tersedia'}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Penulis:</strong> {item.writer || 'Tidak Diketahui'}
            </p>

            {/* Kutipan */}
            <p className="text-gray-700 mt-2">
              {item.excerpt || 'Tidak ada kutipan.'}
            </p>

            {/* Konten Lengkap */}
            <p className="text-gray-600 text-sm mt-2">
              {item.content ? item.content : 'Konten tidak tersedia.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BeritaCards;