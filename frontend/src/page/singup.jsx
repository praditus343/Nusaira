import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import img from "../assets/img/login_singup/ls5.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../service/axiosInstance";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    no_hp: "",
    email: "",
    password: "",
    confirmPassword: "",
    pekerjaan: "",
    jenis_kelamin: "",
    lokasi: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordVisibilityConfirm = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!Object.values(formData).every((field) => field)) {
        setError("Semua field harus diisi.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Kata sandi tidak cocok.");
        return;
    }

    setLoading(true);

    try {
        await apiClient.post("/register", formData);

        Swal.fire({
            title: "Pendaftaran Berhasil!",
            text: "Lanjutkan ke halaman login! 🚀",
            icon: "success",
            confirmButtonText: "OK",
        }).then(() => {
            navigate("/login");
        });
    } catch (error) {
        setError(error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.");
        console.error("Error signing up:", error);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-inter">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">
        {/* Bagian Kiri: Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-8">
          <img
            src={img}
            alt="Signup Illustration"
            className="max-w-sm"
          />
        </div>

        {/* Bagian Kanan: Form Signup */}
        <div className="w-full md:w-1/2 p-12">
          <h3 className="text-2xl text-gray-500 mb-2">
            Selamat datang di NusAira 👋
          </h3>
          <p className="text-lg font-bold text-gray-600 mb-6">
            Daftar sekarang dan pantau tambak lele kamu untuk hasil terbaik.
          </p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-black-600 text-lg"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Cth. Heri Saputra"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-black-600 text-lg">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Cth. Heri Saputra"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                required
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="lokasi"
                className="block text-black-600 text-lg"
              >
                Lokasi
              </label>

              <div className="relative mb-5">
                <select
                  id="lokasi"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md border-blue-600 appearance-none"
                  required
                >
                  <option value="">Pilih Lokasi</option>
                  <option value="Boyolali" className="text-blue-600">Kabupaten Boyolali</option>
                  <option value="Cilacap" className="text-blue-600"> Cilacap</option>
                  <option value="Kebumen" className="text-blue-600"> Kebumen</option>
                  <option value="Subang" className="text-blue-600"> Subang</option>
                  <option value="Tulungagung" className="text-blue-600"> Tulungagung</option>
                  <option value="Jember" className="text-blue-600"> Jember</option>
                  <option value="Malang" className="text-blue-600"> Malang</option>
                  <option value="Blitar" className="text-blue-600"> Blitar</option>
                  <option value="Bandung" className="text-blue-600"> Bandung</option>
                  <option value="Bekasi" className="text-blue-600"> Bekasi</option>
                  <option value="Bogor" className="text-blue-600"> Bogor</option>
                  <option value="Cirebon" className="text-blue-600"> Cirebon</option>
                </select>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="jenis_kelamin"
                className="block text-black-600 text-lg"
              >
                Jenis Kelamin
              </label>
              <div className="relative mb-5">
                <select
                  id="jenis_kelamin"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md border-blue-600 appearance-none"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="no_hp" className="block text-black-600 text-lg">
                No Handphone
              </label>
              <input
                id="no_hp"
                name="no_hp"
                type="tel"
                placeholder="Cth. 089630764456"
                value={formData.no_hp}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-black-600 text-lg">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                required
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-black-600 text-lg"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Cth. Py8jTjsd1"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-black-600 text-lg"
              >
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Cth. Py8jTjsd1"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 border rounded-md border-blue-600"
                  required
                />
                <div
                  onClick={togglePasswordVisibilityConfirm}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="pekerjaan"
                className="block text-black-600 text-lg"
              >
                Pekerjaan
              </label>
              <div className="relative mb-5">
                <select
                  id="pekerjaan"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md border-blue-600 appearance-none"
                  required
                >
                  <option value="">Pilih Pekerjaan</option>
                  <option value="peternak">Peternak</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="lainnya">Lainnya</option>
                </select>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-semibold transition ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loader"></span> Memuat...
                </div>
              ) : (
                "Daftar"
              )}
            </button>
          </form>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div className="loader"></div>
            </div>
          )}

          {/* Pembatas dan Opsi untuk Mendaftar dengan Media Sosial */}
          <div className="mt-6 flex items-center justify-center">
            <span className="border-b w-1/4"></span>
            <span className="text-sm text-gray-500 px-2">Atau</span>
            <span className="border-b w-1/4"></span>
          </div>

          <div className="mt-4">
            <p className="text-center mb-2 text-sm text-gray-600">
              Daftar Dengan :
            </p>
            <div className="flex justify-center gap-4">
              <button
                aria-label="Daftar dengan Google"
                className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100 transition bg-white"
              >
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                  alt="Google"
                  className="w-6 h-6"
                />
              </button>

              <button
                aria-label="Daftar dengan Facebook"
                className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100 transition bg-white"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Tautan untuk masuk jika sudah memiliki akun */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Sudah Memiliki Akun?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Masuk
            </Link>
          </p>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center mt-4">
            <Link to="/" className="text-blue-500 hover:underline mx-2">
              Home
            </Link>
            <Link to="/signup" className="text-blue-500 hover:underline mx-2">
              Sign Up
            </Link>
            <Link to="/login" className="text-blue-500 hover:underline mx-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
