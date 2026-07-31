import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiLock, FiTruck, FiRefreshCw, FiShield, FiArrowRight, 
  FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMapPin, FiMail, FiPhone, FiArrowUp 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const { storeInfo } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const info = storeInfo || {
    address: '42 Tech Hub Avenue, 5th Floor, Bengaluru, Karnataka 560001',
    email: 'support@nexcart.dev',
    phone: '+91 (800) 420-NEX',
    instagram: 'https://instagram.com/nexcart',
    twitter: 'https://twitter.com/nexcart',
    facebook: 'https://facebook.com/nexcart',
    youtube: 'https://youtube.com/nexcart'
  };

  return (
    <footer className="main-footer" style={{ position: 'relative' }}>
      {location.pathname !== '/admin' && (
        <button 
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '30px',
            background: '#2874f0',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10
          }}
          title="Go to Home"
        >
          <FiArrowUp size={24} />
        </button>
      )}

      <div className="footer-top-trust">
        <div className="trust-item">
          <FiTruck />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders above ₹999 across India</p>
          </div>
        </div>
        <div className="trust-item">
          <FiRefreshCw />
          <div>
            <h4>14-Day Easy Returns</h4>
            <p>Hassle-free direct refunds & exchanges</p>
          </div>
        </div>
        <div className="trust-item">
          <FiLock />
          <div>
            <h4>Secure Checkout</h4>
            <p>256-bit SSL encrypted PCI payment gateway</p>
          </div>
        </div>
        <div className="trust-item">
          <FiShield />
          <div>
            <h4>Authentic Products</h4>
            <p>100% verified quality guarantee</p>
          </div>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <img 
              src="/favicon.ico" 
              alt="NexCart Logo" 
              className="footer-logo-img"
            />
            <div className="footer-brand-title">
              <span className="footer-brand-name">Nex<i>Cart</i></span>
              <span className="footer-tagline">✦ Premium Curated Marketplace</span>
            </div>
          </Link>
          <p>Smart shopping, simplified. Curating premium quality everyday gear, apparel, and home aesthetics with unmatched luxury standards.</p>
          
          <div className="footer-social-links margin-top-sm">
            {info.instagram && (
              <a href={info.instagram} target="_blank" rel="noreferrer" title="Instagram">
                <FiInstagram />
              </a>
            )}
            {info.twitter && (
              <a href={info.twitter} target="_blank" rel="noreferrer" title="Twitter">
                <FiTwitter />
              </a>
            )}
            {info.facebook && (
              <a href={info.facebook} target="_blank" rel="noreferrer" title="Facebook">
                <FiFacebook />
              </a>
            )}
            {info.youtube && (
              <a href={info.youtube} target="_blank" rel="noreferrer" title="YouTube">
                <FiYoutube />
              </a>
            )}
          </div>

          <div className="newsletter-box margin-top-sm">
            <span>Subscribe for secret drops & 10% OFF</span>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address..." />
              <button type="button" aria-label="Subscribe"><FiArrowRight /></button>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Electronics">Electronics & Audio</Link></li>
            <li><Link to="/products?category=Fashion">Fashion & Apparel</Link></li>
            <li><Link to="/products?category=Home%20%26%20Living">Home & Living</Link></li>
            <li><Link to="/products?category=Wearables">Wearables & Smartwatches</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/orders">Order Tracking</Link></li>
            <li><Link to="/faq">Shipping & Returns FAQ</Link></li>
            <li><Link to="/contact">Help & Support</Link></li>
            <li><Link to="/profile">My Account</Link></li>
            <li><Link to="/wishlist">Saved Wishlist</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Store Information</h4>
          <p className="store-info-text">
            <FiMapPin style={{ marginRight: '6px', color: '#2874f0' }} />
            {info.address}
          </p>
          <p className="store-contact-text">
            <FiMail style={{ marginRight: '6px', color: '#2874f0' }} />
            Email: {info.email}<br />
            <FiPhone style={{ marginRight: '6px', color: '#2874f0' }} />
            Phone: {info.phone}
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2026 NexCart Technologies Inc. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link to="/faq">Privacy Policy</Link>
          <Link to="/faq">Terms of Service</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
