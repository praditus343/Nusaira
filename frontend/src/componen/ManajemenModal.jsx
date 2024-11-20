import { X } from 'lucide-react'; // Import the close icon from lucide-react
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const ManagementModal = ({ isOpen, onClose }) => {
    const formRef = useRef(null);
    const [tambakList, setTambakList] = useState([]);
    const [selectedTambakId, setSelectedTambakId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        ph: '',
        suhu: '',
        oksigen: '',
        salinitas: ''
    });

    useEffect(() => {
        if (!isOpen) return;

        const fetchTambakList = async () => {
            setLoading(true);
            setError({
                ph: '',
                suhu: '',
                oksigen: '',
                salinitas: ''
            });
            try {
                const response = await axios.get('https://nusaira-be.vercel.app/api/tambak');
                setTambakList(response.data);
                setSelectedTambakId('');
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Terjadi kesalahan saat mengambil data tambak',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#ef4444',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTambakList();
    }, [isOpen]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);

        // Validasi input
        const ph = parseFloat(formData.get('ph'));
        const suhu = parseFloat(formData.get('suhu'));
        const oksigen = parseFloat(formData.get('oksigen'));
        const salinitas = parseFloat(formData.get('salinitas'));

        let errorObj = {
            ph: '',
            suhu: '',
            oksigen: '',
            salinitas: ''
        };

        if (!selectedTambakId) {
            Swal.fire({
                title: 'Peringatan!',
                text: 'Mohon pilih tambak terlebih dahulu',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#f59e0b',
            });
            return;
        }
        if (
            isNaN(ph) || ph < 0 || ph > 14
        ) {
            errorObj.ph = 'pH harus diisi dengan nilai antara 0 hingga 14.';
        }
        if (isNaN(suhu) || suhu < 0) {
            errorObj.suhu = 'Suhu harus diisi dengan nilai yang lebih besar dari 0.';
        }
        if (isNaN(oksigen) || oksigen < 0) {
            errorObj.oksigen = 'Kadar Oksigen harus diisi dengan nilai yang lebih besar dari 0.';
        }
        if (isNaN(salinitas) || salinitas < 0) {
            errorObj.salinitas = 'Salinitas harus diisi dengan nilai yang lebih besar dari 0.';
        }

        // Update state error
        setError(errorObj);

        // Jika ada error, tampilkan dan hentikan proses submit
        if (Object.values(errorObj).some((msg) => msg !== '')) {
            return;
        }

        try {
            const payload = {
                tambak_id: selectedTambakId,
                ph,
                suhu,
                oksigen,
                salinitas
            };

            const response = await axios.post('https://nusaira-be.vercel.app/api/air', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                await Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data berhasil disimpan',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#22c55e',
                });
                onClose();
                formRef.current.reset();
                setSelectedTambakId('');
            }
        } catch (error) {
            let errorMessage = 'Gagal menyimpan data';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ef4444',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Input Data Kualitas Air</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-4">Memuat data tambak...</div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700">
                                Pilih Tambak:
                            </label>
                            <select
                                value={selectedTambakId}
                                onChange={(e) => setSelectedTambakId(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-blue-600 placeholder-black rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                required
                            >
                                <option value="">Pilih Tambak</option>
                                {tambakList.map((tambak) => (
                                    <option key={tambak.id} value={tambak.id}>
                                        {tambak.nama}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none mt-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                pH:
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="ph"
                                required
                                className="mt-1 w-full px-3 py-2 border border-blue-600 placeholder-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0-14"
                            />
                            {error.ph && <p className="text-sm text-red-500">{error.ph}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Suhu (°C):
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="suhu"
                                required
                                className="mt-1 w-full px-3 py-2 border border-blue-600 placeholder-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan suhu"
                            />
                            {error.suhu && <p className="text-sm text-red-500">{error.suhu}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Kadar Oksigen (mg/L):
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="oksigen"
                                required
                                className="mt-1 w-full px-3 py-2 border border-blue-600 placeholder-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan kadar oksigen"
                            />
                            {error.oksigen && <p className="text-sm text-red-500">{error.oksigen}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Salinitas (ppt):
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="salinitas"
                                required
                                className="mt-1 w-full px-3 py-2 border border-blue-600 placeholder-black rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan salinitas"
                            />
                            {error.salinitas && <p className="text-sm text-red-500">{error.salinitas}</p>}
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-[400px] py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-6"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManagementModal;
