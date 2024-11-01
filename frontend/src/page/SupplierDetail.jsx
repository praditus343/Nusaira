import React from 'react';
import { useParams } from 'react-router-dom';
import ProductImage1 from '../assets/img/kabar_lele/kbl1.png';
import ProductImage2 from '../assets/img/kabar_lele/kbl3.png';
import ProductImage3 from '../assets/img/kabar_lele/kbl6.png';
import SupplierImage1 from '../assets/img/assets_foto/f1.png';
import SupplierImage2 from '../assets/img/assets_foto/f2.png';
import SupplierImage3 from '../assets/img/assets_foto/f3.png';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Footer from '../componen/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Header from '../componen/Header';

const SupplierDashboard = () => {
    const { supplierId } = useParams();
    const handleContactSupplier = () => {
        const whatsappNumber = supplier.whatsapp;
        const message = "Halo, saya tertarik dengan produk Anda.";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const handleOrderClick = (productName, productPrice) => {
        const whatsappNumber = supplier.whatsapp;
        const message = `Halo, saya ingin memesan ${productName} dengan harga ${productPrice}.`;
        const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, '_blank');
    };


    const supplierData = {
        "Mr. Prengky": {
            province: "Jawa Tengah",
            location: "Boyolali",
            description: "Mr. Prengky adalah supplier terpercaya dengan reputasi tinggi sejak 2010.",
            Image: SupplierImage1,
            rating: 4.5,
            reviews: [
                "Ikan segar dan kualitasnya sangat baik!",
                "Pengiriman cepat dan layanan ramah."
            ],
            availability: "Stok Tersedia",
            whatsapp: "6285700120940",
            products: [
                {
                    name: "Ikan Lele Segar",
                    price: "Rp.50.000",
                    Image: ProductImage1,
                    details: "Ikan lele segar pilihan dengan kualitas terbaik."
                },
                {
                    name: "Ikan Lele Premium",
                    price: "Rp.60.000",
                    Image: ProductImage2,
                    details: "Ikan lele premium dengan ukuran besar dan daging tebal."
                },
                {
                    name: "Ikan Lele Organik",
                    price: "Rp.70.000",
                    Image: ProductImage3,
                    details: "Ikan lele organik yang sehat dan lezat."
                }
            ]
        },
        "Mr. Rito": {
            province: "Jawa Tengah",
            location: "Boyolali",
            description: "Mr. Rito telah berpengalaman dalam penyediaan ikan lele selama lebih dari 5 tahun.",
            Image: SupplierImage2,
            rating: 4.8,
            reviews: [
                "Kualitas terbaik! Sangat puas dengan pelayanan.",
                "Selalu memesan dari sini."
            ],
            availability: "Stok Tersedia",
            whatsapp: "6289501877105",
            products: [
                {
                    name: "Ikan Lele Segar",
                    price: "Rp.70.000",
                    Image: ProductImage3,
                    details: "Ikan lele segar langsung dari peternakan."
                },
                {
                    name: "Ikan Lele Jumbo",
                    price: "Rp.80.000",
                    Image: ProductImage1,
                    details: "Ikan lele jumbo berkualitas tinggi."
                },
                {
                    name: "Ikan Lele Frosen",
                    price: "Rp.65.000",
                    Image: ProductImage2,
                    details: "Ikan lele beku untuk kualitas lebih tahan lama."
                }
            ]
        },
        "Mr. Iqbalhan": {
            province: "Jawa Tengah",
            location: "Boyolali",
            description: "Mr. Iqbalhan dikenal dengan produk berkualitas tinggi dan pengiriman yang tepat waktu.",
            Image: SupplierImage3,
            rating: 4.6,
            reviews: [
                "Pelayanan yang sangat memuaskan!",
                "Ikan lele sangat fresh dan enak."
            ],
            availability: "Stok Habis",
            whatsapp: "6289630488945",
            products: [
                {
                    name: "Ikan Lele Khusus",
                    price: "Rp.85.000",
                    Image: ProductImage1,
                    details: "Ikan lele khusus dengan kualitas premium."
                },
                {
                    name: "Ikan Lele Olahan",
                    price: "Rp.90.000",
                    Image: ProductImage2,
                    details: "Ikan lele olahan siap saji."
                }
            ]
        }
    };

    const supplier = supplierData[supplierId];

    if (!supplier) {
        return <div className="text-red-500">Supplier tidak ditemukan.</div>;
    }

    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="flex items-center mb-4 ml-5 mr-10 mt-10">
                <img src={supplier.Image} alt={supplierId} className="w-24 h-24 object-cover rounded-full border-4 border-blue-400 shadow-lg" />
                <div className="ml-4">
                    <h2 className="text-3xl font-semibold">{supplierId}</h2>
                    <p className="text-gray-500">{supplier.location}, {supplier.province}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md mb-6 ml-10 mr-10 mt-5">
                <h3 className="font-semibold text-xl">Detail Supplier:</h3>
                <p>{supplier.description}</p>
                <p><strong>Ketersediaan:</strong> {supplier.availability}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-300 ml-10 mr-10 mt-5">
                <h3 className="font-semibold text-xl">Rating dan Ulasan:</h3>
                <p><strong>Rating:</strong> {supplier.rating} / 5</p>
                <ul className="list-disc pl-5">
                    {supplier.reviews.map((review, index) => (
                        <li key={index} className="text-gray-600">- {review}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-xl mb-2 ml-10">Katalog Produk:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supplier.products.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 border border-gray-300 ml-10 mr-10 mt-5">
                            <img src={product.Image} alt={product.name} className="w-full h-32 object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold text-lg">{product.name}</h4>
                                <p className="text-gray-500">{product.details}</p>
                                <p className="font-bold text-blue-600">{product.price}</p>
                                <button
                                    className="bg-blue-400 text-white px-4 py-2 mt-2 rounded-lg"
                                    onClick={() => handleOrderClick(product.name, product.price)}
                                >
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center ml-10 mt-4" onClick={handleContactSupplier}>
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                    Hubungi Supplier
                </button>
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
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
