import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/login_singup/ls4.png"; 
import imglogo from "../assets/Logo.png";

const SignUpCompletePage = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate("/Home"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-inter">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">
        {/* Left Side: Celebration Illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center p-8">
          <img
            src={img} 
            alt="Celebration Illustration"
            className="max-w-sm"
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-start justify-center">
          <img
            src={imglogo} 
            alt="App Logo"
            className="h-12 mb-4"
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 self-start">
            Selesai
          </h2>
          <p className="text-gray-600 mb-8 self-start">
            Manfaatkan semua fasilitas NusAira dan mulai kelola tambakmu lebih
            cerdas sekarang!
          </p>

          <button
            onClick={handleStartNow}
            className="w-full md:w-auto px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 self-start"
          >
            Mulai Sekarang
          </button>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center mt-8 space-x-2 self-start">
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-6 bg-blue-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCompletePage;
