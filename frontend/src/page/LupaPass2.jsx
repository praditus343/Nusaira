import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/login_singup/ls3.png";
import imglogo from "../assets/Logo.png"; 

const PasswordReset = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [resendTimeout, setResendTimeout] = useState(30);
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);

  const correctVerificationCode = "1111";

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);  
    }
  }, []);

  const handleVerificationInput = useCallback(
    (e, idx) => {
      const value = e.target.value.replace(/[^0-9]/g, ""); 

      if (value.length <= 1) {
        const updatedCode = [...verificationCode];
        updatedCode[idx] = value;
        setVerificationCode(updatedCode);

        if (value && idx < inputRefs.current.length - 1) {
          inputRefs.current[idx + 1].focus();
        } else if (!value && idx > 0) {
          inputRefs.current[idx - 1].focus();
        }

        if (
          updatedCode.every((code) => code !== "") &&
          updatedCode.join("").length === 4
        ) {
          handleVerification(updatedCode.join(""));
        }
      }
    },
    [verificationCode]
  );

  const handleVerification = useCallback(
    (code) => {
      setError("");
      if (code === correctVerificationCode) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/lupapass3");
        }, 1500);
      } else {
        setError("Kode verifikasi salah.");
      }
    },
    [navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    handleVerification(code);
  };

  const handleResendCode = () => {
    setResendTimeout(30);
    setVerificationCode(["", "", "", ""]);
    setError("");
    inputRefs.current[0].focus();
    alert("Kode verifikasi telah dikirim ulang!");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 4);

    if (pastedData) {
      const newVerificationCode = [...verificationCode];
      for (let i = 0; i < pastedData.length; i++) {
        newVerificationCode[i] = pastedData[i];
      }
      setVerificationCode(newVerificationCode);

      const nextEmptyIndex = newVerificationCode.findIndex(
        (code) => code === ""
      );
      const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
      inputRefs.current[focusIndex].focus();

      if (pastedData.length === 4) {
        handleVerification(pastedData);
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();

    if (resendTimeout > 0) {
      const countdown = setInterval(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [resendTimeout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-inter">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-white">
        {/* Left Side: Illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-8">
          <img
            src={img} 
            alt="Signup Illustration"
            className="max-w-sm"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="w-full flex py-6">
            <img
              src={imglogo} 
              alt="Logo"
              className="h-12"
            />
          </div>
          <h4 className="text-gray-500 text-sm leading-relaxed mb-2">
            Lupa Kata Sandi?
          </h4>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            pengaturan ulang kata sandi
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Kami mengirimkan kode verifikasi ke{" "}
            <span className="text-blue-500">{email}</span>
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {verificationCode.map((code, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={code}
                  className="w-14 h-14 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-xl font-semibold"
                  ref={(el) => (inputRefs.current[idx] = el)}
                  onChange={(e) => handleVerificationInput(e, idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code && idx > 0) {
                      inputRefs.current[idx - 1].focus();
                    }
                  }}
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.join("").length !== 4}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 
                ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : verificationCode.join("").length === 4
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memverifikasi...
                </div>
              ) : (
                "Konfirmasi"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {resendTimeout > 0 ? (
              <p className="text-sm text-gray-500">
                Kirim ulang kode dalam {resendTimeout} detik
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                Kirim Ulang Kode Verifikasi
              </button>
            )}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-6 bg-blue-500 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
