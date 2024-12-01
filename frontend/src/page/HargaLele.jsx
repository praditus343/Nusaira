import '@fortawesome/fontawesome-free/css/all.min.css';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Search } from 'lucide-react';
import React, { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import AIFloatingButton from '../componen/AiFloatingButton';
import Footer from '../componen/Footer';
import Header from '../componen/Header';
import InteractiveMap from '../componen/InteraktifMap';
import PricePredictionsDashboard from '../componen/PredictionCard';
import Sidebar from '../componen/SideBar';
import PriceHistory from './PriceHistory';
import LeleDataTable from '../componen/HargaPasar';


const PriceMonitoringDashboard = () => {
    const [searchInput, setSearchInput] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    const CurrentDate = () => {
        const [currentDate, setCurrentDate] = useState("");
      
        useEffect(() => {
          const date = getFormattedDate();
          setCurrentDate(date);
        }, []); 
      
        function getFormattedDate() {
          const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
          ];
      
          const today = new Date();
          const day = today.getDate();
          const month = months[today.getMonth()];
          const year = today.getFullYear();
      
          return `${day} ${month} ${year}`;
        }
      
        return <span>{currentDate}</span>;
      };
      

    const navigate = useNavigate();

    return (
        <div className="space-y-6 bg-white w-full min-h-screen">
            <Header />

            <div className="space-y-4 ml-10">
                {/* Date Selector */}
                <h3 className="font-bold">Budidaya Lele</h3>
                <div className="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                   <CurrentDate/>
                </div>
            </div>
            {/* Map Section */}
            <div className="border border-blue-600 rounded-lg bg-white shadow rounded-lg p-6 mr-10 ml-10">
                <InteractiveMap />
                
            </div>

            {/* Price Trends - New Layout */}
            <PricePredictionsDashboard />
            <div className='mr-20'>
            <LeleDataTable/>
            </div>
            

            {/* Table Section */}
            <div className="p-6 border border-blue-600 rounded-lg bg-white shadow rounded-lg mr-10 ml-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Informasi Supplier Lele Terbaru</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex-2 relative w-full">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="border-2 border-blue-600 rounded-lg pl-10 py-2 w-full text-blue-600 placeholder-blue-300"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2 text-blue-600" />
                        </div>
                        <button className="flex items-center justify-center bg-blue-100 text-blue-600 p-4 rounded-full shadow-md hover:bg-blue-200">
                            <FontAwesomeIcon icon={faShareAlt} className="text-blue-600" size="lg" />
                        </button>
                    </div>
                </div>

                {/* Berikan searchInput ke PriceHistory */}
                <PriceHistory searchInput={searchInput} />
            </div>

        </div>
    );
};


function HargaLele() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <AIFloatingButton />
            <div className="flex-1 overflow-auto">
                <PriceMonitoringDashboard />
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default HargaLele;