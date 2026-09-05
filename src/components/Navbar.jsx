import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiX,
  FiLogOut, FiPackage, FiChevronDown, FiHelpCircle,
  FiGift, FiShield, FiTruck, FiZap
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { sanitizeSearchInput, searchCatalogProducts } from '../utils/searchEngine';

const TRENDING_SEARCHES = [
  'iPhone 16 Pro Max',
  'Wireless ANC Headphones',
  'Digital Air Fryer',
  'Breathable Sneakers',
  '15% Vitamin C Serum',
  '4K Dual Dash Cam'
];

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
          <img 
            src="/favicon.ico" 
            alt="NexCart Logo" 
            className="brand-logo-img"
          />
          <span className="brand-name">Nex<i>Cart</i></span>
          <span className="brand-plus-tag">PLUS <span className="plus-star">✦</span></span>
        </Link>
      </header>
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];
  const searchMatches = searchQuery.trim()
    ? searchCatalogProducts(safeProducts, searchQuery).slice(0, 6)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = sanitizeSearchInput(searchQuery);
    if (cleanQuery) {
      navigate(`/products?search=${encodeURIComponent(cleanQuery)}`);
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

  const displayName = user?.name ? user.name.split(' ')[0].toUpperCase() : 'ACCOUNT';

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

          <Link to="/" className="brand-logo" title="NexCart Store">
            <img 
              src="/favicon.ico" 
              alt="NexCart Logo" 
              className="brand-logo-img"
            />
            <span className="brand-name">Nex<i>Cart</i></span>
            <span className="brand-plus-tag">PLUS <span className="plus-star">✦</span></span>
          </Link>

          {/* Enhanced Search with Trending Suggestions */}
          <div className="nav-search-wrapper" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <input
                type="text"
                placeholder="Search for 5G mobiles, streetwear, electronics & appliances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              <button type="submit" className="search-submit-btn" aria-label="Search">
                <FiSearch />
              </button>
            </form>

            {searchFocused && (
              <div className="search-results-dropdown">
                {searchMatches.length > 0 ? (
                  <>
                    <div className="dropdown-header">Top Matching Results ({searchMatches.length})</div>
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
                  </>
                ) : (
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                      🔥 Trending Searches:
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {TRENDING_SEARCHES.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item);
                            navigate(`/products?search=${encodeURIComponent(item)}`);
                            setSearchFocused(false);
                          }}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '6px 12px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            color: '#334155',
                            fontWeight: '600'
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="nav-actions">
            <Link to="/offers" className="nav-link-item">
              <FiZap style={{ color: '#F59E0B' }} /> <span>Offers</span>
            </Link>
            <Link to="/my-account" className="nav-link-item">
              <FiUser style={{ color: '#4F46E5' }} /> <span>Account</span>
            </Link>
            <Link to="/wishlist" className="nav-link-item">
              <FiHeart style={{ color: '#EF4444' }} /> <span>Wishlist</span>
              {Array.isArray(wishlist) && wishlist.length > 0 && (
                <span className="wishlist-badge-count">{wishlist.length}</span>
              )}
            </Link>

            {user ? (
              <div className="user-menu-container" ref={userRef}>
                <button
                  className="user-profile-dropdown-btn user-vip-active"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="user-avatar-mini">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="user-name-label">{displayName}</span>
                  <FiChevronDown className={`chevron-icon ${userDropdownOpen ? 'open' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu luxury-dropdown">
                    <div className="user-dropdown-header">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{user?.name || 'Customer'}</strong>
                        <span className="vip-gold-chip">👑 VIP GOLD</span>
                      </div>
                      <small>{user?.email || 'customer@nexcart.dev'}</small>
                      
                      {/* Wallet Quick Status Bar */}
                      <div className="user-wallet-preview">
                        <div>
                          <span>Wallet Balance</span>
                          <strong>₹2,450</strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span>NexCoins</span>
                          <strong style={{ color: '#F59E0B' }}>★ 450</strong>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <Link to="/profile" onClick={() => setUserDropdownOpen(false)}>
                      <FiUser /> Account Dashboard
                    </Link>
                    <Link to="/orders" onClick={() => setUserDropdownOpen(false)}>
                      <FiPackage /> My Orders & Shipments
                    </Link>
                    <Link to="/wishlist" onClick={() => setUserDropdownOpen(false)}>
                      <FiHeart /> Saved Wishlist ({Array.isArray(wishlist) ? wishlist.length : 0})
                    </Link>
                    <Link to="/offers" onClick={() => setUserDropdownOpen(false)}>
                      <FiZap /> Deals & Promo Vouchers
                    </Link>
                    <Link to="/gift-cards" onClick={() => setUserDropdownOpen(false)}>
                      <FiGift /> Digital Gift Cards & Wallet
                    </Link>
                    <Link to="/track" onClick={() => setUserDropdownOpen(false)}>
                      <FiTruck /> Track Order
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
                    <FiGift /> Digital Gift Cards
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

        {/* Mobile Navigation Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-drawer-head">
                <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/favicon.ico" alt="NexCart Logo" className="brand-logo-img" />
                  <span className="brand-name">Nex<i>Cart</i></span>
                  <span className="brand-plus-tag">PLUS ✦</span>
                </Link>
                <button className="mobile-drawer-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <FiX />
                </button>
              </div>

              {/* User Greeting / Auth Bar */}
              <div className="mobile-drawer-user-card">
                {user ? (
                  <div className="mobile-user-info-row">
                    <div className="user-avatar-mini">{user.name?.[0]?.toUpperCase() || 'U'}</div>
                    <div className="mobile-user-text">
                      <strong>Hello, {user.name}</strong>
                      <span className="vip-gold-chip">👑 VIP GOLD</span>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-signin-prompt">
                    <p>Sign in to unlock cart, wishlist & orders</p>
                    <button className="mobile-signin-btn" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
                      <FiUser /> Sign In / Register
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Quick Links */}
              <div className="mobile-drawer-links-group">
                <div className="mobile-group-label">STORE NAVIGATION</div>
                <Link to="/products" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiPackage /> <span>All Products Catalog</span>
                </Link>
                <Link to="/offers" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiZap style={{ color: '#F59E0B' }} /> <span>Special Offers & Deals</span>
                </Link>
                <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiHeart style={{ color: '#EF4444' }} /> <span>My Wishlist</span>
                  {Array.isArray(wishlist) && wishlist.length > 0 && (
                    <span className="mobile-badge">{wishlist.length}</span>
                  )}
                </Link>
                <Link to="/track" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiTruck style={{ color: '#10B981' }} /> <span>Track Order Status</span>
                </Link>
                <Link to="/my-account" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiUser style={{ color: '#4F46E5' }} /> <span>Account & Orders</span>
                </Link>
                <Link to="/support" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiHelpCircle style={{ color: '#06B6D4' }} /> <span>24x7 Customer Help</span>
                </Link>
              </div>

              {/* Admin Panel Quick Link */}
              <div className="mobile-drawer-admin-strip">
                <Link to="/admin" className="mobile-admin-btn" onClick={() => setMobileMenuOpen(false)}>
                  <FiShield /> <span>Admin Control Center</span>
                </Link>
              </div>

              {user && (
                <div className="mobile-drawer-footer">
                  <button className="mobile-logout-btn" onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}>
                    <FiLogOut /> <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
