import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductModal from './ProductModal';

const ProductsCard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    product_supplier_id: '',
    product_title: '',
    product_description: '',
    product_price: '',
    product_image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('https://nusaira-be.vercel.app/api/products');
      const suppliersResponse = await axios.get('https://nusaira-be.vercel.app/api/suppliers');

      const suppliersData = Array.isArray(suppliersResponse.data.data) ? suppliersResponse.data.data : [];
      console.log('Suppliers Data:', suppliersData);

      const productsData = Array.isArray(response.data.data) ? response.data.data : [];
      setSuppliers(suppliersData);
      setProducts(productsData);

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Produk',
        text: err.response?.data?.message || 'Terjadi kesalahan saat memuat produk',
      });
      setIsLoading(false);
    }
  };


  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(sup => sup.id === supplierId);
    return supplier ? supplier.supplier : 'Supplier not found';
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct({
        product_id: product.product_id,
        product_title: product.product_title || '',
        product_description: product.product_description || '',
        product_price: product.product_price || '',
        product_image: product.product_image || ''
      });
    } else {
      setCurrentProduct({
        product_title: '',
        product_description: '',
        product_price: '',
        product_image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSaveProduct = async (e) => {
    e.preventDefault();
    console.log("Current Product Data:", currentProduct);

    const productData = {
      ...currentProduct,
    };
    console.log("Product Data to be sent:", productData);

    try {
      if (currentProduct.product_id) {
        console.log("Updating product with ID:", currentProduct.product_id);
        await axios.put(`https://nusaira-be.vercel.app/api/products/${currentProduct.product_id}`, productData);
      } else {
        console.log("Adding new product");
        await axios.post(`https://nusaira-be.vercel.app/api/products`, productData);
      }

      console.log("Product saved successfully");

      fetchProducts();
      setIsModalOpen(false);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: currentProduct.product_id ? 'Produk berhasil diperbarui' : 'Produk berhasil ditambahkan'
      });
    } catch (err) {
      console.error("Error saving product:", err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Produk',
        text: err.response?.data?.message || 'Terjadi kesalahan saat menyimpan produk'
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Produk akan dihapus permanen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://nusaira-be.vercel.app/api/products/${productId}`);
          setProducts(products.filter(product => product.product_id !== productId));

          Swal.fire({
            icon: 'success',
            title: 'Dihapus!',
            text: 'Produk berhasil dihapus'
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menghapus',
            text: err.response?.data?.message || 'Terjadi kesalahan saat menghapus produk'
          });
        }
      }
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Tipe File Tidak Valid',
        text: 'Harap unggah file gambar (JPEG, PNG, GIF, WebP)'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Ukuran File Terlalu Besar',
        text: 'Maksimal ukuran file adalah 5MB'
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setIsUploading(true);
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      const imageFormData = new FormData();
      imageFormData.append('file', file);
      imageFormData.append('upload_preset', 'Nusaira');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgl701jmj/image/upload',
        imageFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
          }
        }
      );

      const uploadedUrl = response.data.secure_url;

      setCurrentProduct(prev => ({
        ...prev,
        product_image: uploadedUrl
      }));

      Swal.fire({
        icon: 'success',
        title: 'Upload Berhasil',
        text: 'Gambar produk berhasil diunggah'
      });
    } catch (error) {
      console.error('Image upload failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Gagal',
        text: error.message
      });
      setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCurrentProduct(prev => ({
      ...prev,
      product_image: ''
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-300">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentProduct={currentProduct}
        handleInputChange={handleInputChange}
        handleSaveProduct={handleSaveProduct}
        handleImageUpload={handleImageUpload}
        imagePreview={imagePreview}
        isUploading={isUploading}
        handleRemoveImage={handleRemoveImage}
      />

      <div className="flex justify-between items-center p-4 border-b-2 ">
        <h2 className="text-xl font-semibold text-gray-800">Daftar Produk</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="mr-2" size={20} /> Tambah Produk
        </button>
      </div>

      {Array.isArray(products) && products.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Tidak ada data produk
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
            <div key={product.product_id} className="bg-white shadow-sm rounded-lg border border-gray-300">
              <img
                src={product.product_image || '/images/default-product.png'}
                alt={product.product_title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className='p-4'>
                <h3 className="text-lg font-semibold text-gray-700">{product.product_title}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.product_description}</p>
                <p className="text-sm text-gray-500 mb-2">{getSupplierName(product.product_supplier_id)}</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  {product.product_price
                    ? `Rp ${Math.round(product.product_price).toLocaleString('id-ID')}`
                    : 'Harga belum ditentukan'}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Edit className="mr-2" size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.product_id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Trash2 className="mr-2" size={16} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsCard;
