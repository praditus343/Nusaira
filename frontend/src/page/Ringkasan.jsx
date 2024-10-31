import React from 'react';
import { BarChart3, Droplets, Activity, Database, LineChart, TrendingUp } from 'lucide-react';
import Footer from '../componen/Footer';
import Sidebar from '../componen/SideBar';
import AIFloatingButton from '../componen/AiFloatingButton';
import Header from "../componen/Header";

function SummaryDetails() {
  return (
    <div className="  space-y-6 space-x-6 bg-white w-full min-h-screen ">
            <Header />
    <div className="p-6 ">
      {/* Header Section */}
      <div className="mb-6 mr-4">
        <h1 className="text-2xl font-bold mb-4">Ringkasan Budidaya Tambak Lele</h1>
        <div className="flex gap-4 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm mb-2">Tambak:</label>
            <select className="w-full p-2 border rounded">
              <option>Lele segar</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-2">Batch:</label>
            <select className="w-full p-2 border rounded">
              <option>10 Oktober 2024</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Budidaya</button>
            <button className="border px-4 py-2 rounded">Keuangan</button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white p-6 rounded-lg shadow border  border-blue-500 mr-4">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Tambak Lele Segar</h2>
          <div className="flex gap-2">
            <select className="border p-2 rounded">
              <option>Pilih Kolam</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Ekspor</button>
          </div>
        </div>

        {/* Report Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">LAPORAN BUDIDAYA</h2>
          <h3 className="text-blue-500">Lele Segar</h3>
        </div>

          {/* Info Section */}
          <div className="mb-8">
            <div className="flex mb-1">
              <span className="font-medium w-32">Lokasi Tambak</span>
              <span className="mr-2">:</span>
              <span>Jawa Tengah, Boyolali, Tegalsari</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Jumlah Kolam</span>
              <span className="mr-2">:</span>
              <span>4</span>
            </div>
            <div className="flex mb-1">
              <span className="font-medium w-32">Periode Siklus</span>
              <span className="mr-2">:</span>
              <span>1 Oktober 2024 - Sekarang</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-blue-700 inline-block border-b-4 border-blue-700 pb-1">Detail</h3>
          </div>
          
        {/* Metrics First Row */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <MetricCard icon={<BarChart3 />} title="Hasil Panen" description="Data pada Kolam B3, Kolam B4 tidak lengkap" />
          <MetricCard icon={<Activity />} title="Nilai SFR" description="Nilai Survival Rate (SR) dalam nilai yang baik (&gt;80%)" />
          <MetricCard icon={<Database />} title="Nilai FCR" description="Data pada Kolam B3, Kolam B4 tidak lengkap" />
        </div>

        {/* Metrics Second Row */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <MetricCard icon={<Droplets />} title="Kualitas Air" description="Data pada Kolam B3, Kolam B4 tidak lengkap" />
          <MetricCard icon={<LineChart />} title="Daya Dukung Lahan" description="Daya dukung lahan sudah dipertimbangkan dengan baik" />
          <MetricCard icon={<TrendingUp />} title="Pertumbuhan Lele" description="Data pada Kolam B3, Kolam B4 tidak lengkap" />
        </div>

        {/* Performance Indicators */}
        <div className="flex gap-6 mb-4">
          <Indicator color="yellow-500" text="Peforma Kolam Biasa" />
          <Indicator color="green-500" text="Peforma Kolam Terbaik" />
          <Indicator color="red-500" text="Peforma Kolam Terburuk" />
        </div>

        {/* Table Section */}
        <TableSection />

        {/* Notes Section */}
        <div className="mt-6">
          <p className="font-medium mb-2">Keterangan:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Penilaian peforma kolam bersifat relatif</li>
            <li>Penilaian kolam dengan peforma baik berdasarkan hasil panen optimal, nilai FCR rendah, dan nilai SR tinggi.</li>
            <li>Penilaian kolam dengan peforma buruk berdasarkan hasil panen rendah, nilai FCR tinggi, dan nilai SR rendah.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  );
}

function MetricCard({ icon, title, description }) {
  return (
    <div className="text-center">
      {React.cloneElement(icon, { className: "w-12 h-12 mx-auto mb-2 text-blue-500" })}
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

function TableSection() {
  return (
    <div className="overflow-x-auto">
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
          <tr className="bg-green-100">
            <td className="py-2 px-4 border">Kolam B3</td>
            <td className="py-2 px-4 border">1900 m²</td>
            <td className="py-2 px-4 border">60</td>
            <td className="py-2 px-4 border">100.000</td>
            <td className="py-2 px-4 border">60 (mg/m²)</td>
            <td className="py-2 px-4 border">15 kg</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">100%</td>
          </tr>
          <tr className="bg-yellow-100">
            <td className="py-2 px-4 border">Kolam B4</td>
            <td className="py-2 px-4 border">1800 m²</td>
            <td className="py-2 px-4 border">60</td>
            <td className="py-2 px-4 border">100.000</td>
            <td className="py-2 px-4 border">48 (mg/m²)</td>
            <td className="py-2 px-4 border">12 kg</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">0</td>
            <td className="py-2 px-4 border">100%</td>
          </tr>
          <tr className="bg-blue-500 text-white">
            <td colSpan="10" className="py-2 px-4 text-center">Kolam Terbaik</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Summary() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <SummaryDetails />
        <Footer />
        <AIFloatingButton />
      </div>
    </div>
  );
}

export default Summary;
