import React, { useState, useEffect } from "react";
import { fetchTambak, fetchSiklus, fetchKematian, fetchPanen } from '../../service/AxiosConfig';


const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const FishTable = ({ filterTerm = "" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [banner, setBanner] = useState(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      setBanner(null);
  
      const cachedData = sessionStorage.getItem("siklusData");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        setRefreshing(false);
        return;
      }
  
      const [tambakData, siklusData, kematianData, panenData] = await Promise.all([
        fetchTambak(),
        fetchSiklus(),
        fetchKematian(),
        fetchPanen(),
        
      ]);
  
      if (!Array.isArray(siklusData) || !Array.isArray(panenData) || !Array.isArray(kematianData) || !Array.isArray(tambakData)) {
        throw new Error("Data tidak valid");
      }
  
      const formattedData = siklusData.map((siklus) => {
        const kolamId = siklus.kolam_id;
        const matchedTambakData = tambakData.find((tambak) =>
          tambak.kolamDetails?.some((kolam) => kolam.id === kolamId)
        );
  
        const kolamData = matchedTambakData?.kolamDetails.find((kolam) => kolam.id === kolamId);
        const kolamNama = kolamData?.namaKolam || "-";
  
        const panenDataForSiklus = panenData.find((panen) => panen.id_siklus === siklus.id_siklus);
  
        const kematianDataForSiklus = kematianData.filter((kematian) => kematian.id_siklus === siklus.id_siklus);
        const totalKematianEkor = kematianDataForSiklus.reduce((sum, kematian) => sum + (kematian.jumlah_ekor || 0), 0);
  
        const jumlahTebar = siklus.total_tebar || 0;
        const jumlahIkanHidup = Math.max(jumlahTebar - totalKematianEkor, 0);
  
        const mbw = panenDataForSiklus && jumlahIkanHidup > 0 && panenDataForSiklus.berat > 0
          ? (Number(panenDataForSiklus.berat) / jumlahIkanHidup / 1000).toFixed(5)
          : "-";
  
        const adg = siklus.tanggal && siklus.umur_awal > 0 && panenDataForSiklus?.berat
          ? (Number(panenDataForSiklus.berat) / 1000 / siklus.umur_awal).toFixed(5)
          : "-";
  
        const hargaPerIkan = panenDataForSiklus?.harga_jual
          ? `Rp. ${new Intl.NumberFormat("id-ID").format(panenDataForSiklus.harga_jual)}`
          : "-";
  
        return {
          kolamId,
          kolamNama,
          kolam: kolamNama,
          umur: siklus.umur_awal || "-",
          tglTebar: formatDate(siklus.tanggal),
          tglSelesai: formatDate(
            new Date(new Date(siklus.tanggal).getTime() + siklus.lama_persiapan * 24 * 60 * 60 * 1000)
          ),
          tebaran: siklus.total_tebar || "-",
          fcr: siklus.target_fcr || "-",
          adg,
          mbw,
          size: panenDataForSiklus?.size || "-",
          hargaPerIkan,
        };
      });
  
      setData(formattedData);
      sessionStorage.setItem("siklusData", JSON.stringify(formattedData));
  
      const hasInvalidData = formattedData.some((row) => {
        return (
          row.tebaran === "-" ||
          row.fcr === "-" ||
          row.adg === "-" ||
          row.mbw === "-" ||
          row.size === "-" ||
          row.tebaran < 0 ||
          row.fcr < 0 ||
          row.adg < 0 ||
          row.mbw < 0 ||
          row.size < 0
        );
      });
  
      if (hasInvalidData) {
        setBanner({
          type: "error",
          message: "Data tidak valid ditemukan (nilai negatif atau kosong).",
        });
      } else if (formattedData.length === 0) {
        setBanner({ type: "warning", message: "Tidak ada data yang tersedia" });
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController);

    return () => {
      abortController.abort();
      sessionStorage.removeItem("siklusData");
    };
  }, []);

  if (loading || refreshing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    );
  }

  const filteredData = filterTerm
    ? data.filter((row) => {
      const kolamNama = row.kolamNama || "";
      const kolam = row.kolam || "";
      const kolamId = row.kolamId || "";
      return (
        kolam.toLowerCase().includes(filterTerm.toLowerCase()) ||
        kolamNama.toLowerCase().includes(filterTerm.toLowerCase()) ||
        String(kolamId).toLowerCase().includes(filterTerm.toLowerCase())
      );
    })
    : data;

  return (
    <div>
      {banner && !loading && !refreshing && (
        <div
          className={`p-4 ${banner.type === "error" ? "bg-red-600" : "bg-yellow-400"} text-white text-center`}
        >
          <strong>Peringatan:</strong> {banner.message}
        </div>
      )}

      <div className="overflow-x-auto mt-10 mb-10">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              {["Kolam", "Umur", "Tgl Tebar", "Tgl Selesai", "Tebaran", "FCR", "ADG", "MBW", "Size", "Harga/Ikan"].map((header) => (
                <th key={header} className="p-3 border border-gray-400">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx} className="bg-blue-50">
                  <td className="p-3 border border-gray-400">{row.kolam}</td>
                  <td className="p-3 border border-gray-400">{row.umur} Hari</td>
                  <td className="p-3 border border-gray-400">{row.tglTebar}</td>
                  <td className="p-3 border border-gray-400">{row.tglSelesai}</td>
                  <td className="p-3 border border-gray-400">{row.tebaran} Kg</td>
                  <td className="p-3 border border-gray-400">{row.fcr}</td>
                  <td className="p-3 border border-gray-400">{row.adg}</td>
                  <td className="p-3 border border-gray-400">{row.mbw}</td>
                  <td className="p-3 border border-gray-400">{row.size} Kg/Ekor</td>
                  <td className="p-3 border border-gray-400">{row.hargaPerIkan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="p-3 text-center">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FishTable;