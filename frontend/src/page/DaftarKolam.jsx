import React, { useState, useEffect } from 'react';
import Sidebar from '../componen/SideBar';
import Footer from '../componen/Footer';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';
import { TambahDataKematianModal, TambahDataPakanModal, TambahDataPanenModal, TambahDataPenyakitModal, TambahLeleSegerModal, TambahJumlahAnco } from '../componen/ModalTambak';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import FishTable from '../componen/FishTable';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const CustomButton = ({ children, variant, className, ...props }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'outline':
                return 'border border-gray-300 bg-white hover:bg-gray-50';
            case 'ghost':
                return 'hover:bg-gray-100';
            default:
                return 'bg-blue-600 hover:bg-blue-700 text-white';
        }
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg transition-colors ${getVariantClass()} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const buttons = [
    'Mulai siklus',
    'Kematian',
    'Penyakit',
    'Pakan',
    'Panen',
    'Anco'
];

const PondTable = () => {
    const [activeModal, setActiveModal] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [tambakData, setTambakData] = useState(null);

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleButtonClick = (buttonText) => {
        switch (buttonText) {
            case 'Mulai siklus':
                setActiveModal('TambahLeleSegerModal');
                break;
            case 'Kematian':
                setActiveModal('TambahDataKematianModal');
                break;
            case 'Penyakit':
                setActiveModal('TambahDataPenyakitModal');
                break;
            case 'Pakan':
                setActiveModal('TambahDataPakanModal');
                break;
            case 'Panen':
                setActiveModal('TambahDataPanenModal');
                break;
            case 'Anco':
                setActiveModal('TambahJumlahAnco');
                break;
            default:
                setActiveModal(null);
                break;
        }
    };

    useEffect(() => {
        fetch('https://nusaira-be.vercel.app/api/tambak')
            .then((response) => response.json())
            .then((data) => {
                setTambakData(data[0]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const closeModal = () => setActiveModal(null);

    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            {/* Location Info */}
            <div className="mb-6 ml-10 mr-6 mt-5">
                {tambakData ? (
                    <>
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
                            <span className="text-black">
                                {tambakData?.provinsi || "Provinsi Tidak Tersedia"},
                                {` `}
                                {tambakData?.kabupaten || "Kabupaten Tidak Tersedia"}
                            </span>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">Loading data...</p>
                )}
            </div>

            {/* Buttons for each modal */}
            <div className="flex flex-wrap gap-2 ml-8 mr-5 mt-2 mb-5">
                {buttons.map((text) => (
                    <button
                        key={text}
                        onClick={() => handleButtonClick(text)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ml-2"
                    >
                        {text}
                    </button>
                ))}
            </div>

            {/* Render modals based on active modal */}
            {activeModal === 'TambahLeleSegerModal' && <TambahLeleSegerModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'TambahDataKematianModal' && <TambahDataKematianModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'TambahDataPenyakitModal' && <TambahDataPenyakitModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'TambahDataPakanModal' && <TambahDataPakanModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'TambahDataPanenModal' && <TambahDataPanenModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'TambahJumlahAnco' && <TambahJumlahAnco isOpen={true} onClose={closeModal} />}

            {/* Main Card */}
            <CustomCard className="p-4 ml-10 mr-8 border-2 border-gray-300">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Detail Daftar Kolam</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari Kolam"
                                className="pl-8 pr-4 py-2 border rounded-lg block w-full sm:text-lg border border-blue-600 placeholder-blue-600 text-blue-600 z-30"
                                value={searchTerm}
                                onChange={handleSearch}
                                autoFocus={false}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="w-4 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600"
                            />
                        </div>

                        <CustomButton className="bg-blue-600 hover:bg-blue-700 text-white w-30 px-6 flex items-center justify-center">
                            <span className="text-lg font-bold mr-2">+</span> <span className="font-normal">Kolam</span>
                        </CustomButton>
                        <CustomButton
                            variant="ghost"
                            className="w-32 flex items-center justify-start"
                            onClick={() => navigate('/PengaturanTambak')}
                        >
                            <FontAwesomeIcon
                                icon={faCog}
                                className="text-blue-400 text-md pointer-events-none w-[48px]"
                            />
                        </CustomButton>
                    </div>

                </div>
                {/* Table */}
                <FishTable filterTerm={searchTerm} />
            </CustomCard>
        </div>
    );
};

function PondManagement() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <PondTable />
                <AIFloatingButton />
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default PondManagement;
