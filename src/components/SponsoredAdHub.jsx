import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function SponsoredAdHub() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const carouselRef = useRef(null);

  const handleScroll = (offset) => {
    if (carouselRef.current) {
      try {
        carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      } catch {
        carouselRef.current.scrollLeft += offset;
      }
    }
  };

  const handleSponsoredInfo = (e, name) => {
    e.stopPropagation();
    showToast(`"${name}" is a verified sponsored partner promotion.`, 'info');
  };

  return (
    <section className="sponsored-ad-hub-section">
      <div className="home-container">
        
        {/* Top Tier: Multi-Card Grid Ad Banners */}
        <div className="hero-ads-grid-tier">
          
          {/* Card 1: WHOOP Health Brand Billboard */}
          <div 
            className="hero-ad-card whoop-billboard-card"
            onClick={() => navigate('/category/electronics')}
          >
            <div className="whoop-ad-overlay">
              <h2 className="whoop-title">24/7 insights for<br />better health</h2>
              <p className="whoop-subtitle">Designed to improve you</p>
              <div className="whoop-brand-logo">
                <span>WHOOP</span><sup>®</sup>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=700&q=80" 
              alt="WHOOP 4.0 Health Tracker"
              className="whoop-ad-bg-img"
            />
          </div>

          {/* Card 2: OnePlus Nord Launch Ad */}
          <div 
            className="hero-ad-card phone-launch-card"
            onClick={() => navigate('/category/mobiles')}
          >
            <div className="card-top-content">
              <div className="price-header-row">
                <span className="price-old-cut">₹28,999</span>
                <strong className="price-main-bold">₹21,499^</strong>
              </div>
              <p className="ad-card-desc">Power that lasts up to 2.5 days*</p>
              <div className="brand-product-pill">
                <span className="brand-logo-symbol">1+</span>
                <strong>OnePlus N6x 5G</strong>
              </div>
            </div>

            <div className="phone-render-showcase">
              <img 
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80" 
                alt="OnePlus N6x"
                className="phone-render-img"
              />
            </div>

            <div className="ad-card-bottom-footer">
              <small>*With HDFC Bank credit card • T&C Apply</small>
              <span 
                className="sponsored-tag-pill" 
                onClick={(e) => handleSponsoredInfo(e, 'OnePlus N6x')}
              >
                Sponsored <FiInfo />
              </span>
            </div>
          </div>

          {/* Card 3: Smart TVs Mega Discount (Electric Blue) */}
          <div 
            className="hero-ad-card smart-tvs-card"
            onClick={() => navigate('/category/electronics')}
          >
            <div className="card-top-content">
              <h3 className="card-loud-heading">Up to 65% off<br />on Smart TVs</h3>
              <p className="card-loud-sub">Save extra with coupons</p>
            </div>

            <div className="tv-showcase-wrap">
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=450&q=80" 
                alt="55 Inch 4K Smart TV"
                className="tv-render-img"
              />
              <div className="tv-specs-badge">
                <span>55" 4K HDR</span>
                <small>Google TV • Dolby Vision</small>
              </div>
            </div>

            <div className="bank-partner-strip">
              <div className="bank-logos-row">
                <span className="bank-pill axis">AXIS BANK</span>
                <span className="bank-pill idfc">IDFC FIRST</span>
                <span className="bank-pill sbi">SBI card</span>
              </div>
              <div className="bank-discount-text">Up to 10% Instant Discount*</div>
              <small className="terms-text">*T&C apply</small>
            </div>
          </div>

          {/* Card 4: Pay-in-3 Fintech Poster (Golden Sunshine) */}
          <div 
            className="hero-ad-card nexpay-later-card"
            onClick={() => navigate('/gift-cards')}
          >
            <div className="card-top-content">
              <h3 className="fintech-title">Pay-in-3,<br />interest free*</h3>
              <p className="fintech-sub">with NexCart Pay Later</p>
              <div className="nexpay-logo-badge">
                <span>nex<b>pay</b></span>
                <span className="pay-later-tag">LATER</span>
              </div>
            </div>

            <div className="fintech-lifestyle-render">
              <img 
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" 
                alt="Electronics and Gadgets on EMI"
                className="fintech-gadgets-img"
              />
            </div>

            <div className="fintech-bottom-note">
              <small>*always-on for orders above ₹1,500 | T&C apply</small>
            </div>
          </div>

          {/* Card 5: Redmi Note 17 Battery Monster Poster */}
          <div 
            className="hero-ad-card redmi-monster-card"
            onClick={() => navigate('/category/mobiles')}
          >
            <div className="card-top-content">
              <div className="launch-price-tag">At ₹25,999*</div>
              <h4 className="monster-title">The all new Note</h4>
              <p className="monster-subtitle">Massive 8000 mAh battery</p>
              
              <div className="redmi-badge-row">
                <span className="redmi-logo-text">REDMI Note <strong>17 5G</strong></span>
                <span className="amoled-pill">120Hz AMOLED</span>
              </div>
            </div>

            <div className="battery-monster-showcase">
              <div className="monster-badge-callout">8000<span>mAh</span></div>
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" 
                alt="Redmi Note 17 5G"
                className="redmi-render-img"
              />
            </div>

            <div className="redmi-bank-strip">
              <div className="sbi-offer-tag">
                <span className="sbi-box">SBI card</span>
                <span>Up to <strong>₹2,000 off*</strong></span>
              </div>
              <small>*T&C apply | Including bank CC offer</small>
            </div>
          </div>

        </div>


        {/* Bottom Tier: Personalized Quick Product & Sponsored Carousel Strip */}
        <div className="quick-deals-carousel-wrapper">
          
          <button 
            type="button" 
            className="carousel-arrow-btn left" 
            onClick={() => handleScroll(-360)}
            aria-label="Scroll left"
          >
            <FiChevronLeft />
          </button>

          <div className="quick-deals-scroll-strip" ref={carouselRef}>
            
            {/* Strip Item 1: Contigo Tumbler (Sponsored) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/food-health')}
            >
              <div className="quick-deal-header">
                <h4>Contigo Thermobecher...</h4>
                <span 
                  className="quick-sponsored-badge"
                  onClick={(e) => handleSponsoredInfo(e, 'Contigo Vacuum Tumbler')}
                >
                  Sponsored <FiInfo />
                </span>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=260&q=80" 
                  alt="Contigo Thermal Tumbler" 
                />
              </div>
            </div>

            {/* Strip Item 2: IFFCO Soil (Sponsored) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/home')}
            >
              <div className="quick-deal-header">
                <h4>IFFCO Urban Gardens - Potti...</h4>
                <span 
                  className="quick-sponsored-badge"
                  onClick={(e) => handleSponsoredInfo(e, 'IFFCO Organic Soil')}
                >
                  Sponsored <FiInfo />
                </span>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=260&q=80" 
                  alt="IFFCO Organic Soil Pack" 
                />
              </div>
            </div>

            {/* Strip Item 3: POS Thermal Printer (Keep shopping for) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/electronics')}
            >
              <div className="quick-deal-header">
                <small className="intent-label">Keep shopping for</small>
                <h4>Thermal POS Receipt Printer</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=260&q=80" 
                  alt="POS Receipt Printer" 
                />
              </div>
            </div>

            {/* Strip Item 4: Apple Watch Series 10 (Deal for you) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/smartwatches')}
            >
              <div className="quick-deal-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small className="intent-label" style={{ color: '#2563eb', fontWeight: 'bold' }}>Deal for you</small>
                  <span className="quick-deal-off-tag" style={{ background: '#dbeafe', color: '#1e40af' }}>35% off</span>
                </div>
                <h4>Apple Watch Series 10 GPS</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=260&q=80" 
                  alt="Apple Watch Series 10" 
                />
              </div>
            </div>

            {/* Strip Item 5: Snake Plant Decor (Keep shopping for) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/home')}
            >
              <div className="quick-deal-header">
                <small className="intent-label">Keep shopping for</small>
                <h4>Sansevieria Air Purifier</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=260&q=80" 
                  alt="Snake Plant Home Decor" 
                />
              </div>
            </div>

            {/* Strip Item 6: Ergonomic Office Chair (Deal for you) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/home')}
            >
              <div className="quick-deal-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small className="intent-label" style={{ color: '#b91c1c', fontWeight: 'bold' }}>Deal for you</small>
                  <span className="quick-deal-off-tag">59% off</span>
                </div>
                <h4>High-Back Ergonomic Chair</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1580481077190-7361346d1800?auto=format&fit=crop&w=260&q=80" 
                  alt="Ergonomic Mesh Chair" 
                />
              </div>
            </div>

            {/* Strip Item 7: Aluminum Laptop Stand (Keep shopping for) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/electronics')}
            >
              <div className="quick-deal-header">
                <small className="intent-label">Keep shopping for</small>
                <h4>Ergonomic Laptop Riser</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=260&q=80" 
                  alt="Aluminum Laptop Stand" 
                />
              </div>
            </div>

            {/* Strip Item 8: Sony WH-1000XM5 ANC (Deal for you) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/electronics')}
            >
              <div className="quick-deal-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small className="intent-label" style={{ color: '#2563eb', fontWeight: 'bold' }}>Deal for you</small>
                  <span className="quick-deal-off-tag" style={{ background: '#dbeafe', color: '#1e40af' }}>28% off</span>
                </div>
                <h4>Sony WH-1000XM5 ANC</h4>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=260&q=80" 
                  alt="Sony WH-1000XM5" 
                />
              </div>
            </div>

            {/* Strip Item 9: Nike Air Zoom Pegasus 40 (Sponsored) */}
            <div 
              className="quick-deal-card"
              onClick={() => navigate('/category/fashion')}
            >
              <div className="quick-deal-header">
                <h4>Nike Air Zoom Pegasus...</h4>
                <span 
                  className="quick-sponsored-badge"
                  onClick={(e) => handleSponsoredInfo(e, 'Nike Pegasus')}
                >
                  Sponsored <FiInfo />
                </span>
              </div>
              <div className="quick-deal-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&q=80" 
                  alt="Nike Air Zoom Pegasus" 
                />
              </div>
            </div>

          </div>

          <button 
            type="button" 
            className="carousel-arrow-btn right" 
            onClick={() => handleScroll(360)}
            aria-label="Scroll right"
          >
            <FiChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
}
