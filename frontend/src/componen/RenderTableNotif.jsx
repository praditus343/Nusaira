import React from 'react';

const RendaTableNotif = ({ notifikasiData }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Notifikasi</h2>
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Judul</th>
            <th className="py-2 px-4 text-left">Deskripsi</th>
            <th className="py-2 px-4 text-left">Jenis</th>
            <th className="py-2 px-4 text-left">Tanggal</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {notifikasiData.map((item, index) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.judul}</td>
              <td className="py-2 px-4">{item.deskripsi}</td>
              <td className="py-2 px-4">{item.jenis}</td>
              <td className="py-2 px-4">
                {new Date(item.tanggal).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.status === 'Baru' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RendaTableNotif;