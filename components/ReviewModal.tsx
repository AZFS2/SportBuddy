import React, { useState } from 'react';
import { BuddyProfile } from '../types';
import { StarIcon, XIcon } from './Icons';

interface ReviewModalProps {
  buddy: BuddyProfile;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ buddy, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-50 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative scale-100 animate-in zoom-in-95 duration-200 border border-surface-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 bg-surface-100 rounded-full transition"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={buddy.avatarUrl} alt={buddy.name} className="w-16 h-16 rounded-full object-cover mb-3 border-4 border-surface-100" />
          <h3 className="text-xl font-bold text-white">Rate {buddy.name}</h3>
          <p className="text-sm text-gray-400">How was your match?</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none transition-transform active:scale-90"
              >
                <StarIcon 
                  className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                  filled={star <= rating} 
                />
              </button>
            ))}
          </div>

          <div className="mb-6">
            <textarea
              className="w-full p-3 bg-surface-100 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none h-24 border border-surface-200"
              placeholder="Share your experience (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full py-3.5 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-400 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;