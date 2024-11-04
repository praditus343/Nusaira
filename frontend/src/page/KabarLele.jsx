import React, { useState, useEffect } from "react";
import { ChevronRight, Search, ListFilter } from "lucide-react";
import Sidebar from "../componen/SideBar";
import Footer from "../componen/Footer";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import img1 from "../assets/img/kabar_lele/kbl1.png";
import img2 from "../assets/img/kabar_lele/kbl2.png";
import img3 from "../assets/img/kabar_lele/kbl3.png";
import img4 from "../assets/img/kabar_lele/kbl4.png";
import img5 from "../assets/img/kabar_lele/kbl5.png";
import img6 from "../assets/img/kabar_lele/kbl6.png";
import img7 from "../assets/img/kabar_lele/kbl7.png";

const KabarLeleLayout = () => {
  const allPosts = [
    {
      id: 1,
      title: "Seluk Beluk Usaha Budidaya Ikan Lele",
      date: "15 Oktober 2024",
      image: img1,
      excerpt: "Kegiatan budidaya ikan Lele...",
    },
    {
      id: 2,
      title: "Sulap Sungon Kotor Jadi Tempat Budidaya",
      date: "15 Oktober 2024",
      image: img2,
      excerpt: "Kerja keras komunitas Pecinta Sungai (KPS) dalam...",
    },
    {
      id: 3,
      title: "Budidaya Ikan nan Menguntungkan",
      date: "15 Oktober 2024",
      image: img3,
      excerpt:
        "Pembersaran di kolam di anggap paling sederhana pengalolahannya, apalagi jika kolam ku berada di sekitar tempat...",
    },
    {
      id: 4,
      title: "Menggabungkan Aquaponik",
      date: "15 Oktober 2024",
      image: img4,
      excerpt:
        "Aquaponik adalah sistem yang menggabungkan budidaya ikan (akuakultur) dengan hidroponik...",
    },
    {
      id: 5,
      title: "Pembangunan Aquaponik",
      date: "15 Oktober 2024",
      image: img5,
      excerpt:
        "Untuk memenuhi kebutuhan manusia yang semakin meningkat terkait sektor pembangunan termasuk perikanan budi...",
    },
    {
      id: 6,
      title: "Potensi Budidaya Ikan",
      date: "15 Oktober 2024",
      image: img6,
      excerpt:
        "Di Tanah Air dinilai sangat besar. Bahkan potensi produktivitasnya bisa digenjot dengan memanfaatkan teknologi...",
    },
    {
      id: 7,
      title: "Inovasi Kolam Terpal Ikan Lele",
      date: "16 Oktober 2024",
      image: img7,
      excerpt:
        "Kolam terpal semakin diminati sebagai media budidaya lele karena biayanya yang lebih murah...",
    },
    {
      id: 8,
      title: "Tips Memilih Pakan Ikan Berkualitas",
      date: "16 Oktober 2024",
      image: img1,
      excerpt:
        "Pemilihan pakan yang tepat dapat mempercepat pertumbuhan ikan dan meningkatkan kualitas panen...",
    },
    {
      id: 9,
      title: "Mengenal Teknik Bioflok",
      date: "16 Oktober 2024",
      image: img2,
      excerpt:
        "Bioflok adalah salah satu teknik budidaya ikan yang hemat air dan ramah lingkungan...",
    },
    {
      id: 10,
      title: "Keuntungan Budidaya Ikan Hias",
      date: "16 Oktober 2024",
      image: img3,
      excerpt:
        "Selain ikan konsumsi, budidaya ikan hias juga menawarkan potensi pasar yang menggiurkan...",
    },
    {
      id: 11,
      title: "Strategi Panen Maksimal dalam Budidaya Lele",
      date: "17 Oktober 2024",
      image: img4,
      excerpt:
        "Mengoptimalkan strategi panen menjadi kunci sukses dalam budidaya lele agar hasil lebih maksimal...",
    },
    {
      id: 12,
      title: "Mengatasi Penyakit Ikan",
      date: "17 Oktober 2024",
      image: img5,
      excerpt:
        "Penyakit ikan menjadi salah satu tantangan yang sering dihadapi oleh pembudidaya, namun dengan...",
    },
    {
      id: 13,
      title: "Teknik Pembenihan Ikan Nila",
      date: "17 Oktober 2024",
      image: img6,
      excerpt:
        "Pembenihan ikan nila memerlukan teknik khusus untuk memastikan kualitas benih yang baik...",
    },
    {
      id: 14,
      title: "Keberlanjutan dalam Budidaya Ikan",
      date: "18 Oktober 2024",
      image: img7,
      excerpt:
        "Menerapkan prinsip keberlanjutan dalam budidaya ikan menjadi penting untuk menjaga ekosistem...",
    },
    {
      id: 15,
      title: "Meningkatkan Kualitas Air Budidaya",
      date: "18 Oktober 2024",
      image: img1,
      excerpt:
        "Kualitas air adalah faktor utama dalam keberhasilan budidaya ikan. Mengatur pH dan kadar oksigen...",
    },
    {
      id: 16,
      title: "Pemanfaatan Teknologi dalam Budidaya Ikan",
      date: "18 Oktober 2024",
      image: img2,
      excerpt:
        "Pemanfaatan teknologi dalam budidaya ikan dapat meningkatkan efisiensi dan produktivitas...",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [randomLeftPosts, setRandomLeftPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  useEffect(() => {
    // Randomly select 3 posts for the left side
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    setRandomLeftPosts(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    // Filter posts based on the search term
    const results = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm]);

  const LeftCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{post.date}</div>
        <h3 className="font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
        <button className="text-blue-500 text-sm flex items-center">
          Lanjutkan Membaca
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );

  const RightCard = ({ post }) => (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="flex-1 p-4">
        <div className="text-sm text-gray-500 mb-2">{post.date}</div>
        <h3 className="font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.excerpt}</p>
        <button className="text-blue-500 text-sm flex items-center mt-2">
          Lanjutkan Membaca
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <img
        src={post.image}
        alt={post.title}
        className="w-48 h-48 object-cover"
      />
    </div>
  );

  return (
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
        {/* Search Bar */}
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
                <LeftCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="w-2/3">
            <h2 className="text-xl font-bold mb-4">Semua Berita</h2>
            <div className="space-y-4 overflow-y-auto max-h-[165vh]">
              {filteredPosts.map((post) => (
                <RightCard key={post.id} post={post} />
              ))}
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
