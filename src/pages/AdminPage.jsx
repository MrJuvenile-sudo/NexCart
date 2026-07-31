import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiBox, FiClipboard, FiUsers, FiDollarSign, FiPlus, 
  FiTrash2, FiAlertTriangle, FiX, FiLock, FiSliders, FiBell, 
  FiGift, FiImage, FiCheck, FiEye, FiEyeOff, FiHome, FiLogOut, 
  FiShield, FiMapPin
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/mockData';

export default function AdminPage() {
  const { user, login, logout } = useAuth();
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    topTicker,
    updateTopTicker,
    promoPopup,
    updatePromoPopup,
    heroBanners,
    updateHeroBanner,
    taxonomies,
    updateTaxonomy,
    storeInfo,
    updateStoreInfo,
    sponsoredIds,
    toggleSponsored,
    setIsPromoPopupOpen
  } = useCart();

  const navigate = useNavigate();
  const [adminTab, setAdminTab] = useState('dashboard');
  const [addProductModal, setAddProductModal] = useState(false);

  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    price: '',
    old: '',
    stock: 15,
    description: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied-container">
        <div className="access-card">
          <div className="icon-circle"><FiLock /></div>
          <h2>Admin Workspace Restricted</h2>
          <p>You need administrator permissions to view the store management dashboard.</p>
          <div className="demo-admin-box">
            <p>Sign in with administrator credentials:</p>
            <code>admin@nexcart.dev • Admin@123</code>
            <button 
              className="cta-btn primary full-width margin-top"
              onClick={() => login({ email: 'admin@nexcart.dev', password: 'Admin@123' })}
            >
              Sign In as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  const safeProducts = Array.isArray(products) ? products.filter(Boolean) : [];
  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];
  const safeBanners = Array.isArray(heroBanners) ? heroBanners.filter(Boolean) : [];
  const safeTaxonomies = Array.isArray(taxonomies) ? taxonomies.filter(Boolean) : [];
  const safeSponsoredIds = Array.isArray(sponsoredIds) ? sponsoredIds : [];

  const totalRevenue = safeOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = safeProducts.filter(p => p.stock < 15);

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    addProduct(newProd);
    setAddProductModal(false);
    setNewProd({
      name: '',
      category: 'Electronics',
      brand: '',
      price: '',
      old: '',
      stock: 15,
      description: '',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'
    });
  };

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const handleAdminSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-workspace-wrapper">
      <header className="custom-admin-header">
        <div className="admin-header-left">
          <Link to="/" className="admin-header-logo">
            <img src="/logo.png" alt="NexCart Logo" onError={(e) => { e.target.src = '/favicon.ico'; }} />
            <div className="admin-brand-text">
              <span>Nex<b>Cart</b></span>
              <small>ADMIN CONTROL CENTER</small>
            </div>
          </Link>
          <span className="live-status-pill">
            <span className="pulse-dot" /> Live System Synchronized
          </span>
        </div>

        <div className="admin-header-actions">
          <Link to="/" className="admin-header-btn secondary">
            <FiHome /> View Storefront
          </Link>
          <div className="admin-profile-badge">
            <FiShield /> <span>{user.name}</span>
          </div>
          <button className="admin-header-btn danger" onClick={handleAdminSignOut}>
            <FiLogOut /> Exit Admin
          </button>
        </div>
      </header>

      <div className="admin-dashboard-container">
        <div className="admin-layout-grid">
          <aside className="admin-sidebar">
            <button 
              className={adminTab === 'dashboard' ? 'active' : ''}
              onClick={() => setAdminTab('dashboard')}
            >
              <FiGrid /> Analytics Dashboard
            </button>
            <button 
              className={adminTab === 'store-config' ? 'active' : ''}
              onClick={() => setAdminTab('store-config')}
            >
              <FiSliders /> ⚡ Live Store Config
            </button>
            <button 
              className={adminTab === 'products' ? 'active' : ''}
              onClick={() => setAdminTab('products')}
            >
              <FiBox /> Catalog ({safeProducts.length})
            </button>
            <button 
              className={adminTab === 'orders' ? 'active' : ''}
              onClick={() => setAdminTab('orders')}
            >
              <FiClipboard /> Orders ({safeOrders.length})
            </button>
          </aside>

          <main className="admin-main-content">
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {adminTab === 'dashboard' && (
              <div className="admin-tab-view">
                <h1>Store Metrics Overview</h1>

                <div className="metrics-cards-grid">
                  <div className="metric-card">
                    <div className="metric-icon green"><FiDollarSign /></div>
                    <div className="metric-info">
                      <span className="label">Total Store Revenue</span>
                      <strong className="value">₹{formatPrice(totalRevenue)}</strong>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon blue"><FiClipboard /></div>
                    <div className="metric-info">
                      <span className="label">Total Orders Placed</span>
                      <strong className="value">{safeOrders.length}</strong>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon purple"><FiBox /></div>
                    <div className="metric-info">
                      <span className="label">Catalog Items</span>
                      <strong className="value">{safeProducts.length}</strong>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon orange"><FiUsers /></div>
                    <div className="metric-info">
                      <span className="label">Active Customers</span>
                      <strong className="value">1,248</strong>
                    </div>
                  </div>
                </div>

                <div className="admin-panels-grid">
                  <div className="admin-panel-card">
                    <h3><FiAlertTriangle className="warning-icon" /> Low Stock Inventory Alerts</h3>
                    <div className="panel-list">
                      {lowStockProducts.map(p => (
                        <div key={p.id} className="panel-row-item">
                          <span>{p.name}</span>
                          <strong className="red-badge">{p.stock} units remaining</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-panel-card">
                    <h3><FiClipboard /> Recent Customer Orders</h3>
                    <div className="panel-list">
                      {safeOrders.slice(0, 5).map(o => (
                        <div key={o.id} className="panel-row-item">
                          <span>Order #{o.id} • {o.shippingAddress?.name || 'Customer'}</span>
                          <strong className="status-chip">{o.status}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE STORE CONFIG MANAGER */}
            {adminTab === 'store-config' && (
              <div className="admin-tab-view">
                <h1>Real-Time Storefront Configurator</h1>
                <p>Changes saved here update the live website immediately across all visitors.</p>

                {/* 1. Header Ticker */}
                <div className="admin-edit-card margin-bottom">
                  <div className="admin-card-head">
                    <h3><FiBell /> Top Header Announcement Ticker</h3>
                    <button
                      className={`tax-vis-toggle ${topTicker?.enabled ? 'on' : 'off'}`}
                      onClick={() => updateTopTicker({ enabled: !topTicker?.enabled })}
                    >
                      {topTicker?.enabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                    </button>
                  </div>
                  <div className="admin-form-grid">
                    <div className="full-width">
                      <label>Main Sale Announcement Text</label>
                      <input
                        type="text"
                        value={topTicker?.text || ''}
                        onChange={(e) => updateTopTicker({ text: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Promo Code Text</label>
                      <input
                        type="text"
                        value={topTicker?.codeText || ''}
                        onChange={(e) => updateTopTicker({ codeText: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Shipping Perk Line</label>
                      <input
                        type="text"
                        value={topTicker?.shippingText || ''}
                        onChange={(e) => updateTopTicker({ shippingText: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Store Info & Social Media Links */}
                <div className="admin-edit-card margin-bottom">
                  <h3><FiMapPin /> Store Information & Social Media Links</h3>
                  <div className="admin-form-grid margin-top">
                    <div className="full-width">
                      <label>Headquarters Physical Address</label>
                      <input
                        type="text"
                        value={storeInfo?.address || ''}
                        onChange={(e) => updateStoreInfo({ address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Customer Support Email</label>
                      <input
                        type="text"
                        value={storeInfo?.email || ''}
                        onChange={(e) => updateStoreInfo({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Customer Helpline Phone</label>
                      <input
                        type="text"
                        value={storeInfo?.phone || ''}
                        onChange={(e) => updateStoreInfo({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Instagram Page URL</label>
                      <input
                        type="text"
                        value={storeInfo?.instagram || ''}
                        onChange={(e) => updateStoreInfo({ instagram: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Twitter / X Page URL</label>
                      <input
                        type="text"
                        value={storeInfo?.twitter || ''}
                        onChange={(e) => updateStoreInfo({ twitter: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Facebook Page URL</label>
                      <input
                        type="text"
                        value={storeInfo?.facebook || ''}
                        onChange={(e) => updateStoreInfo({ facebook: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>YouTube Channel URL</label>
                      <input
                        type="text"
                        value={storeInfo?.youtube || ''}
                        onChange={(e) => updateStoreInfo({ youtube: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Homepage Pop-up Deals */}
                <div className="admin-edit-card margin-bottom">
                  <div className="admin-card-head">
                    <h3><FiGift /> Homepage Promotional Deal Pop-Up</h3>
                    <div className="admin-btn-group">
                      <button className="admin-preview-btn" onClick={() => setIsPromoPopupOpen(true)}>
                        <FiEye /> Preview Pop-Up
                      </button>
                      <button
                        className={`tax-vis-toggle ${promoPopup?.enabled ? 'on' : 'off'}`}
                        onClick={() => updatePromoPopup({ enabled: !promoPopup?.enabled })}
                      >
                        {promoPopup?.enabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                      </button>
                    </div>
                  </div>
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
                      <label>Subtitle / Details</label>
                      <input
                        type="text"
                        value={promoPopup?.sub || ''}
                        onChange={(e) => updatePromoPopup({ sub: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Discount Code</label>
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

                {/* 4. Hero Banners */}
                <div className="admin-edit-card margin-bottom">
                  <h3><FiImage /> Hero Banner Slides & Countdown Timers</h3>
                  <div className="admin-cards-list margin-top">
                    {safeBanners.map(slide => (
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
                            <label>Tagline</label>
                            <input
                              type="text"
                              value={slide.tagline || ''}
                              onChange={(e) => updateHeroBanner(slide.id, { tagline: e.target.value })}
                            />
                          </div>
                          <div>
                            <label>Headline</label>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Taxonomies */}
                <div className="admin-edit-card margin-bottom">
                  <h3><FiGrid /> Category Taxonomy Bar</h3>
                  <div className="taxonomy-admin-list margin-top">
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

                {/* 6. Sponsored Feeds */}
                <div className="admin-edit-card">
                  <h3>🔥 Sponsored Partner Feeds</h3>
                  <p>Toggle products to feature sponsored badges on the home feed.</p>
                  <div className="sponsored-grid margin-top">
                    {safeProducts.map((p) => {
                      const isSpon = safeSponsoredIds.includes(p.id);
                      return (
                        <div
                          key={p.id}
                          className={`sponsored-card ${isSpon ? 'active' : ''}`}
                          onClick={() => toggleSponsored(p.id)}
                        >
                          <img src={p.image || ''} alt={p.name || ''} />
                          <div>
                            <strong>{p.name}</strong>
                            <span>₹{formatPrice(p.price)}</span>
                          </div>
                          <button className="spon-badge-btn">
                            {isSpon ? '🔥 Sponsored' : '+ Add Sponsor'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS CATALOG MANAGER */}
            {adminTab === 'products' && (
              <div className="admin-tab-view">
                <div className="tab-title-header">
                  <div>
                    <h1>Product Catalog</h1>
                    <p>Add, edit price, or adjust inventory stock.</p>
                  </div>
                  <button className="cta-btn primary" onClick={() => setAddProductModal(true)}>
                    <FiPlus /> Add New Product
                  </button>
                </div>

                <div className="admin-table-container">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {safeProducts.map(p => (
                        <tr key={p.id}>
                          <td className="product-cell">
                            <img src={p.image || ''} alt={p.name || 'Product'} />
                            <span>{p.name}</span>
                          </td>
                          <td>{p.category}</td>
                          <td>{p.brand}</td>
                          <td>
                            <input 
                              type="number"
                              style={{ width: '90px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #d4d4d8' }}
                              value={p.price || 0}
                              onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                            />
                          </td>
                          <td>
                            <span className={p.stock < 10 ? 'stock-badge low' : 'stock-badge'}>
                              {p.stock} units
                            </span>
                          </td>
                          <td>
                            <button 
                              className="icon-action-btn delete"
                              onClick={() => deleteProduct(p.id)}
                              title="Delete Product"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: ORDERS MANAGEMENT */}
            {adminTab === 'orders' && (
              <div className="admin-tab-view">
                <h1>Customer Orders</h1>
                <p>Update order fulfillment status.</p>

                <div className="admin-table-container">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {safeOrders.map(o => (
                        <tr key={o.id}>
                          <td><strong>#{o.id}</strong></td>
                          <td>{o.date}</td>
                          <td>{o.shippingAddress?.name || 'Customer'}</td>
                          <td>₹{formatPrice(o.total)}</td>
                          <td>{o.paymentMethod}</td>
                          <td>
                            <select 
                              className="status-selector-dropdown"
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {addProductModal && (
        <div className="modal-backdrop" onClick={() => setAddProductModal(false)}>
          <div className="admin-product-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setAddProductModal(false)}>
              <FiX />
            </button>

            <h3>Add New Product to Catalog</h3>

            <form onSubmit={handleAddProductSubmit} className="admin-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. SonicPro Wireless Earbuds"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  required 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input 
                    type="text" 
                    placeholder="Brand Name"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="1999"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Original Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="2999"
                    value={newProd.old}
                    onChange={(e) => setNewProd({ ...newProd, old: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Stock</label>
                  <input 
                    type="number" 
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Product Description</label>
                <textarea 
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Key features and details..."
                />
              </div>

              <button type="submit" className="cta-btn primary full-width">
                Add Product to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
