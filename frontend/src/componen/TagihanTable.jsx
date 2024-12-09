import React from 'react';

const TagihanTable = ({ tagihanData = [] }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!tagihanData || tagihanData.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Tidak ada data tagihan
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200">
      <table className="w-full bg-white border border-gray-300">
        <thead className="bg-blue-600 text-white border-b">
          <tr>
            <th className="px-4 py-3 text-left border-r border-white">Nomor Invoice</th>
            <th className="px-4 py-3 text-left border-r border-white">Paket</th>
            <th className="px-4 py-3 text-left border-r border-white">Jumlah</th>
            <th className="px-4 py-3 text-left border-r border-white">Tanggal Jatuh Tempo</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tagihanData.map((tagihan, index) => (
            <tr 
              key={tagihan.id} 
              className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
            >
              <td className="px-4 py-3 border border-gray-300">{tagihan.invoiceNumber}</td>
              <td className="px-4 py-3 border border-gray-300">{tagihan.name}</td>
              <td className="px-4 py-3 border border-gray-300">{formatCurrency(tagihan.amount)}</td>
              <td className="px-4 py-3 border border-gray-300">{formatDate(tagihan.dueDate)}</td>
              <td className="px-4 py-3">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tagihan.status === 0 
                      ? 'bg-red-200 text-red-800' 
                      : 'bg-green-200 text-green-800'
                  }`}
                >
                  {tagihan.status === 0 ? 'Belum Bayar' : 'Sudah Bayar'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagihanTable;