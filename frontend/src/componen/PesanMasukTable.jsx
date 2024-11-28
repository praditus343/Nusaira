import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { markMessageAsRead, deleteMessage } from '../../service/AxiosConfig.js';

export const PesanMasukTable = ({ pesanData }) => {
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(pesanData);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const sortMessages = (data) => {
    const supplierMessages = data.filter(item =>
      item.subjek.toLowerCase().includes('supplier')
    );
    const otherMessages = data.filter(item =>
      !item.subjek.toLowerCase().includes('supplier')
    );
    return [...supplierMessages, ...otherMessages]; 
  };

  useEffect(() => {
    setUpdatedData(sortMessages(pesanData)); 
  }, [pesanData]);

  const handleMarkAsRead = async (id) => {
    setLoading(true);
    try {
      await markMessageAsRead(id);
      const newData = updatedData.map((item) =>
        item.id === id ? { ...item, status: 'read' } : item
      );
      setUpdatedData(newData);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pesan berhasil ditandai sebagai sudah dibaca!',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Gagal menandai pesan sebagai sudah dibaca:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat menandai pesan.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessages = async () => {
    if (selectedIds.length === 0) {
      const result = await Swal.fire({
        title: 'Tidak ada yang dipilih!',
        text: 'Tidak ada pesan yang dipilih untuk dihapus.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });

      if (result.isConfirmed) {
        setIsDeleteMode(false);
        setSelectedIds([]);
      }
      return;
    }

    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Pesan yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      for (const id of selectedIds) {
        await deleteMessage(id);
      }
      const newData = updatedData.filter((item) => !selectedIds.includes(item.id));
      setUpdatedData(newData);

      setSelectedIds([]);
      setIsDeleteMode(false);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pesan berhasil dihapus!',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Gagal menghapus pesan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terjadi kesalahan saat menghapus pesan.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDeleteMode = () => {
    if (selectedIds.length === 0) {
      setIsDeleteMode(!isDeleteMode);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mb-4">Pesan Masuk</h2>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <button
        onClick={handleToggleDeleteMode}
        className={`absolute top-4 right-4 ${isDeleteMode ? 'bg-red-600 text-white rounded-lg px-4 py-2' : 'bg-red-600 text-white rounded-full w-12 h-12'} flex items-center justify-center hover:bg-red-700 mb-10`}
        disabled={loading}
      >
        {isDeleteMode ? 'Hapus Pesan' : <i className="fas fa-trash-alt"></i>}
      </button>

      <div className="overflow-x-auto mt-10">
      <div className="bg-yellow-500 text-white text-center p-2 mb-4 font-bold rounded-lg mb-8">
        Perhatian: Pesan dengan subjek yang mengandung 'Supplier' harus diperhatikan dan didahulukan.
      </div>
        <table className="w-full bg-white rounded shadow-lg border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">
                {isDeleteMode && (
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? updatedData.map((item) => item.id) : [])
                    }
                    checked={selectedIds.length === updatedData.length && updatedData.length > 0}
                  />
                )}
                {!isDeleteMode && 'No'}
              </th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Subjek</th>
              <th className="py-2 px-4 text-left">Pesan</th>
              <th className="py-2 px-4 text-left">Tanggal</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {updatedData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-100 ${selectedIds.includes(item.id) ? 'bg-gray-200' : ''}`}
              >
                <td className="py-2 px-4">
                  {isDeleteMode ? (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.subjek}</td>
                <td className="py-2 px-4">{item.pesan}</td>
                <td className="py-2 px-4">{new Date(item.tanggal).toLocaleDateString()}</td>
                <td className="py-2 px-4">{item.status || 'Belum Dibaca'}</td>
                <td className="py-2 px-4">
                  {item.status === 'pending' && (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-2 mb-2"
                      disabled={loading}
                    >
                      Tandai Dibaca
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteMode && (
        <button
          onClick={handleDeleteMessages}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-8"
          disabled={loading || selectedIds.length === 0}
        >
          Hapus Pesan Terpilih
        </button>
      )}
    </div>
  );
};

export default PesanMasukTable;
