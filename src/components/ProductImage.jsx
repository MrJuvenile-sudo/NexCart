import React, { useState } from 'react';

export default function ProductImage({
  src,
  alt = 'Product',
  className = '',
  loading = 'lazy',
  onClick,
  fallback = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanSrc = (!hasError && src) ? src : fallback;

  // Generate optimized WebP URL if Unsplash
  const getOptimizedSrc = (url, width = 400) => {
    if (!url) return fallback;
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&fm=webp&w=${width}&q=80`;
    }
    return url;
  };

  const webpSrcSet = cleanSrc.includes('unsplash.com') ? `
    ${getOptimizedSrc(cleanSrc, 240)} 240w,
    ${getOptimizedSrc(cleanSrc, 360)} 360w,
    ${getOptimizedSrc(cleanSrc, 480)} 480w,
    ${getOptimizedSrc(cleanSrc, 640)} 640w
  `.trim() : undefined;

  return (
    <div 
      className={`product-img-wrapper ${isLoaded ? 'loaded' : 'loading'} ${className}`}
      onClick={onClick}
    >
      <picture>
        {webpSrcSet && (
          <source 
            type="image/webp" 
            srcSet={webpSrcSet} 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" 
          />
        )}
        <img
          src={getOptimizedSrc(cleanSrc, 400)}
          alt={alt}
          loading={loading}
          decoding="async"
          className="product-responsive-img"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
        />
      </picture>
    </div>
  );
}
