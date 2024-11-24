import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Activity,
  BarChart3,
  Database,
  Droplets,
  LineChart,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from 'react';
import { fetchAir, fetchKematian, fetchPakan, fetchPanen, fetchSiklus, fetchTambak } from "../../service/AxiosConfig";
import AIFloatingButton from "../componen/AiFloatingButton";
import Footer from "../componen/Footer";
import Header from "../componen/Header";
import Sidebar from "../componen/SideBar";

function LaporanDashboard() {
  const [tambakData, setTambakData] = useState([]);
  const [siklusData, setSiklusData] = useState([]);
  const [kematianData, setKematianData] = useState([]);
  const [pakanData, setPakanData] = useState([]);
  const [panenData, setPanenData] = useState([]);
  const [airData, setAirData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tambak = await fetchTambak();
        const siklus = await fetchSiklus();
        const panen = await fetchPanen();
        const air = await fetchAir();
        const kematian = await fetchKematian();
        const pakan = await fetchPakan();

        setTambakData(tambak);
        setSiklusData(siklus);
        setPanenData(panen);
        setAirData(air);
        setKematianData(kematian);
        setPakanData(pakan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function formatDateToDDMMYY(date) {
    if (!date) return "Data tidak tersedia";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Data tidak valid";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = String(parsedDate.getFullYear());

    return `${day}/${month}/${year}`;
  }


  async function handleExport() {
    const input = document.getElementById("dashboard-content");

    if (!input) {
      console.error("Element with ID 'dashboard-content' not found.");
      return;
    }

    const originalStyles = {};
    const elementsWithBorders = input.querySelectorAll("select, button");

    elementsWithBorders.forEach((el, index) => {
      originalStyles[index] = {
        border: el.style.border,
        boxShadow: el.style.boxShadow,
        background: el.style.background
      };
      el.style.border = "none";
      el.style.boxShadow = "none";
      el.style.background = "transparent";
    });

    const style = document.createElement("style");
    style.innerHTML = `
      #dashboard-content {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
        font-family: Arial, sans-serif;  
      }
  
      #dashboard-content .keterangan {
        white-space: normal; 
        word-break: break-word;  
        font-size: 14px;  
        list-style-type: none !important;  
        padding-left: 0 !important; 
      }
  
      
  
      #dashboard-content select, 
      #dashboard-content button {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
        color: inherit !important;
      }
  
      #dashboard-content select, 
      #dashboard-content button,
      #dashboard-content .select-label, 
      #dashboard-content .export-label {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("laporan_budidaya_tambak_lele.pdf");
    } finally {
      document.head.removeChild(style);
      elementsWithBorders.forEach((el, index) => {
        el.style.border = originalStyles[index].border;
        el.style.boxShadow = originalStyles[index].boxShadow;
        el.style.background = originalStyles[index].background;
      });
    }
  }



  const totalHasilPanen = panenData.reduce(
    (acc, panen) => acc + parseFloat(panen.berat || 0),
    0
  );


  const nilaiSFR = siklusData.length > 0
    ? (() => {
      const totalTebar = siklusData.reduce((acc, siklus) => acc + parseFloat(siklus.total_tebar || 0), 0);

      const totalMati = siklusData.reduce((acc, siklus) => {
        const kematianIkan = kematianData.filter(kematian => kematian.kolam_id === siklus.kolam_id);

        let jumlahIkanMati = 0;

        if (kematianIkan.length > 0) {
          const kematianDenganJumlahEkor = kematianIkan.find(kematian => kematian.jumlah_ekor > 0);

          if (kematianDenganJumlahEkor) {
            jumlahIkanMati = parseFloat(kematianDenganJumlahEkor.jumlah_ekor || 0);
          } else {
            const kematianDenganSize = kematianIkan.find(kematian => kematian.size > 0);
            if (kematianDenganSize) {
              jumlahIkanMati = parseFloat(kematianDenganSize.size || 0);
            }
          }
        }

        return acc + jumlahIkanMati;
      }, 0);
      return totalTebar > 0
        ? ((1 - totalMati / totalTebar) * 100).toFixed(2)
        : "Data tidak tersedia";
    })()
    : "Data tidak tersedia";


  const nilaiFCR = panenData.length > 0 && pakanData.length > 0
    ? (
      pakanData.reduce((acc, pakan) => {
        const beratIkan = panenData.find(panen => panen.kolam_id === pakan.kolam_id)?.berat || 1;
        return acc + (parseFloat(pakan.jumlah) / parseFloat(beratIkan));
      }, 0) / pakanData.length
    ).toFixed(2)
    : "Data tidak tersedia";

  const airDataFlat = airData.flat();

  const kualitasAir = airDataFlat && airDataFlat.length > 0 && tambakData && tambakData[0]
    ? airDataFlat.find((air) => {
      console.log("Membandingkan tambak_id:", air.tambak_id, "dengan tambakData[0].id:", tambakData[0].id);
      return air.tambak_id === tambakData[0].id;
    })
    : null;

  const hasilKualitasAir = kualitasAir
    ? {
      ph: {
        status:
          kualitasAir.ph >= 7.0 && kualitasAir.ph <= 8.5
            ? "Normal"
            : "Perlu Perhatian",
        value: Number(kualitasAir.ph.toFixed(1)),
      },
      suhu: {
        status:
          kualitasAir.suhu >= 25 && kualitasAir.suhu <= 32
            ? "Normal"
            : "Perlu Perhatian",
        value: Number(kualitasAir.suhu.toFixed(1)),
      },
      oksigen: {
        status: kualitasAir.oksigen >= 4 ? "Normal" : "Perlu Perhatian",
        value: Number(kualitasAir.oksigen.toFixed(1)),
      },
      salinitas: {
        status:
          kualitasAir.salinitas >= 10 && kualitasAir.salinitas <= 25
            ? "Normal"
            : "Perlu Perhatian",
        value: Number(kualitasAir.salinitas.toFixed(1)),
      },
    }
    : null;

  const statusKualitasAir = hasilKualitasAir
    ? Object.entries(hasilKualitasAir)
      .filter(([, param]) => param.status === "Perlu Perhatian")
      .map(([key]) => key)
      .join(", ")
    : null;

  const pesanKualitasAir = statusKualitasAir
    ? `Perlu perhatian pada parameter: ${statusKualitasAir}`
    : hasilKualitasAir
      ? "Semua parameter Normal"
      : "Data kualitas air tidak tersedia";

  const description = hasilKualitasAir
    ? Object.entries(hasilKualitasAir)
      .map(([key, param]) => {
        const statusText = param.status === "Normal" ? `${key}: ${param.value} (${param.status})` : `${key}: ${param.value} (${param.status})`;
        return statusText;
      })
      .join(", ")
    : "Data kualitas air tidak tersedia";

  const dayaDukungLahan = tambakData[0]?.jumlah_kolam * 1000 || "N/A";

  const jumlahPakanGram = pakanData.reduce((acc, pakan) => acc + parseFloat(pakan.jumlah), 0);
  const jumlahPakanKg = jumlahPakanGram / 1000;
  const estimasiPertumbuhan = (jumlahPakanKg / nilaiFCR).toFixed(2);


  function TableSection() {
    const calculateLuasKolam = (panjang, lebar, kedalaman) => {
      return parseFloat(panjang || 0) * parseFloat(lebar || 0) * parseFloat(kedalaman || 0);
    };

    const getSiklusDataForKolam = (kolamId) => {
      return siklusData.find((siklus) => siklus.kolam_id === kolamId) || {};
    };

    const getPakanDataForKolam = (kolamId) => {
      return pakanData.filter((pakan) => pakan.kolam_id === kolamId);
    };

    const getPanenDataForKolam = (kolamId) => {
      return panenData.find((panen) => panen.kolam_id === kolamId) || {};
    };

    const calculateTotalPakanForKolam = (kolamId) => {
      const kolamPakan = getPakanDataForKolam(kolamId);
      return kolamPakan.reduce((acc, pakan) => acc + parseFloat(pakan.jumlah || 0), 0);
    };

    const calculateBiomassa = (kolamId) => {
      const panenData = getPanenDataForKolam(kolamId);
      return parseFloat(panenData.berat || 0);
    };

    const calculateFCR = (kolamId) => {
      const totalPakan = calculateTotalPakanForKolam(kolamId);
      const biomassaPanen = calculateBiomassa(kolamId);
      return biomassaPanen !== 0 ? (totalPakan / biomassaPanen).toFixed(2) : "0";
    };

    const calculateSR = (kolamId) => {
      const siklus = getSiklusDataForKolam(kolamId);
      const totalTebar = parseFloat(siklus.total_tebar || 0);
      const kematianForKolam = kematianData.filter((k) => k.kolam_id === kolamId);
      const totalKematian = kematianForKolam.reduce((acc, k) => acc + parseFloat(k.jumlah_ekor || 0), 0);
      const jumlahHidup = totalTebar - totalKematian;

      return totalTebar !== 0 ? ((jumlahHidup / totalTebar) * 100).toFixed(2) : "0";
    };

    const calculateTotals = () => {
      let totalLuasKolam = 0;
      let totalDOC = 0;
      let totalBenih = 0;
      let totalPadatTebar = 0;
      let totalPakan = 0;
      let totalBiomassa = 0;
      let totalSizePanen = 0;
      let totalFCR = 0;
      let totalSR = 0;
      let kolamCount = 0;

      tambakData.forEach(tambak => {
        tambak.kolamDetails.forEach(kolam => {
          const luasKolam = calculateLuasKolam(kolam.panjang, kolam.lebar, kolam.kedalaman);
          totalLuasKolam += luasKolam;

          const siklusKolam = getSiklusDataForKolam(kolam.id);
          totalDOC += parseFloat(siklusKolam.lama_persiapan || 0);
          totalBenih += parseFloat(siklusKolam.total_tebar || 0);
          totalPadatTebar += luasKolam ? (parseFloat(siklusKolam.total_tebar || 0) / luasKolam) : 0;


          totalPakan += calculateTotalPakanForKolam(kolam.id);


          totalBiomassa += calculateBiomassa(kolam.id);


          const panenKolam = getPanenDataForKolam(kolam.id);
          totalSizePanen += parseFloat(panenKolam.size || 0);

          totalFCR += parseFloat(calculateFCR(kolam.id));
          totalSR += parseFloat(calculateSR(kolam.id));

          kolamCount++;
        });
      });

      return {
        luasKolam: totalLuasKolam.toFixed(2),
        doc: totalDOC.toFixed(2),
        benih: totalBenih.toFixed(0),
        padatTebar: (totalPadatTebar / kolamCount).toFixed(2),
        pakan: totalPakan.toFixed(2),
        biomassa: totalBiomassa.toFixed(2),
        sizePanen: (totalSizePanen / kolamCount).toFixed(2),
        fcr: (totalFCR / kolamCount).toFixed(2),
        sr: (totalSR / kolamCount).toFixed(2)
      };
    };

    const totals = calculateTotals();

    const determineRowColor = (kolamId) => {
      const siklusKolam = getSiklusDataForKolam(kolamId);
      const totalPakan = calculateTotalPakanForKolam(kolamId);
      const biomassa = calculateBiomassa(kolamId);
      const sr = calculateSR(kolamId);
      const fcr = calculateFCR(kolamId);
      const dataCount = [siklusKolam.total_tebar, totalPakan, biomassa, sr, fcr].filter((data) => data > 0).length;

      if (dataCount === 5) return "bg-green-500";
      if (dataCount >= 3) return "bg-yellow-500";
      return "bg-red-500";
    };

    const evaluateKolamPerformance = () => {
      const evaluations = tambakData.map((tambak) =>
        tambak.kolamDetails.map((kolam) => {
          const fcr = parseFloat(calculateFCR(kolam.id));
          const sr = parseFloat(calculateSR(kolam.id));
          const siklusKolam = getSiklusDataForKolam(kolam.id);
          const panenKolam = getPanenDataForKolam(kolam.id);
          const biomassaPanen = calculateBiomassa(kolam.id);
          const luasKolam = calculateLuasKolam(kolam.panjang, kolam.lebar, kolam.kedalaman);

          const doc = parseFloat(siklusKolam.lama_persiapan || 0);
          const sizePanen = parseFloat(panenKolam.size || 0);
          const adg = doc > 0 ? (sizePanen / doc) : 0;

          const produksiPerMeter = luasKolam > 0 ? (biomassaPanen / luasKolam) : 0;

          const evaluateFCR = () => {
            if (fcr < 1.3) return "Sangat Baik";
            if (fcr < 1.5) return "Baik";
            if (fcr < 1.8) return "Cukup";
            if (fcr < 2.0) return "Kurang";
            return "Buruk";
          };

          const evaluateSR = () => {
            if (sr > 90) return "Sangat Baik";
            if (sr > 80) return "Baik";
            if (sr > 70) return "Cukup";
            if (sr > 60) return "Kurang";
            return "Buruk";
          };

          const evaluateADG = () => {
            if (adg > 0.3) return "Sangat Baik";
            if (adg > 0.25) return "Baik";
            if (adg > 0.2) return "Cukup";
            if (adg > 0.15) return "Kurang";
            return "Buruk";
          };

          const evaluateProduksi = () => {
            if (produksiPerMeter > 15) return "Sangat Baik";
            if (produksiPerMeter > 12) return "Baik";
            if (produksiPerMeter > 9) return "Cukup";
            if (produksiPerMeter > 6) return "Kurang";
            return "Buruk";
          };

          const performanceScores = {
            "Sangat Baik": 4,
            "Baik": 3,
            "Cukup": 2,
            "Kurang": 1,
            "Buruk": 0
          };

          const scores = [
            performanceScores[evaluateFCR()],
            performanceScores[evaluateSR()],
            performanceScores[evaluateADG()],
            performanceScores[evaluateProduksi()]
          ];

          const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

          let overallPerformance;
          if (averageScore >= 3.5) overallPerformance = "Sangat Baik";
          else if (averageScore >= 2.5) overallPerformance = "Baik";
          else if (averageScore >= 1.5) overallPerformance = "Cukup";
          else if (averageScore >= 0.5) overallPerformance = "Kurang";
          else overallPerformance = "Buruk";

          return {
            kolam: kolam.namaKolam || `Kolam ${kolam.id}`,
            performance: overallPerformance,
            details: {
              fcr: `FCR: ${fcr.toFixed(2)} (${evaluateFCR()})`,
              sr: `SR: ${sr.toFixed(2)}% (${evaluateSR()})`,
              adg: `ADG: ${adg.toFixed(2)} gr/hari (${evaluateADG()})`,
              produksi: `Produksi/m³: ${produksiPerMeter.toFixed(2)} kg/m³ (${evaluateProduksi()})`
            }
          };
        })
      );

      return evaluations.flat();
    };

    const kolamPerformances = evaluateKolamPerformance();

    return (
      <div className="overflow-x-auto mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border">Nomor Kolam</th>
              <th className="py-2 px-4 border">Luas Kolam</th>
              <th className="py-2 px-4 border">DOC (Hari)</th>
              <th className="py-2 px-4 border">Jumlah Benih</th>
              <th className="py-2 px-4 border">Padat Tebar</th>
              <th className="py-2 px-4 border">Total Pakan</th>
              <th className="py-2 px-4 border">Biomassa Panen</th>
              <th className="py-2 px-4 border">Size Panen</th>
              <th className="py-2 px-4 border">FCR</th>
              <th className="py-2 px-4 border">SR</th>
            </tr>
          </thead>
          <tbody>
            {tambakData.map((tambak) =>
              tambak.kolamDetails.map((kolam, index) => {
                const luasKolam = calculateLuasKolam(kolam.panjang, kolam.lebar, kolam.kedalaman);
                const siklusKolam = getSiklusDataForKolam(kolam.id);
                const totalPakan = calculateTotalPakanForKolam(kolam.id);
                const biomassaPanen = calculateBiomassa(kolam.id);
                const fcr = calculateFCR(kolam.id);
                const sr = calculateSR(kolam.id);

                return (
                  <tr key={kolam.id} className={determineRowColor(kolam.id)}>
                    <td className="py-2 px-4 border">{kolam.namaKolam || `Kolam ${index + 1}`}</td>
                    <td className="py-2 px-4 border">{luasKolam.toFixed(2)} m³</td>
                    <td className="py-2 px-4 border">{siklusKolam.lama_persiapan || "0"}</td>
                    <td className="py-2 px-4 border">{siklusKolam.total_tebar || "0"}</td>
                    <td className="py-2 px-4 border">
                      {luasKolam ? ((siklusKolam.total_tebar || 0) / luasKolam).toFixed(2) : "0"} (mg/m²)
                    </td>
                    <td className="py-2 px-4 border">{totalPakan.toFixed(2)} kg</td>
                    <td className="py-2 px-4 border">{biomassaPanen.toFixed(2)} kg</td>
                    <td className="py-2 px-4 border">{siklusKolam.size || "0"}</td>
                    <td className="py-2 px-4 border">{fcr}</td>
                    <td className="py-2 px-4 border">{sr}%</td>
                  </tr>
                );
              })
            )}
            <tr className="bg-blue-500 text-white">
              <td colSpan="1" className="py-2 px-4 text-center">Total</td>
              <td className="py-2 px-4 border">{totals.luasKolam} m³</td>
              <td className="py-2 px-4 border">{totals.doc}</td>
              <td className="py-2 px-4 border">{totals.benih}</td>
              <td className="py-2 px-4 border">{totals.padatTebar} (mg/m²)</td>
              <td className="py-2 px-4 border">{totals.pakan} kg</td>
              <td className="py-2 px-4 border">{totals.biomassa} kg</td>
              <td className="py-2 px-4 border">{totals.sizePanen}</td>
              <td className="py-2 px-4 border">{totals.fcr}</td>
              <td className="py-2 px-4 border">{totals.sr}%</td>
            </tr>
          </tbody>
        </table>

        {/* Bagian Keterangan */}
        <div className="mt-14 mb-10">
          <p className="font-medium mb-2">Keterangan:</p>
          <ul className="list-decimal list-inside space-y-1 keterangan">
            {kolamPerformances.map((performance, index) => (
              <li key={index}>
                {performance.kolam}: Performa {performance.performance}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }




  return (
    <div className="space-y-6 space-x-6 bg-white w-full min-h-screen ">
      <Header />
      <div className="p-6 ">
        {/* Header Section */}
        <div className="mb-20 mr-4">
          <div className="flex justify-between items-center mb-4 mr-1 ">
            <h2 className="font-bold">Laporan Budidaya Tambak Lele</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <label className="block text-sm mb-2">Tambak:</label>
                <div className="relative">
                  <select className="w-[400px] p-2 pr-10 border rounded-md appearance-none">
                    {tambakData.map((tambak) => (
                      <option key={tambak.id} value={tambak.name}>
                        {tambak.nama}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <label className="block text-sm mb-2">Periode:</label>
                <div className="relative">
                  <select className="w-[200px] p-2 pr-10 border rounded-md appearance-none">
                    {siklusData.map((siklus) => (
                      <option key={siklus.id} value={siklus.tanggal}>
                        {new Date(siklus.tanggal).toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                      </option>
                    ))}

                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div id="dashboard-content" className="bg-white p-6 rounded-lg border  border-blue-500 mr-4">
          {/* Card Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Tambak {tambakData[0]?.nama}</h2>
            <div>
              <button id="#export-button-id" className="w-[250px] bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleExport}>
                Ekspor
              </button>
            </div>
          </div>

          {/* Report Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">LAPORAN BUDIDAYA</h2>
            <h3 className="text-blue-500"> {tambakData[0]?.nama}</h3>
          </div>

          {/* Info Section */}
          <div className="mb-8 mt-10">
            <div className="flex mb-1">
              <span className="font-medium w-32">Lokasi Tambak</span>
              <span className="mr-2">:</span>
              <span>{tambakData[0]?.provinsi || "Data tidak tersedia"},{tambakData[0]?.kabupaten || "Data tidak tersedia"}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Jumlah Kolam</span>
              <span className="mr-2">:</span>
              <span>{tambakData[0]?.jumlah_kolam || "Data tidak tersedia"}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Periode Siklus</span>
              <span className="mr-2">:</span>
              <span>
                {siklusData[0]?.tanggal ? formatDateToDDMMYY(siklusData[0]?.tanggal) : "Data tidak tersedia"} - Sekarang
              </span>
            </div>
          </div>
          <div className="text-center mb-10 mt-20">
            <h3 className="text-blue-700 inline-block border-b-4 border-blue-700 pb-1">
              Detail
            </h3>
          </div>

          {/* Metrics First Row */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <MetricCard
              icon={<BarChart3 />}
              title="Hasil Panen"
              description={`Berat total hasil panen ikan: ${totalHasilPanen} kg`}
            />
            <MetricCard
              icon={<Activity />}
              title="Nilai SFR"
              description={`Tingkat Kelangsungan Hidup: ${nilaiSFR !== "Data tidak tersedia" ? nilaiSFR + "%" : nilaiSFR
                }`}
            />
            <MetricCard
              icon={<Database />}
              title="Nilai FCR"
              description={`Feed Conversion Ratio: ${nilaiFCR}`}
            />
          </div>

          {/* Metrics Second Row */}
          <div className="grid grid-cols-3 gap-8 mb-10">
            <MetricCard
              icon={<Droplets />}
              title="Kualitas Air"
              description={`Nilai Kualitas Air: ${description}`}
            />
            <MetricCard
              icon={<LineChart />}
              title="Daya Dukung Lahan"
              description={`Kapasitas daya dukung lahan untuk budidaya ikan: ${dayaDukungLahan} kg/ha`}

            />
            <MetricCard
              icon={<TrendingUp />}
              title="Pertumbuhan Lele"
              description={`Estimasi Pertumbuhan Berdasarkan Pakan: ${estimasiPertumbuhan} kg/ha`}
            />
          </div>

          {/* Performance Indicators */}
          <div className="flex gap-6 mb-6 mt-20">
            <Indicator color="yellow-500" text="Peforma Kolam Biasa" />
            <Indicator color="green-500" text="Peforma Kolam Terbaik" />
            <Indicator color="red-500" text="Peforma Kolam Terburuk" />
          </div>

          {/* Table Section */}
          <TableSection />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, description }) {
  return (
    <div className="text-center">
      {React.cloneElement(icon, {
        className: "w-12 h-12 mx-auto mb-2 text-blue-500",
      })}
      <p className="font-medium mb-2">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Indicator({ color, text }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full bg-${color}`}></div>
      <span>{text}</span>
    </div>
  );
}



function LaporanBudidaya() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <LaporanDashboard />
        <div className="mt-20">
          <Footer />
        </div>
        <AIFloatingButton />
      </div>
    </div>
  );
}

export default LaporanBudidaya;
