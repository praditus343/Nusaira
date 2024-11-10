import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRobot, faFish, faTint, faChartLine,faWater, faLeaf, faThermometerHalf, faSeedling } from '@fortawesome/free-solid-svg-icons';
import imgLogo from "../assets/Logo.png";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md border border-gray-300">
            <div className="flex items-center space-x-8">
                {/* Logo */}
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
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10">
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <FontAwesomeIcon icon={faRobot} className={`mr-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} /> Chatbot
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <FontAwesomeIcon icon={faFish} className={`mr-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} /> Pengelolaan Lele
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                    <FontAwesomeIcon icon={faTint} className={`mr-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} /> Manajemen Air
                                </span>
                                <span className={`block px-4 py-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'} flex items-center select-none`}>
                                    <FontAwesomeIcon icon={faChartLine} className={`mr-2 ${activeDropdown === 'produk' ? 'text-blue-600' : 'text-gray-700'}`} /> Tren Harga
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Tentang Kami */}
                    <Link to="/tentang-kami#tentangKamiSection" className="hover:text-blue-600 transition-colors duration-200">
                        Tentang Kami
                    </Link>

                    {/* E-Learning Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => toggleDropdown('eLearning')}
                        >
                            <span className={`${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`}>Kursus</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`w-3 h-3 transition-transform ${activeDropdown === 'eLearning' ? 'rotate-180 text-blue-600' : 'text-gray-700'}`}
                            />
                        </button>
                        {activeDropdown === 'eLearning' && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10">
                            <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                <FontAwesomeIcon icon={faWater} className={`mr-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} /> Teknik Pengelolaan Air
                            </span>
                            <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                <FontAwesomeIcon icon={faLeaf} className={`mr-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} /> Teknik Pengelolaan Lingkungan
                            </span>
                            <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} border-b flex items-center select-none`}>
                                <FontAwesomeIcon icon={faThermometerHalf} className={`mr-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} /> Teknik Pengaturan Suhu
                            </span>
                            <span className={`block px-4 py-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'} flex items-center select-none`}>
                                <FontAwesomeIcon icon={faSeedling} className={`mr-2 ${activeDropdown === 'eLearning' ? 'text-blue-600' : 'text-gray-700'}`} /> Teknik Budidaya Ikan
                            </span>
                        </div>
                        
                        )}
                    </div>

                    {/* Hubungi Kami */}
                    <Link to="/hubungi-kami#hubungiKamiSection" className="hover:text-blue-600 transition-colors duration-200">
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
