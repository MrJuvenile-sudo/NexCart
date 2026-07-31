import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiStar, FiShoppingBag, FiHeart, FiCheck, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = wishlist.some(item => item.id === product.id);

  const handleClose = () => setQuickViewProduct(null);

  const handleAddAndGo = () => {
    addToCart(product, 1);
    handleClose();
  };

  const handleViewFullDetails = () => {
    handleClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="quickview-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={handleClose}>
          <FiX />
        </button>

        <div className="quickview-grid">
          <div className="quickview-media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="quickview-details">
            <span className="eyebrow-tag">{product.category} • {product.brand}</span>
            <h2>{product.name}</h2>

            <div className="rating-badge-row">
              <span className="rating-badge"><FiStar /> {product.rating}</span>
              <span className="reviews-text">{product.reviews} verified buyer reviews</span>
            </div>

            <div className="price-container">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.old && <span className="old-price">₹{product.old.toLocaleString('en-IN')}</span>}
            </div>

            <p className="product-summary">{product.description}</p>

            <div className="stock-status-chip">
              <FiCheck /> In Stock — Ready to ship in 24 hours
            </div>

            <div className="quickview-actions">
              <button className="cta-btn primary" onClick={handleAddAndGo}>
                <FiShoppingBag /> Add to Bag
              </button>
              <button 
                className={`cta-btn outline ${isSaved ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FiHeart /> {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            <button className="view-full-page-link" onClick={handleViewFullDetails}>
              View Full Product Details & Specifications <FiArrowRight />
            </button>

            <div className="mini-trust-perks">
              <span><FiTruck /> Free delivery over ₹999</span>
              <span><FiShield /> 14-day hassle-free returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
