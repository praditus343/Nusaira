import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
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

const PengeluaranTable = ({ rows, onDelete, formatRupiah }) => (
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
          <tr key={row.id} className="bg-blue-50 hover:bg-blue-100 transition-colors">
            <td className="p-2 border text-center border-gray-300">{index + 1}</td>
            <td className="p-2 border border-gray-300">{row.date}</td>
            <td className="p-2 border border-gray-300">{row.jenis_pengeluaran}</td>
            <td className="p-2 border border-gray-300">{row.nama_barang}</td>
            <td className="p-2 border border-gray-300">{row.catatan}</td>
            <td className="p-2 border border-gray-300">{row.status}</td>
            <td className="p-2 border border-gray-300">{formatRupiah(row.sisa_tagihan)}</td>
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

const PengeluaranForm = ({ onSave, formatRupiah, isLoading, error, tambaks, selectedTambak, setSelectedTambak }) => {
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
      const cleanValue = value.replace(/[^0-9]/g, '');
      value = cleanValue ? Number(cleanValue) : 0;
    }
    setNewRow(prevRow => ({ ...prevRow, [field]: value }));
  };

  const handleSave = async () => {
    if (!newRow.jenis_pengeluaran.trim() || !newRow.nama_barang.trim() || !selectedTambak) {
      alert("Semua field harus diisi dengan benar");
      return;
    }

    try {
      await onSave({ ...newRow, tambak_id: selectedTambak });
      setNewRow({
        date: new Date().toISOString().split('T')[0],
        jenis_pengeluaran: "",
        nama_barang: "",
        catatan: "",
        status: "belum",
        sisa_tagihan: 0,
      });
      setSelectedTambak("");
    } catch (err) {
      console.error("Error in handleSave:", err);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-800">Tambah Catatan Pengeluaran</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <label htmlFor="tambak" className="block text-gray-700 font-medium mb-2">
            Tambak
          </label>
          <div className="relative">
            <select
              id="tambak"
              value={selectedTambak}
              onChange={(e) => setSelectedTambak(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-500 appearance-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Tanggal</label>
          <input
            type="date"
            id="date"
            value={newRow.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="jenis_pengeluaran" className="block text-gray-700 font-medium mb-2">Jenis Pengeluaran</label>
          <input
            type="text"
            id="jenis_pengeluaran"
            value={newRow.jenis_pengeluaran}
            onChange={(e) => handleInputChange("jenis_pengeluaran", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-500"
            placeholder="Contoh: Pakan"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="status"
            className="block text-gray-700 font-medium mb-2"
          >
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              value={newRow.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-500 appearance-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="belum">Belum Lunas</option>
              <option value="lunas">Lunas</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="catatan" className="block text-gray-700 font-medium mb-2">Catatan</label>
          <input
            type="text"
            id="catatan"
            value={newRow.catatan}
            onChange={(e) => handleInputChange("catatan", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-500 placeholder-gray-700"
            placeholder="Catatan tambahan"
          />
        </div>
        <div>
          <label htmlFor="nama_barang" className="block text-gray-700 font-medium mb-2">Nama Barang</label>
          <input
            type="text"
            id="nama_barang"
            value={newRow.nama_barang}
            onChange={(e) => handleInputChange("nama_barang", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-500"
            placeholder="Contoh: Pakan Lele"
            required
          />
        </div>
        <div>
          <label htmlFor="sisa_tagihan" className="block text-gray-700 font-medium mb-2">Sisa Tagihan</label>
          <input
            type="text"
            id="sisa_tagihan"
            value={formatRupiah(newRow.sisa_tagihan)}
            onChange={(e) => handleInputChange("sisa_tagihan", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-500"
            placeholder="Nominal"
          />
        </div>
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
    fetchPengeluaran();
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
  

  const handleTambakChange = (e) => {
    const id = e.target.value;
    setSelectedTambakId(id);
    const selectedTambak = tambaks.find(tambak => tambak.id === id);
    setTambakData(selectedTambak);
  };

  const fetchPengeluaran = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://nusaira-be.vercel.app/api/pengeluaran');
      setRows(response.data.map(item => ({
        ...item,
        date: item.date.split("T")[0],
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
          await axios.delete(`https://nusaira-be.vercel.app/api/pengeluaran/${id}`);
          setRows(rows.filter((row) => row.id !== id));
  
          Swal.fire({
            title: "Terhapus!",
            text: "Data berhasil dihapus.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
  
          setError(null);
        } catch (error) {
          console.error("Error deleting pengeluaran:", error);
  
          Swal.fire({
            title: "Gagal!",
            text: "Data gagal dihapus. Silakan coba lagi.",
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
        jenis_pengeluaran: newRow.jenis_pengeluaran.trim(),
        nama_barang: newRow.nama_barang.trim(),
        catatan: newRow.catatan.trim(),
        status: newRow.status,
        sisa_tagihan: Number(newRow.sisa_tagihan),
        tambak_id: selectedTambakId,
      };

      const response = await axios.post('https://nusaira-be.vercel.app/api/pengeluaran', requestData);
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
      row.jenis_pengeluaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPengeluaran = rows.reduce((total, row) => total + (parseFloat(row.sisa_tagihan) || 0), 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error){
    return <Error404Page/>
  }

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
          <PengeluaranForm
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



const Pengeluaran = () => {
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

export default Pengeluaran;