import React, { useState } from "react";
import { MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/SideBar";
import Header from "../componen/Header";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExcelForm = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      tanggal: "",
      KategoriPemasukan: "",
      Jumlah: 0,
      Harga: 0,
      Keterangan: "",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        tanggal: "",
        KategoriPemasukan: "",
        Jumlah: 0,
        Harga: 0,
        Keterangan: "",
      },
    ]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleDeleteAllRows = () => {
    setRows([]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            [field]:
              field === "Jumlah" || field === "Harga"
                ? parseFloat(value.replace(/\./g, "")) || 0  // Remove thousands separators
                : value,
          }
        : row
    );
    setRows(updatedRows);
  };

  const formatNumber = (number) => {
    return number.toLocaleString("id-ID");  // Add thousand separators
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Filter rows based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.KategoriPemasukan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total pemasukan per row (Jumlah * Harga)
  const calculateTotalPemasukan = (row) => {
    return row.Jumlah * row.Harga;
  };

  // Calculate the total pengeluaran for all rows
  const totalPemasukan = rows.reduce(
    (total, row) => total + calculateTotalPemasukan(row),
    0
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Tanggal",
      "Kategori Pemasukan",
      "Jumlah",
      "Harga Per (Kg)",
      "Keterangan",
      "Total Pemasukan",
    ];
    const tableRows = filteredRows.map((row) => [
      row.id,
      row.tanggal,
      row.KategoriPemasukan,
      row.Jumlah,
      formatRupiah(row.Harga),
      row.Keterangan,
      formatRupiah(calculateTotalPemasukan(row)),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    doc.text(
      `Total Pemasukan: ${formatRupiah(totalPemasukan)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("laporan_pemasukan.pdf");
  };

  return (
    <div className="bg-white w-full min-h-screen">
              <Header />
      <div className="mt-4 px-4">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
              <h1 className="text-xl font-medium">
              PemasukanTambak Lele Segar
              </h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Boyolali, Jawa Tengah</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="relative flex items-center">
                <select className="block w-[300px] pr-10 pl-4 border rounded-lg py-2 appearance-none">
                  <option value="kolam1">Lele Segar</option>
                  <option value="kolam2">Lele Jumbo</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>
              <button
                onClick={exportToPDF}
                className="px-6 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Ekspor Laporan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Detail Catatan Pengeluaran</h2>
            <div className="flex space-x-4">
{/* Search input */}
<div className="flex items-center justify-center px-4">
  <div className="relative flex items-center w-full max-w-md"> {/* Mengurangi max-w-3xl menjadi max-w-md */}
    <input
      type="text"
      className="w-full pl-6 pr-12 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg shadow-md transition-all duration-300"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="absolute right-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-2xl transition-all duration-300 ease-in-out shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
</div>
              <button
                onClick={handleAddRow}
                className="flex items-center space-x-1 px-8 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <span className="text-lg font-bold">+</span>
                <span className="text-lg">Catatan</span>
              </button>
              <button
                onClick={handleDeleteAllRows}
                className="px-6 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Hapus Semua
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-2 border border-blue-600">No</th>
                  <th className="p-2 border border-blue-600">Tanggal</th>
                  <th className="p-2 border border-blue-600">Kategori Pemasukan</th>
                  <th className="p-2 border border-blue-600">Jumlah</th>
                  <th className="p-2 border border-blue-600">Harga Per (Kg)</th>
                  <th className="p-2 border border-blue-600">Keterangan</th>
                  <th className="p-2 border border-blue-600">Total Pemasukan</th>
                  <th className="p-2 border border-blue-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="p-2 border text-center">{row.id}</td>
                    <td className="p-2 border">
                      <input
                        type="date"
                        value={row.tanggal}
                        onChange={(e) => handleInputChange(row.id, "tanggal", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.KategoriPemasukan}
                        onChange={(e) => handleInputChange(row.id, "KategoriPemasukan", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={formatNumber(row.Jumlah)} // Format with thousand separators
                        onChange={(e) => handleInputChange(row.id, "Jumlah", e.target.value.replace(/\./g, ""))} // Clean thousands separators
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={formatRupiah(row.Harga)}
                        onChange={(e) => handleInputChange(row.id, "Harga", e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.Keterangan}
                        onChange={(e) => handleInputChange(row.id, "Keterangan", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border text-center">
                      {formatRupiah(calculateTotalPemasukan(row))}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
              <div className="flex flex-col items-end">
                <span className="text-lg font-medium">Total Pemasukan:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatRupiah(totalPemasukan)}
                </span>
              </div>
              <div />
            </div>
            <div className="mt-4 flex justify-end items-end w-full">
  <button
    onClick={() => alert("Data saved!")}  // Add your save functionality here
    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
  >
    Simpan
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

function Pemasukan() {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <ExcelForm />
          <AIFloatingButton />
          <Footer />
        </div>
      </div>
    );
  }
  
  export default Pemasukan;
  
