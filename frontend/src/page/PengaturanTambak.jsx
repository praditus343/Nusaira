import React, { useState, useEffect } from "react";
import { PenSquare, X, Save } from "lucide-react";
import Swal from "sweetalert2";
import AIFloatingButton from "../componen/AiFloatingButton";
import { Card, CardContent } from "../componen/CardManagement";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import { useNavigate } from "react-router-dom";
import { Droplet } from 'lucide-react';
import Error404Page from "../componen/ErrorPage";
import axios from 'axios';


const InfoCard = ({ title, value, subValue, buttonText, onClick }) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm mb-4">{title}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-blue-500 mb-2">{value}</p>
          {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </CardContent>
  </Card>
);

const InfoCard2 = ({ title, value, subValue, buttonText, onClick }) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm text-gray-800 mb-3">{title}</h3>
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-3xl font-bold text-blue-500 flex items-center">
            <Droplet className="mr-2 w-10 h-10 text-blue-500" /> {value}
          </p>
          {subValue && <p className="text-sm text-gray-600 mt-2">{subValue}</p>}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </CardContent>
  </Card>
);

const TambakProfile = ({ tambakData, onUpdateTambak, onDeleteTambak }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (tambakData) {
      setEditedData({
        nama: tambakData.nama || '',
        negara: tambakData.negara || '',
        provinsi: tambakData.provinsi || '',
        kabupaten: tambakData.kabupaten || '',
        alamat: tambakData.alamat || ''
      });
    }
  }, [tambakData]);

  const getZonaWaktu = (provinsi) => {
    const zonaWilayah = {
      'JAWA TENGAH': 'WIB',
      'JAWA BARAT': 'WIB',
      'DKI JAKARTA': 'WIB',
      'JAWA TIMUR': 'WIB',
      'BALI': 'WITA',
      'SUMATERA UTARA': 'WIB',
      'KALIMANTAN TENGAH': 'WITA',
      'SULAWESI SELATAN': 'WITA',
      'PAPUA': 'WIT'
    };
    return zonaWilayah[provinsi.toUpperCase()] || 'WIB';
  };

  const hitungTotalLahan = (kolam) => {
    if (!kolam || kolam.length === 0) return '0 m²';
    const totalLuas = kolam.reduce((total, k) => total + (parseFloat(k.panjang) * parseFloat(k.lebar)), 0);
    return `${totalLuas.toFixed(2)} m²`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await onUpdateTambak(editedData);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Profil tambak berhasil diperbarui'
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menyimpan perubahan!'
      });
    }
  };

  const tambakInfo = {
    namaTambak: tambakData.nama || "Tambak Tidak Dikenal",
    totalLahan: hitungTotalLahan(tambakData.kolamDetails || []),
    lokasi: `${tambakData.negara || 'Tidak Diketahui'}, ${tambakData.provinsi || 'Tidak Diketahui'}, ${tambakData.kabupaten || 'Tidak Diketahui'}`,
    detailAlamat: tambakData.alamat || "Alamat Tidak Tersedia",
    didirikanPada: tambakData.created_at
      ? new Date(tambakData.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
      : "Tanggal Tidak Tersedia",
    zonaWaktu: getZonaWaktu(tambakData.provinsi || ''),
    mataUang: "Rupiah (Rp)"
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Nama Tambak", name: "nama", type: "text" },
              { label: "Negara", name: "negara", type: "text" },
              { label: "Provinsi", name: "provinsi", type: "text" },
              { label: "Kabupaten", name: "kabupaten", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={editedData[name]}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border border-blue-500 p-3 text-lg"
                />

              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alamat Lengkap
            </label>
            <textarea
              name="alamat"
              value={editedData.alamat}
              onChange={handleInputChange}
              rows={3}
              className="mt-2 block w-full rounded-md border border-blue-500 p-3 text-lg"
            />

          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {Object.entries(tambakInfo).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center py-2 border-b border-gray-300"
          >
            <p className="text-gray-600 font-semibold w-1/4">
              {key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </p>
            <p className="text-left flex-1">{value}</p>
          </div>
        ))}
        <div className="mt-4 py-2">
          <p className="text-gray-600 font-semibold">Hapus Tambak</p>
          <p className="text-sm text-gray-500">
            Hanya Pemilik saja yang memiliki akses untuk menghapus tambak.
          </p>
        </div>
      </div>
    );
  };


  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <div className="flex justify-end space-x-4 mt-10 mb-4">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-md hover:bg-gray-300 transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            <X className="mr-3 w-6 h-6" />
            <span className="font-semibold">Batal</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            <Save className="mr-3 w-6 h-6" />
            <span className="font-semibold">Simpan</span>
          </button>
        </div>

      );
    }

    return (
      <button
        onClick={onDeleteTambak}
        className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Hapus
      </button>
    );
  };


  return (
    <Card>
      <CardContent className="p-6 border border-gray-300 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold">Profile Tambak</h2>
          {!isEditing && (
            <div className="relative group">
              <button
                onClick={() => setIsEditing(true)}
                className="hover:bg-gray-100 p-1 rounded-full transition"
              >
                <PenSquare className="w-5 h-5 text-blue-500" />
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-8 w-max px-2 py-1 text-xs text-white bg-blue-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Edit Profile
              </div>
            </div>
          )}
        </div>
        {renderProfileContent()}
        {renderActionButtons()}
      </CardContent>
    </Card>

  );
};

