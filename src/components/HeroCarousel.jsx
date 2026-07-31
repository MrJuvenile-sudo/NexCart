import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';
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
    setTimeout(() => { setCurrent(idx); setFading(false); }, 350);
  }, [slides.length]);

  const next = useCallback(() => {
    if (!slides.length) return;
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (!slides.length) return null;
  const slide = slides[current] || slides[0];
  if (!slide) return null;

  return (
    <section className="hero-carousel" aria-label="Hero banner">
      <div className={fading ? 'carousel-inner fading' : 'carousel-inner'}>
        <img src={slide.image || ''} alt={slide.tagline || ''} className="carousel-bg" />
        <div className="carousel-overlay" />
        <div className="carousel-content">
          <div className="hero-badge-row">
            <span className="carousel-eyebrow" style={{ background: slide.accent || '#FFE500', color: '#18181B' }}>
              <FiZap /> {slide.tagline}
            </span>
            {slide.saleTimer && (
              <div className="hero-countdown-wrap">
                <span className="timer-label">Ends in</span>
                <CountdownTimer endTime={slide.saleTimer} />
              </div>
            )}
          </div>
          <h1 className="carousel-headline" dangerouslySetInnerHTML={{ __html: slide.headline || '' }} />
          <p className="carousel-sub">{slide.sub}</p>
          <button
            id={'hero-cta-' + (slide.id || 1)}
            className="hero-primary-cta"
            style={{ background: slide.accent || '#FFE500', color: '#18181B' }}
            onClick={() => navigate(slide.ctaLink || '/products')}
          >
            {slide.cta || 'Shop Now'} <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} className={i === current ? 'dot active' : 'dot'} onClick={() => goTo(i)} aria-label={'Slide ' + (i + 1)} />
        ))}
      </div>
      <div className="slide-counter">
        <span>{String(current + 1).padStart(2, '0')}</span>
        <span className="sep"> / </span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
