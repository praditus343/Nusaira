import React from 'react';
import { X } from 'lucide-react';


const MetricModal = ({ metric, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 w-full" style={{ marginLeft: 0 }}>
    <div className="bg-white rounded-lg shadow-lg w-[80vw] max-w-3xl ">
    <div>
      <div className="flex justify-between items-center mb-4 mr-6 ml-6 mt-6">
        <h2 className="font-medium text-gray-700">{metric.label}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
          <X />
        </button>
      </div>
      <hr className="w-full border-gray-300 border" style={{ position: "relative", left: "50%", transform: "translateX(-50%)" }} />
    </div>
      <div className="flex items-center mb-4 ml-6 mr-6 mt-4">
        <div className={`p-3 rounded-full ${metric.color} bg-opacity-10 mr-4`}>
          <i className={`${metric.icon} ${metric.color} text-3xl`}></i>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-2xl font-bold text-gray-700">Total 0 Kg</span>
            <p className="text-gray-500 text-sm">kg dari 1 kolam</p>
          </div>
          <span className="ml-4 bg-green-100 text-green-500 px-3 py-1 rounded-full mb-10 mt-2">+ 0Kg</span>
        </div>
      </div>
      <p className="text-center text-red-500 text-sm mb-4">
        Lengkapi data pakan pada AI untuk meningkatkan akurasi estimasi.
      </p>
      <div className="mt-4 text-sm ml-6 mr-6 mb-10">
        <div className="grid grid-cols-5 gap-2 font-semibold"
          style={{ gridTemplateColumns: `repeat(${metric.tableHeaders.length}, 1fr)` }}
        >
          {metric.tableHeaders.map((header, index) => (
            <div key={index} className="bg-blue-500 text-white text-center p-2">
              {header}
            </div>
          ))}
        </div>
        {metric.tableRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2"
            style={{ gridTemplateColumns: `repeat(${metric.tableHeaders.length}, 1fr)` }}
          >
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="bg-gray-100 text-gray-700 text-center p-2 border border-gray-300">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MetricModal;
