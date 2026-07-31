import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, moveAllWishlistToBag } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page-container empty-wishlist-view">
        <div className="empty-wishlist-card">
          <div className="icon-circle"><FiHeart /></div>
          <h2>Your Wishlist is Empty</h2>
          <p>Explore our products and tap the heart icon on any product to save it here for later.</p>
          <Link to="/products" className="cta-btn primary lg">
            Discover Products <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Saved Wishlist</span>
      </div>

      <div className="wishlist-header-row">
        <div>
          <h1>Saved Wishlist <span>({wishlist.length} items)</span></h1>
          <p>Items saved to your account</p>
        </div>
        <button className="cta-btn primary" onClick={moveAllWishlistToBag}>
          <FiShoppingBag /> Move All to Shopping Bag
        </button>
      </div>

      <div className="product-cards-grid">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
