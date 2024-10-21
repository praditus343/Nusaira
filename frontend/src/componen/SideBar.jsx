import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, DollarSign, Image, Book, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const MenuItem = ({ icon: Icon, label, children, isSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div 
        className="flex items-center justify-between py-2 px-4 text-white hover:bg-blue-600 cursor-pointer"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="mr-2" size={18} />
          {isSidebarOpen && <span>{label}</span>}
        </div>
        {children && isSidebarOpen && (isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </div>
      {isOpen && children && isSidebarOpen && (
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);  
  
    return (
      <div className={`min-h-screen bg-blue-500 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} overflow-y-auto`}>
        <div className="flex items-center justify-between p-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </div>
        </div>
        <nav>
          <MenuItem icon={Home} label="Home" isSidebarOpen={isSidebarOpen} />
          <MenuItem icon={Users} label="Budidaya/Tambak" isSidebarOpen={isSidebarOpen} children={[
            "Input tambak baru",
            "Daftar kolam",
            "Input excel",
            "Simulasi"
          ]} />
          <MenuItem icon={DollarSign} label="Keuangan" isSidebarOpen={isSidebarOpen} children={[
            "Pengeluaran",
            "Pemasukan",
            "Ringkasan",
            "Laporan"
          ]} />
          <MenuItem icon={Image} label="Media" isSidebarOpen={isSidebarOpen} children={[
            "Harga Lele",
            "Kabar Lele",
            "Penyakit Lele",
            "Notifikasi",
            "Blog"
          ]} />
          <MenuItem icon={Book} label="Bootcamp" isSidebarOpen={isSidebarOpen} children={["Budidaya"]} />
          <MenuItem icon={Users} label="Berlangganan" isSidebarOpen={isSidebarOpen} children={[
            "Akses Premium",
            "Invoice"
          ]} />
        </nav>
      </div>
    );
  };
  
export default Sidebar;