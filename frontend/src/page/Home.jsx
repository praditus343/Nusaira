import React, { useState } from 'react';
import { Home, ChevronDown, Bell, HelpCircle } from 'lucide-react';
import Sidebar from '../componen/SideBar.jsx';
import Footer from '../componen/Footer.jsx';

const DashboardContent = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-gray-100 w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-800">Home</h1>
            <div className="flex items-center space-x-4">
                <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
                {/* Round image for the Indonesian flag */}
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <img 
                        src="path/to/indonesian-flag.png" // Replace with the actual path to the flag image
                        alt="Bendera Indonesia" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                {/* Round image for profile photo */}
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <img 
                        src="path/to/profile-photo.png" // Replace with the actual path to the profile photo
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="border-b border-gray-300 w-full" />
</header>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Budidaya Lele</h2>
                        <p className="text-gray-600 flex items-center">
                            <Home className="w-4 h-4 mr-1" /> Boyolali, Jawa Tengah
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Batch :</span>

                        <div className="relative">

                            <button
                                onClick={toggleDropdown}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                            >
                                Pilih Batch
                                <ChevronDown className="ml-2 w-4 h-4" />
                            </button>


                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Batch 1</a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Batch 2</a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Batch 3</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">Solusi Untuk Tambak Lele</h2>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Bingung Ingin Cek Kualitas Tambak Lele ?</h3>
                                    <p className="text-gray-600 mb-4">Temukan Solusi Terbaik untuk Memantau dan Meningkatkan <br /> Kualitas Tambak Anda! Bergabunglah Bersama Kami<br/>
                                        dan Dapatkan Data Real-Time yang Akurat untuk<br/>
                                        Meningkatkan Hasil Panen Anda!</p>
                                    <button className="px-20 py-2 bg-blue-500 text-white rounded-md mt-5">Klik untuk info lebih lanjut</button>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <img src="/api/placeholder/150/150" alt="Illustration" className="w-36 h-36 object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-6">
                    <div className="flex-1 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <img src="/api/placeholder/80/80" alt="Question mark" className="w-20 h-20 object-cover" />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Rencanakan Proses Pertama Anda</h3>
                                        <p className="text-gray-600 mb-4">Mulai perjalanan budidaya Anda dengan merencanakan dan mengelola budidaya secara <br /> efesien.</p>
                                        <button className="px-20 py-2 bg-blue-500 text-white rounded-md mt-5">Mulai sekarang</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex-1 bg-white rounded-lg shadow-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Budidaya Bersama NusAIra</h3>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="space-y-4">
                                    <div className="bg-red-500 rounded-md">
                                        <button className="w-full text-white flex items-center p-2">
                                            <img src="/api/placeholder/24/24" alt="YouTube" className="w-6 h-6 mr-2" />
                                            <span>YouTube NusAIra</span>
                                        </button>
                                    </div>
                                    <div className="bg-blue-400 rounded-md">
                                        <button className="w-full text-white flex items-center p-2">
                                            <img src="/api/placeholder/24/24" alt="Twitter" className="w-6 h-6 mr-2" />
                                            <span>Twitter NusAIra</span>
                                        </button>
                                    </div>
                                    <div className="bg-blue-700 rounded-md">
                                        <button className="w-full text-white flex items-center p-2">
                                            <img src="/api/placeholder/24/24" alt="Telegram" className="w-6 h-6 mr-2" />
                                            <span>Telegram NusAIra</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

function HomeUser() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardContent />
                <Footer/>
            </div>
        </div>

    );
}

export default HomeUser;
