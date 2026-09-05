import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiZap, FiChevronLeft, FiChevronRight, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CountdownTimer from './CountdownTimer';

export default function HeroCarousel() {
  const { heroBanners } = useCart();
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const navigate = useNavigate();

  const safeBanners = Array.isArray(heroBanners) ? heroBanners : [];
  const slides = safeBanners.filter(b => b && b.visible);

  const goTo = useCallback((idx) => {
    if (!slides.length) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 300);
  }, [slides.length]);

  const next = useCallback(() => {
    if (!slides.length) return;
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    if (!slides.length) return;
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (!slides.length) return null;
  const slide = slides[current] || slides[0];
  if (!slide) return null;

  return (
    <section className="hero-carousel-flagship" aria-label="Featured deals banner">
      <div className={fading ? 'carousel-inner-flagship fading' : 'carousel-inner-flagship'}>
        <img src={slide.image || ''} alt={slide.tagline || ''} className="carousel-bg-flagship" />
        <div className="carousel-overlay-flagship" />
        
        <div className="carousel-content-flagship">
          <div className="hero-badge-row-flagship">
            <span className="carousel-eyebrow-flagship" style={{ background: slide.accent || '#FFE500', color: '#18181B' }}>
              <FiZap className="pulse-icon" /> {slide.tagline}
            </span>
            {(slide.hasTimer !== false && slide.saleTimer) && (
              <div className="hero-countdown-pill">
                <span className="timer-dot" />
                <span className="timer-text">{slide.timerLabel || 'Limited Deal Ends in:'}</span>
                <CountdownTimer endTime={slide.saleTimer} />
              </div>
            )}
          </div>

          <h1 className="carousel-headline-flagship" dangerouslySetInnerHTML={{ __html: slide.headline || '' }} />
          <p className="carousel-sub-flagship">{slide.sub}</p>

          <div className="hero-cta-group">
            <button
              id={'hero-cta-' + (slide.id || 1)}
              className="hero-primary-btn"
              style={{ background: slide.accent || '#FFE500', color: '#18181B' }}
              onClick={() => navigate(slide.ctaLink || '/products')}
            >
              <span>{slide.cta || 'Explore Deals'}</span>
              <FiArrowRight className="cta-arrow" />
            </button>

            <button 
              className="hero-secondary-btn"
              onClick={() => navigate('/offers')}
            >
              View All Coupons & Offers
            </button>
          </div>

          {/* Quick Assurance Strip */}
          <div className="hero-perks-strip">
            <div className="hero-perk-item">
              <FiTruck /> <span>Express Free Delivery</span>
            </div>
            <div className="hero-perk-item">
              <FiShield /> <span>100% Brand Certified</span>
            </div>
            <div className="hero-perk-item">
              <FiCreditCard /> <span>No Cost EMI / Pay in 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Left / Right Carousel Chevrons */}
      <button 
        type="button" 
        className="carousel-nav-btn prev"
        onClick={prev} 
        aria-label="Previous banner"
      >
        <FiChevronLeft />
      </button>
      <button 
        type="button" 
        className="carousel-nav-btn next"
        onClick={next} 
        aria-label="Next banner"
      >
        <FiChevronRight />
      </button>

      {/* Progress Dots & Slide Counter */}
      <div className="carousel-controls-bottom">
        <div className="carousel-dots-flagship">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={i === current ? 'dot-flagship active' : 'dot-flagship'} 
              onClick={() => goTo(i)} 
              aria-label={'Slide ' + (i + 1)} 
            />
          ))}
        </div>
        <div className="slide-counter-flagship">
          <strong>{String(current + 1).padStart(2, '0')}</strong>
          <span> / {String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