const PengaturanDashboard = () => {
  const [tambakData, setTambakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState("tambak");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTambakData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://nusaira-be.vercel.app/api/tambak', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Gagal mengambil data tambak');
        }
  
        setTambakData(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsError(true);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal memuat data tambak!',
        });
        setLoading(false);
      }
    };
  
    fetchTambakData();
  }, []);
  

  const handleDeleteTambak = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Anda yakin?",
        text: "Data tambak akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
      });

      if (confirm.isConfirmed) {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak/${tambakData.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
         },
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus data tambak");
        }

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Tambak berhasil dihapus",
        });

        setTambakData(null);
      }
    } catch (error) {
      console.error("Error deleting tambak:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menghapus tambak!",
      });
    }
  };

  const handleUpdateTambak = async (updatedData) => {
    try {
      const sanitizedData = Object.keys(updatedData).reduce((acc, key) => {
        acc[key] = updatedData[key] === undefined ? null : updatedData[key];
        return acc;
      }, {});
      const token = localStorage.getItem("token");

      const response = await fetch(`https://nusaira-be.vercel.app/api/tambak/${tambakData.id}`, {
        method: 'PUT',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Failed to update data, response:', errorResponse);
        throw new Error(errorResponse.message || 'Gagal memperbarui data tambak');
      }

      const updatedTambak = await response.json();

      setTambakData((prev) => ({
        ...prev,
        ...updatedTambak,
      }));

      return true;
    } catch (error) {
      console.error('Error updating tambak:', error);
      throw error;
    }
  };



  const handleViewKolam = () => {
    navigate("/DaftarKolam");
  };

  const handleViewAir = () => {
    navigate("/ManajemenTambak");
  };


  const renderTabContent = () => {
    if (loading) {
      return (<div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    if (isError) {
      return <div><Error404Page/></div>; 
    }

    switch (activeTab) {
      case "tambak":
        return (
          <div className="p-4">
            <TambakProfile
              tambakData={tambakData}
              onUpdateTambak={handleUpdateTambak}
              onDeleteTambak={handleDeleteTambak}
            />
            <div className="grid grid-cols-2 gap-4 mt-10">
              <InfoCard
                title="Jumlah Kolam"
                value={tambakData?.jumlah_kolam?.toString() || "0"}
                subValue={`${tambakData?.jumlah_kolam || 0} Kolam Aktif`}
                buttonText="Lihat Daftar Kolam"
                onClick={handleViewKolam}
              />
              <InfoCard2
                title="Lihat Pengelolaan Air"
                value=" "
                subValue="Ingin mengecek kondisi air"
                buttonText="Cek Kondisi Air"
                onClick={handleViewAir}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderTabContent()}</div>;
};



const PengaturanTambak = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4 ml-20">Pengaturan Dashboard</h1>
        <div className="bg-white p-6 ml-11 mt-4 w-full max-w-4xl">
          <PengaturanDashboard />
        </div>
      </main>
      <AIFloatingButton />
      <Footer />
    </div>
  </div>
);

export default PengaturanTambak;