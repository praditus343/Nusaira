import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MapPin, ChevronDown } from 'lucide-react';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Footer from '../componen/Footer';
import Header from '../componen/Header';

const data = [
  { name: 'Des 2023', kg1: 45000, kg2: 50000, kg3: 65000, kg4: 70000, kg5: 75000, kg6: 80000, kg7: 85000 },
  { name: 'Jan 2024', kg1: 44000, kg2: 48000, kg3: 62000, kg4: 68000, kg5: 73000, kg6: 78000, kg7: 83000 },
  { name: 'Feb 2024', kg1: 45000, kg2: 51000, kg3: 64000, kg4: 69000, kg5: 74000, kg6: 79000, kg7: 84000 },
  { name: 'Mar 2024', kg1: 47000, kg2: 53000, kg3: 68000, kg4: 73000, kg5: 77000, kg6: 82000, kg7: 87000 },
  { name: 'Apr 2024', kg1: 48000, kg2: 55000, kg3: 72000, kg4: 76000, kg5: 80000, kg6: 85000, kg7: 90000 },
  { name: 'Mei 2024', kg1: 50000, kg2: 58000, kg3: 74000, kg4: 78000, kg5: 82000, kg6: 87000, kg7: 92000 },
  { name: 'Jun 2024', kg1: 51000, kg2: 60000, kg3: 75000, kg4: 79000, kg5: 83000, kg6: 88000, kg7: 93000 },
  { name: 'Jul 2024', kg1: 51000, kg2: 61000, kg3: 76000, kg4: 80000, kg5: 84000, kg6: 89000, kg7: 94000 },
  { name: 'Agt 2024', kg1: 50000, kg2: 60000, kg3: 75000, kg4: 79000, kg5: 83000, kg6: 88000, kg7: 93000 },
  { name: 'Sep 2024', kg1: 49000, kg2: 58000, kg3: 73000, kg4: 77000, kg5: 81000, kg6: 86000, kg7: 91000 },
  { name: 'Okt 2024', kg1: 50000, kg2: 57000, kg3: 71000, kg4: 75000, kg5: 79000, kg6: 84000, kg7: 89000 },
  { name: 'Nov 2024', kg1: 51000, kg2: 58000, kg3: 70000, kg4: 74000, kg5: 78000, kg6: 83000, kg7: 88000 }
];


const priceData = [
  { location: 'Boyolali', province: 'Jawa Tengah', price: 'Rp.25.000', change: '+1.000' },
  { location: 'Bandung', province: 'Jawa Barat', price: 'Rp.25.000', change: '+1.000' },
  { location: 'Bekasi', province: 'Jawa Barat', price: 'Rp.25.000', change: '-1.000' },
  { location: 'Boyolali', province: 'Jawa Tengah', price: 'Rp.25.000', change: '+1.000' },
  { location: 'Bandung', province: 'Jawa Barat', price: 'Rp.25.000', change: '-1.000' }
];

const locations = ['Jawa Tengah', 'Jawa Barat', 'Jawa Timur', 'DKI Jakarta'];

const PriceTrendingDashboard = () => {
  const [isPredictionEnabled, setIsPredictionEnabled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Jawa Tengah');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  return (
    <div className='bg-white w-full min-h-screen'>
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-6">
          {/* Left side with location */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-1">Boyolali</h2>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">Boyolali, Jawa Tengah</span>
            </div>
          </div>

          {/* Right side with location selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Pilih Lokasi :</span>
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-blue-500 text-blue-500 rounded-lg"
              >
                <span>{selectedLocation}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['Jawa Tengah', 'Jawa Barat', 'Jawa Timur', 'DKI Jakarta'].map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Toggle Row */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg">
            <span>Filter</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Prediksi</span>
            <button
              onClick={() => setIsPredictionEnabled(!isPredictionEnabled)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${isPredictionEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${isPredictionEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        </div>

        {isPredictionEnabled && (
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">⚠️</span>
              <p className="text-sm text-gray-600">
                Hasil prediksi merupakan hasil analisa berdasarkan data yang telah tersimpan di data. Prediksi hanya sebatas ini karena prediksi sistem dalam menggunakan prediksi harga terbaru.
              </p>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg p-4 mb-6 w-[1150px] h-[500px]">
          <LineChart width={1100} height={450} data={data} className='mt-4'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              className="mt-5"
              align="center"
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => `${value}kg`}
            />
            <Line
              type="monotone"
              dataKey="kg1"
              stroke="#3B82F6"
              dot={false}
              name="1"
            />
            <Line
              type="monotone"
              dataKey="kg2"
              stroke="#10B981"
              dot={false}
              name="2"
            />
            <Line
              type="monotone"
              dataKey="kg3"
              stroke="#EAB308"
              dot={false}
              name="3"
            />
            <Line
              type="monotone"
              dataKey="kg4"
              stroke="#EF4444"
              dot={false}
              name="4"
            />
            <Line
              type="monotone"
              dataKey="kg5"
              stroke="#A3E635"
              dot={false}
              name="5"
            />
            <Line
              type="monotone"
              dataKey="kg6"
              stroke="#0EA5E9"
              dot={false}
              name="6"
            />
            <Line
              type="monotone"
              dataKey="kg7"
              stroke="#A855F7"
              dot={false}
              name="7"
            />
            {isPredictionEnabled && (
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="#D1D5DB"
                strokeDasharray="5 5"
                dot={false}
                name="Prediction"
              />
            )}
          </LineChart>
        </div>
        <h3 className="text-lg font-medium mb-4 mt-4 ml-4">Harga Lainnya</h3>
        <div className='border border-blue-600 rounded-lg mb-20'>
          <div className="divide-y divide-blue-300">
            {priceData.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 bg-white shadow-sm 
          ${index === 0 ? 'rounded-t-lg' : ''} 
          ${index === priceData.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                <div>
                  <p className="font-medium">{item.location}</p>
                  <p className="text-sm text-gray-500">{item.province}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.price}</p>
                  <p className={`text-sm ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function PriceTrending() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <PriceTrendingDashboard />
        <AIFloatingButton />
        <Footer />
      </div>
    </div>
  );
}

export default PriceTrending;