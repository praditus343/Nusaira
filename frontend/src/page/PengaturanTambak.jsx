import { ChevronDown, PenSquare, Search } from 'lucide-react';
import React, { useState } from 'react';
import AIFloatingButton from '../componen/AiFloatingButton';
import { Card, CardContent } from '../componen/CardManagement';
import Footer from '../componen/Footer';
import Header from '../componen/Header';
import Sidebar from '../componen/SideBar';
import { FaInfoCircle, FaPlus } from 'react-icons/fa';

const TABS = [
  { id: 'tambak', label: 'Tambak' },
  { id: 'pengguna', label: 'Pengguna yang berhak' },
  { id: 'parameter', label: 'Parameter' },
  { id: 'tabelFR', label: 'Tabel FR' },
];

const USERS = [
  { nama: 'iqbal saputra', email: 'iqbal.saputra@gmail.com', blok: 'Semua Blok', peran: 'Admin' },
  { nama: 'rian sanjaya', email: 'rian.sanjaya@gmail.com', blok: 'Semua Blok', peran: 'Admin' },
  { nama: 'putri cantika', email: 'putri.cantika@gmail.com', blok: 'Semua Blok', peran: 'Operator' },
  { nama: 'santoso putar', email: 'santoso.putar@gmail.com', blok: 'Semua Blok', peran: 'Laboran' },
];

const TAMBAK_DATA = {
  namaTambak: 'Lele Segar',
  totalLahan: '1m²',
  lokasi: 'SUMATERA UTARA, MANDAILING NATAL, SINUNUKAN, SINUNUKAN II',
  detailAlamat: 'Jalan Banten gg Jambu rt 2 rk 2',
  didirikanPada: '10 Oktober 2023',
  zonaWaktu: 'WIB',
  mataUang: 'Rupiah (Rp)',
};

const ParameterCard = ({ title, labels }) => (
  <Card className="p-4">
    <h3 className="text-lg mb-4">{title}</h3>
    <div className="relative pt-6">
      <div className="h-2 bg-green-200 rounded-full">
        <div className="absolute left-0 -top-2 w-4 h-4 bg-green-500 rounded-full" />
        <div className="absolute right-0 -top-2 w-4 h-4 bg-green-500 rounded-full" />
      </div>
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => (
          <div key={index} className="text-center">
            <input type="text" value="6.5" className="w-12 border rounded text-center" />
            <div className="text-xs text-gray-600 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const InfoCard = ({ title, value, subValue, buttonText }) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm mb-4">{title}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold text-blue-500">{value}</p>
          {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
          {buttonText}
        </button>
      </div>
    </CardContent>
  </Card>
);

const TambakProfile = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold">Profil Tambak</h2>
          <PenSquare className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-4">
          {Object.entries(TAMBAK_DATA).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center py-2 ${
                key === "mataUang" ? "border-b border-gray-300" : "border-b border-gray-300"
              }`}
            >
              <p className="text-gray-600 font-semibold w-1/4">
                {key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (l) => l.toUpperCase())}
              </p>
              <p className="text-left flex-1">{value}</p>
            </div>
          ))}
          <div className="mt-4 py-2">
            <p className="text-gray-600 font-semibold">Hapus Tambak</p>
            <p className="text-sm text-gray-500">
              Hanya Pemilik dan Admin yang memiliki akses untuk menghapus tambak
            </p>
          </div>
        </div>
        <button className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg">Tutup Akun</button>
      </CardContent>
    </Card>
  );
  

const PengaturanDashboard = () => {
  const [activeTab, setActiveTab] = useState('tambak');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tambak':
        return (
          <div className="p-4">
            <TambakProfile />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <InfoCard title="Pengguna Yang Berhak" value="1" subValue="Pengguna" buttonText="Lihat Daftar Pengguna" />
              <InfoCard title="Jumlah Kolam" value="1" subValue="1 Kolam Aktif" buttonText="Lihat Daftar Kolam" />
              <InfoCard title="Parameter Yang Dipantau" value="1" buttonText="Lihat Pengaturan" />
              <InfoCard title="Harga Lele Yang Terhutang" value="1" subValue="Harga Lele Terhutang" buttonText="Lihat Riwayat" />
            </div>
          </div>
        );
        case 'pengguna':
            return (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
                        <div className="flex space-x-2">
                            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                <FaInfoCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                <FaPlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300"> {/* Garis samping untuk tabel */}
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="p-3 text-center border border-gray-300">Nama</th>
                                    <th className="p-3 text-center border border-gray-300">Email</th>
                                    <th className="p-3 text-center border border-gray-300">Keterangan</th>
                                    <th className="p-3 text-center border border-gray-300">Blok</th>
                                    <th className="p-3 text-center border border-gray-300">Peran</th>
                                    <th className="p-3 border border-gray-300"></th> {/* Kolom kosong untuk ikon dropdown */}
                                </tr>
                            </thead>
                            <tbody>
                                {USERS.map((user, index) => (
                                    <tr key={index} className="border-b bg-gray-50">
                                        <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.nama}</td>
                                        <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.email}</td>
                                        <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.keterangan}</td>
                                        <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.blok}</td>
                                        <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.peran}</td>
                                        <td className="p-3 text-center"> {/* Menghilangkan border di sebelah panah */}
                                            <ChevronDown className="w-5 h-5 text-blue-500 mx-auto" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
         case 'parameter':
        return (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Kualitas Air</h2>
            <div className="grid grid-cols-2 gap-4">
              <ParameterCard title="pH" labels={['Batas Terbawah', 'Batas Bawah', 'Batas Atas', 'Batas Teratas']} />
              <ParameterCard title="Salinitas" labels={['Batas Terbawah', 'Batas Bawah', 'Batas Atas', 'Batas Teratas']} />
            </div>
          </div>
        );
      case 'tabelFR':
        return (
          <div className="p-4">
            <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">DoC</th>
                  <th className="p-3 text-left">MBW</th>
                  <th className="p-3 text-left">FR</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} className="border-b bg-gray-50">
                    <td className="p-3">-</td>
                    <td className="p-3">-</td>
                    <td className="p-3">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto border rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex border-b w-full">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 ${activeTab === tab.id ? 'text-blue-500 border-blue-500' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {renderTabContent()}
      
    </div>
  );
};
const PengaturanTambak = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />
                <main className="flex-grow p-8">
                    <h1 className="text-2xl font-bold mb-4">Pengaturan Dashboard</h1>
                    <PengaturanDashboard />
                </main>
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
};

export default PengaturanTambak;
