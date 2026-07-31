import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_CATALOG, SAMPLE_ORDERS, PROMO_CODES } from '../data/mockData';
import { useToast } from './ToastContext';

const CartContext = createContext();

const DEFAULT_TAXONOMIES = [
  { id: 'all', name: 'For You', icon: '🔥', visible: true },
  { id: 'fashion', name: 'Fashion', icon: '👕', visible: true },
  { id: 'mobiles', name: 'Mobiles', icon: '📱', visible: true },
  { id: 'electronics', name: 'Electronics', icon: '🎧', visible: true },
  { id: 'beauty', name: 'Beauty', icon: '✨', visible: true },
  { id: 'home', name: 'Home', icon: '🏡', visible: true },
  { id: 'appliances', name: 'Appliances', icon: '⚡', visible: true },
  { id: 'toys', name: 'Toys & Baby', icon: '🧸', visible: true },
  { id: 'health', name: 'Food & Health', icon: '🥗', visible: true },
  { id: 'auto', name: 'Auto Accessories', icon: '🚗', visible: true },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽', visible: true },
  { id: 'furniture', name: 'Furniture', icon: '🛋️', visible: true },
  { id: 'books', name: 'Books & Media', icon: '📚', visible: true },
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

export function CartProvider({ children }) {
  const { showToast } = useToast();

  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('nexcart_products');
    return local ? JSON.parse(local) : INITIAL_CATALOG;
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
    return local ? JSON.parse(local) : DEFAULT_TAXONOMIES;
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

  const addToCart = (product, qty = 1) => {
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
  };

  const triggerAuthModalForProduct = (product, qty = 1) => {
    setPendingAddToCart({ product, qty });
    setIsAuthModalOpen(true);
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
