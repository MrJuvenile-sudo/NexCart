import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiFilter, 
  FiStar, 
  FiHeart, 
  FiShoppingBag, 
  FiCheck, 
  FiChevronDown, 
  FiX, 
  FiTrendingUp, 
  FiPercent, 
  FiTruck,
  FiZap,
  FiArrowRight
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const QUICK_CATEGORIES = [
  'All',
  'Fashion',
  'Mobiles',
  'Electronics',
  'Smart Watches',
  'Gaming',
  'Beauty',
  'Home & Living',
  'Plants & Garden',
  'Appliances',
  'Toys & Baby',
  'Sports',
  'Food & Health',
  'Books',
  'Luxury',
  'Auto Accessories'
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1500', label: '₹500 - ₹1,500', min: 500, max: 1500 },
  { id: '1500-5000', label: '₹1,500 - ₹5,000', min: 1500, max: 5000 },
  { id: '5000-20000', label: '₹5,000 - ₹20,000', min: 5000, max: 20000 },
  { id: 'above-20000', label: 'Above ₹20,000', min: 20000, max: Infinity }
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'discount', label: 'Discount: High to Low' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Customer Rating' }
];

export default function ProductsOnlyForYou() {
  const { products, addToCart, wishlist, toggleWishlist } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(16);

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return safeProducts.filter(p => {
      if (!p) return false;

      // Category match
      if (selectedCategory !== 'All') {
        const pCat = (p.category || '').toLowerCase();
        const sCat = selectedCategory.toLowerCase();
        if (sCat.includes('home') && !pCat.includes('home')) return false;
        else if (sCat.includes('plant') && !pCat.includes('plant') && !pCat.includes('garden')) return false;
        else if (sCat.includes('watch') && !pCat.includes('watch')) return false;
        else if (sCat.includes('game') && !pCat.includes('game')) return false;
        else if (sCat.includes('sport') && !pCat.includes('sport')) return false;
        else if (sCat.includes('book') && !pCat.includes('book')) return false;
        else if (sCat.includes('lux') && !pCat.includes('lux')) return false;
        else if (sCat.includes('mobile') && !pCat.includes('mobile')) return false;
        else if (sCat.includes('auto') && !pCat.includes('auto')) return false;
        else if (sCat.includes('toy') && !pCat.includes('toy') && !pCat.includes('baby')) return false;
        else if (sCat.includes('food') && !pCat.includes('food') && !pCat.includes('health')) return false;
        else if (!pCat.includes(sCat) && !sCat.includes(pCat)) return false;
      }

      // Price range match
      const priceObj = PRICE_RANGES.find(r => r.id === selectedPriceRange);
      if (priceObj) {
        if (p.price < priceObj.min || p.price > priceObj.max) return false;
      }

      // Rating match
      if (minRating > 0 && (p.rating || 0) < minRating) return false;

      // Discount match
      if (minDiscount > 0) {
        const disc = p.old && p.old > p.price ? Math.round(((p.old - p.price) / p.old) * 100) : 0;
        if (disc < minDiscount) return false;
      }

      // Free Delivery match
      if (freeDeliveryOnly && p.price < 499) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') {
        const discA = a.old && a.old > a.price ? ((a.old - a.price) / a.old) : 0;
        const discB = b.old && b.old > b.price ? ((b.old - b.price) / b.old) : 0;
        return discB - discA;
      }
      return (b.reviews || 0) - (a.reviews || 0); // popular
    });
  }, [safeProducts, selectedCategory, selectedPriceRange, minRating, minDiscount, freeDeliveryOnly, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  // Active filters count calculation
  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + 
    (selectedPriceRange !== 'all' ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (minDiscount > 0 ? 1 : 0) + 
    (freeDeliveryOnly ? 1 : 0);

  const handleResetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    setMinRating(0);
    setMinDiscount(0);
    setFreeDeliveryOnly(false);
    setSortBy('popular');
    setDisplayCount(16);
    showToast('All filters cleared!', 'info');
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    if (typeof addToCart === 'function') {
      addToCart(product, 1);
      showToast(`Added ${product.name} to cart!`, 'success');
    }
  };

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    if (typeof toggleWishlist === 'function') {
      toggleWishlist(product);
      const isWish = Array.isArray(wishlist) && wishlist.some(item => item.id === product.id);
      showToast(isWish ? `Removed from wishlist` : `Added to wishlist!`, 'info');
    }
  };

  return (
    <section className="products-only-for-you-section" id="products-for-you">
      <div className="for-you-header-row">
        <div className="for-you-title-group">
          <div className="for-you-eyebrow-pill">
            <FiZap /> DISCOVER YOUR TASTE
          </div>
          <h2 className="for-you-main-heading">Products Only for You</h2>
          <p className="for-you-subheading">
            Personalized feed of {filteredProducts.length} top-rated products curated across 15 categories with Meesho-style multi-facet filters.
          </p>
        </div>

        {/* Sort & Filter Trigger Bar */}
        <div className="for-you-controls-bar">
          <div className="for-you-sort-wrapper">
            <span className="sort-label">Sort By:</span>
            <div className="sort-select-wrapper">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="for-you-sort-select"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
              <FiChevronDown className="select-arrow" />
            </div>
          </div>

          <button 
            type="button" 
            className={`for-you-filter-modal-btn ${activeFiltersCount > 0 ? 'has-active' : ''}`}
            onClick={() => setShowFiltersModal(!showFiltersModal)}
          >
            <FiFilter /> Filters {activeFiltersCount > 0 && <span className="active-filter-badge">{activeFiltersCount}</span>}
          </button>
        </div>
      </div>

      {/* Meesho-Style Quick Category Pills Horizontal Scroller */}
      <div className="for-you-category-pills-wrap">
        <div className="for-you-category-pills">
          {QUICK_CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`for-you-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setDisplayCount(16);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Meesho-Style Fast Facet Filters Strip */}
      <div className="for-you-facet-bar">
        
        {/* Price Range Quick Chips */}
        <div className="facet-group">
          <span className="facet-group-label">Price:</span>
          {PRICE_RANGES.map(range => (
            <button
              key={range.id}
              type="button"
              className={`facet-chip ${selectedPriceRange === range.id ? 'active' : ''}`}
              onClick={() => setSelectedPriceRange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Rating Quick Chips */}
        <div className="facet-group">
          <span className="facet-group-label">Rating:</span>
          {[4.5, 4.0].map(rating => (
            <button
              key={rating}
              type="button"
              className={`facet-chip ${minRating === rating ? 'active' : ''}`}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
            >
              <FiStar className="star-icon" /> {rating}+
            </button>
          ))}
        </div>

        {/* Discount Quick Chips */}
        <div className="facet-group">
          <span className="facet-group-label">Discount:</span>
          {[30, 50].map(disc => (
            <button
              key={disc}
              type="button"
              className={`facet-chip ${minDiscount === disc ? 'active' : ''}`}
              onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
            >
              <FiPercent /> {disc}%+ Off
            </button>
          ))}
        </div>

        {/* Free Delivery Toggle */}
        <button
          type="button"
          className={`facet-chip free-delivery-chip ${freeDeliveryOnly ? 'active' : ''}`}
          onClick={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
        >
          <FiTruck /> Free Delivery
        </button>

        {/* Clear All Reset Button */}
        {activeFiltersCount > 0 && (
          <button
            type="button"
            className="facet-clear-all-btn"
            onClick={handleResetAllFilters}
          >
            <FiX /> Clear ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {displayedProducts.length > 0 ? (
        <div className="for-you-products-grid">
          {displayedProducts.map(product => {
            const isWish = Array.isArray(wishlist) && wishlist.some(item => item.id === product.id);
            const discountPercent = product.old && product.old > product.price 
              ? Math.round(((product.old - product.price) / product.old) * 100) 
              : 0;

            return (
              <div 
                key={product.id}
                className="meesho-product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Card Image Container */}
                <div className="meesho-card-image-wrap">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80';
                    }}
                  />

                  {/* Wishlist Floating Heart */}
                  <button 
                    type="button"
                    className={`meesho-wishlist-btn ${isWish ? 'active' : ''}`}
                    onClick={(e) => handleWishlistClick(e, product)}
                    aria-label="Add to Wishlist"
                  >
                    <FiHeart />
                  </button>

                  {/* Top Left Discount or Special Badge */}
                  {discountPercent > 0 ? (
                    <span className="meesho-discount-badge">
                      {discountPercent}% OFF
                    </span>
                  ) : (
                    <span className="meesho-trending-badge">
                      <FiTrendingUp /> TRENDING
                    </span>
                  )}

                  {/* Free Delivery Tag */}
                  <span className="meesho-delivery-tag">
                    <FiTruck /> Free Delivery
                  </span>
                </div>

                {/* Card Content Details */}
                <div className="meesho-card-content">
                  <span className="meesho-brand-name">{product.brand || product.category}</span>
                  <h4 className="meesho-product-title" title={product.name}>
                    {product.name}
                  </h4>

                  {/* Price Section */}
                  <div className="meesho-price-row">
                    <strong className="meesho-current-price">₹{product.price.toLocaleString('en-IN')}</strong>
                    {product.old && (
                      <span className="meesho-old-price">₹{product.old.toLocaleString('en-IN')}</span>
                    )}
                    {discountPercent > 0 && (
                      <span className="meesho-off-text">{discountPercent}% off</span>
                    )}
                  </div>

                  {/* Rating & Trusted Pill */}
                  <div className="meesho-meta-row">
                    <div className="meesho-rating-pill">
                      <span>{product.rating || 4.8}</span>
                      <FiStar className="star-mini" />
                    </div>
                    <span className="meesho-reviews-count">({product.reviews || 120} reviews)</span>
                  </div>

                  {/* Trust Badge */}
                  <div className="meesho-trust-strip">
                    <span className="trust-check"><FiCheck /> 100% Genuine</span>
                    <span className="trust-dot">•</span>
                    <span>7 Days Return</span>
                  </div>

                  {/* Quick Add Button */}
                  <button 
                    type="button" 
                    className="meesho-add-cart-btn"
                    onClick={(e) => handleQuickAdd(e, product)}
                  >
                    <FiShoppingBag /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="for-you-empty-state">
          <div className="empty-icon-wrap">🔍</div>
          <h3>No products match your selected filters</h3>
          <p>Try adjusting your category, price range, or rating filters to explore more items.</p>
          <button 
            type="button" 
            className="for-you-reset-btn"
            onClick={handleResetAllFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Pagination Trigger */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="for-you-load-more-wrap">
          <span className="for-you-count-status">
            Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> Products
          </span>
          <button 
            type="button" 
            className="for-you-load-more-btn"
            onClick={() => setDisplayCount(prev => prev + 16)}
          >
            Load More Products <FiArrowRight />
          </button>
        </div>
      )}

    </section>
  );
}
