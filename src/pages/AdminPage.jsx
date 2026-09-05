import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiBox, FiClipboard, FiUsers, FiDollarSign, FiPlus, 
  FiTrash2, FiAlertTriangle, FiX, FiLock, FiSliders, FiBell, 
  FiGift, FiImage, FiCheck, FiEye, FiEyeOff, FiLogOut, 
  FiShield, FiMapPin, FiEdit3, FiSearch, FiFilter, 
  FiExternalLink, FiTrendingUp, FiClock,
  FiChevronLeft, FiChevronRight, FiArrowUpRight, 
  FiLayers
} from 'react-icons/fi';
import CountdownTimer from '../components/CountdownTimer';
import NexCartLogo from '../components/NexCartLogo';
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
    flashDealConfig,
    updateFlashDealConfig,
    sponsoredIds,
    toggleSponsored,
    setIsPromoPopupOpen,
    homePageConfig,
    updateHomePageConfig
  } = useCart();

  const navigate = useNavigate();

  // Active Admin Tabs: dashboard, products, categories, hero-banners, timers, store-config, promo-popup, homepage-sections, orders
  const [adminTab, setAdminTab] = useState('dashboard');

  // Modals & Selectors State
  const [addProductModal, setAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  
  // Product Catalog Filters & Pagination
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productStockFilter, setProductStockFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('✨');
  const [newCatSlug, setNewCatSlug] = useState('');

  // Add Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    sku: '',
    price: '',
    old: '',
    stock: 25,
    description: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    specs: {
      Warranty: '1 Year Manufacturer Warranty',
      Authenticity: '100% Genuine Guaranteed'
    }
  });

  // Edit Product Form State
  const [editForm, setEditForm] = useState(null);

  const safeProducts = useMemo(() => Array.isArray(products) ? products.filter(Boolean) : [], [products]);
  const safeOrders = useMemo(() => Array.isArray(orders) ? orders.filter(Boolean) : [], [orders]);
  const safeBanners = useMemo(() => Array.isArray(heroBanners) ? heroBanners.filter(Boolean) : [], [heroBanners]);
  const safeTaxonomies = useMemo(() => Array.isArray(taxonomies) ? taxonomies.filter(Boolean) : [], [taxonomies]);
  const safeSponsoredIds = useMemo(() => Array.isArray(sponsoredIds) ? sponsoredIds : [], [sponsoredIds]);

  const totalRevenue = useMemo(() => safeOrders.reduce((sum, o) => sum + (o.total || 0), 0), [safeOrders]);
  const lowStockProducts = useMemo(() => safeProducts.filter(p => (p.stock || 0) < 15), [safeProducts]);

  // Filter Products for Catalog Table
  const filteredProducts = useMemo(() => {
    return safeProducts.filter(p => {
      const matchesSearch = !productSearch || 
        (p.name && p.name.toLowerCase().includes(productSearch.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase())) ||
        (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase()));

      const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;

      let matchesStock = true;
      if (productStockFilter === 'in-stock') matchesStock = (p.stock || 0) > 10;
      else if (productStockFilter === 'low-stock') matchesStock = (p.stock || 0) > 0 && (p.stock || 0) <= 10;
      else if (productStockFilter === 'out-of-stock') matchesStock = (p.stock || 0) <= 0;

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [safeProducts, productSearch, productCategoryFilter, productStockFilter]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Filter Orders
  const filteredOrders = useMemo(() => {
    if (orderStatusFilter === 'All') return safeOrders;
    return safeOrders.filter(o => o.status === orderStatusFilter);
  }, [safeOrders, orderStatusFilter]);  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied-container">
        <div className="access-card">
          <div className="admin-login-brand-header">
            <NexCartLogo size={56} variant="card" subtitle="ADMIN CONTROL CENTER" />
          </div>
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

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const toDatetimeLocal = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(Number(timestamp));
    if (isNaN(d.getTime())) return '';
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleAdminSignOut = () => {
    logout();
    navigate('/login');
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      ...product,
      specs: product.specs || {}
    });
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editingProduct || !editForm) return;

    updateProduct(editingProduct.id, {
      ...editForm,
      price: Number(editForm.price),
      old: editForm.old ? Number(editForm.old) : null,
      stock: Number(editForm.stock)
    });
    setEditingProduct(null);
    setEditForm(null);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    addProduct({
      ...newProd,
      price: Number(newProd.price),
      old: newProd.old ? Number(newProd.old) : Math.round(Number(newProd.price) * 1.3),
      stock: Number(newProd.stock) || 20,
      sku: newProd.sku || `NC-${(newProd.category || 'GEN').substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`
    });
    setAddProductModal(false);
    setNewProd({
      name: '',
      category: 'Electronics',
      brand: '',
      sku: '',
      price: '',
      old: '',
      stock: 25,
      description: '',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      specs: {
        Warranty: '1 Year Manufacturer Warranty',
        Authenticity: '100% Genuine Guaranteed'
      }
    });
  };

  const handleQuickStockDelta = (productId, delta) => {
    const prod = safeProducts.find(p => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    updateProduct(productId, { stock: newStock });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const catId = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-');
    updateTaxonomy(catId, {
      name: newCatName,
      icon: newCatIcon || '✨',
      visible: true
    });
    setNewCatName('');
    setNewCatSlug('');
    setNewCatIcon('✨');
  };

  return (
    <div className="admin-workspace-wrapper">
      {/* 1. TOP FLUSH COMMAND HEADER */}
      <header className="custom-admin-header">
        <div className="admin-header-left">
          <Link to="/" className="admin-header-logo" title="Back to Storefront">
            <NexCartLogo size={38} variant="header" subtitle="ADMIN CONTROL CENTER" />
          </Link>
          <span className="live-status-pill">
            <span className="pulse-dot" /> Live System Synchronized
          </span>
          <div className="admin-header-quick-stats">
            <span className="quick-stat-badge">
              <strong>{safeProducts.length}</strong> Products
            </span>
            <span className="quick-stat-badge">
              <strong>{safeOrders.length}</strong> Orders
            </span>
            <span className="quick-stat-badge highlight">
              <strong>₹{formatPrice(totalRevenue)}</strong> Revenue
            </span>
          </div>
        </div>

        <div className="admin-header-actions">
          <Link to="/" className="admin-header-btn secondary" target="_blank" rel="noreferrer" title="Open Storefront in New Tab">
            <FiExternalLink /> View Storefront
          </Link>
          <div className="admin-profile-badge">
            <FiShield /> <span>{user.name}</span>
          </div>
          <button className="admin-header-btn danger" onClick={handleAdminSignOut} title="Sign Out of Administrator Account">
            <FiLogOut /> Exit Admin
          </button>
        </div>
      </header>

      {/* 2. ADMIN WORKSPACE MAIN GRID */}
      <div className="admin-dashboard-container">
        <div className="admin-layout-grid">
          {/* SIDEBAR NAVIGATION */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-profile-card">
              <NexCartLogo size={34} variant="sidebar" showText={false} />
              <div className="sidebar-brand-meta">
                <strong>NexCart Store Ops</strong>
                <span className="sidebar-status-tag">Online • v2.0</span>
              </div>
            </div>

            <div className="sidebar-group-title">MANAGEMENT CONSOLE</div>
            
            <button 
              className={adminTab === 'dashboard' ? 'active' : ''}
              onClick={() => setAdminTab('dashboard')}
            >
              <FiGrid /> <span>Analytics & Metrics</span>
            </button>

            <button 
              className={adminTab === 'products' ? 'active' : ''}
              onClick={() => { setAdminTab('products'); setCurrentPage(1); }}
            >
              <FiBox /> <span>Catalog Manager</span>
              <span className="sidebar-count-chip">{safeProducts.length}</span>
            </button>

            <button 
              className={adminTab === 'categories' ? 'active' : ''}
              onClick={() => setAdminTab('categories')}
            >
              <FiLayers /> <span>Categories (15)</span>
              <span className="sidebar-count-chip">{safeTaxonomies.length}</span>
            </button>

            <button 
              className={adminTab === 'hero-banners' ? 'active' : ''}
              onClick={() => setAdminTab('hero-banners')}
            >
              <FiImage /> <span>Hero Carousel Studio</span>
              <span className="sidebar-count-chip">{safeBanners.length}</span>
            </button>

            <button 
              className={adminTab === 'timers' ? 'active' : ''}
              onClick={() => setAdminTab('timers')}
            >
              <FiClock /> <span>Countdown & Deal Timers</span>
              <span className="sidebar-count-chip live-chip">Live</span>
            </button>

            <button 
              className={adminTab === 'store-config' ? 'active' : ''}
              onClick={() => setAdminTab('store-config')}
            >
              <FiSliders /> <span>Header Ticker & Store Info</span>
            </button>

            <button 
              className={adminTab === 'promo-popup' ? 'active' : ''}
              onClick={() => setAdminTab('promo-popup')}
            >
              <FiGift /> <span>Deals & Pop-up Campaign</span>
            </button>

            <button 
              className={adminTab === 'homepage-sections' ? 'active' : ''}
              onClick={() => setAdminTab('homepage-sections')}
            >
              <FiEye /> <span>Homepage Sections Layout</span>
            </button>

            <button 
              className={adminTab === 'orders' ? 'active' : ''}
              onClick={() => setAdminTab('orders')}
            >
              <FiClipboard /> <span>Customer Orders</span>
              <span className="sidebar-count-chip">{safeOrders.length}</span>
            </button>

            <div className="sidebar-footer-card">
              <div className="sidebar-footer-title">NexCart Engine v2.0</div>
              <div className="sidebar-footer-sub">Real-Time Sync Active</div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="admin-main-content">
            
            {/* ========================================================
               TAB 1: ANALYTICS & METRICS DASHBOARD
               ======================================================== */}
            {adminTab === 'dashboard' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Store Metrics & Insights</h1>
                    <p>Live synchronization overview across orders, catalog items, and customer activity.</p>
                  </div>
                  <div className="header-action-group">
                    <button className="cta-btn primary" onClick={() => setAddProductModal(true)}>
                      <FiPlus /> Add New Product
                    </button>
                  </div>
                </div>

                {/* 4 Top Metric Cards */}
                <div className="metrics-cards-grid">
                  <div className="metric-card">
                    <div className="metric-icon green"><FiDollarSign /></div>
                    <div className="metric-info">
                      <span className="label">Total Store Revenue</span>
                      <strong className="value">₹{formatPrice(totalRevenue)}</strong>
                      <span className="trend-text positive"><FiTrendingUp /> +24.8% this month</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon blue"><FiClipboard /></div>
                    <div className="metric-info">
                      <span className="label">Total Orders Placed</span>
                      <strong className="value">{safeOrders.length}</strong>
                      <span className="trend-text neutral">100% fulfillment rate</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon purple"><FiBox /></div>
                    <div className="metric-info">
                      <span className="label">Catalog Inventory</span>
                      <strong className="value">{safeProducts.length}</strong>
                      <span className="trend-text positive">Across 15 categories</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon orange"><FiUsers /></div>
                    <div className="metric-info">
                      <span className="label">Active Customer Accounts</span>
                      <strong className="value">1,480+</strong>
                      <span className="trend-text positive"><FiArrowUpRight /> 98.4% CSAT</span>
                    </div>
                  </div>
                </div>

                {/* Quick Restock & Inventory Radar */}
                <div className="admin-panels-grid margin-top-lg">
                  <div className="admin-panel-card">
                    <div className="panel-card-head">
                      <h3><FiAlertTriangle className="warning-icon" /> Low Inventory Radar ({lowStockProducts.length})</h3>
                      <button className="panel-head-link" onClick={() => { setAdminTab('products'); setProductStockFilter('low-stock'); }}>
                        Manage All <FiChevronRight />
                      </button>
                    </div>
                    
                    <div className="panel-list">
                      {lowStockProducts.length === 0 ? (
                        <div className="panel-empty-state">✅ All products have healthy stock levels!</div>
                      ) : (
                        lowStockProducts.slice(0, 6).map(p => (
                          <div key={p.id} className="panel-row-item">
                            <div className="panel-item-left">
                              <img src={p.image || ''} alt={p.name} className="panel-thumb" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'; }} />
                              <div>
                                <strong>{p.name}</strong>
                                <small>{p.category} • SKU: {p.sku || `NC-${p.id}`}</small>
                              </div>
                            </div>
                            <div className="panel-item-right">
                              <span className="stock-alert-pill">{p.stock} left</span>
                              <button className="quick-restock-btn" onClick={() => handleQuickStockDelta(p.id, 25)} title="Add 25 units">
                                +25 Restock
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recent Orders Stream */}
                  <div className="admin-panel-card">
                    <div className="panel-card-head">
                      <h3><FiClipboard /> Live Orders Pipeline</h3>
                      <button className="panel-head-link" onClick={() => setAdminTab('orders')}>
                        View All Orders <FiChevronRight />
                      </button>
                    </div>

                    <div className="panel-list">
                      {safeOrders.slice(0, 5).map(o => (
                        <div key={o.id} className="panel-row-item">
                          <div>
                            <strong>Order #{o.id}</strong>
                            <small>{o.shippingAddress?.name || 'Customer'} • ₹{formatPrice(o.total)}</small>
                          </div>
                          <div className="panel-item-right">
                            <span className={`status-badge-chip ${o.status.toLowerCase()}`}>
                              {o.status}
                            </span>
                            <select 
                              className="order-quick-status-select"
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 2: CATALOG & PRODUCT MANAGER (300+ ITEMS)
               ======================================================== */}
            {adminTab === 'products' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Product Catalog Management ({safeProducts.length} Items)</h1>
                    <p>Live inventory control, instant inline editing, pricing management, and sponsored promotions.</p>
                  </div>
                  <div className="header-action-group">
                    <button className="cta-btn primary" onClick={() => setAddProductModal(true)}>
                      <FiPlus /> Add New Product
                    </button>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="catalog-toolbar-card">
                  <div className="search-input-wrap">
                    <FiSearch />
                    <input 
                      type="text"
                      placeholder="Search by title, brand, SKU or model..."
                      value={productSearch}
                      onChange={(e) => { setProductSearch(e.target.value); setCurrentPage(1); }}
                    />
                    {productSearch && (
                      <button className="clear-search-btn" onClick={() => setProductSearch('')}><FiX /></button>
                    )}
                  </div>

                  <div className="toolbar-selects-group">
                    <div className="toolbar-select-item">
                      <label><FiFilter /> Category:</label>
                      <select 
                        value={productCategoryFilter}
                        onChange={(e) => { setProductCategoryFilter(e.target.value); setCurrentPage(1); }}
                      >
                        <option value="All">All Categories (15)</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="toolbar-select-item">
                      <label>Stock Level:</label>
                      <select 
                        value={productStockFilter}
                        onChange={(e) => { setProductStockFilter(e.target.value); setCurrentPage(1); }}
                      >
                        <option value="all">All Inventory</option>
                        <option value="in-stock">In Stock (&gt;10 units)</option>
                        <option value="low-stock">Low Stock (1-10 units)</option>
                        <option value="out-of-stock">Out of Stock (0 units)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="admin-table-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Product & Details</th>
                        <th>Category & SKU</th>
                        <th>Price (₹)</th>
                        <th>Stock Level</th>
                        <th>Sponsored</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="table-empty-cell">
                            No products match your search or filter criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedProducts.map((prod) => {
                          const isSpon = safeSponsoredIds.includes(prod.id);
                          const isLow = (prod.stock || 0) < 10;
                          return (
                            <tr key={prod.id} className={isLow ? 'low-stock-row' : ''}>
                              <td>
                                <div className="product-table-identity">
                                  <img 
                                    src={prod.image || ''} 
                                    alt={prod.name} 
                                    className="table-product-thumb"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'; }} 
                                  />
                                  <div>
                                    <strong className="table-prod-name">{prod.name}</strong>
                                    <span className="table-prod-brand">{prod.brand || 'Brand'} • {prod.rating || 4.5} ⭐ ({prod.reviews || 0} reviews)</span>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <span className="category-pill-tag">{prod.category}</span>
                                <small className="sku-code">{prod.sku || `NC-${prod.id}`}</small>
                              </td>

                              <td>
                                <div className="price-stack">
                                  <strong className="table-price">₹{formatPrice(prod.price)}</strong>
                                  {prod.old && <small className="table-old-price">₹{formatPrice(prod.old)}</small>}
                                </div>
                              </td>

                              <td>
                                <div className="inline-stock-controller">
                                  <button 
                                    className="stock-step-btn" 
                                    onClick={() => handleQuickStockDelta(prod.id, -1)}
                                    title="Decrease stock by 1"
                                  >
                                    -
                                  </button>
                                  <span className={`stock-number ${isLow ? 'low' : ''}`}>
                                    {prod.stock || 0}
                                  </span>
                                  <button 
                                    className="stock-step-btn" 
                                    onClick={() => handleQuickStockDelta(prod.id, 1)}
                                    title="Increase stock by 1"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td>
                                <button 
                                  className={`spon-toggle-pill ${isSpon ? 'active' : ''}`}
                                  onClick={() => toggleSponsored(prod.id)}
                                  title={isSpon ? "Remove from Sponsored deals" : "Promote as Sponsored deal"}
                                >
                                  {isSpon ? '🔥 Sponsored' : '+ Sponsor'}
                                </button>
                              </td>

                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    className="action-icon-btn edit" 
                                    onClick={() => openEditModal(prod)}
                                    title="Edit Product Details & Specs"
                                  >
                                    <FiEdit3 /> Edit
                                  </button>
                                  <button 
                                    className="action-icon-btn delete" 
                                    onClick={() => deleteProduct(prod.id)}
                                    title="Delete Product"
                                  >
                                    <FiTrash2 />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="table-pagination-footer">
                  <span className="pagination-count-info">
                    Showing <strong>{paginatedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> matched products
                  </span>

                  <div className="pagination-btns-wrap">
                    <button 
                      className="page-nav-btn" 
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                      <FiChevronLeft /> Previous
                    </button>
                    
                    <span className="page-current-tag">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button 
                      className="page-nav-btn" 
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                      Next <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 3: CATEGORIES & TAXONOMIES STUDIO (ALL 15)
               ======================================================== */}
            {adminTab === 'categories' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Category Taxonomy Studio (15 Departments)</h1>
                    <p>Customize sub-navbar items, change category icons, names, and toggle storefront visibility.</p>
                  </div>
                </div>

                {/* Add Custom Category Form */}
                <div className="admin-edit-card margin-bottom">
                  <h3><FiPlus /> Add New Category Department</h3>
                  <form onSubmit={handleAddCategory} className="admin-form-grid margin-top">
                    <div>
                      <label>Category Display Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. Smart Home"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Icon Emoji</label>
                      <input 
                        type="text"
                        placeholder="e.g. 💡"
                        value={newCatIcon}
                        onChange={(e) => setNewCatIcon(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>URL Slug (Optional)</label>
                      <input 
                        type="text"
                        placeholder="e.g. smart-home"
                        value={newCatSlug}
                        onChange={(e) => setNewCatSlug(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button type="submit" className="cta-btn primary full-width">
                        Create Category
                      </button>
                    </div>
                  </form>
                </div>

                {/* Categories Grid */}
                <div className="admin-categories-cards-grid">
                  {safeTaxonomies.map((cat) => (
                    <div key={cat.id} className={`taxonomy-manage-card ${cat.visible ? 'active' : 'hidden-cat'}`}>
                      <div className="tax-card-head">
                        <span className="tax-large-icon">{cat.icon || '🏷️'}</span>
                        <button
                          className={`tax-vis-toggle ${cat.visible ? 'on' : 'off'}`}
                          onClick={() => updateTaxonomy(cat.id, { visible: !cat.visible })}
                        >
                          {cat.visible ? <><FiCheck /> Active</> : <><FiX /> Hidden</>}
                        </button>
                      </div>

                      <div className="tax-card-body">
                        <label>Category Label</label>
                        <input
                          type="text"
                          className="tax-name-input"
                          value={cat.name || ''}
                          onChange={(e) => updateTaxonomy(cat.id, { name: e.target.value })}
                        />
                        <div className="tax-meta-row">
                          <small>ID: {cat.id}</small>
                          <small>Icon: 
                            <input 
                              type="text" 
                              className="icon-mini-input"
                              value={cat.icon || ''}
                              onChange={(e) => updateTaxonomy(cat.id, { icon: e.target.value })}
                            />
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 4: HERO BANNERS & SLIDER STUDIO
               ======================================================== */}
            {adminTab === 'hero-banners' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Hero Carousel Banners Studio</h1>
                    <p>Edit hero slides, update headlines, marketing imagery, and live countdown deal timers.</p>
                  </div>
                </div>

                <div className="hero-banners-manage-list">
                  {safeBanners.map((slide, idx) => (
                    <div key={slide.id} className="admin-edit-card hero-slide-card">
                      <div className="admin-card-head">
                        <div className="slide-title-wrap">
                          <span className="slide-number-badge">Slide #{idx + 1}</span>
                          <strong>{slide.headline || 'Slide Headline'}</strong>
                        </div>
                        <button
                          className={`tax-vis-toggle ${slide.visible ? 'on' : 'off'}`}
                          onClick={() => updateHeroBanner(slide.id, { visible: !slide.visible })}
                        >
                          {slide.visible ? <><FiEye /> Visible</> : <><FiEyeOff /> Hidden</>}
                        </button>
                      </div>

                      <div className="slide-preview-strip">
                        <img src={slide.image} alt={slide.headline} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'; }} />
                        <div className="preview-overlay-info">
                          <span className="preview-tagline">{slide.tagline}</span>
                          <h3>{slide.headline}</h3>
                          <p>{slide.sub}</p>
                        </div>
                      </div>

                      <div className="admin-form-grid margin-top">
                        <div>
                          <label>Marketing Tagline / Pill</label>
                          <input
                            type="text"
                            value={slide.tagline || ''}
                            onChange={(e) => updateHeroBanner(slide.id, { tagline: e.target.value })}
                          />
                        </div>
                        <div>
                          <label>Primary Headline</label>
                          <input
                            type="text"
                            value={slide.headline || ''}
                            onChange={(e) => updateHeroBanner(slide.id, { headline: e.target.value })}
                          />
                        </div>
                        <div className="full-width">
                          <label>Subheadline / Promotional Description</label>
                          <input
                            type="text"
                            value={slide.sub || ''}
                            onChange={(e) => updateHeroBanner(slide.id, { sub: e.target.value })}
                          />
                        </div>
                        <div className="full-width">
                          <label>Background Hero Image URL</label>
                          <input
                            type="text"
                            value={slide.image || ''}
                            onChange={(e) => updateHeroBanner(slide.id, { image: e.target.value })}
                          />
                        </div>

                        {/* Slide Countdown Timer Controls */}
                        <div className="full-width slide-timer-panel-box">
                          <div className="slide-timer-head-row">
                            <div className="timer-title-group">
                              <FiClock className="timer-icon-lead" />
                              <div>
                                <strong>Promotional Countdown Timer</strong>
                                <small>Displays a live ticking deal countdown on this hero banner slide</small>
                              </div>
                            </div>
                            <button
                              type="button"
                              className={`tax-vis-toggle ${slide.hasTimer ? 'on' : 'off'}`}
                              onClick={() => updateHeroBanner(slide.id, { hasTimer: !slide.hasTimer })}
                            >
                              {slide.hasTimer ? <><FiCheck /> Timer Active</> : <><FiX /> Timer Off</>}
                            </button>
                          </div>

                          {slide.hasTimer && (
                            <div className="slide-timer-inputs-grid margin-top">
                              <div>
                                <label>Timer Label Copy</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Limited Deal Ends in:"
                                  value={slide.timerLabel || 'Limited Deal Ends in:'}
                                  onChange={(e) => updateHeroBanner(slide.id, { timerLabel: e.target.value })}
                                />
                              </div>

                              <div>
                                <label>Target End Date & Time</label>
                                <input
                                  type="datetime-local"
                                  value={toDatetimeLocal(slide.saleTimer || (Date.now() + 24 * 3600 * 1000))}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val) {
                                      const ms = new Date(val).getTime();
                                      if (!isNaN(ms)) {
                                        updateHeroBanner(slide.id, { saleTimer: ms });
                                      }
                                    }
                                  }}
                                />
                              </div>

                              <div className="full-width timer-preset-row">
                                <span className="preset-label">Quick Duration Presets:</span>
                                <div className="preset-buttons-wrap">
                                  {[
                                    { label: '+2h', hours: 2 },
                                    { label: '+6h', hours: 6 },
                                    { label: '+12h', hours: 12 },
                                    { label: '+24h (1 Day)', hours: 24 },
                                    { label: '+48h (2 Days)', hours: 48 },
                                    { label: '+7 Days', hours: 168 }
                                  ].map(p => (
                                    <button
                                      key={p.label}
                                      type="button"
                                      className="preset-time-chip"
                                      onClick={() => updateHeroBanner(slide.id, { saleTimer: Date.now() + p.hours * 3600 * 1000, hasTimer: true })}
                                    >
                                      {p.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="full-width live-timer-preview-box">
                                <span className="live-preview-badge">Live Storefront Preview:</span>
                                <div className="preview-clock-wrap">
                                  <span>{slide.timerLabel || 'Limited Deal Ends in:'}</span>
                                  <CountdownTimer endTime={slide.saleTimer || (Date.now() + 24 * 3600 * 1000)} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 5: COUNTDOWN & FLASH DEAL TIMERS HUB
               ======================================================== */}
            {adminTab === 'timers' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Countdown Timers & Flash Deals Control Center</h1>
                    <p>Manage sale countdowns, flash lightning deals, duration timers, and live storefront clocks.</p>
                  </div>
                </div>

                {/* 1. Flash Deals Main Timer Card */}
                <div className="admin-edit-card margin-bottom">
                  <div className="admin-card-head">
                    <div className="timer-title-group">
                      <div className="timer-icon-bubble">⚡</div>
                      <div>
                        <h3>Flash Deals Section Countdown</h3>
                        <small>Controls the countdown clock and featured items on the storefront Flash Deal shelf</small>
                      </div>
                    </div>

                    <button
                      className={`tax-vis-toggle ${flashDealConfig?.enabled ? 'on' : 'off'}`}
                      onClick={() => updateFlashDealConfig({ enabled: !flashDealConfig?.enabled })}
                    >
                      {flashDealConfig?.enabled ? <><FiCheck /> Flash Sale Active</> : <><FiX /> Disabled</>}
                    </button>
                  </div>

                  {/* Live Clock Strip */}
                  <div className="flash-timer-live-bar margin-top">
                    <div className="live-clock-left">
                      <span className="live-pulse-dot" />
                      <div>
                        <span className="live-status-label">Current Countdown Status</span>
                        <strong>{flashDealConfig?.title || 'Flash Deals'} • Closes In:</strong>
                      </div>
                    </div>

                    <div className="live-clock-display">
                      <CountdownTimer endTime={flashDealConfig?.endTime || (Date.now() + 8 * 3600 * 1000)} />
                    </div>

                    <button 
                      className="reset-timer-btn"
                      onClick={() => updateFlashDealConfig({ endTime: Date.now() + (flashDealConfig?.hoursDuration || 8) * 3600 * 1000 })}
                      title="Restart timer with default duration from right now"
                    >
                      <FiClock /> Restart Timer (From Now)
                    </button>
                  </div>

                  <div className="admin-form-grid margin-top-lg">
                    <div>
                      <label>Flash Section Title</label>
                      <input 
                        type="text"
                        value={flashDealConfig?.title || ''}
                        onChange={(e) => updateFlashDealConfig({ title: e.target.value })}
                        placeholder="e.g. Flash Deals"
                      />
                    </div>

                    <div>
                      <label>Subtitle / Urgency Tagline</label>
                      <input 
                        type="text"
                        value={flashDealConfig?.subtitle || ''}
                        onChange={(e) => updateFlashDealConfig({ subtitle: e.target.value })}
                        placeholder="e.g. Limited time lightning offers — hurry!"
                      />
                    </div>

                    <div>
                      <label>Exact Target Expiration Date & Time</label>
                      <input 
                        type="datetime-local"
                        value={toDatetimeLocal(flashDealConfig?.endTime || (Date.now() + 8 * 3600 * 1000))}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            const ms = new Date(val).getTime();
                            if (!isNaN(ms)) {
                              updateFlashDealConfig({ endTime: ms });
                            }
                          }
                        }}
                      />
                    </div>

                    <div>
                      <label>Badge Ribbon Text</label>
                      <input 
                        type="text"
                        value={flashDealConfig?.badgeText || ''}
                        onChange={(e) => updateFlashDealConfig({ badgeText: e.target.value })}
                        placeholder="e.g. FLASH DEAL"
                      />
                    </div>

                    {/* Quick Duration Buttons */}
                    <div className="full-width timer-preset-row">
                      <span className="preset-label">Quick Duration Presets (Set from Current Time):</span>
                      <div className="preset-buttons-wrap">
                        {[
                          { label: '1 Hour Flash', hours: 1 },
                          { label: '4 Hours Lightning', hours: 4 },
                          { label: '8 Hours (Standard)', hours: 8 },
                          { label: '12 Hours (Half Day)', hours: 12 },
                          { label: '24 Hours (Full Day)', hours: 24 },
                          { label: '48 Hours (Weekend Deal)', hours: 48 },
                          { label: '7 Days Mega Sale', hours: 168 }
                        ].map(p => (
                          <button
                            key={p.label}
                            type="button"
                            className="preset-time-chip"
                            onClick={() => updateFlashDealConfig({ 
                              endTime: Date.now() + p.hours * 3600 * 1000, 
                              hoursDuration: p.hours,
                              enabled: true 
                            })}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Flash Deal Featured Products Multi-Picker */}
                  <div className="flash-products-selector-section margin-top-lg">
                    <h4>⚡ Featured Flash Sale Products ({safeProducts.filter(p => (flashDealConfig?.productIds || []).includes(p.id)).length} Selected)</h4>
                    <p>Choose which catalog items appear on the home page Flash Deal shelf with urgency badges:</p>
                    
                    <div className="flash-prods-picker-grid margin-top">
                      {safeProducts.slice(0, 36).map(prod => {
                        const isSelected = (flashDealConfig?.productIds || []).includes(prod.id);
                        return (
                          <div 
                            key={prod.id} 
                            className={`flash-picker-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              const currentIds = flashDealConfig?.productIds || [101, 102, 201, 301];
                              const newIds = isSelected 
                                ? currentIds.filter(id => id !== prod.id)
                                : [...currentIds, prod.id];
                              updateFlashDealConfig({ productIds: newIds });
                            }}
                          >
                            <img src={prod.image || ''} alt={prod.name} className="picker-thumb" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'; }} />
                            <div className="picker-info">
                              <strong>{prod.name}</strong>
                              <span>₹{formatPrice(prod.price)} • {prod.category}</span>
                            </div>
                            <span className={`picker-checkbox ${isSelected ? 'checked' : ''}`}>
                              {isSelected ? '✓' : '+'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Hero Carousel Timers Quick Matrix */}
                <div className="admin-edit-card">
                  <h3>🖼️ Hero Carousel Banner Timers Overview</h3>
                  <p>All active carousel slides and their respective deal countdown timers:</p>

                  <div className="admin-table-wrapper margin-top">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>Slide Headline</th>
                          <th>Timer Status</th>
                          <th>Timer Copy Label</th>
                          <th>Live Countdown Clock</th>
                          <th>Quick Timer Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safeBanners.map((slide, idx) => (
                          <tr key={slide.id}>
                            <td>
                              <strong>Slide #{idx + 1}: {slide.headline || 'Banner'}</strong>
                              <small>{slide.tagline}</small>
                            </td>

                            <td>
                              <button
                                className={`tax-vis-toggle ${slide.hasTimer ? 'on' : 'off'}`}
                                onClick={() => updateHeroBanner(slide.id, { hasTimer: !slide.hasTimer })}
                              >
                                {slide.hasTimer ? <><FiCheck /> Active</> : <><FiX /> Off</>}
                              </button>
                            </td>

                            <td>
                              <input 
                                type="text"
                                className="table-inline-input"
                                value={slide.timerLabel || 'Limited Deal Ends in:'}
                                onChange={(e) => updateHeroBanner(slide.id, { timerLabel: e.target.value })}
                              />
                            </td>

                            <td>
                              {slide.hasTimer ? (
                                <div className="table-clock-badge">
                                  <CountdownTimer endTime={slide.saleTimer || (Date.now() + 24 * 3600 * 1000)} />
                                </div>
                              ) : (
                                <span className="text-muted">Timer Inactive</span>
                              )}
                            </td>

                            <td>
                              <div className="table-action-btns">
                                <button
                                  className="action-icon-btn edit"
                                  onClick={() => updateHeroBanner(slide.id, { saleTimer: Date.now() + 24 * 3600 * 1000, hasTimer: true })}
                                  title="Reset timer to +24 Hours from now"
                                >
                                  <FiClock /> +24h Reset
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 5: HEADER TICKER & STORE INFORMATION
               ======================================================== */}
            {adminTab === 'store-config' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Header Ticker & Storefront Information</h1>
                    <p>Manage the top announcement bar, store contact details, and official social media handles.</p>
                  </div>
                </div>

                {/* 1. Header Ticker */}
                <div className="admin-edit-card margin-bottom">
                  <div className="admin-card-head">
                    <h3><FiBell /> Top Header Announcement Bar</h3>
                    <button
                      className={`tax-vis-toggle ${topTicker?.enabled ? 'on' : 'off'}`}
                      onClick={() => updateTopTicker({ enabled: !topTicker?.enabled })}
                    >
                      {topTicker?.enabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                    </button>
                  </div>
                  <div className="admin-form-grid margin-top">
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
                      <label>Free Shipping Perk Line</label>
                      <input
                        type="text"
                        value={topTicker?.shippingText || ''}
                        onChange={(e) => updateTopTicker({ shippingText: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Store Info */}
                <div className="admin-edit-card">
                  <h3><FiMapPin /> Store Contact Information & Social Channels</h3>
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
                      <label>Instagram Handle URL</label>
                      <input
                        type="text"
                        value={storeInfo?.instagram || ''}
                        onChange={(e) => updateStoreInfo({ instagram: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Twitter / X Handle URL</label>
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
              </div>
            )}

            {/* ========================================================
               TAB 6: DEALS & PROMO POP-UP CAMPAIGN
               ======================================================== */}
            {adminTab === 'promo-popup' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Promotional Deal Pop-Up Campaign</h1>
                    <p>Customize conversion popups, discount promo codes, and preview how visitors see it.</p>
                  </div>
                  <div className="header-action-group">
                    <button className="cta-btn secondary" onClick={() => setIsPromoPopupOpen(true)}>
                      <FiEye /> Test Live Pop-Up Preview
                    </button>
                  </div>
                </div>

                <div className="admin-edit-card">
                  <div className="admin-card-head">
                    <h3><FiGift /> Pop-Up Modal Configuration</h3>
                    <button
                      className={`tax-vis-toggle ${promoPopup?.enabled ? 'on' : 'off'}`}
                      onClick={() => updatePromoPopup({ enabled: !promoPopup?.enabled })}
                    >
                      {promoPopup?.enabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                    </button>
                  </div>

                  <div className="admin-form-grid margin-top">
                    <div className="full-width">
                      <label>Pop-Up Main Title</label>
                      <input
                        type="text"
                        value={promoPopup?.title || ''}
                        onChange={(e) => updatePromoPopup({ title: e.target.value })}
                      />
                    </div>
                    <div className="full-width">
                      <label>Subtitle & Terms</label>
                      <input
                        type="text"
                        value={promoPopup?.sub || ''}
                        onChange={(e) => updatePromoPopup({ sub: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Promo Discount Code</label>
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
                      <label>Featured Image URL</label>
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

            {/* ========================================================
               TAB 7: HOMEPAGE SECTIONS LAYOUT MANAGER
               ======================================================== */}
            {adminTab === 'homepage-sections' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Homepage Layout & Sections Manager</h1>
                    <p>Toggle individual sections on or off live on the home storefront.</p>
                  </div>
                </div>

                <div className="admin-edit-card">
                  <h3>🏗️ Toggle Storefront Sections</h3>
                  <div className="section-toggles-grid margin-top">
                    {Object.keys(homePageConfig?.sections || {}).map((secKey) => {
                      const isActive = homePageConfig.sections[secKey];
                      const secNames = {
                        hero: "Hero Banner Carousel",
                        taxonomy: "Category Icons Bar",
                        recent: "Recently Viewed Carousel",
                        flashDeal: "Flash Deals Banner",
                        tabsShowcase: "Tabbed Showcase Grid",
                        sponsored: "Sponsored Ad Feeds",
                        promoBanner: "Freedom Sale Promo",
                        deals: "Top Recommendations",
                        brandSpotlight: "Official Brands Spotlight",
                        infoCards: "Guarantees & Trust Info",
                        testimonials: "Shopper Reviews",
                        newsletter: "Newsletter Banner",
                        categoryGrid: "Shop by Category Grid",
                        bankOffers: "Bank & Payment Offers Strip",
                        newArrivals: "New Arrivals Spotlight",
                        budgetGrid: "Budget / Price Store Grid",
                        shoppableUGC: "Shop the Look UGC Social Wall",
                        faqAccordion: "Interactive FAQ Accordion",
                        appDownload: "App Download & Loyalty Banner",
                        shoppingQuiz: "AI Shopping Assistant Quiz",
                        priceTiersShowcase: "Price Tiered Showcase Shelf"
                      };
                      return (
                        <div
                          key={secKey}
                          className={`section-toggle-card ${isActive ? 'active' : ''}`}
                          onClick={() => updateHomePageConfig({
                            sections: { [secKey]: !isActive }
                          })}
                        >
                          <span className="sec-toggle-label">{secNames[secKey] || secKey}</span>
                          <span className={`status-indicator-dot ${isActive ? 'active' : ''}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
               TAB 8: CUSTOMER ORDERS & SHIPMENTS PIPELINE
               ======================================================== */}
            {adminTab === 'orders' && (
              <div className="admin-tab-view">
                <div className="admin-view-header">
                  <div>
                    <h1>Customer Orders & Fulfillment ({safeOrders.length})</h1>
                    <p>Track order lifecycle, inspect items, update delivery status, and generate simulated invoices.</p>
                  </div>
                </div>

                {/* Order Filter Pills */}
                <div className="orders-filter-strip">
                  {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      className={`order-filter-pill ${orderStatusFilter === st ? 'active' : ''}`}
                      onClick={() => setOrderStatusFilter(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Orders List Table */}
                <div className="admin-table-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Order ID & Date</th>
                        <th>Customer Name & Phone</th>
                        <th>Items Count</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                        <th>Fulfillment Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="table-empty-cell">
                            No orders found in "{orderStatusFilter}" status.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id}>
                            <td>
                              <strong>#{order.id}</strong>
                              <small>{order.date || 'Today'}</small>
                            </td>

                            <td>
                              <strong>{order.shippingAddress?.name || 'Customer'}</strong>
                              <small>{order.shippingAddress?.city || 'Bengaluru'}, {order.shippingAddress?.phone || '+91'}</small>
                            </td>

                            <td>
                              <span className="items-count-badge">
                                {order.items ? order.items.length : 1} items
                              </span>
                            </td>

                            <td>
                              <strong>₹{formatPrice(order.total)}</strong>
                              <small>{order.paymentMethod || 'UPI'}</small>
                            </td>

                            <td>
                              <span className={`status-badge-chip ${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </td>

                            <td>
                              <div className="order-actions-wrap">
                                <select
                                  className="order-status-dropdown"
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                >
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <button 
                                  className="order-details-btn"
                                  onClick={() => setSelectedOrderDetails(order)}
                                  title="View Full Order Invoice"
                                >
                                  <FiEye /> View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ========================================================
         MODAL 1: ADD NEW PRODUCT MODAL
         ======================================================== */}
      {addProductModal && (
        <div className="admin-modal-backdrop" onClick={() => setAddProductModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2><FiPlus /> Add New Catalog Product</h2>
              <button className="modal-close-btn" onClick={() => setAddProductModal(false)}><FiX /></button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="full-width">
                  <label>Product Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Department Category *</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Brand Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Sony, Apple, Nike"
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                  />
                </div>

                <div>
                  <label>Price (₹) *</label>
                  <input 
                    type="number"
                    placeholder="e.g. 24999"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Original / MRP (₹)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 34999"
                    value={newProd.old}
                    onChange={(e) => setNewProd({ ...newProd, old: e.target.value })}
                  />
                </div>

                <div>
                  <label>Inventory Stock Units</label>
                  <input 
                    type="number"
                    placeholder="25"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                  />
                </div>

                <div>
                  <label>SKU Code</label>
                  <input 
                    type="text"
                    placeholder="e.g. NC-EL-889"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label>Image URL</label>
                  <input 
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label>Detailed Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Enter detailed product highlights, materials, and warranty information..."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="cta-btn secondary" onClick={() => setAddProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="cta-btn primary">
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
         MODAL 2: EDIT PRODUCT DETAILS MODAL
         ======================================================== */}
      {editingProduct && editForm && (
        <div className="admin-modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2><FiEdit3 /> Edit Product: {editingProduct.name}</h2>
              <button className="modal-close-btn" onClick={() => setEditingProduct(null)}><FiX /></button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="full-width">
                  <label>Product Title</label>
                  <input 
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Brand</label>
                  <input 
                    type="text"
                    value={editForm.brand}
                    onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                  />
                </div>

                <div>
                  <label>Price (₹)</label>
                  <input 
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Original / MRP (₹)</label>
                  <input 
                    type="number"
                    value={editForm.old}
                    onChange={(e) => setEditForm({ ...editForm, old: e.target.value })}
                  />
                </div>

                <div>
                  <label>Stock Count</label>
                  <input 
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                  />
                </div>

                <div>
                  <label>Model SKU</label>
                  <input 
                    type="text"
                    value={editForm.sku}
                    onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label>Image URL</label>
                  <input 
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label>Product Description</label>
                  <textarea 
                    rows="3"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="cta-btn secondary" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
                <button type="submit" className="cta-btn primary">
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
         MODAL 3: ORDER DETAILS & INVOICE INSPECTOR
         ======================================================== */}
      {selectedOrderDetails && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedOrderDetails(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h2><FiClipboard /> Order Invoice Details #{selectedOrderDetails.id}</h2>
              <button className="modal-close-btn" onClick={() => setSelectedOrderDetails(null)}><FiX /></button>
            </div>

            <div className="admin-modal-body">
              <div className="order-details-summary-card">
                <div className="order-summary-row">
                  <span>Customer Name:</span>
                  <strong>{selectedOrderDetails.shippingAddress?.name || 'Customer'}</strong>
                </div>
                <div className="order-summary-row">
                  <span>Contact Phone:</span>
                  <strong>{selectedOrderDetails.shippingAddress?.phone || '+91 98765 43210'}</strong>
                </div>
                <div className="order-summary-row">
                  <span>Delivery Address:</span>
                  <span>{selectedOrderDetails.shippingAddress?.street}, {selectedOrderDetails.shippingAddress?.city}, {selectedOrderDetails.shippingAddress?.state} - {selectedOrderDetails.shippingAddress?.pin}</span>
                </div>
                <div className="order-summary-row">
                  <span>Payment Method:</span>
                  <strong>{selectedOrderDetails.paymentMethod || 'UPI / Card'}</strong>
                </div>
                <div className="order-summary-row">
                  <span>Current Status:</span>
                  <span className={`status-badge-chip ${selectedOrderDetails.status.toLowerCase()}`}>
                    {selectedOrderDetails.status}
                  </span>
                </div>
              </div>

              <h4 className="margin-top">Ordered Line Items:</h4>
              <div className="order-items-scroll-list">
                {(selectedOrderDetails.items || []).map((item, idx) => (
                  <div key={idx} className="order-item-detail-row">
                    <span>{item.name} <strong>x{item.qty || 1}</strong></span>
                    <strong>₹{formatPrice((item.price || 0) * (item.qty || 1))}</strong>
                  </div>
                ))}
              </div>

              <div className="order-total-highlight-row">
                <span>Grand Total:</span>
                <strong>₹{formatPrice(selectedOrderDetails.total)}</strong>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="cta-btn primary" onClick={() => setSelectedOrderDetails(null)}>
                Close Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
