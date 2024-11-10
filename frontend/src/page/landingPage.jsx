import React, { useState,useRef ,useEffect } from 'react';
import Footer from "../componen/Footer";
import Navbar from "../componen/Navbar";
import Testimonial from "../componen/Testimonical";
import "./pageCss/landingpage.css";
import imgPetambak from "../assets/img/landing_page_sebelum_daftar/landingsb12.png"
import imgSponsor from "../assets/img/landing_page_sebelum_daftar/landingsb3.png"
import imgAi from "../assets/img/landing_page_sebelum_daftar/landingsb6.png"
import imgRead from "../assets/img/landing_page_sebelum_daftar/landingsb13.png"
import img1 from "../assets/img/kabar_lele/kbl4.png"
import img2 from "../assets/img/landing_page_sebelum_daftar/landingsb7.png"
import img3 from "../assets/img/landing_page_sebelum_daftar/landingsb8.png"
import img4 from "../assets/img/kabar_lele/kbl2.png"
import img5 from "../assets/img/landing_page_sebelum_daftar/landingsb10.png"
import img6 from "../assets/img/landing_page_sebelum_daftar/landingsb15.png"
import img7 from "../assets/img/kabar_lele/kbl5.png"
import img8 from "../assets/img/kabar_lele/kbl7.png"
import PopupModal from "../componen/PopUpModal";

