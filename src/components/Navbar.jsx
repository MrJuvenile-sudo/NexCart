import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiX,
  FiLogOut, FiPackage, FiChevronDown, FiHelpCircle,
  FiGift, FiShield, FiTruck, FiZap
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, wishlist, products, topTicker } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef(null);
  const moreRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target)) setUserDropdownOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreDropdownOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (location.pathname === '/admin') {
    return null;
  }

  if (location.pathname === '/login') {
    return (
      <header className="main-navbar" style={{ display: 'flex', justifyContent: 'center', padding: '15px' }}>
        <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
          <div className="brand-title-wrap">
            <span className="brand-name" style={{ fontSize: '24px', fontWeight: 'bold' }}>Nex<i>Cart</i></span>
          </div>
        </Link>
      </header>
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];
  const searchMatches = searchQuery.trim()
    ? safeProducts.filter(p => p && `${p.name || ''} ${p.brand || ''} ${p.category || ''}`.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const handleSignOut = () => {
    setUserDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const handleCartClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const displayName = user?.name ? user.name.split(' ')[0].toUpperCase() : 'SHUBHANK';

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const ticker = topTicker || {
    enabled: true,
    text: '⚡ FREEDOM SALE LIVE: Up to 70% OFF across Mobiles, Electronics & Fashion',
    codeText: 'Use Coupon WELCOME20 for Extra 20% OFF',
    shippingText: 'Express 24-hr Free Shipping on orders over ₹999'
  };

  return (
    <>
      {ticker.enabled && (
        <div className="promo-ticker">
          <span>{ticker.text}</span>
          <span className="dot">•</span>
          <span>{ticker.codeText}</span>
          <span className="dot">•</span>
          <span>{ticker.shippingText}</span>
        </div>
      )}

      <header className="main-navbar">
        <div className="navbar-container">
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className="brand-logo">
            <img 
              src="/logo.png" 
              alt="NexCart Logo" 
              className="brand-logo-img"
              onError={(e) => { e.target.src = '/favicon.ico'; }}
            />
            <div className="brand-title-wrap">
              <span className="brand-name">Nex<i>Cart</i></span>
            </div>
          </Link>

          <div className="nav-search-wrapper" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              <button type="submit" className="search-submit-btn" aria-label="Search">
                <FiSearch />
              </button>
            </form>

            {searchFocused && searchMatches.length > 0 && (
              <div className="search-results-dropdown">
                <div className="dropdown-header">Matching Recommendations ({searchMatches.length})</div>
                {searchMatches.map(p => (
                  <div
                    key={p.id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setSearchFocused(false);
                      setSearchQuery('');
                    }}
                  >
                    <img src={p.image || ''} alt={p.name || 'Product'} />
                    <div>
                      <h4>{p.name}</h4>
                      <small>{p.category} • ₹{formatPrice(p.price)}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-actions">
            <Link to="/offers" className="nav-link-item">
              <FiZap style={{ color: '#F59E0B' }} /> <span>Offers</span>
            </Link>
            <Link to="/my-account" className="nav-link-item">
              <FiUser style={{ color: '#4F46E5' }} /> <span>My Account</span>
            </Link>
            <Link to="/wishlist" className="nav-link-item">
              <FiHeart style={{ color: '#EF4444' }} /> <span>Wishlist</span>
            </Link>

            {user ? (
              <div className="user-menu-container" ref={userRef}>
                <button
                  className="user-profile-dropdown-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <FiUser className="user-icon-lead" />
                  <span className="user-name-label">{displayName}</span>
                  <FiChevronDown className={`chevron-icon ${userDropdownOpen ? 'open' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="user-dropdown-header">
                      <strong>Hello, {user?.name || 'Shubhank Parihar'}</strong>
                      <small>{user?.email || 'shubhank@nexcart.dev'}</small>
                    </div>
                    <hr />
                    <Link to="/profile" onClick={() => setUserDropdownOpen(false)}>
                      <FiUser /> My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setUserDropdownOpen(false)}>
                      <FiPackage /> My Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setUserDropdownOpen(false)}>
                      <FiHeart /> Wishlist ({Array.isArray(wishlist) ? wishlist.length : 0})
                    </Link>
                    <Link to="/offers" onClick={() => setUserDropdownOpen(false)}>
                      <FiZap /> Deals & Coupons
                    </Link>
                    <Link to="/gift-cards" onClick={() => setUserDropdownOpen(false)}>
                      <FiGift /> Gift Cards & Wallet
                    </Link>
                    <Link to="/track" onClick={() => setUserDropdownOpen(false)}>
                      <FiTruck /> Track Shipment
                    </Link>
                    <hr />
                    <button
                      className="dropdown-logout-btn"
                      onClick={handleSignOut}
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="user-profile-dropdown-btn login-nav-link">
                <FiUser className="user-icon-lead" />
                <span>Sign In</span>
              </button>
            )}

            <div className="more-menu-container" ref={moreRef}>
              <button
                className="more-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              >
                <span>More</span>
                <FiChevronDown className={`chevron-icon ${moreDropdownOpen ? 'open' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="user-dropdown-menu more-dropdown">
                  <Link to="/support" onClick={() => setMoreDropdownOpen(false)}>
                    <FiHelpCircle /> 24x7 Customer Support
                  </Link>
                  <Link to="/track" onClick={() => setMoreDropdownOpen(false)}>
                    <FiTruck /> Track Order
                  </Link>
                  <Link to="/gift-cards" onClick={() => setMoreDropdownOpen(false)}>
                    <FiGift /> Gift Cards
                  </Link>
                  <Link to="/download-app" onClick={() => setMoreDropdownOpen(false)}>
                    <FiShield /> Download Mobile App
                  </Link>
                </div>
              )}
            </div>

            <button
              className="nav-action-btn cart-action-btn"
              onClick={handleCartClick}
              title="Shopping Cart"
            >
              <FiShoppingBag className="cart-icon-lead" />
              <span className="cart-label">Cart</span>
              {user && cartCount > 0 && <span className="action-badge pulse">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
