import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiArrowRight, FiClock } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CountdownTimer from './CountdownTimer';
import ProductCard from './ProductCard';

export default function FlashDealBanner() {
  const { products, flashDealConfig } = useCart();
  const navigate = useNavigate();

  const config = flashDealConfig || {
    enabled: true,
    title: "Flash Deals",
    subtitle: "Limited time offers — hurry!",
    endTime: Date.now() + 8 * 60 * 60 * 1000,
    productIds: [101, 102, 201, 301, 401, 501],
    badgeText: "FLASH DEAL"
  };

  if (!config.enabled) return null;

  const safeProducts = Array.isArray(products) ? products : [];
  const targetIds = Array.isArray(config.productIds) && config.productIds.length > 0 
    ? config.productIds 
    : [101, 102, 201, 301];

  let flashProducts = safeProducts.filter(p => p && targetIds.includes(p.id));
  if (flashProducts.length === 0) {
    flashProducts = safeProducts.slice(0, 4);
  }

  return (
    <section className="flash-deal-banner" aria-label="Flash deals">
      <div className="flash-header">
        <div className="flash-title">
          <FiZap className="zap-icon" />
          <div>
            <h2>{config.title || "Flash Deals"}</h2>
            <p>{config.subtitle || "Limited time offers — hurry!"}</p>
          </div>
        </div>

        <div className="flash-timer-block">
          <span className="ends-in"><FiClock /> Ends in</span>
          <CountdownTimer endTime={config.endTime || Date.now() + 8 * 3600 * 1000} />
        </div>

        <button className="see-all-link flash-see-all" onClick={() => navigate('/products')}>
          View All Deals <FiArrowRight />
        </button>
      </div>

      <div className="flash-products">
        {flashProducts.map(product => {
          if (!product) return null;
          return (
            <div key={product.id} className="flash-card-wrapper">
              <div className="flash-badge"><FiZap /> {config.badgeText || "FLASH DEAL"}</div>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
