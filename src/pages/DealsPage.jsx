import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTag, FiClock, FiCopy, FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function DealsPage() {
  const { products, applyCoupon } = useCart();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState('');

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
  const discountedProducts = safeProducts.filter(p => p.old && p.old > p.price);

  const coupons = [
    { code: 'WELCOME20', discount: '20% OFF', desc: 'Valid on first order over ₹1,499', expiry: 'Limited Time' },
    { code: 'FREEDOM25', discount: '25% OFF', desc: 'Freedom Sale Special across all categories', expiry: 'Ends Soon' },
    { code: 'NEX10', discount: '₹500 OFF', desc: 'Flat ₹500 discount on cart total over ₹2,999', expiry: 'Active Today' },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  return (
    <div className="deals-page-container">
      <div className="deals-hero-banner">
        <div className="banner-badge"><FiZap /> LIGHTNING DEALS & PROMOS</div>
        <h1>Exclusive Offers & Secret Coupons</h1>
        <p>Save big with active discount codes and maximum-price drop deals across electronics, fashion, and home essentials.</p>
      </div>

      <section className="coupons-section margin-top">
        <h2><FiTag /> Active Promo Codes (Click to Apply)</h2>
        <div className="coupons-grid">
          {coupons.map((c) => (
            <div key={c.code} className="coupon-card">
              <div className="coupon-left">
                <span className="discount-badge">{c.discount}</span>
                <h3>{c.code}</h3>
                <p>{c.desc}</p>
                <small><FiClock /> {c.expiry}</small>
              </div>
              <button 
                className={`copy-btn ${copiedCode === c.code ? 'applied' : ''}`}
                onClick={() => handleCopyCode(c.code)}
              >
                {copiedCode === c.code ? <><FiCheck /> Applied</> : <><FiCopy /> Apply Code</>}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="deals-products-section margin-top-lg">
        <div className="section-header">
          <div>
            <span className="section-subtitle">MAXIMUM SAVINGS</span>
            <h2>🔥 High Discount Price Drops</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/products')}>
            View Full Catalog <FiArrowRight />
          </button>
        </div>
        <div className="product-cards-grid">
          {discountedProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
