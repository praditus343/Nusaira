// src/components/LoginPage.jsx
import React, { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Validasi sederhana
    if (!email || !password) {
      setError("Email dan Kata Sandi harus diisi.");
      return;
    }

    setLoading(true);

    // Simulasi proses login (contoh API call)
    setTimeout(() => {
      setLoading(false);
      alert("Login Berhasil! 🚀");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">

        {/* Bagian Kiri: Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-8">
          <img
            src="/src/assets/login.png"
            alt="Login Illustration"
            className="max-w-sm"
          />
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Selamat datang di NusaAira 👋
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Login sekarang dan pantau tambak lele kamu untuk hasil terbaik.
          </p>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700">
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
              <label htmlFor="password" className="block text-gray-700">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>

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
                "Login"
              )}
            </button>
          </form>

          {/* Garis Pemisah */}
          <div className="mt-6 flex items-center justify-center">
            <span className="border-b w-1/4"></span>
            <span className="text-sm text-gray-500 px-2">Atau</span>
            <span className="border-b w-1/4"></span>
          </div>

          {/* Tombol Login Sosial */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              aria-label="Login dengan Google"
              className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="w-5"
              />
            </button>

            <button
              aria-label="Login dengan Facebook"
              className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5"
              />
            </button>
          </div>

          {/* Link Registrasi */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Belum memiliki akun NusaAira?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
