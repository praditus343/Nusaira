import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgElearningNusaira from "../assets/img/landing_page_sudah_daftar/landingsub2.png";
import imgConfusePeople from "../assets/img/landing_page_sudah_daftar/landingsub3.png";
import AIFloatingButton from '../componen/AiFloatingButton.jsx';
import AquacultureDashboard from '../componen/AquacultureDashboard.jsx';
import Footer from '../componen/Footer.jsx';
import Header from '../componen/Header.jsx';
import Sidebar from '../componen/SideBar.jsx';
import WrapBanner from '../componen/WrapBanner.jsx';
import {
    fetchTambak,
    fetchSiklus,
    fetchKematian,
    fetchPakan,
    fetchPanen,
    fetchAnco
} from '../../service/AxiosConfig.js';
import "./pageCss/Home.css"
import { Plus, ArrowRight } from 'lucide-react';


const DashboardContent = () => {
    const [isDashboardView, setIsDashboardView] = useState(false);
    const [tambakData, setTambakData] = useState(null);
    const [siklusData, setSiklusData] = useState(null);
    const [kematianData, setKematianData] = useState(null);
    const [pakanData, setPakanData] = useState(null);
    const [panenData, setPanenData] = useState(null);
    const [ancoData, setAncoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleOpenYoutube = () => {
        window.open("https://www.youtube.com/@Nusai_ra", "_blank");
    };

    const handleOpenTelegram = () => {
        window.open("https://t.me/+h3tvLhSnoWI3M2Q9", "_blank");
    };

    useEffect(() => {
        const fetchAllDataSequentially = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const tambakResponse = await fetchTambak();
                setTambakData(tambakResponse[0]);

                const siklusResponse = await fetchSiklus();
                setSiklusData(siklusResponse);

                const kematianResponse = await fetchKematian();
                setKematianData(kematianResponse);

                const pakanResponse = await fetchPakan();
                setPakanData(pakanResponse);

                const panenResponse = await fetchPanen();
                setPanenData(panenResponse);

                const ancoResponse = await fetchAnco();
                setAncoData(ancoResponse);

                setIsDashboardView(true);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllDataSequentially();
    }, []);

    useEffect(() => {
        if (!tambakData && !isLoading) {
            setShowModal(true);
        }
    }, [tambakData, isLoading]);


    return (
        <div className="bg-white w-full min-h-screen mb-10">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
                                Tambahkan Tambak Anda
                            </h3>
                            <p className="text-gray-600 text-center mb-6 leading-relaxed">
                                Anda belum memiliki tambak. Silakan tambahkan tambak terlebih dahulu untuk melanjutkan.
                            </p>

                            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>

                            <div className="flex justify-center">
                                <Link to="/InputTambak">
                                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full hover:shadow-lg hover:opacity-90 transition duration-300 ease-in-out flex items-center gap-2">
                                        <Plus className="h-5 w-5" />
                                        Tambah Tambak
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    {isLoading ? (
                        <p className="text-gray-500 blinking-text ml-8 mb-4">Loading ...</p>
                    ) : isError ? (
                        <p className="text-red-500 ml-8 mb-4">Gagal memuat data. Coba lagi nanti.</p>
                    ) : (
                        <div>
                            {isDashboardView ? (
                                <div>
                                    <div className="flex justify-between items-center">
                                        {tambakData ? (
                                            <>
                                                <div className="flex flex-col ml-6">
                                                    <h2 className="text-xl font-semibold mb-2 text-black">
                                                        Tambak {tambakData?.nama || "Nama Tambak Tidak Tersedia"}
                                                    </h2>
                                                    <div className="flex items-center text-gray-600">
                                                        <svg
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-500">
                                                            {tambakData?.provinsi || "Provinsi Tidak Tersedia"},
                                                            {` `}
                                                            {tambakData?.kabupaten || "Kabupaten Tidak Tersedia"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-gray-500">Data tidak ditemukan</p>
                                        )}
                                    </div>
                                    <AquacultureDashboard />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center mb-6 ml-6">
                                    {tambakData ? (
                                        <>
                                            <div className="flex flex-col">
                                                <h2 className="text-xl font-semibold mb-2 text-black">
                                                    Tambak {tambakData?.nama || "Nama Tambak Tidak Tersedia"}
                                                </h2>
                                                <div className="flex items-center text-gray-600">
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-500">
                                                        {tambakData?.provinsi || "Provinsi Tidak Tersedia"},
                                                        {` `}
                                                        {tambakData?.kabupaten || "Kabupaten Tidak Tersedia"}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500">Data tidak ditemukan</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="bg-white border-2 border-blue-600 rounded-lg shadow-md mb-10 ml-6 mr-16">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-500">Solusi Untuk Tambak Lele</h2>
                        <WrapBanner />
                    </div>
                </div>

                <div className="flex space-x-4 mr-16 ml-6">
                    <div className="w-2/3 bg-white border-2 border-blue-600 rounded-lg shadow-md">
                        <div className="p-3 bg-blue-400 rounded-lg ml-4 mr-4 mt-6 mb-4">
                            <div className="flex items-center space-x-4">
                                <img src={imgConfusePeople} alt="Question mark" className="w-50 h-60 object-cover ml-4 mr-4" draggable="false" />
                                <div>
                                    <h3 className="font-semibold mb-2 text-white">Rencanakan Proses Pertama Anda</h3>
                                    <p className="text-white mb-7">
                                        Anda Perlu Memulai Siklus agar Dapat<br /> Mencatat dan Mengelola Budidaya Secara Efisien.
                                    </p>
                                    <Link to="/AksesPremium">
                                        <button className="px-20 py-2 bg-blue-600 text-white rounded-md mt-5  no-select mb-10">
                                            Mulai Sekarang
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 bg-white border-2 border-blue-600 rounded-lg shadow-md">
                        <div className="p-6">
                            <h3 className="text-center text-xl text-gray-500 font-semibold mb-4">Budidaya Bersama NusAIra</h3>
                            <div className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <Link to="/Perpustakaan">
                                            <button>
                                                <img
                                                    src={imgElearningNusaira}
                                                    alt="E-learning"
                                                    className="w-[500px] h-32 rounded-lg inline-block"
                                                    draggable="false"
                                                />
                                            </button>
                                        </Link>
                                    </div>
                                    <button className="bg-blue-500 rounded-md py-1 w-full text-white flex items-center p-3 py-3" onClick={handleOpenYoutube}>
                                        <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 mr-2" />
                                        <span className="ml-2 text-sm">YouTube NusAIra</span>
                                    </button>
                                    <button className="bg-blue-500 rounded-md py-1 w-full text-white flex items-center p-3 py-3 mt-4" onClick={handleOpenTelegram}>
                                        <FontAwesomeIcon icon={faTelegram} className="w-6 h-6 mr-2" />
                                        <span className="ml-2 text-sm">Telegram NusAIra</span>
                                    </button>
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
