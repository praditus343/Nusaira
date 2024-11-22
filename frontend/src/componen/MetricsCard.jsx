import React, { useState, useRef } from 'react';

const MetricCard = ({ onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  
  const sliderRef = useRef(null);

  const metrics = [
    {
      id: 1,
      label: 'Estimasi Biomassa',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-weight-hanging',
      color: 'text-blue-500',
    },
    {
      id: 2,
      label: 'Panen Kumulatif',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-fish',
      color: 'text-green-500',
    },
    {
      id: 3,
      label: 'Pakan Kumulatif',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-utensils',
      color: 'text-yellow-500',
    },
    {
      id: 4,
      label: 'Estimasi SR',
      value: '0',
      unit: '% dari 1 kolam',
      icon: 'fas fa-chart-line',
      color: 'text-red-500',
    },
    {
      id: 5,
      label: 'Estimasi Nilai Jual',
      value: '0',
      unit: 'Kg dari 1 kolam',
      icon: 'fas fa-database',
      color: 'text-cyan-500',
    }
  ];

 

  const handleMouseDown = (e) => {
    const isCard = e.target.closest(".metric-card");

    if (isCard) {
      setDragDistance(0);
      return;
    }

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      sliderRef.current.style.cursor = 'grab';
      if (dragDistance < 10) {
        setIsClicking(true);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    setDragDistance(Math.abs(walk));
  };

  return (
    <div
      ref={sliderRef}
      className="overflow-x-auto flex space-x-5 py-4 cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative border-2 border-gray-300 min-w-[250px] mx-2 select-none metric-card`
            
          }
        >
          <div className={`absolute top-2 right-2 ${metric.color} rounded-full p-2`}>
            <i className={`${metric.icon} ${metric.color} text-lg`}></i>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm font-medium mb-2">{metric.label}</h4>
            <p className={`${metric.color} text-3xl font-bold`}>{metric.value}</p>
          </div>
          <p className="text-gray-500 text-sm">{metric.unit}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
