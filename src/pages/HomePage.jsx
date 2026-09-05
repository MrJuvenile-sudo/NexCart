import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiTag, FiStar, FiChevronDown, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import RecentItems from '../components/RecentItems';
import HeroCarousel from '../components/HeroCarousel';
import SponsoredAdHub from '../components/SponsoredAdHub';
import BrandAdSpotlight from '../components/BrandAdSpotlight';
import SponsoredBoutiqueGrid from '../components/SponsoredBoutiqueGrid';
import ProductsOnlyForYou from '../components/ProductsOnlyForYou';
import TrustFooter from '../components/TrustFooter';
import FlashDealBanner from '../components/FlashDealBanner';
import ProductCard from '../components/ProductCard';

const TESTIMONIALS = [
  { name: 'Ananya Sharma', city: 'Bengaluru', text: '"The NovaTune headphones arrived in 2 days. Sound quality is unreal for the price!"' },
  { name: 'Rohan Mehta', city: 'Mumbai', text: '"Ordered with promo code WELCOME20. Smooth checkout and instant order updates."' },
  { name: 'Kavita Nair', city: 'Delhi', text: '"Customer care replied in minutes. Truly 5-star e-commerce service!"' },
];

export default function HomePage() {
  const { products, sponsoredIds, homePageConfig } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
  const safeSponsoredIds = Array.isArray(sponsoredIds) ? sponsoredIds : [1, 4, 13];

  const suggestedForYou = safeProducts.slice(0, 8);
  const topValueDeals = safeProducts.filter(p => p.rating && p.rating >= 4.7).slice(0, 4);
  const sponsoredProducts = safeProducts.filter(p => safeSponsoredIds.includes(p.id));

  // Determine active tab for Tabbed Showcase
  const initialTabId = homePageConfig?.tabsShowcase?.tabs?.[0]?.id || 'tab1';
  const [activeShowcaseTab, setActiveShowcaseTab] = useState(initialTabId);

  const activeTabConfig = homePageConfig?.tabsShowcase?.tabs?.find(t => t.id === activeShowcaseTab) || homePageConfig?.tabsShowcase?.tabs?.[0];
  const tabProducts = safeProducts.filter(p => p.category === activeTabConfig?.category).slice(0, 8);

  // New Arrivals Spotlight (dynamically sorted by ID descending)
  const newArrivalsLimit = homePageConfig?.newArrivalsSpotlight?.limit || 4;
  const newArrivalsProducts = [...safeProducts]
    .sort((a, b) => b.id - a.id)
    .slice(0, newArrivalsLimit);

  // States for interactive panels
  const [openFaqId, setOpenFaqId] = useState(null);
  const [activeUgcTooltip, setActiveUgcTooltip] = useState(null);

  // States for AI Shopping Assistant Quiz
  const [quizStep, setQuizStep] = useState(0); // 0 = start, 1 = recipient, 2 = interest, 3 = budget, 4 = results
  const [quizAnswers, setQuizAnswers] = useState({ recipient: '', interest: null, budget: null });

  const handleSelectQuizOption = (key, value) => {
    setQuizAnswers(prev => ({ ...prev, [key]: value }));
  };

  const quizInterestCategory = quizAnswers.interest?.category;
  const quizMaxPrice = quizAnswers.budget?.maxPrice;

  const matchedQuizProducts = safeProducts.filter(p => {
    if (quizInterestCategory && p.category !== quizInterestCategory) return false;
    if (quizMaxPrice && p.price > quizMaxPrice) return false;
    return true;
  }).slice(0, 4);

  const [activePriceTier, setActivePriceTier] = useState('tier1');

  const budgetT1Products = safeProducts.filter(p => p.price < (homePageConfig?.priceTiersShowcase?.tier1?.maxPrice || 1000)).slice(0, 8);
  const budgetT2Products = safeProducts.filter(p => p.price >= (homePageConfig?.priceTiersShowcase?.tier2?.minPrice || 1000) && p.price <= (homePageConfig?.priceTiersShowcase?.tier2?.maxPrice || 3000)).slice(0, 8);
  const budgetT3Products = safeProducts.filter(p => p.price > (homePageConfig?.priceTiersShowcase?.tier3?.minPrice || 3000)).slice(0, 8);

  const getActivePriceTierProducts = () => {
    if (activePriceTier === 'tier2') return budgetT2Products;
    if (activePriceTier === 'tier3') return budgetT3Products;
    return budgetT1Products;
  };
  const tierProducts = getActivePriceTierProducts();

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const showSection = (sectionName) => {
    return homePageConfig?.sections?.[sectionName] !== false;
  };

  const [aboveFoldView, setAboveFoldView] = useState('all'); // 'all', 'hero', 'sponsored', 'flash'

  return (
    <div className="home-page">
      {/* Above-the-fold Progressive Disclosure Container */}
      <div className="above-fold-hub">
        <div className="above-fold-selector-bar">
          <button 
            className={`above-fold-chip ${aboveFoldView === 'all' ? 'active' : ''}`}
            onClick={() => setAboveFoldView('all')}
          >
            🌟 All Featured Spotlights
          </button>
          <button 
            className={`above-fold-chip ${aboveFoldView === 'hero' ? 'active' : ''}`}
            onClick={() => setAboveFoldView('hero')}
          >
            🖼️ Flagship Carousel
          </button>
          <button 
            className={`above-fold-chip ${aboveFoldView === 'flash' ? 'active' : ''}`}
            onClick={() => setAboveFoldView('flash')}
          >
            ⚡ Flash Deals & Timers
          </button>
          <button 
            className={`above-fold-chip ${aboveFoldView === 'sponsored' ? 'active' : ''}`}
            onClick={() => setAboveFoldView('sponsored')}
          >
            💎 Sponsored Hub
          </button>
        </div>

        {(aboveFoldView === 'all' || aboveFoldView === 'hero') && showSection('hero') && (
          <HeroCarousel />
        )}

        {(aboveFoldView === 'all' || aboveFoldView === 'flash') && showSection('flashDeal') && (
          <FlashDealBanner />
        )}

        {(aboveFoldView === 'all' || aboveFoldView === 'sponsored') && (
          <SponsoredAdHub />
        )}
      </div>

      {/* NEW: Visual "Shop by Category" Grid */}
      {showSection('categoryGrid') && homePageConfig?.categoryGrid && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.categoryGrid.subtitle || 'EXPLORE CATEGORIES'}</span>
              <h2>{homePageConfig.categoryGrid.title || 'Shop by Category'}</h2>
            </div>
          </div>
          <div className="category-visual-grid">
            {homePageConfig.categoryGrid.categories.map((cat) => (
              <div 
                key={cat.id} 
                className="category-grid-tile"
                onClick={() => navigate(cat.link)}
              >
                <img src={cat.image} alt={cat.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80'; }} />
                <div className="category-tile-overlay">
                  <h3>{cat.name}</h3>
                  <span className="category-promo-badge">{cat.promo}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEW: Bank & Payment Offers Strip */}
      {showSection('bankOffers') && homePageConfig?.bankOffers && (
        <section className="home-section" style={{ padding: '20px 0' }}>
          <div className="bank-offers-container">
            <div className="bank-offers-flex">
              {homePageConfig.bankOffers.offers.map((offer) => (
                <div key={offer.id} className="bank-offer-card">
                  <div>
                    <h4>{offer.title}</h4>
                    <p>{offer.desc}</p>
                  </div>
                  {offer.code && (
                    <span className="bank-offer-code-pill">
                      Code: <strong>{offer.code}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showSection('recent') && <RecentItems />}
      
      {showSection('tabsShowcase') && homePageConfig?.tabsShowcase && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.tabsShowcase.subtitle || 'CURATED GUIDES'}</span>
              <h2>{homePageConfig.tabsShowcase.title || 'Curated Collection Guides'}</h2>
            </div>
            <button className="see-all-link" onClick={() => navigate('/products')}>
              Shop Collections <FiArrowRight />
            </button>
          </div>
          
          <div className="tabs-navigation">
            {homePageConfig.tabsShowcase.tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-trigger-btn ${activeShowcaseTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveShowcaseTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {tabProducts.length > 0 ? (
            <div className="product-cards-grid">
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-fallback" style={{ textAlign: 'center', padding: '30px', color: '#71717a' }}>
              <p>No products found in category "{activeTabConfig?.category}".</p>
            </div>
          )}
        </section>
      )}

      {/* Recommended For You Section */}
      {showSection('deals') && suggestedForYou.length > 0 && (
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
      )}

      {/* NEW: Mid-Page High-Impact Brand Sponsorship Billboard Grid */}
      <BrandAdSpotlight />

      {/* NEW: New Arrivals / Fresh Drops Spotlight */}
      {showSection('newArrivals') && newArrivalsProducts.length > 0 && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig?.newArrivalsSpotlight?.subtitle || 'JUST LAUNCHED'}</span>
              <h2>{homePageConfig?.newArrivalsSpotlight?.title || 'Fresh Drops Spotlight'}</h2>
            </div>
            <button className="see-all-link" onClick={() => navigate('/products')}>
              View New Arrivals <FiArrowRight />
            </button>
          </div>
          <div className="product-cards-grid">
            {newArrivalsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* NEW: Budget / Price Store Grid */}
      {showSection('budgetGrid') && homePageConfig?.budgetGrid && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.budgetGrid.subtitle || 'BUDGET BUYS'}</span>
              <h2>{homePageConfig.budgetGrid.title || 'Shop Within Your Budget'}</h2>
            </div>
          </div>
          <div className="budget-visual-grid">
            {homePageConfig.budgetGrid.ranges.map((range) => (
              <div 
                key={range.id} 
                className="budget-pricing-card"
                onClick={() => navigate(range.link)}
              >
                <img src={range.image} alt={range.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=200&q=80'; }} />
                <div className="budget-card-info">
                  <h3>{range.name}</h3>
                  <p>Explore Catalog <FiArrowRight /></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEW: Price Tiered Showcase Shelf */}
      {showSection('priceTiersShowcase') && homePageConfig?.priceTiersShowcase && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.priceTiersShowcase.subtitle || 'SEGMENTED SHELVES'}</span>
              <h2>{homePageConfig.priceTiersShowcase.title || 'Browse Products by Price Segment'}</h2>
            </div>
            <button className="see-all-link" onClick={() => navigate('/products')}>
              View All Products <FiArrowRight />
            </button>
          </div>

          <div className="price-shelves-navigation">
            <button 
              className={`price-shelf-tab-btn ${activePriceTier === 'tier1' ? 'active' : ''}`}
              onClick={() => setActivePriceTier('tier1')}
            >
              {homePageConfig.priceTiersShowcase.tier1?.label || 'Budget Essentials'}
              <span className="price-shelf-tag-badge">{budgetT1Products.length}</span>
            </button>
            <button 
              className={`price-shelf-tab-btn ${activePriceTier === 'tier2' ? 'active' : ''}`}
              onClick={() => setActivePriceTier('tier2')}
            >
              {homePageConfig.priceTiersShowcase.tier2?.label || 'Mid-Range Value'}
              <span className="price-shelf-tag-badge">{budgetT2Products.length}</span>
            </button>
            <button 
              className={`price-shelf-tab-btn ${activePriceTier === 'tier3' ? 'active' : ''}`}
              onClick={() => setActivePriceTier('tier3')}
            >
              {homePageConfig.priceTiersShowcase.tier3?.label || 'Premium Luxuries'}
              <span className="price-shelf-tag-badge">{budgetT3Products.length}</span>
            </button>
          </div>

          {tierProducts.length > 0 ? (
            <div className="product-cards-grid">
              {tierProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-fallback" style={{ textAlign: 'center', padding: '30px', color: '#71717a' }}>
              <p>No products found in this price bracket currently.</p>
            </div>
          )}
        </section>
      )}

      {showSection('sponsored') && sponsoredProducts.length > 0 && (
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

      {showSection('promoBanner') && (
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
      )}

      {/* NEW: Lower-Page 4-Quadrant Curated Sponsored Brand Boutiques */}
      <SponsoredBoutiqueGrid />

      {showSection('deals') && topValueDeals.length > 0 && (
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
      )}

      {/* NEW: AI Shopping Assistant & Gift Finder Quiz */}
      {showSection('shoppingQuiz') && homePageConfig?.shoppingQuiz && (
        <section className="home-section cream-bg" style={{ padding: '50px 0' }}>
          <div className="section-header center">
            <span className="section-subtitle">{homePageConfig.shoppingQuiz.subtitle || 'VIRTUAL STYLE HELPER'}</span>
            <h2>{homePageConfig.shoppingQuiz.title || 'AI Gift Finder & Style Assistant'}</h2>
          </div>
          
          <div className="ai-quiz-wizard-card">
            {quizStep === 0 && (
              <div className="ai-quiz-intro-hero">
                <h3>{homePageConfig.shoppingQuiz.introTitle || 'Unsure what fits your mood?'}</h3>
                <p>{homePageConfig.shoppingQuiz.introDesc || 'Our automated virtual stylist analyses your interests, needs, and budget to find matching boutique items from the NexCart catalog.'}</p>
                <button 
                  className="cta-btn primary"
                  onClick={() => setQuizStep(1)}
                >
                  {homePageConfig.shoppingQuiz.startBtnText || 'Start Quiz'}
                </button>
              </div>
            )}

            {quizStep > 0 && quizStep <= 3 && (
              <div className="ai-quiz-step-container">
                <div className="ai-quiz-progress-track">
                  <div 
                    className="ai-quiz-progress-bar" 
                    style={{ width: `${(quizStep / 3) * 100}%` }}
                  />
                </div>

                {/* Step 1: Recipient */}
                {quizStep === 1 && homePageConfig.shoppingQuiz.questions[0] && (
                  <div>
                    <h3>{homePageConfig.shoppingQuiz.questions[0].text}</h3>
                    <div className="ai-quiz-options-grid">
                      {homePageConfig.shoppingQuiz.questions[0].options.map((opt) => {
                        const optText = typeof opt === 'string' ? opt : opt.text;
                        const isSelected = quizAnswers.recipient === optText;
                        return (
                          <div 
                            key={optText}
                            className={`ai-quiz-option-button ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectQuizOption('recipient', optText)}
                          >
                            <span>{optText}</span>
                            <span className="ai-quiz-option-check-circle">✓</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Interest Category */}
                {quizStep === 2 && homePageConfig.shoppingQuiz.questions[1] && (
                  <div>
                    <h3>{homePageConfig.shoppingQuiz.questions[1].text}</h3>
                    <div className="ai-quiz-options-grid">
                      {homePageConfig.shoppingQuiz.questions[1].options.map((opt) => {
                        const isSelected = quizAnswers.interest?.text === opt.text;
                        return (
                          <div 
                            key={opt.text}
                            className={`ai-quiz-option-button ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectQuizOption('interest', opt)}
                          >
                            <span>{opt.text}</span>
                            <span className="ai-quiz-option-check-circle">✓</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Budget Range */}
                {quizStep === 3 && homePageConfig.shoppingQuiz.questions[2] && (
                  <div>
                    <h3>{homePageConfig.shoppingQuiz.questions[2].text}</h3>
                    <div className="ai-quiz-options-grid">
                      {homePageConfig.shoppingQuiz.questions[2].options.map((opt) => {
                        const isSelected = quizAnswers.budget?.text === opt.text;
                        return (
                          <div 
                            key={opt.text}
                            className={`ai-quiz-option-button ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectQuizOption('budget', opt)}
                          >
                            <span>{opt.text}</span>
                            <span className="ai-quiz-option-check-circle">✓</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="ai-quiz-nav-footer">
                  <button 
                    className="cta-btn secondary"
                    onClick={() => setQuizStep(prev => prev - 1)}
                  >
                    Back
                  </button>
                  <button 
                    className="cta-btn primary"
                    disabled={
                      (quizStep === 1 && !quizAnswers.recipient) ||
                      (quizStep === 2 && !quizAnswers.interest) ||
                      (quizStep === 3 && !quizAnswers.budget)
                    }
                    onClick={() => setQuizStep(prev => prev + 1)}
                  >
                    {quizStep === 3 ? 'Show Recommendations' : 'Next Question'}
                  </button>
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="ai-quiz-results-container">
                <div className="ai-quiz-results-banner">
                  <h4>Stylist Recommendations Found!</h4>
                  <p>
                    Curated selection for <strong>{quizAnswers.recipient}</strong> looking for <strong>{quizAnswers.interest?.text}</strong> within <strong>{quizAnswers.budget?.text}</strong>.
                  </p>
                </div>

                {matchedQuizProducts.length > 0 ? (
                  <div className="product-cards-grid">
                    {matchedQuizProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#71717a' }}>
                    <p style={{ marginBottom: '15px' }}>We couldn't find a direct match for this combination in our active catalog.</p>
                    <button className="cta-btn secondary" onClick={() => navigate('/products')}>Browse Full Catalog</button>
                  </div>
                )}

                <div className="ai-quiz-nav-footer" style={{ borderTop: '1px solid #e6e2db', paddingTop: '20px', marginTop: '30px' }}>
                  <button 
                    className="cta-btn secondary"
                    onClick={() => {
                      setQuizAnswers({ recipient: '', interest: null, budget: null });
                      setQuizStep(0);
                    }}
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* NEW: Shoppable UGC / "Shop the Look" Visual Gallery */}
      {showSection('shoppableUGC') && homePageConfig?.shoppableUGC && (
        <section className="home-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.shoppableUGC.subtitle || 'CUSTOMER LIFESTYLES'}</span>
              <h2>{homePageConfig.shoppableUGC.title || 'Shop the Look'}</h2>
            </div>
          </div>
          <div className="ugc-visual-gallery">
            {homePageConfig.shoppableUGC.posts.map((post) => (
              <div 
                key={post.id} 
                className="ugc-gallery-card"
                onMouseEnter={() => setActiveUgcTooltip(post.id)}
                onMouseLeave={() => setActiveUgcTooltip(null)}
                onClick={() => navigate(`/product/${post.productId}`)}
              >
                <img src={post.image} alt={post.handle} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80'; }} />
                <span className="ugc-card-handle">{post.handle}</span>
                
                <div className="ugc-hotspot-indicator">
                  <FiShoppingBag />
                </div>

                {activeUgcTooltip === post.id && (
                  <div className="ugc-product-tooltip">
                    {post.tooltip || "View Featured Product"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {showSection('brandSpotlight') && homePageConfig?.brandSpotlight && (
        <section className="home-section brand-spotlight-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.brandSpotlight.subtitle || 'OFFICIAL BRANDS'}</span>
              <h2>{homePageConfig.brandSpotlight.title || 'Official Brand Partners'}</h2>
            </div>
          </div>
          <div className="brands-logo-grid">
            {homePageConfig.brandSpotlight.brands.map(brand => (
              <div key={brand.id} className="brand-spotlight-card">
                <img src={brand.logo} alt={brand.name} className="brand-logo-img" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80'; }} />
                <h4>{brand.name}</h4>
                <p>{brand.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {showSection('infoCards') && homePageConfig?.infoCards && (
        <section className="home-section info-cards-section">
          <div className="section-header">
            <div>
              <span className="section-subtitle">{homePageConfig.infoCards.subtitle || 'OUR PROMISE'}</span>
              <h2>{homePageConfig.infoCards.title || 'Guaranteed Shopping Comfort'}</h2>
            </div>
          </div>
          <div className="info-cards-grid">
            {homePageConfig.infoCards.cards.map(card => (
              <div key={card.id} className="info-guarantee-card">
                <span className="info-card-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEW: Meesho-Style Dynamic Multi-Facet Discovery Feed: Products Only for You */}
      <ProductsOnlyForYou />

      <TrustFooter />

      {showSection('testimonials') && (
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
      )}

      {/* NEW: Interactive FAQ Accordion */}
      {showSection('faqAccordion') && homePageConfig?.faqAccordion && (
        <section className="home-section">
          <div className="section-header center">
            <span className="section-subtitle">{homePageConfig.faqAccordion.subtitle || 'HELP CENTER'}</span>
            <h2>{homePageConfig.faqAccordion.title || 'Frequently Asked Questions'}</h2>
          </div>
          <div className="faq-accordion-container">
            {homePageConfig.faqAccordion.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className={`faq-accordion-row ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-accordion-header"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown className="faq-chevron-icon" />
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-content">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {showSection('newsletter') && homePageConfig?.newsletter && (
        <section className="newsletter-signup-banner">
          <div className="newsletter-banner-content">
            <h2>{homePageConfig.newsletter.title || 'Sign up for NexCart Highlights'}</h2>
            <p>{homePageConfig.newsletter.subtitle || 'Subscribe for premium updates.'}</p>
            <form 
              className="newsletter-form-inline" 
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.elements.newsletterEmail.value;
                if (email) {
                  showToast(`Thank you! Subscription confirmed for ${email}`, 'success');
                  e.target.reset();
                }
              }}
            >
              <input 
                type="email" 
                name="newsletterEmail" 
                placeholder={homePageConfig.newsletter.placeholder || 'Enter your email'} 
                required 
              />
              <button type="submit" className="newsletter-submit-btn">
                {homePageConfig.newsletter.buttonText || 'Subscribe'}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* NEW: App Download & Loyalty Rewards Banner */}
      {showSection('appDownload') && homePageConfig?.appDownload && (
        <section className="home-section" style={{ padding: '10px 0' }}>
          <div className="app-download-loyalty-banner">
            <div className="app-banner-text">
              <h2>{homePageConfig.appDownload.title}</h2>
              <p>{homePageConfig.appDownload.subtitle}</p>
              {homePageConfig.appDownload.couponCode && (
                <div className="app-coupon-badge">
                  <FiTag /> Use Code: <strong>{homePageConfig.appDownload.couponCode}</strong>
                </div>
              )}
            </div>
            
            {homePageConfig.appDownload.qrImage && (
              <div className="app-qr-container">
                <img 
                  src={homePageConfig.appDownload.qrImage} 
                  alt="QR Code" 
                  className="app-qr-img" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=200&q=80'; }}
                />
                <div className="app-qr-caption">
                  <strong>Scan to Download</strong>
                  <span>Available on iOS & Android</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
