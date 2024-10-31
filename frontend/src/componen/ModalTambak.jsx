import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faClock, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data lele seger");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg p-6 w-full max-w-md ${isExpanded ? 'h-[90vh]' : 'h-auto'} overflow-y-auto transition-all duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Lele Seger</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-lg">
            <select className="block w-full border rounded-lg p-2 appearance-none">
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className='relative rounded-lg'>
            <select className="block w-full border p-2 appearance-none rounded-lg">
              <option value="">Lama Persiapan (Hari)</option>
              <option value="1">1 Hari</option>
              <option value="2">2 Hari</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className="relative flex-grow border border-blue-400 rounded-lg">
            <input
              type="date"
              className="w-full px-3 py-2   rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              placeholder="Tanggal"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>
          <div className='relative rounded-lg'>
            <select className="block w-full border  rounded-lg p-2 appearance-none">
              <option value="">Total tebar (Ekor)</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className='relative rounded-lg'>
            <select className="block w-full border border-blue-400 rounded-lg p-2 appearance-none">
              <option value="">Tipe total tebar</option>
              <option value="type1">Tipe 1</option>
              <option value="type2">Tipe 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
            <div className='relative rounded-lg'>

              <select className="block w-full border border-blue-400 rounded-lg p-2 appearance-none">
                <option value="">Hatchery (opsional)</option>
                <option value="hatchery1">Hatchery 1</option>
                <option value="hatchery2">Hatchery 2</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>

            <input
              type="text"
              placeholder="Broodstock"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />
            <div className='relative rounded-lg'>
              <select className="block w-full border border-blue-400 p-2 appearance-none rounded-lg">
                <option value="">Umur awal hari</option>
                <option value="7">7 hari</option>
                <option value="14">14 hari</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>

            <input
              type="number"
              placeholder="Batas biomass per luas (kg/m²)"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <input
              type="number"
              placeholder="Target size (umur 100)"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <input
              type="number"
              placeholder="Target SR (%)"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <input
              type="number"
              placeholder="Target FCR"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <input
              type="number"
              placeholder="Harga pakan (untuk estimasi profit)"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <input
              type="number"
              placeholder="Jumlah anco"
              className="focus:ring-blue-600 focus:border-blue-600 block w-full  border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            />

            <div className='relative'>
              <select className="block w-full border border-blue-400 rounded-md p-2 appearance-none">
                <option value="">Metode prediksi SR</option>
                <option value="method1">Metode 1</option>
                <option value="method2">Metode 2</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>

            <textarea
              value=""
              // onChange={(e) => setCatatan(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
              placeholder="Catatan"
            />
          </div>
          <button
            type="button"
            onClick={toggleExpand}
            className="w-full text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 py-2"
          >
            {isExpanded ? (
              <>
                <span>Lebih sedikit</span>
                <FontAwesomeIcon icon={faChevronUp} />
              </>
            ) : (
              <>
                <span>Lebih banyak</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </>
            )}
          </button>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Simpan
          </Button>
        </form>
      </div>
    </div>
  );
};

