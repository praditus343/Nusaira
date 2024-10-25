import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';

const FishDiseaseDashboard = () => {
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const diseases = [
        {
            id: 1,
            title: 'Penyakit Bintik Putih Pada Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 2,
            title: 'Penyakit Jamur Air',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 3,
            title: 'Penyakit Kulit Mengelupas',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 4,
            title: 'Hama Dan Penyakit Pada Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 5,
            title: 'Tantangan Iklim Dalam Pembibitan',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 6,
            title: 'Penyakit Aeromonas Pada Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 7,
            title: 'Pencegahan Penyakit Bakterial',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 8,
            title: 'Manajemen Kualitas Air',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 9,
            title: 'Optimasi Pakan Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 10,
            title: 'Sistem Sirkulasi Air Modern',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 11,
            title: 'Penanganan Stress Pada Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 12,
            title: 'Vaksinasi Untuk Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 13,
            title: 'Pemeliharaan Kolam Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 14,
            title: 'Teknik Pemberian Pakan',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 15,
            title: 'Monitoring Kesehatan Lele',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 16,
            title: 'Pengendalian Parasit',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 17,
            title: 'Manajemen Biomassa',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 18,
            title: 'Sanitasi Kolam',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 19,
            title: 'Teknologi Bioflok',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        },
        {
            id: 20,
            title: 'Penanggulangan Wabah',
            date: '10 Oktober 2024',
            image: '/api/placeholder/400/300'
        }
    ];

    
    const filteredDiseases = diseases.filter(disease =>
        disease.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white w-full min-h-screen ">
            {/* Header */}
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Budidaya</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/indonesian-flag.png"
                                    alt="Bendera Indonesia"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <img
                                    src="path/to/profile-photo.png"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300 w-full" />
            </header>

            {/* Header Section */}
            <div className="mb-8 mr-14 ml-14 mt-5">
                <h1 className="text-2xl font-bold mb-2">
                    Mengenal Penyakit dan Tantangan dalam Budidaya Lele
                </h1>
                <p className="text-gray-600">
                    Pelajari Cara Mengatasi Penyakit dan Tantangan Budidaya Lele <br />dengan Solusi Tepat!
                    Dapatkan Tips Praktis untuk Meningkatkan<br /> Kualitas dan Produktivitas Tambak Anda
                </p>
            </div>

            {/* Search Bar Container */}
            <div className="w-[800px] relative mb-10 mr-14 ml-14 flex items-center border border-blue-600 rounded-2xl bg-white">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 border-blue-600 rounded-l-2xl border-r-0 focus:outline-none ml-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="w-4 h-5 absolute left-3 top-3 text-blue-600 font-bold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <button
                    onClick={() => setIsGridLayout(!isGridLayout)}
                    className="px-10 py-2.5 bg-blue-500 text-white rounded-r-2xl border-blue-600 border-l-0 hover:bg-blue-600 transition-colors duration-200"
                >
                    {isGridLayout ? <List size={30} /> : <Grid size={30} />}
                </button>
            </div>

            {/* Main Content Container */}
            <div className="border border-blue-600 rounded-lg bg-white p-2 mr-8 ml-8 p-6 h-[800px] overflow-y-auto">
                <div className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto' : 'flex flex-col gap-4'}`}>
                    {filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease) => (
                            <div
                                key={disease.id}
                                className={`bg-white rounded-lg border border-gray-300 overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg
                                ${isGridLayout ? 'flex flex-col' : 'flex flex-row'}`}
                            >
                                <div className={`${isGridLayout ? 'w-full' : 'w-48'} relative`}>
                                    <img
                                        src={disease.image}
                                        alt={disease.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className={`p-4 ${isGridLayout ? '' : 'flex-1'}`}>
                                    <p className="text-sm text-gray-500 mb-2">{disease.date}</p>
                                    <h3 className="font-semibold text-lg">{disease.title}</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Tidak ada hasil yang ditemukan.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

function PenyakitLele() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <FishDiseaseDashboard />
                <AIFloatingButton/>
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default PenyakitLele;
