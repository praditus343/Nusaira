import React, { useState, useEffect } from 'react';
import { LayoutGrid, FileText, MessageCircle, Bell, ActivityIcon, LogOut, Package, Truck } from 'lucide-react';
import DashboardSummaryCards from '../componen/DasboardSummaryCards';
import PenyakitLeleCards from '../componen/PenyakitLeleCards';
import BeritaCards from '../componen/BeritaCards';
import PesanMasukTable from '../componen/PesanMasukTable';
import RendaTableNotif from '../componen/RenderTableNotif';
import SuppliersTable from '../componen/SupplierAdminTable';
import ProductsTable from '../componen/ProductCard';
import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom'; 

const AdminDashboard = () => {
  const [beritaData, setBeritaData] = useState([]);
  const [penyakitData, setPenyakitData] = useState([]);
  const [pesanData, setPesanData] = useState([]);
  const [notifikasiData, setNotifikasiData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beritaResponse = await fetch('https://nusaira-be.vercel.app/api/berita');
        const penyakitResponse = await fetch('https://nusaira-be.vercel.app/api/penyakit-lele');
        const pesanResponse = await fetch('https://nusaira-be.vercel.app/api/contact/messages');
        const notifikasiResponse = await fetch('https://nusaira-be.vercel.app/api/notifikasi');
        const suppliersResponse = await fetch('https://nusaira-be.vercel.app/api/suppliers');
        const productsResponse = await fetch('https://nusaira-be.vercel.app/api/products');


        const beritaJson = await beritaResponse.json();
        const penyakitJson = await penyakitResponse.json();
        const pesanJson = await pesanResponse.json();
        const notifikasiJson = await notifikasiResponse.json();
        const suppliersJson = await suppliersResponse.json();
        const productsJson = await productsResponse.json();

        setBeritaData(beritaJson || []);
        setPenyakitData(penyakitJson.data || []);
        setPesanData(pesanJson.data || []);
        setNotifikasiData(notifikasiJson.data || notifikasiJson || []);
        setSuppliersData(suppliersJson.data || suppliersJson || []);
        setProductsData(productsJson.data || productsJson || []);
        
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
              <ActivityIcon className="mr-2" /> Penyakit Lele
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
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'suppliers' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('suppliers')}
            >
              <Truck className="mr-2" /> Suppliers
            </li>
            <li
              className={`flex items-center p-2 mb-2 rounded cursor-pointer ${activeTab === 'products' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              onClick={() => setActiveTab('products')}
            >
              <Package className="mr-2" /> Products
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 bg-white flex flex-col">
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

        <div className="p-6 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardSummaryCards 
              beritaData={beritaData} 
              penyakitData={penyakitData} 
              pesanData={pesanData} 
              notifikasiData={notifikasiData} 
              suppliersData={suppliersData}
              productsData={productsData}
            />        
          )}
          {activeTab === 'berita' && <BeritaCards beritaData={beritaData.berita || beritaData} />}
          {activeTab === 'penyakit' && <PenyakitLeleCards penyakitData={penyakitData} onDataUpdate={handleDataUpdate} />}
          {activeTab === 'pesan' && <PesanMasukTable pesanData={pesanData} />}
          {activeTab === 'notifikasi' && <RendaTableNotif notifikasiData={notifikasiData} />}
          {activeTab === 'suppliers' && <SuppliersTable suppliersData={suppliersData} />}
          {activeTab === 'products' && <ProductsTable productsData={productsData} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;