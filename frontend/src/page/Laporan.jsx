import React, { useState } from 'react';
import { Bell, ChevronDown, Calendar, ChevronRight, User, LogOut } from 'lucide-react'; 
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';

const LaporanCard = ({ laporan }) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4">
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-blue-500 text-white rounded-full p-2">
                <Calendar className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{laporan.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {laporan.date}
                </div>
                <p className="mt-1 text-gray-600 text-sm">
                    {laporan.description}
                </p>
            </div>
        </div>
        <ChevronRight size={24} className="text-gray-400" />
    </div>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-xl font-semibold text-gray-800">Laporan</h1>
                    <div className="flex items-center space-x-6">
                        <button
                            className="relative focus:outline-none"
                            aria-label="Notifikasi"
                        >
                            <Bell size={24} className="text-gray-600 hover:text-gray-800" />
                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <img
                                src="/path/to/indonesian-flag.png"
                                alt="Bendera Indonesia"
                                className="w-6 h-6 rounded-full object-cover"
                                onError={(e) => (e.target.src = '/path/to/fallback-flag.png')}
                            />
                            <div className="relative">
                                <img
                                    src="/path/to/profile-photo.png"
                                    alt="Profil"
                                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    onError={(e) => (e.target.src = '/path/to/fallback-profile.png')}
                                />
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <User size={18} className="mr-2" /> Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut size={18} className="mr-2" /> Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-300 w-full" />
        </header>
    );
};

const LaporanDashboard = () => {
    const [filter, setFilter] = useState('Semua');

    const laporans = [
        {
            type: 'Tambak Lele Segar',
            date: '10 Oktober 2024',
            title: 'Laporan Tambak Lele Segar',
            description: 'Berikut Merupakan hasil laporan dari tambak lele segar. hasilnya adalah....',
        },
        {
            type: 'Tambak Lele Kencana',
            date: '15 Oktober 2024',
            title: 'Laporan Tambak Lele Kencana',
            description: 'Laporan ini berisi evaluasi terkait tambak kencana.',
        },
        {
            type: 'Tambak Lele Segar',
            date: '20 Oktober 2024',
            title: 'Laporan Tambak...',
            description: 'Deskripsi hasil laporan tambak terbaru.',
        },
    ];

    const filteredLaporans = laporans.filter(
        (laporan) => filter === 'Semua' || laporan.type === filter
    );

    return (
        <div className="bg-gray-50 w-full min-h-screen">
            <Header />

            {/* Filter Section */}
            <div className="mt-4 px-4">
                <div className="p-4 bg-white shadow rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-xl font-medium">Catatan Laporan Tambak Lele Segar</h1>
                            <div className="flex items-center text-gray-600 space-x-2 mt-1">
                                <Calendar size={16} className="text-gray-500" />
                                <span>10 Oktober 2024</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Daftar Laporan:</span>
                                <select
                                    className="px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="Semua">Semua</option>
                                    <option value="Tambak Lele Segar">Tambak Lele Segar</option>
                                    <option value="Tambak Lele Kencana">Tambak Lele Kencana</option>
                                </select>
                            </div>
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Export Laporan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Cards */}
            <div className="max-h-[600px] overflow-y-auto px-4 mt-4">
                {filteredLaporans.map((laporan, index) => (
                    <LaporanCard key={index} laporan={laporan} />
                ))}
            </div>
        </div>
    );
};

function Laporan() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <LaporanDashboard />
                <AIFloatingButton />
                <Footer className="mt-10" />
            </div>
        </div>
    );
}

export default Laporan;
