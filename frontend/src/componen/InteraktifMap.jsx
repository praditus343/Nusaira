import React, { useEffect, useRef } from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4">
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold text-gray-800 ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

// Contoh data lokasi
const locationData = [
  { id: 1, lat: -6.2088, lng: 106.8456, title: "Jakarta", lastUpdate: "2024-10-20", priceChange: "up" },
  { id: 2, lat: -6.1751, lng: 106.8650, title: "Jakarta 2", lastUpdate: "2024-09-15", priceChange: "down" },
  { id: 3, lat: -7.2504, lng: 112.7688, title: "Surabaya", lastUpdate: "2024-10-15", priceChange: "up" },
  { id: 4, lat: -8.4095, lng: 115.1889, title: "Bali", lastUpdate: "2024-10-22", priceChange: "up" },
  { id: 5, lat: -5.4232, lng: 105.2660, title: "Lampung", lastUpdate: "2024-10-01", priceChange: "down" },
  { id: 6, lat: -1.2864, lng: 103.8480, title: "Batam", lastUpdate: "2024-09-25", priceChange: "up" },
  { id: 7, lat: -0.7893, lng: 113.9213, title: "Borneo", lastUpdate: "2024-10-10", priceChange: "down" },
  { id: 8, lat: -2.5111, lng: 140.5598, title: "Papua", lastUpdate: "2024-10-05", priceChange: "up" },
  { id: 9, lat: -6.9147, lng: 107.6098, title: "Bandung", lastUpdate: "2024-10-12", priceChange: "up" },
  { id: 10, lat: -7.5970, lng: 110.6225, title: "Yogyakarta", lastUpdate: "2024-10-17", priceChange: "down" },
  { id: 11, lat: -7.9794, lng: 112.6300, title: "Malang", lastUpdate: "2024-09-30", priceChange: "up" },
  { id: 12, lat: -8.5401, lng: 116.0542, title: "Lombok", lastUpdate: "2024-10-20", priceChange: "down" },
  { id: 13, lat: -7.7038, lng: 110.4204, title: "Semarang", lastUpdate: "2024-09-15", priceChange: "up" },
  { id: 14, lat: -2.9894, lng: 104.7611, title: "Palembang", lastUpdate: "2024-10-18", priceChange: "down" },
  { id: 15, lat: -5.4433, lng: 105.2640, title: "Bengkulu", lastUpdate: "2024-10-02", priceChange: "up" },
  { id: 16, lat: -4.6665, lng: 122.6262, title: "Sulawezi", lastUpdate: "2024-10-07", priceChange: "down" },
  { id: 17, lat: -1.2297, lng: 122.7280, title: "Manado", lastUpdate: "2024-10-09", priceChange: "up" },
  { id: 18, lat: -7.3073, lng: 108.7115, title: "Cirebon", lastUpdate: "2024-09-28", priceChange: "down" },
  { id: 19, lat: -8.2962, lng: 116.0872, title: "Mataram", lastUpdate: "2024-10-11", priceChange: "up" },
  { id: 20, lat: -7.1660, lng: 110.5520, title: "Purwokerto", lastUpdate: "2024-10-03", priceChange: "down" },
];



const InteractiveMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Fungsi untuk menentukan warna marker
  const getMarkerColor = (lastUpdate, priceChange) => {
    const today = new Date();
    const updateDate = new Date(lastUpdate);
    const diffDays = Math.floor((today - updateDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 30) return '#EF4444'; // Merah
    if (diffDays > 7) return '#D97706'; // Kuning tua
    if (priceChange === "up") return '#22C55E'; // Hijau
    if (priceChange === "down") return '#60A5FA'; // Biru
    return '#A855F7'; // Ungu
  };

  useEffect(() => {

    if (!window.L) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(linkElement);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      document.head.appendChild(scriptElement);

      scriptElement.onload = initializeMap;
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (mapInstanceRef.current) return;
      const map = L.map(mapRef.current).setView([-2.5, 118.0], 5); 
      mapInstanceRef.current = map;
    
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    
      locationData.forEach(location => {
        const markerColor = getMarkerColor(location.lastUpdate, location.priceChange);
    
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background-color: ${markerColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
        });
    
        const marker = L.marker([location.lat, location.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold mb-1">${location.title}</h3>
              <p class="text-sm">Update Terakhir: ${new Date(location.lastUpdate).toLocaleDateString()}</p>
              <p class="text-sm">Status: ${location.priceChange === "up" ? "Kenaikan Harga" : "Penurunan Harga"}</p>
            </div>
          `);
    
        markersRef.current.push(marker);
      });
    }
    


    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>
          <div className="mt-4">
            <span className='  font-bold text-gray-300"'>Persebaran Harga Lele (KG)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] relative rounded-lg overflow-hidden border border-gray-200">
          {/* Leaflet Map Container */}
          <div
            ref={mapRef}
            className="w-full h-full"
          />
        </div>

        {/* Legenda */}
        <div className="mt-4 flex justify-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">{">"} 1 Bulan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-600" />
            <span className="text-sm text-gray-600">{">"} 7 Hari</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">Kenaikan Harga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-400" />
            <span className="text-sm text-gray-600">Penurunan Harga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-600">Terbaru</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;