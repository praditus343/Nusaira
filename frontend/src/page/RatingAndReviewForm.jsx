import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiClient from '../service/axiosInstance';

const RatingReviewForm = () => {
  const { supplier } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const fetchSupplierId = async () => {
      try {
        const response = await apiClient.get('/suppliers');
        const suppliers = response.data.data;
    
        const selectedSupplier = suppliers.find(
            (sup) => sup.supplier.toLowerCase() === decodeURIComponent(supplier).toLowerCase()
        );
    
        if (selectedSupplier) {
            setSupplierId(selectedSupplier.id);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Supplier tidak ditemukan.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Terjadi kesalahan saat mengambil data supplier.',
        });
    }    
    };

    if (supplier) {
      fetchSupplierId();
    }
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!supplierId || !reviewerName || !review) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Semua kolom harus diisi.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await apiClient.post('/reviews', {
          supplier_id: supplierId,
          reviewer_name: reviewerName,
          review_text: review,
          rating: rating,
      });
  
      Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Terima kasih atas ulasan Anda!',
      });
  
      setRating(0);
      setReview('');
      setReviewerName('');
      setHover(0);
  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengirim ulasan. Silakan coba lagi.',
      });
  } finally {
      setIsSubmitting(false);
  }  
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h3 className="text-xl font-semibold mb-4">Berikan Ulasan Anda</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama Reviewer</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full p-2 border rounded-lg border-gray-300"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className="bg-transparent border-none text-6xl mx-1"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star
                    fill={index <= (hover || rating) ? '#F59E0B' : 'none'}
                    stroke={index <= (hover || rating) ? '#F59E0B' : '#D1D5DB'}
                    strokeWidth={2}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ulasan</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded-lg border-gray-300"
            rows="4"
            placeholder="Tulis ulasan Anda di sini..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>
    </div>
  );
};

export default RatingReviewForm;
