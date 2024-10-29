import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import Sidebar from '../componen/SideBar.jsx';
import Footer from '../componen/Footer.jsx';
import AIFloatingButton from '../componen/AiFloatingButton.jsx';
import Header from '../componen/Header.jsx';
import WrapBanner from '../componen/WrapBanner.jsx';
import imgConfusePeople from "../assets/img/landing_page_sudah_daftar/landingsub3.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';
import imgElearningNusaira from "../assets/img/landing_page_sudah_daftar/landingsub2.png"

const DashboardContent = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-white w-full min-h-screen mb-10">
            <Header />
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


                <div className="bg-blue-50 rounded-lg shadow-md mb-10 border-2">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2">Solusi Untuk Tambak Lele</h2>
                        <WrapBanner />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-2/3 bg-blue-100 rounded-lg shadow-md">
                        <div className="p-3 bg-blue-400 rounded-lg ml-4 mr-4 mt-4 mb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={imgConfusePeople} alt="Question mark" className="w-50 h-60 object-cover ml-4 mr-4" />
                                    <div>
                                        <h3 className="font-semibold mb-2 text-white">Rencanakan Proses Pertama Anda</h3>
                                        <p className="text-white mb-4">Anda Perlu Memulai Siklus agar Dapat<br/> Mencatat dan Mengelola Budidaya Secara<br/>  Efisien.</p>
                                        <button className="px-20 py-2 bg-blue-600 text-white rounded-md mt-4  hover:bg-blue-500 transition-colors duration-300">Mulai sekarang</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>


                    <div className="w-1/3 bg-blue-100 rounded-lg shadow-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Budidaya Bersama NusAIra</h3>
                            <div className="p-4">
                                <div className="space-y-4">
                                    <div className="bg-blue-500 rounded-md py-1">
                                        <button className="w-full text-white flex items-center p-2 ml-2">
                                        <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 mr-2" />
                                            <span className='ml-2'>YouTube NusAIra</span>
                                        </button>
                                    </div>
                                    <div className="bg-blue-500 rounded-md">
                                        <button className="w-full text-white flex items-center p-2">
                                            <img src={imgElearningNusaira} alt="Twitter" className="w-20 h-8 mr-2" />
                                            <span>Belajar Bareng NusAira</span>
                                        </button>
                                    </div>
                                    <div className="bg-blue-500 rounded-md py-1">
                                        <button className="w-full text-white flex items-center p-2 ml-2">
                                        <FontAwesomeIcon icon={faTelegram} className="w-6 h-6 mr-2" />
                                            <span className='ml-2'>Telegram NusAIra</span>
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
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardContent />
                <AIFloatingButton />
                <Footer />
            </div>
        </div>

    );
}

export default HomeUser;
