import React from 'react';

const FinalStepUI = ({ jumlahKolam }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        <h2 className="text-xl font-semibold mb-16 mt-8">Langkah Terakhir</h2>
        {/* Ilustrasi */}
        <div className="mb-16 relative">
          <div className="w-40 h-40 bg-[#E8F5E9] rounded-full flex items-center justify-center">
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9"
                  className="text-teal-400"
                />
                <path
                  fill="white"
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4 mb-16">
          <p className="font-medium">Anda Telah membuat Tambak</p>
          <p className="text-lg font-semibold text-gray-800">Silakan isi data tambak Anda dengan mengakses Fitur Daftar Kolam</p>
          <p className="text-sm text-gray-600">Yang Memiliki {jumlahKolam} Kolam</p>
        </div>
        <div className="flex gap-4 w-full max-w-md px-4">
          <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            Kembali
          </button>
          <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalStepUI;
