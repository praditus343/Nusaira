import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import axios from 'axios'; 
import Swal from 'sweetalert2'; 

export const BeritaInputModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        image: '',
        excerpt: '',
        content: ''
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setIsLoading(true);
    
        try {
            const uploadPromises = files.map(async (file) => {
                const imageFormData = new FormData();
                imageFormData.append('file', file);
                imageFormData.append('upload_preset', 'Nusaira');
                console.log('Uploading file:', file.name);

                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dgl701jmj/image/upload',
                    imageFormData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
                return response.data.secure_url;
            });
    
            const uploadedUrls = await Promise.all(uploadPromises);
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
        setIsLoading(true);
    
        try {
            const missingFields = [];
            if (!formData.title) missingFields.push('Title');
            if (!formData.date) missingFields.push('Date');
            if (!formData.image) missingFields.push('Image');
            if (!formData.excerpt) missingFields.push('Excerpt');
    
            if (missingFields.length > 0) {
                throw new Error(`Mohon lengkapi data berikut: ${missingFields.join(', ')}`);
            }
    
            const response = await axios.post(
                'https://nusaira-be.vercel.app/api/berita',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
    
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Berita berhasil disimpan'
            });
    
            setFormData({
                title: '',
                date: '',
                image: '',
                excerpt: '',
                content: ''
            });
            setImages([]);
            setIsLoading(false);
            onClose();
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.message
            });
    
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <div className="flex justify-between items-center p-6">
                    <h2 className="text-2xl font-bold">Input Berita Baru</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-black">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Judul Berita"
                        className="w-full p-3 border rounded border-blue-500 placeholder-black"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded border-blue-500 placeholder-black"
                        required
                    />
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="Deskripsi Singkat"
                        className="w-full p-3 border rounded border-blue-500 placeholder-black"
                    />
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Konten Berita"
                        className="w-full p-3 border rounded border-blue-500 placeholder-black"
                        required
                    />
                    <label className="w-full">
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <div className="flex justify-center items-center w-full p-4 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer transition-all hover:border-blue-700 hover:bg-blue-50 mt-4 mb-2">
                            <Upload className="w-6 h-6 text-black mr-2" />
                            <span className="text-black font-medium">Upload Gambar</span>
                        </div>
                    </label>

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
                        className={`w-full p-3 rounded ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {isLoading ? 'Sedang Diproses...' : 'Simpan Berita'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BeritaInputModal;