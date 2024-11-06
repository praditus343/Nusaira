import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import imglogo from "../assets/Logo.png"; // Import logo image
import img from "../assets/img/login_singup/ls3.png"; // Import illustration image

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate an API request delay
    setTimeout(() => {
      // Redirect to LupaPass2 page after submission
      navigate("/LupaPass2");
    }, 1000); // Delay of 1 second
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
              <p className="text-gray-600 font-semibold">
                Jangan khawatir, kami akan mengirimkan petunjuk pengaturan ulang
                kepada Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Masukkan email Anda"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-150 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 mr-2 animate-spin"></span>
                ) : (
                  "Ganti Kata Sandi"
                )}
              </button>
            </form>

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
              <span className="h-2 w-6 bg-blue-500 rounded-full"></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
