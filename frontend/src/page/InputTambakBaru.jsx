import React, { useState } from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import Sidebar from '../componen/SideBar';
import Footer from '../componen/Footer';
import "./pageCss/InputTambak.css"

const TambakForm = () => {
    const [formData, setFormData] = useState({
        nama: '',
        negara: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamatDetail: '',
        zonaWaktu: '',
        jumlahKolam: '',
        kolamDetails: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (value) {
            setLabelVisible((prev) => ({ ...prev, [name]: true }));
        } else {
            setLabelVisible((prev) => ({ ...prev, [name]: false }));
        }

    };

    const handleFocus = (name) => {
        setLabelVisible((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name) => {
        if (!formData[name]) {
            setLabelVisible((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleKolamChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedKolamDetails = [...prevData.kolamDetails];
            updatedKolamDetails[index] = { ...updatedKolamDetails[index], [name]: value };
            return { ...prevData, kolamDetails: updatedKolamDetails };
        });
    };

    const handleJumlahKolamChange = (e) => {
        const jumlahKolam = e.target.value;
        setFormData({
            ...formData,
            jumlahKolam,
            kolamDetails: Array.from({ length: jumlahKolam }, () => ({
                namaKolam: '',
                tipeKolam: '',
                panjang: '',
                lebar: '',
                luas: '',
                kedalaman: '',
            })),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;
        const errorMessage = [];

        for (const key in formData) {
            if (formData[key] === '' || (typeof formData[key] === 'number' && formData[key] < 0)) {
                hasError = true;
                errorMessage.push(`Field ${key} tidak boleh kosong atau negatif.`);
            }
        }

        if (hasError) {
            Alert('error', 'Terjadi Kesalahan', errorMessage.join('\n'));
        } else {

            console.log("Form submitted:", formData);
        }
    };

    const [labelVisible, setLabelVisible] = useState({
        nama: false,
        alamat: false,
        jumlahAnco: false,
    });


    return (
        <div className="bg-gray-100 w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Input Tambak Baru</h1>
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


            {/* Form Container */}
            <div className="bg-white p-6 w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-5 h-5 bg-gray-500 rounded-full mr-2" />
                    Input Data Tambak Lele Anda untuk Manajemen Kualitas yang<br />Terintegrasi
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Kelola Tambak Lele Anda Secara Efektif dengan Sistem<br />Pemantauan Data Kualitas yang Terpadu dan Mudah Digunakan!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Tambak */}
                    <div className="p-4">
                        <h3 className="text-md font-medium text-gray-700 mb-4">Informasi Tambak</h3>
                        <div className="space-y-4">
                            <div>
                                {labelVisible.nama && (
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nama">
                                        Nama Tambak
                                    </label>
                                )}
                                <input
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600 placeholder-blue-600"
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    placeholder=" nama tambak"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('nama')}
                                    onBlur={() => handleBlur('nama')}
                                    required
                                />
                            </div>

                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="negara"
                                    value={formData.negara}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> negara</option>
                                    <option value="indonesia" className="text-blue-600">Indonesia</option>
                                    <option value="malaysia" className="text-blue-600">Malaysia</option>
                                    <option value="vietnam" className="text-blue-600">Vietnam</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="provinsi"
                                    value={formData.provinsi}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> provinsi</option>
                                    <option value="indonesia" className="text-blue-600">Boyolali</option>
                                    <option value="malaysia" className="text-blue-600">Bali</option>
                                    <option value="vietnam" className="text-blue-600">Bandung</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="kabupaten"
                                    value={formData.kabupaten}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> kabupaten</option>

                                    <option value="indonesia" className="text-blue-600">Kabupaten Karanganyar</option>
                                    <option value="malaysia" className="text-blue-600">Kabupaten Grobogan</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Semarang</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Sragen</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Klaten</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="kecamatan"
                                    value={formData.kecamatan}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> kecamatan</option>
                                    <option value="indonesia" className="text-blue-600">Kecamatan Mojosongo</option>
                                    <option value="malaysia" className="text-blue-600">Kecamatan Boyolali</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Ampel</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Sambi</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Teras</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="kelurahan"
                                    value={formData.kelurahan}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> kelurahan</option>
                                    <option value="indonesia" className="text-blue-600">Kelurahan Siswodipuran</option>
                                    <option value="malaysia" className="text-blue-600">Kelurahan Pulisen</option>
                                    <option value="vietnam" className="text-blue-600">Kelurahan Banaran</option>
                                    <option value="vietnam" className="text-blue-600">Kelurahan Kemiri</option>

                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                    name="zonaWaktu"
                                    value={formData.zonaWaktu}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-blue-600"> zona waktu</option>
                                    <option value="WIB" className="text-blue-600">WIB</option>
                                    <option value="WITA" className="text-blue-600">WITA</option>
                                    <option value="WIT" className="text-blue-600">WIT</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className={`block text-sm font-medium text-gray-700 mb-1 ${formData.alamat ? 'block' : 'hidden'}`}
                                    htmlFor="alamat"
                                >
                                    Alamat
                                </label>
                                <input
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-3 text-blue-600 h-24 placeholder-blue-600"
                                    id="alamat"
                                    name="alamat"
                                    type="text"
                                    placeholder=" alamat"
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    onFocus={() => setShowAlamatLabel(true)}
                                    onBlur={() => setShowAlamatLabel(!!formData.alamat)}
                                    required
                                />
                            </div>

                            <div>
                                {labelVisible.jumlahKolam && (
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jumlahKolam">
                                        Jumlah Kolam
                                    </label>
                                )}
                                <input
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600 placeholder-blue-600"
                                    id="jumlahKolam"
                                    name="jumlahKolam"
                                    type="number"
                                    min="1"
                                    placeholder=" jumlah kolam"
                                    value={formData.jumlahKolam}
                                    onChange={handleJumlahKolamChange}
                                    onFocus={() => handleFocus('jumlahKolam')}
                                    onBlur={() => handleBlur('jumlahKolam')}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/*Informasi Kolam*/}
                    {formData.jumlahKolam > 0 && (
                        <div className="p-4 bg-blue-100 rounded-lg shadow-md mb-4">
                            <h3 className="text-md font-medium text-gray-700 mb-4">Informasi Kolam</h3>
                            {formData.kolamDetails.map((kolam, index) => (
                                <div key={index} className="space-y-4 mb-4 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800">Kolam {index + 1}</h4>
                                    <div className="space-y-4">

                                        <div>
                                            {labelVisible.NamaKolam && (
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="NamaKolam">
                                                    Nama Awalan Kolam
                                                </label>
                                            )}
                                            <input
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2  placeholder-blue-600 text-blue-600"
                                                id="NamaKolam"
                                                name="NamaKolam"
                                                type="text"
                                                placeholder=" Nama Awalan Kolam"
                                                value={formData.NamaKolam}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('NamaKolam')}
                                                onBlur={() => handleBlur('NamaKolam')}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`tipeKolam-${index}`}>
                                                Tipe Kolam
                                            </label>
                                            <select
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                                id={`tipeKolam-${index}`}
                                                name="tipeKolam"
                                                required
                                                value={kolam.tipeKolam}
                                                onChange={(e) => handleKolamChange(index, e)}
                                            >
                                                <option value=""> tipe kolam</option>
                                                <option value="kolam-alam">Kolam Alam</option>
                                                <option value="kolam-buatan">Kolam Buatan</option>
                                                <option value="kolam-hybrid">Kolam Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="flex space-x-4">
                                            {['panjang (M)', 'lebar (M)', 'luas (M)', 'kedalaman (M)'].map((dimension, idx) => (
                                                <div className="flex-1" key={dimension}>
                                                    <select
                                                        className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-blue-600"
                                                        id={`${dimension}-${index}`}
                                                        name={dimension}
                                                        required
                                                        value={kolam[dimension]}
                                                        onChange={(e) => handleKolamChange(index, e)}
                                                    >
                                                        <option value=""> {dimension}</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="manual">Ketik Manual</option>
                                                    </select>
                                                    {kolam[dimension] === 'manual' && (
                                                        <input
                                                            type="number"
                                                            placeholder={` ${dimension}`}
                                                            className="mt-2 focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2"
                                                            value={kolam[`${dimension}Manual`] || ''}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                handleKolamChange(index, { target: { name: `${dimension}Manual`, value: newValue } });
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            {labelVisible.jumlahAnco && (
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jumlahAnco">
                                                    Jumlah Anco
                                                </label>
                                            )}
                                            <input
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 placeholder-blue-600 text-blue-600"
                                                id="jumlahAnco"
                                                name="jumlahAnco"
                                                type="number"
                                                placeholder=" jumlah anco"
                                                value={formData.jumlahAnco}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('jumlahAnco')}
                                                onBlur={() => handleBlur('jumlahAnco')}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-lg px-40 py-2 transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Kirim Data
                        </button>
                    </>
                </form>
            </div>
        </div>
    );
};



function InputTambak() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <TambakForm />
                <Footer />
            </div>
        </div>

    );
}

export default InputTambak;
