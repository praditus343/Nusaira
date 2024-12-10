import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateForm = () => {
    if (!nama.trim()) {
      toast.error('Nama harus diisi');
      return false;
    }
    if (!email.trim()) {
      toast.error('Email harus diisi');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Format email tidak valid');
      return false;
    }
    if (!subjek.trim()) {
      toast.error('Subjek harus diisi');
      return false;
    }
    if (!pesan.trim()) {
      toast.error('Pesan harus diisi');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post('https://nusaira-be.vercel.app/api/contact/send', {
        nama,
        email,
        subjek,
        pesan,
        status: 'unread',
        tanggal: new Date().toISOString(),
      });

      toast.success('Pesan berhasil dikirim!');
      setNama('');
      setEmail('');
      setSubjek('');
      setPesan('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="hubungiKamiSection"
      className="w-full max-w-screen-lg mx-auto p-8"
      data-aos="fade-in"
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl font-bold text-center mb-8" data-aos="fade-in">
        Hubungi Kami
      </h1>
      <div
        className="flex flex-col md:flex-row justify-between gap-4 mb-8 border border-blue-600 h-[130px] rounded-lg"
        data-aos="fade-left"
      >
        {/* Section Alamat */}
        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
            </div>
            <div>
              <p className="text-sm text-gray-500">Alamat kami :</p>
              <p className="text-sm">jl. banten gg ipress, rt 02/k2, gedung literasi lt5, jakarta</p>
            </div>
          </div>
        </div>

        {/* Section Email */}
        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Kami</p>
              <p className="text-sm">NusAira12345@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Section Phone */}
        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor kami</p>
              <p className="text-sm">+62 897-113-565</p>
              <p className="text-sm">0898 7654 34576</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Kamu"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border border-blue-600 rounded-md placeholder-black"
            data-aos="fade-left"
          />
          <input
            type="email"
            placeholder="Email Kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
            data-aos="fade-left"
          />
        </div>

        <input
          type="text"
          placeholder="Subjek"
          value={subjek}
          onChange={(e) => setSubjek(e.target.value)}
          className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
          data-aos="fade-left"
        />

        <textarea
          placeholder="Isi Pesan"
          rows={6}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
          data-aos="fade-left"
        />
        <div
          data-aos="fade-left"
          className="w-full"
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 px-4 rounded-md transition duration-200 ${isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isLoading ? 'Memuat...' : 'Kirim'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
