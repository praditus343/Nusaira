import { PenSquare } from 'lucide-react';
import React, { useState } from 'react';
import { FaInfoCircle, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AIFloatingButton from '../componen/AiFloatingButton';
import { Card, CardContent } from '../componen/CardManagement';
import Footer from '../componen/Footer';
import Header from '../componen/Header';
import Sidebar from '../componen/SideBar';
import { useNavigate } from 'react-router-dom';


const TABS = [
    { id: 'tambak', label: 'Tambak' },
    { id: 'pengguna', label: 'Pengguna yang berhak' },
    { id: 'tabelFR', label: 'Tabel FR' },
];

const USERS = [
    { nama: 'iqbal saputra', email: 'iqbal.saputra@gmail.com', blok: 'Semua Blok', peran: 'Admin' },
    { nama: 'rian sanjaya', email: 'rian.sanjaya@gmail.com', blok: 'Semua Blok', peran: 'User' },
    { nama: 'putri cantika', email: 'putri.cantika@gmail.com', blok: 'Semua Blok', peran: 'User' },
    { nama: 'santoso putar', email: 'santoso.putar@gmail.com', blok: 'Semua Blok', peran: 'Guest' },
];

const TAMBAK_DATA = {
    namaTambak: 'Lele Segar',
    totalLahan: '1m²',
    lokasi: 'SUMATERA UTARA, MANDAILING NATAL, SINUNUKAN, SINUNUKAN II',
    detailAlamat: 'Jalan Banten gg Jambu rt 2 rk 2',
    didirikanPada: '10 Oktober 2023',
    zonaWaktu: 'WIB',
    mataUang: 'Rupiah (Rp)',
};

const InfoCard = ({ title, value, subValue, buttonText, onClick }) => (
    <Card>
        <CardContent className="p-4">
            <h3 className="text-sm mb-4">{title}</h3>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-3xl font-bold text-blue-500">{value}</p>
                    {subValue && <p className="text-sm text-gray-600">{subValue}</p>}
                </div>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm" 
                    onClick={onClick} 
                >
                    {buttonText}
                </button>
            </div>
        </CardContent>
    </Card>
);


const TambakProfile = () => (
    <Card>
        <CardContent className="p-6 border border-gray-300 rounded-lg">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-semibold">Profil Tambak</h2>
                <PenSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-4  ">
                {Object.entries(TAMBAK_DATA).map(([key, value]) => (
                    <div
                        key={key}
                        className={`flex items-center py-2 ${key === "mataUang" ? "border-b border-gray-300" : "border-b border-gray-300"
                            }`}
                    >
                        <p className="text-gray-600 font-semibold w-1/4">
                            {key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                        <p className="text-left flex-1">{value}</p>
                    </div>
                ))}
                <div className="mt-4 py-2">
                    <p className="text-gray-600 font-semibold">Hapus Tambak</p>
                    <p className="text-sm text-gray-500">
                        Hanya Pemilik dan Admin yang memiliki akses untuk menghapus tambak
                    </p>
                </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg">Hapus</button>
        </CardContent>
    </Card>
);


const PengaturanDashboard = () => {
    const [activeTab, setActiveTab] = useState('tambak');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const navigate = useNavigate(); 
    const handleViewKolam = () => {
        navigate('/DaftarKolam'); 
    };

    const handleCheckboxChange = (email) => {
        if (selectedUsers.includes(email)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== email));
        } else {
            setSelectedUsers([...selectedUsers, email]);
        }
    };

    const handleDelete = () => {
        if (selectedUsers.length > 0) {
            Swal.fire({
                title: 'Konfirmasi Hapus',
                text: 'Apakah Anda yakin ingin menghapus pengguna yang dipilih?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedUsers = USERS.filter(user => !selectedUsers.includes(user.email));
                    console.log(updatedUsers);
                    setSelectedUsers([]);
                    setShowCheckboxes(false);
                    Swal.fire('Dihapus!', 'Pengguna yang dipilih telah dihapus.', 'success');
                }
            });
        } else {
            Swal.fire({
                title: 'Tidak ada yang dipilih',
                text: 'Silakan pilih pengguna yang ingin dihapus.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
            });
        }
    };

    const customStyles = `
    .custom-button {
        min-width: 100px; /* Sesuaikan lebar minimal sesuai kebutuhan */
        height: 40px; /* Tinggi yang sama untuk kedua tombol */
    }
`;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);

    const handleInfoClick = () => {
        Swal.fire('Informasi', 'Ini adalah informasi pengguna.', 'info');
    };

    const handleAddClick = () => {
        Swal.fire('Tambah Pengguna', 'Form untuk menambah pengguna akan muncul.', 'info');
    };

    const toggleDeleteCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
    };



    const renderTabContent = () => {
        switch (activeTab) {
            case 'tambak':
                return (
                    <div className="p-4">
                        <TambakProfile />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <InfoCard 
                                title="Pengguna Yang Berhak" 
                                value="1" 
                                subValue="Pengguna" 
                                buttonText="Lihat Daftar Pengguna" 
                                onClick={() => setActiveTab('pengguna')}
                            />
                            <InfoCard 
                                title="Jumlah Kolam" 
                                value="1" 
                                subValue="1 Kolam Aktif" 
                                buttonText="Lihat Daftar Kolam" 
                                onClick={handleViewKolam} 
                            />
                        </div>
                    </div>
                );
            case 'pengguna':
                return (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleInfoClick}
                                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    <FaInfoCircle className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleAddClick}
                                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    <FaPlus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        toggleDeleteCheckboxes();
                                        handleDelete();
                                    }}
                                    className={`p-2 rounded-full  ${showCheckboxes ? 'bg-red-500' : 'bg-blue-500'} text-white hover:bg-blue-600`}
                                > <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        {showCheckboxes && <th className="p-3 text-center border border-gray-300">Pilih</th>}
                                        <th className="p-3 text-center border border-gray-300">Nama</th>
                                        <th className="p-3 text-center border border-gray-300">Email</th>
                                        <th className="p-3 text-center border border-gray-300">Keterangan</th>
                                        <th className="p-3 text-center border border-gray-300">Blok</th>
                                        <th className="p-3 text-center border border-gray-300">Peran</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {USERS.map((user, index) => (
                                        <tr key={index} className="border-b bg-gray-50">
                                            {showCheckboxes && (
                                                <td className="p-3 text-center border border-gray-300">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.email)}
                                                        onChange={() => handleCheckboxChange(user.email)}
                                                    />
                                                </td>
                                            )}
                                            <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.nama}</td>
                                            <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.email}</td>
                                            <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.keterangan}</td>
                                            <td className="p-3 text-blue-500 border border-gray-300 text-center">{user.blok}</td>
                                            <td className="p-3 text-blue-500 border border-gray-300 text-center relative">
                                                {user.peran}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'tabelFR':
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
                        <p className="mt-2 text-gray-700">
                            Simpan data secara langsung ke tabel khusus FR untuk akses yang lebih cepat dan terorganisir!
                        </p>
                        <p className="mt-2 text-red-600 flex items-center">
                            <span className="mr-2">
                                <i className="fas fa-exclamation-circle"></i> 
                            </span>
                            Lengkapi data hingga minimal DoC 60 agar Tabel FR siap digunakan sebagai alat prediksi SR yang akurat.
                        </p>
                        <table className="w-full mt-4">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="p-3 text-left">DoC</th>
                                    <th className="p-3 text-left">MBW</th>
                                    <th className="p-3 text-left">FR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(10)].map((_, index) => (
                                    <tr key={index} className="border-b bg-gray-50">
                                        <td className="p-3">-</td>
                                        <td className="p-3">-</td>
                                        <td className="p-3">-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center p-4">
                <div className="flex w-full">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 text-lg font-semibold ${activeTab === tab.id ? 'text-blue-500 border-blue-500' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            {renderTabContent()}

        </div>
    );
};
const PengaturanTambak = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />
                <main className="flex-grow p-8">
                    <h1 className="text-2xl font-bold mb-4">Pengaturan Dashboard</h1>
                    <PengaturanDashboard />
                    <button
                        className="mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                        onClick={() => {
                            console.log("Perubahan disimpan!");
                        }}
                    >
                        Simpan Perubahan
                    </button>
                </main>
                <AIFloatingButton />
                <Footer />
            </div>
        </div>
    );
};

export default PengaturanTambak;
