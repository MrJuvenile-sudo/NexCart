import { sanitizeSearchInput, searchCatalogProducts } from './utils/searchEngine';

describe('Search & Sanitization Engine', () => {
  test('sanitizes XSS characters from search query', () => {
    const malicious = '<script>alert("hack")</script>';
    const sanitized = sanitizeSearchInput(malicious);
    expect(sanitized).toBe('scriptalerthack/script');
    expect(sanitized).not.toContain('<');
    expect(sanitized).not.toContain('>');
    expect(sanitized).not.toContain('"');
  });

  test('matches multi-attribute query "5G Mobiles"', () => {
    const mockProducts = [
      { id: 1, name: 'Samsung Galaxy S25 Ultra 5G', category: 'Mobiles', brand: 'Samsung' },
      { id: 2, name: 'Cotton Crew Neck T-Shirt', category: 'Fashion', brand: 'Zara' }
    ];
    const results = searchCatalogProducts(mockProducts, '5G Mobiles');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
    expect(results[0].matchedCategoryTag).toBe('Mobiles');
  });

  test('matches abbreviation "ANC" for noise cancelling headphones', () => {
    const mockProducts = [
      { id: 1, name: 'Sony Noise Canceling Headphones', category: 'Electronics', description: 'Industry leading noise cancellation' },
      { id: 2, name: 'Ceramic Coffee Mug', category: 'Home', description: 'Handcrafted mug' }
    ];
    const results = searchCatalogProducts(mockProducts, 'ANC');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });
});
