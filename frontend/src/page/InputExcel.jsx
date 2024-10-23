
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const ExcelForm = () => {
    const [rows, setRows] = useState([
        { id: 1, tanggal: '', hargaAwal: '', jumlah: '', hargaAkhir: '-' }
    ]);

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            tanggal: '',
            hargaAwal: '',
            jumlah: '',
            hargaAkhir: '-'
        };
        setRows([...rows, newRow]);
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, [field]: value };

                if (field === 'hargaAwal' || field === 'jumlah') {
                    const hargaAwal = field === 'hargaAwal' ?
                        parseFloat(value) || 0 :
                        parseFloat(row.hargaAwal) || 0;

                    const jumlah = field === 'jumlah' ?
                        parseFloat(value) || 0 :
                        parseFloat(row.jumlah) || 0;

                    updatedRow.hargaAkhir = hargaAwal * jumlah || '-';
                }

                return updatedRow;
            }
            return row;
        });
        setRows(updatedRows);
    };

    // Fungsi untuk format ke Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    // Menghitung total harga akhir
    const totalHargaAkhir = rows.reduce((total, row) => {
        const hargaAkhir = parseFloat(row.hargaAkhir) || 0;
        return total + hargaAkhir;
    }, 0);

    return (
        <div className="bg-white w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Input Excel</h1>
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

            {/* Content Section */}
            <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 rounded-lg ml-8 mr-8">
                <div className="p-6">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-800">Input Excel</h2>
                        <button
                            onClick={handleAddRow}
                            className="flex items-center space-x-1 px-10 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <span className="text-lg font-bold">+</span>
                            <span className="text-lg">Baris</span>
                        </button>

                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-2 border border-blue-600">No</th>
                                    <th className="p-2 border border-blue-600">Tanggal</th>
                                    <th className="p-2 border border-blue-600">Harga Awal</th>
                                    <th className="p-2 border border-blue-600">Jumlah</th>
                                    <th className="p-2 border border-blue-600">Harga Akhir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.id} className="bg-blue-50 hover:bg-blue-100 transition-colors">
                                        <td className="p-2 border text-center">{row.id}</td>
                                        <td className="p-2 border">
                                            <input
                                                type="date"
                                                className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                                                value={row.tanggal}
                                                onChange={(e) => handleInputChange(row.id, 'tanggal', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="number"
                                                className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                                                value={row.hargaAwal}
                                                onChange={(e) => handleInputChange(row.id, 'hargaAwal', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="number"
                                                className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                                                value={row.jumlah}
                                                onChange={(e) => handleInputChange(row.id, 'jumlah', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-2 border text-center">
                                            {row.hargaAkhir !== '-' ? formatRupiah(row.hargaAkhir) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Div untuk Menampilkan Total Harga Akhir */}
                    <div className="mt-4 p-4 bg-gray-100 border border-blue-500 rounded-md">
                        <h3 className="text-lg font-medium text-gray-800">Total Harga Akhir:</h3>
                        <p className="text-xl font-bold text-gray-800">{formatRupiah(totalHargaAkhir)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function InputExcel() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <ExcelForm />
                <Footer />
            </div>
        </div>
    );
}

export default InputExcel;
