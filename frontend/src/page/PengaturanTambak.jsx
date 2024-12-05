import React, { useState, useEffect } from "react";
import { PenSquare } from "lucide-react";
import Swal from "sweetalert2";
import AIFloatingButton from "../componen/AiFloatingButton";
import { Card, CardContent } from "../componen/CardManagement";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import { useNavigate } from "react-router-dom";


const InfoCard = ({ title, value, subValue, buttonText, onClick }) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm mb-4">{title}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-blue-500">{value}</p>
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


const TambakProfile = ({ tambakData }) => {
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

  return (
    <Card>
      <CardContent className="p-6 border border-gray-300 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold">Profil Tambak</h2>
          <PenSquare className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-4">
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
              Hanya Pemilik saja yang memiliki akses untuk menghapus tambak
            </p>
          </div>
        </div>
        <button className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Hapus
        </button>
      </CardContent>
    </Card>
  );
};


const PengaturanDashboard = () => {
  const [tambakData, setTambakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tambak");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTambakData = async () => {
      try {
        const response = await fetch('https://nusaira-be.vercel.app/api/tambak');
        if (!response.ok) {
          throw new Error('Gagal mengambil data tambak');
        }
        const data = await response.json();
        setTambakData(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal memuat data tambak!'
        });
        setLoading(false);
      }
    };

    fetchTambakData();
  }, []);

  const handleViewKolam = () => {
    navigate("/DaftarKolam");
  };

  const renderTabContent = () => {
    if (loading) {
      return <div>Memuat...</div>;
    }

    switch (activeTab) {
      case "tambak":
        return (
          <div className="p-4">
            <TambakProfile tambakData={tambakData} />
            <div className="grid grid-cols-2 gap-4 mt-10">
              <InfoCard
                title="Jumlah Kolam"
                value={tambakData?.jumlah_kolam?.toString() || "0"}
                subValue={`${tambakData?.jumlah_kolam || 0} Kolam Aktif`}
                buttonText="Lihat Daftar Kolam"
                onClick={handleViewKolam}
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
          <button
            className="mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition ml-4"
            onClick={() => {
              console.log("Perubahan disimpan!");
            }}
          >
            Simpan Perubahan
          </button>
        </div>
      </main>
      <AIFloatingButton />
      <Footer />
    </div>
  </div>
);

export default PengaturanTambak;