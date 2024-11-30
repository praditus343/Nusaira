import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/SideBar";
import Header from "../componen/Header";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // Tambahkan import axios

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
        date: item.date.split("T")[0], // Mengambil hanya bagian tanggal
        id: item.id || Date.now() + Math.random(),
      })));
    } catch (error) {
      console.error("Error fetching pengeluaran data:", error);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddRow = () => {
    const newRow = {
      id: Date.now() + Math.random(), // Tambahkan ID unik
      date: new Date().toISOString().split('T')[0],
      jenis_pengeluaran: "",
      nama_barang: "",
      catatan: "",
      status: "belum",
      sisa_tagihan: 0,
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    try {
      // Cek apakah row sudah tersimpan di backend (memiliki ID)
      if (id) {
        await axios.delete(`https://nusaira-be.vercel.app/api/pengeluaran/${id}`);
      }
      
      // Hapus dari state lokal
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error("Error deleting pengeluaran:", error);
      setError("Gagal menghapus data. Silakan coba lagi.");
    }
  };

  const handleDeleteAllRows = () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus semua data?")) return;
    setRows([]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row => 
      row.id === id 
        ? {
            ...row, 
            [field]: field === 'sisa_tagihan' 
              ? parseFloat(value.replace(/[^0-9]/g, '')) || 0 
              : value
          } 
        : row
    );
    setRows(updatedRows);
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

  const handleSubmit = async () => {
    // Validasi data sebelum submit
    const invalidRows = rows.filter(row => 
      !row.date || 
      !row.jenis_pengeluaran || 
      !row.nama_barang || 
      !row.catatan || 
      !row.status || 
      row.sisa_tagihan <= 0
    );

    if (invalidRows.length > 0) {
      setError('Pastikan semua kolom terisi dengan benar');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Kirim data yang sudah divalidasi
      const dataToSend = rows.map(row => ({
        date: row.date,
        jenis_pengeluaran: row.jenis_pengeluaran,
        nama_barang: row.nama_barang,
        catatan: row.catatan,
        status: row.status,
        sisa_tagihan: row.sisa_tagihan
      }));

      const response = await axios.post('https://nusaira-be.vercel.app/api/pengeluaran', dataToSend);
      
      alert("Data berhasil disimpan!");
      fetchPengeluaran(); // Refresh data setelah submit
    } catch (error) {
      console.error("Error saving pengeluaran:", error);
      setError(error.response?.data?.message || "Gagal menyimpan data. Silakan coba lagi.");
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
                  <th className="p-2 border border-blue-600">Jenis Pengeluaran</th>
                  <th className="p-2 border border-blue-600">Nama Barang</th>
                  <th className="p-2 border border-blue-600">Catatan</th>
                  <th className="p-2 border border-blue-600">Status</th>
                  <th className="p-2 border border-blue-600">Sisa Tagihan</th>
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
                        value={row.date}
                        onChange={(e) => handleInputChange(row.id, "date", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.jenis_pengeluaran}
                        onChange={(e) => handleInputChange(row.id, "jenis_pengeluaran", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Contoh: Pakan"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.nama_barang}
                        onChange={(e) => handleInputChange(row.id, "nama_barang", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Contoh: Pakan Lele"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={row.catatan}
                        onChange={(e) => handleInputChange(row.id, "catatan", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Catatan tambahan"
                      />
                    </td>
                    <td className="p-2 border">
                      <select
                        value={row.status}
                        onChange={(e) => handleInputChange(row.id, "status", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      >
                        <option value="belum">Belum Lunas</option>
                        <option value="lunas">Lunas</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={formatRupiah(row.sisa_tagihan)}
                        onChange={(e) => handleInputChange(row.id, "sisa_tagihan", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Nominal"
                      />
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

            <div className="mt-4 flex justify-end">
              <div className="flex flex-col items-end">
                <span className="text-lg font-medium">Total Pengeluaran:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatRupiah(totalPengeluaran)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
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