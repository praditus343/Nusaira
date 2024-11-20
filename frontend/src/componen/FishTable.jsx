import React, { useState, useEffect } from "react";

const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const FishTable = ({ filterTerm = "" }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({ show: false, message: "" });
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [siklusRes, panenRes, kematianRes, tambakRes] = await Promise.all([
        fetch("https://nusaira-be.vercel.app/api/siklus").then((res) => res.json()),
        fetch("https://nusaira-be.vercel.app/api/data-panen").then((res) => res.json()),
        fetch("https://nusaira-be.vercel.app/api/data-kematian").then((res) => res.json()),
        fetch("https://nusaira-be.vercel.app/api/tambak").then((res) => res.json()),
      ]);

      if (
        !Array.isArray(siklusRes) ||
        !Array.isArray(panenRes) ||
        !Array.isArray(kematianRes) ||
        !Array.isArray(tambakRes)
      ) {
        throw new Error("Data yang diterima tidak valid");
      }

      const formattedData = siklusRes.map((siklus) => {
        const kolamId = siklus.kolam_id;
        const matchedTambakData = tambakRes.find((tambak) =>
          tambak.kolamDetails?.some((kolam) => kolam.id === kolamId)
        );

        const kolamData = matchedTambakData?.kolamDetails.find((kolam) => kolam.id === kolamId);
        const kolamNama = kolamData?.namaKolam || "-";

        const panenData = panenRes.find((panen) => panen.id_siklus === siklus.id_siklus);

        const kematianData = kematianRes.filter((kematian) => kematian.id_siklus === siklus.id_siklus);
        const totalKematianEkor = kematianData.reduce((sum, kematian) => sum + (kematian.jumlah_ekor || 0), 0);

        const jumlahTebar = siklus.total_tebar || 0;
        const jumlahIkanHidup = Math.max(jumlahTebar - totalKematianEkor, 0);

        const mbw = panenData && jumlahIkanHidup > 0 && panenData.berat > 0
          ? (Number(panenData.berat) / jumlahIkanHidup / 1000).toFixed(5)
          : "-";

        const adg = siklus.tanggal && siklus.umur_awal > 0 && panenData?.berat
          ? (Number(panenData.berat) / 1000 / siklus.umur_awal).toFixed(5)
          : "-";

        const hargaPerIkan = panenData?.harga_jual
          ? `Rp. ${new Intl.NumberFormat("id-ID").format(panenData.harga_jual)}`
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
          size: panenData?.size || "-",
          hargaPerIkan,
        };
      });

      setData(formattedData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error detail:", {
        message: error.message,
        stack: error.stack,
      });
      setLoading(false);
      setRefreshing(true);
      setBanner({
        show: true,
        message: `Error: ${error.message}. Silakan coba refresh halaman.`,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshing) {
      const timer = setTimeout(() => fetchData(), 5000);
      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
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
      {banner.show && (
        <div className="bg-yellow-300 text-black p-4 text-center">
          <strong className="font-bold">Peringatan: </strong>
          {banner.message}
        </div>
      )}
      <div className="overflow-x-auto mt-10 mb-10">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              {["Kolam", "Umur", "Tgl Tebar", "Tgl Selesai", "Tebaran", "FCR", "ADG", "MBW", "Size", "Harga/Ikan"].map((header) => (
                <th key={header} className="p-3 border border-gray-400 ">
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
          <td className="p-3 border border-gray-400">{row.umur}</td>
          <td className="p-3 border border-gray-400">{row.tglTebar}</td>
          <td className="p-3 border border-gray-400">{row.tglSelesai}</td>
          <td className="p-3 border border-gray-400">{row.tebaran}</td>
          <td className="p-3 border border-gray-400">{row.fcr}</td>
          <td className="p-3 border border-gray-400">{row.adg}</td>
          <td className="p-3 border border-gray-400">{row.mbw}</td>
          <td className="p-3 border border-gray-400">{row.size}</td>
          <td className="p-3 border border-gray-400">{row.hargaPerIkan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FishTable;
