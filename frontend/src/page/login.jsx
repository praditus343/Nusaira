// src/components/LoginPage.jsx
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Bagian Kiri: Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
          <img
            src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/media/7e0f307f1c40d64fc61e5b82f9ce9f13.png"
            alt="Login Illustration"
            className="max-w-md"
          />
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Selamat datang di NusaAira 👋
          </h2>
          <p className="mt-2 text-gray-600">
            Login sekarang dan pantau tambak lele kamu untuk hasil terbaik
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="email atau No handphone"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700">Kata Sandi</label>
              <input
                type="password"
                placeholder="Kata Sandi"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
            >
              Login
            </button>
          </form>

          {/* Garis Pemisah */}
          <div className="mt-6 flex items-center justify-center">
            <span className="border-b w-1/3"></span>
            <span className="text-sm text-gray-500 px-2">Atau</span>
            <span className="border-b w-1/3"></span>
          </div>

          {/* Tombol Login Sosial */}
          <div className="mt-4 flex justify-center gap-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="w-5"
              />
              Google
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5"
              />
              Facebook
            </button>
          </div>

          {/* Link Registrasi */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Belum Memiliki akun NusaAira?{" "}
            <a href="#" className="text-blue-500">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
