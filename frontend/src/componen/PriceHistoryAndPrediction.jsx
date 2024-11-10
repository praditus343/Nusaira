import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const chartData = [
    { time: '20', price5: 70, price6: 35, price7: 45 },
    { time: '40', price5: 20, price6: 100, price7: 80 },
    { time: '60', price5: 110, price6: 85, price7: 60 },
    { time: '80', price5: 60, price6: 95, price7: 55 },
];

const predictionData = Array(8).fill({
    kg: '? Kg',
    minPrice: 'Rp. 50.000',
    maxPrice: 'Rp. 50.000'
});

const PriceHistoryAndPrediction = () => (
    <div className="flex gap-6 mb-8 mr-6">
        {/* Price History Chart - Takes up 60% of the space */}
        <div className="flex-[3]">
            <div className="bg-white w-full rounded-lg h-full">
                <div className="flex justify-between mb-4">
                    <h3 className="font-medium">Riwayat Harga Lele Di Boyolali</h3>
                </div>
                <div className='border border-blue-600 p-4 rounded-xl'>
                        <h4 className='text-center text-blue-600'>Riwayat</h4>
                    <div className="relative h-[400px] mr-10">
                        {/* Chart */}
                        <div className="h-full mt-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="price5" stroke="#2DD4BF" />
                                    <Line type="monotone" dataKey="price6" stroke="#F59E0B" />
                                    <Line type="monotone" dataKey="price7" stroke="#EC4899" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 ml-[300px] mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#2DD4BF]"></div>
                            <span>Harga Per 5Kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                            <span>Harga Per 6Kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#EC4899]"></div>
                            <span>Harga Per 7Kg</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Price Prediction Table - Takes up 40% of the space */}
        <div className="flex-[2] mt-20">
            <div className="bg-white w-full rounded-lg h-full ml-4">
                <h3 className="font-medium mb-4">Prediksi seminggu Kedepan</h3>
                <div className="border rounded-xl overflow-hidden border-blue-600">
                    <h4 className='p-6 mt-2 text-center text-blue-600'>Prediksi</h4>
                    <table className="w-full">
                        <thead className="bg-blue-100 border border-blue-200">
                        
                            <tr>
                                <th className="px-4 py-2 text-left">Kg</th>
                                <th className="px-4 py-2 text-left">Harga Min</th>
                                <th className="px-4 py-2 text-left">Harga Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictionData.map((item, idx) => (
                                <tr key={idx} className="border-t border border-blue-200">
                                    <td className="px-4 py-2">{item.kg}</td>
                                    <td className="px-4 py-2">{item.minPrice}</td>
                                    <td className="px-4 py-2">{item.maxPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default PriceHistoryAndPrediction;