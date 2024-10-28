import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Map path to title
  const titleMap = {
    '/': 'Landing Page',
    '/Home': 'Home',
    '/InputTambak': 'Input Tambak Baru',
    '/DaftarKolam': 'Daftar Kolam',
    '/ManajemenTambak': 'Manajemen Tambak',
    '/Simulasi': 'Tambak Simulation',
    '/UserProfile': 'User Profile',
    '/HargaLele': 'Harga Lele',
    '/PenyakitLele': 'Penyakit Lele',
    '/Notifikasi': 'Notifikasi',
    '/Blog': 'Blog',
    '/FinalStep': 'Final Step',
    '/Pengeluaran': 'Pengeluaran',
    '/Pemasukan': 'Pemasukan',
    '/Laporan': 'Laporan',
    '/KabarLele': 'Kabar Lele'
  };

  // Get the title based on the current path
  const title = titleMap[location.pathname] || 'Unknown Page';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src="path/to/indonesian-flag.png"
                alt="Bendera Indonesia"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src="path/to/profile-photo.png"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 w-full" />
    </header>
  );
};

export default Header;