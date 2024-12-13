import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import AIFloatingButton from "../componen/AiFloatingButton";
import Sidebar from "../componen/SideBar";
import Header from "../componen/Header";
import Footer from "../componen/Footer";
import Swal from "sweetalert2";
import Error404Page from "../componen/ErrorPage";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
</div>

);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

const PemasukanTable = ({ rows, onDelete, formatRupiah }) => (
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
        {rows.map((row, index) => (
          <tr key={row.id} className="bg-blue-50 hover:bg-blue-100 transition-colors">
            <td className="p-2 border text-center border-gray-300">{index + 1}</td>
            <td className="p-2 border border-gray-300">{row.date}</td>
            <td className="p-2 border border-gray-300">{row.kategori}</td>
            <td className="p-2 border border-gray-300">{row.jumlah.toLocaleString("id-ID")}</td>
            <td className="p-2 border border-gray-300">{formatRupiah(row.harga)}</td>
            <td className="p-2 border border-gray-300">{row.keterangan}</td>
            <td className="p-2 border border-gray-300">{formatRupiah(row.jumlah * row.harga)}</td>
            <td className="p-2 border border-gray-300 text-center">
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

const PemasukanForm = ({ onSave, formatRupiah, isLoading, error, tambaks, selectedTambak, setSelectedTambak }) => {
  const [newRow, setNewRow] = useState({
    date: new Date().toISOString().split('T')[0],
    kategori: "",
    jumlah: 0,
    harga: 0,
    keterangan: "",
  });

  const handleInputChange = (field, value) => {
    if (field === "jumlah" || field === "harga") {
      const cleanValue = value.replace(/[^0-9]/g, '');
      value = cleanValue ? Number(cleanValue) : 0;
    }
    setNewRow(prevRow => ({ ...prevRow, [field]: value }));
  };

  const handleSave = async () => {
    const { kategori, jumlah, harga } = newRow;

    if (!kategori.trim() || jumlah <= 0 || harga <= 0 || !selectedTambak) {
      alert("Semua field harus diisi dengan benar.");
      return;
    }

    try {
      await onSave({ ...newRow, tambak_id: selectedTambak });
      setNewRow({
        date: new Date().toISOString().split('T')[0],
        kategori: "",
        jumlah: 0,
        harga: 0,
        keterangan: "",
      });
      setSelectedTambak("");
    } catch (err) {
      console.error("Error in handleSave:", err);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Tambah Catatan Pemasukan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <label
            htmlFor="tambak"
            className="block text-gray-700 font-medium mb-2"
          >
            Tambak
          </label>
          <div className="relative">
            <select
              id="tambak"
              value={selectedTambak}
              onChange={(e) => setSelectedTambak(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-500 appearance-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                Pilih Tambak
              </option>
              {tambaks.map((tambak) => (
                <option key={tambak.id} value={tambak.id}>
                  {tambak.nama}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>
        </div>

        {["date", "kategori", "jumlah", "harga", "keterangan"].map((field, index) => (
          <div key={index}>
            <label htmlFor={field} className="block text-gray-700 font-medium mb-2">
              {field === "date" ? "Tanggal" : field === "kategori" ? "Kategori Pemasukan" : field === "jumlah" ? "Jumlah" : field === "harga" ? "Harga Per (Kg)" : "Keterangan"}
            </label>
            {field === "date" ? (
              <input
                type="date"
                id="date"
                value={newRow.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-500"
              />
            ) : (
              <input
                type="text"
                id={field}
                value={field === "harga" ? formatRupiah(newRow.harga) : newRow[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-500"
                placeholder={field === "kategori" ? "Contoh: Penjualan Lele" : "Masukkan " + field}
                required
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-blue-600'} text-white rounded-md transition-colors`}
      >
        {isLoading ? 'Menyimpan...' : 'Simpan'}
      </button>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

const TambakHeader = ({ tambakData, selectedTambakId, handleTambakChange, tambakList }) => {
  return (
    <div className="mt-4 ml-6">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium">{tambakData?.nama || 'Loading...'}</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{tambakData?.provinsi || 'Loading...'}</span>
              <span>{tambakData?.kabupaten || 'Loading...'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-2">
            <div className="flex items-center space-x-2 px-4">
              <span className="text-gray-600">Daftar Tambak :</span>
              <div className="relative items-center">
                <select
                  className="block w-[300px] pr-8 pl-4 border rounded-lg py-2 appearance-none"
                  value={selectedTambakId || ''}
                  onChange={handleTambakChange}
                >
                  <option value="" disabled>Pilih Tambak</option>
                  {tambakList.map(tambak => (
                    <option key={tambak.id} value={tambak.id}>
                      {tambak.nama}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExcelForm = () => {
  const [rows, setRows] = useState([]);
  const [tambaks, setTambaks] = useState([]);
  const [tambakData, setTambakData] = useState(null);
  const [selectedTambakId, setSelectedTambakId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPemasukan();
    fetchTambaks();
  }, []);

  const fetchTambaks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://nusaira-be.vercel.app/api/tambak', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTambaks(response.data);
      if (response.data.length > 0) {
        setSelectedTambakId(response.data[0].id);
        setTambakData(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching tambaks:", error);
      setError("Gagal mengambil data tambak. Silakan coba lagi.");
    }
  };

  const fetchPemasukan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://nusaira-be.vercel.app/api/pemasukan');
      setRows(response.data.map(item => ({
        ...item,
        date: item.date.split("T")[0],
      })));
      setError(null);
    } catch (error) {
      console.error("Error fetching pemasukan data:", error);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error){
    return <Error404Page/>
  }



  const handleTambakChange = (e) => {
    const id = e.target.value;
    setSelectedTambakId(id);
    const selectedTambak = tambaks.find(tambak => tambak.id === id);
    setTambakData(selectedTambak);
  };

  const handleDeleteRow = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await axios.delete(`https://nusaira-be.vercel.app/api/pemasukan/${id}`);
          setRows(rows.filter((row) => row.id !== id));
          Swal.fire({
            title: "Terhapus!",
            text: "Data pemasukan berhasil dihapus.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
  
          setError(null);
        } catch (error) {
          console.error("Error deleting pemasukan:", error);
          Swal.fire({
            title: "Gagal!",
            text: "Data pemasukan gagal dihapus. Silakan coba lagi.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
  
          setError("Gagal menghapus data. Silakan coba lagi.");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleSaveNewRow = async (newRow) => {
    try {
      setIsLoading(true);
      const requestData = {
        date: newRow.date,
        kategori: String(newRow.kategori).trim(),
        jumlah: Number(newRow.jumlah),
        harga: Number(newRow.harga),
        keterangan: String(newRow.keterangan || "").trim(),
        total: newRow.jumlah * newRow.harga,
        tambak_id: selectedTambakId,
      };

      const response = await axios.post('https://nusaira-be.vercel.app/api/pemasukan', requestData);
      setRows(prevRows => [...prevRows, { ...requestData, id: response.data.id }]);
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat memproses data.");
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
      row.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPemasukan = rows.reduce((total, row) => total + (row.jumlah * row.harga), 0);

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <TambakHeader
        tambakData={tambakData}
        selectedTambakId={selectedTambakId}
        handleTambakChange={handleTambakChange}
        tambakList={tambaks}
      />
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Detail Catatan Pemasukan</h2>
            <div className="flex space-x-4">
              <div className="relative w-full max-w-md">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-12 py-2 rounded-2xl border border-blue-500 focus:outline-none"
                  placeholder="Cari Kategori Pemasukan atau Keterangan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

          </div>

          <PemasukanForm
            onSave={handleSaveNewRow}
            formatRupiah={formatRupiah}
            isLoading={isLoading}
            error={error}
            tambaks={tambaks}
            selectedTambak={selectedTambakId}
            setSelectedTambak={setSelectedTambakId}
          />

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          <PemasukanTable
            rows={filteredRows}
            onDelete={handleDeleteRow}
            formatRupiah={formatRupiah}
          />

          <div className="mt-4 flex justify-end">
            <div className="flex flex-col items-end">
              <span className="text-lg font-medium">Total Pemasukan:</span>
              <span className="text-xl font-bold text-green-600">
                {formatRupiah(totalPemasukan)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pemasukan = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ExcelForm />
        <AIFloatingButton />
        <div className="mt-20">
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Pemasukan;