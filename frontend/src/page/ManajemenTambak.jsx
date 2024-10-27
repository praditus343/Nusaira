
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import AIFloatingButton from '../componen/AiFloatingButton';
import { Card, CardContent, CardHeader, CardTitle } from "../componen/CardManagement";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardManagement = () => {

    // Data sampel untuk grafik - dalam implementasi nyata ini akan diambil dari database/API
    const waterData = [
        { tanggal: '1 Oct', ph: 7.2, suhu: 28, oksigen: 5.8, salinitas: 15 },
        { tanggal: '2 Oct', ph: 7.4, suhu: 29, oksigen: 5.5, salinitas: 16 },
        { tanggal: '3 Oct', ph: 7.1, suhu: 27, oksigen: 6.0, salinitas: 15 },
        { tanggal: '4 Oct', ph: 7.3, suhu: 28, oksigen: 5.7, salinitas: 14 },
        { tanggal: '5 Oct', ph: 7.5, suhu: 30, oksigen: 5.4, salinitas: 15 },
    ];

    // Fungsi untuk menganalisis data
    const analyzeData = (data) => {
        const lastReading = data[data.length - 1];
        const prevReading = data[data.length - 2];

        return {
            ph: {
                status: lastReading.ph >= 7.0 && lastReading.ph <= 8.5 ? 'Normal' : 'Perlu Perhatian',
                trend: lastReading.ph > prevReading.ph ? 'Meningkat' : 'Menurun',
                value: lastReading.ph
            },
            suhu: {
                status: lastReading.suhu >= 25 && lastReading.suhu <= 32 ? 'Normal' : 'Perlu Perhatian',
                trend: lastReading.suhu > prevReading.suhu ? 'Meningkat' : 'Menurun',
                value: lastReading.suhu
            },
            oksigen: {
                status: lastReading.oksigen >= 4 ? 'Normal' : 'Perlu Perhatian',
                trend: lastReading.oksigen > prevReading.oksigen ? 'Meningkat' : 'Menurun',
                value: lastReading.oksigen
            },
            salinitas: {
                status: lastReading.salinitas >= 10 && lastReading.salinitas <= 25 ? 'Normal' : 'Perlu Perhatian',
                trend: lastReading.salinitas > prevReading.salinitas ? 'Meningkat' : 'Menurun',
                value: lastReading.salinitas
            }
        };
    };

    const analysis = analyzeData(waterData);


    return (
        <div className="bg-white w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Manajemen Tambak</h1>
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

            <div className="mt-4 ml-8 mr-8">
                <div className="p-4">

                    <div className="flex justify-between items-center">

                        <div>
                            <h1 className="text-xl font-medium">Tambak Lele Seger</h1>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>Boyolali, Jawa Tengah</span>
                            </div>
                        </div>


                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 px-4">
                                <span className="text-gray-600">Daftar Tambak :</span>
                                <select className="px-40 py-1.5 border rounded-md bg-white text-left">
                                    <option value="tambak1">Tambak Lele Seger</option>
                                    <option value="tambak2">Tambak Lele Kencana</option>

                                </select>
                            </div>
                            <button className="px-10 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Export Laporan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4 ml-5">
                <h1 className="text-2xl font-bold mb-4">Dashboard Manajemen Tambak</h1>

                {/* Grafik */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monitoring Kualitas Air</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={waterData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="tanggal" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
                                    <Line type="monotone" dataKey="suhu" stroke="#82ca9d" name="Suhu (°C)" />
                                    <Line type="monotone" dataKey="oksigen" stroke="#ffc658" name="Oksigen (mg/L)" />
                                    <Line type="monotone" dataKey="salinitas" stroke="#ff7300" name="Salinitas (ppt)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Laporan Analisis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Laporan Analisis Kualitas Air</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* pH */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-bold mb-2">pH Air</h3>
                                <p className="text-2xl mb-2">{analysis.ph.value}</p>
                                <p className={`text-sm ${analysis.ph.status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                                    Status: {analysis.ph.status}
                                </p>
                                <p className="text-sm text-gray-600">Trend: {analysis.ph.trend}</p>
                            </div>

                            {/* Suhu */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-bold mb-2">Suhu Air</h3>
                                <p className="text-2xl mb-2">{analysis.suhu.value}°C</p>
                                <p className={`text-sm ${analysis.suhu.status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                                    Status: {analysis.suhu.status}
                                </p>
                                <p className="text-sm text-gray-600">Trend: {analysis.suhu.trend}</p>
                            </div>

                            {/* Oksigen */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-bold mb-2">Kadar Oksigen</h3>
                                <p className="text-2xl mb-2">{analysis.oksigen.value} mg/L</p>
                                <p className={`text-sm ${analysis.oksigen.status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                                    Status: {analysis.oksigen.status}
                                </p>
                                <p className="text-sm text-gray-600">Trend: {analysis.oksigen.trend}</p>
                            </div>

                            {/* Salinitas */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-bold mb-2">Salinitas</h3>
                                <p className="text-2xl mb-2">{analysis.salinitas.value} ppt</p>
                                <p className={`text-sm ${analysis.salinitas.status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                                    Status: {analysis.salinitas.status}
                                </p>
                                <p className="text-sm text-gray-600">Trend: {analysis.salinitas.trend}</p>
                            </div>
                        </div>

                        {/* Rekomendasi */}
                        <div className="mt-6">
                            <h3 className="font-bold mb-2">Rekomendasi Tindakan:</h3>
                            <ul className="list-disc pl-6">
                                {analysis.ph.status !== 'Normal' && (
                                    <li className="text-red-600">Perlu penyesuaian pH air</li>
                                )}
                                {analysis.suhu.status !== 'Normal' && (
                                    <li className="text-red-600">Perlu pengaturan suhu air</li>
                                )}
                                {analysis.oksigen.status !== 'Normal' && (
                                    <li className="text-red-600">Perlu penambahan aerasi</li>
                                )}
                                {analysis.salinitas.status !== 'Normal' && (
                                    <li className="text-red-600">Perlu penyesuaian salinitas</li>
                                )}
                                {Object.values(analysis).every(param => param.status === 'Normal') && (
                                    <li className="text-green-600">Semua parameter dalam kondisi normal</li>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

function Management() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardManagement />
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
}

export default Management;
