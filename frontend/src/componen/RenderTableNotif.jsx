import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TambahNotifikasiModal from './TambahNotifikasiModal';
import apiClient from '../service/axiosInstance';

const RendaTableNotif = () => {
  const [notifikasiData, setNotifikasiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifikasi();
  }, []);

  const fetchNotifikasi = async () => {
    try {
        setLoading(true);
        const response = await apiClient.get('/notifikasi'); 

        setNotifikasiData(response.data); 
    } catch (error) {
        console.error('Error fetching notifications:', error);
    } finally {
        setLoading(false);
    }
};


const handleDelete = async (id) => {
  const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Notifikasi ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
  });

  if (result.isConfirmed) {
      try {
          Swal.fire({
              title: 'Menghapus...',
              text: 'Sedang memproses penghapusan notifikasi.',
              icon: 'info',
              allowOutsideClick: false,
              showConfirmButton: false,
          });

          await apiClient.delete(`/notifikasi/${id}`); 

          Swal.close();
          setLoading(true);
          fetchNotifikasi(); 

          Swal.fire('Terhapus!', 'Notifikasi berhasil dihapus.', 'success');
      } catch (error) {
          console.error('Error deleting notification:', error);
          Swal.fire('Error!', 'Terjadi kesalahan saat menghapus notifikasi.', 'error');
      } finally {
          setLoading(false);
      }
  }
};


  const handleNotifikasiAdded = () => {
    fetchNotifikasi();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold"> Pemberitahuan Umum</h2>
        <TambahNotifikasiModal onNotifikasiAdded={handleNotifikasiAdded} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {notifikasiData.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada notifikasi</p>
          ) : (
            <table className="w-full bg-white rounded shadow-lg border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4 text-left border border-gray-300">No</th>
                  <th className="py-2 px-4 text-left border border-gray-300">Judul</th>
                  <th className="py-2 px-4 text-left border border-gray-300">Deskripsi</th>
                  <th className="py-2 px-4 text-left border border-gray-300">Jenis</th>
                  <th className="py-2 px-4 text-left border border-gray-300">Tanggal</th>
                  <th className="py-2 px-4 text-left border border-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notifikasiData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                    <td className="py-2 px-4 border border-gray-300">{item.title}</td>
                    <td className="py-2 px-4 border border-gray-300">{item.description}</td>
                    <td className="py-2 px-4 border border-gray-300">{item.type}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      {new Date(item.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default RendaTableNotif;
