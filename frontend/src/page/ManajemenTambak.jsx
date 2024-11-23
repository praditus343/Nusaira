import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import AIFloatingButton from '../componen/AiFloatingButton';
import { Card, CardContent, CardHeader, CardTitle } from "../componen/CardManagement";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ManagementModal from '../componen/ManajemenModal';
import Header from '../componen/Header';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const DashboardManagement = () => {
    const [tambakData, setTambakData] = useState(null);
    const [tambakList, setTambakList] = useState([]);
    const [selectedTambakId, setSelectedTambakId] = useState(null);
    const [waterData, setWaterData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTambakData = async () => {
            try {
                const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setTambakData(data[0]);
                    setTambakList(data);
                    setSelectedTambakId(data[0].id);
                }
            } catch (error) {
                console.error('Error fetching tambak data:', error);
            }
        };
        fetchTambakData();
    }, []);

    useEffect(() => {
        const fetchWaterData = async () => {
            if (!selectedTambakId) {
                console.log('Tidak ada Tambak');
                return;
            }

            try {
                const response = await fetch(`https://nusaira-be.vercel.app/api/air`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const flattenedData = data.flat().filter(item => item && !Array.isArray(item));


                const filteredData = flattenedData
                    .filter(item => item.tambak_id === selectedTambakId)
                    .map(item => ({
                        ...item,
                        kabupaten: tambakData?.kabupaten || 'Unknown'
                    }));
               

                setWaterData(filteredData);
            } catch (error) {
                console.error('Error fetching water quality data:', error);
                setWaterData([]);
            }
        };
        fetchWaterData();
    }, [selectedTambakId]);

    const handleTambakChange = (event) => {
        const newTambakId = parseInt(event.target.value);
        setSelectedTambakId(newTambakId);
        const selectedTambak = tambakList.find(tambak => tambak.id === newTambakId);
        setTambakData(selectedTambak);
    };

    const analyzeData = (data) => {
        if (!data || data.length === 0) {
            return {
                ph: { status: 'Data Tidak Tersedia', value: null },
                suhu: { status: 'Data Tidak Tersedia', value: null },
                oksigen: { status: 'Data Tidak Tersedia', value: null },
                salinitas: { status: 'Data Tidak Tersedia', value: null }
            };
        }

        const latestData = data[data.length - 1];

        return {
            ph: {
                status: latestData.ph >= 7.0 && latestData.ph <= 8.5 ? 'Normal' : 'Perlu Perhatian',
                value: Number(latestData.ph.toFixed(1))
            },
            suhu: {
                status: latestData.suhu >= 25 && latestData.suhu <= 32 ? 'Normal' : 'Perlu Perhatian',
                value: Number(latestData.suhu.toFixed(1))
            },
            oksigen: {
                status: latestData.oksigen >= 4 ? 'Normal' : 'Perlu Perhatian',
                value: Number(latestData.oksigen.toFixed(1))
            },
            salinitas: {
                status: latestData.salinitas >= 10 && latestData.salinitas <= 25 ? 'Normal' : 'Perlu Perhatian',
                value: Number(latestData.salinitas.toFixed(1))
            }
        };
    };

    const analysis = analyzeData(waterData);

    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Laporan Analisis Kualitas Air", 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Lokasi: ${tambakData?.lokasi || 'N/A'}`, 105, 30, { align: "center" });
        doc.text(`Tanggal: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" });

        doc.setFontSize(16);
        doc.text("Analisis Parameter Kualitas Air", 20, 60);

        const tableColumn = ["Parameter", "Nilai", "Status", "Deskripsi"];
        const tableRows = [
            ["pH", `${analysis.ph.value?.toFixed(1) || 'N/A'}`, `${analysis.ph.status}`, "Menunjukkan tingkat keasaman atau kebasaan air."],
            ["Suhu", `${analysis.suhu.value?.toFixed(1) || 'N/A'} °C`, `${analysis.suhu.status}`, "Menunjukkan suhu air dalam satuan Celsius (°C)."],
            ["Oksigen", `${analysis.oksigen.value?.toFixed(1) || 'N/A'} mg/L`, `${analysis.oksigen.status}`, "Menunjukkan jumlah oksigen terlarut dalam air."],
            ["Salinitas", `${analysis.salinitas.value?.toFixed(1) || 'N/A'} ppt`, `${analysis.salinitas.status}`, "Menunjukkan tingkat kandungan garam dalam air."]
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 70,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [135, 206, 235], halign: 'center' },
        });

        let yPosition = doc.previousAutoTable.finalY + 20;
        doc.setFontSize(16);
        doc.text("Kesimpulan dan Rekomendasi", 20, yPosition);

        yPosition += 10;
        doc.setFontSize(12);
        if (analysis.ph.status !== 'Normal') {
            doc.text("- pH tidak normal. Pertimbangkan untuk melakukan penyesuaian keasaman air.", 20, yPosition, { maxWidth: 170 });
            yPosition += 10;
        }
        if (analysis.suhu.status !== 'Normal') {
            doc.text("- Suhu tidak normal. Atur suhu lingkungan untuk mencapai kondisi yang ideal.", 20, yPosition, { maxWidth: 170 });
            yPosition += 10;
        }
        if (analysis.oksigen.status !== 'Normal') {
            doc.text("- Oksigen terlarut rendah. Tambahkan aerasi untuk meningkatkan kadar oksigen.", 20, yPosition, { maxWidth: 170 });
            yPosition += 10;
        }
        if (analysis.salinitas.status !== 'Normal') {
            doc.text("- Salinitas tidak sesuai. Sesuaikan kandungan garam dalam air.", 20, yPosition, { maxWidth: 170 });
            yPosition += 10;
        }
        if (Object.values(analysis).every(param => param.status === 'Normal')) {
            doc.text("- Semua parameter dalam kondisi normal. Tidak ada tindakan khusus yang diperlukan.", 20, yPosition, { maxWidth: 170 });
        }

        doc.save(`Laporan_Kualitas_Air_${tambakData?.nama || 'Tambak'}.pdf`);
    };

    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="mt-4 ml-6 ">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-medium">{tambakData?.nama || 'Loading...'}</h1>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{tambakData?.provinsi || 'Loading...'},</span>
                                <span>{tambakData?.kabupaten || 'Loading...'}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mr-2">
                            <div className="flex items-center space-x-2 px-4">
                                <span className="text-gray-600">Daftar Tambak :</span>
                                <div className="relative items-center">
                                    <select
                                        className="block w-[300px] pr-8 pl-4 border rounded-lg py-2 appearance-none"
                                        value={selectedTambakId || ''}
                                        onChange={handleTambakChange}
                                    >
                                        {tambakList.map(tambak => (
                                            <option key={tambak.id} value={tambak.id}>
                                                {tambak.nama}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none"
                                    />
                                </div>
                            </div>

                            <button onClick={exportToPDF} className="px-10 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Ekspor Laporan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4 ml-5">
                <h1 className="text-2xl font-bold mb-2">Dashboard Manajemen Tambak</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-5"
                >
                    + Tambah Data Air
                </button>

                {/* Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monitoring Kualitas Air</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={waterData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="kabupaten"
                                        label={{
                                            position: 'bottom',
                                            offset: 0
                                        }}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [Number(value).toFixed(1), ""]}
                                    />
                                    <Legend />
                                    <Bar dataKey="ph" fill="#8884d8" name="pH" />
                                    <Bar dataKey="suhu" fill="#82ca9d" name="Suhu (°C)" />
                                    <Bar dataKey="oksigen" fill="#ffc658" name="Oksigen (mg/L)" />
                                    <Bar dataKey="salinitas" fill="#ff7300" name="Salinitas (ppt)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Analysis Report */}
                <Card>
                    <CardHeader className='border-gray-300 mb-6'>
                        <CardTitle>Laporan Analisis Kualitas Air</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* pH Air */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">pH Air</h3>
                                <p className="text-2xl mb-2">{analysis.ph.value?.toFixed(1) || 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.ph.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.ph.status}
                                </p>
                            </div>

                            {/* Suhu Air */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Suhu Air</h3>
                                <p className="text-2xl mb-2">{analysis.suhu.value?.toFixed(1) || 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.suhu.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.suhu.status}
                                </p>
                            </div>

                            {/* Oksigen Terlarut */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Oksigen Terlarut</h3>
                                <p className="text-2xl mb-2">{analysis.oksigen.value?.toFixed(1) || 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.oksigen.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.oksigen.status}
                                </p>
                            </div>

                            {/* Salinitas */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Salinitas</h3>
                                <p className="text-2xl mb-2">{analysis.salinitas.value?.toFixed(1) || 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.salinitas.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.salinitas.status}
                                </p>
                            </div>
                        </div>

                        {/* Rekomendasi */}
                        <div className="mt-6">
                            <h3 className="font-bold mb-2">Rekomendasi Tindakan:</h3>
                            <ul className="list-disc pl-6">
                                {analysis.ph.status !== 'Normal' && (
                                    <li className="text-red-500 font-semibold text-md">Perlu penyesuaian pH air</li>
                                )}
                                {analysis.suhu.status !== 'Normal' && (
                                    <li className="text-red-500 font-semibold text-md">Perlu pengaturan suhu air</li>
                                )}
                                {analysis.oksigen.status !== 'Normal' && (
                                    <li className="text-red-500 font-semibold text-md">Perlu penambahan aerasi</li>
                                )}
                                {analysis.salinitas.status !== 'Normal' && (
                                    <li className="text-red-500 font-semibold text-md">Perlu penyesuaian salinitas</li>
                                )}
                                {Object.values(analysis).every(param => param.status === 'Normal') && (
                                    <li className="text-green-500 font-semibold text-md">Semua parameter dalam kondisi normal</li>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {modalOpen && (
                <ManagementModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
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
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Management;