import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Error404Page from '../componen/ErrorPage';

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
        <div >
          <Error404Page />
        </div>
        <button
          onClick={handleGoBack}
          className="text-blue-500 flex items-center mt-4"
        >
          <ChevronLeft size={20} className="mr-2" />
          Kembali ke Berita
        </button>
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
            <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
            <div>
              <img
                src={
                  article.image
                    ? (article.image.startsWith('http')
                      ? article.image
                      : `/${article.image}`)
                    : '/images/default-image.png'
                }
                alt={article.title}
                className={
                  article.image.startsWith('http')
                    ? 'w-full h-[900px] object-cover rounded-lg mb-6 mx-auto block'
                    : 'w-full h-auto rounded-lg mb-6 object-cover'
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default-image.png';
                }}
              /></div>
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
          <div className="prose w-full ">{article.content}</div>
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
