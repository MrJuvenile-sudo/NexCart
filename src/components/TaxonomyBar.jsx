import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiStar, FiShoppingBag, FiArrowRight, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { MEGA_MENU_DATA } from '../data/megaMenuData';

export function getCategoryMenuData(cat) {
  if (!cat) return null;
  const id = (cat.id || '').toLowerCase().trim();
  const name = (cat.name || '').toLowerCase().trim();
  
  if (MEGA_MENU_DATA[id]) return MEGA_MENU_DATA[id];
  if (id.includes('plant') || name.includes('plant') || name.includes('garden')) return MEGA_MENU_DATA.plants;
  if (id.includes('watch') || name.includes('watch') || name.includes('wear')) return MEGA_MENU_DATA.smartwatches;
  if (id.includes('game') || name.includes('game') || name.includes('esport')) return MEGA_MENU_DATA.gaming;
  if (id.includes('sport') || name.includes('sport') || name.includes('fitness')) return MEGA_MENU_DATA.sports;
  if (id.includes('book') || name.includes('book') || name.includes('station')) return MEGA_MENU_DATA.books;
  if (id.includes('lux') || name.includes('lux') || name.includes('jewel') || name.includes('diamond')) return MEGA_MENU_DATA.luxury;
  if (id.includes('mobile') || name.includes('mobile') || name.includes('phone')) return MEGA_MENU_DATA.mobiles;
  if (id.includes('fashion') || name.includes('fashion') || name.includes('wear') || name.includes('cloth')) return MEGA_MENU_DATA.fashion;
  if (id.includes('elect') || name.includes('elect') || name.includes('audio')) return MEGA_MENU_DATA.electronics;
  if (id.includes('beauty') || name.includes('beauty') || name.includes('skin')) return MEGA_MENU_DATA.beauty;
  if (id.includes('home') || name.includes('home') || name.includes('living') || name.includes('furniture')) return MEGA_MENU_DATA.home;
  if (id.includes('appliance') || name.includes('appliance') || name.includes('kitchen')) return MEGA_MENU_DATA.appliances;
  if (id.includes('toy') || name.includes('toy') || name.includes('baby')) return MEGA_MENU_DATA.toys;
  if (id.includes('health') || id.includes('food') || name.includes('health') || name.includes('food') || name.includes('groc')) return MEGA_MENU_DATA.health;
  if (id.includes('auto') || name.includes('auto') || name.includes('car')) return MEGA_MENU_DATA.auto;

  return MEGA_MENU_DATA.fashion;
}

