import Footer from "../componen/Footer";
import Navbar from "../componen/Navbar";
import Testimonial from "../componen/Testimonical";
import "./pageCss/landingPage.css";

function LandingPage() {
    // const images = [img1, img2, img3, img4, img5, img6];


    return (
        <>
            {/* Navbar di bagian atas */}
            <Navbar />

            {/* Konten utama di bawah Navbar */}
            <div className="flex items-center justify-between p-8 bg-white mt-4">
                <div className="flex-1 pr-8">
                    <h2 className="text-3xl font-bold mb-4">
                        Maksimalkan Hasil Budidaya Lele Anda Dengan Pendekatan Terintegrasi
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm max-w-lg ">
                        Kesuksesan budidaya berawal dari pengecekan rutin dan monitoring kondisi terkini budidaya. Teliti hingga hal yang mungkin<br /> sering disepelekan.
                    </p>
                    <div className="flex space-x-4">
                        <button className="px-20 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                            Lihat Detail
                        </button>
                        <button className="px-20 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition duration-300">
                            Hubungi Kami
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="relative w-full h-64 bg-purple-500 rounded-lg overflow-hidden">
                        <img
                            src="/api/placeholder/400/320"
                            alt="VR headset"
                            className="absolute bottom-0 right-0 w-3/4 h-auto object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 mb-6">
                <h2 className="text-gray-600 text-xl font-semibold mb-4 text-center">Bisa Dipercaya</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {/* {images.map((image, index) => (
                    <div key={index} className="w-24 h-24 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                        <img 
                            src={image} 
                            alt={`Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))} */}
                </div>
            </div>

            <div className="flex items-center justify-between p-8 bg-white mt-4">
                <div className="flex-1">
                    <div className="relative w-full h-64 bg-purple-500 rounded-lg overflow-hidden">
                        <img
                            src="/api/placeholder/400/320"
                            alt="VR headset"
                            className="absolute bottom-0 right-0 w-3/4 h-auto object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1 pr-8 ml-8">
                    <h1 className="text-2xl font-bold mb-2">Masih bingung untuk memulai budidaya <br /> lele?</h1>
                    <p className="text-sm text-gray-600 mb-4 max-w-lg">
                        Ikuti Udara Menyingkapkan Keberhasilan Budidaya Lele dengan Teknik yang Mutakhir! Dapatkan pengalaman berharga yang membawa dampak signifikan pada masa depan ikan lele anda dengan arahan dari para ahli. Anda mendapatkan akses ke strategi dan taktik yang telah terbukti meningkatkan hasil panen dan mengoptimalkan keuntungan. Memulai sekarang untuk pengalaman budidaya yang berbeda!
                    </p>
                    <button className="bg-blue-500 text-white px-20 py-2 rounded hover:bg-blue-600">Selengkapnya</button>
                </div>
            </div>



            <div className="flex items-center justify-between p-8 bg-white mt-4">
                <div className="flex-1 pr-8">
                    <h1 className="text-2xl font-bold mb-2">Memastikan tambak berjalan lancar hingga <br /> panen</h1>
                    <p className="text-sm text-gray-600 mb-4 text-left max-w-lg">
                        Untuk memastikan tambak berjalan lancar hingga panen, penting untuk melakukan perencanaan yang matang dengan menganalisis lokasi dan memilih jenis ikan yang tepat. Kualitas air harus dipantau secara rutin, memastikan parameter seperti pH dan kadar oksigen dalam kondisi baik. Pakan yang berkualitas dan sesuai dengan kebutuhan ikan juga sangat penting untuk pertumbuhan optimal.
                    </p>
                    <button className="bg-blue-500 text-white px-20 py-2 rounded hover:bg-blue-600">Selengkapnya</button>
                </div>
                <div className="flex-1">
                    <div className="relative w-full h-64 bg-purple-500 rounded-lg overflow-hidden">
                        <img
                            src="/api/placeholder/400/320"
                            alt="VR headset"
                            className="absolute bottom-0 right-0 w-3/4 h-auto object-cover"
                        />
                    </div>
                </div>

            </div>






            <div className="bg-white p-6 mt-4 ">
                <h2 className="text-xl font-bold mb-4 text-center">Grafik Tren Harga Bibit Lele: Pantau Harga Secara Real Time</h2>
                <p className="text-center mt-4 max-w-lg mx-auto">
                    Cek Harga Jual dan Beli Lele Secara Real Time: Pantau Perubahan Harga Setiap Detik, Temukan Waktu Terbaik untuk Transaksi, dan Maksimalkan Keuntungan Anda dengan Akses Langsung ke Informasi Harga Terbaru yang Selalu Diperbarui
                </p>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border p-4 rounded">
                            <h3 className="font-bold mb-2">{i === 0 ? 'LAMPUNG' : 'JAWA TIMUR'}</h3>
                            <div className="flex justify-between mb-2">
                                <span>Rp 53.000</span>
                                <span className={`${i === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    {i === 0 ? 'Rp 1.000' : 'Rp 1.000'}
                                </span>
                            </div>
                            <div className="h-16 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>



            <div className="bg-white p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Ikuti Berita Terbaru Mengenai berita berita tentang<br />
                    budidaya</h2>

                <div className="grid grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="border rounded overflow-hidden">
                            <img src="/api/placeholder/150/100" alt="News thumbnail" className="w-full h-24 object-cover" />
                            <div className="p-2">
                                <p className="text-sm font-semibold d-flex">Judul berita {i + 1}</p>
                                <div className="Container-text flex items-center" >
                                    <div className="container-text2 flex items-center">
                                        <div className="circle"></div>
                                        <p className="text-xs text-gray-500">Nusaira</p>
                                    </div>
                                    <p className="text-xs text-gray-500 p-1">12 Oktober 2023</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Testimonial />
            <Footer />
        </>
    );
}

export default LandingPage;
