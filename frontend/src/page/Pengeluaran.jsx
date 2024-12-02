import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/SideBar";
import Header from "../componen/Header";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-5 rounded-lg flex flex-col items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      <p className="mt-3 text-gray-700">Menyimpan data...</p>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

const PengeluaranTable = ({ rows, onDelete, formatRupiah }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2 border border-blue-600">No</th>
            <th className="p-2 border border-blue-600">Tanggal</th>
            <th className="p-2 border border-blue-600">Jenis Pengeluaran</th>
            <th className="p-2 border border-blue-600">Nama Barang</th>
            <th className="p-2 border border-blue-600">Catatan</th>
            <th className="p-2 border border-blue-600">Status</th>
            <th className="p-2 border border-blue-600">Sisa Tagihan</th>
            <th className="p-2 border border-blue-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || `row-${index}`} className="bg-blue-50 hover:bg-blue-100 transition-colors">
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border">{row.date}</td>
              <td className="p-2 border">{row.jenis_pengeluaran}</td>
              <td className="p-2 border">{row.nama_barang}</td>
              <td className="p-2 border">{row.catatan}</td>
              <td className="p-2 border">{row.status}</td>
              <td className="p-2 border">{formatRupiah(row.sisa_tagihan)}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => onDelete(row.id)}
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
  );
};

