import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <div className="not-found-card">
        <span className="error-code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for might have been removed, renamed, or is temporarily unavailable.</p>
        <div className="not-found-actions">
          <Link to="/" className="cta-btn primary">
            <FiHome /> Back to Home
          </Link>
          <Link to="/products" className="cta-btn outline">
            <FiShoppingBag /> Explore Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
