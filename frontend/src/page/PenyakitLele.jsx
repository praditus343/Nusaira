import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const randomDate = () => {
    const start = new Date(2024, 9, 1);
    const end = new Date(2024, 9, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString();
};

const diseasesTitles = [
    'Penyakit Bintik Putih Pada Lele',
    'Penyakit Jamur Air',
    'Penyakit Kulit Mengelupas',
    'Hama Dan Penyakit Pada Lele',
    'Tantangan Iklim Dalam Pembibitan',
    'Penyakit Aeromonas Pada Lele',
    'Meminimalisir penyakit pada lele',
    'Penyebab lele Kembung',
    'Penyebab lele mengambang',
];

import pyl1 from '../assets/img/penyakit_lele/pyl1.png';
import pyl2 from '../assets/img/penyakit_lele/pyl2.png';
import pyl3 from '../assets/img/penyakit_lele/pyl3.png';
import pyl4 from '../assets/img/penyakit_lele/pyl4.png';
import pyl5 from '../assets/img/penyakit_lele/pyl5.png';
import pyl6 from '../assets/img/penyakit_lele/pyl6.png';
import pyl7 from '../assets/img/penyakit_lele/pyl7.png';
import pyl8 from '../assets/img/penyakit_lele/pyl8.png';
import pyl9 from '../assets/img/penyakit_lele/pyl9.png';

const FishDiseaseDashboard = () => {
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [diseases, setDiseases] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const diseaseData = [
            { id: 1, title: diseasesTitles[0], date: randomDate(), image: pyl1 },
            { id: 2, title: diseasesTitles[1], date: randomDate(), image: pyl2 },
            { id: 3, title: diseasesTitles[2], date: randomDate(), image: pyl3 },
            { id: 4, title: diseasesTitles[3], date: randomDate(), image: pyl4 },
            { id: 5, title: diseasesTitles[4], date: randomDate(), image: pyl5 },
            { id: 6, title: diseasesTitles[5], date: randomDate(), image: pyl6 },
            { id: 7, title: diseasesTitles[6], date: randomDate(), image: pyl7 },
            { id: 8, title: diseasesTitles[7], date: randomDate(), image: pyl8 },
            { id: 9, title: diseasesTitles[8], date: randomDate(), image: pyl9 },
        ];
        setDiseases(diseaseData);
    }, []);

    const filteredDiseases = diseases.filter(disease =>
        disease.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle redirection when a disease item is clicked
    const handleDiseaseClick = (id) => {
        navigate(`/artikel/${id}`);
    };

    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="mb-8 mr-14 ml-14 mt-5">
                <h1 className="text-2xl font-bold mb-2">
                    Mengenal Penyakit dan Tantangan dalam Budidaya Lele
                </h1>
                <p className="text-gray-600">
                    Pelajari Cara Mengatasi Penyakit dan Tantangan Budidaya Lele <br />
                    dengan Solusi Tepat! Dapatkan Tips Praktis untuk Meningkatkan<br /> 
                    Kualitas dan Produktivitas Tambak Anda
                </p>
            </div>

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

            <div className="border border-blue-600 rounded-lg bg-white p-2 mr-8 ml-14 p-6 h-[800px] overflow-y-auto">
                <div className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto' : 'flex flex-col gap-4'}`}>
                    {filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease) => (
                            <div
                                key={disease.id}
                                className={`bg-white rounded-lg border border-gray-300 overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg
                                ${isGridLayout ? 'flex flex-col' : 'flex flex-row'}`}
                                onClick={() => handleDiseaseClick(disease.id)} // Attach click handler
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
                <AIFloatingButton />
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default PenyakitLele;
