import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import img from "../assets/img/login_singup/ls5.png"; 

const SignUpPage = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    if (!Object.values(formData).every((field) => field)) {
      setError("Semua field harus diisi.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Kata Sandi tidak cocok.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Lanjutkan Pendaftaran! 🚀");
      navigate("/signup2"); 
    }, 2000);
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
            {/* Input untuk Username */}
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
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Input untuk No Handphone */}
            <div>
              <label htmlFor="phone" className="block text-black-600 text-lg">
                No Handphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Cth. 089630764456"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Input untuk Email */}
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
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Input untuk Kata Sandi */}
            <div>
              <label
                htmlFor="password"
                className="block text-black-600 text-lg"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Cth. Py8jTjsd1"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Input untuk Ulangi Kata Sandi */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-black-600 text-lg"
              >
                Ulangi Kata Sandi
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Cth. Py8jTjsd1"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Dropdown untuk Pekerjaan */}
            <div>
              <label
                htmlFor="occupation"
                className="block text-black-600 text-lg"
              >
                Pekerjaan
              </label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Pilih Pekerjaan</option>
                <option value="peternak">Peternak</option>
                <option value="pedagang">Pedagang</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-semibold transition ${
                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
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
