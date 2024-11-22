import React, { useState, useEffect } from 'react';
import FishTable from './FishTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ActivePondsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddNewPond = () => {
    window.location.href = '/InputTambak';
  };

  useEffect(() => {
    console.log("Search Term di ActivePondsDashboard:", searchTerm);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-md ml-6 mr-16 border-2 mb-10 border-gray-300 mt-10">
      <div className="mb-4 flex justify-between items-center ml-6 mr-6 mt-6 mb-10">
        <h2 className="text-lg font-medium text-gray-500">Daftar Kolam Aktif</h2>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari Kolam"
              className="pl-8 pr-4 py-2 border rounded-lg block w-full sm:text-lg border border-blue-600 placeholder-blue-600 text-blue-600 z-30"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="w-4 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600"
            />
          </div>
          <h4 className="text-lg font-medium ml-4 text-gray-500">Data Budidaya</h4>
        </div>
      </div>
      <hr className="w-full border-gray-300 border" />
      <div className="mr-6 ml-6 mt-10">
        <FishTable filterTerm={searchTerm} />
      </div>
      <div className="flex justify-between items-center mt-6 ml-6 mr-6 mb-6">
        <button
          className="text-blue-500 font-medium text-lg hover:underline"
          onClick={handleAddNewPond}
        >
          Tambah Kolam Baru
        </button>
      </div>
    </div>
  );
};

export default ActivePondsDashboard;
