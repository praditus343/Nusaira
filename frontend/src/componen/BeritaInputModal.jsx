import React, { useState } from 'react';
import { X } from 'lucide-react';

export const BeritaInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    date: '',
    image: null,
    excerpt: '',
    content: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'default_preset');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dgl701jmj/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }

      const submissionData = {
        title: formData.title,
        writer: formData.writer,
        date: formData.date,
        image: imageUrl,
        excerpt: formData.excerpt,
        content: formData.content
      };

      const response = await fetch('https://nusaira-be.vercel.app/api/berita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      onSubmit(submissionData);
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-center flex-1">Input Berita Baru</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Masukkan Judul"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full p-3 rounded-md border-blue-500 shadow-sm border placeholder-black"
            />
          </div>
          <div>
            <input
              type="text"
              name="writer"
              placeholder="Masukkan Nama Penulis"
              value={formData.writer}
              onChange={handleChange}
              className="block w-full p-3 rounded-md border-blue-500 shadow-sm border placeholder-black"
            />
          </div>
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full p-3 rounded-md border-blue-500 shadow-sm border placeholder-black"
            />
          </div>
          <div>
            <div className="relative w-full border-2 border-dashed border-blue-500 rounded-md p-4 text-center hover:border-indigo-400 hover:bg-indigo-50 transition">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <p className="text-sm text-black">
                {formData.image ? formData.image.name : "Klik untuk mengunggah gambar"}
              </p>
            </div>
          </div>
          <div>
            <textarea
              name="excerpt"
              placeholder="Masukkan Deskripsi"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="block w-full p-3 rounded-md border-blue-500 shadow-sm border placeholder-black"
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Masukkan Konten"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              required
              className="block w-full p-3 rounded-md border-blue-500 shadow-sm border placeholder-black"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md transition text-lg"
              disabled={isUploading}
            >
              {isUploading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeritaInputModal;
