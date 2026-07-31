import React, { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ReviewModal({ product, onClose }) {
  const { addProductReview } = useCart();
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addProductReview(product.id, {
      rating,
      headline,
      comment,
      author: user?.name || 'Verified Customer',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          <FiX />
        </button>

        <h3>Write a Review</h3>
        <p className="subtitle">Share your feedback for <strong>{product.name}</strong></p>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="star-rating-picker">
            <label>Overall Rating</label>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <FiStar />
                </button>
              ))}
              <span className="rating-label-text">{rating} out of 5 stars</span>
            </div>
          </div>

          <div className="form-group">
            <label>Review Headline</label>
            <input 
              type="text"
              placeholder="Summarize your experience (e.g., Amazing sound quality!)"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Review</label>
            <textarea 
              rows={4}
              placeholder="What did you like or dislike about this product?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="cta-btn primary full-width">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
