import { ChevronRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";

const LeftCard = ({ post, isVisible }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/kabar-lele/${post.id}`, { state: { post } });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-300 ${isVisible ? "opacity-100" : "opacity-20"}`}
    >
      <img src={`/${post.image}`} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</div>
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
        <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</div>
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://nusaira-be.vercel.app/api/berita');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setRandomLeftPosts(shuffled.slice(0, 3));
        setFilteredPosts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const sortedPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPosts(sortedPosts);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ups! Terjadi Kesalahan</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <div className="bg-white w-full min-h-screen">
          <Header />
          <div className="mt-5">
            <div className="max-w-8xl mx-auto px-6 ml-4">
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
              <div className="w-[600px] relative flex items-center border border-blue-600 rounded-2xl bg-white">
                <div className="relative">
                  <Search className="w-4 h-5 absolute left-7 top-3 text-blue-600" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pl-14 rounded-l-2xl focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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
                <div className="space-y-4 overflow-y-auto max-h-[160vh] mt-4">
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