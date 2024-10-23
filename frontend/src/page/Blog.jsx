import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, ListFilter } from 'lucide-react';
import Sidebar from '../componen/SideBar';
import Footer from '../componen/Footer';

const BlogLayout = () => {
  const allPosts = [
    {
      id: 1,
      title: 'Seluk Beluk Usaha Budidaya Ikan',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Kegiatan budidaya ikan menjadi salah satu usaha yang banyak diminati dari masyarakat, baik untuk...'
    },
    {
      id: 2,
      title: 'Sulap Sungon Kotor Jadi Tempat Budidaya',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Kerja keras komunitas Pecinta Sungai (KPS) dalam...'
    },
    {
      id: 3,
      title: 'Budidaya Ikan nan Menguntungkan',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Pembersaran di kolam di anggap paling sederhana pengalolahannya, apalagi jika kolam ku berada di sekitar tempat...'
    },
    {
      id: 4,
      title: 'Menggabungkan Aquaponik',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Aquaponik adalah sistem yang menggabungkan budidaya ikan (akuakultur) dengan hidroponik...'
    },
    {
      id: 5,
      title: 'Pembangunan Aquaponik',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Untuk memenuhi kebutuhan manusia yang semakin meningkat terkait sektor pembangunan termasuk perikanan budi...'
    },
    {
      id: 6,
      title: 'Potensi Budidaya Ikan',
      date: '15 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Di Tanah Air dinilai sangat besar. Bahkan potensi produktivitasnya bisa digenjot dengan memanfaatkan teknologi...'
    },
    {
      id: 7,
      title: 'Inovasi Kolam Terpal Ikan Lele',
      date: '16 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Kolam terpal semakin diminati sebagai media budidaya lele karena biayanya yang lebih murah...'
    },
    {
      id: 8,
      title: 'Tips Memilih Pakan Ikan Berkualitas',
      date: '16 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Pemilihan pakan yang tepat dapat mempercepat pertumbuhan ikan dan meningkatkan kualitas panen...'
    },
    {
      id: 9,
      title: 'Mengenal Teknik Bioflok',
      date: '16 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Bioflok adalah salah satu teknik budidaya ikan yang hemat air dan ramah lingkungan...'
    },
    {
      id: 10,
      title: 'Keuntungan Budidaya Ikan Hias',
      date: '16 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Selain ikan konsumsi, budidaya ikan hias juga menawarkan potensi pasar yang menggiurkan...'
    },
    {
      id: 11,
      title: 'Strategi Panen Maksimal dalam Budidaya Lele',
      date: '17 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Mengoptimalkan strategi panen menjadi kunci sukses dalam budidaya lele agar hasil lebih maksimal...'
    },
    {
      id: 12,
      title: 'Mengatasi Penyakit Ikan',
      date: '17 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Penyakit ikan menjadi salah satu tantangan yang sering dihadapi oleh pembudidaya, namun dengan...'
    },
    {
      id: 13,
      title: 'Teknik Pembenihan Ikan Nila',
      date: '17 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Pembenihan ikan nila memerlukan teknik khusus untuk memastikan kualitas benih yang baik...'
    },
    {
      id: 14,
      title: 'Keberlanjutan dalam Budidaya Ikan',
      date: '18 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Menerapkan prinsip keberlanjutan dalam budidaya ikan menjadi penting untuk menjaga ekosistem...'
    },
    {
      id: 15,
      title: 'Meningkatkan Kualitas Air Budidaya',
      date: '18 Oktober 2024',
      image: '/api/placeholder/400/300',
      excerpt: 'Kualitas air adalah faktor utama dalam keberhasilan budidaya ikan. Mengatur pH dan kadar oksigen...'
    }
];


  const [searchTerm, setSearchTerm] = useState('');
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [randomLeftPosts, setRandomLeftPosts] = useState([]);
  const [rightPosts, setRightPosts] = useState([]);

  useEffect(() => {
    // Randomly select 3 posts for the left side
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    setRandomLeftPosts(shuffled.slice(0, 3));
    setRightPosts(allPosts);
  }, []);

  const isPostVisible = (post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const LeftCard = ({ post }) => (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-opacity duration-300 ${isPostVisible(post) ? 'opacity-100' : 'opacity-30'
        }`}
    >
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
    <div
      className={`flex bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-opacity duration-300 ${isPostVisible(post) ? 'opacity-100' : 'opacity-30'
        }`}
    >
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-800">Blog</h1>
            <div className="flex items-center space-x-4">
              <span className="text-blue-600 font-medium">Informasi Terbaru NusAIra</span>
              {/* Round image for the Indonesian flag */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="path/to/indonesian-flag.png" // Replace with the actual path to the flag image
                  alt="Bendera Indonesia"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Round image for profile photo */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="path/to/profile-photo.png" // Replace with the actual path to the profile photo
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 w-full" />
      </header>


      <div className="mt-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Budidaya Nusantara Update Informasi dan<br/> Teknologi
            </h1>
          </div>

          <div className="mt-1">
            <p className="text-gray-600">
              Kami berkomitmen untuk memberikan informasi yang akurat dan terkini tentang inovasi, praktik <br/>terbaik, dan teknologi terbaru yang dapat meningkatkan produktivitas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 ml-20">
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
            <button
              className="px-10 py-2.5 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 transition-colors duration-200"
            >
              <ListFilter size={24} />
            </button>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4">Popular Berita</h2>
            <div className="space-y-4">
              {randomLeftPosts.map(post => (
                <LeftCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="w-2/3">
            <h2 className="text-xl font-bold mb-4">Semua Berita</h2>
            <div className="space-y-4 overflow-y-auto max-h-[125vh]">
              {rightPosts.map(post => (
                <RightCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



function Blog() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <BlogLayout />
        <div className='mt-20'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Blog;


