import React, { useState } from 'react';
import Sidebar from '../componen/SideBar';
import Footer from '../componen/Footer';
import "./pageCss/Select.css"
import { useNavigate } from 'react-router-dom';
import Alert from '../componen/Atlert';
import AIFloatingButton from '../componen/AiFloatingButton';

const TambakForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        negara: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamat: '',
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
            navigate('/FinalStep', { state: { jumlahKolam: formData.jumlahKolam } });
        }
    };


    const [labelVisible, setLabelVisible] = useState({
        nama: false,
        alamat: false,
        jumlahAnco: false,
    });



    return (
        <div className="bg-white w-full min-h-screen">
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
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black placeholder-black"
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    placeholder=" Nama tambak"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('nama')}
                                    onBlur={() => handleBlur('nama')}
                                    required
                                />
                            </div>

                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black "
                                    name="negara"
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',
                                    }}
                                    value={formData.negara}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-black"> Negara</option>
                                    <option value="indonesia" className="text-blue-600">Indonesia</option>
                                    <option value="malaysia" className="text-blue-600">Malaysia</option>
                                    <option value="vietnam" className="text-blue-600">Vietnam</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black"
                                    name="provinsi"
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',
                                    }}
                                    value={formData.provinsi}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-black"> Provinsi</option>
                                    <option value="indonesia" className="text-blue-600">Boyolali</option>
                                    <option value="malaysia" className="text-blue-600">Bali</option>
                                    <option value="vietnam" className="text-blue-600">Bandung</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black"
                                    name="kabupaten"
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',

                                    }}
                                    value={formData.kabupaten}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-black"> Kabupaten</option>

                                    <option value="indonesia" className="text-blue-600">Kabupaten Karanganyar</option>
                                    <option value="malaysia" className="text-blue-600">Kabupaten Grobogan</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Semarang</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Sragen</option>
                                    <option value="vietnam" className="text-blue-600">Kabupaten Klaten</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black"
                                    name="kecamatan"
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',

                                    }}
                                    value={formData.kecamatan}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-black"> Kecamatan</option>
                                    <option value="indonesia" className="text-blue-600">Kecamatan Mojosongo</option>
                                    <option value="malaysia" className="text-blue-600">Kecamatan Boyolali</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Ampel</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Sambi</option>
                                    <option value="vietnam" className="text-blue-600">Kecamatan Teras</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black"
                                    name="kelurahan"
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',

                                    }}
                                    value={formData.kelurahan}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" className="text-black"> Kelurahan</option>
                                    <option value="indonesia" className="text-blue-600">Kelurahan Siswodipuran</option>
                                    <option value="malaysia" className="text-blue-600">Kelurahan Pulisen</option>
                                    <option value="vietnam" className="text-blue-600">Kelurahan Banaran</option>
                                    <option value="vietnam" className="text-blue-600">Kelurahan Kemiri</option>

                                </select>
                            </div>
                            <div>
                                <select
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black "
                                    name="zonaWaktu"
                                    value={formData.zonaWaktu}
                                    onChange={handleChange}
                                    style={{
                                        appearance: 'none',
                                        background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                        backgroundSize: '1.5rem',

                                    }}
                                    required
                                >
                                    <option value="" className='text-black'> Zona Waktu</option>
                                    <option value="WIB" className='text-blue-600'>WIB</option>
                                    <option value="WITA" className='text-blue-600'>WITA</option>
                                    <option value="WIT" className='text-blue-600'>WIT</option>
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
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-3 text-black h-24 placeholder-black"
                                    id="alamat"
                                    name="alamat"
                                    type="text"
                                    placeholder=" Alamat"
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
                                    className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black placeholder-black"
                                    id="jumlahKolam"
                                    name="jumlahKolam"
                                    type="number"
                                    min="1"
                                    placeholder=" Jumlah Kolam"
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
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2  placeholder-black text-black"
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
                                        <div className='bg-white'>
                                            <select
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black "
                                                style={{
                                                    appearance: 'none',
                                                    background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                                    backgroundSize: '1.5rem',

                                                }}
                                                id={`tipeKolam-${index}`}
                                                name="tipeKolam"
                                                required
                                                value={kolam.tipeKolam}
                                                onChange={(e) => handleKolamChange(index, e)}
                                            >
                                                <option value="" className='text-black'> Tipe Kolam</option>
                                                <option value="kolam-alam" className='text-blue-600'>Kolam Alam</option>
                                                <option value="kolam-buatan" className='text-blue-600'>Kolam Buatan</option>
                                                <option value="kolam-hybrid" className='text-blue-600'>Kolam Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="flex space-x-4 bg-white">
                                            {['Panjang (M)', 'Lebar (M)', 'Luas (M)', 'Kedalaman (M)'].map((dimension, idx) => (
                                                <div className="flex-1" key={dimension}>
                                                    <select
                                                        className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black bg-white"
                                                        style={{
                                                            appearance: 'none',
                                                            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>') no-repeat right 0.75rem center`,
                                                            backgroundSize: '1.5rem',
                                                        }}
                                                        id={`${dimension}-${idx}`}
                                                        name={dimension}
                                                        required
                                                        value={kolam[dimension]}
                                                        onChange={(e) => handleKolamChange(idx, e)}
                                                    >

                                                        <option value=""> {dimension}</option>
                                                        <option value="10" className='text-blue-600'>10</option>
                                                        <option value="15" className='text-blue-600'>15</option>
                                                        <option value="manual" className='text-blue-600'>Ketik Manual</option>
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
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 placeholder-black text-black"
                                                id="jumlahAnco"
                                                name="jumlahAnco"
                                                type="number"
                                                placeholder=" Jumlah Anco"
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
                            onClick={handleSubmit}
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
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <TambakForm />
                <AIFloatingButton />
                <Footer />
            </div>
        </div>

    );
}

export default InputTambak;
