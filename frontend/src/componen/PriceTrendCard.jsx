import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceTrendCard = ({ data }) => {
  const { city, predictions } = data;

  const chartData = predictions.map((item) => ({
    month: item.month,
    prediction: item.prediction,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
      <h3 className="text-lg font-semibold mb-4">{city}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="prediction" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendCard;
