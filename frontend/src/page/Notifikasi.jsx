import React, { useState } from 'react';
import { Bell, BellOff, ChevronDown, Settings, Calendar } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';
import img1 from '../assets/img/notifikasi/n1.png'
import img2 from '../assets/img/notifikasi/n2.png'
import img3 from '../assets/img/notifikasi/n3.png'
import img4 from '../assets/img/e-learning/el1.png'

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
            image: img3,
        },
        {
            type: 'Kolam',
            date: '11 Oktober 2024',
            title: 'Status Kolam A1 Memerlukan Perhatian',
            description: 'Parameter pH air pada kolam A1 berada di bawah normal, diperlukan tindakan segera...',
            image: img2,
        },
        {
            type: 'E-Learning',
            date: '12 Oktober 2024',
            title: 'Jadwal E-Learning: Manajemen Kolam',
            description: 'Sesi E-Learning minggu ini akan membahas teknik manajemen kolam yang efektif...',
            image: img4,
        },
        {
            type: 'Lele',
            date: '13 Oktober 2024',
            title: 'Update Harga Lele Terkini',
            description: 'Harga lele di pasar mengalami kenaikan sebesar 15% dari harga sebelumnya...',
            image: img1,
        },
        {
            type: 'Blog',
            date: '14 Oktober 2024',
            title: 'Artikel Baru: Teknik Budidaya Modern',
            description: 'Baca artikel terbaru kami tentang teknologi dalam budidaya ikan air tawar...',
            image: img2,
        },
        {
            type: 'Sistem',
            date: '15 Oktober 2024',
            title: 'Pemeliharaan Server',
            description: 'Akan ada pemeliharaan server pada tanggal 20 Oktober 2024...',
            image: img3,
        },
        {
            type: 'Kolam',
            date: '16 Oktober 2024',
            title: 'Monitoring Kualitas Air',
            description: 'Laporan monitoring kualitas air mingguan telah tersedia...',
            image: img2,
        },
        {
            type: 'E-Learning',
            date: '17 Oktober 2024',
            title: 'Materi E-Learning: Kontrol Penyakit',
            description: 'Download materi E-Learning tentang pengendalian penyakit pada budidaya lele...',
            image: img4,
        }
    ];

    const filteredNotifications = notifications.filter(notification =>
        filter === 'Semua' || notification.type === filter
    );

    return (
        <div className="bg-white w-full min-h-screen ">
            <Header />
            <div className="ml-10 mr-4">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 w-[600px] mt-5 ml-5 h-[170px]">
                    <div className="flex items-start gap-3 mt-6 ml-2">
                        <div>
                            <h3 className=" mb-1">Aktifkan Pemberitahuan Notifikasi</h3>
                            <p className="text-gray-600">Jadilah yang pertama melihat kabar terbaru dari kami</p>
                        </div>
                        <button
                            onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                            className={`p-3 rounded-full transition-colors ml-5 mt-4 bg-blue-100 text-white ${isNotificationEnabled ? 'bg-blue-400' : 'bg-blue-400'}`}
                            style={{ width: '50px', height: '50px' }}
                        >
                            {isNotificationEnabled ? <Bell size={24} /> : <BellOff size={24} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-start items-start gap-8 p-6 mr-20 mt-10">
                    <div className="flex items-center gap-4">
                        <div className="text-lg text-gray-600">Kelola Notifikasi:</div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex w-[400px] py-2 rounded-lg border border-blue-600 text-lg"
                            >
                                <span className=" flex-grow text-left ml-5">{filter}</span>
                                <ChevronDown size={32} style={{ color: '#2563eb' }} className='mr-5' />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                    {/* Meningkatkan ukuran teks pada dropdown */}
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Semua'); setIsDropdownOpen(false); }}>Semua</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Sistem'); setIsDropdownOpen(false); }}>Sistem</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Kolam'); setIsDropdownOpen(false); }}>Kolam</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('E-Learning'); setIsDropdownOpen(false); }}>E-Learning</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Lele'); setIsDropdownOpen(false); }}>Lele</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Blog'); setIsDropdownOpen(false); }}>Blog</button>
                                </div>
                            )}
                        </div>

                    </div>
                    <button className="flex items-center px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Settings size={24} /> {/* Meningkatkan ukuran icon */}
                    </button>
                </div>

                {/* Card Notifikasi */}
                <div className="max-h-[600px] w-[1500px] overflow-y-auto p-4">
                    {filteredNotifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 mb-4"
                        >
                            <div className="flex-shrink-0 w-6 h-6 mt-4 rounded-full bg-blue-500" />

                            <div className="flex flex-col w-1/4">
                                <h3 className="text-blue-600">{notification.type}</h3>
                                <p className="flex items-center  text-gray-500  mt-2">
                                    <Calendar size={32} className="mr-1" />
                                    {notification.date}
                                </p>
                            </div>


                            <div className="flex flex-col w-1/2 text-left">
                                <h3 className=" mb-1 text-gray-800">{notification.title}</h3>
                                <p className="text-gray-600">{notification.description}</p>
                            </div>

                            {notification.image && (
                                <img
                                    src={notification.image}
                                    alt={notification.title}
                                    className="w-32 h-32 rounded-lg object-cover ml-10"
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
                <div className='mt-48'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Notification;
