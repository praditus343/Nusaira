import React, { useState, useEffect } from 'react';

const LeleDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://nusaira-be.vercel.app/api/budidaya-lele');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(value));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="w-full p-6 shadow-lg ml-10 mr-10 bg-white rounded-lg border border-gray-300 mb-14">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Harga Pasar Budidaya Lele</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm lg:text-base mb-10">
          <thead className="bg-blue-300">
            <tr>
              <th className="p-3 border border-gray-300">Provinsi</th>
              <th className="p-3 border border-gray-300">Kota</th>
              <th className="p-3 border border-gray-300">Tahun</th>
              <th className="p-3 border border-gray-300 text-center">Volume (Kg)</th>
              <th className="p-3 border border-gray-300 text-center">Pendapatan Total</th>
              <th className="p-3 border border-gray-300 text-center">Harga Pasar/Kg</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300 text-center">{item.provinsi}</td>
                <td className="p-3 border border-gray-300 text-center">{item.kota}</td>
                <td className="p-3 border border-gray-300 text-center">{item.tahun}</td>
                <td className="p-3 border border-gray-300 text-center">{parseFloat(item.volume).toLocaleString('id-ID')}</td>
                <td className="p-3 border border-gray-300 text-center">
                  <span className="inline-block text-center w-full">{formatCurrency(item.pendapatanTotal)}</span>
                </td>
                <td className="p-3 border border-gray-300 text-center">
                  <span className="inline-block text-center w-full">{formatCurrency(item.hargaPasar)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeleDataTable;
