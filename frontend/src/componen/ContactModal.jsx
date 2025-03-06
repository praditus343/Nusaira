import { Check, Copy, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./ComponenCss/ContactModal.css";
import apiClient from "../service/axiosInstance";

const ContactPopup = ({ onClose, supplier }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [supplierData, setSupplierData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await apiClient.get("/suppliers");
        const foundSupplier = response.data.data.find(
          (s) => s.supplier.toLowerCase() === supplier.toLowerCase()
        );

        setSupplierData(foundSupplier);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [supplier]);

  useEffect(() => {
    if (!loading) {
      const animationTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 2000);

      return () => clearTimeout(animationTimer);
    }
  }, [loading]);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading || !animationComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p className="text-animation">Sedang memuat...</p>
        </div>
      </div>
    );
  }

  if (error || !supplierData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">Gagal memuat data kontak</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-blue-500">
            Hubungi {supplier}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center group">
            <div>
              <p className="text-gray-600">No WhatsApp:</p>
              <p className="font-medium">+{supplierData.whatsapp}</p>
            </div>
            <button
              onClick={() => copyToClipboard(supplierData.whatsapp, "whatsapp")}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              {copiedField === "whatsapp" ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-blue-500" />
              )}
              <span className="absolute -top-8 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedField === "whatsapp" ? "Tersalin!" : "Salin nomor"}
              </span>
            </button>
          </div>

          <div className="flex justify-between items-center group">
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">
                {`${supplierData.supplier
                  .toLowerCase()
                  .replace(/\s+/g, "")}@gmail.com`}
              </p>
            </div>
            <button
              onClick={() =>
                copyToClipboard(
                  `${supplierData.supplier
                    .toLowerCase()
                    .replace(/\s+/g, "")}@gmail.com`,
                  "email"
                )
              }
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              {copiedField === "email" ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-blue-500" />
              )}
              <span className="absolute -top-8 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedField === "email" ? "Tersalin!" : "Salin email"}
              </span>
            </button>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50 mb-10">
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Peringatan
            </h3>
            <p className="text-red-600">
              Dilarang keras menyebarkan kontak ini. Pelanggaran akan ditindak
              tegas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
