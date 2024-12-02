import { MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../componen/ContactModal';


const PriceCard = ({ supplier, location, price, province }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const viewDetails = () => {
        navigate(`/supplier/${supplier}`);
    };

    return (
        <div className="p-6 bg-blue-200 rounded-lg shadow-sm flex items-center justify-between">
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

const PriceHistory = ({ searchInput }) => {
    const supplierData = [
        { supplier: "Mr. Prengky", province: "Jawa Tengah", location: "Boyolali", price: "Rp.50.000" },
        { supplier: "Mr. Rito", province: "Jawa Tengah", location: "Boyolali", price: "Rp.70.000" },
        { supplier: "Mr. Iqbalhan", province: "Jawa Tengah", location: "Boyolali", price: "Rp.85.000" },
    ];

    // Filter supplier berdasarkan input pencarian
    const filteredSuppliers = supplierData.filter((item) =>
        searchInput
            ? item.supplier.toLowerCase().includes(searchInput.toLowerCase())
            : true
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier, index) => (
                <PriceCard
                    key={index}
                    supplier={supplier.supplier}
                    province={supplier.province}
                    location={supplier.location}
                    price={supplier.price}
                />
            ))}
        </div>
    );
};


export default PriceHistory;
