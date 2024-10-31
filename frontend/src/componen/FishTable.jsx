import React from 'react';

const FishTable = () => {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 text-left">Kolam</th>
            <th className="p-3 text-left">Umur</th>
            <th className="p-3 text-left">Tgl Tebar</th>
            <th className="p-3 text-left">Tgl Selesai</th>
            <th className="p-3 text-left">Tebaran</th>
            <th className="p-3 text-left">FCR</th>
            <th className="p-3 text-left">ADG</th>
            <th className="p-3 text-left">MBW</th>
            <th className="p-3 text-left">Size</th>
            <th className="p-3 text-left">Panen</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="bg-blue-50">
              {/* Replace with actual data */}
              <td className="p-3">A {i + 1}</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
              <td className="p-3">-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FishTable;
