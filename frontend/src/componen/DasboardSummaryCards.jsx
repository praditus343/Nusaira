import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "./CardManagement";
import { 
  NewspaperIcon, 
  ActivityIcon, 
  MessageSquareIcon, 
  BellIcon, 
  TruckIcon, 
  PackageIcon,
  CreditCard,
  BookUser
} from "lucide-react";

export const DashboardSummaryCards = ({ 
  beritaData, 
  penyakitData, 
  pesanData, 
  notifikasiData,
  suppliersData,
  productsData,
  tagihanData,
  bukuData
}) => {
  const cardData = [
    {
      title: "Total Berita",
      icon: NewspaperIcon,
      value: beritaData && Array.isArray(beritaData.berita) 
        ? beritaData.berita.length 
        : 0,
      textColor: "text-blue-600",
      bottomText: "Berita Terbaru"
    },
    {
      title: "Total Penyakit",
      icon: ActivityIcon,
      value: penyakitData?.length || 0,
      textColor: "text-green-600",
      bottomText: "Penyakit Aktif"
    },
    {
      title: "Pesan Masuk",
      icon: MessageSquareIcon,
      value: pesanData?.length || 0,
      textColor: "text-purple-600",
      bottomText: "Pesan Masuk Baru"
    },
    {
      title: "Notifikasi Baru",
      icon: BellIcon,
      value: notifikasiData?.length || 0,
      textColor: "text-red-600",
      bottomText: "Notifikasi Pending"
    },
    {
      title: "Supplier Baru",
      icon: TruckIcon,
      value: suppliersData?.length || 0,
      textColor: "text-orange-600",
      bottomText: "Supplier Terdaftar"
    },
    {
      title: "Produk Baru",
      icon: PackageIcon,
      value: productsData?.length || 0,
      textColor: "text-teal-600",
      bottomText: "Produk Tersedia"
    },
    {
      title: "Tagihan Pengguna",
      icon: CreditCard,
      value: tagihanData?.length || 0,
      textColor: "text-indigo-600",
      bottomText: "Tagihan Tersedia"
    },
    {
      title: "Buku Baru",
      icon: BookUser,
      value: bukuData?.length || 0,
      textColor: "text-cyan-600",
      bottomText: "Buku Tersedia"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <Card 
          key={index} 
          className="bg-white text-gray-800 flex flex-col shadow-md"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-5 w-5 ${card.textColor}`} />
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className={`text-2xl font-bold tracking-tight flex-grow ${card.textColor}`}>
              {card.value}
            </div>
            <div className="mt-2 text-xs opacity-80">
              <span>{card.bottomText}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
