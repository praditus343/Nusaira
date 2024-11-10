import React, { useState } from 'react';
import FishTable from './FishTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



const ActivePondsDashboard = () => {
    const initialPonds = [
        { kolam: 'Kolam 1' },
        { kolam: 'Kolam 2' },
        // Add more pond objects here
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [ponds, setPonds] = useState(initialPonds);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredPonds = initialPonds.filter((pond) =>
            pond.kolam.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setPonds(filteredPonds);
    };

    const handleAddNewPond = () => {
        window.location.href = '/InputTambak';
    };

    return (
        <div className="bg-white rounded-lg shadow-md  ml-6 mr-16 border-2 mb-10 border-gray-300 mt-10">
            <div className="mb-4 flex justify-between items-center ml-6 mr-6 mt-6">
                <h2 className="text-lg font-medium text-gray-500">Daftar Kolam Aktif</h2>
                <div className="flex items-center mb-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari Kolam"
                            className="pl-8 pr-4 py-2 border rounded-lg block w-full sm:text-lg border border-blue-600 placeholder-blue-600 text-blue-600 z-30"
                            autoFocus={false}
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
            <hr className="w-full border-gray-300 border" style={{ position: "relative", left: "50%", transform: "translateX(-50%)" }} />
            <div className='mr-6 ml-6'>
                
            <FishTable ponds={ponds} />
            </div>
            <div className="flex justify-between items-center mt-6 ml-6 mr-6 mb-6">
                <button className="text-blue-500 font-medium text-lg hover:" onClick={handleAddNewPond}>
                    Tambah Kolam Baru
                </button>
            </div>
        </div>
    );
};

export default ActivePondsDashboard;
