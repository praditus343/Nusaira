import React from "react";
import { ChevronLeft } from "lucide-react";
import Sidebar from "../componen/SideBar";
import Footer from "../componen/Footer";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../assets/img/kabar_lele/kbl1.png";

// Sample articles data
const articles = [
  {
    id: 1,
    title: "Seluk Beluk Usaha Budidaya Ikan Lele",
    date: "15 Oktober 2024",
    image: img1,
    content:
      "Usaha budidaya ikan lele merupakan salah satu usaha yang menjanjikan di bidang perikanan. Dalam artikel ini, kita akan membahas seluk beluk memulai usaha budidaya lele, dari persiapan kolam, pemilihan bibit berkualitas, hingga perawatan dan panen. Melalui teknik yang tepat, Anda dapat mengoptimalkan hasil panen dan meningkatkan keuntungan.",
  },
  // Add more articles here if needed
];

const KabarLeleArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the article based on the id from URL
  const article = articles.find((article) => article.id === parseInt(id));

  // If the article is not found, display a fallback message
  if (!article) {
    return (
      <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-700 mb-4">
            Maaf, artikel yang Anda cari tidak ditemukan.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Kembali ke Berita
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <div className="flex mt-5">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-500 mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Berita
            </button>

            {/* Article content */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-700 text-lg">{article.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIFloatingButton />
      <Footer />
    </div>
  );
};

export default KabarLeleArticle;
