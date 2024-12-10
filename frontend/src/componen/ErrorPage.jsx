import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error404Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
        <h1 className="text-6xl font-bold mb-4 text-gray-800">500</h1>
        <p className="text-xl text-gray-600">Terjadi Kesalahan</p>
      </div>
    </div>
  );
};

export default Error404Page;