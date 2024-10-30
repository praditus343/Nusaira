import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Generic UI components
const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white rounded p-2 ${className}`}
    >
      {children}
    </button>
  );
};

const Select = ({ options, placeholder }) => {
  return (
    <div className="relative">
      <FontAwesomeIcon icon={faTimes} className="absolute left-3 top-3 text-gray-500" />
      <select className="block w-full border rounded-md pl-10 pr-3 py-2 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Textarea = ({ placeholder, ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="block w-full border rounded-md p-2"
      {...props}
    />
  );
};

const Checkbox = ({ id, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id={id} className="h-4 w-4" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Modal Tambah Lele Seger
export const TambahLeleSegerModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data lele seger");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Lele Seger</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select options={[{ value: '', label: 'Pilih Kolam' }]} placeholder="Pilih Kolam" />
          <Select options={[{ value: '', label: 'Lama Persiapan (Hari)' }]} placeholder="Lama Persiapan (Hari)" />
          <input type="date" className="block w-full border rounded-md p-2" />
          <Select options={[{ value: '', label: 'Total tebar (Ekor)' }]} placeholder="Total tebar (Ekor)" />
          <Select options={[{ value: '', label: 'Broodstock' }]} placeholder="Broodstock" />
          <Select options={[{ value: '', label: 'Target FCR' }]} placeholder="Target FCR" />
          <Select options={[{ value: '', label: 'Harga pakan' }]} placeholder="Harga pakan" />
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};

// Modal Tambah Data Kematian
export const TambahDataKematianModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data kematian");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Data Kematian Lele</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select options={[{ value: '', label: 'Pilih Kolam' }]} placeholder="Pilih Kolam" />
          <input type="date" className="block w-full border rounded-md p-2" />
          <div className="flex items-center space-x-2">
            <label className="font-bold">Berdasarkan:</label>
            <Checkbox id="jumlahEkor" label="Jumlah ekor" />
            <Checkbox id="size" label="Size" />
          </div>
          <Select options={[{ value: '', label: 'Total berat (kg)' }]} placeholder="Total berat (kg)" />
          <Select options={[{ value: '', label: 'Pengali' }]} placeholder="Pengali" />
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};

// Modal Tambah Data Uji Penyakit
export const TambahDataPenyakitModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data penyakit");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Data Uji Penyakit Lele</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select options={[{ value: '', label: 'Pilih Kolam' }]} placeholder="Pilih Kolam" />
          <input type="date" className="block w-full border rounded-md p-2" />
          <Select options={[{ value: '', label: 'Jenis Penyakit' }]} placeholder="Jenis Penyakit" />
          <Textarea placeholder="Catatan" />
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center">
              <span className="text-4xl">+</span>
            </div>
            <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center">
              <span className="text-4xl">+</span>
            </div>
            <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center">
              <span className="text-4xl">+</span>
            </div>
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};

// Modal Tambah Data Pakan
export const TambahDataPakanModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data pakan");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Data Pakan</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select options={[{ value: '', label: 'Pilih Kolam' }]} placeholder="Pilih Kolam" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="block w-full border rounded-md p-2" />
            <input type="time" className="block w-full border rounded-md p-2" />
          </div>
          <Checkbox id="puasa" label="Puasa" />
          <Select options={[{ value: '', label: 'Jumlah (kg)' }]} placeholder="Jumlah (kg)" />
          <Textarea placeholder="Catatan" />
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};
// Modal Tambah Data Panen
export const TambahDataPanenModal = ({ isOpen, onClose }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Simpan data panen");
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Tambah Data Panen</h2>
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Select
                options={[{ value: '', label: 'Pilih Kolam' }]}
                placeholder="Pilih Kolam"
                className="rounded-md border-blue-600"
              />
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-blue-600" />
            </div>
            <input
              type="date"
              placeholder="Tanggal panen/parsial"
              className="block w-full border border-blue-600 rounded-md p-2"
            />
            <div className="relative">
              <Select
                options={[{ value: '', label: 'Total berat (kg)' }]}
                placeholder="Total berat (kg)"
                className="rounded-md border-blue-600"
              />
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-blue-600" />
            </div>
            <div className="relative">
              <Select
                options={[{ value: '', label: 'Size (ekor/kg)' }]}
                placeholder="Size (ekor/kg)"
                className="rounded-md border-blue-600"
              />
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-blue-600" />
            </div>
            <div className="relative">
              <Select
                options={[{ value: '', label: 'Total harga jual' }]}
                placeholder="Total harga jual"
                className="rounded-md border-blue-600"
              />
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-blue-600" />
            </div>
            <div className="relative">
              <Select
                options={[{ value: '', label: 'Status' }]}
                placeholder="Status"
                className="rounded-md border-blue-600"
              />
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-blue-600" />
            </div>
            <Textarea
              placeholder="Catatan"
              className="block w-full border border-blue-600 rounded-md p-2"
            />
            <Button type="submit" className="bg-blue-600 text-white rounded-md">Simpan</Button>
          </form>
        </div>
      </div>
    );
  };
// Modal Tambah Jumlah Anco
export const TambahJumlahAnco = ({ isOpen, onClose }) => {
    const [pilihKolam, setPilihKolam] = useState('');
    const [tanggalPanenParsial, setTanggalPanenParsial] = useState('');
    const [waktuPemberianPakan, setWaktuPemberianPakan] = useState('');
    const [waktuCekAnco, setWaktuCekAnco] = useState('');
    const [catatan, setCatatan] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({
        pilihKolam,
        tanggalPanenParsial,
        waktuPemberianPakan,
        waktuCekAnco,
        catatan,
      });
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Cek Anco</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Pilih Kolam</label>
              <select
                value={pilihKolam}
                onChange={(e) => setPilihKolam(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="" disabled>Pilih Kolam</option>
                <option value="kolam1">Kolam 1</option>
                <option value="kolam2">Kolam 2</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-10 text-blue-600" />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Tanggal Panen/Parsial</label>
              <input
                type="date"
                value={tanggalPanenParsial}
                onChange={(e) => setTanggalPanenParsial(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Waktu Pemberian Pakan</label>
              <select
                value={waktuPemberianPakan}
                onChange={(e) => setWaktuPemberianPakan(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="" disabled>Pilih Waktu Pemberian Pakan</option>
                <option value="pagi">Pagi</option>
                <option value="siang">Siang</option>
                <option value="sore">Sore</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-10 text-blue-600" />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Waktu Cek Anco</label>
              <input
                type="time"
                value={waktuCekAnco}
                onChange={(e) => setWaktuCekAnco(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
  
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Catatan</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
                placeholder="Catatan"
              />
            </div>
  
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
    

export default {
  TambahLeleSegerModal,
  TambahDataKematianModal,
  TambahDataPenyakitModal,
  TambahDataPakanModal,
  TambahDataPanenModal,
  TambahJumlahAnco
};
