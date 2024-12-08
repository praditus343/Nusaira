import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthToNumber = (monthName) => {
  const months = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };
  return months[monthName] || 0;
};

const PriceTrendCard = ({ data }) => {
  const { city, predictions } = data;

  const totalPrediction = predictions.reduce((sum, item) => sum + item.prediction, 0);
  const yearlyAverage = totalPrediction / predictions.length;

  const sortedPredictions = predictions
    .map((item) => ({
      ...item,
      monthNumber: monthToNumber(item.month),
    }))
    .sort((a, b) => a.monthNumber - b.monthNumber);
  const chartData = sortedPredictions.map((item) => ({
    month: item.monthNumber,
    prediction: item.prediction,
  }));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{city}</h3>
        <span className="text-sm font-medium text-gray-600">
          Rata-rata Tahunan: Rp. {formatCurrency(yearlyAverage)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(month) => {
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return months[month];
            }} 
          />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip 
            labelFormatter={(value) => {
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return months[value] || "Unknown"; 
            }} 
            formatter={(value) => formatCurrency(value)}
          />
          <Line type="monotone" dataKey="prediction" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendCard;
