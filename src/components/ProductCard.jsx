import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiStar, FiPlus, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product }) {
  const { addToCart, triggerAuthModalForProduct, wishlist, toggleWishlist, setQuickViewProduct } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const isSaved = Array.isArray(wishlist) && wishlist.some(item => item && item.id === product.id);
  const discountPercent = (product.old && product.price) 
    ? Math.round(((product.old - product.price) / product.old) * 100) 
    : 0;

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      triggerAuthModalForProduct(product, 1);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-container">
        {discountPercent > 0 && (
          <span className="discount-pill">-{discountPercent}%</span>
        )}
        <button 
          className={`wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <FiHeart />
        </button>

        <img 
          src={product.image || ''} 
          alt={product.name || 'Product'} 
          onClick={() => navigate(`/product/${product.id}`)}
          loading="lazy"
        />

        <div className="card-overlay-actions">
          <button 
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <FiEye /> Quick View
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-brand-tag">{product.category || 'General'} • {product.brand || 'NexCart'}</span>
        <h3 
          className="product-title"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name || 'Untitled Item'}
        </h3>

        <div className="product-rating-row">
          <span className="stars">
            <FiStar /> <strong>{product.rating || 4.5}</strong>
          </span>
          <span className="review-count">({product.reviews || 0} reviews)</span>
        </div>

        <div className="product-price-row">
          <span className="price-current">₹{formatPrice(product.price)}</span>
          {product.old ? <span className="price-old">₹{formatPrice(product.old)}</span> : null}
        </div>

        <button 
          className="add-to-bag-btn"
          onClick={handleAddToCart}
        >
          <FiPlus /> Add to Bag
        </button>
      </div>
    </article>
  );
}
