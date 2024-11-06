import React, { useState, useEffect } from "react";
import { ChevronRight, Search, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AllPosts from "../componen/AllPost";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";

const LeftCard = ({ post, isVisible }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/kabar-lele/${post.id}`, { state: { post } });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-300 ${isVisible ? "opacity-100" : "opacity-20"}`}
    >
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{post.date}</div>
        <h3 className="font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
        <button className="text-blue-500 text-sm flex items-center" onClick={handleReadMore}>
          Lanjutkan Membaca
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

const RightCard = ({ post, highlight }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/kabar-lele/${post.id}`, { state: { post } });
  };

  return (
    <div
      className={`flex bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-300 ${
        highlight ? "border-blue-600 bg-blue-50" : "opacity-50"
      }`}
    >
      <div className="flex-1 p-4">
        <div className="text-sm text-gray-500 mb-2">{post.date}</div>
        <h3 className="font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.excerpt}</p>
        <button className="text-blue-500 text-sm flex items-center mt-2" onClick={handleReadMore}>
          Lanjutkan Membaca
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <img src={post.image} alt={post.title} className="w-48 h-48 object-cover" />
    </div>
  );
};

const KabarLeleLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [randomLeftPosts, setRandomLeftPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const shuffled = [...AllPosts].sort(() => 0.5 - Math.random());
    setRandomLeftPosts(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const sortedPosts = AllPosts.sort((a, b) => {
      const aMatch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
      const bMatch = b.title.toLowerCase().includes(searchTerm.toLowerCase());
      return bMatch - aMatch; 
    });

    setFilteredPosts(sortedPosts);
  }, [searchTerm]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <div className="bg-white w-full min-h-screen">
          <Header />
          <div className="mt-5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  Lele Nusantara Update Informasi dan <br /> Teknologi
                </h1>
              </div>
              <div className="mt-1">
                <p className="text-gray-600">
                  Jadikan budidaya lele lebih efektif dengan tips terbaru, pembaruan
                  teknologi, dan solusi <br /> praktis dari Nusaira. Temukan kabar
                  terkini seputar dunia lele di sini.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-10 ml-10 mr-10">
            <div className="mb-8 flex justify-start">
              <div className="w-[800px] relative flex items-center border border-blue-600 rounded-2xl bg-white">
                <div className="relative flex-1">
                  <Search className="w-4 h-5 absolute left-7 top-3 text-blue-600" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pl-14 rounded-l-2xl focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-10 py-2.5 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 transition-colors duration-200">
                  <ListFilter size={24} />
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="w-1/3">
                <h2 className="text-xl font-bold mb-4">Popular Berita</h2>
                <div className="space-y-4">
                  {randomLeftPosts.map((post) => (
                    <LeftCard
                      key={post.id}
                      post={post}
                      isVisible={post.title.toLowerCase().includes(searchTerm.toLowerCase())}
                    />
                  ))}
                </div>
              </div>
              <div className="w-2/3">
                <h2 className="text-xl font-bold mb-4">Semua Berita</h2>
                <div className="space-y-4 overflow-y-auto max-h-[165vh]">
                  {filteredPosts.map((post) => (
                    <RightCard
                      key={post.id}
                      post={post}
                      highlight={post.title.toLowerCase().includes(searchTerm.toLowerCase())}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function KabarLele() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <KabarLeleLayout />
        <AIFloatingButton />
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default KabarLele;
