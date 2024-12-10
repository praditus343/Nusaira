import React, { useState } from "react";
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { X } from 'lucide-react'; 

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);

  const policies = {
    privasi: {
      title: 'Kebijakan Privasi',
      content: (
        <div className="space-y-6">
          <p>Selamat datang di NusAlra. Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda.</p>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Informasi yang Kami Kumpulkan</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Data Pribadi: Nama, alamat email, nomor telepon, dan informasi kontak lainnya.</li>
              <li>Data Akun: Username, password (yang dienkripsi), dan preferensi pengguna.</li>
              <li>Data Penggunaan: Aktivitas di platform, riwayat transaksi, dan interaksi dengan layanan.</li>
              <li>Data Teknis: Alamat IP, jenis perangkat, browser, dan lokasi geografis.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">2. Tujuan Pengumpulan Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Memberikan dan mengoptimalkan layanan kami.</li>
              <li>Personalisasi pengalaman pengguna.</li>
              <li>Komunikasi terkait layanan dan pembaruan.</li>
              <li>Analisis penggunaan dan pengembangan produk.</li>
              <li>Keamanan dan pencegahan fraud.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">3. Pembagian dan Pengungkapan Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Kami tidak menjual data pribadi Anda kepada pihak ketiga.</li>
              <li>Data dapat dibagikan dengan penyedia layanan yang membantu operasional kami.</li>
              <li>Pengungkapan data hanya dilakukan jika diwajibkan oleh hukum.</li>
              <li>Anda dapat meminta penghapusan data pribadi kapan pun.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">4. Keamanan Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Menggunakan enkripsi standar industri untuk melindungi data.</li>
              <li>Kontrol akses ketat untuk mencegah akses tidak sah.</li>
              <li>Pembaruan berkala terhadap praktik keamanan.</li>
              <li>Pemberitahuan segera jika terjadi potensi pelanggaran data.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">5. Hak Pengguna</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hak untuk mengakses data pribadi Anda.</li>
              <li>Hak untuk meminta koreksi informasi yang tidak akurat.</li>
              <li>Hak untuk meminta penghapusan data.</li>
              <li>Hak untuk membatasi atau menolak pengolahan data.</li>
              <li>Hak untuk memindahkan data Anda.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">6. Cookie dan Teknologi Pelacakan</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Menggunakan cookie untuk meningkatkan pengalaman pengguna.</li>
              <li>Pengguna dapat mengatur preferensi cookie di pengaturan browser.</li>
              <li>Kami menggunakan analitik untuk memahami penggunaan layanan.</li>
            </ul>
          </div>
  
          <p className="italic text-sm">Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Kami mendorong Anda untuk secara berkala meninjau halaman ini.</p>
        </div>
      )
    },
    syaratKetentuan: {
      title: 'Syarat dan Ketentuan',
      content: (
        <div className="space-y-6">
          <p>Selamat datang di NusAlra. Dengan mengakses dan menggunakan layanan kami, Anda setuju untuk terikat dengan syarat dan ketentuan berikut:</p>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Penggunaan Layanan</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Anda harus berusia minimal 18 tahun untuk menggunakan layanan kami.</li>
              <li>Anda bertanggung jawab penuh atas kebenaran informasi yang Anda berikan.</li>
              <li>Dilarang menggunakan layanan untuk kegiatan yang melanggar hukum.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">2. Akun Pengguna</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Anda wajib menjaga kerahasiaan akun dan password Anda.</li>
              <li>Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di akun Anda.</li>
              <li>NusAlra berhak untuk membatasi atau membatalkan akun yang dicurigai melakukan pelanggaran.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">3. Hak Kekayaan Intelektual</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Seluruh konten di platform kami dilindungi hak cipta.</li>
              <li>Dilarang mereproduksi, mendistribusikan, atau memodifikasi konten tanpa izin.</li>
              <li>Pelanggaran akan dikenakan sanksi sesuai peraturan perundang-undangan.</li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold text-lg mb-2">4. Batasan Tanggung Jawab</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>NusAlra tidak bertanggung jawab atas kerugian tidak langsung yang ditimbulkan.</li>
              <li>Kompensasi maksimal terbatas pada biaya aktual yang telah dibayarkan.</li>
              <li>Kami tidak menjamin ketersediaan layanan 100% setiap saat.</li>
            </ul>
          </div>
  
          <p className="italic text-sm">Syarat dan ketentuan ini dapat diperbarui sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
        </div>
      )
    }
  };
  
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-8 h-8" /> 
            </button>
          </div>
          <div className="p-6 text-gray-700">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="bg-blue-600 text-white py-10">
        <div className="w-full lg:w-[calc(100%-250px)] ml-auto container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Informasi Kontak */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Informasi Kontak</h4>
            <ul className="space-y-2">
              <li>Email: NusAlra@gmail.com</li>
              <li>Telepon: +62 857 7261 9653</li>
              <li>Alamat: Jalan Agraris Sejahtera No. 06</li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Sosial Media</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <a
                  href="https://twitter.com/nusa_ira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FaTwitter className="text-white" />
                  <span className="text-white">NusAlra</span>
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61569492390896&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FaFacebook className="text-white" />
                  <span className="text-white">NusAlra</span>
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <a
                  href="https://www.instagram.com/nusai_ra/"
                  target="_blank"
                  className="flex items-center space-x-2"
                >
                  <FaInstagram className="text-white" />
                  <span className="text-white">NusAlra</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Kebijakan dan Ketentuan */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Kebijakan dan Ketentuan</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setOpenModal('privasi')}
                  className="text-white hover:underline"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setOpenModal('syaratKetentuan')}
                  className="text-white hover:underline"
                >
                  Syarat dan Ketentuan
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} NusAlra. Semua hak dilindungi.</p>
        </div>
      </footer>

      {/* Modal Kustom */}
      <Modal 
        isOpen={!!openModal}
        onClose={() => setOpenModal(null)}
        title={openModal ? policies[openModal].title : ''}
      >
        {openModal && policies[openModal].content}
      </Modal>
    </>
  );
};

export default Footer;