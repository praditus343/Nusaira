import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from '../componen/Header';

const FishDiseaseDashboard = () => {
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await fetch('https://nusaira-be.vercel.app/api/penyakit-lele');
                const { success, message, data } = await response.json();
                if (success && Array.isArray(data)) {
                    setDiseases(data);
                } else {
                    throw new Error(message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiseases();
    }, []);

    const filteredDiseases = diseases.filter((disease) =>
        disease.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDiseaseClick = (id) => {
        navigate(`/artikel/${id}`);
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }



    return (
        <div className="bg-white w-full min-h-screen">
            <Header />
            <div className="mb-8 mr-14 ml-14 mt-5">
                <h1 className="text-2xl font-bold mb-2">Mengenal Penyakit dan Tantangan dalam Budidaya Lele</h1>
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
                                className={`bg-white rounded-lg border border-gray-300 overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg ${isGridLayout ? 'flex flex-col' : 'flex flex-row'}`}
                                onClick={() => handleDiseaseClick(disease.id)}
                            >
                                <div className={`${isGridLayout ? 'w-full' : 'w-48'} relative`}>
                                    <img
                                        src={`/${disease.image}`}
                                        alt={disease.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className={`p-4 ${isGridLayout ? '' : 'flex-1'}`}>
                                    <p className="text-sm text-gray-500 mb-2">{new Date(disease.date).toLocaleDateString()}</p>
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

const PenyakitLele = () => (
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

export default PenyakitLele;