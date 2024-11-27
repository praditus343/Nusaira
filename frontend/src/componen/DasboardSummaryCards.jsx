import React from 'react';

export const DashboardSummaryCards = ({ 
  beritaData, 
  penyakitData, 
  pesanData, 
  notifikasiData 
}) => (
  <div className="grid grid-cols-4 gap-4 p-4">
    <div className="bg-blue-600 text-white p-4 rounded shadow">
      <h3 className="font-bold text-xl">Total Berita</h3>
      <p className="text-3xl">{beritaData.length}</p>
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
      <p className="text-3xl">
        {notifikasiData.filter(notif => notif.status === 'Baru').length}
      </p>
    </div>
  </div>
);

export default DashboardSummaryCards;