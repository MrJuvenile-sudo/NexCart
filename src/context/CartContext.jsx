import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_CATALOG, SAMPLE_ORDERS, PROMO_CODES } from '../data/mockData';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const DEFAULT_TAXONOMIES = [
  { id: 'all', name: 'For You', icon: '🔥', visible: true },
  { id: 'fashion', name: 'Fashion', icon: '👕', visible: true },
  { id: 'mobiles', name: 'Mobiles', icon: '📱', visible: true },
  { id: 'electronics', name: 'Electronics', icon: '🎧', visible: true },
  { id: 'smartwatches', name: 'Smart Watches', icon: '⌚', visible: true },
  { id: 'gaming', name: 'Gaming & Esports', icon: '🎮', visible: true },
  { id: 'beauty', name: 'Beauty', icon: '✨', visible: true },
  { id: 'home', name: 'Home', icon: '🏡', visible: true },
  { id: 'plants', name: 'Plants & Garden', icon: '🌿', visible: true },
  { id: 'appliances', name: 'Appliances', icon: '⚡', visible: true },
  { id: 'toys', name: 'Toys & Baby', icon: '🧸', visible: true },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', visible: true },
  { id: 'health', name: 'Food & Health', icon: '🥗', visible: true },
  { id: 'books', name: 'Books & Stationery', icon: '📚', visible: true },
  { id: 'luxury', name: 'Luxury & Jewellery', icon: '💎', visible: true },
  { id: 'auto', name: 'Auto Accessories', icon: '🚗', visible: true },
];

const DEFAULT_HERO_BANNERS = [
  {
    id: 1,
    tagline: 'FREEDOM SALE • STARTS 8TH AUG',
    headline: 'Big Savings on<br/><i>Mobiles & Tech.</i>',
    sub: 'Up to 70% OFF on Top Smartphones, Headphones, Laptops & Smartwatches.',
    cta: 'Explore Early Access',
    ctaLink: '/products',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=80',
    accent: '#FFE500',
    saleTimer: Date.now() + 24 * 60 * 60 * 1000,
    visible: true,
  },
  {
    id: 2,
    tagline: 'FASHION BLOCKBUSTER DEALS',
    headline: 'Trendsetting Style<br/><i>Min. 50% OFF.</i>',
    sub: 'Sneakers, Jackets, Eyewear & Accessories from Top Global Brands.',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
    accent: '#E11D48',
    visible: true,
  },
  {
    id: 3,
    tagline: 'HOME & APPLIANCES FESTIVAL',
    headline: 'Upgrade Your Space.<br/><i>Smart Living.</i>',
    sub: 'Air Purifiers, Kitchen Sets, Ambient Lighting & Ergonomic Furniture.',
    cta: 'Shop Home',
    ctaLink: '/products?category=Home%20%26%20Living',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80',
    accent: '#D4AF37',
    visible: true,
  },
];

const DEFAULT_TOP_TICKER = {
  enabled: true,
  text: '⚡ FREEDOM SALE LIVE: Up to 70% OFF across Mobiles, Electronics & Fashion',
  codeText: 'Use Coupon WELCOME20 for Extra 20% OFF',
  shippingText: 'Express 24-hr Free Shipping on orders over ₹999'
};

const DEFAULT_PROMO_POPUP = {
  enabled: true,
  title: '🎉 Freedom Sale Exclusive Offer!',
  sub: 'Unlock an instant 25% discount on your entire order today.',
  code: 'FREEDOM25',
  discount: '25% OFF',
  image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'
};

const DEFAULT_STORE_INFO = {
  address: '42 Tech Hub Avenue, 5th Floor, Bengaluru, Karnataka 560001',
  email: 'support@nexcart.dev',
  phone: '+91 (800) 420-NEX',
  instagram: 'https://instagram.com/nexcart',
  twitter: 'https://twitter.com/nexcart',
  facebook: 'https://facebook.com/nexcart',
  youtube: 'https://youtube.com/nexcart'
};

