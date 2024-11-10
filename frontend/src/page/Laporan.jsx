import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ExcelForm = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      tanggal: "",
      kategoripemasukan	: "",
      hargaAwal: "",
      jumlah: "",
      hargaAkhir: "-",
    },
  ]);
  const [searchQuery, setSearchTerm] = useState("");

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      tanggal: "",
      kategoripemasukan	: "",
      hargaAwal: "",
      jumlah: "",
      hargaAkhir: "-",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleDeleteAllRows = () => {
    setRows([]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === "hargaAwal" || field === "jumlah") {
          const hargaAwal =
            field === "hargaAwal"
              ? parseFloat(value) || 0
              : parseFloat(row.hargaAwal) || 0;
          const jumlah =
            field === "jumlah"
              ? parseFloat(value) || 0
              : parseFloat(row.jumlah) || 0;
          updatedRow.hargaAkhir = hargaAwal * jumlah || "-";
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const totalHargaAkhir = rows.reduce((total, row) => {
    const hargaAkhir = parseFloat(row.hargaAkhir) || 0;
    return total + hargaAkhir;
  }, 0);

  const filteredRows = rows.filter(
    (row) =>
      row.kategoripemasukan	.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) // Optional: add other fields to search here
  );

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="mt-4 px-4">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-xl font-medium">
                Pemasukan Tambak Lele Seger
              </h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Boyolali, Jawa Tengah</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 px-4">
                <span className="text-gray-600">Daftar Tambak :</span>
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
              </div>

              <button className="px-6 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Export Laporan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              Detail Catatan Pengeluaran
            </h2>
            <div className="flex space-x-4">
              {/* Search input */}
              <div className="flex items-center justify-center px-4">
                <div className="relative flex items-center w-full max-w-md">
                  {" "}
                  {/* Mengurangi max-w-3xl menjadi max-w-md */}
                  <input
                    type="text"
                    className="w-full pl-6 pr-12 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg shadow-md transition-all duration-300"
                    placeholder="Search"
                    value={searchQuery}
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
                <span className="text-lg">Baris</span>
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-2 border border-blue-600">No</th>
                  <th className="p-2 border border-blue-600">Tanggal</th>
                  <th className="p-2 border border-blue-600">Kategori Pemasukan</th>
                  <th className="p-2 border border-blue-600">Harga Awal</th>
                  <th className="p-2 border border-blue-600">Jumlah</th>
                  <th className="p-2 border border-blue-600">Harga Jual</th>
                  <th className="p-2 border border-blue-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <td className="p-2 border text-center">{row.id}</td>
                    <td className="p-2 border">
                      <input
                        type="date"
                        className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                        value={row.tanggal}
                        onChange={(e) =>
                          handleInputChange(row.id, "tanggal", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                        value={row.kategoripemasukan	}
                        onChange={(e) =>
                          handleInputChange(
                            row.id,
                            "kategoripemasukan	",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text" // Ubah dari 'number' menjadi 'text' untuk mengizinkan format
                        className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                        value={formatRupiah(row.hargaAwal)} // Format saat ditampilkan
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d]/g, ""); // Hapus karakter non-digit
                          handleInputChange(row.id, "hargaAwal", value);
                        }}
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                        value={row.jumlah}
                        onChange={(e) =>
                          handleInputChange(row.id, "jumlah", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2 border text-center">
                      {row.hargaAkhir !== "-"
                        ? formatRupiah(row.hargaAkhir)
                        : "-"}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 text-right">
            <span className="font-semibold text-lg">
              Total: {formatRupiah(totalHargaAkhir)}
            </span>
          </div>
        </div>
      </div>

      <AIFloatingButton />
    </div>
  );
};

export default ExcelForm;
