import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const ExcelForm = () => {
    const [rows, setRows] = useState([{ id: 1, tanggal: '', namaBarang: '', hargaAwal: '', jumlah: '', hargaAkhir: '-' }]);

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, tanggal: '', namaBarang: '', hargaAwal: '', jumlah: '', hargaAkhir: '-' };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    const handleDeleteAllRows = () => {
        setRows([]);
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, [field]: value };
                if (field === 'hargaAwal' || field === 'jumlah') {
                    const hargaAwal = field === 'hargaAwal' ? parseFloat(value) || 0 : parseFloat(row.hargaAwal) || 0;
                    const jumlah = field === 'jumlah' ? parseFloat(value) || 0 : parseFloat(row.jumlah) || 0;
                    updatedRow.hargaAkhir = hargaAwal * jumlah || '-';
                }
                return updatedRow;
            }
            return row;
        });
        setRows(updatedRows);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const totalHargaAkhir = rows.reduce((total, row) => {
        const hargaAkhir = parseFloat(row.hargaAkhir) || 0;
        return total + hargaAkhir;
    }, 0);

    return (
        <div className="bg-white w-full min-h-screen">
            <Header/>
                <div className="mt-4 px-4">
                    <div className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-xl font-medium">Pengeluaran Tambak Lele Seger</h1>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>Boyolali, Jawa Tengah</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Daftar Tambak:</span>
                                    <select className="px-4 py-1.5 border rounded-md bg-white text-left">
                                        <option value="tambak1">Tambak Lele Seger</option>
                                        <option value="tambak2">Tambak Lele Kencana</option>
                                    </select>
                                </div>
                                <button className="px-6 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                    Export Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Content Section */}
            <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 mx-4 sm:mx-8">
                <div className="p-6">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-800">Detail Catatan Pengeluaran</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddRow}
                                className="flex items-center space-x-1 px-8 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <span className="text-lg font-bold">+</span>
                                <span className="text-lg">Baris</span>
                            </button>
                            <button
                                onClick={handleDeleteAllRows}
                                className="px-6 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                            >
                                Hapus Semua
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-2 border border-blue-600">No</th>
                                    <th className="p-2 border border-blue-600">Tanggal</th>
                                    <th className="p-2 border border-blue-600">Nama Barang</th>
                                    <th className="p-2 border border-blue-600">Harga Awal</th>
                                    <th className="p-2 border border-blue-600">Jumlah</th>
                                    <th className="p-2 border border-blue-600">Harga Akhir</th>
                                    <th className="p-2 border border-blue-600">Aksi</th>
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
                                                type="text"
                                                className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                                                value={row.namaBarang}
                                                onChange={(e) => handleInputChange(row.id, 'namaBarang', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-2 border">
                                                <input
                                                    type="text" // Ubah dari 'number' menjadi 'text' untuk mengizinkan format
                                                    className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
                                                    value={formatRupiah(row.hargaAwal)} // Format saat ditampilkan
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/[^\d]/g, ''); // Hapus karakter non-digit
                                                        handleInputChange(row.id, 'hargaAwal', value);
                                                    }}
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
                                        <td className="p-2 border text-center">
                                            <button
                                                onClick={() => handleDeleteRow(row.id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Div untuk Menampilkan Total Harga Akhir */}
                    <div className="mt-4 flex justify-end">
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-medium">Total Harga Akhir:</span>
                            <span className="text-xl font-bold text-green-600">{formatRupiah(totalHargaAkhir)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Pengeluaran() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <ExcelForm />
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
}

export default Pengeluaran;