const DEFAULT_HOMEPAGE_CONFIG = {
  sections: {
    hero: true,
    taxonomy: true,
    recent: true,
    flashDeal: true,
    tabsShowcase: true,
    sponsored: true,
    promoBanner: true,
    deals: true,
    brandSpotlight: true,
    infoCards: true,
    testimonials: true,
    newsletter: true,
    categoryGrid: true,
    bankOffers: true,
    newArrivals: true,
    budgetGrid: true,
    shoppableUGC: true,
    faqAccordion: true,
    appDownload: true,
    shoppingQuiz: true,
    priceTiersShowcase: true,
  },
  tabsShowcase: {
    title: "Curated Collection Guides",
    subtitle: "OUR TOP CHOICES",
    tabs: [
      { id: "tab1", name: "Featured Tech", category: "Electronics" },
      { id: "tab2", name: "Daily Fashion", category: "Fashion" },
      { id: "tab3", name: "Smart Living", category: "Home" },
      { id: "tab4", name: "Premium Wearables", category: "Wearables" }
    ]
  },
  brandSpotlight: {
    title: "Official Brand Partners",
    subtitle: "HANDPICKED BY NEXCART",
    brands: [
      { id: 1, name: "NexAudio", logo: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80", desc: "Acoustic craftsmanship." },
      { id: 2, name: "Pulse", logo: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=200&q=80", desc: "Next-gen activity wearables." },
      { id: 3, name: "Aura", logo: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80", desc: "Thoughtful ambient fixtures." },
      { id: 4, name: "CloudStep", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80", desc: "Soles built for the journey." }
    ]
  },
  infoCards: {
    title: "Guaranteed Shopping Comfort",
    subtitle: "THE NEXCART PROMISE",
    cards: [
      { id: 1, icon: "📦", title: "Free Neutral Delivery", desc: "Carbon-offset shipping on all orders over ₹999." },
      { id: 2, icon: "🛡️", title: "100% Brand Warranty", desc: "Direct coverage with no reseller or merchant middle-man." },
      { id: 3, icon: "💬", title: "Dedicated Support 24/7", desc: "Live chat with customer service experts whenever you need." }
    ]
  },
  newsletter: {
    title: "Sign up for NexCart Highlights",
    subtitle: "Subscribe for curated collection alerts, premium releases and exclusive offers.",
    placeholder: "Enter email for 15% discount code",
    buttonText: "Subscribe"
  },
  categoryGrid: {
    title: "Shop by Category",
    subtitle: "EXPLORE THE SELECTION",
    categories: [
      { id: "cat-mobiles", name: "Mobiles", promo: "Starting ₹7,999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80", link: "/products?category=Mobiles" },
      { id: "cat-fashion", name: "Fashion", promo: "Min. 50% Off", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80", link: "/products?category=Fashion" },
      { id: "cat-appliances", name: "Appliances", promo: "Up to 40% Off", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80", link: "/products?category=Appliances" },
      { id: "cat-beauty", name: "Beauty", promo: "Starting ₹199", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80", link: "/products?category=Beauty" }
    ]
  },
  bankOffers: {
    offers: [
      { id: "bank-1", title: "💳 SBI Credit Cards", desc: "10% Instant Discount on SBI Credit Cards. Min. order ₹5,000.", code: "SBI10" },
      { id: "bank-2", title: "🛡️ ICICI Card EMI", desc: "Up to 9 Months No-Cost EMI available on ICICI Credit Cards.", code: "ICICIEMI" },
      { id: "bank-3", title: "📱 UPI Cashbacks", desc: "Get flat ₹100 assured cashback using Paytm or PhonePe UPI.", code: "UPIDEAL" }
    ]
  },
  newArrivalsSpotlight: {
    title: "Fresh Drops Spotlight",
    subtitle: "JUST LAUNCHED & SEASONAL RELEASES",
    limit: 4
  },
  budgetGrid: {
    title: "Shop Within Your Budget",
    subtitle: "GREAT FINDS, GREAT PRICING",
    ranges: [
      { id: "range-1", name: "Under ₹499", maxPrice: 499, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=200&q=80", link: "/products?maxPrice=499" },
      { id: "range-2", name: "Under ₹999", maxPrice: 999, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80", link: "/products?maxPrice=999" },
      { id: "range-3", name: "Under ₹1,999", maxPrice: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80", link: "/products?maxPrice=1999" }
    ]
  },
  shoppableUGC: {
    title: "Shop the Look",
    subtitle: "REAL CUSTOMERS, REAL STYLE",
    posts: [
      { id: "ugc-1", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80", handle: "@style_by_riya", productId: 4, tooltip: "CloudStep Sneakers • Shop Now" },
      { id: "ugc-2", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80", handle: "@tech_guru", productId: 1, tooltip: "NovaTune Headphones • Shop Now" },
      { id: "ugc-3", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80", handle: "@nest_decor", productId: 3, tooltip: "Aura Glow Table Lamp • Shop Now" }
    ]
  },
  faqAccordion: {
    title: "Frequently Asked Questions",
    subtitle: "GOT QUESTIONS? WE HAVE ANSWERS",
    faqs: [
      { id: "faq-1", question: "How long does delivery take?", answer: "Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days depending on location." },
      { id: "faq-2", question: "Can I pay Cash on Delivery?", answer: "Yes! Cash on Delivery is available on all pin codes across India for orders below ₹10,000." },
      { id: "faq-3", question: "How do I claim product warranty?", answer: "All NexCart purchases come with an official brand warranty. You can register your product SKU on the brand website or contact our support team." },
      { id: "faq-4", question: "What is the return policy?", answer: "We offer 14-day hassle-free returns. Simply request a return from the 'My Account' panel to schedule a free doorstep pickup." }
    ]
  },
  appDownload: {
    title: "Shop On The Go",
    subtitle: "Download the NexCart Mobile App and get ₹100 welcome credit.",
    couponCode: "APPWELCOME",
    qrImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=200&q=80"
  },
  shoppingQuiz: {
    title: "AI Gift Finder & Style Assistant",
    subtitle: "FIND YOUR NEXT CONSIDERED PURCHASE IN SECONDS",
    introTitle: "Unsure what fits your mood?",
    introDesc: "Our automated virtual stylist analyses your interests, needs, and budget to find matching boutique items from the NexCart catalog.",
    startBtnText: "Start AI Stylist Quiz",
    questions: [
      {
        id: "q-recipient",
        text: "Who is the recipient of this gift?",
        options: ["Myself", "A Friend / Colleague", "A Partner / Spouse", "Family Member"]
      },
      {
        id: "q-interest",
        text: "What is their primary style or category interest?",
        options: [
          { text: "Electronics & Audio Tech", category: "Electronics" },
          { text: "Contemporary Apparel & Shoes", category: "Fashion" },
          { text: "Smart Home, Lighting & Decor", category: "Home" },
          { text: "Health, Fitness & Smart Wearables", category: "Wearables" }
        ]
      },
      {
        id: "q-budget",
        text: "Select your maximum budget limits",
        options: [
          { text: "Under ₹1,500", maxPrice: 1500 },
          { text: "Under ₹3,000", maxPrice: 3000 },
          { text: "No Limit / Premium Selection", maxPrice: 99999 }
        ]
      }
    ]
  },
  priceTiersShowcase: {
    title: "Browse Products by Price Segment",
    subtitle: "EXPAND OR CONTRACT TO MEET YOUR FINANCES",
    tier1: { label: "Affordable Essentials (Under ₹1,000)", maxPrice: 1000 },
    tier2: { label: "Mid-Range Comforts (₹1,000 - ₹3,000)", minPrice: 1000, maxPrice: 3000 },
    tier3: { label: "Premium Luxuries (Above ₹3,000)", minPrice: 3000 }
  }
};

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('nexcart_products');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_CATALOG.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_CATALOG;
  });

  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('nexcart_cart');
    return local ? JSON.parse(local) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('nexcart_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [recentItems, setRecentItems] = useState(() => {
    const local = localStorage.getItem('nexcart_recent');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('nexcart_orders');
    return local ? JSON.parse(local) : SAMPLE_ORDERS;
  });

  const [taxonomies, setTaxonomies] = useState(() => {
    const local = localStorage.getItem('nexcart_taxonomies');
    if (!local) return DEFAULT_TAXONOMIES;
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) {
        const existingIds = new Set(parsed.map(t => t.id));
        const merged = [...parsed];
        DEFAULT_TAXONOMIES.forEach(dt => {
          if (!existingIds.has(dt.id)) {
            merged.push(dt);
          }
        });
        return merged;
      }
      return DEFAULT_TAXONOMIES;
    } catch {
      return DEFAULT_TAXONOMIES;
    }
  });

  const [heroBanners, setHeroBanners] = useState(() => {
    const local = localStorage.getItem('nexcart_herobanners');
    return local ? JSON.parse(local) : DEFAULT_HERO_BANNERS;
  });

  const [topTicker, setTopTicker] = useState(() => {
    const local = localStorage.getItem('nexcart_topticker');
    return local ? JSON.parse(local) : DEFAULT_TOP_TICKER;
  });

  const [promoPopup, setPromoPopup] = useState(() => {
    const local = localStorage.getItem('nexcart_promopopup');
    return local ? JSON.parse(local) : DEFAULT_PROMO_POPUP;
  });

  const [storeInfo, setStoreInfo] = useState(() => {
    const local = localStorage.getItem('nexcart_storeinfo');
    return local ? JSON.parse(local) : DEFAULT_STORE_INFO;
  });

  const [sponsoredIds, setSponsoredIds] = useState(() => {
    const local = localStorage.getItem('nexcart_sponsored_ids');
    return local ? JSON.parse(local) : [1, 4, 13];
  });

  const [selectedCategory, setSelectedCategory] = useState('For You');

  const [homePageConfig, setHomePageConfig] = useState(() => {
    const local = localStorage.getItem('nexcart_homepage_config');
    return local ? JSON.parse(local) : DEFAULT_HOMEPAGE_CONFIG;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPromoPopupOpen, setIsPromoPopupOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(null);

  useEffect(() => {
    localStorage.setItem('nexcart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexcart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nexcart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nexcart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexcart_taxonomies', JSON.stringify(taxonomies));
  }, [taxonomies]);

  useEffect(() => {
    localStorage.setItem('nexcart_herobanners', JSON.stringify(heroBanners));
  }, [heroBanners]);

  useEffect(() => {
    localStorage.setItem('nexcart_topticker', JSON.stringify(topTicker));
  }, [topTicker]);

  useEffect(() => {
    localStorage.setItem('nexcart_promopopup', JSON.stringify(promoPopup));
  }, [promoPopup]);

  useEffect(() => {
    localStorage.setItem('nexcart_storeinfo', JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem('nexcart_sponsored_ids', JSON.stringify(sponsoredIds));
  }, [sponsoredIds]);

  useEffect(() => {
    localStorage.setItem('nexcart_homepage_config', JSON.stringify(homePageConfig));
  }, [homePageConfig]);

  const addToCart = (product, qty = 1) => {
    if (!product) return false;

    if (!user) {
      setPendingAddToCart({ product, qty });
      setIsAuthModalOpen(true);
      showToast('Please sign in to add items to your cart.', 'warning');
      return false;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });

    addRecentItem(product);
    showToast(`Added "${product.name}" to shopping bag!`, 'success');
    return true;
  };

  const triggerAuthModalForProduct = (product, qty = 1) => {
    setPendingAddToCart({ product, qty });
    setIsAuthModalOpen(true);
  };

  const addPendingProductAfterLogin = (pendingUser) => {
    if (pendingAddToCart && pendingAddToCart.product) {
      const { product, qty } = pendingAddToCart;
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id ? { ...item, qty: item.qty + (qty || 1) } : item
          );
        }
        return [...prev, { ...product, qty: qty || 1 }];
      });
      addRecentItem(product);
      showToast(`Added "${product.name}" to shopping bag!`, 'success');
      setPendingAddToCart(null);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`Saved "${product.name}" to wishlist!`, 'success');
      return [...prev, product];
    });
  };

  const moveAllWishlistToBag = () => {
    wishlist.forEach(prod => addToCart(prod, 1));
    showToast(`Moved ${wishlist.length} saved items to your shopping bag!`, 'success');
  };

  const addRecentItem = (product) => {
    setRecentItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const applyCoupon = (code) => {
    const codeUpper = code.trim().toUpperCase();
    const found = PROMO_CODES[codeUpper];
    if (found) {
      setAppliedCoupon({ code: codeUpper, ...found });
      showToast(`Coupon "${codeUpper}" applied successfully!`, 'success');
      return true;
    }
    showToast('Invalid promo code. Try WELCOME20 or FREEDOM25.', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === 'fixed') {
      return Math.min(subtotal, appliedCoupon.value);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    if (subtotal >= 999 || appliedCoupon?.freeShipping) return 0;
    return 99;
  }, [subtotal, cart, appliedCoupon]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const addProduct = (newProd) => {
    const created = {
      id: Date.now(),
      rating: 4.5,
      reviews: 1,
      stock: Number(newProd.stock) || 15,
      price: Number(newProd.price),
      old: newProd.old ? Number(newProd.old) : null,
      ...newProd
    };
    setProducts(prev => [created, ...prev]);
    showToast(`Created "${created.name}" in catalogue!`, 'success');
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalogue', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status updated to "${newStatus}"`, 'success');
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      total: totalAmount,
      subtotal,
      discountAmount,
      shippingCost,
      status: 'Confirmed',
      trackingStep: 1,
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateTaxonomy = (id, updates) => {
    setTaxonomies(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    showToast('Taxonomy updated live!', 'success');
  };

  const updateHeroBanner = (id, updates) => {
    setHeroBanners(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    showToast('Hero banner updated live!', 'success');
  };

  const updateTopTicker = (updates) => {
    setTopTicker(prev => ({ ...prev, ...updates }));
    showToast('Header ticker updated live!', 'success');
  };

  const updatePromoPopup = (updates) => {
    setPromoPopup(prev => ({ ...prev, ...updates }));
    showToast('Sale pop-up updated live!', 'success');
  };

  const updateStoreInfo = (updates) => {
    setStoreInfo(prev => ({ ...prev, ...updates }));
    showToast('Store information & social links updated live!', 'success');
  };

  const toggleSponsored = (id) => {
    setSponsoredIds(prev => {
      if (prev.includes(id)) {
        showToast('Removed from sponsored feeds', 'info');
        return prev.filter(i => i !== id);
      }
      showToast('Added to sponsored feeds!', 'success');
      return [...prev, id];
    });
  };

  const updateHomePageConfig = (updates) => {
    setHomePageConfig(prev => {
      const newConfig = { ...prev };
      if (updates.sections) {
        newConfig.sections = { ...prev.sections, ...updates.sections };
      }
      if (updates.tabsShowcase) {
        newConfig.tabsShowcase = { ...prev.tabsShowcase, ...updates.tabsShowcase };
        if (updates.tabsShowcase.tabs) {
          newConfig.tabsShowcase.tabs = updates.tabsShowcase.tabs;
        }
      }
      if (updates.brandSpotlight) {
        newConfig.brandSpotlight = { ...prev.brandSpotlight, ...updates.brandSpotlight };
        if (updates.brandSpotlight.brands) {
          newConfig.brandSpotlight.brands = updates.brandSpotlight.brands;
        }
      }
      if (updates.infoCards) {
        newConfig.infoCards = { ...prev.infoCards, ...updates.infoCards };
        if (updates.infoCards.cards) {
          newConfig.infoCards.cards = updates.infoCards.cards;
        }
      }
      if (updates.newsletter) {
        newConfig.newsletter = { ...prev.newsletter, ...updates.newsletter };
      }
      if (updates.categoryGrid) {
        newConfig.categoryGrid = { ...prev.categoryGrid, ...updates.categoryGrid };
        if (updates.categoryGrid.categories) {
          newConfig.categoryGrid.categories = updates.categoryGrid.categories;
        }
      }
      if (updates.bankOffers) {
        newConfig.bankOffers = { ...prev.bankOffers, ...updates.bankOffers };
        if (updates.bankOffers.offers) {
          newConfig.bankOffers.offers = updates.bankOffers.offers;
        }
      }
      if (updates.newArrivalsSpotlight) {
        newConfig.newArrivalsSpotlight = { ...prev.newArrivalsSpotlight, ...updates.newArrivalsSpotlight };
      }
      if (updates.budgetGrid) {
        newConfig.budgetGrid = { ...prev.budgetGrid, ...updates.budgetGrid };
        if (updates.budgetGrid.ranges) {
          newConfig.budgetGrid.ranges = updates.budgetGrid.ranges;
        }
      }
      if (updates.shoppableUGC) {
        newConfig.shoppableUGC = { ...prev.shoppableUGC, ...updates.shoppableUGC };
        if (updates.shoppableUGC.posts) {
          newConfig.shoppableUGC.posts = updates.shoppableUGC.posts;
        }
      }
      if (updates.faqAccordion) {
        newConfig.faqAccordion = { ...prev.faqAccordion, ...updates.faqAccordion };
        if (updates.faqAccordion.faqs) {
          newConfig.faqAccordion.faqs = updates.faqAccordion.faqs;
        }
      }
      if (updates.appDownload) {
        newConfig.appDownload = { ...prev.appDownload, ...updates.appDownload };
      }
      if (updates.shoppingQuiz) {
        newConfig.shoppingQuiz = { ...prev.shoppingQuiz, ...updates.shoppingQuiz };
        if (updates.shoppingQuiz.questions) {
          newConfig.shoppingQuiz.questions = updates.shoppingQuiz.questions;
        }
      }
      if (updates.priceTiersShowcase) {
        newConfig.priceTiersShowcase = { ...prev.priceTiersShowcase, ...updates.priceTiersShowcase };
        if (updates.priceTiersShowcase.tier1) {
          newConfig.priceTiersShowcase.tier1 = { ...prev.priceTiersShowcase.tier1, ...updates.priceTiersShowcase.tier1 };
        }
        if (updates.priceTiersShowcase.tier2) {
          newConfig.priceTiersShowcase.tier2 = { ...prev.priceTiersShowcase.tier2, ...updates.priceTiersShowcase.tier2 };
        }
        if (updates.priceTiersShowcase.tier3) {
          newConfig.priceTiersShowcase.tier3 = { ...prev.priceTiersShowcase.tier3, ...updates.priceTiersShowcase.tier3 };
        }
      }
      
      Object.keys(updates).forEach(key => {
        if (!['sections', 'tabsShowcase', 'brandSpotlight', 'infoCards', 'newsletter', 'categoryGrid', 'bankOffers', 'newArrivalsSpotlight', 'budgetGrid', 'shoppableUGC', 'faqAccordion', 'appDownload', 'shoppingQuiz', 'priceTiersShowcase'].includes(key)) {
          newConfig[key] = updates[key];
        }
      });
      
      return newConfig;
    });
    showToast('Homepage layout updated live!', 'success');
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentItems,
        orders,
        taxonomies,
        heroBanners,
        topTicker,
        promoPopup,
        storeInfo,
        sponsoredIds,
        appliedCoupon,
        isCartDrawerOpen,
        quickViewProduct,
        isAdminModalOpen,
        isPromoPopupOpen,
        isAuthModalOpen,
        pendingAddToCart,
        setCartDrawerOpen,
        setQuickViewProduct,
        setIsAdminModalOpen,
        setIsPromoPopupOpen,
        setIsAuthModalOpen,
        setPendingAddToCart,
        triggerAuthModalForProduct,
        addPendingProductAfterLogin,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        moveAllWishlistToBag,
        addRecentItem,
        applyCoupon,
        removeCoupon,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        placeOrder,
        updateTaxonomy,
        updateHeroBanner,
        updateTopTicker,
        updatePromoPopup,
        updateStoreInfo,
        toggleSponsored,
        homePageConfig,
        updateHomePageConfig,
        selectedCategory,
        setSelectedCategory,
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
