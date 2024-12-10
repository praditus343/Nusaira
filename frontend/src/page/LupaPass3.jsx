import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imglogo from "../assets/Logo.png";
import img from "../assets/img/login_singup/ls3.png"; 

function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError(""); 

    setTimeout(() => {
      navigate("/signup3");
    }, 1000); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-inter">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-6">
          <img src={img} className="w-5/6 h-auto" alt="Illustration" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-start mb-8">
              <img src={imglogo} alt="Logo" className="w-12 h-12 mb-4" />
              <h4 className="text-gray-500 text-sm leading-relaxed mb-2">
                Lupa Kata Sandi?
              </h4>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Buat kata sandi baru
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Reset password Anda. Pastikan password baru berbeda dari yang
                lama.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="newPassword"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Kata Sandi Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Masukkan kata sandi baru"
                  aria-describedby="password-help"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="confirmPassword"
                >
                  Ulangi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Ulangi Kata Sandi Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Ulangi kata sandi baru"
                  aria-describedby="confirm-password-help"
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-150 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 mr-2 animate-spin"></span>
                ) : (
                  "Konfirmasi kata sandii"
                )}
              </button>
            </form>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline transition duration-150"
              >
                Kembali ke halaman login
              </Link>
            </div>

            {/* Pagination Indicator */}
            <div className="flex items-center justify-center mt-8 space-x-2 self-start">
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-6 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
