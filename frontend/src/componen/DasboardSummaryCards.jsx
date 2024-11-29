import React from 'react';

export const DashboardSummaryCards = ({ 
  beritaData, 
  penyakitData, 
  pesanData, 
  notifikasiData 
}) => {
  const safeLength = (data) => {
    if (data && Array.isArray(data.berita)) {
      return data.berita.length;
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="bg-blue-600 text-white p-4 rounded shadow">
        <h3 className="font-bold text-xl">Total Berita</h3>
        <p className="text-3xl">{safeLength(beritaData)}</p>
      </div>
      <div className="bg-blue-600 text-white p-4 rounded shadow">
        <h3 className="font-bold text-xl">Total Penyakit</h3>
        <p className="text-3xl">{penyakitData.length}</p>
      </div>
      <div className="bg-blue-600 text-white p-4 rounded shadow">
        <h3 className="font-bold text-xl">Pesan Masuk</h3>
        <p className="text-3xl">{pesanData.length}</p>
      </div>
      <div className="bg-blue-600 text-white p-4 rounded shadow">
        <h3 className="font-bold text-xl">Notifikasi Baru</h3>
        <p className="text-3xl">{notifikasiData.length}</p>
      </div>
    </div>
  );
};

export default DashboardSummaryCards;
