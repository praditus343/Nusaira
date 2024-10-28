import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const SimulationChart = () => {
    const [formData, setFormData] = useState({
        nama: 'Simulation 2024-10-24',
        luasTambak: '1000',
        jumlahTebar: '2500',
        tanggalTebar: '2024-10-24',
        biomassa: 'Simulation 2024-10-24'
    });

    // Sample data untuk grafik
    const chartData = [
        { hari: 0, nilai1: 50, nilai2: 40 },
        { hari: 1, nilai1: 85, nilai2: 45 },
        { hari: 2, nilai1: 30, nilai2: 70 },
        { hari: 3, nilai1: 75, nilai2: 45 },
        { hari: 4, nilai1: 25, nilai2: 60 },
        { hari: 5, nilai1: 30, nilai2: 80 },
        { hari: 6, nilai1: 85, nilai2: 65 },
        { hari: 7, nilai1: 100, nilai2: 90 },
        { hari: 8, nilai1: 65, nilai2: 75 },
        { hari: 9, nilai1: 70, nilai2: 60 }
    ];

    return (
        <div className="bg-white w-full min-h-screen mb-10">
            <Header/>

            {/* Title Section */}
            <div className="p-4 mt-5">
                <h1 className="text-xl font-medium">Tambak Lele Seger</h1>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>Boyolali, Jawa Tengah</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-6 p-4 ">
                {/* Left Side - Form */}
                <div className="w-1/2 ">
                    <div className="bg-blue-100 rounded-lg shadow">
                        <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <span>Data Dasar</span>
                            <span>▼</span>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Nama</label>
                                <input
                                    type="text"
                                    value={formData.nama}
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Luas Tambak (x²)</label>
                                <input
                                    type="text"
                                    value={formData.luasTambak}
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setFormData({ ...formData, luasTambak: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Jumlah Tebar</label>
                                <input
                                    type="text"
                                    value={formData.jumlahTebar}
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setFormData({ ...formData, jumlahTebar: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Tanggal Tebar</label>
                                <input
                                    type="date"
                                    value={formData.tanggalTebar}
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setFormData({ ...formData, tanggalTebar: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Biomassa Maks. (kg/m2)</label>
                                <input
                                    type="text"
                                    value={formData.biomassa}
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => setFormData({ ...formData, biomassa: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="px-10 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mt-10 mb-10">
                                    Simpan
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Right Side - Graph */}
                <div className="w-1/2">
                    <div className="bg-blue-100 rounded-lg shadow h-full">
                        <div className="p-4 bg-blue-200 text-gray-700 rounded-t-lg shadow">
                            <span className="font-bold">Perkiraan</span>
                            <span>▼</span>
                        </div>
                        <div className="p-4">
                            <LineChart width={600} height={400} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hari" label={{ value: 'Hari', position: 'bottom' }} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="nilai1" stroke="#ff69b4" dot={true} />
                                <Line type="monotone" dataKey="nilai2" stroke="#00bcd4" dot={true} />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TambakSimulation() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <SimulationChart />
                <AIFloatingButton/>
                <Footer />
            </div>
        </div>
    );
}

export default TambakSimulation;
