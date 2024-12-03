import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from 'react';

const ProductModal = ({
    isModalOpen,
    setIsModalOpen,
    currentProduct,
    handleInputChange,
    handleSaveProduct,
    handleImageUpload,
    imagePreview,
    isUploading,
    handleRemoveImage
}) => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        if (isModalOpen) {
            const fetchSuppliers = async () => {
                try {
                    const response = await fetch('https://nusaira-be.vercel.app/api/suppliers');
                    const data = await response.json();
                    console.log(data);
                    if (data.status === "success") {
                        setSuppliers(data.data); 
                    } else {
                        console.error("Failed to fetch suppliers");
                    }
                } catch (error) {
                    console.error("Error fetching suppliers:", error);
                }
            };

            fetchSuppliers();
        }
    }, [isModalOpen]);
    return (
        isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                    <div className="p-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {currentProduct.product_id ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </h2>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-800 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
                            <input
                                type="text"
                                name="product_title"
                                placeholder="Masukkan Nama Produk"
                                value={currentProduct.product_title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md border border-blue-500 placeholder-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Supplier</label>
                            <div className='relative'>
                                <select
                                    name="product_supplier_id"
                                    value={currentProduct.product_supplier_id || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    required
                                >
                                    <option value="" disabled>Pilih Supplier</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.supplier} ({supplier.location}, {supplier.province})
                                        </option>
                                    ))}
                                </select>

                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</label>
                            <textarea
                                name="product_description"
                                placeholder='Masukkan Deskripsi Produk'
                                value={currentProduct.product_description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md border border-blue-500 placeholder-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                            <input
                                type="number"
                                placeholder='Masukkan Harga Produk'
                                name="product_price"
                                value={currentProduct.product_price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md border border-blue-500 placeholder-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unggah Gambar Produk
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="product-image-upload"
                                    disabled={isUploading}
                                />
                                <label
                                    htmlFor="product-image-upload"
                                    className="flex items-center justify-center w-48 h-48 border-2 border-dashed border border-blue-500 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                                >
                                    {isUploading ? (
                                        <div className="text-center">
                                            <Loader2 className="animate-spin mx-auto h-8 w-8 text-blue-500" />
                                            <p className="text-sm text-gray-500 mt-2">Mengunggah...</p>
                                        </div>
                                    ) : imagePreview || currentProduct.product_image ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview || currentProduct.product_image}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full m-1 hover:bg-red-600"
                                                title="Hapus Gambar"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <Image className="h-12 w-12 mx-auto mb-2" />
                                            <p>Pilih Gambar</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                Ukuran maks: 5MB. Format: JPEG, PNG, GIF, WebP
                            </p>
                        </div>
                        <div className="w-full">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full mt-4"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ProductModal;
