import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import imgProfile from "../assets/img/landing_page_sebelum_daftar/landingsb2.png"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    '/KabarLele': 'Kabar Lele',
    '/Aksespremium' : 'Premium'
  };

  const title = titleMap[location.pathname] || 'Unknown Page';

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                alt="Bendera Indonesia"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleProfileClick}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden focus:outline-none"
              >
                <img
                  src={imgProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-100 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-center bg-blue-100">
                    <h3 className="text-blue-500 font-medium">Herri Saputra</h3>
                  </div>
                  <div
                    onClick={() => navigate('/UserProfile')}
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-white flex items-center space-x-2 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 font-medium" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-500 font-medium">Profile</span>
                  </div>
                  <div
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-white flex items-center space-x-2 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 font-medium" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-500 font-medium">Keluar</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 w-full" />
    </header>
  );
};

export default Header;