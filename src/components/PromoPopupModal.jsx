import React, { useState } from 'react';
import { FiX, FiCheck, FiCopy, FiZap, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function PromoPopupModal() {
  const { promoPopup, isPromoPopupOpen, setIsPromoPopupOpen, applyCoupon } = useCart();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  if (!isPromoPopupOpen || !promoPopup || !promoPopup.enabled) return null;

  const handleCopyCode = () => {
    const codeToCopy = promoPopup.code || 'FREEDOM25';
    navigator.clipboard.writeText(codeToCopy);
    applyCoupon(codeToCopy);
    setCopied(true);
    addToast(`Copied code "${codeToCopy}" and applied to cart!`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDismiss = () => {
    setIsPromoPopupOpen(false);
    sessionStorage.setItem('nexcart_popup_dismissed', 'true');
  };

  const handleClaimAndShop = () => {
    handleCopyCode();
    handleDismiss();
    navigate('/products');
  };

  return (
    <div className="promo-popup-backdrop" onClick={handleDismiss}>
      <div className="promo-popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={handleDismiss} aria-label="Close modal">
          <FiX />
        </button>

        <div className="popup-grid">
          <div className="popup-image-side">
            <img src={promoPopup.image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80'} alt="Deal" />
            <div className="popup-image-overlay">
              <span className="popup-badge"><FiZap /> SPECIAL OFFER</span>
              <span className="popup-discount-big">{promoPopup.discount || '25% OFF'}</span>
            </div>
          </div>

          <div className="popup-content-side">
            <span className="popup-eyebrow">EXCLUSIVE MEMBER DROPS</span>
            <h2>{promoPopup.title || '🎉 Unlocked Freedom Sale Deal!'}</h2>
            <p>{promoPopup.sub || 'Claim an extra discount at checkout.'}</p>

            <div className="popup-coupon-box">
              <div className="coupon-code-wrap">
                <span className="coupon-label">PROMO CODE</span>
                <strong className="coupon-code">{promoPopup.code || 'FREEDOM25'}</strong>
              </div>
              <button className="copy-code-btn" onClick={handleCopyCode}>
                {copied ? <><FiCheck /> Applied!</> : <><FiCopy /> Copy Code</>}
              </button>
            </div>

            <button className="popup-cta-btn" onClick={handleClaimAndShop}>
              <FiShoppingBag /> {promoPopup.ctaText || 'Claim & Start Shopping'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
