import { ALL_CATALOG_PRODUCTS } from './catalogData';

export const INITIAL_CATALOG = ALL_CATALOG_PRODUCTS;

export const CATEGORIES = [
  'All',
  'Fashion',
  'Mobiles',
  'Electronics',
  'Smart Watches',
  'Gaming',
  'Beauty',
  'Home & Living',
  'Plants & Garden',
  'Appliances',
  'Toys & Baby',
  'Food & Health',
  'Sports',
  'Books',
  'Luxury',
  'Auto Accessories'
];

export const SAMPLE_ORDERS = [
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
        qty: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'
      }
    ]
  },
  {
    id: 'NC1002',
    date: '2026-07-23',
    status: 'Shipped',
    trackingStep: 2,
    total: 4398,
    paymentMethod: 'Cash on Delivery',
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
        id: 301,
        name: 'Sony WH-1000XM5 Noise Canceling Headphones',
        category: 'Electronics',
        price: 26990,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 101,
        name: 'Oxford Cotton Slim Fit Casual Shirt',
        category: 'Fashion',
        price: 1499,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80'
      }
    ]
  }
];

export const PROMO_CODES = {
  'NEX10': { discountPercent: 10, minAmount: 500, label: '10% OFF NexCart Special' },
  'WELCOME20': { discountPercent: 20, minAmount: 1000, label: '20% OFF Welcome Bonus' },
  'FREESHIP': { freeShipping: true, minAmount: 0, label: 'Free Delivery Applied' }
};

export const FAQS = [
  {
    q: 'How long does standard delivery take?',
    a: 'Standard delivery typically takes 3 to 5 business days across India. Express shipping arrives within 1 to 2 business days in major metro cities.'
  },
  {
    q: 'What is the NexCart return & replacement policy?',
    a: 'We offer a hassle-free 14-day return and exchange policy on all eligible products. Items must be unused and in original packaging.'
  },
  {
    q: 'Are payments on NexCart secure?',
    a: 'Yes, all online transactions are processed through 256-bit SSL encrypted PCI-DSS compliant gateways. We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.'
  },
  {
    q: 'How do I track my active order?',
    a: 'Once your order is placed, you can track its status real-time on your Account Orders page or using the direct order tracking link sent via SMS/Email.'
  },
  {
    q: 'How do discount coupons work?',
    a: 'Enter valid coupon codes like NEX10 or WELCOME20 in the coupon input field at checkout or inside your shopping bag to receive instant discount deductions.'
  }
];