function LandingPage() {
    const getRandomDate = () => {
        const start = new Date(2020, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
    };

    
    const [modalContent, setModalContent] = useState({
        isOpen: false,
        title: '',
        description: ''
    });


    const modalContents = {
        features: {
            title: "Dapatkan lebih banyak dari fitur kami!",
            description: "Login untuk membuka akses premium dan manfaatkan potensi maksimal."
        },
        eLearning: {
            title: "Siap belajar lebih efektif?",
            description: "Login sekarang untuk akses penuh ke e-Learning kami dan nikmati pengalaman belajar yang interaktif"
        },
        priceChart: {
            title: "Pantau harga lele terbaru",
            description: "Login untuk akses tren harga terkini dan buat keputusan yang lebih cerdas"
        },
        news: {
            title: "Akses Berita Lengkap",
            description: "Login untuk membaca artikel lengkap dan dapatkan update terbaru seputar budidaya lele"
        },
        ai: {
            title: "Dapatkan lebih banyak dari fitur AI kami!",
            description: "Login untuk membuka akses premium dan manfaatkan potensi maksimal."
        }
    };


    const openModal = (contentType) => {
        setModalContent({
            isOpen: true,
            title: modalContents[contentType].title,
            description: modalContents[contentType].description
        });
    };

    const closeModal = () => {
        setModalContent({
            isOpen: false,
            title: '',
            description: ''
        });
    };

    const sectionRefs = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);  


    return (
        <>
            <Navbar />
            <div  ref={(el) => (sectionRefs.current[0] = el)} className="flex items-stretch justify-between p-8 bg-white mt-4 ml-10 fade-in-scroll">
                <div className="flex-1 pr-8 flex flex-col justify-between fade-in">
                    <div>
                        <h1 className=" font-bold mb-4">
                            Maksimalkan Hasil Budidaya Lele<br /> Anda Dengan Pendekatan <br />Terintegrasi
                        </h1>
                        <p className="text-gray-600 mb-10 mt-4">
                            Kesuksesan budidaya berawal dari pengecekan rutin dan<br /> monitoring kondisi terkini budidaya. Teliti hingga hal yang <br /> sering disepelekan.
                        </p>
                    </div>
                    <div className="flex space-x-4 mt-[50px]">
                        <button className="px-20 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300" onClick={() => openModal('features')}>
                            Lihat Detail
                        </button>
                        <button className="px-20 py-2 border border-gray-500 text-gray-700 rounded-md hover:bg-gray-200 boder-4 transition duration-300" >
                            Hubungi Kami
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <div className="relative w-full">
                        <img
                            src={imgPetambak}
                            alt="Image Petambak"
                            className="absolute inset-0 h-[400px] w-[600px] object-cover"
                        />
                    </div>
                </div>
            </div>

            <div  ref={(el) => (sectionRefs.current[1] = el)}className="bg-white p-4 mb-6 relative fade-in-scroll-left ">
                <p className="text-gray-600 text-xl  mb-4 text-left mt-10 ml-14">
                    Dipercaya Oleh:
                </p>
                <div className="flex justify-start ml-6">
                    <img
                        src={imgSponsor}
                        alt="Sponsor"
                        className="h-[150px] w-[800px] object-cover"
                    />
                </div>
            </div>

            <div ref={(el) => (sectionRefs.current[2] = el)}  className="flex items-center bg-white mt-2 fade-in-scroll-left">
                <div className="flex-1 mr-10">
                    <div className="relative w-[600px] h-[600px] ">
                        <img
                            src={imgAi}
                            alt="Robot Assistant"
                            className="absolute inset-0 h-full w-full object-contain ml-[10px]"
                        />
                    </div>
                </div>
                <div className=" w-32 flex-1">
                    <h2 className=" font-bold mb-6 mt-10">Memastikan tambak berjalan lancar hingga <br />panen</h2>
                    <p className=" text-gray-600 mb-6 mt4">
                        Untuk memastikan tambak berjalan lancar hingga <br />panen, penting untuk melakukan perencanaan yang <br /> matang dengan menganalisis lokasi dan memilih jenis<br /> ikan yang tepat. Kualitas air harus dipantau secara rutin,<br />memastikan parameter seperti pH dan kadar oksigen<br /> dalam kondisi baik. Pakan yang berkualitas dan sesuai<br /> dengan kebutuhan ikan juga sangat penting untuk<br /> pertumbuhan optimal.
                    </p>
                    <div>
                        <button
                            onClick={() => openModal('ai')}
                            className="bg-blue-500 text-white px-20 py-2 rounded hover:bg-blue-600 mt-4"
                        >
                            Selengkapnya
                        </button>
                    </div>
                </div>
            </div>

            <div ref={(el) => (sectionRefs.current[3] = el)} className="flex items-center justify-between p-10 bg-white mt-[20px] ml-8 fade-in-scroll-left">
                <div className="flex-1 pr-8 pl-2">
                    <h2 className=" font-bold mb-2">Memastikan tambak berjalan lancar hingga <br /> panen</h2>
                    <p className=" text-gray-600 mb-4 mt-4 text-left max-w-lg">
                        Siap untuk Meningkatkan Keberhasilan Budidaya Lele<br /> Anda? Daftar di E-Learning Kami dan nikmati<br /> pengalaman belajar yang mendalam dengan <br />pengetahuan praktis dari para ahli di bidangnya. Anda akan diajarkan cara mengidentifikasi masalah yang mungkin terjadi dan bagaimana cara mengatasinya, memastikan setiap langkah budidaya Anda berjalan lancar
                    </p>
                    <div>
                        <button
                            onClick={() => openModal('eLearning')}
                            className="bg-blue-500 text-white px-20 py-2 rounded hover:bg-blue-600 mt-4"
                        >
                            Selengkapnya
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="relative w-[575px] h-[575px] ">
                        <img
                            src={imgRead}
                            alt="Image Read"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>

            <div ref={(el) => (sectionRefs.current[4] = el)} className="bg-white p-2 mt-5 ml-14 mr-14 fade-in-scroll-left">
                <h2 className="font-bold mb-4 text-center">Grafik Tren Harga Bibit Lele: Pantau Harga Secara Real Time</h2>
                <p className="text-center mt-4 max-w-2x1 mx-auto">
                    Cek Harga Jual dan Beli Lele Secara Real Time: Pantau Perubahan Harga Setiap Detik,<br /> Temukan Waktu Terbaik untuk Transaksi, dan Maksimalkan Keuntungan Anda dengan Akses Langsung ke Informasi Harga Terbaru yang Selalu Diperbarui
                </p>
                <div className="grid grid-cols-2 gap-4 mt-10">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="border border-gray-300 p-4 rounded">
                            <h4 className="font-medium mb-2">LAMPUNG</h4>
                            <div className="flex justify-between mb-2">
                                <span>Rp 53.000</span>
                                <span className="text-red-500">Rp 1.000</span>
                            </div>
                            <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="border border-gray-300 p-4 rounded">
                            <h4 className="font-medium mb-2">JAWA TENGAH</h4>
                            <div className="flex justify-between mb-2">
                                <span>Rp 58.000</span>
                                <span className="text-green-500">Rp 2.000</span>
                            </div>
                            <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="border border-gray-300 p-4 rounded">
                            <h4 className="font-medium mb-2">JAWA TENGAH</h4>
                            <div className="flex justify-between mb-2">
                                <span>Rp 58.000</span>
                                <span className="text-green-500">Rp 2.000</span>
                            </div>
                            <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div>
                        {/* Right Column */}
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="border p-4 rounded cursor-pointer border-gray-300"
                                    onClick={() => openModal('priceChart')}
                                >
                                    <h4 className="font-medium mb-2">JAWA TIMUR</h4>
                                    <div className="flex justify-between mb-2">
                                        <span>Rp 53.000</span>
                                        <span className="text-green-500">Rp 1.000</span>
                                    </div>
                                    <div className="h-16 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div ref={(el) => (sectionRefs.current[5] = el)} className="bg-white p-6 mt-10 ml-10 mr-8 fade-in-scroll-left">
                <h1 className="text-xl font-bold mb-4 text-center">
                    Ikuti Berita Terbaru Mengenai berita berita tentang<br />
                    budidaya
                </h1>
                <div className="grid grid-cols-4 gap-4 mt-10">
                    {[
                        { img: img1, title: "Persiapan Kolam Lele yang Efektif" },
                        { img: img2, title: "Teknik Pemberian Pakan Lele yang Tepat" },
                        { img: img3, title: "Mengatasi Penyakit Lele dengan Cepat" },
                        { img: img4, title: "Meningkatkan Produktivitas Budidaya Lele" },
                        { img: img5, title: "Memilih Bibit Lele yang Berkualitas" },
                        { img: img6, title: "Tips Pemanenan Lele yang Efisien" },
                        { img: img7, title: "Inovasi Teknologi Untuk Budidaya Lele" },
                        { img: img8, title: "Peluang Usaha Budidaya Lele yang Menjanjikan" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border rounded-lg overflow-hidden h-[250px] border-grey-300 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
                            onClick={() => openModal('news')}
                        >
                            <img src={item.img} alt={`News thumbnail ${i + 1}`} className="w-full h-48 object-cover" />
                            <div className="p-2">
                                <p className="text-sm font-semibold">{item.title}</p>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                                        <p className="text-xs text-gray-500">Nusaira</p>
                                    </div>
                                    <p className="text-xs text-gray-500 ml-2">{getRandomDate()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => openModal('news')} 
                        className="flex items-center text-blue-500 hover:text-blue-700"
                    >
                        Selanjutnya
                        <i className="fas fa-arrow-right ml-1 mt-1"></i>
                    </button>
                </div>
            </div>
            <PopupModal
                isOpen={modalContent.isOpen}
                title={modalContent.title}
                description={modalContent.description}
                onClose={closeModal}
            />
            <Testimonial />
            <Footer />
        </>
    );
}

export default LandingPage;