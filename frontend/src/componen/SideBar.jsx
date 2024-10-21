import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, DollarSign, Image, Book, Users } from 'lucide-react';

const MenuItem = ({ icon: Icon, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div 
        className="flex items-center justify-between py-2 px-4 text-white hover:bg-blue-600 cursor-pointer"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="mr-2" size={18} />
          <span>{label}</span>
        </div>
        {children && (isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </div>
      {isOpen && children && (
        <div className="ml-4">
          {children.map((child, index) => (
            <div key={index} className="py-2 px-4 text-white hover:bg-blue-600 cursor-pointer">
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-500 text-white">
      <div className="flex items-center justify-between p-4">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <div className="cursor-pointer">☰</div>
      </div>
      <nav>
        <MenuItem icon={Home} label="Home" />
        <MenuItem icon={Users} label="Budidaya/Tambak" children={[
          "Input tambak baru",
          "Daftar kolam",
          "Input excel",
          "Simulasi"
        ]} />
        <MenuItem icon={DollarSign} label="Keuangan" children={[
          "Pengeluaran",
          "Pemasukan",
          "Ringkasan",
          "Laporan"
        ]} />
        <MenuItem icon={Image} label="Media" children={[
          "Harga Lele",
          "Kabar Lele",
          "Penyakit Lele",
          "Notifikasi",
          "Blog"
        ]} />
        <MenuItem icon={Book} label="Bootcamp" children={["Budidaya"]} />
        <MenuItem icon={Users} label="Berlangganan" children={[
          "Akses Premium",
          "Invoice"
        ]} />
      </nav>
    </div>
  );
};

export default Sidebar;