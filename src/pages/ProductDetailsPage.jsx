import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiStar, FiShoppingBag, FiHeart, FiCheck, FiTruck, FiRefreshCw, 
  FiLock, FiChevronRight, FiPlus, FiMinus, FiEdit3, FiArrowLeft 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import ReviewModal from '../components/ReviewModal';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, addToCart, triggerAuthModalForProduct, wishlist, toggleWishlist } = useCart();
  const { user } = useAuth();

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
  const product = safeProducts.find(p => p.id === Number(id)) || safeProducts[0];

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || '');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="simple-page">
        <h2>Product not found</h2>
        <Link to="/products" className="cta-btn primary">Back to Shop</Link>
      </div>
    );
  }

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImg = selectedImage || product.image;
  const isSaved = Array.isArray(wishlist) && wishlist.some(item => item && item.id === product.id);
  const discountPercent = (product.old && product.price) ? Math.round(((product.old - product.price) / product.old) * 100) : 0;

  const relatedProducts = safeProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!user) {
      triggerAuthModalForProduct(product, quantity);
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="product-details-container">
      <div className="breadcrumbs">
        <Link to="/"><FiArrowLeft /> Home</Link> 
        <FiChevronRight /> 
        <Link to="/products">Shop</Link> 
        <FiChevronRight /> 
        <Link to={`/products?category=${encodeURIComponent(product.category || 'All')}`}>{product.category || 'Category'}</Link> 
        <FiChevronRight /> 
        <span>{product.name}</span>
      </div>

      <div className="details-main-grid">
        <div className="gallery-section">
          <div className="main-image-viewport">
            {discountPercent > 0 && <span className="discount-tag">-{discountPercent}% OFF</span>}
            <img src={activeImg} alt={product.name || 'Product'} />
          </div>

          {imagesList.length > 1 && (
            <div className="gallery-thumbnails">
              {imagesList.map((img, idx) => (
                <button 
                  key={idx}
                  className={`thumb-btn ${activeImg === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="details-info-section">
          <span className="brand-eyebrow">{(product.category || 'ELECTRONICS').toUpperCase()} • {(product.brand || 'NEXCART').toUpperCase()}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-summary-bar">
            <div className="stars-row">
              <FiStar /> <strong>{product.rating || 4.5}</strong>
            </div>
            <span className="dot">•</span>
            <span className="review-count">{product.reviews || 0} verified buyer reviews</span>
          </div>

          <div className="price-display-block">
            <span className="current-price">₹{formatPrice(product.price)}</span>
            {product.old ? <span className="old-price">₹{formatPrice(product.old)}</span> : null}
            {discountPercent > 0 && product.old && product.price ? (
              <span className="save-badge">Save ₹{formatPrice(product.old - product.price)}</span>
            ) : null}
          </div>

          <p className="product-description-lead">{product.description}</p>

          <div className="stock-indicator-pill">
            <FiCheck /> In stock ({product.stock || 10} units available) — Ships within 24 Hours
          </div>

          <div className="purchase-controls">
            <div className="quantity-selector-stepper">
              <label>Qty:</label>
              <div className="stepper-box">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease">
                  <FiMinus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase">
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="cta-button-group">
              <button className="cta-btn primary lg" onClick={handleAddToCart}>
                <FiShoppingBag /> Add to Bag
              </button>
              <button 
                className={`cta-btn outline lg ${isSaved ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <FiHeart /> {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="trust-perks-box">
            <div className="perk">
              <FiTruck />
              <span><strong>Free Express Delivery</strong> on orders over ₹999</span>
            </div>
            <div className="perk">
              <FiRefreshCw />
              <span><strong>14-Day Money Back Guarantee</strong> for easy returns</span>
            </div>
            <div className="perk">
              <FiLock />
              <span><strong>PCI DSS SSL Encrypted</strong> payment checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="details-tabs-container">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Detailed Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({product.reviews || 0})
          </button>
        </div>

        <div className="tab-content-panel">
          {activeTab === 'description' && (
            <div className="description-tab-body">
              <h3>Designed for Everyday Excellence</h3>
              <p>{product.description}</p>
              <p>Crafted to high standards of durability, comfort, and functional aesthetic. Every NexCart product undergoes rigorous quality testing before reaching your doorstep.</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="specs-grid-table">
              <div className="spec-row">
                <span className="spec-key">Product Name</span>
                <span className="spec-val">{product.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Brand</span>
                <span className="spec-val">{product.brand}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Category</span>
                <span className="spec-val">{product.category}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">SKU Code</span>
                <span className="spec-val">{product.sku || `NC-${product.id}`}</span>
              </div>
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="spec-row">
                  <span className="spec-key">{k}</span>
                  <span className="spec-val">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab-body">
              <div className="reviews-header-summary">
                <div className="rating-score-box">
                  <span className="big-rating-number">{product.rating || 4.5}</span>
                  <div className="stars-row"><FiStar /><FiStar /><FiStar /><FiStar /><FiStar /></div>
                  <span>Based on {product.reviews || 0} customer reviews</span>
                </div>
                <button 
                  className="cta-btn primary"
                  onClick={() => setReviewModalOpen(true)}
                >
                  <FiEdit3 /> Write a Review
                </button>
              </div>

              <div className="sample-reviews-list">
                <div className="review-card">
                  <div className="review-card-top">
                    <div className="reviewer-info">
                      <strong>Shubhank P.</strong>
                      <span className="verified-badge"><FiCheck /> Verified Buyer</span>
                    </div>
                    <span className="review-date">July 22, 2026</span>
                  </div>
                  <div className="stars-row"><FiStar /><FiStar /><FiStar /><FiStar /><FiStar /></div>
                  <h4>Exceeded my expectations!</h4>
                  <p>Build quality is top notch. Delivery was fast and packaging was secure. Will definitely buy again from NexCart.</p>
                </div>

                <div className="review-card">
                  <div className="review-card-top">
                    <div className="reviewer-info">
                      <strong>Priya S.</strong>
                      <span className="verified-badge"><FiCheck /> Verified Buyer</span>
                    </div>
                    <span className="review-date">July 18, 2026</span>
                  </div>
                  <div className="stars-row"><FiStar /><FiStar /><FiStar /><FiStar /><FiStar /></div>
                  <h4>Great value for money</h4>
                  <p>Functions exactly as described. Loved the design and smooth finish.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2>You May Also Like</h2>
          <div className="product-cards-grid">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {reviewModalOpen && (
        <ReviewModal product={product} onClose={() => setReviewModalOpen(false)} />
      )}
    </div>
  );
}
