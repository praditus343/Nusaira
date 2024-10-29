import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/img/assets_foto/f1.png";
import img2 from "../assets/img/assets_foto/f2.png";
import img3 from "../assets/img/assets_foto/f3.png";
import img4 from "../assets/img/assets_foto/f4.png";
import img5 from "../assets/img/assets_foto/f5.png";
import img6 from "../assets/img/assets_foto/f5.png";

const Testimonial = () => {
  const testimonials = [
    { id: 1, text: "Bagus sangat membantu dalam mencatat keuangan", rating: 5, name: "Rohman Nur Rohim", role: "Pemilik Tambak", image: img1 },
    { id: 2, text: "Sangat mudah digunakan dan efisien", rating: 4, name: "Putri Wulandari", role: "Pemilik Restoran", image: img2 },
    { id: 3, text: "Mempermudah manajemen keuangan bisnis saya", rating: 5, name: "Budi Santoso", role: "Pengusaha", image: img3 },
    { id: 4, text: "Aplikasi ini membantu saya mengatur keuangan dengan lebih baik", rating: 4, name: "Andi Kurniawan", role: "Petani Lele", image: img4 },
    { id: 5, text: "Saya sangat puas dengan fitur-fitur yang disediakan", rating: 5, name: "Siti Khotimah", role: "Pemilik Toko Ikan", image: img5 },
    { id: 6, text: "Aplikasi ini sangat membantu dalam mengelola keuangan usaha saya", rating: 5, name: "Rina Wijayanti", role: "Pengusaha Pembenihan Lele", image: img6 },
  ];

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="text-center py-10 relative ml-10 me-10 mb-32">
      <h2 className="text-2xl font-bold mb-10">Kata Mereka</h2>

      {/* Container scrollable dengan drag-scroll */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex overflow-x-auto gap-6 cursor-grab"
        style={{ scrollBehavior: "smooth" }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="min-w-[300px] bg-blue-50 p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <p className="text-lg mb-2 text-center">"{testimonial.text}"</p>
            <div className="text-yellow-400 text-lg mb-2 flex">
              {[...Array(testimonial.rating)].map((_, j) => (
                <FontAwesomeIcon key={j} icon={faStar} className="mx-0.5" />
              ))}
            </div>
            <div className="flex flex-row items-center mt-4">
              <img
                src={testimonial.image}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
