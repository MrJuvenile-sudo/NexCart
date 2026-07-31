import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function TaxonomyBar() {
  const { taxonomies, selectedCategory, setSelectedCategory } = useCart();
  const navigate = useNavigate();

  const safeTaxonomies = Array.isArray(taxonomies) ? taxonomies : [];
  const visibleTaxonomies = safeTaxonomies.filter(t => t && t.visible);

  const handleSelect = (cat) => {
    if (!cat) return;
    setSelectedCategory(cat.name);
    if (cat.name === 'For You') {
      navigate('/');
    } else {
      navigate(`/products?category=${encodeURIComponent(cat.name)}`);
    }
  };

  return (
    <nav className="taxonomy-bar" aria-label="Category taxonomy">
      <div className="taxonomy-container">
        {visibleTaxonomies.map((cat) => {
          if (!cat) return null;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.id || cat.name}
              className={`taxonomy-pill ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(cat)}
            >
              <span className="tax-icon">{cat.icon || '🏷️'}</span>
              <span className="tax-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
