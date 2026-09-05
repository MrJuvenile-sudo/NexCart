import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FiSliders, FiGrid, FiList, FiX, FiSearch, FiChevronRight 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { sanitizeSearchInput, searchCatalogProducts } from '../utils/searchEngine';

const PAGE_SIZE = 24;

export default function ProductsPage() {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 1. Fully URL-Driven Filter State (Atomically Linkable & Bookmarkable)
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const pricePreset = searchParams.get('price') || 'all'; // all, under1000, 1000-3000, above3000
  const minRating = Number(searchParams.get('rating')) || 0;
  const selectedBrands = useMemo(() => {
    const brandsParam = searchParams.get('brands');
    return brandsParam ? brandsParam.split(',').filter(Boolean) : [];
  }, [searchParams]);
  const inStockOnly = searchParams.get('inStock') === 'true';
  const sortBy = searchParams.get('sort') || 'featured'; // featured, price-low, price-high, rating
  const viewLayout = searchParams.get('layout') || 'grid';

  // Helper to update search params atomically
  const updateFilterParam = useCallback((updates) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === undefined || val === '' || val === 'all' || val === 'All' || val === 0 || (Array.isArray(val) && val.length === 0)) {
          next.delete(key);
        } else if (Array.isArray(val)) {
          next.set(key, val.join(','));
        } else {
          next.set(key, String(val));
        }
      });
      return next;
    });
    setVisibleCount(PAGE_SIZE);
  }, [setSearchParams]);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const safeProds = Array.isArray(products) ? products : [];
    return Array.from(new Set(safeProds.map(p => p.brand).filter(Boolean))).sort();
  }, [products]);

  const handleCategorySelect = (cat) => {
    updateFilterParam({ category: cat });
  };

  const handleBrandToggle = (brand) => {
    const nextBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    updateFilterParam({ brands: nextBrands });
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setVisibleCount(PAGE_SIZE);
  };

  // 2. Atomic Filter & Tokenized Search Pipeline
  const filteredProducts = useMemo(() => {
    let pool = Array.isArray(products) ? products : [];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      const catLower = selectedCategory.toLowerCase();
      pool = pool.filter(p => (p.category || '').toLowerCase().includes(catLower));
    }

    // Tokenized fuzzy multi-attribute search
    if (searchQuery.trim()) {
      pool = searchCatalogProducts(pool, searchQuery);
    }

    // Secondary filters
    return pool.filter(p => {
      // Price preset
      if (pricePreset === 'under1000' && p.price >= 1000) return false;
      if (pricePreset === '1000-3000' && (p.price < 1000 || p.price > 3000)) return false;
      if (pricePreset === 'above3000' && p.price <= 3000) return false;

      // Rating filter
      if (minRating > 0 && (p.rating || 0) < minRating) return false;

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

      // Stock filter
      if (inStockOnly && (p.stock || 0) <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (a.searchScore && b.searchScore) ? (b.searchScore - a.searchScore) : (a.id - b.id);
    });
  }, [products, selectedCategory, searchQuery, pricePreset, minRating, selectedBrands, inStockOnly, sortBy]);

  // Virtualized progressive slice to maintain 60fps rendering
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredProducts.length));
  };

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || pricePreset !== 'all' || minRating > 0 || selectedBrands.length > 0 || inStockOnly;

  return (
    <div className="catalog-page-container">
      {/* Breadcrumb & Heading */}
      <div className="catalog-header-bar">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> <FiChevronRight /> <span>Shop Catalogue</span>
        </div>
        <div className="heading-row">
          <div>
            <h1>Explore Catalogue</h1>
            <p>Showing <strong>{filteredProducts.length}</strong> verified products</p>
          </div>

          <div className="header-controls">
            {/* View Mode Toggle */}
            <div className="layout-toggle-btns">
              <button 
                className={viewLayout === 'grid' ? 'active' : ''} 
                onClick={() => updateFilterParam({ layout: 'grid' })}
                title="Grid View"
                aria-label="Grid View"
              >
                <FiGrid />
              </button>
              <button 
                className={viewLayout === 'list' ? 'active' : ''} 
                onClick={() => updateFilterParam({ layout: 'list' })}
                title="List View"
                aria-label="List View"
              >
                <FiList />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button 
              className="mobile-filter-trigger-btn"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <FiSliders /> Filters {hasActiveFilters ? '(Active)' : ''}
            </button>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-container">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => updateFilterParam({ sort: e.target.value })}
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-pills-bar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="catalog-body-layout">
        {/* Filter Sidebar */}
        <aside className={`catalog-filters-sidebar ${filterDrawerOpen ? 'drawer-open' : ''}`}>
          <div className="sidebar-header">
            <h3><FiSliders /> Filters</h3>
            <button className="mobile-close-filters" onClick={() => setFilterDrawerOpen(false)} aria-label="Close filters">
              <FiX />
            </button>
          </div>

          {hasActiveFilters && (
            <button className="clear-all-filters-btn" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          )}

          {/* Search inside sidebar */}
          <div className="filter-group">
            <label className="filter-label">Search Query</label>
            <div className="sidebar-search-input">
              <FiSearch />
              <input 
                type="text" 
                placeholder="Search items, 5G, ANC, Nike..." 
                value={searchQuery}
                onChange={(e) => updateFilterParam({ search: sanitizeSearchInput(e.target.value) })}
              />
            </div>
          </div>

          {/* Categories Radio Filter */}
          <div className="filter-group">
            <label className="filter-label">Categories</label>
            <div className="filter-options-list">
              {CATEGORIES.map(cat => (
                <label key={cat} className="radio-option">
                  <input 
                    type="radio" 
                    name="cat-radio"
                    checked={selectedCategory === cat}
                    onChange={() => handleCategorySelect(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <hr />

          {/* Price Range Presets */}
          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="filter-options-list">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === 'all'}
                  onChange={() => updateFilterParam({ price: 'all' })}
                />
                <span>All Prices</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === 'under1000'}
                  onChange={() => updateFilterParam({ price: 'under1000' })}
                />
                <span>Under ₹1,000</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === '1000-3000'}
                  onChange={() => updateFilterParam({ price: '1000-3000' })}
                />
                <span>₹1,000 - ₹3,000</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === 'above3000'}
                  onChange={() => updateFilterParam({ price: 'above3000' })}
                />
                <span>Above ₹3,000</span>
              </label>
            </div>
          </div>

          <hr />

          {/* Minimum Rating */}
          <div className="filter-group">
            <label className="filter-label">Customer Rating</label>
            <div className="filter-options-list">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="rating-radio"
                  checked={minRating === 0}
                  onChange={() => updateFilterParam({ rating: 0 })}
                />
                <span>All Ratings</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="rating-radio"
                  checked={minRating === 4}
                  onChange={() => updateFilterParam({ rating: 4 })}
                />
                <span>4★ & Above</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="rating-radio"
                  checked={minRating === 4.5}
                  onChange={() => updateFilterParam({ rating: 4.5 })}
                />
                <span>4.5★ & Above</span>
              </label>
            </div>
          </div>

          <hr />

          {/* Brands Filter */}
          <div className="filter-group">
            <label className="filter-label">Brands</label>
            <div className="filter-options-list scrollable">
              {allBrands.map(brand => (
                <label key={brand} className="checkbox-option">
                  <input 
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="catalog-products-content">
          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <div className="icon-wrapper"><FiSearch /></div>
              <h2>No matching products found</h2>
              <p>Try adjusting your search criteria or resetting filters.</p>
              <button className="cta-btn primary" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewLayout === 'list' ? 'products-list-layout' : 'products-grid-layout'}>
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {hasMore && (
                <div className="load-more-container" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
                  <button 
                    className="cta-btn secondary"
                    onClick={handleLoadMore}
                    style={{ minWidth: '200px', minHeight: '44px', fontWeight: '700' }}
                  >
                    Load More Products ({paginatedProducts.length} of {filteredProducts.length})
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
