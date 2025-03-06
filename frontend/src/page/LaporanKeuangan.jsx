import React, { useState, useEffect } from "react";
import Footer from "../componen/Footer";
import Sidebar from '../componen/SideBar';
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Error404Page from "../componen/ErrorPage";
import apiClient from "../service/axiosInstance";


function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function RincianPengeluaran({ onTotalChange }) {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/pengeluaran'); 
        const data = response.data;
    
        setPengeluaran(data);
    
        const totalSisaTagihan = data.reduce((total, item) => total + parseFloat(item.sisa_tagihan), 0);
        onTotalChange(totalSisaTagihan); 
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch pengeluaran');
    } finally {
        setLoading(false);
    }    
    };

    fetchData();
  }, [onTotalChange]);

  if (loading){
    return(
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
  } 

  if (error){
    return(
      <div>
        <Error404Page/>
      </div>
    );
  }

  return (
    <section className="my-8">
      <h3 className="text-lg font-semibold mb-4">Rincian Pengeluaran</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-left text-white">
            <th className="border border-gray-300 p-2">Jenis Pengeluaran</th>
            <th className="border border-gray-300 p-2">Nama Barang</th>
            <th className="border border-gray-300 p-2">Catatan</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Sisa Tagihan (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {pengeluaran.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.jenis_pengeluaran}</td>
              <td className="border border-gray-300 p-2">{item.nama_barang}</td>
              <td className="border border-gray-300 p-2">{item.catatan}</td>
              <td className="border border-gray-300 p-2">{item.status}</td>
              <td className="border border-gray-300 p-2">{formatRupiah(item.sisa_tagihan)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function RincianPemasukan({ onTotalChange }) {
  const [pemasukan, setPemasukan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/pemasukan');
        setPemasukan(response.data);
        const totalPendapatan = response.data.reduce((total, item) => total + parseFloat(item.total), 0);
        onTotalChange(totalPendapatan);
    } catch (error) {
        setError(error.response?.data?.message || error.message);
    } finally {
        setLoading(false);
    }    
    };

    fetchData();
  }, [onTotalChange]);

  if (loading){
    return(
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
  } 

  if (error){
    return(
      <div>
        <Error404Page/>
      </div>
    );
  }

  return (
    <section className="my-8">
      <h3 className="text-lg font-semibold mb-4">Rincian Pemasukan</h3>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-left text-white">
            <th className="border border-gray-300 p-2">Nama Barang</th>
            <th className="border border-gray-300 p-2">Kuantitas</th>
            <th className="border border-gray-300 p-2">Harga Satuan (Rp)</th>
            <th className="border border-gray-300 p-2">Pendapatan (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {pemasukan.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.kategori}</td>
              <td className="border border-gray-300 p-2">{item.jumlah}</td>
              <td className="border border-gray-300 p-2">{formatRupiah(item.harga)}</td>
              <td className="border border-gray-300 p-2">{formatRupiah(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function LaporanDashboard() {
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalSisaTagihan, setTotalSisaTagihan] = useState(0);
  const [tambakList, setTambakList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTambak() {
      try {
        setIsLoading(true);
        setIsError(false);
    
        const response = await apiClient.get("/tambak");
        setTambakList(response.data);
    } catch (error) {
        setIsError(true);
        console.error("Error fetching tambak data:", error.response?.data?.message || error.message);
    } finally {
        setIsLoading(false);
    }    
    }
    fetchTambak();
  }, []);

  
  
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
  
      #dashboard-content select, 
      #dashboard-content button {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
        color: inherit !important;
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
  
      pdf.save("laporan_keuangan_tambak_lele.pdf");
    } finally {
      document.head.removeChild(style);
      elementsWithBorders.forEach((el, index) => {
        el.style.border = originalStyles[index].border;
        el.style.boxShadow = originalStyles[index].boxShadow;
        el.style.background = originalStyles[index].background;
      });
    }
  }

  const labaRugiBersih = totalPendapatan - totalSisaTagihan;
  const statusKeuangan = labaRugiBersih >= 0 ? "Keuntungan" : "Kerugian";

  const getFormattedDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString(); 
};

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


  return (
    <div className="space-y-6 space-x-6 bg-white w-full min-h-screen">
      <Header />
      <div className="p-6">
        <div className="mb-20 mr-4">
          <div className="flex justify-between items-center mb-4 mr-1">
            <h2 className="font-bold">Laporan Keuangan Tambak Lele</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <label className="block text-sm mb-2">Tambak:</label>
                <div className="relative">
                  <select className="w-[400px] p-2 pr-10 border rounded-md appearance-none">
                  {tambakList.map((tambak) => (
                      <option key={tambak.id} value={tambak.id}>
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
            </div>
          </div>
        </div>
        <div id="dashboard-content" className="bg-white p-6 rounded-lg border border-blue-500 mr-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Tambak {tambakList[0]?.nama}</h2>
            <div className="flex gap-2">
              <button className="w-[200px] bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleExport}>
                Ekspor
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">LAPORAN KEUANGAN</h2>
            <h3 className="text-blue-500"> {tambakList[0]?.nama}</h3>
          </div>

          <div className="mb-8 mt-10">
            <div className="flex mb-1">
              <span className="font-medium w-32">Lokasi Tambak</span>
              <span className="mr-2">:</span>
              <span> {tambakList[0]?.provinsi}, {tambakList[0]?.kabupaten}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Jumlah Kolam</span>
              <span className="mr-2">:</span>
              <span> {tambakList[0]?.jumlah_kolam}</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Periode</span>
              <span className="mr-2">:</span>
              <span>  {`${getFormattedDate(tambakList[0]?.created_at)} - Sekarang`}</span>
            </div>
          </div>

          <RincianPengeluaran onTotalChange={setTotalSisaTagihan} />
          <RincianPemasukan onTotalChange={setTotalPendapatan} />

          <section className="my-8">
            <h3 className="text-lg font-semibold mb-4">Rekapitulasi Keuangan</h3>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-left text-white">
                  <th className="border border-gray-300 p-2">Keterangan</th>
                  <th className="border border-gray-300 p-2">Jumlah (Rp)</th>
                  <th className="border border-gray-300 p-2">Status Keuangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Total Pemasukan</td>
                  <td className="border border-gray-300 p-2">{formatRupiah(totalPendapatan)}</td>
                  <td className="border border-gray-300 p-2">{statusKeuangan}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Total Sisa Tagihan</td>
                  <td className="border border-gray-300 p-2">{formatRupiah(totalSisaTagihan)}</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">Laba / Rugi Bersih</td>
                  <td className="border border-gray-300 p-2 font-bold">{formatRupiah(labaRugiBersih)}</td>
                  <td className="border border-gray-300 p-2 font-bold">{statusKeuangan}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
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