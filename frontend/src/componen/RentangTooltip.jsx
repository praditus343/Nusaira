import { useState } from 'react';

const RentangRasioTooltip = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center space-x-2">
      <span
        className="w-[120px] ml-4 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Rentang Rasio:
      </span>
      
      {isHovered && (
        <span
          className="absolute bottom-full left-0 bg-blue-500 text-white text-sm p-2 rounded-md mt-2"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            left: '4px',  
            transform: 'translateX(4px)' 
          }}
        >
          SR, FCR, Size
        </span>
      )}
    </div>
  );
};

export default RentangRasioTooltip;
