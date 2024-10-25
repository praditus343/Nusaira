// src/components/TablePengeluaran.js
import React from 'react';

const TablePengeluaran = () => {
  const rows = Array(6).fill({
    tanggal: '-',
    namaBarang: '-',
    hargaAwal: '-',
    jumlah: '-',
    hasilAkhir: '-',
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">Tanggal</th>
            <th className="p-3 text-left">Nama Barang</th>
            <th className="p-3 text-left">Harga Awal</th>
            <th className="p-3 text-left">Jumlah</th>
            <th className="p-3 text-left">Hasil Akhir</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="even:bg-blue-100 odd:bg-white">
              <td className="p-3">{row.tanggal}</td>
              <td className="p-3">{row.namaBarang}</td>
              <td className="p-3">{row.hargaAwal}</td>
              <td className="p-3">{row.jumlah}</td>
              <td className="p-3">{row.hasilAkhir}</td>
            </tr>
          ))}
          <tr className="bg-blue-600 text-white font-semibold">
            <td colSpan="4" className="p-3 text-right">Total Pengeluaran:</td>
            <td className="p-3">Rp.10,500,000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePengeluaran;
