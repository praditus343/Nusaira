import React from 'react';

const AIFloatingButton = ({ imagePath = '/path/to/your/robot-image.png' }) => {
  return (
    <button 
      className="fixed bottom-8 right-8 bg-blue-100 hover:bg-blue-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-[9999] w-24 h-24 flex flex-col items-center justify-center overflow-hidden p-2"
      style={{
        position: 'fixed',
        zIndex: 2147483647 
      }}
      aria-label="AI Assistant"
    >
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-14 h-14 flex items-center justify-center mb-1">
          <img 
            src={imagePath}
            alt="AI Assistant"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-full text-center truncate px-1">
          <span className="text-sm font-medium text-blue-700 block truncate">
            ChtNusAI
          </span>
        </div>
      </div>
    </button>
  );
};

export default AIFloatingButton;