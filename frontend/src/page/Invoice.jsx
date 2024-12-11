import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../componen/Footer";
import Sidebar from "../componen/SideBar";
import AIFloatingButton from "../componen/AiFloatingButton";
import Header from "../componen/Header";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error404Page from "../componen/ErrorPage";

function TransactionItem({ title, date, status }) {
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-start bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4 w-full">
      <div className="bg-blue-500 w-3 h-3 rounded-full mr-4 mt-2"></div>
      <div className="flex-grow">
        <h3 className="text-blue-500 font-semibold text-lg">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-600 mr-2 break-words">{status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <i className="fas fa-chevron-right text-blue-500 mt-7"></i>
      </div>
    </div>
  );
}

function Content() {
  const [tagihan, setTagihan] = useState([]);
  const [filter, setFilter] = useState("belum-bayar");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTagihan = async () => {
      setIsLoading(true);
      setIsError(false);

      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      try {
        const response = await axios.get("https://nusaira.vercel.app/api/tagihan", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        console.log("Response Data:", response.data);

        const formattedData = response.data.map((item) => ({
          ...item,
          status: item.status === 0 ? "Belum Bayar" : "Sudah Bayar",
        }));
        setTagihan(formattedData);
      } catch (error) {
        console.error("Error fetching tagihan:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagihan();
  }, []);

  const filteredTagihan = tagihan.filter((item) =>
    filter === "belum-bayar"
      ? item.status === "Belum Bayar"
      : item.status === "Sudah Bayar"
  );

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
    <div className="w-full min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-xl font-semibold mb-1">Tagihan Terkini</h2>
        <p className="text-sm text-gray-500 mb-6">
          Cek status tagihan dan pembayaran Anda di sini.
        </p>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Daftar Tagihan
          </h3>
          <div className="flex flex-wrap items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label htmlFor="filter-status" className="text-sm text-gray-600">
                Filter Status:
              </label>
              <div className="relative">
                <select
                  id="filter-status"
                  className="bg-blue-50 text-blue-600 border border-blue-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="belum-bayar">Belum Bayar</option>
                  <option value="sudah-bayar">Sudah Bayar</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-blue-500 rounded-lg p-6">
          <h4 className="text-blue-500 font-semibold mb-4">
            {filter === "belum-bayar" ? "Belum Dibayar" : "Sudah Dibayar"}
          </h4>
          {filteredTagihan.length > 0 ? (
            filteredTagihan.map((item) => (
              <TransactionItem
                key={item.id}
                title={item.name}
                date={item.dueDate}
                status={item.status}
              />
            ))
          ) : (
            <p className="text-gray-500">Tidak ada transaksi ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Invoice() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Content />
        <AIFloatingButton />
        <Footer />
      </div>
    </div>
  );
}

export default Invoice;
