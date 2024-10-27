import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="w-full lg:w-[calc(100%-250px)] ml-auto container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Informasi Kontak */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Informasi Kontak</h4>
          <ul className="space-y-2">
            <li>Email: NusAlra@gmail.com</li>
            <li>Telepon: +62 851 1928 3746</li>
            <li>Alamat: Jalan Agraris Sejahtera No. 06</li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Sosial Media</h4>
          <ul className="space-y-2">
            <li>NusAlra</li>
            <li>@NusAlra</li>
            <li>@NusAlra</li>
          </ul>
        </div>

        {/* Kebijakan dan Ketentuan */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Kebijakan dan Ketentuan</h4>
          <ul className="space-y-2">
            <li>Kebijakan Privasi</li>
            <li>Syarat dan Ketentuan</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} NusAlra. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;
