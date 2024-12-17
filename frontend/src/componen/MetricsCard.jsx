import React, { useEffect, useState, useRef } from 'react';
import { fetchTambak, fetchSiklus, fetchPakan, fetchPanen } from '../../service/AxiosConfig'; 
import Error404Page from './ErrorPage';

const MetricCard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [metrics, setMetrics] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);  
      setIsError(false);   

      try {
        const tambak = await fetchTambak();
        const siklus = await fetchSiklus();
        const pakan = await fetchPakan();
        const panen = await fetchPanen();

        const estimasiBiomassa = tambak[0]?.kolamDetails.reduce(
          (total, kolam) =>
            total +
            (parseFloat(kolam.panjang) *
              parseFloat(kolam.lebar) *
              parseFloat(kolam.kedalaman)) / 1000,
          0
        );

        const totalPakan = pakan.reduce(
          (total, item) => total + parseFloat(item.jumlah || 0),
          0
        );

        const totalPanen = panen.reduce(
          (total, item) => total + parseFloat(item.berat || 0),
          0
        );

        const estimasiNilaiJual = panen.reduce(
          (total, item) =>
            total + parseFloat(item.berat || 0) * parseFloat(item.harga_jual),
          0
        );

        const estimasiSR = siklus[0]?.target_sr || 0;

        const formatRupiah = (number) =>
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(number);

        const formatWithoutDecimal = (number) => Math.round(number);

        setMetrics([
          {
            id: 1,
            label: "Estimasi Biomassa",
            value: `${estimasiBiomassa.toFixed(2)} kg`,
            unit: "dari semua kolam",
            icon: "fas fa-weight-hanging",
            color: "text-blue-500",
          },
          {
            id: 2,
            label: "Panen Kumulatif",
            value: `${totalPanen.toFixed(2)} kg`,
            unit: "dari semua kolam",
            icon: "fas fa-fish",
            color: "text-green-500",
          },
          {
            id: 3,
            label: "Pakan Kumulatif",
            value: `${totalPakan.toFixed(2)} kg`,
            unit: "dari semua kolam",
            icon: "fas fa-utensils",
            color: "text-yellow-500",
          },
          {
            id: 4,
            label: "Estimasi SR",
            value: `${formatWithoutDecimal(estimasiSR)}%`,
            unit: "dari target SR",
            icon: "fas fa-chart-line",
            color: "text-red-500",
          },
          {
            id: 5,
            label: "Estimasi Nilai Jual",
            value: formatRupiah(estimasiNilaiJual),
            unit: "Total dari semua panen",
            icon: "fas fa-database",
            color: "text-cyan-500",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);  
      } finally {
        setIsLoading(false);  
      }
    };

    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return <Error404Page />;
  }

  
  const handleMouseDown = (e) => {
    const isCard = e.target.closest('.metric-card');

    if (isCard) {
      setDragDistance(0);
      return;
    }

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    setDragDistance(Math.abs(walk));
  };

  return (
    <div
      ref={sliderRef}
      className="overflow-x-auto flex space-x-4 py-4 cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative border-2 border-gray-300 min-w-[268px] mx-2 select-none metric-card`}
        >
          <div className={`absolute top-2 right-2 ${metric.color} rounded-full p-2`}>
            <i className={`${metric.icon} ${metric.color} text-lg`}></i>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-2">{metric.label}</h4>
            <p className={`${metric.color} text-2xl font-bold`}>{metric.value}</p>
          </div>
          <p className="text-gray-500 text-sm">{metric.unit}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
