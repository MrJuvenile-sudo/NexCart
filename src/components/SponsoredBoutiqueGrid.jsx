import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiZap, FiStar, FiTag, FiAward, FiCheck } from 'react-icons/fi';

const BOUTIQUE_ADS = [
  {
    id: 'intel-ai',
    brand: 'Intel Core Ultra',
    category: 'Electronics',
    title: 'Next-Gen AI Performance Laptops',
    sub: 'Dedicated NPU for on-device AI tasks, 20+ hr battery, and Intel Arc GPU.',
    badge: 'SPONSORED BRAND',
    discount: 'UP TO ₹25,000 OFF',
    bankOffer: '₹5,000 Instant ICICI/HDFC Discount',
    rating: 4.9,
    priceFrom: '₹64,990',
    link: '/category/electronics',
    accentColor: '#0068B5',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80',
    highlights: ['Intel NPU AI Inside', 'No-Cost EMI from ₹2,999/mo', 'Free MS Office Home']
  },
  {
    id: 'rayban-meta',
    brand: 'Ray-Ban | Meta',
    category: 'Smart Wearables',
    title: 'Meta Smart Wayfarer Glasses with AI',
    sub: 'Hands-free 12MP POV camera, spatial audio open-ear speakers, and Meta AI voice.',
    badge: 'TRENDING INNOVATION',
    discount: '15% INTRODUCTORY OFF',
    bankOffer: 'Flat ₹2,000 Cashback on UPI',
    rating: 4.8,
    priceFrom: '₹29,990',
    link: '/category/smartwatches',
    accentColor: '#E11D48',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80',
    highlights: ['12MP Ultra-Wide POV Camera', 'Open-Ear Directional Audio', 'Meta AI Voice Assistant']
  },
  {
    id: 'gopro-hero13',
    brand: 'GoPro Official',
    category: 'Action Cameras',
    title: 'GoPro HERO13 Black 5.3K Action Master',
    sub: 'HyperSmooth 6.0 stabilization, HDR 5.3K60 video, 10m waterproof without housing.',
    badge: 'OFFICIAL PARTNER',
    discount: 'FREE ACCESSORY KIT (₹4,990)',
    bankOffer: 'Zero Down Payment 6 Mo EMI',
    rating: 4.9,
    priceFrom: '₹38,990',
    link: '/category/electronics',
    accentColor: '#0284C7',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=700&q=80',
    highlights: ['5.3K 60FPS Video & 27MP Photos', 'Includes 128GB Extreme SD', 'Dual Color LCD Screens']
  },
  {
    id: 'nespresso-vertuo',
    brand: 'Nespresso Barista',
    category: 'Home Appliances',
    title: 'Nespresso Vertuo Pop Coffee System',
    sub: 'Centrifusion extraction technology brews 5 cup sizes with velvety crema at 1 touch.',
    badge: 'EXCLUSIVE DEBUT',
    discount: '50 FREE CAPSULES GIFT BOX',
    bankOffer: 'Extra 10% OFF with code COFFEE10',
    rating: 4.8,
    priceFrom: '₹14,999',
    link: '/category/appliances',
    accentColor: '#D97706',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80',
    highlights: ['Centrifusion 7000 RPM Extraction', 'Brews Espresso to Alto Mugs', '2-Year Machine Warranty']
  }
];

export default function SponsoredBoutiqueGrid() {
  const navigate = useNavigate();

  return (
    <section className="sponsored-boutique-section">
      <div className="boutique-header-row">
        <div>
          <span className="boutique-eyebrow">
            <FiZap /> VERIFIED PARTNER DEALS
          </span>
          <h2 className="boutique-heading">Sponsored Brand Boutiques & Curated Launches</h2>
        </div>
        <div className="boutique-trust-tag">
          <FiAward /> 100% Brand Certified Sponsorships
        </div>
      </div>

      <div className="boutique-cards-grid">
        {BOUTIQUE_ADS.map((ad) => (
          <div 
            key={ad.id} 
            className="boutique-card"
            onClick={() => navigate(ad.link)}
          >
            <div className="boutique-image-container">
              <img src={ad.image} alt={ad.title} />
              <span className="boutique-sponsor-pill" style={{ borderColor: ad.accentColor }}>
                <FiTag /> {ad.badge}
              </span>
              <span className="boutique-discount-badge">
                {ad.discount}
              </span>
            </div>

            <div className="boutique-card-body">
              <div className="boutique-brand-meta">
                <span className="boutique-brand-name" style={{ color: ad.accentColor }}>{ad.brand}</span>
                <span className="boutique-rating"><FiStar /> {ad.rating}</span>
              </div>

              <h3 className="boutique-card-title">{ad.title}</h3>
              <p className="boutique-card-desc">{ad.sub}</p>

              <div className="boutique-highlights-list">
                {ad.highlights.map((h, i) => (
                  <div key={i} className="boutique-highlight-item">
                    <FiCheck className="highlight-icon" style={{ color: ad.accentColor }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="boutique-footer-row">
                <div className="boutique-price-block">
                  <span className="from-label">Starting from</span>
                  <strong className="price-val">{ad.priceFrom}</strong>
                </div>

                <button 
                  type="button" 
                  className="boutique-explore-cta"
                  style={{ backgroundColor: ad.accentColor }}
                >
                  View Showcase <FiArrowUpRight />
                </button>
              </div>

              <div className="boutique-bank-strip">
                <span>{ad.bankOffer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