const PengeluaranForm = ({ onSave, formatRupiah, isLoading, error }) => {
  const [newRow, setNewRow] = useState({
    date: new Date().toISOString().split('T')[0],
    jenis_pengeluaran: "",
    nama_barang: "",
    catatan: "",
    status: "belum",
    sisa_tagihan: 0,
  });

  const handleInputChange = (field, value) => {
    if (field === "sisa_tagihan") {
      // Hapus semua karakter non-numerik dan konversi ke number
      const cleanValue = value.toString().replace(/[^0-9]/g, '');
      value = cleanValue ? Number(cleanValue) : 0;
    }
    
    setNewRow(prevRow => ({
      ...prevRow,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!newRow.jenis_pengeluaran.trim()) {
      alert("Jenis pengeluaran harus diisi");
      return;
    }

    if (!newRow.nama_barang.trim()) {
      alert("Nama barang harus diisi");
      return;
    }

    try {
      await onSave(newRow);
      
      if (!error) {
        setNewRow({
          date: new Date().toISOString().split('T')[0],
          jenis_pengeluaran: "",
          nama_barang: "",
          catatan: "",
          status: "belum",
          sisa_tagihan: 0,
        });
      }
    } catch (err) {
      console.error("Error in handleSave:", err);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-800">Tambah Catatan Pengeluaran</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Tanggal
          </label>
          <input
            type="date"
            id="date"
            value={newRow.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="jenis_pengeluaran" className="block text-gray-700 font-medium mb-2">
            Jenis Pengeluaran
          </label>
          <input
            type="text"
            id="jenis_pengeluaran"
            value={newRow.jenis_pengeluaran}
            onChange={(e) => handleInputChange("jenis_pengeluaran", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Contoh: Pakan"
            required
          />
        </div>
        <div>
          <label htmlFor="nama_barang" className="block text-gray-700 font-medium mb-2">
            Nama Barang
          </label>
          <input
            type="text"
            id="nama_barang"
            value={newRow.nama_barang}
            onChange={(e) => handleInputChange("nama_barang", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Contoh: Pakan Lele"
            required
          />
        </div>
        <div>
          <label htmlFor="catatan" className="block text-gray-700 font-medium mb-2">
            Catatan
          </label>
          <input
            type="text"
            id="catatan"
            value={newRow.catatan}
            onChange={(e) => handleInputChange("catatan", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Catatan tambahan"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={newRow.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="belum">Belum Lunas</option>
            <option value="lunas">Lunas</option>
          </select>
        </div>
        <div>
          <label htmlFor="sisa_tagihan" className="block text-gray-700 font-medium mb-2">
            Sisa Tagihan
          </label>
          <input
            type="text"
            id="sisa_tagihan"
            value={formatRupiah(newRow.sisa_tagihan)}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              handleInputChange("sisa_tagihan", Number(value) || 0);
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Nominal"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-blue-600'
        } text-white rounded-md transition-colors`}
      >
        {isLoading ? 'Menyimpan...' : 'Simpan'}
      </button>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
const ExcelForm = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    fetchPengeluaran();
  }, []);
 
  const fetchPengeluaran = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://nusaira-be.vercel.app/api/pengeluaran');
      setRows(response.data.map(item => ({
        ...item,
        date: item.date.split("T")[0],
        id: item.id || Date.now() + Math.random().toString(36).substring(2, 10),
      })));
      setError(null);
    } catch (error) {
      console.error("Error fetching pengeluaran data:", error);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleDeleteRow = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    try {
      setIsLoading(true);
      await axios.delete(`https://nusaira-be.vercel.app/api/pengeluaran/${id}`);
      setRows(rows.filter(row => row.id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting pengeluaran:", error);
      setError("Gagal menghapus data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleSaveNewRow = async (newRow) => {
    try {
      setIsLoading(true);
  
      const requestData = {
        date: newRow.date,
        jenis_pengeluaran: String(newRow.jenis_pengeluaran).trim(),
        nama_barang: String(newRow.nama_barang).trim(),
        catatan: String(newRow.catatan || "").trim(),
        status: newRow.status,
        sisa_tagihan: Number(newRow.sisa_tagihan)
      };
  
      // Simpan data ke state terlebih dahulu
      const tempId = Date.now();
      setRows(prevRows => [...prevRows, { ...requestData, id: tempId }]);
  
      // Coba kirim ke server
      try {
        const response = await axios.post(
          'https://nusaira-be.vercel.app/api/pengeluaran',
          requestData,
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
          }
        );
  
        if (response.data) {
          // Update ID dengan yang dari server
          setRows(prevRows => prevRows.map(row => 
            row.id === tempId ? { ...row, id: response.data.id } : row
          ));
        }
      } catch (serverError) {
        console.error("Server error:", serverError);
        // Tetap tampilkan data meski gagal simpan ke server
        setError("Data ditampilkan tapi belum tersimpan di server. Akan dicoba simpan kembali nanti.");
      }
  
      return true;
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat memproses data.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteAllRows = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus semua data?")) return;
    
    try {
      setIsLoading(true);
      await axios.delete('https://nusaira-be.vercel.app/api/pengeluaran');
      setRows([]);
      setError(null);
    } catch (error) {
      console.error("Error deleting all pengeluaran:", error);
      setError("Gagal menghapus semua data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
 
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };
 
  const filteredRows = rows.filter(
    (row) =>
      row.jenis_pengeluaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const totalPengeluaran = rows.reduce((total, row) => {
    return total + (parseFloat(row.sisa_tagihan) || 0);
  }, 0);
 
  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="mt-4 px-4">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-xl font-medium">Pengeluaran Tambak Lele Segar</h1>
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Detail Catatan Pengeluaran</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                className="w-full max-w-md pl-6 pr-12 py-2 rounded-2xl border border-gray-300"
                placeholder="Cari Jenis Pengeluaran atau Nama Barang"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleDeleteAllRows}
                disabled={isLoading}
                className={`px-6 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Hapus Semua
              </button>
            </div>
          </div>
 
          <PengeluaranForm 
            onSave={handleSaveNewRow} 
            formatRupiah={formatRupiah} 
            isLoading={isLoading}
            error={error}
          />
 
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
 
          <PengeluaranTable 
            rows={filteredRows} 
            onDelete={handleDeleteRow} 
            formatRupiah={formatRupiah} 
          />
 
          <div className="mt-4 flex justify-end">
            <div className="flex flex-col items-end">
              <span className="text-lg font-medium">Total Pengeluaran:</span>
              <span className="text-xl font-bold text-green-600">
                {formatRupiah(totalPengeluaran)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 };
 
 function Pengeluaran() {
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
 
 export default Pengeluaran;