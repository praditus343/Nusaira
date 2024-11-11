import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import React, { useState } from "react";
import { Edit, MapPin } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import UserImage from "../assets/img/assets_foto/f2.png";

const UserProfile = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isSecurityModalOpen, setSecurityModalOpen] = useState(false);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isProfileModalOpen, setPofileModalOpen] = useState(false);

  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const handleOpenSecurityModal = () => {
    setSecurityModalOpen(true);
  };

  const handleCloseSecurityModal = () => {
    setSecurityModalOpen(false);
  };

  const handleOpenEmailModal = () => {
    setEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
  };

  const handleOpenPhoneModal = () => {
    setPhoneModalOpen(true);
  };

  const handleClosePhoneModal = () => {
    setPhoneModalOpen(false);
  };

  const handleOpenProfileModal = () => {
    setPofileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setPofileModalOpen(false);
  };

  return (
    <div className="bg-white w-full min-h-screen flex">
      {/* SideBar */}
      <Sidebar className="w-1/5 min-h-screen bg-gray-100" />

      {/* Konten Utama */}
      <div className="flex-1">
        <Header />

        {/* Pengaturan Akun */}
        <div className="flex items-center justify-center p-4 bg-white rounded-md space-x-4">
          <span className="text-lg font-medium text-gray-700">
            Informasi User
          </span>
          <Edit
            className="text-blue-500 cursor-pointer hover:text-blue-700 ml-auto"
            onClick={handleOpenProfileModal}
          />
        </div>

        {/* User Information */}
        <div className="max-w-4xl rounded-lg mx-auto p-6 bg-white border border-blue-500 min-h-screen shadow-md">

          <div className="mb-2">
            <h2 className="text-sm text-gray-600">Foto Profile</h2>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-36 h-36 bg-blue-200 rounded-full overflow-hidden mb-2">
              <img
                src={UserImage}
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
              <div className="h-px bg-gray-300"></div>
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
              <div className="h-px bg-gray-300"></div>
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
              <div className="h-px bg-gray-300"></div>
            </div>

            {/* Terdaftar Sejak */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-gray-600">Terdaftar Sejak</label>
                <div className="w-2/3 flex justify-start ml-72">
                  <span className="text-sm text-black-400">
                    10 Oktober 2024
                  </span>
                </div>
              </div>
              <div className="h-px bg-gray-300"></div>
            </div>

            {/* Keamanan */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-s text-gray-600 center">Keamanan</label>
                <Edit
                  className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-5"
                  onClick={handleOpenSecurityModal}
                />
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
              <div className="h-px bg-gray-300"></div>
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
              <div className="h-px bg-gray-300"></div>
            </div>

            {/* Ubah Kata Sandi */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-semibold text-gray-600 center">
                  Ubah Kata Sandi
                </label>
                <Edit
                  className="text-blue-500 cursor-pointer hover:text-blue-700 w-4 h-5"
                  onClick={handleOpenPasswordModal}
                />
              </div>
            </div>

            {/* Peringatan dan Tombol Tutup Akun */}
            <div>
              <div className="h-px bg-gray-300"></div>
              <div className="flex justify-between items-center mt-10">
                <span className="text-sm text-red-600">
                  Setelah Klik tombol Tutup Akun sistem akan menghapus seluruh
                  data yang terdaftar di akun ini.
                </span>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                  Hapus Akun
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tambak Terdaftar */}
        <div className="max-w-4xl rounded-lg mx-auto bg-white border-blue-500 mb-5 mt-6 ">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-base font-medium">
              Tambak Yang Terhubung (2 Tambak)
            </h1>
          </div>

          {/* Informasi Tambak */}
          <div className="bg-white border-blue-600 border p-6 rounded-lg flex flex-col justify-between shadow-lg w-full max-w-4xl">
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
            <div className="flex items-center justify-between mt-4">
              <img
                src={UserImage}
                alt="Profil"
                className="rounded-full w-16 h-16"
              />
              <div className="grid grid-cols-4 gap-4 text-center flex-grow">
                <div>
                  <span className="text-gray-500 text-sm">Sebagai</span>
                  <p className="font-semibold text-blue-700">Pemilik</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Terdaftar Sejak</span>
                  <p className="font-semibold text-blue-700">10 Oktober 2004</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Jumlah Kolam</span>
                  <p className="font-semibold text-blue-700">3</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Pengguna</span>
                  <p className="font-semibold text-blue-700">1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Button AI */}
      <AIFloatingButton />

      {/* Modal Keamanan */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold">Pilih Opsi Keamanan</h3>
            <div className="mt-4">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleOpenEmailModal}
              >
                Ubah Email
              </button>
            </div>
            <div className="mt-2">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleOpenPhoneModal}
              >
                Ubah No Handphone
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                onClick={handleCloseSecurityModal}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ubah Email */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold">Ubah Email</h3>
            <form>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Email Baru
                </label>
                <input
                  type="email"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan email baru"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseEmailModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ubah No Handphone */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold">Ubah No Handphone</h3>
            <form>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  No Handphone Baru
                </label>
                <input
                  type="tel"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan no handphone baru"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePhoneModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Profile */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold">Ubah Informasi</h3>
            <form>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Foto Profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">Nama</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan nama baru"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">Pekerjaan</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan pekerjaan baru"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Jenis Kelamin
                </label>
                <div className="flex mt-2">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2"
                    />{" "}
                    Laki-laki
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
                    />{" "}
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">Lokasi</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan lokasi baru"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseProfileModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ganti Kata Sandi */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold">Ganti Kata Sandi</h3>
            <form>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan kata sandi lama"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan kata sandi baru"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-700">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Konfirmasi kata sandi baru"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePasswordModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
