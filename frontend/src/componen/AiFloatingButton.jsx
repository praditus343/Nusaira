import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgAi from "../assets/img/landing_page_sebelum_daftar/landingsb6.png"; 

const AIFloatingButton = () => {
  const [isTwitching, setIsTwitching] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsTwitching(true);

    setTimeout(() => {
      navigate('/ChatAi');
    }, 500); 
    setTimeout(() => setIsTwitching(false), 500);
  };

  return (
    <img 
      src={imgAi}
      alt="AI Assistant"
      onClick={handleClick}
      className={`fixed bottom-8 right-8 cursor-pointer z-[9999] animate-floating ${isTwitching ? 'animate-twitch' : ''}`}
      style={{
        width: '150px', 
        height: '150px', 
        filter: 'drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.3))', 
      }}
    />
  );
};

export default AIFloatingButton;
