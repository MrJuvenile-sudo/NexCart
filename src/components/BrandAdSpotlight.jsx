import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiZap, FiCheckCircle, FiShield, FiPercent, FiClock } from 'react-icons/fi';

const SPOTLIGHT_ADS = [
  {
    id: 'apple-ecosystem',
    sponsor: 'Apple Official Store',
    tag: 'FLAGSHIP LAUNCH',
    title: 'iPhone 16 Pro & Vision Pro Ecosystem',
    headline: 'Pro Power. Spatial Audio. Titanium Crafted.',
    desc: 'Experience Apple Intelligence, A18 Pro 3nm Silicon, and 48MP Fusion Camera with 5x Optical Telephoto.',
    offerBadge: 'Flat ₹8,000 Instant HDFC Card Discount + No Cost EMI',
    code: 'APPLEPRO8K',
    ctaText: 'Explore Apple Store',
    categoryLink: '/category/mobiles',
    accentColor: '#0071E3',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #002b5b 100%)',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80',
    perks: ['Free 24-Hr Express Dispatch', 'AppleCare+ 20% Off', 'Official 1-Yr Warranty']
  },
  {
    id: 'sony-ps5pro',
    sponsor: 'Sony Interactive Entertainment',
    tag: 'NEXT-GEN GAMING',
    title: 'PlayStation 5 Pro & 4K OLED Gaming',
    headline: '8K HDR 120FPS. PSSR AI Upscaling.',
    desc: 'Unleash unprecedented graphical fidelity with 2TB high-speed NVMe SSD and DualSense Edge wireless haptics.',
    offerBadge: 'Special Bundle: Free DualSense Controller + ₹3,000 PSN Card',
    code: 'PLAYPRO5',
    ctaText: 'Shop Gaming Hub',
    categoryLink: '/category/gaming',
    accentColor: '#00439C',
    bgGradient: 'linear-gradient(135deg, #090d16 0%, #111827 50%, #001f4d 100%)',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
    perks: ['Zero Down Payment EMI', 'Instant Game Code Delivery', 'Sony India Warranty']
  },
  {
    id: 'nike-airmax',
    sponsor: 'Nike India Official',
    tag: 'TRENDING DROP',
    title: 'Nike Air Max Innovation Festival 2026',
    headline: 'Unrivaled Comfort. Futuristic Street Style.',
    desc: 'Revolutionary pressurized air-sole cushioning designed for all-day streetwear versatility and athletic rebound.',
    offerBadge: 'Min. 40% OFF + Extra 10% OFF with Coupon NIKE40',
    code: 'NIKE40',
    ctaText: 'Explore Nike Collection',
    categoryLink: '/category/fashion',
    accentColor: '#FF6B00',
    bgGradient: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #431407 100%)',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    perks: ['100% Authentic Guaranteed', '14-Day Free Exchange', 'Earn 2x NexCoins']
  },
  {
    id: 'dyson-nural',
    sponsor: 'Dyson Technology India',
    tag: 'LUXURY BEAUTY CARE',
    title: 'Dyson Supersonic Nural™ Intelligent Hair Dryer',
    headline: 'Nural™ Sensor Network. Scalp Protect Mode.',
    desc: 'Automatically adapts air temperature to protect scalp moisture barrier and enhance natural hair radiance.',
    offerBadge: 'Complimentary ₹5,990 Dyson Styling Travel Bag Included',
    code: 'DYSONLUXE',
    ctaText: 'Discover Dyson Tech',
    categoryLink: '/category/beauty',
    accentColor: '#D946EF',
    bgGradient: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #4a044e 100%)',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    perks: ['2-Year On-Site Warranty', 'Free Demo at Home', 'No Cost EMI 12 Months']
  }
];

export default function BrandAdSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate();

  // Auto rotate spotlight billboard every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SPOTLIGHT_ADS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentAd = SPOTLIGHT_ADS[activeIdx];

  const handleCopyCode = (e, code) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="brand-ad-spotlight-section">
      <div className="spotlight-header-row">
        <div className="spotlight-title-group">
          <span className="spotlight-eyebrow">
            <FiZap /> EXCLUSIVE BRAND SPONSORSHIPS
          </span>
          <h2 className="spotlight-main-heading">Featured Partner Billboards & Limited Offers</h2>
        </div>
        <div className="spotlight-nav-tabs">
          {SPOTLIGHT_ADS.map((ad, idx) => (
            <button
              key={ad.id}
              type="button"
              className={`spotlight-tab-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-sponsor-name">{ad.sponsor.split(' ')[0]}</span>
              {activeIdx === idx && <span className="tab-active-indicator" />}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="spotlight-billboard-card"
        style={{ background: currentAd.bgGradient }}
      >
        <div className="billboard-grid">
          
          {/* Left Column Content */}
          <div className="billboard-content-col">
            <div className="billboard-badge-row">
              <span className="sponsor-verified-chip">
                <FiShield /> {currentAd.sponsor}
              </span>
              <span className="sponsor-tag-pill" style={{ color: currentAd.accentColor }}>
                {currentAd.tag}
              </span>
            </div>

            <h3 className="billboard-title">{currentAd.title}</h3>
            <h4 className="billboard-headline">{currentAd.headline}</h4>
            <p className="billboard-desc">{currentAd.desc}</p>

            {/* Offer Box */}
            <div className="billboard-offer-card">
              <div className="offer-text-area">
                <FiPercent className="percent-icon" />
                <span>{currentAd.offerBadge}</span>
              </div>
              <button 
                type="button" 
                className="voucher-copy-btn"
                onClick={(e) => handleCopyCode(e, currentAd.code)}
                title="Click to copy voucher"
              >
                <code>{currentAd.code}</code>
                <span>{copiedCode === currentAd.code ? 'COPIED! ✓' : 'COPY'}</span>
              </button>
            </div>

            {/* Perks Strip */}
            <div className="billboard-perks-row">
              {currentAd.perks.map((perk, pIdx) => (
                <div key={pIdx} className="billboard-perk-item">
                  <FiCheckCircle className="perk-check" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* CTA Action */}
            <div className="billboard-actions-row">
              <button 
                type="button"
                className="billboard-primary-cta"
                style={{ backgroundColor: currentAd.accentColor }}
                onClick={() => navigate(currentAd.categoryLink)}
              >
                {currentAd.ctaText} <FiArrowRight />
              </button>
              <span className="sponsor-disclaimer">
                *Sponsored Partner Offer. Terms & Conditions apply.
              </span>
            </div>
          </div>

          {/* Right Column Image Presentation */}
          <div className="billboard-media-col">
            <div className="billboard-image-wrap">
              <img src={currentAd.image} alt={currentAd.title} />
              <div className="billboard-image-overlay" />
              <div className="billboard-floating-deal-tag">
                <FiClock /> LIMITED SPONSOR PERIOD
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
