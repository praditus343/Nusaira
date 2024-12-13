import Sidebar from "../componen/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Camera } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { MapPin } from 'lucide-react';
import Swal from "sweetalert2";
import Error404Page from "../componen/ErrorPage";
import Footer from "../componen/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [tambakData, setTambakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});




  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Harap login kembali.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://nusaira-be.vercel.app/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        if (userData.gender === "L") {
          userData.gender = "Laki-Laki";
        } else if (userData.gender === "P") {
          userData.gender = "Perempuan";
        }

        setUserData(userData);
        // console.log(response);
        setEditedData(userData);
      } catch (err) {
        setError("Gagal mengambil data pengguna.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTambakData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://nusaira-be.vercel.app/api/tambak", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTambakData(response.data);
      } catch (err) {
        console.error("Error fetching tambak data:", err);
      }
    };

    fetchUserData();
    fetchTambakData();
  }, []);



  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        imageFormData.append('upload_preset', 'Nusaira');
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dgl701jmj/image/upload',
          imageFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        return response.data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUserData((prev) => ({
        ...prev,
        profilePicture: uploadedUrls[0]
      }));
      setEditedData((prev) => ({
        ...prev,
        profilePicture: uploadedUrls[0]
      }));
      setLoading(false);
    } catch (error) {
      console.error('Image upload failed:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Upload Gagal',
        text: error.message
      });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Menghapus akun akan menghapus semua data terkait. Tindakan ini tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus Akun',
      cancelButtonText: 'Batal',
    });

    if (confirmDelete.isConfirmed) {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Gagal!', 'Token tidak ditemukan. Harap login kembali.', 'error');
        return;
      }

      try {
        const response = await axios.delete('https://nusaira-be.vercel.app/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire('Akun Dihapus!', 'Akun Anda telah dihapus dengan sukses.', 'success');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        Swal.fire('Gagal Menghapus Akun!', 'Terjadi kesalahan. Coba lagi nanti.', 'error');
      }
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Gagal!', 'Token tidak ditemukan. Harap login kembali.', 'error');
      return;
    }

    if (editedData.gender === "Laki-Laki") {
      editedData.gender = "L";
    } else if (editedData.gender === "Perempuan") {
      editedData.gender = "P";
    }

    try {
      const response = await axios.put(
        'https://nusaira-be.vercel.app/api/profile',
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setUserData(response.data);
      setIsEditing(false);
      Swal.fire('Berhasil!', 'Profil berhasil diperbarui.', 'success');
    } catch (error) {
      console.error('Update profile failed:', error);
      Swal.fire('Gagal!', 'Gagal memperbarui profil.', 'error');
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error404Page />
      </div>
    );
  }

  const {
    profilePicture,
    name,
    pekerjaan,
    jenis_kelamin,
    lokasi,
    created_at,
    email,
    no_hp,
    role,
  } = userData || {};

  const profileFields = [
    {
      label: "Nama",
      name: "name",
      value: name
    },
    {
      label: "Pekerjaan",
      name: "pekerjaan",
      value: pekerjaan
    },
    {
      label: "Jenis Kelamin",
      name: "jenis_kelamin",
      value: jenis_kelamin === "L" ? "Laki-Laki" : "Perempuan",
      type: "select",
      options: ["Perempuan", "Laki-Laki"],
    },
    {
      label: "Lokasi",
      name: "lokasi",
      value: lokasi
    },
    {
      label: "Terdaftar Sejak",
      name: "created_at",
      value: formatDate(created_at),
      disabled: true
    },
    {
      label: "Email",
      name: "email",
      value: email
    },
    {
      label: "No Handphone",
      name: "no_hp",
      value: no_hp
    },

  ];


  return (
    <div className="bg-white w-full min-h-screen flex">
      <Sidebar className="w-1/5 min-h-screen bg-gray-100" />
      <div className="flex-1">
        <Header />
        <div className="flex items-center justify-center p-4 bg-white rounded-md space-x-4">
          <span className="text-lg font-medium text-gray-700">Informasi User</span>
          <div className="relative group">
            <Edit
              className="text-blue-500 cursor-pointer hover:text-blue-700 ml-auto"
              onClick={() => setIsEditing(!isEditing)}
            />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-1 bg-blue-500 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-auto min-w-[70px]">
              Edit Profile
            </div>
          </div>
        </div>
        <div className="max-w-4xl rounded-lg mx-auto p-6 bg-white border border-blue-500 min-h-screen shadow-md">
          <div className="mb-2">
            <h2 className="text-sm text-gray-600">Foto Profil</h2>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div
              className={`w-36 h-36 bg-blue-200 rounded-full overflow-hidden mb-2 relative 
              ${isEditing ? 'cursor-pointer hover:opacity-70' : ''}`}
            >
              <img
                src={profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Camera className="text-white w-10 h-10" />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {profileFields.map(({ label, name, value, type, options, disabled }, idx) => (
              <div key={idx}>
                <div className="flex items-center mb-1">
                  <label className="text-sm text-gray-600 w-1/3">{label}</label>
                  {isEditing && !disabled ? (
                    type === "select" ? (
                      <div className="relative w-full md:w-2/3 mb-2">
                        <select
                          name={name}
                          value={editedData[name] || value}
                          onChange={handleInputChange}
                          className="w-full border rounded px-2 py-1 appearance-none pr-10"
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={editedData[name] || value}
                        onChange={handleInputChange}
                        className="w-2/3 border rounded px-2 py-1 border-blue-600 mb-2"
                        disabled={disabled}
                      />
                    )
                  ) : (
                    <div className="w-2/3">{value || "-"}</div>
                  )}
                </div>
                {idx < 6 && <div className="h-px bg-gray-300"></div>}
              </div>
            ))}

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            )}

            <div className="h-px bg-gray-300"></div>
            <div className="flex justify-between items-center mt-10">
              <span className="text-sm text-red-600">Setelah klik tombol Tutup Akun, sistem akan menghapus seluruh data yang terdaftar di akun ini.</span>
            </div>
            <button onClick={handleDeleteAccount} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Hapus Akun</button>
          </div>
        </div>

        <div className="max-w-4xl rounded-lg mx-auto bg-white border-blue-500 mb-20 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-base font-medium">
              Tambak Yang Terhubung ({tambakData.length} Tambak)
            </h1>
          </div>

          {tambakData.map((tambak, index) => (
            <div key={index} className="bg-white border-blue-600 border p-4 rounded-lg flex flex-col justify-between shadow-lg w-full max-w-4xl mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-700">Tambak {tambak.nama}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1 w-4 h-4 text-blue-500" />
                    <span>{tambak.provinsi} ,{tambak.kabupaten}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 text-center flex-grow mb-3">
                  <div className="border border-gray-300 rounded-full w-14 h-14 overflow-hidden mx-auto">
                    <img
                      src={profilePicture}
                      alt="Profil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Sebagai</span>
                    <p className="font-semibold text-blue-700 text-sm">{pekerjaan}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Terdaftar Sejak</span>
                    <p className="font-semibold text-blue-700 text-sm">
                      {formatDate(tambak.created_at)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Jumlah Kolam</span>
                    <p className="font-semibold text-blue-700 text-sm">{tambak.jumlah_kolam}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Pengguna</span>
                    <p className="font-semibold text-blue-700 text-sm">1</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
      <AIFloatingButton />
    </div>
  );
};

export default UserProfile;