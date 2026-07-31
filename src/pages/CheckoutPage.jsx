import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiLock, FiMapPin, FiTruck, FiCreditCard, FiArrowRight, 
  FiChevronRight, FiCheck
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const { cart, totalAmount, placeOrder } = useCart();
  const { user, addresses } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Address, 2: Delivery, 3: Payment

  // Address form state
  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0] || {};
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || defaultAddr.name || '',
    phone: defaultAddr.phone || '+91 ',
    street: defaultAddr.street || '',
    city: defaultAddr.city || '',
    state: defaultAddr.state || 'Karnataka',
    pin: defaultAddr.pin || ''
  });

  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddr.id || null);

  // Delivery option
  const [deliveryOption, setDeliveryOption] = useState('standard'); // standard, express

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD, UPI, Card, NetBanking

  if (cart.length === 0) {
    return (
      <div className="simple-page">
        <h2>Your shopping bag is empty</h2>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="cta-btn primary">Go to Shop</Link>
      </div>
    );
  }

  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setShippingAddress({
      name: addr.name || user?.name || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      pin: addr.pin || ''
    });
  };

  const handlePlaceOrder = () => {
    const createdOrder = placeOrder({
      shippingAddress,
      paymentMethod,
      deliveryOption
    });
    navigate(`/order-success/${createdOrder.id}`);
  };

  return (
    <div className="checkout-page-container">
      <div className="breadcrumbs">
        <Link to="/cart">Cart</Link> <FiChevronRight /> <span>Checkout</span>
      </div>

      <div className="checkout-page-grid">
        {/* Left Column: Multi-Step Forms */}
        <div className="checkout-steps-column">
          <h1>Checkout</h1>

          {/* Stepper Pipeline Indicator */}
          <div className="checkout-stepper-nav">
            <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span>Shipping Address</span>
            </div>
            <div className="stepper-line" />
            <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span>Delivery Method</span>
            </div>
            <div className="stepper-line" />
            <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span>Payment</span>
            </div>
          </div>

          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="checkout-card">
              <h2><FiMapPin /> Step 1: Delivery Address</h2>

              {/* Saved Addresses Selector */}
              {addresses.length > 0 && (
                <div className="saved-addresses-picker">
                  <label className="picker-label">Choose from Saved Addresses:</label>
                  <div className="saved-cards-row">
                    {addresses.map(addr => (
                      <div 
                        key={addr.id} 
                        className={`saved-addr-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                        onClick={() => handleSelectSavedAddress(addr)}
                      >
                        <strong>{addr.name || 'Saved Address'}</strong>
                        <p>{addr.street}, {addr.city}, {addr.pin}</p>
                        <small>{addr.phone}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="checkout-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Street Address & Landmark</label>
                  <input 
                    type="text" 
                    placeholder="House number, flat, apartment, street area"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input 
                      type="text" 
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>PIN Code</label>
                    <input 
                      type="text" 
                      value={shippingAddress.pin}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pin: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="cta-btn primary lg">
                  Continue to Delivery <FiArrowRight />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: DELIVERY METHOD */}
          {step === 2 && (
            <div className="checkout-card">
              <h2><FiTruck /> Step 2: Select Delivery Speed</h2>

              <div className="options-radio-group">
                <label className={`radio-card ${deliveryOption === 'standard' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={deliveryOption === 'standard'}
                    onChange={() => setDeliveryOption('standard')}
                  />
                  <div>
                    <strong>Standard Delivery</strong>
                    <p>Delivered in 3 to 5 business days</p>
                  </div>
                  <span className="price-tag green-text">FREE</span>
                </label>

                <label className={`radio-card ${deliveryOption === 'express' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    checked={deliveryOption === 'express'}
                    onChange={() => setDeliveryOption('express')}
                  />
                  <div>
                    <strong>Express Air Delivery</strong>
                    <p>Delivered in 24 to 48 hours</p>
                  </div>
                  <span className="price-tag">₹149</span>
                </label>
              </div>

              <div className="checkout-card-actions">
                <button className="cta-btn secondary" onClick={() => setStep(1)}>Back</button>
                <button className="cta-btn primary lg" onClick={() => setStep(3)}>
                  Continue to Payment <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="checkout-card">
              <h2><FiCreditCard /> Step 3: Payment Method</h2>

              <div className="options-radio-group">
                <label className={`radio-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="pay" 
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <p>Pay with cash or card upon delivery</p>
                  </div>
                </label>

                <label className={`radio-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="pay" 
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                  />
                  <div>
                    <strong>Instant UPI Payment</strong>
                    <p>GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </label>

                <label className={`radio-card ${paymentMethod === 'Card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="pay" 
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                  />
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <p>Visa, MasterCard, RuPay, Amex</p>
                  </div>
                </label>
              </div>

              <div className="place-order-banner">
                <p>By placing your order, you agree to NexCart's Terms of Sale & Privacy Policy.</p>
                <button className="cta-btn primary lg full-width" onClick={handlePlaceOrder}>
                  <FiLock /> Place Secure Order (₹{totalAmount.toLocaleString('en-IN')})
                </button>
              </div>

              <button className="cta-btn text-only" onClick={() => setStep(2)}>
                Back to Delivery Options
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Order Items & Pay Total Summary */}
        <aside className="checkout-summary-column">
          <div className="summary-sticky-card">
            <h3>Order Items ({cart.length})</h3>

            <div className="checkout-mini-items-list">
              {cart.map(item => (
                <div key={item.id} className="mini-item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="mini-item-info">
                    <h4>{item.name}</h4>
                    <small>Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}</small>
                  </div>
                  <strong className="mini-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <hr />

            <div className="total-payable-row">
              <span>Total Payable</span>
              <strong className="grand-price">₹{totalAmount.toLocaleString('en-IN')}</strong>
            </div>

            <div className="guarantee-box">
              <FiCheck /> 100% Purchase Protection & Guaranteed Delivery
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
