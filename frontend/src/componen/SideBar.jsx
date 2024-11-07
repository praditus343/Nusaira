import {
  faBell,
  faCartPlus,
  faChartLine,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClipboardList,
  faDollarSign,
  faFileInvoice,
  faGraduationCap,
  faHeart,
  faHome, faMoneyBill,
  faNewspaper,
  faPlus,
  faTable,
  faTools,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import imgLogo from "../assets/Logo.png";

const MenuItem = ({ icon, label, children, isSidebarOpen, path }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = location.pathname === path;

  const isAnyChildActive = children?.some((child) => location.pathname === child.path);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAnyChildActive) {
      setIsOpen(true);
    }
  }, [isAnyChildActive]);

  if (!isSidebarOpen) return null;

  return (
    <div>
      {!children ? (
        <Link to={path}>
          <div className={`flex items-center justify-between py-2 px-4 text-white cursor-pointer hover:bg-blue-600`}>
            <div className="flex items-center">
              <FontAwesomeIcon icon={icon} className="mr-4" />
              {isSidebarOpen && (
                <span className={`${isActive ? 'text-white rounded-md px-2 bg-white bg-opacity-30' : ''}`} style={{ borderRadius: '5px' }}>
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
            onClick={toggleDropdown} 
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={icon} className="mr-2" />
              {isSidebarOpen && (
                <span className={`${isActive ? 'text-white rounded-md px-2 bg-white bg-opacity-30' : ''}`} style={{ borderRadius: '5px' }}>
                  {label}
                </span>
              )}
            </div>
            {children && isSidebarOpen && (
              isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {isOpen && children && isSidebarOpen && (
            <div className="ml-4">
              {children.map((child, index) => (
                <Link to={child.path} key={index}>
                  <div className={`py-2 px-4 text-white cursor-pointer hover:bg-blue-600`}>
                    {child.icon && <FontAwesomeIcon icon={child.icon} className="mr-2" />}
                    <span className={`${location.pathname === child.path ? 'rounded-md px-4 py-1 bg-white bg-opacity-30' : ''}`} style={{ borderRadius: '5px' }}>
                      {child.label}
                    </span>
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
    <div className={`min-h-screen bg-blue-500 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-12'} overflow-y-auto`}>
      {isSidebarOpen ? (
        <>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <img src={imgLogo} alt="Logo" className="w-12 h-12 rounded-full mr-2" />
              {isSidebarOpen && <span className="text-white text-xl mt-2 font-bold">NusAIra</span>}
            </div>
            <div className="cursor-pointer" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faChevronLeft} />
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
                { icon: faTools , label: "Management", path: "/ManajemenTambak" },
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
                { icon: faNewspaper, label: "Blog", path: "/Blog" },
                { icon: faHeart, label: "Penyakit Lele", path: "/PenyakitLele" },
                { icon: faBell, label: "Notifikasi", path: "/Notifikasi" },
                
              ]}
            />
            <MenuItem
              label="Bootcamp"
              isSidebarOpen={isSidebarOpen}
              children={[{ icon: faGraduationCap, label: "Budidaya", path: "/ELearning" }]}
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
        </>
      ) : (
        <div className="flex justify-center p-4 cursor-pointer" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;