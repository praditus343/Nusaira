import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MapPin } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';
import PriceHistoryAndPrediction from '../componen/PriceHistoryAndPrediction';
import ContactPopup from '../componen/ContactModal';

const priceData = [
    { kg: '1 Kg', price: 'Rp. 50.000' },
    { kg: '2 Kg', price: 'Rp. 50.000' },
    { kg: '3 Kg', price: 'Rp. 50.000' },
    { kg: '4 Kg', price: 'Rp. 50.000' },
    { kg: '5 Kg', price: 'Rp. 50.000' },
    { kg: '6 Kg', price: 'Rp. 50.000' },
    { kg: '7 Kg', price: 'Rp. 50.000' },
];

const PriceCard = ({ supplier, location, price, province }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); 

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle navigating to the supplier details page
    const viewDetails = () => {
        navigate(`/supplier/${supplier}`); 
    };

    return (
        <div className="p-4 bg-blue-200 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Supplier</p>
                        <p className="text-blue-600">{supplier}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex items-start gap-1 text-right">
                        <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                        <div>
                            <p className="text-blue-600">{location}</p>
                            <p className="text-xs text-blue-600">{province}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <p className="text-sm text-gray-600">Harga (kg)</p>
                    <p className="font-medium text-blue-600">{price}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={openModal}
                        className="px-4 py-2 text-blue-500 border-2 border-blue-600 rounded-lg text-sm font-medium"
                    >
                        Lihat Kontak
                    </button>
                    <button
                        onClick={viewDetails} 
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg text-sm"
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>

            {isModalOpen && <ContactPopup onClose={closeModal} supplier={supplier} />}
        </div>
    );
};

const PriceDashboard = () => (
    <div className='bg-white w-full min-h-screen'>
        <Header />
        <div className="bg-white p-6 rounded-lg mr-5 ml-5">
            <h2 className="text-lg font-medium mb-4">Boyolali</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Boyolali, Jawa Tengah</span>
            </div>

            {/* Current Prices Table */}
            <div className="mb-8 border border-blue-600 rounded-xl">
                <div className="flex justify-between mb-4 mr-4 ml-4 ">
                    <div className='mt-4'>
                        <h4 className='text-medium text-gray-500'>Boyolali</h4>
                        <h3 className="text-blue-500">Harga Lele Grade premium</h3>
                    </div>
                    <div className="flex gap-8">
                        <div className='mt-4'>
                            <h4 className='text-medium text-gray-500'>Supplier</h4>
                            <p className="text-blue-500">Mr. Prengky</p>
                        </div>
                        <div className='mt-4'>
                            <h4 className='text-medium text-gray-500'>Contact</h4>
                            <p className="text-blue-500">Lihat Kontak</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-5 mb-2">
                    {priceData.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex justify-between items-center pb-2 ${idx !== priceData.length - 1 ? 'border-b border-blue-300' : ''
                                }`}
                        >
                            <span className='ml-4 mr-4'>{item.kg}</span>
                            <span className="ml-4 mr-4">{item.price}</span>
                        </div>
                    ))}
                </div>
            </div>
            <PriceHistoryAndPrediction />
            <div>
                <h3 className="mb-4">Harga Lainnya</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PriceCard
                        supplier="Mr. Prengky"
                        province="Jawa Tengah"
                        location="Boyolali"
                        price="Rp.50.000"
                    />
                    <PriceCard
                        supplier="Mr. Rito"
                        province="Jawa Tengah"
                        location="Boyolali"
                        price="Rp.70.000"
                    />
                    <PriceCard
                        supplier="Mr. Iqbalhan"
                        province="Jawa Tengah"
                        location="Boyolali"
                        price="Rp.85.000"
                    />
                </div>
            </div>
        </div>
    </div>
);

function PriceHistory() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <PriceDashboard />
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
}

export default PriceHistory;
