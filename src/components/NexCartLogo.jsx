import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

export default function NexCartLogo({ 
  size = 36, 
  variant = 'header', // 'header', 'sidebar', 'card', 'mini'
  showText = true,
  subtitle = 'CONTROL CENTER',
  showPlusTag = true,
  className = '' 
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`nexcart-brand-logo-root ${variant} ${className}`}>
      <div className="nexcart-logo-icon-container" style={{ width: size, height: size }}>
        {!imgError ? (
          <img 
            src={logoImg} 
            alt="NexCart Official Logo" 
            className="nexcart-logo-img-tag"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="nexcart-fallback-vector-mark">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="nexcart-vector-svg">
              <rect width="36" height="36" rx="9" fill="url(#nexcart_grad)" />
              <path d="M19.5 7L10 19.5H17.5L15.5 29L26 16.5H18.5L19.5 7Z" fill="#FFE500" />
              <defs>
                <linearGradient id="nexcart_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E3A8A" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {showText && (
        <div className="nexcart-brand-text-block">
          <div className="nexcart-title-row">
            <span className="nexcart-main-text">Nex<i>Cart</i></span>
            {showPlusTag && <span className="nexcart-plus-tag">PLUS <span className="plus-star">✦</span></span>}
          </div>
          {subtitle && <span className="nexcart-sub-tag">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
