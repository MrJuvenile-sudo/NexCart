import React, { useState } from 'react';
import { FiGift, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function GiftCardsPage() {
  const { showToast } = useToast();
  const [amount, setAmount] = useState(2500);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!recipientEmail) return;
    showToast(`NexCart Luxury Gift Card worth ₹${amount.toLocaleString('en-IN')} sent to ${recipientEmail}!`, 'success');
    setRecipientEmail('');
    setMessage('');
  };

  return (
    <div className="gift-page-container">
      <div className="gift-hero-banner">
        <div className="banner-badge"><FiGift /> NEXCART DIGITAL GIFT CARDS</div>
        <h1>Give the Gift of Choice</h1>
        <p>Instant digital gift cards for birthdays, anniversaries, and corporate rewards. Redeemable across all 10,000+ curated products on NexCart.</p>
      </div>

      <div className="gift-page-grid margin-top">
        <div className="gift-card-preview-side">
          <div className="luxury-gift-card">
            <div className="card-top">
              <span className="card-logo">Nex<b>Cart</b> ✦</span>
              <span className="card-type">DIGITAL GIFT CARD</span>
            </div>
            <div className="card-body">
              <span className="card-amount">₹{amount.toLocaleString('en-IN')}</span>
              <p>Valid on all Mobiles, Electronics, Fashion & Home</p>
            </div>
            <div className="card-bottom">
              <span>Code: NEXGIFT-XXXX-2026</span>
              <span>Expires: Never</span>
            </div>
          </div>

          <div className="perks-list margin-top">
            <div className="perk"><FiCheckCircle /> Instant email delivery within 60 seconds</div>
            <div className="perk"><FiCheckCircle /> Zero activation fee or expiry date</div>
            <div className="perk"><FiCheckCircle /> Combined with sales & promo coupons</div>
          </div>
        </div>

        <div className="gift-form-side">
          <h2>Customize & Send Gift Card</h2>
          <form onSubmit={handlePurchase} className="gift-form">
            <div className="form-group">
              <label>Select Gift Card Value (₹)</label>
              <div className="amount-pills-row">
                {[1000, 2500, 5000, 10000].map(val => (
                  <button 
                    key={val}
                    type="button"
                    className={`amount-pill ${amount === val ? 'active' : ''}`}
                    onClick={() => setAmount(val)}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group margin-top">
              <label>Recipient's Email Address</label>
              <input 
                type="email" 
                placeholder="recipient@example.com" 
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group margin-top">
              <label>Personal Message (Optional)</label>
              <textarea 
                rows={3} 
                placeholder="Wishing you a wonderful celebration!" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="cta-btn primary full-width lg margin-top">
              Send Gift Card (₹{amount.toLocaleString('en-IN')}) <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
