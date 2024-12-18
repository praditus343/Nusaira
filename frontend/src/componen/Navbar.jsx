import { faBell, faChartLine, faChevronDown, faFish, faLeaf, faNewspaper, faRobot, faSeedling, faThermometerHalf, faTint, faVirus, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imgLogo from "../assets/Logo.png";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
   
    const handleScrollToContact = (event) => {
        event.preventDefault();

        setTimeout(() => {
            const section = document.getElementById("hubungiKamiSection");
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };


    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-2 border-gray-300">
            <div className="flex items-center space-x-8">
                <div>
                    <Link to="/" onClick={scrollToTop}>
                        <img
                            src={imgLogo}
                            alt="Logo"
                            className="w-12 h-12 rounded-full"
                        />
                    </Link>
                </div>

                {/* Navigation Options */}
                <div className="flex space-x-6 text-gray-700">
                    {/* Produk Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => toggleDropdown('produk')}
                        >
                            <span className={`${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`}>Produk</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`w-3 h-3 transition-transform ${activeDropdown === 'produk' ? 'rotate-180 text-blue-600' : 'text-gray-700'}`}
                            />
                        </button>
                        {activeDropdown === 'produk' && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 select-none">
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center `}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faRobot} className={`${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Chatbot</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faFish} className={`${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Pengelolaan Lele</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faTint} className={`${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Manajemen Air</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faChartLine} className={`${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Tren Harga</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Produk Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => toggleDropdown('Media')}
                        >
                            <span className={`${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'}`}>Media</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`w-3 h-3 transition-transform ${activeDropdown === 'Media' ? 'rotate-180 text-blue-600' : 'text-gray-700'}`}
                            />
                        </button>
                        {activeDropdown === 'Media' && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 select-none">
                                <span className={`block px-4 py-2 ${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center `}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faNewspaper} className={`${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Berita</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faChartLine} className={`${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Prediksi Harga</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faVirus} className={`${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Penyakit Lele</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'} flex items-center`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faBell} className={`${activeDropdown === 'Media' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Notifikasi</span>
                                </span>
                            </div>
                        )}
                    </div>



                    {/* E-Learning Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => toggleDropdown('eLearning')}
                        >
                            <span className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`}>Perpustakaan</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`w-3 h-3 transition-transform ${activeDropdown === 'eLearning' ? 'rotate-180 text-blue-600' : 'text-gray-700'}`}
                            />
                        </button>
                        {activeDropdown === 'eLearning' && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-10">
                                <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faWater} className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Teknik Pengelolaan Air</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faLeaf} className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Teknik Pengelolaan Lingkungan</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faThermometerHalf} className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Teknik Pengaturan Suhu</span>
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} flex items-center select-none`}>
                                    <div className="w-8 flex justify-center">
                                        <FontAwesomeIcon icon={faSeedling} className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} />
                                    </div>
                                    <span className="flex-1">Teknik Budidaya Ikan</span>
                                </span>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/hubungi-kami#hubungiKamiSection"
                        onClick={handleScrollToContact}
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>

            {/* Login/Daftar buttons */}
            <div className="flex items-center space-x-4">
                <Link
                    to="/login"
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white duration-200"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-700 duration-200"
                >
                    Daftar
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