//modal data kematian
export const TambahDataKematianModal = ({ isOpen, onClose }) => {
  const [trackingMethod, setTrackingMethod] = useState('jumlahEkor');
  const [totalWeight, setTotalWeight] = useState('');
  const [fishCount, setFishCount] = useState('');
  const [multiplier, setMultiplier] = useState('');

  const calculateTotalDeaths = () => {
    if (trackingMethod === 'jumlahEkor') {
      return fishCount || 0;
    } else {
      const weight = parseFloat(totalWeight) || 0;
      const mult = parseFloat(multiplier) || 0;
      return weight * mult;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data kematian");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah data Kematian Lele</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <select className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>
          <div className="relative">
            <input
              type="date"
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tanggal Tebar"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>

          {/* Umur Display */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Umur</label>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Berdasarkan</label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="jumlahEkor"
                  name="trackingMethod"
                  value="jumlahEkor"
                  checked={trackingMethod === 'jumlahEkor'}
                  onChange={(e) => setTrackingMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400"
                />
                <label htmlFor="jumlahEkor" className="text-sm text-gray-700">
                  Jumlah ekor
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="size"
                  name="trackingMethod"
                  value="size"
                  checked={trackingMethod === 'size'}
                  onChange={(e) => setTrackingMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400"
                />
                <label htmlFor="size" className="text-sm text-gray-700">
                  Size
                </label>
              </div>
            </div>
          </div>
          {trackingMethod === 'size' ? (
            <>
              <div className='relative'>
                <select
                  className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                >
                  <option value="">Total berat (kg)</option>
                  <option value="1">1 kg</option>
                  <option value="2">2 kg</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>

              <div className='relative'>
                <select
                  className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                >
                  <option value="">Pengali</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>

            </>
          ) : (
            <div className='relative'>
              <select
                className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={fishCount}
                onChange={(e) => setFishCount(e.target.value)}
              >
                <option value="">Jumlah ekor</option>
                <option value="10">10 ekor</option>
                <option value="20">20 ekor</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>

          )}
          <p className="text-[12px] text-blue-500 italic">
            *Prediksi potensi kematian udang yang tidak teridentifikasi.
          </p>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Total kematian (ekor)
            </label>
            <div className="text-2xl font-bold flex ml-14">{calculateTotalDeaths()}</div>
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            Simpan
          </Button>
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
          <div className="relative">
            <select className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>
          <div className="relative flex-grow">
            <input
              type="date"
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              placeholder="Tanggal"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="">Jenis Penyakit</option>
              <option value="kolam1">Bintik Putih</option>
              <option value="kolam2">Jamur Air</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>
          <textarea
            value=""
            // onChange={(e) => setCatatan(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
            placeholder="Catatan"
          />
          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div className="border-4 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl text-gray-400">+</span>
              </div>
              <div className="border-4 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl text-gray-400">+</span>
              </div>
              <div className="border-4 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl text-gray-400">+</span>
              </div>
            </div>
          </div>

          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};


const StatusMessage = ({ title, hasStatus }) => {
  const message = hasStatus ? `Ada ${title}` : `Belum ada ${title}`;

  return <span className="text-gray-500">{message}</span>;
};


// Modal Tambah Data Pakan
export const TambahDataPakanModal = ({ isOpen, onClose }) => {
  const hasPakan = false;
  const statuses = [
    { title: 'Pakan' },
  ];

  if (!isOpen) return null;


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
          <div className="relative">
            <select className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>
          <div className="mt-2 text-sm">
            {statuses.map((status, index) => (
              <StatusMessage key={index} title={status.title} />
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="date"
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
                placeholder="Tanggal"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
              </div>
            </div>
            <div className="relative flex-grow">
              <input
                type="time"
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
                placeholder="Waktu pemberian"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faClock} className="text-blue-500" />
              </div>
            </div>
          </div>

          <Checkbox id="puasa" label="Puasa" />
          <input
            type="number"
            placeholder="Jumlah (kg)"
            className="block w-full border border-blue-400 rounded-lg p-2 text-blue-600 focus:ring-blue-600 focus:border-blue-600 placeholder-black"
          />

          <textarea
            value=""
            // onChange={(e) => setCatatan(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
            placeholder="Catatan"
          />
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};

// Modal Tambah Data Panen
export const TambahDataPanenModal = ({ isOpen, onClose }) => {
  const [selectedKolam, setSelectedKolam] = useState('');
  const [tanggalPanen, setTanggalPanen] = useState('');
  const [totalBerat, setTotalBerat] = useState('');
  const [size, setSize] = useState('');
  const [totalHargaJual, setTotalHargaJual] = useState('');
  const [status, setStatus] = useState('');
  const [catatan, setCatatan] = useState('');

  const hasPanen = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simpan data panen");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah data panen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
            />
          </div>

          <div className="text-sm text-gray-500">
            {hasPanen ? "" : "Belum ada panen"}
          </div>

          <div className="relative">
            <input
              type="date"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tanggal panen/parsial"
              value={tanggalPanen}
              onChange={(e) => setTanggalPanen(e.target.value)}
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
              placeholder="Total berat (kg)"
              value={totalBerat}
              onChange={(e) => setTotalBerat(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Size (Ekor/kg)</option>
              <option value="8">8 ekor/kg</option>
              <option value="10">10 ekor/kg</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
              placeholder="Total harga jual"
              value={totalHargaJual}
              onChange={(e) => setTotalHargaJual(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="panen">Panen</option>
              <option value="parsial">Parsial</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
            />
          </div>
          <div className="relative">
            <textarea
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
              placeholder="Catatan"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            Simpan
          </Button>
        </form>
      </div>
    </div>
  );
};

//Modal Jumlah Anco
export const TambahJumlahAnco = ({ isOpen, onClose }) => {
  const hasAnco = false;
  const statuses = [
    { title: 'Cek Anco' },
  ];
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Cek Anco</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className='relative'>
              <select
                value={pilihKolam}
                onChange={(e) => setPilihKolam(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="" disabled>Pilih Kolam</option>
                <option value="kolam1">Kolam 1</option>
                <option value="kolam2">Kolam 2</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>
          </div>
          <div className="mt-2 text-sm">
            {statuses.map((status, index) => (
              <StatusMessage key={index} title={status.title} />
            ))}
          </div>
          <div>
            <div className="relative flex-grow">
              <input
                type="date"
                value={tanggalPanenParsial}
                onChange={(e) => setTanggalPanenParsial(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
              </div>
            </div>

          </div>
          <div>
            <div className='relative'>
              <select
                value={waktuPemberianPakan}
                onChange={(e) => setWaktuPemberianPakan(e.target.value)}
                className="mt-5 block w-full px-3 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="" disabled>Pilih Waktu Pemberian Pakan</option>
                <option value="pagi">Pagi</option>
                <option value="siang">Siang</option>
                <option value="sore">Sore</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
              />
            </div>
          </div>
          <div>
            <div className="relative flex-grow">
              <input
                type="time"
                value={waktuCekAnco}
                onChange={(e) => setWaktuCekAnco(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faClock} className="text-blue-500" />
              </div>
            </div>
          </div>
          <div>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
              placeholder="Catatan"
            />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};



