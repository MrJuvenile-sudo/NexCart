import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CountdownTimer from './CountdownTimer';
import ProductCard from './ProductCard';

const FLASH_END = Date.now() + 8 * 60 * 60 * 1000;
const FLASH_DEAL_IDS = [1, 2, 5, 13];

export default function FlashDealBanner() {
  const { products } = useCart();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products : [];
  const flashProducts = safeProducts.filter(p => p && FLASH_DEAL_IDS.includes(p.id));
  if (!flashProducts.length) return null;

  return (
    <section className="flash-deal-banner" aria-label="Flash deals">
      <div className="flash-header">
        <div className="flash-title">
          <FiZap className="zap-icon" />
          <div>
            <h2>Flash Deals</h2>
            <p>Limited time offers — hurry!</p>
          </div>
        </div>
        <div className="flash-timer-block">
          <span className="ends-in">Ends in</span>
          <CountdownTimer endTime={FLASH_END} />
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
              <div className="flash-badge"><FiZap /> FLASH DEAL</div>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
