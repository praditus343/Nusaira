import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import imgAi from "../assets/img/landing_page_sebelum_daftar/landingsb17.png";

const AIFloatingButton = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/AIChat'); 
  };

  return (
    <button 
      className="fixed bottom-8 right-8 bg-blue-100 hover:bg-blue-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-[9999] w-32 h-32 flex flex-col items-center justify-center overflow-hidden p-2" 
      style={{
        position: 'fixed',
        zIndex: 2147483647 
      }}
      aria-label="AI Assistant"
      onClick={handleClick} 
    >
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-20 h-20 flex items-center justify-center mb-1"> 
          <img 
            src={imgAi}
            alt="AI Assistant"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-full text-center truncate px-1">
          <span className="text-md font-medium text-blue-700 block truncate"> 
            ChtNusAI
          </span>
        </div>
      </div>
    </button>
  );
};

export default AIFloatingButton;
