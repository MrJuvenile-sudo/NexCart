import React from 'react';
import { FiTruck, FiRefreshCw, FiLock, FiStar } from 'react-icons/fi';

export default function TrustFooter() {
  return (
    <section className="trust-strip" aria-label="Trust indicators">
      <div className="trust-box">
        <FiTruck className="trust-icon" />
        <div>
          <strong>Free Shipping</strong>
          <p>On orders above ₹999</p>
        </div>
      </div>
      <div className="trust-box">
        <FiRefreshCw className="trust-icon" />
        <div>
          <strong>14-Day Returns</strong>
          <p>Hassle-free guarantee</p>
        </div>
      </div>
      <div className="trust-box">
        <FiLock className="trust-icon" />
        <div>
          <strong>256-bit SSL</strong>
          <p>Bank-grade encryption</p>
        </div>
      </div>
      <div className="trust-box">
        <FiStar className="trust-icon gold" />
        <div>
          <strong>4.9 / 5 Rating</strong>
          <p>10,000+ happy shoppers</p>
        </div>
      </div>
    </section>
  );
}
