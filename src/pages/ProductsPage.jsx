import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FiSliders, FiGrid, FiList, FiX, FiSearch, FiChevronRight 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL query params
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [pricePreset, setPricePreset] = useState('all'); // all, under1000, 1000-3000, above3000
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, rating
  const [viewLayout, setViewLayout] = useState('grid'); // grid, list
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const srch = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (srch !== null) setSearchQuery(srch);
  }, [searchParams]);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).sort();
  }, [products]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPricePreset('all');
    setMinRating(0);
    setSelectedBrands([]);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match = `${p.name} ${p.brand} ${p.category} ${p.description || ''}`.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Price preset
      if (pricePreset === 'under1000' && p.price >= 1000) return false;
      if (pricePreset === '1000-3000' && (p.price < 1000 || p.price > 3000)) return false;
      if (pricePreset === 'above3000' && p.price <= 3000) return false;

      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

      // Stock filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // default featured
    });
  }, [products, selectedCategory, searchQuery, pricePreset, minRating, selectedBrands, inStockOnly, sortBy]);

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
            <p>Showing <strong>{filteredProducts.length}</strong> products</p>
          </div>

          <div className="header-controls">
            {/* View Mode Toggle */}
            <div className="layout-toggle-btns">
              <button 
                className={viewLayout === 'grid' ? 'active' : ''} 
                onClick={() => setViewLayout('grid')}
                title="Grid View"
              >
                <FiGrid />
              </button>
              <button 
                className={viewLayout === 'list' ? 'active' : ''} 
                onClick={() => setViewLayout('list')}
                title="List View"
              >
                <FiList />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button 
              className="mobile-filter-trigger-btn"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <FiSliders /> Filters ({selectedCategory !== 'All' ? 1 : 0})
            </button>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-container">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
            onClick={() => {
              setSelectedCategory(cat);
              setSearchParams(cat === 'All' ? {} : { category: cat });
            }}
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
            <button className="mobile-close-filters" onClick={() => setFilterDrawerOpen(false)}>
              <FiX />
            </button>
          </div>

          {(selectedCategory !== 'All' || searchQuery || pricePreset !== 'all' || selectedBrands.length > 0 || minRating > 0) && (
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
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    onChange={() => {
                      setSelectedCategory(cat);
                      setSearchParams(cat === 'All' ? {} : { category: cat });
                    }}
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
                  onChange={() => setPricePreset('all')}
                />
                <span>All Prices</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === 'under1000'}
                  onChange={() => setPricePreset('under1000')}
                />
                <span>Under ₹1,000</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === '1000-3000'}
                  onChange={() => setPricePreset('1000-3000')}
                />
                <span>₹1,000 - ₹3,000</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="price-radio"
                  checked={pricePreset === 'above3000'}
                  onChange={() => setPricePreset('above3000')}
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
                  onChange={() => setMinRating(0)}
                />
                <span>All Ratings</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="rating-radio"
                  checked={minRating === 4}
                  onChange={() => setMinRating(4)}
                />
                <span>4★ & Above</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="rating-radio"
                  checked={minRating === 4.5}
                  onChange={() => setMinRating(4.5)}
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
            <div className={viewLayout === 'list' ? 'products-list-layout' : 'products-grid-layout'}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
