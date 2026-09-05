/**
 * NexCart Search & Sanitization Engine
 * Handles multi-attribute tokenized fuzzy matching, synonym mapping, and XSS sanitization.
 */

// Common e-commerce synonym and abbreviation dictionary
const SYNONYMS = {
  '5g': ['5g', 'smartphone', 'mobile', 'cellular'],
  'anc': ['anc', 'noise cancellation', 'noise-canceling', 'cancelling', 'headphones', 'earbuds'],
  'tws': ['tws', 'true wireless', 'earbuds', 'wireless earphones'],
  'denim': ['denim', 'jeans', 'jacket', 'cotton', 'apparel'],
  'jacket': ['jacket', 'outerwear', 'coat', 'hoodie', 'bomber'],
  'oled': ['oled', 'amoled', 'display', 'screen', 'tv', 'monitor'],
  'rgb': ['rgb', 'backlit', 'gaming', 'mechanical'],
  'whey': ['whey', 'protein', 'isolate', 'supplement', 'fitness'],
  'plant': ['plant', 'garden', 'succulent', 'indoor', 'pot', 'flora'],
  'watch': ['watch', 'smartwatch', 'wearable', 'fitness band', 'tracker']
};

/**
 * Sanitize search inputs against XSS and injection attacks.
 */
export function sanitizeSearchInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>'"`;(){}[\]\\]/g, '') // Strip script injection chars
    .trim()
    .slice(0, 100); // Limit query length to prevent ReDoS
}

/**
 * Multi-attribute tokenized search with relevance scoring and category tagging.
 */
export function searchCatalogProducts(products = [], query = '') {
  const sanitized = sanitizeSearchInput(query);
  if (!sanitized) return [];

  const rawTokens = sanitized.toLowerCase().split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return [];

  // Expand tokens with synonyms
  const tokenGroups = rawTokens.map(token => {
    const syns = SYNONYMS[token] || [];
    return [token, ...syns];
  });

  const scoredResults = [];

  for (const product of products) {
    if (!product) continue;

    const name = (product.name || '').toLowerCase();
    const brand = (product.brand || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    const sku = (product.sku || '').toLowerCase();
    const searchableText = `${name} ${brand} ${category} ${description} ${sku}`;

    let score = 0;
    let matchedAllGroups = true;

    for (const group of tokenGroups) {
      let groupMatched = false;

      for (const term of group) {
        if (name.includes(term)) {
          score += 10;
          groupMatched = true;
          // Exact start of name bonus
          if (name.startsWith(term)) score += 5;
        } else if (brand.includes(term)) {
          score += 8;
          groupMatched = true;
        } else if (category.includes(term)) {
          score += 6;
          groupMatched = true;
        } else if (description.includes(term)) {
          score += 3;
          groupMatched = true;
        }
      }

      if (!groupMatched) {
        matchedAllGroups = false;
        break;
      }
    }

    if (matchedAllGroups) {
      // Bonus for exact full phrase match
      if (searchableText.includes(sanitized.toLowerCase())) {
        score += 15;
      }

      scoredResults.push({
        ...product,
        searchScore: score,
        matchedCategoryTag: product.category || 'General'
      });
    }
  }

  // Sort by highest relevance score
  return scoredResults.sort((a, b) => b.searchScore - a.searchScore);
}
