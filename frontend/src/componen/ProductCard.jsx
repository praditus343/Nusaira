import React, { useState } from 'react';
import { Edit, Trash2, Plus, Package } from 'lucide-react';

const ProductsCard = ({ productsData }) => {
  const [products, setProducts] = useState(productsData || []);

  const handleAddProduct = () => {
    // Implement add product logic
    console.log('Add Product clicked');
  };

  const handleEditProduct = (productId) => {
    // Implement edit product logic
    console.log('Edit Product:', productId);
  };

  const handleDeleteProduct = (productId) => {
    // Implement delete product logic
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Daftar Produk</h2>
        <button 
          onClick={handleAddProduct}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <Plus className="mr-2" size={20} /> Tambah Produk
        </button>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Tidak ada data produk
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="text-blue-600" size={24} />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditProduct(product.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{product.nama}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Supplier:</strong> {product.supplier}</p>
                <p><strong>Harga:</strong> Rp {product.harga.toLocaleString()}</p>
                <p><strong>Stok:</strong> {product.stok}</p>
              </div>
              
              <div className="mt-4">
                <span 
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.stok > 50 ? 'bg-green-100 text-green-800' : 
                    product.stok > 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {product.stok > 50 ? 'Stok Tersedia' : 
                   product.stok > 10 ? 'Stok Menipis' : 
                   'Stok Habis'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsCard;