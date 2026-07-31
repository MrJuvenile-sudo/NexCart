import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowRight, 
  FiLock, FiTag, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { user } = useAuth();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart.filter(Boolean) : [];
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - (subtotal || 0));
  const freeShippingPercent = Math.min(100, Math.round(((subtotal || 0) / freeShippingThreshold) * 100));

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (safeCart.length === 0) {
    return (
      <div className="cart-page-container empty-cart-view">
        <div className="empty-cart-card">
          <div className="icon-circle"><FiShoppingBag /></div>
          <h2>Your Shopping Bag is Empty</h2>
          <p>Explore our curated catalog to find something you'll love.</p>
          <Link to="/products" className="cta-btn primary lg">
            Start Shopping <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Shopping Bag</span>
      </div>

      <div className="cart-page-title-row">
        <h1>Shopping Bag <span>({cartCount} items)</span></h1>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-column">
          <div className="free-shipping-card">
            {(subtotal || 0) >= freeShippingThreshold || appliedCoupon?.freeShipping ? (
              <p className="unlocked"><FiCheckCircle /> You have unlocked <strong>FREE Express Delivery!</strong></p>
            ) : (
              <p>Add <strong>₹{formatPrice(remainingForFreeShipping)}</strong> more to get <strong>FREE Express Delivery</strong></p>
            )}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${freeShippingPercent}%` }} />
            </div>
          </div>

          <div className="cart-items-card">
            {safeCart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image || ''} alt={item.name || 'Item'} className="cart-item-img" />

                <div className="cart-item-details">
                  <span className="item-brand-tag">{item.category || 'General'} • {item.brand || 'NexCart'}</span>
                  <h3>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="price-unit">₹{formatPrice(item.price)} each</div>
                </div>

                <div className="cart-item-qty">
                  <div className="stepper-box">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease">
                      <FiMinus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase">
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <strong>₹{formatPrice((item.price || 0) * (item.qty || 1))}</strong>
                  <button className="remove-link-btn" onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="continue-shopping-bar">
            <Link to="/products" className="plain-link"><FiArrowRight style={{ transform: 'rotate(180deg)' }} /> Continue Shopping</Link>
          </div>
        </div>

        <aside className="cart-summary-column">
          <div className="summary-sticky-card">
            <h3>Order Summary</h3>

            <form onSubmit={handleApplyCoupon} className="coupon-box">
              <label>Have a promo code?</label>
              <div className="coupon-input-group">
                <FiTag className="tag-icon" />
                <input 
                  type="text" 
                  placeholder="e.g. WELCOME20 or FREEDOM25" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <button type="submit">Apply</button>
              </div>
            </form>

            {appliedCoupon && (
              <div className="coupon-applied-alert">
                <span>Coupon <strong>{appliedCoupon.code}</strong> Applied!</span>
                <button onClick={removeCoupon}>Remove</button>
              </div>
            )}

            <hr />

            <div className="summary-rows-group">
              <div className="summary-row">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row green-row">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>-₹{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>{shippingCost === 0 ? <strong className="green-text">FREE</strong> : `₹${shippingCost}`}</span>
              </div>

              <hr />

              <div className="summary-row total-grand-row">
                <span>Total Payable</span>
                <span>₹{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button 
              className="cta-btn primary full-width lg"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout <FiArrowRight />
            </button>

            <div className="checkout-security-note">
              <FiLock /> {user ? 'Guaranteed Safe & Secure Checkout' : 'Sign in required for checkout'}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
