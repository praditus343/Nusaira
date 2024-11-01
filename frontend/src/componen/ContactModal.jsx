import React, { useState } from 'react';
import { Copy, X, Check, MapPin } from 'lucide-react';

// Data kontak untuk setiap supplier
const supplierContacts = {
  "Mr. Prengky": {
    phone: "085700120940",
    email: "prengky@gmail.com"
  },
  "Mr. Rito": {
    phone: "089501877105",
    email: "rito@gmail.com"
  },
  "Mr. Iqbalhan": {
    phone: "089630488945",
    email: "iqbalhan@gmail.com"
  }
};

const ContactPopup = ({ onClose, supplier }) => {
  const [copiedField, setCopiedField] = useState(null);
  
  const contactInfo = supplierContacts[supplier];

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-blue-500">Hubungi {supplier}</h2>
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
              <p className="text-gray-600">No Telefon:</p>
              <p className="font-medium">{contactInfo.phone}</p>
            </div>
            <button 
              onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              {copiedField === 'phone' ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-blue-500" />
              )}
              <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedField === 'phone' ? 'Tersalin!' : 'Salin nomor'}
              </span>
            </button>
          </div>

          <div className="flex justify-between items-center group">
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{contactInfo.email}</p>
            </div>
            <button 
              onClick={() => copyToClipboard(contactInfo.email, 'email')}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              {copiedField === 'email' ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} className="text-blue-500" />
              )}
              <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedField === 'email' ? 'Tersalin!' : 'Salin email'}
              </span>
            </button>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-red-200 bg-red-50 mb-10">
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Peringatan
            </h3>
            <p className="text-red-600">
              Dilarang keras menyebarkan kontak ini. Pelanggaran akan ditindak tegas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;