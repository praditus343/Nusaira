import React from 'react';
import { X } from 'lucide-react';
import Img from "../assets/img/landing_page_sebelum_daftar/landingsb2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const PermissionModals = ({
    showPermissions,
    setShowPermissions,
    showAddMember,
    setShowAddMember
}) => {
    const allPermissions = [
        "Mengubah data budidaya (operasional dan kualitas air)",
        "Melihat data budidaya (operasional dan kualitas air)",
        "Akses grafik analisis",
        "Melihat & mengubah data stok tambak",
        "Export laporan budidaya",
        "Export laporan keuangan tambak",
        "Tambah & hapus anggota",
        "Melihat dan mengubah data keuangan tambak",
        "Merubah akses setiap anggota",
        "Membuat dan mengatur blok tambak"
    ];

    const roles = [
        {
            title: "Admin",
            subtitle: "Memiliki seluruh akses",
            description: "Digunakan oleh administrator sistem",
            permissions: allPermissions
        },
        {
            title: "User",
            subtitle: "Akses standar untuk operasional",
            description: "Digunakan oleh pengguna regular",
            permissions: [
                "Mengubah data budidaya (operasional dan kualitas air)",
                "Melihat data budidaya (operasional dan kualitas air)",
                "Akses grafik analisis",
                "Melihat & mengubah data stok tambak",
                "Export laporan budidaya",
                "Melihat dan mengubah data keuangan tambak"
            ]
        },
        {
            title: "Guest",
            subtitle: "Akses terbatas untuk melihat data",
            description: "Digunakan oleh pengguna tamu",
            permissions: [
                "Melihat data budidaya (operasional dan kualitas air)",
                "Akses grafik analisis"
            ]
        }
    ];

    const CheckIcon = () => (
        <svg className="w-3 h-3 text-blue-500" viewBox="0 0 12 12">
            <path
                fill="currentColor"
                d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"
            />
        </svg>
    );

    const XIcon = () => (
        <svg className="w-6 h-6 text-red-500" viewBox="0 0 12 12">
            <path
                fill="currentColor"
                d="M10.28 1.72a1 1 0 00-1.414 0L6 4.586 3.134 1.72a1 1 0 00-1.414 1.414L4.586 6 1.72 8.866a1 1 0 101.414 1.414L6 7.414l2.866 2.866a1 1 0 001.414-1.414L7.414 6l2.866-2.866a1 1 0 000-1.414z"
            />
        </svg>
    );

    return (
        <>
            {/* Permissions Modal */}
            {showPermissions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-4 ml-4 mr-4">
                            <h2 className="text-xl font-semibold">Info</h2>
                            <button
                                onClick={() => setShowPermissions(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6 p-4">
                            {roles.map((role, index) => (
                                <div key={index} className="border border-blue-600 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div><img
                                            src={Img}
                                            alt={`${role.title} icon`}
                                            className="w-12 h-12 bg-blue-200 rounded-full object-cover"
                                        />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{role.title}</h3>
                                            <p className="text-sm text-gray-600">{role.subtitle}</p>
                                            <p className="text-xs text-gray-500">{role.description}</p>
                                        </div>
                                    </div>
                                    <div className="ml-11 space-y-2">
                                        {allPermissions.map((permission, pIndex) => (
                                            <div key={pIndex} className="flex items-center gap-2">
                                                <div className="w-4 h-4 border rounded flex items-center justify-center ml-2">
                                                    {role.permissions.includes(permission) ? <CheckIcon /> : <XIcon />}
                                                </div>
                                                <span className="text-sm">{permission}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4 m-4">
                            <h2 className="text-xl font-semibold">Tambah anggota</h2>
                            <button
                                onClick={() => setShowAddMember(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <hr className="border-gray-300 mb-4" />


                        <form className="space-y-4 m-6">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-600 placeholder-black"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Keterangan"
                                    className="w-full p-2 border border-blue-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-black"
                                />
                            </div>
                            <div className="relative w-full mb-10">
                                <select className="w-full appearance-none p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="">Peran anggota</option>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role.title}>
                                            {role.title}
                                        </option>
                                    ))}
                                </select>
                                <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 pointer-events-none text-blue-600" />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddMember(false)}
                                    className="w-52 px-2 py-2 border-2 border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="w-48 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Tambahkan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PermissionModals;