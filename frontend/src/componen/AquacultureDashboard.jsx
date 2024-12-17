import '@fortawesome/fontawesome-free/css/all.min.css';
import { ChevronDown, Cpu, RefreshCw } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchKematian, fetchPanen, fetchSiklus, fetchTambak } from '../../service/AxiosConfig';
import { Card } from './CardManagement';
import MetricCard from './MetricsCard';
import RentangRasioTooltip from './RentangTooltip';
import { useNavigate } from 'react-router-dom';
import Error404Page from './ErrorPage';

const Button = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white rounded-lg p-2 ${className}`}
    >
      {children}
    </button>
  );
};

const AquacultureDashboard = () => {
  const [tambakData, setTambakData] = useState([]);
  const [siklusData, setSiklusData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [selectedKolam, setSelectedKolam] = useState(null);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('mbw');
  const [docRange, setDocRange] = useState({ start: 0, end: 100 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const value = progress;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const tambak = await fetchTambak();
        if (tambak && Array.isArray(tambak)) {
          const validTambak = tambak.map(t => ({
            ...t,
            kolamDetails: t.kolamDetails.filter(
              kolam => kolam.id && kolam.namaKolam
            ),
          }));
          setTambakData(validTambak);
        }

        const siklus = await fetchSiklus();
        setSiklusData(siklus);

        const kematian = await fetchKematian();
        const panen = await fetchPanen();

        if (selectedKolam === null && tambak[0]) {
          setSelectedKolam(tambak[0].kolamDetails[0].id);
        }

        const metricsData = calculateMetrics(siklus, tambak, kematian, panen);
        setMetrics(metricsData);

        setProgress(calculateProgress(metricsData));
        const growthDatas = generateGrowthData(metricsData);
        setGrowthData(growthDatas);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotalForField = (kematian, kolam_id, fieldName) => {
    return kematian.filter(k => k.kolam_id === kolam_id)
      .reduce((sum, k) => {
        if (typeof k[fieldName] !== 'undefined' && k[fieldName] !== 0) {
          return sum + k[fieldName];
        } else {
          return sum;
        }
      }, 0);
  };

  const calculateMetrics = (siklus, tambak, kematian, panen) => {
    return siklus.map((s) => {
      // console.log(`Menghitung untuk siklus ID: ${s.id_siklus}`);

      const kolam = tambak.find((t) => t.kolamDetails.some((k) => k.id === s.kolam_id))?.kolamDetails.find((k) => k.id === s.kolam_id);
      const matchedPanen = panen.find((p) => p.id_siklus === s.id_siklus);

      const totalKematianEkor = getTotalForField(kematian, s.kolam_id, 'jumlah_ekor');
      const totalKematianSize = getTotalForField(kematian, s.kolam_id, 'size');

      // console.log("Total kematian (jumlah_ekor) untuk kolam ID", s.kolam_id, "adalah:", totalKematianEkor);
      // console.log("Total kematian (size) untuk kolam ID", s.kolam_id, "adalah:", totalKematianSize);

      const jumlahTebar = s.total_tebar || 0;
      const jumlahIkanHidup = Math.max(jumlahTebar - Math.max(totalKematianEkor, totalKematianSize), 0);

      return {
        kolamNama: kolam?.namaKolam || "-",
        fcr: s.target_fcr || "-",
        adg: s.umur_awal > 0 ? (matchedPanen?.berat / 1000 / s.umur_awal).toFixed(2) : "-",
        sr: s.target_sr ? parseFloat(s.target_sr).toFixed(0) : "0",
        mbw: matchedPanen?.berat && jumlahIkanHidup > 0 ? (matchedPanen.berat / jumlahIkanHidup).toFixed(2) : "-",
        size: matchedPanen?.size || "-",
        kolamId: kolam?.id,
        tebaran: s.total_tebar || "-"
      };
    });
  };

  const calculateProgress = (metricsData) => {
    const requiredFields = ['adg', 'fcr', 'mbw', 'sr', 'size'];

    const completedMetrics = metricsData.filter((metric) =>
      requiredFields.every((field) =>
        metric[field] !== '-' && metric[field] !== null && metric[field] !== undefined
      )
    );

    const total = metricsData.length;
    const filled = completedMetrics.length;

    return Math.round((filled / total) * 100);
  };

  const generateGrowthData = (metrics) => {
    const data = metrics.map((m) => ({
      doc: m.kolamNama,
      mbw: Number(m.mbw) || 0,
      adg: Number(m.adg) || 0,
      fcr: Number(m.fcr) || 0,
      sr: Number(m.sr) || 0,
      size: Number(m.size) || 0
    }));
    return data;
  };

  const filteredGrowthData = useMemo(() => {
    return growthData.filter((item) => {
      const metricValue = Number(item[selectedMetric]) || 0;
      // console.log(`Metric value for ${item.doc}:`, metricValue);
      return metricValue >= docRange.start && metricValue <= docRange.end;
    });
  }, [growthData, docRange, selectedMetric]);


  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
  };

  const handleRefresh = () => {
    setDocRange({ start: 0, end: 100 });
  };


  useEffect(() => {
    if (selectedKolam) {
      const newFilteredMetrics = metrics.filter((metric) => String(metric.kolamId) === String(selectedKolam));
      setFilteredMetrics(newFilteredMetrics);
    }
  }, [selectedKolam, metrics]);

  const handleKolamChange = (e) => {
    const kolamId = e.target.value;
    setSelectedKolam(kolamId);
  };



  const handleClick = () => {
    navigate('/LaporanBudidaya');
  };

  if (isError) {
    return <Error404Page />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="w-full max-w-6xl p-4 mb-6">
      <MetricCard />
      {/* Main Content Card */}
      <Card className='border-2 w-[1120px] mt-6 mr-20 ml-2'>
        <div className="flex justify-between items-center m-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Kolam:</span>
              <div className="relative">
                <select className="h-8 px-8 border border-blue-600 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-600 appearance-none"
                  onChange={handleKolamChange}
                  value={selectedKolam || ''}>
                  {tambakData.flatMap((tambak) =>
                    tambak.kolamDetails
                      .filter((kolam) => kolam.id && kolam.namaKolam)
                      .map((kolam) => (
                        <option key={kolam.id} value={kolam.id}>
                          {kolam.namaKolam}
                        </option>
                      ))
                  )}

                </select>
                <ChevronDown className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-blue-600" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">RFID:</span>
                <Cpu className="h-4 w-4 text-blue-500" />
              </div>

            </div>
            <Link to="/PengaturanTambak" className="text-blue-500">Detail Tambak</Link>
          </div>
          <div className="flex space-x-2">
            <h4 className='text-gray-500'>Data budidaya</h4>
          </div>
        </div>
        <hr className="w-[100vw] border-gray-300 border" style={{ position: "relative", left: "50%", transform: "translateX(-50%)" }} />
        <div className="flex gap-4 w-full">
          {/* Kolom Kiri - Statistik */}
          <div className="flex-1 space-y-4 m-6">
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span>DoC</span>
                <span>{value}/100</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-lg">
                <div
                  className="h-2 bg-blue-500 rounded-lg"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
            <div className="">
              {filteredMetrics.length > 0 ? (
                filteredMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <span>Tebaran:</span>
                      <span className='mr-2'>{metric.tebaran || '-'}</span>
                    </div>
                    <div className="text-lg font-medium mt-6 mb-2">Estimasi pertumbuhan</div>
                    <div className="flex justify-between bg-blue-50 p-2">
                      <span>Target FCR:</span>
                      <span>{metric.fcr || '-'}</span>
                    </div>
                    <div className="flex justify-between bg-blue-200 p-2">
                      <span>ADG:</span>
                      <span>{metric.adg || '-'} g/hari</span>
                    </div>
                    <div className="flex justify-between bg-blue-100 p-2">
                      <span>Target SR:</span>
                      <span>{metric.sr || '-'}%</span>
                    </div>
                    <div className="flex justify-between bg-blue-200 p-2">
                      <span>MBW:</span>
                      <span>{metric.mbw || '-'} g/ekor</span>
                    </div>
                    <div className="flex justify-between bg-blue-100 p-2">
                      <span>Size:</span>
                      <span>{metric.size || '-'} kg/ekor</span>
                    </div>
                  </div>
                ))
              ) : (
                <div>No metrics found for the selected kolam.</div>
              )}
            </div>

            <Button className="w-full bg-blue-500" onClick={handleClick}>
              Lihat Detail Laporan
            </Button>
            <div className="flex justify-center">
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <Link to="/DaftarKolam">Tambahkan Siklus Baru</Link>
              </button>
            </div>

          </div>
          <div className="w-px bg-gray-300 self-stretch m-0"></div>
          {/* Kolom Kanan - Grafik */}
          <div className="flex-1 space-y-6 m-6 w-[800px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <span>Menampilkan:</span>
                <div className="relative">
                  <select
                    className="h-8 px-2 w-[150px] border border-blue-600 rounded-md bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-600 appearance-none"
                    value={selectedMetric}
                    onChange={handleMetricChange}
                  >
                    <option value="mbw">MBW (Gram)</option>
                    <option value="adg">ADG</option>
                    <option value="fcr">FCR</option>
                    <option value="sr">SR</option>
                    <option value="size">Size</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2 pointer-events-none h-4 w-4 text-blue-600" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <RentangRasioTooltip />
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-12 h-8 bg-blue-200 rounded-lg px-2 text-center"

                    value={docRange.start}
                    onChange={(e) => setDocRange(prev => ({ ...prev, start: Number(e.target.value) }))}
                    min="0"
                    max="100"
                    style={{ appearance: 'none', MozAppearance: 'none', WebkitAppearance: 'none' }}
                  />
                  <span>—</span>
                  <input
                    type="number"
                    className="w-14 h-8 bg-blue-200 rounded-lg px-2 text-center"
                    value={docRange.end}
                    onChange={(e) => setDocRange(prev => ({ ...prev, end: Number(e.target.value) }))}
                    min="0"
                    max="100"
                    style={{ appearance: 'none', MozAppearance: 'none', WebkitAppearance: 'none' }}
                  />

                  <button
                    className="h-8 w-8 p-0 text-center flex items-center justify-center bg-blue-200 rounded-full ml-4"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grafik BarChart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredGrowthData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doc" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    const units = {
                      MBW: "g/ekor",
                      ADG: "g/hari",
                      SIZE: "kg/ekor",
                      SR: "%",
                      FCR: "",
                    };
                    const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                    const unit = units[name.toUpperCase()] || "";
                    return [`${value} ${unit}`, displayName];
                  }}
                  cursor={{ fill: "rgba(200, 200, 200, 0.3)" }}
                />
                <Bar
                  dataKey={selectedMetric}
                  fill="#3b82f6"
                  name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1).toLowerCase()}
                  label={{ position: "top", fill: "#3b82f6", fontSize: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
            {/* Legenda */}
            <div className="flex justify-center mt-4 space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>
                  {selectedMetric === "size"
                    ? "Size"
                    : selectedMetric.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquacultureDashboard;