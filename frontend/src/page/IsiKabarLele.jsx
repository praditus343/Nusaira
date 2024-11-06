import React from "react";
import { ChevronLeft } from "lucide-react";
import Header from "../componen/Header";
import { useParams, useNavigate } from "react-router-dom";
import AllPosts from "../componen/PostData";
import profileImg from "../assets/img/assets_foto/f2.png";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";

const KabarLeleArticleLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = AllPosts.find((post) => post.id === parseInt(id));

  if (!article) {
    return (
      <div className="bg-white w-full h-full flex flex-col items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-min-screen">
      <Header />
      <div className="flex flex-col items-start px-4 py-6 ml-8 mr-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 mb-4 text-xl"
        >
          <ChevronLeft className="w-10 h-10 font-semibold" />
          Kembali ke Blog
        </button>
        <article className="w-full">
          <h1 className="font-bold text-gray-800 mb-8 text-center mt-4">{article.title}</h1>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto mb-12 rounded-xl" 
          />
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <img
              src={profileImg} 
              alt="Author"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Admin</span>
            <span className="ml-4">{article.date}</span>
          </div>
          <section className="text-gray-700 text-lg leading-relaxed">
            {article.content}
          </section>
        </article>
      </div>
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
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default KabarLeleArticle;
