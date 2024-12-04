import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../componen/ContactModal';

const PriceCard = ({ supplier, location, province, price, whatsapp, image, description }) => {
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
                    <div className="flex items-center gap-3">
                        <img
                            src={image}
                            alt={supplier}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-600">Supplier</p>
                            <p className="text-blue-600">{supplier}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-start gap-1 text-right">
                        <div>
                            <div className="flex justify-between items-center">
                                <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                                <p className="text-blue-600 mb-1 mt-1.5">{location}</p>
                            </div>
                            <p className="text-xs text-blue-600">{province}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-600">Deskripsi</p>
                    <p className="text-sm text-gray-700">{description}</p>
                </div>
                <div className="mb-10">
                    <p className="text-sm text-gray-600">Harga (kg)</p>
                    <p className="text-xl font-semibold text-blue-600 mb-4">
                        {price
                            ? `Rp ${Math.round(price).toLocaleString('id-ID')}`
                            : 'Harga belum ditentukan'}
                    </p>

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

            {isModalOpen && <ContactPopup onClose={closeModal} supplier={supplier} whatsapp={whatsapp} />}
        </div>
    );
};

const PriceHistory = ({ searchInput }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const suppliersResponse = await fetch('https://nusaira-be.vercel.app/api/suppliers');
                const suppliersData = await suppliersResponse.json();
                setSuppliers(suppliersData.data);
    
                const productsResponse = await fetch('https://nusaira-be.vercel.app/api/products');
                const productsData = await productsResponse.json();
                setProducts(productsData.data);
    
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    const combinedData = Array.isArray(suppliers) 
    ? suppliers.map((supplier) => {
        const supplierProducts = Array.isArray(products)
            ? products.filter((p) => p.product_supplier_id === supplier.id)
            : [];
        
        const cheapestProduct =
            supplierProducts.length > 0
                ? supplierProducts.reduce((min, product) =>
                      parseFloat(product.product_price) < parseFloat(min.product_price)
                          ? product
                          : min
                  )
                : null;
        
        return {
            ...supplier,
            price: cheapestProduct ? cheapestProduct.product_price : 'Harga tidak tersedia',
        };
    }) 
    : []; 
    

    const filteredSuppliers = combinedData.filter((item) =>
        searchInput
            ? item.supplier.toLowerCase().includes(searchInput.toLowerCase())
            : true
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    if (error) return <div>Terjadi kesalahan: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
                <PriceCard
                    key={supplier.id}
                    supplier={supplier.supplier}
                    province={supplier.province}
                    location={supplier.location}
                    price={supplier.price}
                    whatsapp={supplier.whatsapp}
                    image={supplier.image}
                    description={supplier.description}
                />
            ))}
        </div>
    );
};

export default PriceHistory;