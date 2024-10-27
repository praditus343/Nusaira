import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./ComponenCss/Navbar.css"; 

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo-circle"></div>
            <div className="navbar-items">
                <div className="search-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input type="text" placeholder="Search..." className="search-input " />
                </div>
                <div className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        Produk <span className={`arrow ${isDropdownOpen ? 'active' : ''}`}>&#9660;</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <a href="#product1">Produk 1</a>
                            <a href="#product2">Produk 2</a>
                            <a href="#product3">Produk 3</a>
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        Tentang Kami <span className={`arrow ${isDropdownOpen ? 'active' : ''}`}>&#9660;</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <a href="#about1">Info 1</a>
                            <a href="#about2">Info 2</a>
                            <a href="#about3">Info 3</a>
                        </div>
                    )}
                </div>
                <div className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown}>
                        Bootcamp <span className={`arrow ${isDropdownOpen ? 'active' : ''}`}>&#9660;</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <a href="#about1">Info 1</a>
                            <a href="#about2">Info 2</a>
                            <a href="#about3">Info 3</a>
                        </div>
                    )}
                </div>
                {/* Link ke Login dan Daftar */}
                <Link to="/login" className="border border-blue-600 text-blue-600 mx-3 py-2 px-4 rounded-md transition-colors hover:bg-blue-600 hover:text-white">
                  Login
                </Link>
            <Link to="/signup" className="bg-blue-600 text-white py-2 px-4 rounded-md transition-colors hover:bg-blue-700">
                 Daftar
            </Link>

            </div>
        </nav>
    );
};

export default Navbar;
