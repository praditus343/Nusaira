import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import React from "react";
import { Edit, MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";

const Userview = () => {
  return (
    <div className="bg-white w-full min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Input Tambak Baru
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">
                Informasi Terbaru NusAIra
              </span>
              {/* Round image for the Indonesian flag */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="path/to/indonesian-flag.png" // Replace with the actual path to the flag image
                  alt="Bendera Indonesia"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Round image for profile photo */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="path/to/profile-photo.png" // Replace with the actual path to the profile photo
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 w-full" />
      </header>

      {/* Pengaturan Akun */}
      <span className="text-lg font-medium text-black ml-9 mr-18">
        Pengaturan Akun
      </span>
      <div className="flex items-center justify-between p-4 bg-white rounded-md mt-10 space-x-2">
        <span className="text-lg font-medium text-gray-700 ml-6 mr-12">
          Informasi User
        </span>
        <Edit className="text-blue-500 cursor-pointer hover:text-blue-700" />
      </div>

      {/* User Information */}
      <div className="max-w-4xl rounded-lg ml-10 mr-15 p-6 bg-blue-100 min-h-screen">
        <div className="mb-2">
          <h2 className="text-sm text-gray-600">Foto Profile</h2>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-36 h-36 bg-blue-200 rounded-full overflow-hidden mb-2">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">Herli Sepultra</span>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Pekerjaan */}
          <div>
            <div className="flex items-center mb-1">
              <label className="text-sm text-gray-600 w-1/3">Pekerjaan</label>
              <div className="w-2/3 flex justify-start ml-32">
                <span className="text-sm text-black-400 text-center">
                  Pembudidaya lele
                </span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <div className="flex items-center mb-1">
              <label className="text-sm text-gray-600 w-1/3">
                Jenis Kelamin
              </label>
              <div className="w-2/3 flex justify-start ml-40">
                <span className="text-sm text-black-400">Laki-Laki</span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* Lokasi */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Lokasi</label>
              <div className="w-2/3 flex justify-start ml-80">
                <span className="text-sm text-black-400">
                  Indonesia (Boyolali)
                </span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* Terdaftar Sejak */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Terdaftar Sejak</label>
              <div className="w-2/3 flex justify-start ml-72">
                <span className="text-sm text-black-400">10 Oktober 2024</span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* Keamanan */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-s text-gray-600 center">Keamanan</label>
              <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-5" />
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Email</label>
              <div className="w-2/3 flex justify-start ml-80">
                <span className="text-sm text-black-400">
                  Herlisep@gmail.com
                </span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* No Handphone */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">No Handphone</label>
              <div className="w-2/3 flex justify-start ml-72">
                <span className="text-sm text-black-400 text-center">
                  0896341623905
                </span>
              </div>
            </div>
            <div className="h-px bg-blue-200"></div>
          </div>

          {/* Ubah Kata Sandi */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-semibold text-gray-600 center">
                Ubah Kata Sandi
              </label>
              <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-5" />
            </div>
          </div>

          {/* Peringatan dan Tombol Tutup Akun */}
          <div>
            <div className="h-px bg-blue-200"></div>
            <div className="flex justify-between items-center mt-10">
              <span className="text-sm text-red-600">
                Setelah Klik tombol Tutup Akun sistem akan menghapus seluruh
                data yang terdaftar di akun ini.
              </span>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Tutup Akun
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tambak Terdaftar */}
      <div className="max-w-3xl ml-6 mr-12 p-4 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-base font-medium">
            Tambak Yang Terhubung (2 Tambak)
          </h1>
          <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 w-5 h-7" />
        </div>

        {/* Informasi Tambak */}
        <div className="bg-blue-100 p-6 rounded-lg flex flex-col justify-between shadow-lg w-full max-w-4xl">
          {/* Bagian Nama dan Lokasi */}
          <div className="flex items-start space-x-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-700">
                Tambak Lele Seger
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-1 w-4 h-4 text-blue-500" />
                <span>Boyolali, Jawa Tengah</span>
              </div>
            </div>
          </div>

          {/* Foto Profil dan Detail */}
          <div className="flex items-center justify-between mt-4">
            <img
              src="https://placekitten.com/80/80" 
              alt="Profil"
              className="rounded-full w-16 h-16" 
            />

            {/* Bagian Detail */}
            <div className="grid grid-cols-4 gap-4 text-center flex-grow">
              <div>
                <span className="text-gray-500 text-sm">Sebagai</span>
                <p className="font-semibold text-blue-700">Pemilik</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Terdaftar Sejak</span>
                <p className="font-semibold text-blue-700">10 Oktober 2024</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Jumlah Kolam</span>
                <p className="font-semibold text-blue-700">5</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Pengguna</span>
                <p className="font-semibold text-blue-700">1</p>
              </div>
            </div>
          </div>

          {/* Bagian Tombol */}
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Lihat
            </button>
          </div>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-4 right-4">
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function UserProfile() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Userview />
        <AIFloatingButton/>
        <Footer />
      </div>
    </div>
  );
}

export default UserProfile;
