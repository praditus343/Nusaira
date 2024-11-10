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
    const [waterData, setWaterData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ph, setPh] = useState(null);
    const [suhu, setSuhu] = useState(null);
    const [oksigen, setOksigen] = useState(null);
    const [salinitas, setSalinitas] = useState(null);

    const lokasi = "Boyolali"; // Ganti dengan lokasi yang sesuai

    useEffect(() => {
        console.log("Current water data in dashboard:", waterData);
        if (waterData.length > 0) {
            const latestData = waterData[waterData.length - 1];
            console.log("Latest water analysis data:", latestData);

            setPh(latestData.ph);
            setSuhu(latestData.suhu);
            setOksigen(latestData.oksigen);
            setSalinitas(latestData.salinitas);
        }
    }, [waterData]);


    const analyzeData = (data) => {
        console.log("Analyzing data:", data);

        // Cek apakah data tidak kosong dan singleReading memiliki properti yang diharapkan
        if (data.length === 0) {
            console.warn("No data available for analysis.");
            return {
                ph: { status: 'Data Tidak Tersedia', value: null },
                suhu: { status: 'Data Tidak Tersedia', value: null },
                oksigen: { status: 'Data Tidak Tersedia', value: null },
                salinitas: { status: 'Data Tidak Tersedia', value: null }
            };
        }

        const singleReading = data[0];

        // Cek jika properti ada pada singleReading
        if (!singleReading.ph || !singleReading.suhu || !singleReading.oksigen || !singleReading.salinitas) {
            console.warn("Incomplete data in single reading:", singleReading);
            return {
                ph: { status: 'Data Tidak Lengkap', value: singleReading.ph || null },
                suhu: { status: 'Data Tidak Lengkap', value: singleReading.suhu || null },
                oksigen: { status: 'Data Tidak Lengkap', value: singleReading.oksigen || null },
                salinitas: { status: 'Data Tidak Lengkap', value: singleReading.salinitas || null }
            };
        }

        return {
            ph: {
                status: singleReading.ph >= 7.0 && singleReading.ph <= 8.5 ? 'Normal' : 'Perlu Perhatian',
                value: singleReading.ph
            },
            suhu: {
                status: singleReading.suhu >= 25 && singleReading.suhu <= 32 ? 'Normal' : 'Perlu Perhatian',
                value: singleReading.suhu
            },
            oksigen: {
                status: singleReading.oksigen >= 4 ? 'Normal' : 'Perlu Perhatian',
                value: singleReading.oksigen
            },
            salinitas: {
                status: singleReading.salinitas >= 10 && singleReading.salinitas <= 25 ? 'Normal' : 'Perlu Perhatian',
                value: singleReading.salinitas
            }
        };
    };



    const handleOnSubmit = (data) => {
        console.log("Data submitted:", data);
        setWaterData((prevData) => [
            ...prevData,
            {
                lokasi: lokasi, // Tambahkan lokasi di sini
                ph: data.parsedPh,
                suhu: data.parsedSuhu,
                oksigen: data.parsedOksigen,
                salinitas: data.parsedSalinitas
            }
        ]);
    };

    const analysis = analyzeData(waterData);
    console.log("Analysis results:", analysis);

    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Laporan Analisis Kualitas Air", 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Lokasi: ${lokasi}`, 105, 30, { align: "center" });
        doc.text(`Tanggal: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" });

        doc.setFontSize(16);
        doc.text("Analisis Parameter Kualitas Air", 20, 60);

        const tableColumn = ["Parameter", "Nilai", "Status", "Deskripsi"];
        const tableRows = [
            ["pH", `${analysis.ph.value}`, `${analysis.ph.status}`, "Menunjukkan tingkat keasaman atau kebasaan air."],
            ["Suhu", `${analysis.suhu.value} °C`, `${analysis.suhu.status}`, "Menunjukkan suhu air dalam satuan Celsius (°C)."],
            ["Oksigen", `${analysis.oksigen.value} mg/L`, `${analysis.oksigen.status}`, "Menunjukkan jumlah oksigen terlarut dalam air."],
            ["Salinitas", `${analysis.salinitas.value} ppt`, `${analysis.salinitas.status}`, "Menunjukkan tingkat kandungan garam dalam air."]
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


        doc.save(`Laporan_Kualitas_Air_${lokasi}.pdf`);
    };


    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="mt-4 ml-6 ">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-medium">Tambak Lele Seger</h1>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>Boyolali, Jawa Tengah</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mr-2">
                            <div className="flex items-center space-x-2 px-4">
                                <span className="text-gray-600">Daftar Tambak :</span>
                                <div className="relative  items-center">
                                    <select className="block w-[300px] pr-8 pl-4 border rounded-lg py-2 appearance-none">
                                        <option value="kolam1">Lele Segar</option>
                                        <option value="kolam2">Lele Jumbo</option>
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
                                <BarChart data={waterData}> {/* Ganti LineChart dengan BarChart */}
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="lokasi" /> {/* Ganti "id" dengan "lokasi" */}
                                    <YAxis />
                                    <Tooltip />
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
                                <p className="text-2xl mb-2">{analysis.ph ? analysis.ph.value : 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.ph && analysis.ph.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.ph ? analysis.ph.status : 'N/A'}
                                </p>
                            </div>

                            {/* Suhu Air */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Suhu Air</h3>
                                <p className="text-2xl mb-2">{analysis.suhu ? analysis.suhu.value : 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.suhu && analysis.suhu.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.suhu ? analysis.suhu.status : 'N/A'}
                                </p>

                            </div>

                            {/* Oksigen Terlarut */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Oksigen Terlarut</h3>
                                <p className="text-2xl mb-2">{analysis.oksigen ? analysis.oksigen.value : 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.oksigen && analysis.oksigen.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.oksigen ? analysis.oksigen.status : 'N/A'}
                                </p>

                            </div>

                            {/* Salinitas */}
                            <div className="p-4 border rounded-lg border-gray-300">
                                <h3 className="font-bold mb-2">Salinitas</h3>
                                <p className="text-2xl mb-2">{analysis.salinitas ? analysis.salinitas.value : 'N/A'}</p>
                                <p className={`text-sm font-semibold ${analysis.salinitas && analysis.salinitas.status === 'Normal' ? 'text-green-600' : 'text-red-500'}`}>
                                    Status: {analysis.salinitas ? analysis.salinitas.status : 'N/A'}
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
                    onSubmit={handleOnSubmit}
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
