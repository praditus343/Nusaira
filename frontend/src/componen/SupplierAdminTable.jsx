import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus, ImagePlus } from 'lucide-react';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';


const SuppliersTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({
    supplier: '',
    whatsapp: '',
    province: '',
    location: '',
    description: '',
    image: '',
    email: ''
  });


  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://nusaira-be.vercel.app/api/suppliers');

      const suppliersData = Array.isArray(response.data.data) ? response.data.data : [];
      setSuppliers(suppliersData);

      // console.log('API Response:', response);
      // console.log('Response Data:', response.data);
      // console.log('Suppliers Data:', suppliersData);

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError('Failed to fetch suppliers');
      setSuppliers([]);
      setIsLoading(false);
    }
  };


  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    // console.log('Files selected for upload:', files);
    setImageLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        imageFormData.append('upload_preset', 'Nusaira');

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
      // console.log('All images uploaded:', uploadedUrls);


      setCurrentSupplier(prev => ({
        ...prev,
        image: uploadedUrls[0]
      }));
      setImageLoading(false);
    } catch (error) {
      console.error('Image upload failed:', error);
      setImageLoading(false);
      alert('Upload Gagal: ' + error.message);
    }
  };

  const openModal = (supplier = null) => {
    if (supplier) {
      setCurrentSupplier(supplier);
    } else {
      setCurrentSupplier({
        supplier: '',
        whatsapp: '',
        province: '',
        location: '',
        description: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSaveSupplier = async (e) => {
    e.preventDefault();
    // console.log('Current Supplier Data:', currentSupplier);

    try {
        const token = localStorage.getItem('token'); 
        const headers = token ? {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',  
        } : {
            'Content-Type': 'application/json',
        };

        if (currentSupplier.id) {
            // console.log(`Updating supplier with ID: ${currentSupplier.id}`);
            await axios.put(
                `https://nusaira-be.vercel.app/api/suppliers/${currentSupplier.id}`, 
                currentSupplier, 
                { headers }
            );
        } else {
            // console.log('Adding new supplier:', currentSupplier);
            await axios.post(
                'https://nusaira-be.vercel.app/api/suppliers', 
                currentSupplier, 
                { headers }
            );
        }

        // console.log('Supplier saved successfully');
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: currentSupplier.id ? 'Supplier berhasil diperbarui!' : 'Supplier baru berhasil ditambahkan!',
        });

        fetchSuppliers();
        setIsModalOpen(false);
    } catch (err) {
        console.error('Error saving supplier:', err);

        Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menyimpan supplier.',
        });
        setError('Failed to save supplier');
    }
};



  const handleDeleteSupplier = async (supplierId) => {
    const confirmation = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin menghapus supplier ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (confirmation.isConfirmed) {
      try {
          const token = localStorage.getItem('token');  
          const headers = token ? {
              'Authorization': `Bearer ${token}`, 
          } : {};

          await axios.delete(
              `https://nusaira-be.vercel.app/api/suppliers/${supplierId}`,
              { headers }
          );
  
          Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Supplier berhasil dihapus!',
          });
  
          setSuppliers((prev) => prev.filter((supplier) => supplier.id !== supplierId));
      } catch (err) {
          Swal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat menghapus supplier.',
          });
          setError('Failed to delete supplier');
      }
  }  
  };



  return (
    <div className="bg-white overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Daftar Supplier</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="mr-2" size={20} /> Tambah Supplier
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 mr-4 ml-4">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-500 text-black uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left border border-gray-300">No</th>
              <th className="py-3 px-4 text-left border border-gray-300">Gambar</th>
              <th className="py-3 px-4 text-left border border-gray-300">Nama Supplier</th>
              <th className="py-3 px-4 text-left border border-gray-300">whatsapp</th>
              <th className="py-3 px-4 text-left border border-gray-300">Email</th>
              <th className="py-3 px-4 text-left border border-gray-300">Provinsi</th>
              <th className="py-3 px-4 text-left border border-gray-300">Lokasi</th>
              <th className="py-3 px-4 text-left border border-gray-300">Deskripsi</th>
              <th className="py-3 px-4 text-center border border-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {(suppliers || []).map((supplier, index) => (
              <tr key={supplier.id || index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-3 px-4 border border-gray-300">
                  {supplier.image ? (
                    <img
                      src={supplier.image}
                      alt={supplier.supplier}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.supplier || 'N/A'}</td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.whatsapp || 'N/A'}</td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.email || 'N/A'}</td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.province || 'N/A'}</td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.location || 'N/A'}</td>
                <td className="py-3 px-4 border border-gray-300 text-black">{supplier.description || 'N/A'}</td>
                <td className="py-3 px-4 text-center border border-gray-300">
                  <div className="flex justify-center space-x-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => openModal(supplier)}
                        className="px-4 py-2 text-blue-500 hover:text-blue-700 border border-blue-500 rounded-lg hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-700 hover:text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Supplier */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl">
                {currentSupplier.id ? 'Edit Supplier' : 'Tambah Supplier'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className=""
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSupplier}>
              <div className="mb-4">
                <label className="block mb-2">Gambar Supplier</label>
                <div className="flex items-center space-x-4">
                  {currentSupplier.image ? (
                    <img
                      src={currentSupplier.image}
                      alt="Supplier"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                      No Image
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={imageLoading}
                    />
                    <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      <ImagePlus className="mr-2" size={20} />
                      {imageLoading ? 'Uploading...' : 'Upload'}
                    </div>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Ukuran maks: 5MB. Format: JPEG, PNG, GIF, WebP
                </p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Nama Supplier</label>
                <input
                  type="text"
                  placeholder='Masukkan Nama Supplier'
                  name="supplier"
                  value={currentSupplier.supplier}
                  onChange={handleInputChange}
                  className="w-full border border-blue-500 rounded px-3 py-2 placeholder-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  placeholder='Masukkan Email Supplier'
                  type="email"
                  name="email"
                  value={currentSupplier.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 border-blue-500 placeholder-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">whatsapp</label>
                <input
                  type="text"
                  placeholder='Contoh: (628123456789)'
                  name="whatsapp"
                  value={currentSupplier.whatsapp}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 border-blue-500 placeholder-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Provinsi</label>
                <input
                  type="text"
                  name="province"
                  placeholder='Masukkan provinsi'
                  value={currentSupplier.province}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 border-blue-500 placeholder-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Lokasi</label>
                <input
                  type="text"
                  name="location"
                  placeholder='Masukkan Lokasi (Kabupaten/Kota)'
                  value={currentSupplier.location}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 border-blue-500 placeholder-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Deskripsi</label>
                <textarea
                  name="description"
                  placeholder='Masukkan Deskripsi Supplier'
                  value={currentSupplier.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 border-blue-500 placeholder-black"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersTable;