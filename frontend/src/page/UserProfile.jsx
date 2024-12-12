import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit } from "lucide-react";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setUserData(response.data);
      } catch (err) {
        setError("Gagal mengambil data pengguna.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete("https://nusaira-be.vercel.app/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Gagal menghapus akun.");
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
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
  } = userData || {};

  return (
    <div className="bg-white w-full min-h-screen flex">
      <Sidebar className="w-1/5 min-h-screen bg-gray-100" />

      <div className="flex-1">
        <Header />

        <div className="flex items-center justify-center p-4 bg-white rounded-md space-x-4">
          <span className="text-lg font-medium text-gray-700">Informasi User</span>
          <Edit className="text-blue-500 cursor-pointer hover:text-blue-700 ml-auto" />
        </div>

        <div className="max-w-4xl rounded-lg mx-auto p-6 bg-white border border-blue-500 min-h-screen shadow-md">
          <div className="mb-2">
            <h2 className="text-sm text-gray-600">Foto Profil</h2>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="w-36 h-36 bg-blue-200 rounded-full overflow-hidden mb-2">
              <img
                src={profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: "Nama", value: name },
              { label: "Pekerjaan", value: pekerjaan },
              { label: "Jenis Kelamin", value: jenis_kelamin },
              { label: "Lokasi", value: lokasi },
              { label: "Terdaftar Sejak", value: formatDate(created_at) },
              { label: "Email", value: email },
              { label: "No Handphone", value: no_hp },
            ].map(({ label, value }, idx) => (
              <div key={idx}>
                <div className="flex items-center mb-1">
                  <label className="text-sm text-gray-600 w-1/3">{label}</label>
                  <div className="w-2/3">{value || "-"}</div>
                </div>
                {idx < 6 && <div className="h-px bg-gray-300"></div>}
              </div>
            ))}

            <div>
              <div className="h-px bg-gray-300"></div>
              <div className="flex justify-between items-center mt-10">
                <span className="text-sm text-red-600">
                  Setelah klik tombol Tutup Akun, sistem akan menghapus seluruh data
                  yang terdaftar di akun ini.
                </span>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Hapus Akun
                </button>
              </div>
            </div>
          </div>
        </div>
        

        <Footer />
      </div>
      <AIFloatingButton />
    </div>
  );
};

export default UserProfile;
