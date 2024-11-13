import React, { useState, useEffect,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faClock, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white rounded p-2 mt-8 ${className}`}
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

//siklus
export const TambahLeleSegerModal = ({ isOpen, onClose, initialData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    kolamId: '',
    lamaPersiapan: '',
    totalTebar: '',
    metodePenebaranBenih: '',
    umurAwal: '',
    batasBiomassPerLuas: '',
    targetSize: '',
    targetSR: '',
    targetFCR: '',
    hargaPakan: '',
    jumlahAnco: '',
    metodePrediksiSR: '',
    catatan: '',
    tanggal: '',
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = [];

    for (const key in formData) {
      if (formData[key] === '' || (typeof formData[key] === 'number' && formData[key] < 0)) {
        hasError = true;
        errorMessages.push(`Field ${key} tidak boleh kosong atau negatif.`);
      }
    }

    if (hasError) {
      setErrors(errorMessages);
      return;
    }

    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT_URL', formData);

      if (response.status === 200) {
        console.log('Data berhasil disimpan', response.data);
        onClose();
      } else {
        console.error('Gagal menyimpan data', response.data);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message || error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg p-6 w-full max-w-md ${isExpanded ? 'h-[90vh]' : 'h-auto'} overflow-y-auto transition-all duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambak Lele Seger</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-lg">
            <select
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolamId"
              value={formData.kolamId}
              onChange={handleInputChange}
            >
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <input
            type="number"
            name="lamaPersiapan"
            placeholder="Lama Persiapan (Hari)"
            className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            min="1"
            value={formData.lamaPersiapan}
            onChange={handleInputChange}
          />

          <div className="relative flex-grow border border-blue-400 rounded-lg">
            <input
              type="text"
              name="tanggal"
              className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 placeholder-black"
              placeholder="Tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>

          <input
            type="number"
            name="totalTebar"
            placeholder="Total Tebar (ekor)"
            className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            value={formData.totalTebar}
            onChange={handleInputChange}
          />

          <div className="relative rounded-lg">
            <select
              className="block w-full border border-blue-400 rounded-lg p-2 appearance-none"
              name="metodePenebaranBenih"
              value={formData.metodePenebaranBenih}
              onChange={handleInputChange}
            >
              <option value="">Pilih Metode Penebaran Benih</option>
              <option value="luas_kolam">Berdasarkan Luas Kolam (per m² atau m³)</option>
              <option value="pola_penebaran">Berdasarkan Pola Penebaran</option>
              <option value="jumlah_benih">Berdasarkan Jumlah Benih yang Ditebar</option>
            </select>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          {isExpanded && (
            <div className="space-y-4 transition-all duration-300">
              <div className="relative rounded-lg">
                <select
                  className="block w-full border border-blue-400 p-2 appearance-none rounded-lg"
                  name="umurAwal"
                  value={formData.umurAwal}
                  onChange={handleInputChange}
                >
                  <option value="">Umur Awal Hari</option>
                  <option value="7">7 hari</option>
                  <option value="14">14 hari</option>
                  <option value="21">21 hari</option>
                  <option value="30">30 hari</option>
                  <option value="45">45 hari</option>
                  <option value="60">60 hari</option>
                  <option value="lebih">Lebih dari 60 hari</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>

              <input
                type="number"
                name="batasBiomassPerLuas"
                placeholder="Batas biomass per luas (kg/m²)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.batasBiomassPerLuas}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="targetSize"
                placeholder="Target Size (Umur 100)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.targetSize}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="targetSR"
                placeholder="Target SR (%)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.targetSR}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="targetFCR"
                placeholder="Target FCR"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.targetFCR}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="hargaPakan"
                placeholder="Harga Pakan (Rp/kg)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.hargaPakan}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="jumlahAnco"
                placeholder="Jumlah Anco"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.jumlahAnco}
                onChange={handleInputChange}
              />

              <div className='relative'>
                <select className="block w-full border border-blue-400 rounded-md p-2 appearance-none"
                  name='metodePrediksiSR'
                  value={formData.metodePrediksiSR}
                  onChange={handleInputChange}>
                  <option value="">Metode Prediksi SR</option>
                  <option value="method1">Kepadatan & Umur</option>
                  <option value="method2">Kualitas Air</option>
                  <option value="method3">Pakan & Lingkungan</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
              </div>

              <textarea
                name="catatan"
                rows="3"
                placeholder="Catatan"
                className="w-full border rounded-lg p-2 text-black placeholder-black border-blue-600"
                value={formData.catatan}
                onChange={handleInputChange}
              />
            </div>
          )}
          <button
            type="button"
            onClick={toggleExpand}
            className="w-full text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 py-2 mb-10"
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
          <Button type="submit">Simpan</Button>
        </form>

      </div>
    </div>
  );
};


//kematian
export const TambahDataKematianModal = ({ isOpen, onClose }) => {
  const [trackingMethod, setTrackingMethod] = useState('jumlahEkor');
  const [formData, setFormData] = useState({
    kolam: '',
    tanggalTebar: '',
    umur: 0,
    jumlahEkor: '',
    totalBerat: '',
    multiplier: '',
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchUmur = async () => {
      if (isOpen) {
        try {
          const response = await axios.get('YOUR_BACKEND_ENDPOINT_URL/umur');
          if (response.status === 200 && response.data) {
            setFormData((prevData) => ({
              ...prevData,
              umur: response.data.umur,
            }));
          }
        } catch (error) {
          console.error('Error fetching umur data:', error);
        }
      }
    };

    fetchUmur();
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === 'manual') {

      setFormData((prevData) => ({
        ...prevData,
        multiplier: '',
        useManualInput: true,
      }));
    } else {

      setFormData((prevData) => ({
        ...prevData,
        multiplier: value,
        useManualInput: false,
        manualMultiplier: '',
      }));
    }
  };

  const handleTrackingMethodChange = (method) => {
    setTrackingMethod(method);
    if (method === 'jumlahEkor') {
      setFormData((prevData) => ({
        ...prevData,
        totalBerat: '',
        multiplier: '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        jumlahEkor: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = [];

    if (trackingMethod === 'jumlahEkor') {
      if (formData.jumlahEkor === '' || Number(formData.jumlahEkor) <= 0) {
        hasError = true;
        errorMessages.push('Field jumlahEkor tidak boleh kosong atau negatif.');
      }
    } else if (trackingMethod === 'size') {
      if (formData.totalBerat === '' || Number(formData.totalBerat) <= 0) {
        hasError = true;
        errorMessages.push('Field totalBerat tidak boleh kosong atau negatif.');
      }
      if (formData.multiplier === '' || Number(formData.multiplier) <= 0) {
        hasError = true;
        errorMessages.push('Field multiplier tidak boleh kosong atau negatif.');
      }
    }

    if (hasError) {
      setErrors(errorMessages);
      return;
    }

    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT_URL', formData);
      if (response.status === 200) {
        console.log('Data berhasil disimpan', response.data);
        onClose();
      } else {
        console.error('Gagal menyimpan data', response.data);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message || error);
    }
  };

  const convertToKilograms = (weight, unit) => {
    switch (unit) {
      case 'g':
        return weight * 0.001;
      case 'ton':
        return weight * 1000;
      default:
        return weight;
    }
  };

  const calculateTotalDeaths = () => {
    if (trackingMethod === 'jumlahEkor') {
      return parseInt(formData.jumlahEkor) || 0;
    } else {
      const weight = parseFloat(formData.totalBerat) || 0;
      const mult = parseFloat(formData.multiplier) || 0;

      const unit = formData.weightUnit || 'kg';

      const totalWeightInKg = convertToKilograms(weight, unit);

      const internationalAverageWeightPerEkor = 0.25;

      const estimatedTotalDeaths = (totalWeightInKg * mult) / internationalAverageWeightPerEkor;

      return Math.round(estimatedTotalDeaths);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah data Kematian Lele</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kolam Dropdown */}
          <div className="relative">
            <select
              name="kolam"
              value={formData.kolam}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 appearance-none"
            >
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          {/* Tanggal Tebar */}
          <div className="relative">
            <input
              type="text"
              name="tanggalTebar"
              value={formData.tanggalTebar}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 placeholder-black"
              placeholder="Tanggal Tebar"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>

          {/* Umur */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Umur</label>
            <div className="text-2xl font-bold">{formData.umur || 0}</div>
          </div>


          {/* Berdasarkan dan Jumlah Ekor */}
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
                  onChange={() => handleTrackingMethodChange('jumlahEkor')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400"
                />
                <label htmlFor="jumlahEkor" className="text-sm text-gray-700">Jumlah ekor</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="size"
                  name="trackingMethod"
                  value="size"
                  checked={trackingMethod === 'size'}
                  onChange={() => handleTrackingMethodChange('size')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400"
                />
                <label htmlFor="size" className="text-sm text-gray-700">Size</label>
              </div>
            </div>
          </div>
          {trackingMethod === 'size' ? (
            <>
              <div className="relative">
                <input
                  type="Number"
                  name="totalBerat"
                  value={formData.totalBerat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 placeholder-black"
                  placeholder="Total Berat (kg)"
                />
              </div>

              <div>
                <div className='relative'>
                <select
                  name="multiplier"
                  value={formData.useManualInput ? 'manual' : formData.multiplier}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 appearance-none"
                >
                  <option value="">Pilih Pengali</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="manual">Ketik Manual</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
                />
                </div>
                {formData.useManualInput && (
                  <input
                    type="number"
                    name="manualMultiplier"
                    value={formData.manualMultiplier}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 mt-2"
                    placeholder="Masukkan pengali"
                  />
                )}
              </div>
            </>
          ) : (
            <div className="relative">
              <input
                type="text"
                name="jumlahEkor"
                value={formData.jumlahEkor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500"
                placeholder="Jumlah ekor"
              />
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm text-blue-600">*Prediksi potensi kematian Lele yang tidak teridentifikasi.</p>
            <p className="text-sm font-semibold text-gray-600 mt-4">Total kematian (ekor)</p>
            <div className='p-2 ml-12'>{calculateTotalDeaths()}</div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Simpan
          </button>
        </form>

        {errors.length > 0 && (
          <div className="mt-4 text-red-600 space-y-1">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



//penyakit
export const TambahDataPenyakitModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    kolam: '',
    tanggalTebar: '',
    jenisPenyakit: '',
    catatan: '',
  });
  const [images, setImages] = useState([null, null, null]);
  const [errors, setErrors] = useState([]);
  const fileInputRefs = [useRef(), useRef(), useRef()];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageClick = (index) => {
    fileInputRefs[index].current.click();
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = {
        file,
        preview: imageUrl
      };
      setImages(newImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = [];

    for (const key in formData) {
      if (formData[key] === '') {
        hasError = true;
        errorMessages.push(`Field ${key} tidak boleh kosong.`);
      }
    }

    if (hasError) {
      setErrors(errorMessages);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      images.forEach((image, index) => {
        if (image && image.file) {
          formDataToSend.append(`image${index + 1}`, image.file);
        }
      });

      const response = await axios.post('YOUR_BACKEND_ENDPOINT_URL', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Data berhasil disimpan', response.data);
        onClose();
      } else {
        console.error('Gagal menyimpan data', response.data);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message || error);
      setErrors([error.message || 'Terjadi kesalahan saat menyimpan data']);
    }
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

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <select
              name="kolam"
              value={formData.kolam}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 appearance-none"
            >
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
              type="text"
              name="tanggalTebar"
              placeholder='Tanggal Tebar'
              value={formData.tanggalTebar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 placeholder-black"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              name="jenisPenyakit"
              value={formData.jenisPenyakit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 appearance-none"
            >
              <option value="">Jenis Penyakit</option>
              <option value="bintik_putih">Bintik Putih</option>
              <option value="jamur_air">Jamur Air</option>
              <option value="kulit_mengelupas">Kulit Mengelupas</option>
              <option value="aeromonas">Penyakit Aeromonas</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
            placeholder="Catatan"
          />

          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    ref={fileInputRefs[index]}
                    onChange={(e) => handleImageChange(e, index)}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => handleImageClick(index)}
                    className="border-4 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    {images[index] ? (
                      <img
                        src={images[index].preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400">+</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit">Simpan</Button>
        </form>
      </div>
    </div>
  );
};

//pakan
export const TambahDataPakanModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    kolam: '',
    tanggal: '',
    waktu: '',
    puasa: false,
    jumlah: '',
    catatan: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/your-api-endpoint', formData);
      console.log("Form Data Posted Successfully:", response.data);
      onClose(); 
    } catch (error) {
      console.error("Error posting form data:", error);
    }
    
  };

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
            <select
              name="kolam"
              value={formData.kolam}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-blue-500 appearance-none"
            >
              <option value="">Pilih Kolam</option>
              <option value="kolam1">Kolam 1</option>
              <option value="kolam2">Kolam 2</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 placeholder-black"
                placeholder="Tanggal"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
              </div>
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                name="waktu"
                value={formData.waktu}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 placeholder-black"
                placeholder="Waktu"
              />
              <div className="absolute top-2 right-3">
                <FontAwesomeIcon icon={faClock} className="text-blue-500" />
              </div>
            </div>
          </div>

          <Checkbox
            id="puasa"
            label="Puasa"
            checked={formData.puasa}
            onChange={handleInputChange}
            name="puasa"
          />

          <input
            type="number"
            name="jumlah"
            value={formData.jumlah}
            onChange={handleInputChange}
            placeholder="Jumlah (kg)"
            className="block w-full border border-blue-400 rounded-lg p-2 text-blue-600 focus:ring-blue-600 focus:border-blue-600 placeholder-black"
          />

          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleInputChange}
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


//panen
export const TambahDataPanenModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    kolam: '',
    tanggal: '',
    berat: '',
    size: '',
    hargaJual: '',
    status: '',
    catatan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        console.log("Data panen berhasil disimpan");
        onClose();
      } else {
        console.error("Gagal menyimpan data panen");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

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
              name="kolam"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 appearance-none"
              value={formData.kolam}
              onChange={handleChange}
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

          <div className="relative">
            <input
              type="text"
              name="tanggal"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Tanggal panen/parsial"
              value={formData.tanggal}
              onChange={handleChange}
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              name="berat"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Total berat (kg)"
              value={formData.berat}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
          <input
              type="text"
              name="size"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Size (Ekor/Kg)"
              value={formData.size}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              name="hargaJual"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Total harga jual"
              value={formData.hargaJual}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <select
              name="status"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 appearance-none"
              value={formData.status}
              onChange={handleChange}
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
              name="catatan"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Catatan"
              value={formData.catatan}
              onChange={handleChange}
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

//anco
export const TambahJumlahAnco = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    pilihKolam: '',
    tanggalPanenParsial: '',
    waktuPemberianPakan: '',
    waktuCekAnco: '',
    catatan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        onClose();
      } else {
        console.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error:", error);
    }

   
  };

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
          {/* Kolam Select */}
          <div className="relative">
            <select
              name="pilihKolam"
              value={formData.pilihKolam}
              onChange={handleChange}
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

          {/* Tanggal Panen Parsial */}
          <div className="relative flex-grow">
            <input
              type="tanggal"
              name="tanggalPanenParsial"
              value={formData.tanggalPanenParsial}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
              placeholder='Tanggal Panen/Parsial'
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
            </div>
          </div>

          {/* Waktu Pemberian Pakan */}
          <div className="relative">
            <select
              name="waktuPemberianPakan"
              value={formData.waktuPemberianPakan}
              onChange={handleChange}
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

          {/* Waktu Cek Anco */}
          <div className="relative flex-grow">
            <input
              type="text"
              name="waktuCekAnco"
              value={formData.waktuCekAnco}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-black"
              placeholder='Waktu Cek Anco'
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faClock} className="text-blue-500" />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
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




