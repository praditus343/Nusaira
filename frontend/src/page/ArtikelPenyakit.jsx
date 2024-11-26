import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Share2 } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from '../componen/Header';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AIFloatingButton';
import Footer from '../componen/Footer';



const ArticleDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                console.log(`Fetching article with ID: ${id}`);
                const response = await axios.get(`https://nusaira-be.vercel.app/api/penyakit-lele/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response:', response.data);

                if (response.data) {
                    setArticle(response.data.data);
                    console.log('Article data:', response.data);
                    console.log('Indikasi:', response.data.indikasi);
                } else {
                    setError('Artikel tidak ditemukan');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError(err.response?.data?.message || 'Artikel tidak ditemukan');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

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
      
      if (!article) {
        return <div>Artikel tidak ditemukan</div>;
      }
      

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://nusaira-be.vercel.app/api/penyakit-lele?search=${searchTerm}`);
            if (response.data.length > 0) {
                navigate(`/artikel/${response.data[0].id}`);
            } else {
                Swal.fire({
                    title: 'Artikel Tidak Ditemukan',
                    text: 'Tidak ada artikel yang sesuai dengan pencarian Anda.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Terjadi kesalahan saat mencari artikel',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                Swal.fire({
                    title: 'Link Disalin!',
                    text: 'Link halaman telah disalin ke clipboard.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            })
            .catch(err => {
                console.error('Gagal menyalin link:', err);
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Tidak dapat menyalin link.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const processItems = (text) => {
        if (!text) return [];
        return text.split('.').map(item => item.trim()).filter(item => item).map(item => item + '.');
      };
      

    const indikasiItems = processItems(article.indikasi);
    const penyebabItems = processItems(article.penyebab);
    const penangananItems = processItems(article.penanganan);
    const pencegahanItems = processItems(article.pencegahan);
    const gejalaTambahanItems = processItems(article.gejalaTambahan);
    const referensiItems = JSON.parse(article.referensi || '[]');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    

    return (
        <div className='bg-white w-full min-h-screen'>
            <Header />
            <div className="bg-white ml-5 mr-5">
                {/* Search Section */}
                <div className="flex items-center justify-between mb-8 mt-5 mr-8 ml-8">
                    <div className="flex flex-grow">
                        <input
                            type="text"
                            placeholder="Cari Artikel"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-blue-600 px-4 py-2 rounded-l-xl focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 h-[42px] bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition flex items-center justify-center"
                        >
                            <Search className="h-5 w-5 mr-2" />
                        </button>
                    </div>
                    <button onClick={handleShare} className="p-2 text-blue-500 hover:bg-blue-600 transition bg-blue-300 rounded-full">
                        <Share2 className="h-6 w-6" />
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                    <div className="flex items-center justify-center text-gray-500">
                        <img src={Logo} alt="Nusaira Logo" className="h-8 mr-2" />
                        <span className="font-semibold">Nusaira</span>
                        <span className="mx-2">|</span>
                        <span>{formatDate(article.date)}</span>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mb-6 ml-8 mr-8">
                    <img
                        src={`/${article.image}`}
                        alt={article.title}
                        className="w-full h-[700px] rounded-xl shadow-lg mb-4"
                    />
                </div>

                {/* Dropdown Filter Section */}
                <div className="mb-6 flex justify-start relative ml-8">
                    <div className="relative inline-block">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="border border-blue-600 px-4 py-2 rounded-lg appearance-none pr-8"
                        >
                            <option value="all">Semua</option>
                            <option value="indikasi">Indikasi</option>
                            <option value="penyebab">Penyebab</option>
                            <option value="penanganan">Penanganan</option>
                            <option value="pencegahan">Pencegahan</option>
                            <option value="gejalaTambahan">Gejala Tambahan</option>
                        </select>
                        <span className="absolute right-3 top-2">
                            <FontAwesomeIcon icon={faChevronDown} className="text-blue-600" />
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 border border-blue-600 rounded-lg ml-8 mr-8">
                    {filter === 'indikasi' && (
                        <>
                            <h2 className="font-semibold mb-2">Indikasi</h2>
                            {article.indikasi ? (
                                <p>{article.indikasi}</p>
                            ) : (
                                <p>No indikasi data available.</p>
                            )}
                        </>
                    )}
                    {filter === 'penyebab' && (
                        <>
                            <h2 className="font-semibold mb-2">Penyebab</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {penyebabItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {filter === 'penanganan' && (
                        <>
                            <h2 className="font-semibold mb-2">Penanganan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {penangananItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {filter === 'pencegahan' && (
                        <>
                            <h2 className="font-semibold mb-2">Pencegahan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {pencegahanItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {filter === 'gejalaTambahan' && (
                        <>
                            <h2 className="font-semibold mb-2">Gejala Tambahan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {gejalaTambahanItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {filter === 'all' && (
                        <>
                            <h2 className="font-semibold mb-2">Indikasi</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {indikasiItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                            <h2 className="font-semibold mb-2">Penyebab</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {penyebabItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                            <h2 className="font-semibold mb-2">Penanganan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {penangananItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                            <h2 className="font-semibold mb-2">Pencegahan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {pencegahanItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>

                            <h2 className="font-semibold mb-2">Gejala Tambahan</h2>
                            <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                                {gejalaTambahanItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <h2 className="font-semibold mb-2">Referensi</h2>
                    <ul className="list-disc pl-5 text-lg text-gray-800">
                        {referensiItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};





function ArticlePage() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <ArticleDashboard />
                <AIFloatingButton />
                <div className='mt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ArticlePage;
