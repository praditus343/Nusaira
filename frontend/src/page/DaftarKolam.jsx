import React from 'react';
import Sidebar from '../componen/SideBar';
import Footer from '../componen/Footer';
import AIFloatingButton from '../componen/AiFloatingButton';

const CustomCard = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const CustomButton = ({ children, variant, className, ...props }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'outline':
                return 'border border-gray-300 bg-white hover:bg-gray-50';
            case 'ghost':
                return 'hover:bg-gray-100';
            default:
                return 'bg-blue-600 hover:bg-blue-700 text-white';
        }
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg transition-colors ${getVariantClass()} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const PondTable = () => {
    return (
        <div className="bg-white w-full min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-semibold text-gray-800">Daftar Kolam</h1>
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


            {/* Location Info */}
            <div className="mb-6 ml-4 mt-5">
                <h2 className="text-xl font-semibold mb-2">Tambak Lele Seger</h2>
                <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Boyolali, Jawa Tengah</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-6 ml-4">
                <div className="flex items-center gap-4">
                    <span>Daftar Tambak:</span>
                    <CustomButton variant="outline" className="flex items-center gap-2">
                        Tambak Lele Seger
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </CustomButton>
                </div>
                <CustomButton className="bg-green-600 hover:bg-green-700 text-white mr-4">
                    Export Laporan
                </CustomButton>
            </div>

            {/* Main Card */}
            <CustomCard className="p-4 ml-5 mr-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Detail Daftar Kolam</h3>
                    <div className="flex gap-4">
                        <div className="relative flex-1  ">
                            <input
                                type="text"
                                placeholder="Cari Kolam"
                                className="pl-8 pr-4 py-2 px-4 border rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-lg border border-blue-600 rounded-lg p-2 placeholder-blue-600 text-blue-600"
                            />
                            <svg
                                className="w-4 h-5 absolute left-3 top-3 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <CustomButton className="bg-blue-600 hover:bg-blue-700 text-white w-30 text-lg">
                            <span className="text-2xl font-bold">+</span> <span className="font-normal">Kolam</span>
                        </CustomButton>

                        <CustomButton variant="ghost" className="w-32">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </CustomButton>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-10">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3 text-left">Kolam</th>
                                <th className="p-3 text-left">Umur</th>
                                <th className="p-3 text-left">Tgl Tebar</th>
                                <th className="p-3 text-left">Tgl Selesai</th>
                                <th className="p-3 text-left">Tebaran</th>
                                <th className="p-3 text-left">FCR</th>
                                <th className="p-3 text-left">ADG</th>
                                <th className="p-3 text-left">MBW</th>
                                <th className="p-3 text-left">Size</th>
                                <th className="p-3 text-left">Panen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="bg-blue-50">
                                    <td className="p-3">A {i + 1}</td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                    <td className="p-3">- </td> {/* Replace with actual data */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </CustomCard>

            {/* Chat Button */}
            <div className="fixed bottom-8 right-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <img
                        src="/api/placeholder/32/32"
                        alt="Chat"
                        className="w-8 h-8"
                    />
                </div>
                <div className="text-center mt-1 text-sm">NusAi</div>
            </div>
        </div>
    );
};

function PondManagement() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <PondTable />
                <AIFloatingButton/>
                <Footer />
            </div>
        </div>
    );
}

export default PondManagement;