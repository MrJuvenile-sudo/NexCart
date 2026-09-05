const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory synced storage
let catalogCache = null;
try {
  const catalogData = require("../src/data/catalogData");
  catalogCache = catalogData.ALL_CATALOG_PRODUCTS || [];
} catch (e) {
  catalogCache = [];
}

let ordersCache = [
  {
    id: 'NC1001',
    date: '2026-07-20',
    status: 'Delivered',
    trackingStep: 4,
    total: 3299,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'Shubhank Parihar',
      street: '42 Tech Avenue, Block B',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560001',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 401,
        name: 'Apple Watch Ultra 2 (Titanium GPS+Cellular)',
        category: 'Smart Watches',
        price: 89900,
        qty: 1
      }
    ]
  }
];

// 1. Health & Root Endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NexCart Production API Engine",
    version: "2.0.0",
    productsCount: catalogCache.length,
    activeOrders: ordersCache.length
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Authentication API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const lowerEmail = (email || '').toLowerCase().trim();

  if (lowerEmail.includes('admin')) {
    return res.status(200).json({
      success: true,
      token: "demo_admin_jwt_token_nexcart_2026",
      user: {
        id: 99,
        name: "NexCart Administrator",
        email: "admin@nexcart.dev",
        role: "admin"
      }
    });
  }

  const namePart = lowerEmail.includes('@')
    ? lowerEmail.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    : "Customer";

  return res.status(200).json({
    success: true,
    token: "demo_customer_jwt_token_nexcart_2026",
    user: {
      id: Date.now(),
      name: namePart || "Shubhank Parihar",
      email: lowerEmail || "user@example.com",
      role: "customer"
    }
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email } = req.body || {};
  return res.status(201).json({
    success: true,
    token: "demo_registered_jwt_token_nexcart_2026",
    user: {
      id: Date.now(),
      name: name || "New Customer",
      email: email || "customer@nexcart.dev",
      role: "customer"
    }
  });
});

// 3. Server-Side Promo Codes Dictionary
const SERVER_PROMO_CODES = {
  'NEX10': { discountPercent: 10, minAmount: 500, label: '10% OFF NexCart Special' },
  'WELCOME20': { discountPercent: 20, minAmount: 1000, label: '20% OFF Welcome Bonus' },
  'FREESHIP': { freeShipping: true, minAmount: 0, label: 'Free Delivery Applied' }
};

// 4. Products Catalog API & Search
app.get("/api/products", (req, res) => {
  const { category, search, limit } = req.query;
  let result = [...catalogCache];

  if (category && category !== 'All') {
    const cLower = category.toLowerCase();
    result = result.filter(p => (p.category || '').toLowerCase().includes(cLower));
  }

  if (search) {
    const sLower = search.toLowerCase();
    result = result.filter(p => 
      (p.name || '').toLowerCase().includes(sLower) || 
      (p.brand || '').toLowerCase().includes(sLower)
    );
  }

  if (limit) {
    result = result.slice(0, parseInt(limit, 10));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    products: result
  });
});

app.get("/api/search", (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.status(200).json({ success: true, count: 0, results: [] });
  }

  const tokens = query.split(/\s+/).filter(Boolean);
  const results = catalogCache.filter(p => {
    const text = `${p.name || ''} ${p.brand || ''} ${p.category || ''} ${p.description || ''}`.toLowerCase();
    return tokens.every(token => text.includes(token));
  }).slice(0, 20);

  res.status(200).json({
    success: true,
    count: results.length,
    results: results.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      image: p.image,
      matchedCategoryTag: p.category
    }))
  });
});

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = catalogCache.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, product });
});

// 5. Authoritative Cart & Pricing Validation API
app.post("/api/cart/validate", (req, res) => {
  const { items = [], couponCode = '' } = req.body || {};

  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const prod = catalogCache.find(p => p.id === item.id);
    if (!prod) continue;
    const qty = Math.max(1, parseInt(item.qty, 10) || 1);
    const itemSubtotal = prod.price * qty;
    subtotal += itemSubtotal;
    verifiedItems.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      qty,
      image: prod.image,
      itemSubtotal
    });
  }

  let appliedCoupon = null;
  let discountAmount = 0;
  let couponError = null;

  if (couponCode && typeof couponCode === 'string') {
    const codeUpper = couponCode.trim().toUpperCase();
    const couponDef = SERVER_PROMO_CODES[codeUpper];
    if (couponDef) {
      if (subtotal < couponDef.minAmount) {
        couponError = `Coupon ${codeUpper} requires a minimum order subtotal of ₹${couponDef.minAmount.toLocaleString('en-IN')}.`;
      } else {
        if (couponDef.discountPercent) {
          discountAmount = Math.round((subtotal * couponDef.discountPercent) / 100);
        }
        appliedCoupon = {
          code: codeUpper,
          ...couponDef,
          discountAmount
        };
      }
    } else {
      couponError = `Invalid coupon code: "${codeUpper}".`;
    }
  }

  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  // Post-discount threshold: Orders ₹999+ or freeShipping coupon get free delivery, otherwise ₹99
  const shippingFee = (verifiedItems.length === 0 || postDiscountSubtotal >= 999 || appliedCoupon?.freeShipping) ? 0 : 99;
  const totalAmount = postDiscountSubtotal + shippingFee;

  return res.status(200).json({
    success: true,
    subtotal,
    discountAmount,
    postDiscountSubtotal,
    shippingFee,
    totalAmount,
    appliedCoupon,
    couponError,
    items: verifiedItems,
    freeShippingThresholdRemaining: Math.max(0, 999 - postDiscountSubtotal)
  });
});

// 6. Orders API (Server-Side Price Recalculation)
app.get("/api/orders", (req, res) => {
  res.status(200).json({
    success: true,
    count: ordersCache.length,
    orders: ordersCache
  });
});

app.post("/api/orders", (req, res) => {
  const { items = [], couponCode = '', shippingAddress = {}, paymentMethod = 'Cash on Delivery' } = req.body || {};

  // Server re-validates all items and pricing
  let subtotal = 0;
  const validatedItems = [];

  for (const it of items) {
    const prod = catalogCache.find(p => p.id === it.id);
    if (!prod) continue;
    const qty = Math.max(1, parseInt(it.qty, 10) || 1);
    subtotal += prod.price * qty;
    validatedItems.push({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      price: prod.price,
      qty,
      image: prod.image
    });
  }

  if (validatedItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cannot place order with empty cart." });
  }

  let discountAmount = 0;
  let appliedCoupon = null;

  if (couponCode) {
    const codeUpper = couponCode.trim().toUpperCase();
    const couponDef = SERVER_PROMO_CODES[codeUpper];
    if (couponDef && subtotal >= couponDef.minAmount) {
      if (couponDef.discountPercent) {
        discountAmount = Math.round((subtotal * couponDef.discountPercent) / 100);
      }
      appliedCoupon = { code: codeUpper, ...couponDef, discountAmount };
    }
  }

  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingFee = (postDiscountSubtotal >= 999 || appliedCoupon?.freeShipping) ? 0 : 99;
  const verifiedTotal = postDiscountSubtotal + shippingFee;

  const newOrder = {
    id: `NC${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    trackingStep: 1,
    subtotal,
    discountAmount,
    shippingFee,
    total: verifiedTotal,
    appliedCoupon: appliedCoupon?.code || null,
    shippingAddress,
    paymentMethod,
    items: validatedItems
  };

  ordersCache.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NexCart Synced Backend API running at http://localhost:${PORT}`);
});