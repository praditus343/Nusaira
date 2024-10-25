import React, { useState } from 'react';
import { Bell, ChevronDown, Settings, Calendar } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';

const NotificationDashboard = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filter, setFilter] = useState('Semua');

    const notifications = [
        {
            type: 'Berita',
            date: '10 Oktober 2024',
            title: 'Lele Di Boyolali Mengalami Kenaikan Harga',
            description: 'Kabarnya lele di Boyolali mengalami kenaikan yang sangat signifikan disebabkan...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Edukasi',
            date: '10 Oktober 2024',
            title: 'Bootcamp: Reset Password',
            description: 'Silahkan reset password dengan cara...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Berita',
            date: '11 Oktober 2024',
            title: 'NusAira Akan Mengupdate Versi Website',
            description: 'NusAira akan segera mengupdate beberapa fitur yang ada di dalam web salah satunya adi...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Edukasi',
            date: '12 Oktober 2024',
            title: 'Materi Bootcamp Minggu Ini',
            description: 'Materi yang akan dibahas dalam bootcamp minggu ini adalah...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Berita',
            date: '13 Oktober 2024',
            title: 'Data Kolam Sudah Di Perbarui',
            description: 'Silahkan cek untuk melihat data kolam terbaru...',
            image: '/api/placeholder/80/80',
        },
    ];

    const filteredNotifications = notifications.filter(notification => 
        filter === 'Semua' || notification.type === filter
    );

    return (
        <div className="bg-white w-full min-h-screen">
            {/* Header */}
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Budidaya</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/indonesian-flag.png" // Ganti dengan path ke gambar bendera
                                    alt="Bendera Indonesia"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/profile-photo.png" // Ganti dengan path ke foto profil
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300 w-full" />
            </header>

            <div className="">
                <div className="bg-blue-100 p-4 rounded-lg mb-4 w-[450px] mt-5 ml-5 ">
                    <div className="flex items-start gap-3">
                        <div>
                            <h2 className="font-medium mb-1">Aktifkan Pemberitahuan Notifikasi</h2>
                            <p className="text-sm text-gray-600">Jadilah yang pertama melihat kabar terbaru dari kami</p>
                        </div>
                        <button
                            onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                            className={`p-2 rounded-full transition-colors ml-5 bg-blue-200 ${isNotificationEnabled ? 'bg-black text-white' : 'bg-blue-100 text-blue-500'}`}
                        >
                            <Bell size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end items-start gap-6 p-4">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600">Kelola Notifikasi:</div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex justify-between items-center gap-2 px-2 py-2 rounded-lg border border-blue-600 text-sm"
                            >
                                <span className="flex-grow mr-20">{filter}</span>
                                <ChevronDown size={16} style={{ color: '#2563eb' }} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Semua'); setIsDropdownOpen(false); }}>Semua</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Berita'); setIsDropdownOpen(false); }}>Berita</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Edukasi'); setIsDropdownOpen(false); }}>Edukasi</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="flex items-center px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Settings size={20} />
                    </button>
                </div>
                {/* Card Notifikasi */}
                <div className="max-h-[600px] overflow-y-auto p-4">
                    {filteredNotifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 mb-4"
                        >
                            {/* Kolom 1: Titik notifikasi */}
                            <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-blue-500" />

                            {/* Kolom 2: Jenis Notifikasi */}
                            <div className="flex flex-col w-1/4">
                                <span className="text-sm font-medium text-blue-600">{notification.type}</span>
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar size={12} className="mr-1" />
                                    {notification.date}
                                </div>
                            </div>

                            {/* Kolom 3: Judul */}
                            <div className="flex flex-col w-1/2 text-left">
                                <h3 className="font-medium text-base mb-1 text-gray-800">{notification.title}</h3>
                                <p className="text-sm text-gray-600">{notification.description}</p>
                            </div>

                            {/* Kolom 4: Gambar notifikasi */}
                            {notification.image && (
                                <img
                                    src={notification.image}
                                    alt={notification.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function Notification() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <NotificationDashboard />
                <AIFloatingButton />
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Notification;
