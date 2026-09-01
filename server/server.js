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

// 3. Products Catalog API
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

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = catalogCache.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, product });
});

// 4. Orders API
app.get("/api/orders", (req, res) => {
  res.status(200).json({
    success: true,
    count: ordersCache.length,
    orders: ordersCache
  });
});

app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: `NC${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    trackingStep: 1,
    ...req.body
  };
  ordersCache.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NexCart Synced Backend API running at http://localhost:${PORT}`);
});