import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ManagementModal = ({ isOpen, onClose, onSubmit }) => {
    const [ph, setPh] = useState('');
    const [suhu, setSuhu] = useState('');
    const [oksigen, setOksigen] = useState('');
    const [salinitas, setSalinitas] = useState('');

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeydown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        const parsedPh = parseFloat(ph);
        const parsedSuhu = parseFloat(suhu);
        const parsedOksigen = parseFloat(oksigen);
        const parsedSalinitas = parseFloat(salinitas);
        
        // Validasi input
        if (
            isNaN(parsedPh) || parsedPh < 0 || parsedPh > 14 ||
            isNaN(parsedSuhu) || parsedSuhu < 0 ||
            isNaN(parsedOksigen) || parsedOksigen < 0 ||
            isNaN(parsedSalinitas) || parsedSalinitas < 0
        ) {
            Swal.fire({
                title: 'Kesalahan!',
                text: 'Masukkan nilai yang valid.',
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#f8f9fa',
                color: '#007bff',
            });
            return;
        }
    
        // Kirim data yang sudah diparsing ke onSubmit
        onSubmit({ 
            parsedPh, 
            parsedSuhu, 
            parsedOksigen, 
            parsedSalinitas 
        });
        
        onClose(); // Tutup modal setelah pengiriman
    };
    
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 h-full mt-0">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Input Data Kualitas Air</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">pH:</label>
                    <input
                        type="number"
                        value={ph}
                        onChange={(e) => setPh(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:border-blue-600"
                        placeholder="Masukkan nilai pH (0-14)"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Suhu (°C):</label>
                    <input
                        type="number"
                        value={suhu}
                        onChange={(e) => setSuhu(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:border-blue-600"
                        placeholder="Masukkan suhu"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Kadar Oksigen (mg/L):</label>
                    <input
                        type="number"
                        value={oksigen}
                        onChange={(e) => setOksigen(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:border-blue-600"
                        placeholder="Masukkan kadar oksigen"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Salinitas (ppt):</label>
                    <input
                        type="number"
                        value={salinitas}
                        onChange={(e) => setSalinitas(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:border-blue-600"
                        placeholder="Masukkan salinitas"
                    />
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagementModal;
