import React from "react";
// Import Font Awesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Testimonial = () => {
  // Dummy data testimonial
  const dummyTestimonials = [
    {
      id: 1,
      text: "Bagus sangat membantu dalam mencatat keuangan",
      rating: 5,
      name: "Rohman Nur Rohim",
      role: "Pemilik Tambak",
      image: "/profile1.jpg",
    },
    {
      id: 2,
      text: "Sangat mudah digunakan dan efisien",
      rating: 4,
      name: "Putri Wulandari",
      role: "Pemilik Restoran",
      image: "/profile2.jpg",
    },
    {
      id: 3,
      text: "Mempermudah manajemen keuangan bisnis saya",
      rating: 5,
      name: "Budi Santoso",
      role: "Pengusaha",
      image: "/profile3.jpg",
    },
  ];

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-6">Kata Mereka</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {dummyTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-blue-50 p-6 rounded-lg max-w-xs shadow-lg"
          >
            <p className="text-lg mb-4">“{testimonial.text}”</p>
            <div className="text-yellow-400 text-lg mb-4 flex justify-center">
              {/* Generate bintang menggunakan Font Awesome */}
              {[...Array(testimonial.rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="mx-1" />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img
                src={testimonial.image}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
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
