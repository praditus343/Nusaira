import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../assets/img/login_singup/ls1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../service/axiosInstance"; 

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });
  
      const data = response.data;
  
      if (data.token && data.profile) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("profile", JSON.stringify(data.profile));
  
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Selamat datang di dashboard",
        }).then(() => {
          if (data.profile.role === "admin") {
            navigate("/Admin");
          } else if (data.profile.role === "user") {
            navigate("/Home");
          } else {
            Swal.fire({
              icon: "error",
              title: "Role Tidak Dikenali",
              text: "Hubungi administrator untuk bantuan.",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "Terjadi kesalahan saat login.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-inter">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">
        {/* Bagian Kiri: Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-8">
          <img src={img} alt="Login Illustration" className="max-w-sm" />
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-12">
          <h3 className="text-2xl text-gray-500 mb-2">
            Selamat datang di NusaAira 👋
          </h3>
          <p className="text-lg font-bold text-gray-600 mb-6">
            Login sekarang dan pantau tambak lele kamu untuk hasil terbaik.
          </p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-black-600 text-lg">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email atau No Handphone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-black-600 text-lg">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                "Login"
              )}
            </button>
          </form>
          <br />
          <div className="flex justify-between items-center">
            <Link to="/LupaPass1" className="text-blue-500 hover:underline">
              Lupa Kata Sandi?
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <span className="border-b w-1/4"></span>
            <span className="text-sm text-gray-500 px-2">Atau</span>
            <span className="border-b w-1/4"></span>
          </div>

          {/* Tombol Login Sosial */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              aria-label="Login dengan Google"
              className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100 transition bg-white"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                alt="Google"
                className="w-5"
              />
            </button>

            <button
              aria-label="Login dengan Facebook"
              className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-100 transition bg-white"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5"
              />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Belum memiliki akun NusaAira?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
