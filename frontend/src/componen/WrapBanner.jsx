import React, { useRef, useState, useEffect } from 'react';
import imgComputer from "../assets/img/landing_page_sudah_daftar/landingsub4.png";
import imgAi from "../assets/img/landing_page_sebelum_daftar/landingsb6.png";
import imgRead from "../assets/img/landing_page_sebelum_daftar/landingsb13.png";
import "./ComponenCss/AntiBlok.css";
import { Link } from 'react-router-dom';


const WrapBanner = () => {
    const scrollRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const cardWidth = 400;

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoScrollEnabled && scrollRef.current) {
                scrollRef.current.scrollLeft += cardWidth;
                if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
                    scrollRef.current.scrollLeft = 0;
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [autoScrollEnabled]);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        setAutoScrollEnabled(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setAutoScrollEnabled(true);
    };

    return (
        <div
            className="overflow-x-auto cursor-grab scroll-smooth"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="flex space-x-4 w-max">
                <div className="bg-blue-600 rounded-lg p-4 flex justify-between items-center min-w-[400px] shadow-lg border-2 border-grey-300 transition-all duration-300">
                    <div className="flex-1">
                        <h2 className="font-semibold text-white mb-2 no-select">Bingung Ingin Cek Kualitas Tambak Lele?</h2>
                        <p className="text-gray-300 mb-4 no-select">
                            Temukan Solusi Terbaik untuk Memantau dan Meningkatkan <br />
                            Kualitas Tambak Anda! Bergabunglah Bersama Kami<br />
                            dan Dapatkan Data Real-Time yang Akurat untuk<br />
                            Meningkatkan Hasil Panen Anda!
                        </p>
                        <Link to="/AksesPremium">
                            <button className="px-20 py-2 bg-blue-400 text-white rounded-md mt-5 font-semibold no-select">
                                Berlangganan Sekarang
                            </button>
                        </Link>
                    </div>
                    <div className="ml-4 no-select">
                        <img src={imgComputer} alt="Illustration" className="w-48 h-48 object-cover no-select" draggable="false" />
                    </div>
                </div>

                <div className="bg-blue-600 rounded-lg p-4 flex justify-between items-center min-w-[400px] shadow-lg border-2 border-grey-300 transition-all duration-300">
                    <div className="flex-1">
                        <h2 className="font-semibold text-white mb-2 no-select">Ingin Tambak Lele Lebih Berkualitas? Temukan<br /> Caranya di Sini</h2>
                        <p className="text-gray-300 mb-4 no-select">
                            Tingkatkan kualitas tambak lele Anda dengan e-learning berupa <br/>perpustakaan digital
                            yang berisi buku panduan budidaya!
                        </p>
                        <Link to="/AksesPremium">
                            <button className="px-20 py-2 bg-blue-400 text-white rounded-md mt-8 font-semibold no-select">
                                Berlanganan Sekarang
                            </button>
                        </Link>
                    </div>
                    <div className="flex-shrink-0 ml-4 no-select">
                        <img src={imgRead} alt="Illustration" className="w-48 h-48 object-cover no-select" draggable="false" />
                    </div>
                </div>

                <div className="bg-blue-600 rounded-lg p-4 flex justify-between items-center min-w-[400px] shadow-lg border-2 border-grey-300 transition-all duration-300">
                    <div className="flex-1">
                        <h2 className="font-semibold text-white mb-2 no-select">Butuh Bantuan? AI Chatbot Siap Pandu Anda<br /> Memastikan Kualitas Tambak Lele</h2>
                        <p className="text-gray-300 mb-4 no-select">
                            Dapatkan Solusi Cepat dan Tepat untuk Kualitas Tambak <br /> Lele Anda
                        </p><Link to="/AksesPremium">
                            <button className="px-20 py-2 bg-blue-400 text-white rounded-md mt-5 font-semibold no-select">
                                Berlangganan Sekarang
                            </button>
                        </Link>
                    </div>
                    <div className="flex-shrink-0  no-select">
                        <img src={imgAi} alt="Illustration" className="w-52 h-52 object-cover no-select" draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WrapBanner;
