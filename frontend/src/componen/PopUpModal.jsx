import React from 'react';
import { X } from 'lucide-react';
import imgLogo from "../assets/Logo.png";

const PopupModal = ({ title, description, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={onClose} 
      />
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative z-10 shadow-md h-[400px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={30} />
        </button>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <img
              src={imgLogo}
              alt="Icon description"
              className="w-32 h-32"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-5"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
