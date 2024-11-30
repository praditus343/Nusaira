import React, { useState, useEffect } from 'react';
import { LayoutGrid, FileText, MessageCircle, Bell, Heart,LogOut  } from 'lucide-react';
import DashboardSummaryCards from '../componen/DasboardSummaryCards';
import PenyakitLeleCards from '../componen/PenyakitLeleCards';
import BeritaCards from '../componen/BeritaCards';
import PesanMasukTable from '../componen/PesanMasukTable';
import RendaTableNotif from '../componen/RenderTableNotif';
import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom'; 

const AdminDashboard = () => {
  const [beritaData, setBeritaData] = useState([]);
  const [penyakitData, setPenyakitData] = useState([]);
  const [pesanData, setPesanData] = useState([]);
  const [notifikasiData, setNotifikasiData] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Lakukan proses logout di sini (misalnya menghapus token, dll)
    // Contoh sederhana:
    // localStorage.removeItem('authToken'); // Sesuaikan dengan cara Anda menyimpan token
    navigate('/'); // Navigasi ke halaman login/home
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const beritaResponse = await fetch('https://nusaira-be.vercel.app/api/berita');
        const penyakitResponse = await fetch('https://nusaira-be.vercel.app/api/penyakit-lele');
        const pesanResponse = await fetch('https://nusaira-be.vercel.app/api/contact/messages');
        const notifikasiResponse = await fetch('https://nusaira-be.vercel.app/api/notifikasi');

        const beritaJson = await beritaResponse.json();
        const penyakitJson = await penyakitResponse.json();
        const pesanJson = await pesanResponse.json();
        const notifikasiJson = await notifikasiResponse.json();

        // console.log('Berita Response:', beritaJson);
        // console.log('Penyakit Response:', penyakitJson);
        // console.log('Pesan Response:', pesanJson);
        // console.log('Notifikasi Response:', notifikasiJson);

        setBeritaData(beritaJson || []);
        setPenyakitData(penyakitJson.data || []);
        setPesanData(pesanJson.data || []);
        setNotifikasiData(notifikasiJson.data || notifikasiJson || []);
        
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDataUpdate = (deletedId) => {
    setPenyakitData((prevData) =>
      prevData.filter((item) => item.id !== deletedId)
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 text-white p-4">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 object-cover rounded-full"
          />
          <h1 className="text-2xl font-bold">Nusaira Admin</h1>
        </div>
        <nav>
          <ul>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutGrid className="mr-2" /> Dashboard
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'berita' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('berita')}
            >
              <FileText className="mr-2" /> Berita
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'penyakit' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('penyakit')}
            >
              <Heart className="mr-2" /> Penyakit Lele
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'pesan' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('pesan')}
            >
              <MessageCircle className="mr-2" /> Pesan Masuk
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'notifikasi' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('notifikasi')}
            >
              <Bell className="mr-2" /> Notifikasi
            </li>
          </ul>
        </nav>
      </div>
     

      <div className="flex-1 bg-white flex flex-col">
        {/* Header Baru */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab} 
            </h2>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="mr-2" size={20} /> Keluar
          </button>
        </header>

        {/* Konten utama */}
        <div className="p-6 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardSummaryCards 
              beritaData={beritaData} 
              penyakitData={penyakitData} 
              pesanData={pesanData} 
              notifikasiData={notifikasiData} 
            />        
          )}
          {activeTab === 'berita' && <BeritaCards beritaData={beritaData.berita || beritaData} />}
          {activeTab === 'penyakit' && <PenyakitLeleCards penyakitData={penyakitData} onDataUpdate={handleDataUpdate} />}
          {activeTab === 'pesan' && <PesanMasukTable pesanData={pesanData} />}
          {activeTab === 'notifikasi' && <RendaTableNotif notifikasiData={notifikasiData} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;