export default function TaxonomyBar() {
  const { taxonomies, selectedCategory, setSelectedCategory, products, addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeDropdownCat, setActiveDropdownCat] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  const safeTaxonomies = Array.isArray(taxonomies) ? taxonomies : [];
  const visibleTaxonomies = safeTaxonomies.filter(t => t && t.visible);
  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];

  // Check scroll position to display Left / Right arrows
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll, visibleTaxonomies.length]);

  const handleScrollClick = (direction) => {
    const el = scrollContainerRef.current;
    if (el) {
      const offset = direction === 'left' ? -280 : 280;
      el.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Hover open and safe debounce leave
  const handlePillMouseEnter = (cat) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!cat || cat.id === 'all' || cat.name === 'For You') {
      setActiveDropdownCat(null);
      return;
    }
    setActiveDropdownCat(cat);
  };

  const handlePillMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdownCat(null);
    }, 400); // 400ms grace period so cursor can transition freely into menu
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdownCat(null);
    }, 400);
  };

  const handlePillClick = (cat) => {
    if (!cat) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdownCat(null);

    if (typeof setSelectedCategory === 'function') {
      setSelectedCategory(cat.name);
    }
    if (cat.name === 'For You' || cat.id === 'all') {
      navigate('/');
    } else {
      const slug = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      navigate(`/category/${slug}`);
    }
  };

  const handleLinkClick = (cat, link) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdownCat(null);
    const slug = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/category/${slug}?dept=${encodeURIComponent(link.label)}`);
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    if (typeof addToCart === 'function') {
      addToCart(product, 1);
      showToast(`Added ${product.name} to cart!`, 'success');
    }
  };

  const currentPath = location.pathname;
  const menuData = activeDropdownCat ? getCategoryMenuData(activeDropdownCat) : null;

  // Find 2-3 matching live products for the active dropdown category
  const categoryProducts = activeDropdownCat ? safeProducts.filter(p => {
    const pCat = (p.category || '').toLowerCase();
    const cCat = (activeDropdownCat.name || '').toLowerCase();
    const cId = (activeDropdownCat.id || '').toLowerCase();
    
    if (cId.includes('plant') || cCat.includes('plant')) return pCat.includes('plant') || pCat.includes('garden') || pCat.includes('soil');
    if (cId.includes('watch') || cCat.includes('watch')) return pCat.includes('watch') || pCat.includes('wear');
    if (cId.includes('game') || cCat.includes('game')) return pCat.includes('game') || pCat.includes('gaming') || pCat.includes('keyboard');
    if (cId.includes('sport') || cCat.includes('sport')) return pCat.includes('sport') || pCat.includes('fit') || pCat.includes('gym');
    if (cId.includes('book') || cCat.includes('book')) return pCat.includes('book') || pCat.includes('media');
    if (cId.includes('lux') || cCat.includes('lux')) return pCat.includes('lux') || pCat.includes('jewel') || pCat.includes('diamond');
    if (cId.includes('mobile') || cCat.includes('mobile')) return pCat.includes('mobile') || pCat.includes('phone');
    if (cId.includes('fashion') || cCat.includes('fashion')) return pCat.includes('fashion') || pCat.includes('wear') || pCat.includes('apparel');
    if (cId.includes('elect') || cCat.includes('elect')) return pCat.includes('electron') || pCat.includes('audio');
    if (cId.includes('beauty') || cCat.includes('beauty')) return pCat.includes('beauty') || pCat.includes('skin');
    if (cId.includes('home') || cCat.includes('home')) return pCat.includes('home') || pCat.includes('living');
    if (cId.includes('appliance') || cCat.includes('appliance')) return pCat.includes('appliance') || pCat.includes('air');
    if (cId.includes('toy') || cCat.includes('toy')) return pCat.includes('toy') || pCat.includes('baby');
    if (cId.includes('health') || cCat.includes('food')) return pCat.includes('food') || pCat.includes('health');
    if (cId.includes('auto') || cCat.includes('auto')) return pCat.includes('auto') || pCat.includes('car');
    return pCat.includes(cId) || pCat.includes(cCat);
  }).slice(0, 3) : [];

  return (
    <nav 
      className="taxonomy-bar" 
      aria-label="Category taxonomy"
      onMouseLeave={handlePillMouseLeave}
    >
      <div className="taxonomy-wrapper-relative">
        
        {/* Left Scroll Navigation Button */}
        {canScrollLeft && (
          <button 
            type="button" 
            className="tax-scroll-arrow tax-scroll-left"
            onClick={() => handleScrollClick('left')}
            aria-label="Scroll categories left"
          >
            <FiChevronLeft />
          </button>
        )}

        {/* Categories Pills Container */}
        <div 
          className="taxonomy-container"
          ref={scrollContainerRef}
        >
          {visibleTaxonomies.map((cat) => {
            if (!cat) return null;
            
            let isActive = false;
            if (currentPath === '/' && (cat.name === 'For You' || cat.id === 'all')) {
              isActive = true;
            } else if (currentPath.startsWith('/category/')) {
              const currentSlug = currentPath.replace('/category/', '').toLowerCase();
              const catId = (cat.id || '').toLowerCase();
              const catSlug = (cat.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
              if (currentSlug === catId || currentSlug === catSlug || (currentSlug.includes(catId) && catId.length > 2)) {
                isActive = true;
              }
            } else {
              isActive = selectedCategory === cat.name;
            }

            const isHovered = activeDropdownCat && (activeDropdownCat.id === cat.id || activeDropdownCat.name === cat.name);

            return (
              <button
                key={cat.id || cat.name}
                type="button"
                className={`taxonomy-pill ${isActive ? 'active' : ''} ${isHovered ? 'hover-open' : ''}`}
                onClick={() => handlePillClick(cat)}
                onMouseEnter={() => handlePillMouseEnter(cat)}
              >
                <span className="tax-icon">{cat.icon || '🏷️'}</span>
                <span className="tax-name">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Navigation Button */}
        {canScrollRight && (
          <button 
            type="button" 
            className="tax-scroll-arrow tax-scroll-right"
            onClick={() => handleScrollClick('right')}
            aria-label="Scroll categories right"
          >
            <FiChevronRight />
          </button>
        )}
      </div>

      {/* Myntra-Style Mega Dropdown Panel with Hover Bridge */}
      {activeDropdownCat && menuData && (
        <div 
          className="myntra-mega-dropdown"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          style={{ '--category-accent': menuData.accentColor || '#2874f0' }}
        >
          <div className="mega-dropdown-inner">
            
            {/* Multi-Column Links Section */}
            <div className="mega-columns-grid">
              {menuData.columns.map((col, idx) => (
                <div key={idx} className="mega-nav-column">
                  <h4 className="mega-column-heading" style={{ color: menuData.accentColor }}>
                    {col.heading}
                  </h4>
                  <ul className="mega-links-list">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <button 
                          type="button"
                          className="mega-link-item"
                          onClick={() => handleLinkClick(activeDropdownCat, link)}
                        >
                          <span className="mega-link-text">{link.label}</span>
                          {link.tag && (
                            <span 
                              className="mega-tag-badge"
                              style={{ 
                                background: link.tag === 'HOT' || link.tag.includes('OFF') || link.tag.includes('SAVE') ? '#fee2e2' : '#f1f5f9',
                                color: link.tag === 'HOT' || link.tag.includes('OFF') || link.tag.includes('SAVE') ? '#b91c1c' : '#475569'
                              }}
                            >
                              {link.tag}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Dynamic Products Column */}
            <div className="mega-featured-products-panel">
              <div className="mega-products-header">
                <span className="mega-featured-title">
                  <FiZap className="zap-icon" /> Featured in {activeDropdownCat.name}
                </span>
                <button 
                  type="button" 
                  className="mega-view-all-btn"
                  onClick={() => handlePillClick(activeDropdownCat)}
                >
                  View All <FiArrowRight />
                </button>
              </div>

              <div className="mega-products-cards-row">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((p) => {
                    const discountPercent = p.old && p.old > p.price ? Math.round(((p.old - p.price) / p.old) * 100) : 0;
                    return (
                      <div 
                        key={p.id} 
                        className="mega-product-card"
                        onClick={() => {
                          setActiveDropdownCat(null);
                          navigate(`/product/${p.id}`);
                        }}
                      >
                        <div className="mega-card-img-wrap">
                          <img src={p.image} alt={p.name} />
                          {discountPercent > 0 && (
                            <span className="mega-product-off-chip">{discountPercent}% OFF</span>
                          )}
                        </div>
                        <div className="mega-card-info">
                          <span className="mega-card-brand">{p.brand}</span>
                          <h5 className="mega-card-name">{p.name}</h5>
                          
                          <div className="mega-card-price-row">
                            <strong>₹{p.price.toLocaleString('en-IN')}</strong>
                            {p.old && <span className="mega-card-old-price">₹{p.old.toLocaleString('en-IN')}</span>}
                          </div>

                          <div className="mega-card-actions">
                            <span className="mega-rating-pill">
                              <FiStar /> {p.rating || 4.8}
                            </span>
                            <button 
                              type="button" 
                              className="mega-quick-add-btn"
                              onClick={(e) => handleQuickAdd(e, p)}
                              title="Add to Cart"
                            >
                              <FiShoppingBag /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="mega-empty-product-hint">
                    <p>Explore all top picks in {activeDropdownCat.name}</p>
                    <button 
                      type="button"
                      className="mega-explore-now-btn"
                      onClick={() => handlePillClick(activeDropdownCat)}
                    >
                      Shop Collection
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Brand Promo Strip */}
          {menuData.promoBadge && (
            <div className="mega-dropdown-bottom-strip">
              <span className="mega-promo-text">{menuData.promoBadge}</span>
              <button 
                type="button" 
                className="mega-explore-pill-btn"
                onClick={() => handlePillClick(activeDropdownCat)}
              >
                Explore All {activeDropdownCat.name} Offers <FiArrowRight />
              </button>
            </div>
          )}

        </div>
      )}
    </nav>
  );
}
