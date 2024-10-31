import React, { useState } from "react";

function App() {
  const [selectedTambak, setSelectedTambak] = useState("Tambak 1");
  const [selectedBatch, setSelectedBatch] = useState("Oktober 2024");
  const [selectedRingkasan, setSelectedRingkasan] = useState("BUDIDAYA");

  const handleTambakChange = (event) => {
    setSelectedTambak(event.target.value);
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleRingkasanChange = (event) => {
    setSelectedRingkasan(event.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">{/* Logo */}</div>
        <div className="title">Informasi Terbaru NusAira</div>
        <div className="user">{/* User Profile */}</div>
      </div>
      <div className="sidebar">
        <div className="menu-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-fish"></i>
          <span>Budidaya/Tambak</span>
          <ul>
            <li>
              <i className="fas fa-plus"></i>
              <span>Input Tambak Baru</span>
            </li>
            <li>
              <i className="fas fa-list"></i>
              <span>Daftar Kolam</span>
            </li>
            <li>
              <i className="fas fa-cogs"></i>
              <span>Management</span>
            </li>
            <li>
              <i className="fas fa-chart-line"></i>
              <span>Simulasi</span>
            </li>
          </ul>
        </div>
        <div className="menu-item">
          <i className="fas fa-money-bill-wave"></i>
          <span>Keuangan</span>
          <ul>
            <li>
              <i className="fas fa-plus"></i>
              <span>Input Transaksi Baru</span>
            </li>
            <li>
              <i className="fas fa-list"></i>
              <span>Daftar Transaksi</span>
            </li>
            <li>
              <i className="fas fa-cogs"></i>
              <span>Management</span>
            </li>
            <li>
              <i className="fas fa-chart-line"></i>
              <span>Laporan</span>
            </li>
          </ul>
        </div>
        <div className="menu-item">
          <i className="fas fa-chart-line"></i>
          <span>Laporan</span>
          <ul>
            <li>
              <i className="fas fa-plus"></i>
              <span>Input Laporan Baru</span>
            </li>
            <li>
              <i className="fas fa-list"></i>
              <span>Daftar Laporan</span>
            </li>
            <li>
              <i className="fas fa-cogs"></i>
              <span>Management</span>
            </li>
            <li>
              <i className="fas fa-chart-line"></i>
              <span>Simulasi</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="filter">
          <select value={selectedTambak} onChange={handleTambakChange}>
            <option value="Tambak 1">Tambak 1</option>
            <option value="Tambak 2">Tambak 2</option>
            <option value="Tambak 3">Tambak 3</option>
          </select>
          <select value={selectedBatch} onChange={handleBatchChange}>
            <option value="Oktober 2024">Oktober 2024</option>
            <option value="November 2024">November 2024</option>
            <option value="Desember 2024">Desember 2024</option>
          </select>
          <select value={selectedRingkasan} onChange={handleRingkasanChange}>
            <option value="BUDIDAYA">BUDIDAYA</option>
            <option value="KEUANGAN">KEUANGAN</option>
            <option value="LAPORAN">LAPORAN</option>
          </select>
        </div>
        <div className="table">{/* Table Content */}</div>
      </div>
    </div>
  );
}

export default App;
