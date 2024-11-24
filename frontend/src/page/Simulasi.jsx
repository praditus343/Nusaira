import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const SimulationChart = () => {
    const [formData, setFormData] = useState({
        nama: '',
        luasTambak: '',
        jumlahTebar: '',
        tanggalTebar: '',
        biomassa: ''
    });

    const [chartData, setChartData] = useState([]);

    const handleSave = () => {
        const luas = parseFloat(formData.luasTambak);
        const jumlah = parseFloat(formData.jumlahTebar);
        const biomassa = parseFloat(formData.biomassa);
        const newChartData = Array.from({ length: 10 }, (_, index) => {
            return {
                hari: index,
                nilai1: (biomassa * jumlah * index * 0.1).toFixed(2),
                nilai2: (biomassa * jumlah * index * 0.05).toFixed(2)
            };
        });

        setChartData(newChartData);
    };

    return (
        <div className="bg-white w-full min-h-screen mb-10">
            <Header />

            {/* Title Section */}
            <div className="mt-5 ml-10 mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Simulasi Tambak Lele</h1>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <MapPin className="w-5 h-5 text-cyan-500" />
                    <span className="text-lg font-medium">Boyolali, Jawa Tengah</span>
                </div>
                <p className=" text-gray-500 mt-3">
                    Halaman ini dibuat sebagai simulasi untuk menampilkan data tambak lele. Informasi yang ditampilkan bersifat fiktif dan digunakan untuk keperluan Pengujian.
                </p>
            </div>


            {/* Main Content */}
            <div className="flex gap-6 p-4 ml-6">
                {/* Left Side - Form */}
                <div className="w-1/2">
                    <div className="bg-blue-100 rounded-lg shadow">
                        <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <span>Data Dasar</span>
                            <span>▼</span>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Nama Tambak</label>
                                <input
                                    type="text"
                                    value={formData.nama}
                                    className="w-full p-2 border rounded-md border-gray-400"
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Luas Tambak (m²)</label>
                                <input
                                    type="text"
                                    value={formData.luasTambak}
                                    className="w-full p-2 border rounded-md border-gray-400"
                                    onChange={(e) => setFormData({ ...formData, luasTambak: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Jumlah Tebar</label>
                                <input
                                    type="text"
                                    value={formData.jumlahTebar}
                                    className="w-full p-2 border rounded-md border-gray-400"
                                    onChange={(e) => setFormData({ ...formData, jumlahTebar: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Tanggal Tebar</label>
                                <input
                                    type="date"
                                    value={formData.tanggalTebar}
                                    className="w-full p-2 border rounded-md border-gray-400"
                                    onChange={(e) => setFormData({ ...formData, tanggalTebar: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Biomassa Maks. (kg/m²)</label>
                                <input
                                    type="text"
                                    value={formData.biomassa}
                                    className="w-full p-2 border rounded-md border-gray-400"
                                    onChange={(e) => setFormData({ ...formData, biomassa: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="px-10 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mt-10 mb-10"
                                    onClick={handleSave}
                                >
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
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
}

export default TambakSimulation;
