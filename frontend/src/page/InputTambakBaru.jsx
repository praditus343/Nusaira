import "./pageCss/Select.css";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIFloatingButton from '../componen/AiFloatingButton';
import Alert from '../componen/Atlert';
import Footer from '../componen/Footer';
import Header from '../componen/Header';
import Sidebar from '../componen/Sidebar';
import axios from 'axios';

const TambakForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        negara: '',
        provinsi: '',
        kabupaten: '',
        alamat: '',
        jumlahKolam: '',
        kolamDetails: [],
    });

    const [labelVisible, setLabelVisible] = useState({
        nama: false,
        alamat: false,
        jumlahAnco: false,
        NamaKolam: false,
        jumlahKolam: false
    });

    const [showAlamatLabel, setShowAlamatLabel] = useState(false);

    const handleChange = (e) => {
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
            updatedKolamDetails[index] = {
                ...updatedKolamDetails[index],
                [name]: value,
            };
            return { ...prevData, kolamDetails: updatedKolamDetails };
        });
    };


    const handleJumlahKolamChange = (e) => {
        const jumlahKolam = e.target.value;
        setFormData({
            ...formData,
            jumlahKolam,
            kolamDetails: Array.from({ length: parseInt(jumlahKolam) || 0 }, () => ({
                NamaKolam: '',
                tipeKolam: '',
                panjang: '',
                lebar: '',
                kedalaman: '',
                jumlahAnco: '',
            })),
        });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const errorMessage = [];

        for (const key in formData) {
            if (formData[key] === '' || (typeof formData[key] === 'number' && formData[key] < 0)) {
                hasError = true;
                errorMessage.push(`Field ${key} tidak boleh kosong atau negatif.`);
            }
        }
        for (const kolam of formData.kolamDetails) {
            ['panjang', 'lebar', 'kedalaman'].forEach(dimension => {
                const value = kolam[dimension];
                if (!value || value <= 0) {
                    hasError = true;
                    errorMessage.push(`${dimension} kolam harus diisi dan lebih dari 0`);
                }
            });
        }
        if (hasError) {
            Alert('error', 'Terjadi Kesalahan', errorMessage.join('\n'));
        } else {
            try {
                const response = await axios.post('https://nusaira-be.vercel.app/api/tambak', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Data berhasil dikirim:', response.data);
            } catch (error) {
                console.error('Terjadi kesalahan saat mengirim data:', error);
            }
            console.log("Form submitted:", formData);
            navigate('/FinalStep', { state: { jumlahKolam: formData.jumlahKolam } });
        }
    };


    const SelectWithArrow = ({ name, value, onChange, children, required }) => (
        <div className="relative z-10">
            <select
                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black appearance-none "
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                {children}
            </select>
            {/* Arrow icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600 z-20">
                <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
            </div>
        </div>
    );




    return (
        <div className="bg-white w-full min-h-screen">
            <Header />

            <div className="bg-white p-6 w-full">
                <div className="ml-5 mr-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <div className="w-5 h-5 bg-gray-500 rounded-full mr-2" />
                        Masukkan Data Tambak Lele Anda untuk Manajemen Kualitas yang<br />Terintegrasi
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Kelola Tambak Lele Anda Secara Efektif dengan Sistem<br />Pemantauan Data Kualitas yang Terpadu dan Mudah Digunakan!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                            <SelectWithArrow
                                name="negara"
                                value={formData.negara}
                                onChange={handleChange}
                                required
                            >
                                <option value="" className="text-black">Negara</option>
                                <option value="Indonesia" className="text-blue-600">Indonesia</option>
                            </SelectWithArrow>

                            <SelectWithArrow
                                name="provinsi"
                                value={formData.provinsi}
                                onChange={handleChange}
                                required
                            >
                                <option value="" className="text-black">Provinsi</option>
                                <option value="Jawa Tengah" className="text-blue-600">Jawa Tengah</option>
                                <option value="Jawa Timur" className="text-blue-600">Jawa Timur</option>
                                <option value="Jawa Barat" className="text-blue-600">Jawa Barat</option>
                            </SelectWithArrow>

                            <SelectWithArrow
                                name="kabupaten"
                                value={formData.kabupaten}
                                onChange={handleChange}
                                required
                            >
                                <option value="" className="text-black">Kabupaten</option>
                                <option value="Boyolali" className="text-blue-600">Kabupaten Boyolali</option>
                                <option value="Kebumen" className="text-blue-600">Kabupaten Kebumen</option>
                                <option value="Bayumas" className="text-blue-600">Kabupaten Bayumas</option>
                                <option value="Jember" className="text-blue-600">Kabupaten Jember</option>
                                <option value="Tulungagung" className="text-blue-600">Kabupaten Tulungagung</option>
                                <option value="pacitan" className="text-blue-600">Kabupaten Pacitan</option>
                                <option value="Ciamis" className="text-blue-600">Kabupaten ciamis</option>
                                <option value="Indramayu" className="text-blue-600">Kabupaten Indramayu</option>
                                <option value="Subang" className="text-blue-600">Kabupaten Subang</option>
                            </SelectWithArrow>

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

                    {formData.jumlahKolam > 0 && (
                        <div className="p-4 bg-white mb-4">
                            <h3 className="text-md font-medium text-gray-700 mb-4">Informasi Kolam</h3>
                            {formData.kolamDetails.map((kolam, index) => (
                                <div key={index} className="space-y-4 mb-10  rounded-lg p-4 pb-10 bg-blue-100 h-auto">
                                    <h4 className="font-semibold text-gray-800">Kolam {index + 1}</h4>
                                    <div className="space-y-4">
                                        <div>
                                            {labelVisible.NamaKolam && (
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="NamaKolam">
                                                    Nama Kolam
                                                </label>
                                            )}
                                            <input
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 placeholder-black text-black"
                                                id={`NamaKolam-${index}`}
                                                name="NamaKolam"
                                                type="text"
                                                placeholder=" Nama Kolam"
                                                value={formData.NamaKolam}
                                                onChange={(e) => handleKolamChange(index, e)}
                                                onFocus={() => handleFocus('NamaKolam')}
                                                onBlur={() => handleBlur('NamaKolam')}
                                                required
                                            />
                                        </div>

                                        <div className="bg-white rounded-lg">
                                            <SelectWithArrow
                                                name="tipeKolam"
                                                value={kolam.tipeKolam}
                                                onChange={(e) => handleKolamChange(index, e)}
                                                required
                                            >
                                                <option value="" className="text-black">Tipe Kolam</option>
                                                <option value="kolam-alam" className="text-blue-600">Kolam Alam</option>
                                                <option value="kolam-buatan" className="text-blue-600">Kolam Buatan</option>
                                                <option value="kolam-hybrid" className="text-blue-600">Kolam Hybrid</option>
                                            </SelectWithArrow>
                                        </div>

                                        <div className="flex space-x-4">
                                        <input
                                        type="number"
                                        name="panjang"
                                        value={kolam.panjang}
                                        onChange={(e) => handleKolamChange(index, e)}
                                        placeholder="Panjang"
                                        className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black placeholder-black"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="lebar"
                                        value={kolam.lebar}
                                        onChange={(e) => handleKolamChange(index, e)}
                                        placeholder="Lebar"
                                        className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black placeholder-black"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="kedalaman"
                                        value={kolam.kedalaman}
                                        onChange={(e) => handleKolamChange(index, e)}
                                        placeholder="Kedalaman"
                                        className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 text-black placeholder-black"
                                        required
                                    />
                                        </div>

                                        <div>
                                            {labelVisible.jumlahAnco && (
                                                <label className="block text-sm font-medium text-gray-700" htmlFor="jumlahAnco">
                                                    Jumlah Anco
                                                </label>
                                            )}
                                            <input
                                                className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 placeholder-black"
                                                id={`jumlahAnco-${index}`}
                                                name="jumlahAnco"
                                                type="number"
                                                placeholder=" Jumlah Anco"
                                                value={formData.jumlahAnco}
                                                onChange={(e) => handleKolamChange(index, e)}
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

                    <div className="p-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg w-full"
                        >
                            Simpan Data
                        </button>
                    </div>
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
