import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";

const KabarLeleArticleLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/berita/${id}`);

        if (!response.ok) {
          throw new Error('Artikel tidak ditemukan');
        }

        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Ups! Terjadi Kesalahan</h2>
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={handleGoBack}
            className="text-blue-500 flex items-center mt-4"
          >
            <ChevronLeft size={20} className="mr-2" />
            Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ml-8 mr-8">
      <button
        onClick={handleGoBack}
        className="flex items-center text-blue-500 mb-4 text-lg mb-10"
      >
        <ChevronLeft size={24} className="mr-2" />
        Kembali ke Blog
      </button>

      {article && (
        <div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4 ml-72">{article.title}</h1>
            <img
              src={`/${article.image}`}
              alt={article.title}
              className="max-w-[90%] h-auto rounded-lg mb-6"
            />
          </div>

          <div className="flex items-center mb-4 text-gray-600">
            <img
              src={`/${article.image_writer}`}
              alt="Penulis"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{article.writer}</p>
              <p className="text-sm">{new Date(article.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</p>
            </div>
          </div>
          <div className="prose max-w-[90%] ">{article.content}</div>
        </div>
      )}
    </div>
  );
};



function KabarLeleArticle() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto h-full">
        <KabarLeleArticleLayout />
        <AIFloatingButton />
        <div className='mt-20'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default KabarLeleArticle;
