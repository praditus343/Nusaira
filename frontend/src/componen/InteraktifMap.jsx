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

const CITIES = {
  'JAWA BARAT': ['Bandung', 'Bekasi', 'Bogor', 'Cirebon', 'Subang'],
  'JAWA TIMUR': ['Tulungagung', 'Malang',  'Blitar',],
  'JAWA TENGAH': ['Pekalongan', 'Boyolali', 'Cilacap', 'Kebumen']
};

const locationData = [
  { id: 1, lat: -6.9147, lng: 107.6098, title: "Bandung" },
  { id: 2, lat: -6.2383, lng: 106.9756, title: "Bekasi" },
  { id: 3, lat: -6.5944, lng: 106.7896, title: "Bogor" },
  { id: 4, lat: -6.7074, lng: 108.5568, title: "Cirebon" },
  { id: 5, lat: -6.5714, lng: 107.7601, title: "Subang" },
  { id: 6, lat: -7.9794, lng: 112.6300, title: "Malang" },
  { id: 7, lat: -8.0941, lng: 112.1676, title: "Blitar" },
  { id: 8, lat: -8.0666, lng: 111.9022, title: "Tulungagung" },,
  { id: 9, lat: -6.8898, lng: 109.6747, title: "Pekalongan" },
  { id: 10, lat: -7.5386, lng: 110.7291, title: "Boyolali" },
  { id: 11, lat: -7.7273, lng: 109.0095, title: "Cilacap" },
  { id: 12, lat: -7.6772, lng: 109.6504, title: "Kebumen" },
];

const getProvinceColor = (city) => {
  if (CITIES['JAWA TIMUR'].includes(city)) return '#F97316';
  if (CITIES['JAWA TENGAH'].includes(city)) return '#8B5CF6';
  if (CITIES['JAWA BARAT'].includes(city)) return '#D97706';
  return '#6B7280';
};

const InteractiveMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

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
      const map = L.map(mapRef.current).setView([-7.5, 111.0], 6);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      locationData.forEach((location) => {
        const markerColor = getProvinceColor(location.title);

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
          iconSize: [20, 20]
        });

        const marker = L.marker([location.lat, location.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold mb-1">${location.title}</h3>
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="mt-4">
            <h2 className="font-bold">
              Persebaran Kota
            </h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] relative rounded-lg overflow-hidden flex flex-col">
          {/* Map */}
          <div ref={mapRef} className="w-full h-full flex-1 rounded-lg" />

          {/* Legend */}
          <div className="bg-white p-4 w-full max-w-lg mx-auto mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: '#D97706' }}
                ></div>
                <span>Jawa Barat</span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: '#F97316' }}
                ></div>
                <span>Jawa Timur</span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: '#8B5CF6' }}
                ></div>
                <span>Jawa Tengah</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
