import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faClock, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

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

//siklus
export const TambahLeleSegerModal = ({ isOpen, onClose, initialData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedKolam, setSelectedKolam] = useState("");
  const [formData, setFormData] = useState(initialData || {
    kolam_id: selectedKolam,
    lama_persiapan: '',
    total_tebar: '',
    metode_penebaran_benih: '',
    umur_awal: '',
    batas_biomass_per_luas: '',
    target_size: '',
    target_sr: '',
    target_fcr: '',
    harga_pakan: '',
    jumlah_anco: '',
    metode_prediksi_sr: '',
    catatan: '',
    tanggal: '',
  });
  console.log(initialData);

  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);





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
    console.log(formData);

    let dateValue = formData.tanggal;
    if (!dateValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];


    if (isNaN(new Date(formattedDate).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    const dataToSend = {
      ...formData,
      tanggal: formattedDate,
    };

    for (const key in formData) {
      if (formData[key] === '' || formData[key] === null || formData[key] === undefined || (typeof formData[key] === 'number' && formData[key] < 0)) {
        hasError = true;
        errorMessages.push(`Field ${key} tidak boleh kosong atau negatif.`);
      }
    }



    if (hasError) {
      setErrors(errorMessages);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan',
        text: errorMessages.join('\n'),
      });
      return;
    }

    try {
      const form = new FormData();
      Object.keys(dataToSend).forEach(key => {
        form.append(key, dataToSend[key]);
      });
      const response = await axios.post('https://nusaira-be.vercel.app/api/siklus', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log('Data berhasil disimpan', response.data);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data berhasil disimpan!',
        });
        onClose();
      } else {
        console.error('Gagal menyimpan data', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi masalah saat menyimpan data.',
        });
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message || error);
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status:', error.response.status);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Server',
          text: error.response.data.message || 'Terjadi kesalahan pada server.',
        });
      } else if (error.request) {
        console.error('Request error:', error.request);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan Request',
          text: 'Permintaan tidak berhasil dikirim.',
        });
      } else {
        console.error('Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan',
          text: error.message,
        });
      }
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
          <h2 className="text-xl font-bold">Mulai Siklus</h2>
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
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
            </select>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>


          <input
            type="number"
            name="lama_persiapan"
            placeholder="Lama Persiapan (Hari)"
            className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            min="1"
            value={formData.lama_persiapan}
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
            name="total_tebar"
            placeholder="Total Tebar (ekor)"
            className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
            value={formData.total_tebar}
            onChange={handleInputChange}
          />

          <div className="relative rounded-lg">
            <select
              className="block w-full border border-blue-400 rounded-lg p-2 appearance-none"
              name="metode_penebaran_benih"
              value={formData.metode_penebaran_benih}
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
                  name="umur_awal"
                  value={formData.umur_awal}
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
                name="batas_biomass_per_luas"
                placeholder="Batas biomass per luas (kg/m²)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.batas_biomass_per_luas}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="target_size"
                placeholder="Target Size (Umur 100)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.target_size}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="target_sr"
                placeholder="Target SR (%)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.target_sr}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="target_fcr"
                placeholder="Target FCR"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.target_fcr}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="harga_pakan"
                placeholder="Harga Pakan (Rp/kg)"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.harga_pakan}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="jumlah_anco"
                placeholder="Jumlah Anco"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full border border-blue-400 rounded-lg p-2 text-black placeholder-black"
                value={formData.jumlah_anco}
                onChange={handleInputChange}
              />

              <div className='relative'>
                <select className="block w-full border border-blue-400 rounded-md p-2 appearance-none"
                  name='metode_prediksi_sr'
                  value={formData.metode_prediksi_sr}
                  onChange={handleInputChange}>
                  <option value="">Metode Prediksi SR</option>
                  <option value="kepadatan_umur">Kepadatan & Umur</option>
                  <option value="Kualitas_air">Kualitas Air</option>
                  <option value="pakan_lingkungan">Pakan & Lingkungan</option>
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
  const [trackingMethod, setTrackingMethod] = useState('jumlah_ekor');
  const [selectedKolam, setSelectedKolam] = useState("");
  const [formData, setFormData] = useState({
    kolam_id: selectedKolam,
    tanggal_tebar: '',
    umur: 0,
    jumlah_ekor: 0,
    total_berat: 0,  
    multiplier: 0,
});


  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);

  const [errors, setErrors] = useState([]);
  

  useEffect(() => {
    const fetchUmur = async () => {
      if (isOpen) {
        try {
          const response = await axios.get('https://nusaira-be.vercel.app/api/siklus');
          if (response.status === 200 && response.data?.length > 0) {
            const { umur_awal } = response.data[0];
            if (umur_awal !== undefined) {
              const today = new Date();
              const startDate = new Date();
              startDate.setDate(startDate.getDate() - umur_awal);
              const ageInMilliseconds = today - startDate;
              const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
              setFormData((prevData) => ({
                ...prevData,
                umur: ageInDays,
              }));
            }
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
        multiplier: 0,
        useManualInput: true,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        multiplier: value,
        useManualInput: false,
        manualMultiplier: 0,
      }));
    }
  };

  const handleTrackingMethodChange = (method) => {
    setTrackingMethod(method);
    if (method === 'jumlah_ekor') {
      setFormData((prevData) => ({
        ...prevData,
        total_berat: 0,
        multiplier: 0,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        jumlah_ekor: 0,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = [];
    let dateValue = formData.tanggal_tebar;
    if (!dateValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];


    if (isNaN(new Date(formattedDate).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    const dataToSend = {
      ...formData,
      tanggal_tebar: formattedDate
    };

    if (trackingMethod === 'jumlah_ekor') {
      if (formData.jumlah_ekor === '' || Number(formData.jumlah_ekor) <= 0) {
        hasError = true;
        errorMessages.push('Field jumlah Ekor tidak boleh kosong atau negatif.');
      }
    } else if (trackingMethod === 'size') {
      if (formData.total_berat === '' || Number(formData.total_berat) <= 0) {
        hasError = true;
        errorMessages.push('Field total berat tidak boleh kosong atau negatif.');
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
      const form = new FormData();
      Object.keys(dataToSend).forEach(key => {
        form.append(key, dataToSend[key]);
      });
      const response = await axios.post('https://nusaira-be.vercel.app/api/data-kematian', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const { message, result } = response.data;

        if (message && message.includes('berhasil')) {

          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan!',
            text: message || 'Data kematian lele berhasil dikirim.',
            confirmButtonColor: '#3085d6',
          });
          onClose();
        } else {
          console.error('Gagal menyimpan data:', response.data);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Menyimpan Data!',
            text: message || 'Terjadi kesalahan saat menyimpan data kematian.',
            confirmButtonColor: '#d33',
          });
        }
      } else {
        console.error('Gagal menyimpan data', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menyimpan Data!',
          text: 'Terjadi kesalahan saat menyimpan data kematian.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {

      console.error('Terjadi kesalahan:', error.message || error);
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('General error:', error.config);
      }

      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Data!',
        text: error.message || 'Terjadi kesalahan pada koneksi atau server.',
        confirmButtonColor: '#d33',
      });
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
    if (trackingMethod === 'jumlah_ekor') {
      return parseInt(formData.jumlah_ekor) || 0;
    } else {
      const weight = parseFloat(formData.total_berat) || 0;
      const mult = parseFloat(formData.multiplier) || 0;
      const unit = formData.weightUnit || 'kg';
      const totalWeightInKg = convertToKilograms(weight, unit);
      const internationalAverageWeightPerEkor = 0.25;
      return Math.round((totalWeightInKg * mult) / internationalAverageWeightPerEkor);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Data Kematian Lele</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* kolam_id Dropdown */}
          <div className="relative">
          <select
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
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
              name="tanggal_tebar"
              value={formData.tanggal_tebar}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
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
                  id="jumlah_ekor"
                  name="trackingMethod"
                  value="jumlah_ekor"
                  checked={trackingMethod === 'jumlah_ekor'}
                  onChange={() => handleTrackingMethodChange('jumlah_ekor')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400"
                />
                <label htmlFor="jumlah_ekor" className="text-sm text-gray-700">Jumlah ekor</label>
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

            {trackingMethod === 'size' ? (
              <>
                <div className="relative">
                  <input
                    type="Number"
                    name="total_berat"
                    value={formData.total_berat}
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
                      name="multiplier"
                      value={formData.multiplier}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 mt-2 placeholder-black"
                      placeholder="Masukkan pengali"
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  name="jumlah_ekor"
                  value={formData.jumlah_ekor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:outline-none  focus:ring-blue-500 placeholder-black"
                  placeholder="Jumlah ekor"
                />
              </div>
            )}
          </div>
          <div className="mt-6">
            <p className="text-sm text-blue-600">*Prediksi potensi kematian Lele yang tidak teridentifikasi.</p>
            <p className="text-sm font-semibold text-gray-600 mt-4">Total kematian (ekor)</p>
            <div className='p-2 ml-12'>{calculateTotalDeaths()}</div>
          </div>
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};



//penyakit
export const TambahDataPenyakitModal = ({ isOpen, onClose }) => {
  const [selectedKolam, setSelectedKolam] = useState("");
  const [formData, setFormData] = useState({
    kolam_id: selectedKolam,
    tanggal_tebar: '',
    jenis_penyakit: '',
    catatan: '',
  });
  const [images, setImages] = useState([null, null, null]);
  const [errors, setErrors] = useState([]);
  const fileInputRefs = [useRef(), useRef(), useRef()];

  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);

  

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
      if (file.size > 5 * 1024 * 1024) {
        setErrors([...errors, `File ${file.name} terlalu besar. Maksimal 5MB.`]);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors([...errors, `File ${file.name} bukan gambar yang valid.`]);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = {
        file,
        preview: imageUrl,
      };
      setImages(newImages);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = [];
    const fieldErrors = {};


    let dateValue = formData.tanggal_tebar;
    if (!dateValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];


    if (isNaN(new Date(formattedDate).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    const dataToSend = {
      ...formData,
      tanggal_tebar: formattedDate
    };

    if (!dataToSend.kolam_id) fieldErrors.kolam_id = 'Kolam ID tidak boleh kosong.';
    if (!dataToSend.tanggal_tebar) fieldErrors.tanggal_tebar = 'Tanggal Tebar tidak boleh kosong.';
    if (!dataToSend.jenis_penyakit) fieldErrors.jenis_penyakit = 'Jenis Penyakit tidak boleh kosong.';

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

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
      Object.keys(dataToSend).forEach(key => {
        formDataToSend.append(key, dataToSend[key]);
      });

      images.forEach((image) => {
        if (image && image.file) {
          formDataToSend.append('images', image.file);
        }
      });

      const response = await axios.post('https://nusaira-be.vercel.app/api/penyakit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Data berhasil disimpan', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Data berhasil disimpan!',
          text: 'Penyakit entry telah berhasil dibuat.',
        });
        console.log('Formatted Date:', formattedDate);

        setFormData({
          kolam_id: '',
          tanggal_tebar: '',
          jenis_penyakit: '',
          catatan: '',
        });
        setImages([null, null, null]);
        setErrors([]);
        onClose();
      } else {
        console.error('Gagal menyimpan data', response.data);
        setErrors(['Terjadi kesalahan saat menyimpan data']);
      }
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message || 'Terjadi kesalahan pada server']);
      } else {
        setErrors(['Terjadi kesalahan saat menyimpan data']);
      }
    }
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


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
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          <div className="relative flex-grow">
            <input
              type="text"
              name="tanggal_tebar"
              placeholder='Tanggal Tebar'
              value={formData.tanggal_tebar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 placeholder-black"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
            </div>
          </div>

          <div className="relative">
            <select
              name="jenis_penyakit"
              value={formData.jenis_penyakit}
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
  const [selectedKolam, setSelectedKolam] = useState("");
  const [formData, setFormData] = useState({
    kolam_id: selectedKolam,
    tanggal: '',
    waktu: '',
    puasa: false,
    jumlah: '',
    catatan: '',
  });

  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);

  const [errors, setErrors] = useState([]);

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

    let dateValue = formData.tanggal;
    let timeValue = formData.waktu;
    if (!dateValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];

    if (isNaN(new Date(formattedDate).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }


    if (!timeValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Waktu belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }


    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(timeValue)) {
      Swal.fire({
        title: 'Error!',
        text: 'Format waktu tidak valid, gunakan format HH:MM.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    const dataToSend = {
      ...formData,
      tanggal: formattedDate,
    };

    try {
      const response = await axios.post('https://nusaira-be.vercel.app/api/data-pakan', dataToSend);
      console.log("Form Data Posted Successfully:", response.data);

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil dikirim!',
        text: 'Form data telah berhasil disimpan.',
      });

      onClose();
    } catch (error) {
      console.error("Error posting form data:", error);

      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan',
        text: 'Gagal mengirim data, coba lagi.',
      });
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
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
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

          {/* Puasa Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="puasa"
              name="puasa"
              checked={formData.puasa}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600"
            />
            <label htmlFor="puasa" className="text-sm text-gray-700">Puasa</label>
          </div>

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

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">Simpan</button>
        </form>
      </div>
    </div>
  );
};


//panen
export const TambahDataPanenModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [selectedKolam, setSelectedKolam] = useState("");
  const [formData, setFormData] = useState({
    kolam_id: selectedKolam,
    tanggal: '',
    berat: '',
    size: '',
    harga_jual: '',
    status: '',
    catatan: ''
  });

  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dateValue = formData.tanggal;
    if (!dateValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];


    if (isNaN(new Date(formattedDate).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }


    const dataToSend = {
      ...formData,
      tanggal: formattedDate
    };

    const form = new FormData();
    Object.keys(dataToSend).forEach(key => {
      form.append(key, dataToSend[key]);
    });

    try {
      const response = await axios.post("https://nusaira-be.vercel.app/api/data-panen", form, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log("Data panen berhasil disimpan");
        Swal.fire({
          title: 'Success!',
          text: 'Data panen berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        onClose();
      } else {
        console.error("Gagal menyimpan data panen");
        Swal.fire({
          title: 'Error!',
          text: 'Gagal menyimpan data panen.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Swal.fire({
        title: 'Oops!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
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
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
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
              name="harga_jual"
              className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-blue-500 placeholder-black"
              placeholder="Total harga jual"
              value={formData.harga_jual}
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
  const [selectedKolam, setSelectedKolam] = useState("");

  const [formData, setFormData] = useState({
    kolam_id: selectedKolam,
    tanggal_panen_parsial: '',
    waktu_pemberian_pakan: '',
    waktu_cek_anco: '',
    catatan: ''
  });

  const [kolams, setKolams] = useState([]);

  useEffect(() => {
    const fetchKolams = async () => {
      try {
        const response = await fetch(`https://nusaira-be.vercel.app/api/tambak`);
        const data = await response.json();

        console.log("API Response:", data);
        const kolams = data && data[0] && data[0].kolamDetails ? data[0].kolamDetails : [];

        console.log("Kolams Data:", kolams);

        setKolams(kolams);
      } catch (error) {
        console.error('Error fetching kolams:', error);
      }
    };

    fetchKolams();
  }, []);


  useEffect(() => {
    console.log("Kolams setelah set: ", kolams);
  }, [kolams]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      kolam_id: selectedKolam,
    }));
  }, [selectedKolam]);

  const [errors, setErrors] = useState([]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dateValue = formData.tanggal_panen_parsial;
    let timeValue = formData.waktu_cek_anco;
    if (!dateValue || !timeValue) {
      Swal.fire({
        title: 'Error!',
        text: 'Tanggal atau Waktu belum diisi.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let [day, month, year] = dateValue.split("-");
    if (!day || !month || !year || isNaN(new Date(`${year}-${month}-${day}`).getTime())) {
      Swal.fire({
        title: 'Error!',
        text: 'Format tanggal tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    let formattedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];

    let [hour, minute] = timeValue.split(":");
    if (!hour || !minute || isNaN(parseInt(hour)) || isNaN(parseInt(minute))) {
      Swal.fire({
        title: 'Error!',
        text: 'Format waktu tidak valid.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }


    let formattedTime = `${hour}:${minute}:00`;

    const dataToSend = {
      ...formData,
      tanggal_panen_parsial: formattedDate,
      waktu_cek_anco: formattedTime
    };

    try {
      const response = await axios.post("https://nusaira-be.vercel.app/api/anco", dataToSend, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log("Data berhasil disimpan");
        Swal.fire({
          title: 'Success!',
          text: 'Data berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        onClose();
      } else {
        console.error("Gagal menyimpan data");
        Swal.fire({
          title: 'Error!',
          text: 'Gagal menyimpan data.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      Swal.fire({
        title: 'Oops!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
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
              className="block w-full border rounded-lg p-2 appearance-none"
              name="kolam_id"
              value={selectedKolam}
              onChange={(e) => setSelectedKolam(e.target.value)}
            >
              <option value="">Pilih Kolam</option>
              {kolams.length > 0 ? (
                kolams.map((kolam, index) => (
                  <option key={index} value={kolam.id}>
                    {kolam.namaKolam}
                  </option>
                ))
              ) : (
                <option disabled>No Kolams Available</option>
              )}
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-md pointer-events-none"
            />
          </div>

          {/* tanggal_panen_parsial Panen Parsial */}
          <div className="relative flex-grow">
            <input
              type="text"
              name="tanggal_panen_parsial"
              value={formData.tanggal_panen_parsial}
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
              name="waktu_pemberian_pakan"
              value={formData.waktu_pemberian_pakan}
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
              name="waktu_cek_anco"
              value={formData.waktu_cek_anco}
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




