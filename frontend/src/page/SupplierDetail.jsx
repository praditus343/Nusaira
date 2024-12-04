import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Footer from '../componen/Footer';
import Header from '../componen/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import RatingReviewForm from './RatingAndReviewForm';

const SupplierDashboard = () => {
    const { supplier } = useParams();
    console.log(supplier);

    const [supplierData, setSupplierData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const supplierResponse = await axios.get(`https://nusaira-be.vercel.app/api/suppliers`);
                const suppliers = supplierResponse.data.data;

                console.log("Suppliers fetched:", suppliers);
                const selectedSupplier = suppliers.find((sup) => {
                    console.log("Checking supplier:", sup.supplier);
                    return sup.supplier && sup.supplier.toLowerCase() === decodeURIComponent(supplier).toLowerCase();
                });

                if (!selectedSupplier) {
                    console.error(`Supplier "${decodeURIComponent(supplier)}" tidak ditemukan.`);
                    throw new Error('Supplier not found');
                }

                setSupplierData(selectedSupplier);

                const productsResponse = await axios.get(
                    `https://nusaira-be.vercel.app/api/products?supplierId=${selectedSupplier.id}`
                );


                console.log("Products response:", productsResponse.data);

                if (Array.isArray(productsResponse.data.data)) {
                    const filteredProducts = productsResponse.data.data.filter(
                        product => product.product_supplier_id === selectedSupplier.id
                    );

                    console.log("Filtered Products:", filteredProducts);
                    setProducts(filteredProducts);
                } else {
                    console.error("Products data is not an array:", productsResponse.data);
                    setError('Produk tidak ditemukan atau format data tidak sesuai');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err.message);
                setError('Gagal memuat data supplier atau produk');
                setLoading(false);
            }
        };

        fetchSupplierData();
    }, [supplier]);


    const handleContactSupplier = () => {
        if (!supplierData || !supplierData.whatsapp) return;
        const message = "Hello, Saya Tertarik Dengan produk Kamu.";
        const url = `https://wa.me/${supplierData.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const handleOrderClick = (productName, productPrice) => {
        if (!supplierData || !supplierData.whatsapp) return;
        const message = `Hello, Saya Mau Melakukan Pemesanan ${productName} Dengan Harga ${productPrice}.`;
        const whatsappLink = `https://api.whatsapp.com/send?phone=${supplierData.whatsapp}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!supplierData) {
        return <div className="text-red-500">Supplier not found.</div>;
    }

    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto">
                <div className="bg-white w-full min-h-screen">
                    <Header />
                    <div className="flex items-center mb-8 ml-10 mr-10 mt-10">
                        <img
                            src={supplierData.image || '/default-supplier.png'}
                            alt={supplierData.name}
                            className="w-24 h-24 object-cover rounded-full border-4 border-blue-400 shadow-lg"
                        />
                        <div className="ml-4">
                            <h2 className="text-3xl font-semibold">{supplierData.supplier}</h2>
                            <p className="text-gray-500">{supplierData.location}, {supplierData.province}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md mb-8 ml-10 mr-10 mt-5">
                        <h3 className="font-semibold text-xl">Supplier Details:</h3>
                        <p>{supplierData.description}</p>
                        <p><strong>Availability:</strong> {supplierData.availability}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold text-xl mb-2 ml-10">Product Catalog:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div
                                        key={product.id || index}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 border border-gray-300 ml-10 mr-10 mt-5"
                                    >
                                        <div></div>
                                        <img
                                            src={product.product_image || '/default-product.png'}
                                            alt={product.product_title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4 flex flex-col">
                                            <div>
                                                <h4 className="font-semibold text-lg mb-2">{product.product_title}</h4>
                                                <p className="text-gray-500 mb-1">{product.product_description}</p>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <p className="text-xl font-semibold text-blue-600 mb-4">
                                                    {product.product_price
                                                        ? `Rp ${Math.round(product.product_price).toLocaleString('id-ID')}`
                                                        : 'Harga belum ditentukan'}
                                                </p>
                                            </div>
                                            <button
                                                className="bg-blue-400 text-white px-4 py-2 rounded-lg mt-4"
                                                onClick={() => handleOrderClick(product.product_title, product.product_price)}
                                            >
                                                Pesan Sekarang
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="ml-10 text-gray-500">No products available for this supplier.</p>
                            )}
                        </div>
                    </div>
                    <div className='mb-20'>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center ml-10 mt-10"
                            onClick={handleContactSupplier}
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                            Hubungi Supplier
                        </button>
                    </div>

                    <div className="ml-10 mr-10 mb-8">
                        <RatingReviewForm supplierId={supplierData.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SupplierDetail = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <SupplierDashboard />
                <AIFloatingButton />
                <div className="mt-20">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
