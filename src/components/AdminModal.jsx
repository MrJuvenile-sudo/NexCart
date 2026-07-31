import React, { useState } from 'react';
import {
  FiX, FiCheck, FiPlus, FiTrash2, FiSliders, FiImage, FiGrid,
  FiTag, FiEye, FiEyeOff, FiBell, FiGift
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function AdminModal() {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    heroBanners,
    updateHeroBanner,
    taxonomies,
    updateTaxonomy,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    topTicker,
    updateTopTicker,
    promoPopup,
    updatePromoPopup,
    setIsPromoPopupOpen
  } = useCart();

  const [activeTab, setActiveTab] = useState('ticker');
  const [newProd, setNewProd] = useState({ name: '', brand: '', category: 'Electronics', price: '', old: '', stock: '15', image: '' });
  const navigate = useNavigate();

  if (!isAdminModalOpen) return null;

  const safeBanners = Array.isArray(heroBanners) ? heroBanners.filter(Boolean) : [];
  const safeTaxonomies = Array.isArray(taxonomies) ? taxonomies.filter(Boolean) : [];
  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price || !newProd.image) return;
    addProduct(newProd);
    setNewProd({ name: '', brand: '', category: 'Electronics', price: '', old: '', stock: '15', image: '' });
  };

  return (
    <div className="admin-modal-backdrop" onClick={() => setIsAdminModalOpen(false)}>
      <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-title-row">
            <FiSliders className="admin-header-icon" />
            <div>
              <h2>Live Store Manager & Control Center</h2>
              <p>Configure top announcement ticker, sale popups, hero banners, taxonomies & catalog</p>
            </div>
          </div>
          <div className="admin-header-actions">
            <button className="admin-full-dash-btn" onClick={() => { setIsAdminModalOpen(false); navigate('/admin'); }}>
              Full Dashboard →
            </button>
            <button className="admin-close-btn" onClick={() => setIsAdminModalOpen(false)} aria-label="Close">
              <FiX />
            </button>
          </div>
        </div>

        <div className="admin-modal-tabs">
          <button className={`tab-btn ${activeTab === 'ticker' ? 'active' : ''}`} onClick={() => setActiveTab('ticker')}>
            <FiBell /> Header Ticker
          </button>
          <button className={`tab-btn ${activeTab === 'popup' ? 'active' : ''}`} onClick={() => setActiveTab('popup')}>
            <FiGift /> Pop-Up Deals
          </button>
          <button className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveTab('hero')}>
            <FiImage /> Hero Banners
          </button>
          <button className={`tab-btn ${activeTab === 'taxonomy' ? 'active' : ''}`} onClick={() => setActiveTab('taxonomy')}>
            <FiGrid /> Taxonomy Bar
          </button>
          <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <FiTag /> Catalog & Prices
          </button>
        </div>

        <div className="admin-modal-body">
          {/* TAB 1: HEADER TICKER */}
          {activeTab === 'ticker' && (
            <div className="admin-tab-content">
              <div className="admin-section-head">
                <h3>Top Header Ticker Announcement</h3>
                <button
                  className={`tax-vis-toggle ${topTicker?.enabled ? 'on' : 'off'}`}
                  onClick={() => updateTopTicker({ enabled: !topTicker?.enabled })}
                >
                  {topTicker?.enabled ? <><FiCheck /> Active</> : <><FiX /> Disabled</>}
                </button>
              </div>
              <div className="admin-edit-card">
                <div className="admin-form-grid">
                  <div className="full-width">
                    <label>Primary Sale Announcement Line</label>
                    <input
                      type="text"
                      value={topTicker?.text || ''}
                      onChange={(e) => updateTopTicker({ text: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Coupon Code Text</label>
                    <input
                      type="text"
                      value={topTicker?.codeText || ''}
                      onChange={(e) => updateTopTicker({ codeText: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Shipping Assurance Text</label>
                    <input
                      type="text"
                      value={topTicker?.shippingText || ''}
                      onChange={(e) => updateTopTicker({ shippingText: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMO POPUP MANAGER */}
          {activeTab === 'popup' && (
            <div className="admin-tab-content">
              <div className="admin-section-head">
                <h3>Homepage Promotional Pop-Up Modal</h3>
                <div className="admin-btn-group">
                  <button
                    className="admin-preview-btn"
                    onClick={() => {
                      setIsAdminModalOpen(false);
                      setIsPromoPopupOpen(true);
                    }}
                  >
                    <FiEye /> Preview Pop-Up Now
                  </button>
                  <button
                    className={`tax-vis-toggle ${promoPopup?.enabled ? 'on' : 'off'}`}
                    onClick={() => updatePromoPopup({ enabled: !promoPopup?.enabled })}
                  >
                    {promoPopup?.enabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                  </button>
                </div>
              </div>

              <div className="admin-edit-card">
                <div className="admin-form-grid">
                  <div className="full-width">
                    <label>Pop-Up Title</label>
                    <input
                      type="text"
                      value={promoPopup?.title || ''}
                      onChange={(e) => updatePromoPopup({ title: e.target.value })}
                    />
                  </div>
                  <div className="full-width">
                    <label>Subtitle / Description</label>
                    <input
                      type="text"
                      value={promoPopup?.sub || ''}
                      onChange={(e) => updatePromoPopup({ sub: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Promo Code</label>
                    <input
                      type="text"
                      value={promoPopup?.code || ''}
                      onChange={(e) => updatePromoPopup({ code: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Discount Badge Text</label>
                    <input
                      type="text"
                      value={promoPopup?.discount || ''}
                      onChange={(e) => updatePromoPopup({ discount: e.target.value })}
                    />
                  </div>
                  <div className="full-width">
                    <label>Pop-Up Feature Image URL</label>
                    <input
                      type="text"
                      value={promoPopup?.image || ''}
                      onChange={(e) => updatePromoPopup({ image: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO BANNERS */}
          {activeTab === 'hero' && (
            <div className="admin-tab-content">
              <h3>Edit Hero Banners & Sale Countdown</h3>
              <div className="admin-cards-list">
                {safeBanners.map((slide) => (
                  <div key={slide.id} className="admin-edit-card">
                    <div className="admin-card-head">
                      <strong>Slide #{slide.id}: {slide.tagline}</strong>
                      <button
                        className="toggle-vis-btn"
                        onClick={() => updateHeroBanner(slide.id, { visible: !slide.visible })}
                      >
                        {slide.visible ? <><FiEye /> Visible</> : <><FiEyeOff /> Hidden</>}
                      </button>
                    </div>
                    <div className="admin-form-grid">
                      <div>
                        <label>Tagline / Sale Badge</label>
                        <input
                          type="text"
                          value={slide.tagline || ''}
                          onChange={(e) => updateHeroBanner(slide.id, { tagline: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>Headline (HTML allowed)</label>
                        <input
                          type="text"
                          value={slide.headline || ''}
                          onChange={(e) => updateHeroBanner(slide.id, { headline: e.target.value })}
                        />
                      </div>
                      <div className="full-width">
                        <label>Image URL</label>
                        <input
                          type="text"
                          value={slide.image || ''}
                          onChange={(e) => updateHeroBanner(slide.id, { image: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>CTA Text</label>
                        <input
                          type="text"
                          value={slide.cta || ''}
                          onChange={(e) => updateHeroBanner(slide.id, { cta: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>Accent Color</label>
                        <input
                          type="color"
                          value={slide.accent || '#FFE500'}
                          onChange={(e) => updateHeroBanner(slide.id, { accent: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TAXONOMY BAR */}
          {activeTab === 'taxonomy' && (
            <div className="admin-tab-content">
              <h3>Taxonomy Category Visibility & Order</h3>
              <div className="taxonomy-admin-list">
                {safeTaxonomies.map((cat) => (
                  <div key={cat.id} className="tax-admin-item">
                    <span className="tax-icon-preview">{cat.icon || '🏷️'}</span>
                    <input
                      type="text"
                      className="tax-name-input"
                      value={cat.name || ''}
                      onChange={(e) => updateTaxonomy(cat.id, { name: e.target.value })}
                    />
                    <button
                      className={`tax-vis-toggle ${cat.visible ? 'on' : 'off'}`}
                      onClick={() => updateTaxonomy(cat.id, { visible: !cat.visible })}
                    >
                      {cat.visible ? <><FiCheck /> Active</> : <><FiX /> Hidden</>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTS & PRICING */}
          {activeTab === 'products' && (
            <div className="admin-tab-content">
              <h3>Add New Product</h3>
              <form onSubmit={handleAddProductSubmit} className="add-product-form">
                <input
                  type="text"
                  placeholder="Product Title *"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Brand *"
                  value={newProd.brand}
                  onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                  required
                />
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                </select>
                <input
                  type="number"
                  placeholder="Price (₹) *"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price (₹)"
                  value={newProd.old}
                  onChange={(e) => setNewProd({ ...newProd, old: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL *"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  required
                />
                <button type="submit" className="admin-submit-btn"><FiPlus /> Add Product</button>
              </form>

              <h3>Catalog Products ({safeProducts.length})</h3>
              <div className="admin-products-list">
                {safeProducts.map((p) => (
                  <div key={p.id} className="admin-product-row">
                    <img src={p.image || ''} alt={p.name || 'Product'} className="admin-prod-thumb" />
                    <div className="admin-prod-details">
                      <strong>{p.name}</strong>
                      <small>{p.category} • ₹{p.price}</small>
                    </div>
                    <div className="admin-prod-inputs">
                      <input
                        type="number"
                        value={p.price || 0}
                        onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                      />
                      <button className="del-btn" onClick={() => deleteProduct(p.id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
