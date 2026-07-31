import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function RecentItems() {
  const { products, addToCart } = useCart();
  const navigate = useNavigate();

  if (!products || !products.length) return null;
  const recentProducts = products.slice(0, 4);

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  return (
    <section className="recent-items-section" aria-label="Contextual recent items">
      <div className="recent-header">
        <div className="recent-title">
          <FiClock className="recent-icon" />
          <div>
            <h3>Still Looking For These?</h3>
            <p>Pick up right where you left off</p>
          </div>
        </div>
      </div>
      <div className="recent-grid">
        {recentProducts.map((p) => {
          if (!p) return null;
          return (
            <div key={p.id} className="recent-card" onClick={() => navigate(`/product/${p.id}`)}>
              <img src={p.image || ''} alt={p.name || 'Product'} className="recent-img" />
              <div className="recent-info">
                <span className="recent-category">{p.category || 'General'}</span>
                <h4 className="recent-name">{p.name || 'Untitled Item'}</h4>
                <div className="recent-price-row">
                  <span className="recent-price">₹{formatPrice(p.price)}</span>
                  {p.old ? <span className="recent-old">₹{formatPrice(p.old)}</span> : null}
                </div>
                <button
                  className="recent-quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, 1);
                  }}
                >
                  Add to Cart <FiArrowRight />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
