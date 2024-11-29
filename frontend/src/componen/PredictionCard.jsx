import React, { useState, useEffect } from 'react';
import { fetchCityPrediction } from '../../service/AxiosConfig';
import PriceTrendCard from '../componen/PriceTrendCard';

const PriceTrendsDashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cities = [
        "Boyolali",
        "Cilacap",
        "Kebumen",
        "Bandung",
        "Bekasi",
        "Bogor",
        "Cirebon",
        "Subang",
        "Tulungagung",
        "Jember",
        "Malang",
        "Blitar",
        // "Kediri",
        // "Magelang"
      ];

      const cityData = [];

      for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        try {
          const response = await fetchCityPrediction(city);
          // console.log(`Response untuk ${city}:`, response);

          cityData.push({
            city,
            predictions: response.map(item => ({
              month: item.month,
              prediction: parseFloat(item.prediction),
            })),
          });

        } catch (err) {
          console.error(`Error fetching data for ${city}:`, err);
        }
      }

      if (cityData.length === 0) {
        throw new Error("Semua koneksi gagal. Tidak ada data yang dapat ditampilkan.");
      }

      setPredictions(cityData);

    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Gagal memuat data</h2>
        <p className="text-gray-600">{error}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleRetry}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 ml-4 mr-4">
      <h2 className="text-xl font-semibold mb-2">Tren Harga Lele 2024</h2>
      <span className='mb-6'>Analisis tren harga lele yang memberikan gambaran lebih luas tentang estimasi pergerakan harga berdasarkan data saat ini.</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {predictions.map((data) => (
          <div key={data.city}>
            <PriceTrendCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTrendsDashboard;
