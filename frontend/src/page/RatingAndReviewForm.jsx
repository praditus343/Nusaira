import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

const RatingReviewForm = () => {
  const { supplier } = useParams(); // Mengambil nama supplier dari URL
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewerName, setReviewerName] = useState(''); // Input untuk nama reviewer
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const fetchSupplierId = async () => {
      try {
        const response = await axios.get('https://nusaira-be.vercel.app/api/suppliers');
        const suppliers = response.data.data;

        const selectedSupplier = suppliers.find(
          (sup) => sup.supplier.toLowerCase() === decodeURIComponent(supplier).toLowerCase()
        );
        
        if (selectedSupplier) {
          setSupplierId(selectedSupplier.id); // Set supplier_id
        } else {
          setSubmitMessage('Supplier tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      }
    };

    if (supplier) {
      fetchSupplierId();
    }
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    if (!supplierId || !reviewerName || !review) {
      setSubmitMessage('Semua kolom harus diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://nusaira-be.vercel.app/api/reviews', {
        supplier_id: supplierId,      
        reviewer_name: reviewerName,   
        review_text: review,           
        rating: rating                 
      });

      setSubmitMessage('Terima kasih atas ulasan Anda!');
      setRating(0);
      setReview('');
      setReviewerName('');
    } catch (error) {
      setSubmitMessage('Gagal mengirim ulasan. Silakan coba lagi.');
      console.error('Error submitting review:', error);
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
            className="w-full p-2 border rounded-lg"
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
                  className={`${
                    index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                  } bg-transparent border-none text-3xl`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star />
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
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Tulis ulasan Anda di sini..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>

      {submitMessage && (
        <div
          className={`mt-4 text-center ${
            submitMessage.includes('Terima kasih') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default RatingReviewForm;
