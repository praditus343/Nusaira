import React, { useState, useEffect } from 'react';
import { Bell, BellOff, ChevronDown, Calendar } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';
import Swal from 'sweetalert2';
import Error404Page from '../componen/ErrorPage';
import apiClient from '../service/axiosInstance';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;

};

const NotificationDashboard = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filter, setFilter] = useState('Semua');
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Izin notifikasi diberikan');
                } else {
                    console.log('Izin notifikasi ditolak');
                }
            });
        }
    }, []);


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await apiClient.get('/notifikasi');
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch notifications");
                setLoading(false);
            }            
        };

        fetchNotifications();
    }, []);

    const filteredNotifications = notifications.filter(notification =>
        filter === 'Semua' || notification.type === filter
    );
    const handleNotificationToggle = () => {
        setIsNotificationEnabled(!isNotificationEnabled);

        if (Notification.permission === 'default' && !isNotificationEnabled) {
            Swal.fire({
                title: 'Izinkan Pemberitahuan?',
                text: 'Untuk menerima pemberitahuan, izinkan aplikasi untuk mengirimkan notifikasi ke browser Anda.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Izinkan',
                cancelButtonText: 'Tutup',
            }).then((result) => {
                if (result.isConfirmed) {
                    Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                            Swal.fire('Notifikasi Diaktifkan', 'Sekarang Anda akan menerima pemberitahuan dari kami.', 'success');
                        }
                    });
                }
            });
        }

        if (Notification.permission === 'granted' && !isNotificationEnabled) {
            new Notification("Notifikasi diaktifkan!", {
                body: "Sekarang Anda akan menerima pemberitahuan dari kami.",
            });
        }
    };


 



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div >
                <Error404Page />
            </div>
        );
    }

    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="ml-10 mr-4">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 w-[600px] mt-5 ml-5 h-[170px]">
                    <div className="flex items-start gap-3 mt-6 ml-2">
                        <div>
                            <h3 className="mb-1">Aktifkan Pemberitahuan Notifikasi</h3>
                            <p className="text-gray-600">Jadilah yang pertama melihat kabar terbaru dari kami</p>
                        </div>
                        <button
                            onClick={handleNotificationToggle}
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
                                <span className="flex-grow text-left ml-5">{filter}</span>
                                <ChevronDown size={32} style={{ color: '#2563eb' }} className='mr-5' />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Semua'); setIsDropdownOpen(false); }}>Semua</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Sistem'); setIsDropdownOpen(false); }}>Sistem</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('E-learning'); setIsDropdownOpen(false); }}>E-Learning</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Penyakit-Lele'); setIsDropdownOpen(false); }}>Penyakit Lele</button>
                                    <button className="text-left w-full px-4 py-3 text-lg hover:bg-gray-50" onClick={() => { setFilter('Berita'); setIsDropdownOpen(false); }}>Berita</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="max-h-[600px] w-[1500px] overflow-y-auto p-4">
                    {filteredNotifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 mb-6"
                        >
                            <div className="flex-shrink-0 w-6 h-6 mt-4 rounded-full bg-blue-500" />
                            <div className="flex flex-col w-1/4">
                                <h3 className="text-blue-600">{notification.type}</h3>
                                <p className="flex items-center text-gray-500 mt-2">
                                    <Calendar size={32} className="mr-1" />
                                    {formatDate(notification.date)}
                                </p>
                            </div>
                            <div className="flex flex-col w-1/2 text-left">
                                <h3 className="mb-1 text-gray-800">{notification.title}</h3>
                                <p className="text-gray-600">{notification.description}</p>
                            </div>
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
