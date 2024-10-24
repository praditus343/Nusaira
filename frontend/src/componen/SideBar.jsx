import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown, faChevronUp, faHome, faMoneyBill, faTable, faFileExcel, faCartPlus, faDollarSign,
  faClipboardList, faNewspaper, faHeart, faBell, faPenSquare, faGraduationCap, faPlus, faUser, faFileInvoice, faChevronLeft, faChartLine,faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';

const MenuItem = ({ icon, label, children, isSidebarOpen, path }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = location.pathname === path;
  const isAnyChildActive = children?.some((child) => location.pathname === child.path);

  useEffect(() => {
    if (isAnyChildActive) {
      setIsOpen(true);
    }
  }, [isAnyChildActive]);

  return (
    <div>
      {!children ? (
        <Link to={path}>
          <div
            className={`flex items-center justify-between py-2 px-4 text-white cursor-pointer hover:bg-blue-600`}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={icon} className="mr-4" />
              {isSidebarOpen && (
               <span
               className={`${isActive ? 'border border-white text-white rounded-md px-2 bg-white bg-opacity-50 w-[150px]' : ''}`}
               style={{ borderRadius: '5px' }} 
             >
                  {label}
                </span>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <div
            className={`flex items-center justify-between py-2 px-4 text-white cursor-pointer hover:bg-blue-600`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={icon} className="mr-2" />
              {isSidebarOpen && (
                <span
                className={`${isActive ? 'border border-white text-white rounded-md px-2 bg-white bg-opacity-50 ' : ''}`}
                style={{ borderRadius: '5px' }}
              >
                  {label}
                </span>
              )}
            </div>
            {children && isSidebarOpen && (
              isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {(isOpen || isAnyChildActive) && children && isSidebarOpen && (
            <div className="ml-4">
              {children.map((child, index) => (
                <Link to={child.path} key={index}>
                  <div className={`py-2 px-4 text-white cursor-pointer hover:bg-blue-600 ${location.pathname === child.path ? '' : ''}`}>
                    {child.icon && <FontAwesomeIcon icon={child.icon} className="mr-2" />}
                    <span
                  className={`${
                    location.pathname === child.path ? 'border border-white rounded-md px-4 py-1 bg-white bg-opacity-50' : ''
                  }`}
                  style={{ borderRadius: '5px' }}
                >{child.label}</span>
                    
                  </div>
                </Link>
              ))}
            </div>
          )}
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
        <div className="flex items-center">
          <img src={""} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
          {isSidebarOpen && <span className="text-white text-xl font-bold">NusAira</span>}
        </div>
        <div className="cursor-pointer" onClick={toggleSidebar}>
          {isSidebarOpen ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
        </div>
      </div>
      <nav>
        <MenuItem
          icon={faHome}
          label="Home"
          isSidebarOpen={isSidebarOpen}
          path="/Home"
        />
        <MenuItem
          label="Budidaya/Tambak"
          isSidebarOpen={isSidebarOpen}
          children={[
            { icon: faPlus, label: "Input tambak baru", path: "/InputTambak" },
            { icon: faTable, label: "Daftar kolam", path: "/DaftarKolam" },
            { icon: faFileExcel, label: "Input excel", path: "/InputExcel" },
            { icon: faChartLine, label: "Simulasi", path: "/Simulasi" },
          ]}
        />
        <MenuItem
          label="Keuangan"
          isSidebarOpen={isSidebarOpen}
          children={[
            { icon: faCartPlus, label: "Pengeluaran", path: "/Pengeluaran" },
            { icon: faMoneyBill, label: "Pemasukan", path: "/Pemasukan" },
            { icon: faClipboardList, label: "Ringkasan", path: "/Ringkasan" },
            { icon: faClipboardList, label: "Laporan", path: "/Laporan" },
          ]}
        />
        <MenuItem
          label="Media"
          isSidebarOpen={isSidebarOpen}
          children={[
            { icon: faDollarSign, label: "Harga Lele", path: "/HargaLele" },
            { icon: faNewspaper, label: "Kabar Lele", path: "/KabarLele" },
            { icon: faHeart, label: "Penyakit Lele", path: "/PenyakitLele" },
            { icon: faBell, label: "Notifikasi", path: "/Notifikasi" },
            { icon: faPenSquare, label: "Blog", path: "/Blog" },
          ]}
        />
        <MenuItem
          label="Bootcamp"
          isSidebarOpen={isSidebarOpen}
          children={[{ icon: faGraduationCap, label: "Budidaya", path: "/Budidaya" }]}
        />
        <MenuItem
          label="Berlangganan"
          isSidebarOpen={isSidebarOpen}
          children={[
            { icon: faUser, label: "Akses Premium", path: "/AksesPremium" },
            { icon: faFileInvoice, label: "Invoice", path: "/Invoice" },
          ]}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
