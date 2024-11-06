import React, { useEffect, useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/img/assets_foto/f1.png";
import img2 from "../assets/img/assets_foto/f2.png";
import img3 from "../assets/img/assets_foto/f3.png";
import img4 from "../assets/img/assets_foto/f4.png";
import img5 from "../assets/img/assets_foto/f5.png";
import img6 from "../assets/img/assets_foto/f5.png";
import "./ComponenCss/AntiBlok.css"

const Testimonial = () => {
  const testimonials = [
    { id: 1, text: "Bagus sangat membantu dalam mencatat keuangan", rating: 5, name: "Rohman Rohim", role: "Pemilik Tambak", image: img1 },
    { id: 2, text: "Sangat mudah digunakan dan efisien", rating: 4, name: "Putri Wulandari", role: "Pemilik Restoran", image: img2 },
    { id: 3, text: "Mempermudah manajemen keuangan bisnis saya", rating: 5, name: "Budi Santoso", role: "Pengusaha", image: img3 },
    { id: 4, text: "Aplikasi ini membantu saya mengatur keuangan dengan lebih baik", rating: 4, name: "Andi Kurniawan", role: "Petani Lele", image: img4 },
    { id: 5, text: "Saya sangat puas dengan fitur-fitur yang disediakan", rating: 5, name: "Siti Khotimah", role: "Pemilik Toko Ikan", image: img5 },
    { id: 6, text: "Aplikasi ini sangat membantu dalam mengelola keuangan usaha saya", rating: 5, name: "Rina Wijayanti", role: "Pengusaha Pembenihan Lele", image: img6 },
  ];

  const testimonialContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialContainerRef.current) {
        const container = testimonialContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const currentScroll = container.scrollLeft;

        if (currentScroll + container.clientWidth >= scrollWidth) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - testimonialContainerRef.current.offsetLeft);
    setScrollLeft(testimonialContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - testimonialContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    testimonialContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };


  return (
    <div className="text-center py-10 relative mx-auto mb-32 max-w-7xl px-4">
      <h2 className="text-2xl font-bold mb-10 no-select">Kata Mereka</h2>
      <div
        ref={testimonialContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-shrink-0 w-[100px] sm:w-[40%] bg-blue-50 p-6 rounded-lg  flex flex-col items-center justify-between border-2 border-grey-300"
          >
            <p className="text-lg mb-2 text-center line-clamp-3 overflow-hidden no-select">
              "{testimonial.text}"
            </p>
            
            <div className="text-yellow-400 text-lg mb-4 flex justify-center no-select">
              {[...Array(testimonial.rating)].map((_, j) => (
                <FontAwesomeIcon key={j} icon={faStar} className="mx-0.5" />
              ))}
            </div>
            <div className="flex items-center no-select">
              <img
                src={testimonial.image}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div className="flex flex-col justify-center text-left">
                <h4 className="font-semibold no-select">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 no-select">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
