import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiTag, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import TaxonomyBar from '../components/TaxonomyBar';
import RecentItems from '../components/RecentItems';
import HeroCarousel from '../components/HeroCarousel';
import TrustFooter from '../components/TrustFooter';
import FlashDealBanner from '../components/FlashDealBanner';
import ProductCard from '../components/ProductCard';

const TESTIMONIALS = [
  { name: 'Ananya Sharma', city: 'Bengaluru', text: '"The NovaTune headphones arrived in 2 days. Sound quality is unreal for the price!"' },
  { name: 'Rohan Mehta', city: 'Mumbai', text: '"Ordered with promo code WELCOME20. Smooth checkout and instant order updates."' },
  { name: 'Kavita Nair', city: 'Delhi', text: '"Customer care replied in minutes. Truly 5-star e-commerce service!"' },
];

export default function HomePage() {
  const { products, sponsoredIds } = useCart();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
  const safeSponsoredIds = Array.isArray(sponsoredIds) ? sponsoredIds : [1, 4, 13];

  const suggestedForYou = safeProducts.slice(0, 8);
  const topValueDeals = safeProducts.filter(p => p.rating && p.rating >= 4.7).slice(0, 4);
  const sponsoredProducts = safeProducts.filter(p => safeSponsoredIds.includes(p.id));

  return (
    <div className="home-page">
      <TaxonomyBar />
      <HeroCarousel />
      <RecentItems />
      <FlashDealBanner />

      <section className="home-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">RECOMMENDED FOR YOU</span>
            <h2>Suggested For You</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/products')}>
            View All <FiArrowRight />
          </button>
        </div>
        <div className="product-cards-grid">
          {suggestedForYou.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {sponsoredProducts.length > 0 && (
        <section className="home-section sponsored-feed-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">PARTNER HIGHLIGHTS</span>
              <h2>🔥 Sponsored Value Picks</h2>
            </div>
            <span className="sponsored-tag-header">Ad</span>
          </div>
          <div className="product-cards-grid">
            {sponsoredProducts.map((product) => (
              <div key={product.id} className="sponsored-card-wrapper">
                <span className="sponsored-pill">Sponsored</span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="promo-banner-card">
        <div className="promo-card-content">
          <div className="promo-tag"><FiTag /> FREEDOM SALE SPECIAL</div>
          <h2>Get Extra 20% OFF your order</h2>
          <p>Join over 50,000 satisfied shoppers. Use coupon code <strong>WELCOME20</strong> at checkout.</p>
          <button className="cta-btn primary dark-bg" onClick={() => navigate('/products')}>
            Claim Discount Now <FiArrowRight />
          </button>
        </div>
      </section>

      <section className="home-section cream-bg">
        <div className="section-header">
          <div>
            <span className="section-subtitle">BEST VALUE RATINGS</span>
            <h2>Top Value Deals & Bestsellers</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/products')}>
            Shop All Bestsellers <FiArrowRight />
          </button>
        </div>
        <div className="product-cards-grid">
          {topValueDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <TrustFooter />

      <section className="home-section testimonials-section">
        <div className="section-header center">
          <span className="section-subtitle">CUSTOMER REVIEWS</span>
          <h2>Loved by shoppers across India.</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="test-stars">
                {[1, 2, 3, 4, 5].map(n => <FiStar key={n} />)}
              </div>
              <p>{t.text}</p>
              <div className="test-author">
                <strong>{t.name}</strong>
                <small>Verified Shopper • {t.city}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
