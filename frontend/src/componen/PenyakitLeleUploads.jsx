import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Upload } from 'lucide-react';
import apiClient from '../service/axiosInstance';

export const PenyakitLeleUpload = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        image: '',
        indikasi: '',
        penyebab: '',
        penanganan: '',
        pencegahan: '',
        gejalaTambahan: '',
        referensi: ''
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        console.log('Files selected for upload:', files);
        setIsLoading(true);

        try {
            const uploadPromises = files.map(async (file) => {
                const imageFormData = new FormData();
                imageFormData.append('file', file);
                imageFormData.append('upload_preset', 'Nusaira');
                // console.log('Uploading file:', file.name);

                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dgl701jmj/image/upload',
                    imageFormData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
                // console.log('Upload successful:', response.data.secure_url);
                return response.data.secure_url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            console.log('All images uploaded:', uploadedUrls);
            setImages(uploadedUrls);
            setFormData((prev) => ({
                ...prev,
                image: uploadedUrls[0]
            }));
            setIsLoading(false);
        } catch (error) {
            console.error('Image upload failed:', error);
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Upload Gagal',
                text: error.message
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started with full data:', JSON.stringify(formData, null, 2));
        setIsLoading(true);
    
        try {
            const missingFields = [];
            if (!formData.title) missingFields.push('Title');
            if (!formData.date) missingFields.push('Date');
            if (!formData.image) missingFields.push('Image');
    
            if (missingFields.length > 0) {
                throw new Error(`Mohon lengkapi data berikut: ${missingFields.join(', ')}`);
            }
    
            const payload = { ...formData };
            // console.log('Detailed payload for submission:', JSON.stringify(payload, null, 2));
    
            const response = await apiClient.post('/penyakit-lele', payload);
    
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data penyakit berhasil disimpan',
            });
    
            setFormData({
                title: '',
                date: '',
                image: '',
                indikasi: '',
                penyebab: '',
                penanganan: '',
                pencegahan: '',
                gejalaTambahan: '',
                referensi: ''
            });
            setImages([]);
            setIsLoading(false);
            onClose();
    
        } catch (error) {
            console.error('Complete error object:', error);
            console.error('Error response:', error.response ? JSON.stringify(error.response, null, 2) : 'No response');
            console.error('Error saat mengirim data:', error.response ? error.response.data : error.message);
    
            if (error.response) {
                console.error('Server error:', error.response);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: `Server error: ${error.response.data.message || 'Terjadi kesalahan di server'}`,
                });
            } else if (error.request) {
                console.error('No response received:', error.request);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Tidak ada respons dari server. Coba lagi nanti.',
                });
            } else {
                console.error('Error:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: `Kesalahan: ${error.message || 'Terjadi kesalahan tak terduga'}`,
                });
            }
    
            setIsLoading(false);
        }
    };
    



    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Judul Penyakit"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded border-blue-500 placeholder-black "
                required
            />
            <textarea
                name="indikasi"
                value={formData.indikasi}
                onChange={handleChange}
                placeholder="Indikasi Penyakit"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
            />
            <textarea
                name="penyebab"
                value={formData.penyebab}
                onChange={handleChange}
                placeholder="Penyebab Penyakit"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
            />
            <textarea
                name="penanganan"
                value={formData.penanganan}
                onChange={handleChange}
                placeholder="Penanganan Penyakit"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
            />
            <textarea
                name="pencegahan"
                value={formData.pencegahan}
                onChange={handleChange}
                placeholder="Pencegahan Penyakit"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
            />
            <textarea
                name="gejalaTambahan"
                value={formData.gejalaTambahan}
                onChange={handleChange}
                placeholder="Gejala Tambahan"
                className="w-full p-2 border rounded border-blue-500 placeholder-black"
            />
            <textarea
                name="referensi"
                value={formData.referensi}
                onChange={handleChange}
                placeholder="Referensi"
                className="w-full p-2 border rounded border-blue-500 placeholder-black mb-4"
            />
            <label className="w-full">
                <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                />
                <div className="flex justify-center items-center w-full p-4 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer transition-all hover:border-blue-700 hover:bg-blue-50 mt-4 mb-4">
                    <Upload className="w-6 h-6 text-black mr-2" />
                    <span className="text-black font-medium">Upload Gambar</span>
                </div>
            </label>
            <p className="text-xs text-gray-500 mt-4">
                Ukuran maks: 5MB. Format: JPEG, PNG, GIF, WebP
            </p>
            {isLoading && <p className="text-blue-500">Sedang memproses...</p>}
            {images.length > 0 && (
                <div className="flex gap-2">
                    {images.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Uploaded ${index}`}
                            className="w-20 h-20 object-cover rounded"
                        />
                    ))}
                </div>
            )}
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-2 rounded ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                {isLoading ? 'Sedang Diproses...' : 'Simpan Data Penyakit'}
            </button>
        </form>
    );
};

export default PenyakitLeleUpload;
