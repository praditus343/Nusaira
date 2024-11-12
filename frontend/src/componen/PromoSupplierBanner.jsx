import React, { useEffect, useState } from 'react';

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`p-4 bg-blue-600 text-white text-center transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transition: 'opacity 1s' }}
    >
      {visible && (
        <p className="text-sm font-semibold">
          Tertarik menjadi supplier kami? Kirimkan pesan dengan subjek "Supplier" dan mari berkembang bersama!
        </p>
      )}
    </div>
  );
};

export default PromoBanner;
