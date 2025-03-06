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
import { ChevronDown } from "lucide-react";
import Error404Page from '../componen/ErrorPage';
import apiClient from '../service/axiosInstance';

const SupplierDashboard = () => {
    const { supplier } = useParams();
    // console.log(supplier);
    const [supplierData, setSupplierData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const displayedReviews = showMore ? reviews : reviews.slice(0, 3);

    useEffect(() => {
        const fetchSupplierData = async () => {
            setLoading(true);
            setError(null);
            setReviewError(null);
        
            try {
                const { data: supplierData } = await apiClient.get("/suppliers");
                const suppliers = supplierData.data;
                const selectedSupplier = suppliers.find(
                    (sup) => sup.supplier?.toLowerCase() === decodeURIComponent(supplier).toLowerCase()
                );
        
                if (!selectedSupplier) {
                    throw new Error(`Supplier "${decodeURIComponent(supplier)}" tidak ditemukan.`);
                }
        
                setSupplierData(selectedSupplier);
        
                const { data: productData } = await apiClient.get(`/products?supplierId=${selectedSupplier.id}`);
                setProducts(productData.data?.filter((p) => p.product_supplier_id === selectedSupplier.id) || []);
        
                try {
                    const { data: reviewData } = await apiClient.get(`/reviews?supplierId=${selectedSupplier.id}`);
                    setReviews(reviewData.data?.filter((r) => r.supplier_id === selectedSupplier.id) || []);
                } catch (reviewErr) {
                    console.error("Error fetching reviews:", reviewErr.message);
                    setReviewError("Gagal memuat ulasan");
                }
        
            } catch (err) {
                console.error("Error fetching data:", err.message);
                setError(err.message || "Gagal memuat data supplier, produk, atau ulasan");
            } finally {
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
        return (
            <div >
                <Error404Page />
            </div>);
    }

    if (!supplierData) {
        return (
            <div >
                <Error404Page />
            </div>
        );
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
                        <h3 className="font-semibold text-xl">Detail Supplier</h3>
                        <p>{supplierData.description}</p>
                        <p><strong>ketersediaan:</strong> {supplierData.availability}</p>
                    </div>
                    <div className="reviews-container bg-white rounded-xl shadow-md mx-10 p-6 border border-gray-300 mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Ulasan Pelanggan</h2>

                        {displayedReviews.length > 0 ? (
                            displayedReviews.map((review) => (
                                <div key={review.id} className="review-card mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
                                    <div className="flex items-center mb-3">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((star, index) => (
                                                <svg
                                                    key={index}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 15l-5.878 3.09 1.12-6.528-4.768-4.651 6.517-.948L10 1l2.99 5.963 6.517.948-4.768 4.651 1.12 6.528L10 15z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <span className=" text-gray-700 font-medium">{review.reviewer_name}</span>

                                    <p className="review-text text-gray-700 mb-3">{review.review_text}</p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Belum ada ulasan untuk supplier ini.</p>
                        )}

                        {reviews.length > 3 && (
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-4 flex items-center text-blue-600 hover:underline"
                            >
                                <span className="mr-2">{showMore ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}</span>
                                <ChevronDown size={20} className={`${showMore ? "rotate-180" : ""}`} />
                            </button>
                        )}
                    </div>


                    <div className="mb-8">
                        <h3 className="font-semibold text-xl mb-2 ml-10">Katalog Produk</h3>
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
                <div className="mt-10">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
