import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/Sidebar";
import Header from "../componen/Header";
import Footer from "../componen/Footer";

const ExcelForm = () => {
  const [rows, setRows] = useState([]);
  const [tambaks, setTambaks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tambakResponse = await axios.get('https://nusaira-be.vercel.app/api/tambak');
        setTambaks(tambakResponse.data);

        const pemasukanResponse = await axios.get('https://nusaira-be.vercel.app/api/pemasukan');
        setRows(pemasukanResponse.data.map(item => ({
          ...item,
          id: item.id || Date.now() + Math.random(),
        })));
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError('Gagal mengambil data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRow = () => {
    setRows(prevRows => [
      ...prevRows,
      {
        id: Date.now() + Math.random(),
        date: "",
        kategori: "",
        jumlah: 0,
        harga: 0,
        keterangan: "",
        total: 0,
        tambak_id: tambaks.length > 0 ? tambaks[0].id : "", // Default to first tambak if available
      },
    ]);
  };

  const handleDeleteRow = (id) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const handleDeleteAllRows = () => {
    setRows([]);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Mengambil bagian 'yyyy-MM-dd'
};

const handleInputChange = (id, field, value) => {
  const updatedRows = rows.map(row => {
      if (row.id === id) {
          const updatedRow = {
              ...row,
              [field]: field === "jumlah" || field === "harga"
                  ? parseFloat(value.replace(/\./g, "")) || 0 // Menghapus titik dan mengubah menjadi float
                  : field === "date"
                      ? value ? formatDate(value) : "" // Memastikan format tanggal yang benar
                      : value
          };

          // Hitung total baru
          updatedRow.total = calculateTotalPemasukan(updatedRow);
          return updatedRow;
      }
      return row;
  });
  setRows(updatedRows);
};
  const formatNumber = (number) => {
    return number.toLocaleString("id-ID");
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const filteredRows = rows.filter(row =>
    row.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalPemasukan = (row) => {
    if (row.jumlah > 0 && row.harga > 0) {
        return row.jumlah * row.harga;
    }
    return 0; // Menghindari NaN
};

  const totalPemasukan = rows.reduce((total, row) => total + calculateTotalPemasukan(row), 0);

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
    const tableRows = filteredRows.map((row, index) => [
      index + 1,
      row.date,
      row.kategori,
      formatNumber(row.jumlah),
      formatRupiah(row.harga),
      row.keterangan,
      formatRupiah(calculateTotalPemasukan(row)),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    doc.text(`Total Pemasukan: ${formatRupiah(totalPemasukan)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("laporan_pemasukan.pdf");
  };

  const handleSubmit = async () => {
    const isValid = rows.every(row => {
      if (!row.date) console.log("Tanggal kosong");
      if (!row.kategori) console.log("Kategori kosong");
      if (row.jumlah <= 0) console.log("Jumlah tidak valid");
      if (row.harga <= 0) console.log("Harga tidak valid");
      if (!row.keterangan) console.log("Keterangan kosong");
      if (row.total <= 0) console.log("Total tidak valid");
      if (!row.tambak_id) console.log("ID tambak kosong");
    
      return row.date && 
             row.kategori && 
             row.jumlah > 0 && 
             row.harga > 0 && 
             row.keterangan &&
             row.total > 0 &&
             row.tambak_id;
    });
    
    if (!isValid) {
      setError('Semua kolom harus diisi dengan benar sebelum menyimpan.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const dataToSend = rows.map(row => ({
        date: row.date,
        kategori: row.kategori,
        jumlah: row.jumlah,
        harga: row.harga,
        keterangan: row.keterangan,
        total: calculateTotalPemasukan(row), // Hitung total di sini
        tambak_id: row.tambak_id,
    }));

      await axios.post('https://nusaira-be.vercel.app/api/pemasukan', { data: dataToSend });
      alert('Data berhasil disimpan!');
      setRows([]); 
    } catch (err) {
      console.error('Error saving data:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="mt-4 px-4">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-xl font-medium">Pemasukan Tambak Lele Segar</h1>
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

      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Detail Catatan Pemasukan</h2>
            <div className="flex space-x-4">
              <div className="flex items-center justify-center px-4">
                <div className="relative flex items-center w-full max-w-md">
                  <input
                    type="text"
                    className="w-full pl-6 pr-12 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg shadow-md transition-all duration-300"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="absolute right-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-2xl transition-all duration-300 ease-in-out shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  <th className="p-2 border border-blue-600">Tambak</th>
                  <th className="p-2 border border-blue-600">Total Pemasukan</th>
                  <th className="p-2 border border-blue-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={row.id} className="bg-blue-50 hover:bg-blue-100 transition-colors">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">
                    <input
    type="date"
    value={formatDate(row.date)} // Pastikan ini dalam format yyyy-MM-dd
    onChange={(e) => handleInputChange(row.id, "date", e.target.value)}
    className="w-full px-4 py-2 rounded-lg border border-gray-300"
/>
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.kategori}
                        onChange={(e) => handleInputChange(row.id, "kategori", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={formatNumber(row.jumlah)}
                        onChange={(e) => handleInputChange(row.id, "jumlah", e.target.value.replace(/\./g, ""))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={formatRupiah(row.harga)}
                        onChange={(e) => handleInputChange(row.id, "harga", e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.keterangan}
                        onChange={(e) => handleInputChange(row.id, "keterangan", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <select
                        value={row.tambak_id}
                        onChange={(e) => handleInputChange(row.id, "tambak_id", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      >
                        {tambaks.map(tambak => (
                          <option key={tambak.id} value={tambak.id}>
                            {tambak.nama}
                          </option>
                        ))}
                      </select>
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
          </div>

          <div className="mt-4 flex justify-end items-end w-full">
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Simpan
            </button>
          </div>

          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
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

export default Pemasukan; //push