import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Search, ChevronDown } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';

const PriceMonitoringDashboard = () => {
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

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


    const tableData = [
        { date: '10 Februari 2024', location: 'Boyolali', supplier: 'Mr. Paingut', price: 53000 },
        { date: '10 Februari 2024', location: 'Boyolali', supplier: 'Mr. Paingut', price: 53000 },
        { date: '10 Februari 2024', location: 'Boyolali', supplier: 'Mr. Paingut', price: 53000 },
        { date: '10 Februari 2024', location: 'Boyolali', supplier: 'Mr. Paingut', price: 53000 },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - mapPosition.x,
            y: e.clientY - mapPosition.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        setMapPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="  space-y-6 space-x-6 bg-gray-100 w-full min-h-screen">
                        {/* Header */}
                        <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Harga Lele</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
                            {/* Round image for the Indonesian flag */}
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/indonesian-flag.png" // Replace with the actual path to the flag image
                                    alt="Bendera Indonesia"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            {/* Round image for profile photo */}
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/profile-photo.png" // Replace with the actual path to the profile photo
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300 w-full" />
            </header>


            <div className="flex items-center space-x-4">
      {/* Date Selector */}
      <div className="flex items-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>10 Oktober 2024</span>
      </div>

      {/* Location Selector */}
      <div className="flex items-center border border-blue-500 rounded-full p-2 w-72">
        <input
          type="text"
          placeholder="Pilih Lokasi"
          className="outline-none w-full px-2"
        />
        <button className="bg-blue-500 text-white rounded-full px-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L9 4.586l3.707 3.707a1 1 0 001.414 0l4 4a1 1 0 01-1.414 1.414L9 7.414 5.707 10.707a1 1 0 01-1.414 0l-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Price Selector */}
      <div className="flex items-center border border-blue-500 rounded-full p-2 w-36">
        <span className="text-gray-500">Harga (Kg)</span>
        <button className="bg-blue-500 text-white rounded-full px-2 ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L9 4.586l3.707 3.707a1 1 0 001.414 0l4 4a1 1 0 01-1.414 1.414L9 7.414 5.707 10.707a1 1 0 01-1.414 0l-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  


            {/* Map Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Persebaran Harga Lele (kg)</h2>
                <div
                    className="relative h-64 bg-gray-100 rounded-lg overflow-hidden cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Interactive SVG Map */}
                    <svg
                        viewBox="0 0 800 400"
                        className="w-full h-full"
                        style={{
                            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
                            transition: isDragging ? 'none' : 'transform 0.1s',
                        }}
                    >
                        <path
                            d="M100,100 L700,100 L700,300 L100,300 Z"
                            fill="#e5e7eb"
                            stroke="#d1d5db"
                            strokeWidth="2"
                        />
                        {/* Map Markers */}
                        <circle cx="200" cy="150" r="10" fill="#ef4444" />
                        <circle cx="400" cy="200" r="10" fill="#3b82f6" />
                        <circle cx="600" cy="150" r="10" fill="#8b5cf6" />
                    </svg>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Jawa Barat</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Jawa Timur</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Lampung</span>
                    </div>
                </div>
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
                                    <div key={index} className="flex-grow-0 flex-shrink-0 mt-4">
                                        <div className="bg-white shadow rounded-lg p-4 h-full">
                                            {/* Flex atas-bawah */}
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

                    {/* Right Side - Scrollable Grid */}
                    <div className="flex-grow flex-shrink min-w-0 w-1/2">
                        <div className="grid grid-cols-2 gap-4 h-[900px] overflow-y-auto pr-2">
                            {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((index) => (
                                <div key={index} className="bg-white shadow rounded-lg p-4">
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Daftar Harga Supplier</h2>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Lokasi</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Supplier</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="border-t px-4 py-2 text-sm text-gray-700">{row.date}</td>
                                <td className="border-t px-4 py-2 text-sm text-gray-700">{row.location}</td>
                                <td className="border-t px-4 py-2 text-sm text-gray-700">{row.supplier}</td>
                                <td className="border-t px-4 py-2 text-sm text-gray-700">Rp {row.price.toLocaleString('id-ID')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




function HargaLele() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <PriceMonitoringDashboard />
                <Footer />
            </div>
        </div>
    );
}

export default HargaLele;