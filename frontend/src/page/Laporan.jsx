import React, { useState } from 'react';
import { Bell, ChevronDown, Settings, Calendar, MapPin } from 'lucide-react'; // Pastikan semua ikon diimpor dengan benar.
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';

const LaporanDashboard = () => {
    const [filter, setFilter] = useState('Semua');
    const laporans = [
        {
            type: 'Sistem',
            date: '10 Oktober 2024',
            title: 'Pembaruan Sistem NusAIra v2.1',
            description: 'Sistem telah diperbarui dengan fitur baru dan peningkatan performa...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Kolam',
            date: '11 Oktober 2024',
            title: 'Status Kolam A1 Memerlukan Perhatian',
            description: 'Parameter pH air pada kolam A1 berada di bawah normal, diperlukan tindakan segera...',
            image: '/api/placeholder/80/80',
        },
        // Tambahkan data lainnya di sini...
    ];

    const filteredLaporans = laporans.filter(laporan =>
        filter === 'Semua' || laporan.type === filter
    );

    return (
        <div className="bg-white w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Laporan</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
                            <img
                                src="path/to/indonesian-flag.png"
                                alt="Bendera Indonesia"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <img
                                src="path/to/profile-photo.png"
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300 w-full" />
            </header>

            {/* Filter */}
            <div className="mt-4 px-4">
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-xl font-medium">Catatan Laporan Tambak Lele Segar</h1>
                            <div>
                                    <span className="flex items-center text-gray-600">
                                    <Calendar size={16} className="mr-2" />
                                    <span>10 Oktober 2024</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Daftar Laporan:</span>
                                <select className="px-4 py-1.5 border rounded-md bg-white">
                                    <option value="tambak1">Tambak Lele Seger</option>
                                    <option value="tambak2">Tambak Lele Kencana</option>
                                </select>
                            </div>
                            <button className="px-6 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Export Laporan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Notifikasi */}
            <div className="max-h-[600px] overflow-y-auto p-4">
                {filteredLaporans.map((laporan, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 mb-4"
                    >
                        <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-blue-500" />
                        <div className="flex flex-col w-1/4">
                            <span className="text-sm font-medium text-blue-600">{laporan.type}</span>
                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar size={12} className="mr-1" />
                                {laporan.date}
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 text-left">
                            <h3 className="font-medium text-base mb-1 text-gray-800">{laporan.title}</h3>
                            <p className="text-sm text-gray-600">{laporan.description}</p>
                        </div>
                        {laporan.image && (
                            <img
                                src={laporan.image}
                                alt={laporan.title}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                        )}
                    </div>
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
