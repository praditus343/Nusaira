import React, { useState } from 'react';
import { Bell, ChevronDown, Settings, Calendar } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const NotificationDashboard = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filter, setFilter] = useState('Semua');

    const notifications = [
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
        {
            type: 'Bootcamp',
            date: '12 Oktober 2024',
            title: 'Jadwal Bootcamp: Manajemen Kolam',
            description: 'Sesi bootcamp minggu ini akan membahas teknik manajemen kolam yang efektif...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Lele',
            date: '13 Oktober 2024',
            title: 'Update Harga Lele Terkini',
            description: 'Harga lele di pasar mengalami kenaikan sebesar 15% dari harga sebelumnya...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Blog',
            date: '14 Oktober 2024',
            title: 'Artikel Baru: Teknik Budidaya Modern',
            description: 'Baca artikel terbaru kami tentang teknologi dalam budidaya ikan air tawar...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Sistem',
            date: '15 Oktober 2024',
            title: 'Pemeliharaan Server',
            description: 'Akan ada pemeliharaan server pada tanggal 20 Oktober 2024...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Kolam',
            date: '16 Oktober 2024',
            title: 'Monitoring Kualitas Air',
            description: 'Laporan monitoring kualitas air mingguan telah tersedia...',
            image: '/api/placeholder/80/80',
        },
        {
            type: 'Bootcamp',
            date: '17 Oktober 2024',
            title: 'Materi Bootcamp: Kontrol Penyakit',
            description: 'Download materi bootcamp tentang pengendalian penyakit pada budidaya lele...',
            image: '/api/placeholder/80/80',
        }
    ];

    const filteredNotifications = notifications.filter(notification => 
        filter === 'Semua' || notification.type === filter
    );

    return (
        <div className="bg-white w-full min-h-screen">
           <Header/>
            <div className="">
                <div className="bg-blue-100 p-4 rounded-lg mb-4 w-[450px] mt-5 ml-5">
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
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Sistem'); setIsDropdownOpen(false); }}>Sistem</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Kolam'); setIsDropdownOpen(false); }}>Kolam</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Bootcamp'); setIsDropdownOpen(false); }}>Bootcamp</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Lele'); setIsDropdownOpen(false); }}>Lele</button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => { setFilter('Blog'); setIsDropdownOpen(false); }}>Blog</button>
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
                            <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-blue-500" />

                            <div className="flex flex-col w-1/4">
                                <span className="text-sm font-medium text-blue-600">{notification.type}</span>
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar size={12} className="mr-1" />
                                    {notification.date}
                                </div>
                            </div>

                            <div className="flex flex-col w-1/2 text-left">
                                <h3 className="font-medium text-base mb-1 text-gray-800">{notification.title}</h3>
                                <p className="text-sm text-gray-600">{notification.description}</p>
                            </div>

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