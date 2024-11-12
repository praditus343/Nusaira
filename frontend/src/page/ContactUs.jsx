import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const ContactPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div
      id="hubungiKamiSection"
      className="w-full max-w-4xl mx-auto p-6"
      data-aos="fade-in" 
    >
      <h1
        className="text-2xl font-bold text-center mb-8"
        data-aos="fade-in" 
      >
        Hubungi Kami
      </h1>
      <div
        className="flex flex-col md:flex-row justify-between gap-4 mb-8 border border-blue-600 h-[130px] rounded-lg"
        data-aos="fade-left" 
      >
        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
              {/* Icon for Address */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Alamat kami :</p>
              <p className="text-sm">jl. banten gg ipress, rt 02/k2, gedung literasi lt5, jakarta</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
              {/* Icon for Email */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Kami</p>
              <p className="text-sm">NusAira12345@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start gap-2">
            <div className="min-w-[24px] text-blue-500">
              {/* Icon for Phone */}
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor kami</p>
              <p className="text-sm">+62 897-113-565</p>
              <p className="text-sm">0898 7654 34576</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Kamu"
            className="w-full p-2 border border-blue-600 rounded-md placeholder-black"
            data-aos="fade-left" 
          />
          <input
            type="email"
            placeholder="Email Kamu"
            className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
            data-aos="fade-left"
          />
        </div>

        <input
          type="text"
          placeholder="Subjek"
          className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
          data-aos="fade-left"
        />

        <textarea
          placeholder="Isi Pesan"
          rows={6}
          className="w-full p-2 border rounded-md border-blue-600 placeholder-black"
          data-aos="fade-left"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          data-aos="fade-left"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
