import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import InteractiveMap from '../componen/InteraktifMap';
import { Search } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';
import { useNavigate, Link } from 'react-router-dom';



const PriceMonitoringDashboard = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();


    const data = [
        { tanggal: "10 Februari 2024", lokasi: "Boyolali", supplier: "Mr. Prengky", harga: 53000, marketPrice: 55000 },
        { tanggal: "10 Januari 2024", lokasi: "Boyolali", supplier: "Mr. Prengky", harga: 71000, marketPrice: 70000 },
        // Tambahkan lebih banyak data di sini...
    ];

    // Fungsi untuk memfilter data berdasarkan input
    const filteredData = data.filter(row => {
        const lowerCaseInput = searchInput.toLowerCase();
        const isDateMatch = row.tanggal.toLowerCase().includes(lowerCaseInput);
        const isLocationMatch = row.lokasi.toLowerCase().includes(lowerCaseInput);
        const isSupplierMatch = row.supplier.toLowerCase().includes(lowerCaseInput);
        const isHargaMatch = String(row.harga).includes(lowerCaseInput);
        return isDateMatch || isLocationMatch || isSupplierMatch || isHargaMatch;
    });





    const totalPrice = data.reduce((total, row) => total + (row.harga < row.marketPrice ? -row.harga : row.harga), 0);

    const priceData = [
        { date: '13 Okt', price: 53000 },
        { date: '14 Okt', price: 52000 },
        { date: '15 Okt', price: 53000 },
        { date: '16 Okt', price: 52000 },
        { date: '17 Okt', price: 53000 },
        { date: '20 Okt', price: 52000 },
    ];


    const chartData = [
        {
            location: 'LAMPUNG',
            dateRange: '13 Okt - 20 Okt',
            currentPrice: 53000,
            priceChange: -1000,
            chartColor: '#ef4444', // Merah
        },
        {
            location: 'Palembang',
            dateRange: '15 Okt - 27 Okt',
            currentPrice: 60000,
            priceChange: 5000,
            chartColor: '#10b981', // Hijau
        },
        // Tambahkan lebih banyak data sesuai kebutuhan
    ];

    const handleDetailClick = (row) => {
        navigate('/PriceHistory');
        console.log("Detail for row:", row);
    };






    return (
        <div className="  space-y-6 space-x-6 bg-white w-full min-h-screen">
            <Header />

            <div className="space-y-4">
                {/* Date Selector */}
                <div className="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>10 Oktober 2024</span>
                </div>


                <div className="flex space-x-4">
                    <div className="flex items-center border border-blue-600 rounded-full overflow-hidden">
                        {/* Input Lokasi */}
                        <div className="relative flex-1  ">
                            <input
                                type="text"
                                placeholder="Pilih Lokasi"
                                className="outline-none px-80 py-2 w-full text-left"
                                style={{ paddingLeft: '40px' }}
                            />
                            <svg
                                className="w-4 h-5 absolute left-3 top-3 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {/* Dropdown Lokasi */}
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-full select"
                            style={{
                                color: 'white',
                                appearance: 'none',
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '1.5rem',
                                paddingRight: '1.5rem',
                            }}
                        >
                            <option value="" className="hidden"></option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>

                    </div>
                    <div className="flex items-center border border-blue-600 rounded-full overflow-hidden flex-grow-1">
                        {/* Input Harga */}
                        <input
                            type="text"
                            placeholder="Harga (KG)"
                            className="outline-none px-4 py-2 w-full"
                        />

                        {/* Dropdown Harga */}
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-full select"
                            style={{
                                color: 'white',
                                appearance: 'none',
                                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '1.5rem',
                                paddingRight: '1.5rem',
                            }}
                        >
                            <option value="" className="hidden"></option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>

                    </div>
                </div>
            </div>
            {/* Map Section */}
            <div className="border border-blue-600 rounded-lg bg-white shadow rounded-lg p-6">
                <InteractiveMap />
            </div>

            {/* Price Trends - New Layout */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Tren Harga Lele Di Berbagai Provinsi</h2>
                <div className="flex gap-4">
                    {/* Left Side - Big Chart */}
                    <div className="flex-grow-0 flex-shrink-0 w-1/2">
                        <>
                            <div className="flex flex-col justify-between mb-2shadow rounded-lg">
                                {chartData.map((item, index) => (
                                    <div key={index} className="flex-grow-0 flex-shrink-0 mt-4 border-2 border-grey-300">
                                        <div className="bg-white shadow rounded-lg p-4 h-full">
                                            <div className="flex flex-col justify-between h-full mt-4">
                                                <div>
                                                    <h3 className="font-semibold">{item.location}</h3>
                                                    <p className="text-sm text-gray-500">{item.dateRange}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">Rp {item.currentPrice.toLocaleString('id-ID')}</p>
                                                    <p
                                                        className={`text-sm ${item.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                                                            }`}
                                                    >
                                                        {item.priceChange >= 0
                                                            ? `+Rp ${item.priceChange.toLocaleString('id-ID')}`
                                                            : `-Rp ${Math.abs(item.priceChange).toLocaleString('id-ID')}`}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Grafik */}
                                            <ResponsiveContainer width="100%" height={300}>
                                                <LineChart data={priceData}>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="price"
                                                        stroke={item.chartColor}
                                                        strokeWidth={2}
                                                        dot={false}
                                                    />
                                                    <XAxis dataKey="date" />
                                                    <YAxis />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </>
                    </div>

                    <div className="flex-grow flex-shrink min-w-0 w-1/2">
                        <div className="grid grid-cols-2 gap-4 h-[900px] overflow-y-auto pr-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                                <Link to="/PriceTrend" key={index} className="bg-white shadow-md rounded-lg p-4 border-2 border-gray-300 cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <h3 className="font-semibold">JAWA TIMUR</h3>
                                            <p className="text-sm text-gray-500">13 Okt - 20 Okt</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">Rp 53.000</p>
                                            <p className="text-sm text-green-500">+Rp 1.000</p>
                                        </div>
                                    </div>
                                    <ResponsiveContainer width="100%" height={100}>
                                        <LineChart data={priceData}>
                                            <Line
                                                type="monotone"
                                                dataKey="price"
                                                stroke="#10b981" // Warna hijau untuk perubahan harga positif
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="container mx-auto p-6 border border-blue-600 rounded-lg bg-white shadow rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">List Harga Lele Terbaru</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex-2 relative w-full">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="border-2 border-blue-600 rounded-lg pl-10 py-2 w-full text-blue-600 placeholder-blue-300"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2 text-blue-600" />
                        </div>
                        <button className="flex items-center justify-center bg-blue-100 text-blue-600 p-4 rounded-full shadow-md hover:bg-blue-200">
                            <FontAwesomeIcon icon={faShareAlt} className="text-blue-600" size="lg" />
                        </button>
                    </div>
                </div>
                <table className="min-w-full border-collapse block md:table">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Lokasi</th>
                            <th className="p-3 text-left">Supplier</th>
                            <th className="p-3 text-left">Harga (Kg)</th>
                            <th className="p-3 text-left">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-3">Tidak ada data ditemukan</td>
                            </tr>
                        ) : (
                            (filteredData.length === 0 && searchInput) ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-3">Tidak ada data ditemukan</td>
                                </tr>
                            ) : (
                                (searchInput ? filteredData : data).map((row, index) => (
                                    <tr key={index} className="bg-blue-100 border-b border-blue-300">
                                        <td className="p-3">{row.tanggal}</td>
                                        <td className="p-3">{row.lokasi}</td>
                                        <td className="p-3">{row.supplier}</td>
                                        <td className={`p-3 ${row.harga < row.marketPrice ? 'text-red-500' : 'text-green-500'}`}>
                                            {row.harga < row.marketPrice ? `-Rp. ${Math.abs(row.harga)}` : `+Rp. ${row.harga.toLocaleString()}`}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                                                onClick={() => handleDetailClick(row)}
                                            >
                                                Lihat Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


function HargaLele() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <AIFloatingButton />
            <div className="flex-1 overflow-auto">
                <PriceMonitoringDashboard />
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default HargaLele;