import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer() {
  const { 
    cart, 
    cartCount, 
    subtotal, 
    totalAmount,
    discountAmount,
    shippingCost,
    appliedCoupon,
    isCartDrawerOpen, 
    setCartDrawerOpen,
    updateQuantity,
    removeFromCart
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  const handleViewBagClick = () => {
    setCartDrawerOpen(false);
    navigate('/cart');
  };

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  return (
    <div className="drawer-backdrop" onClick={() => setCartDrawerOpen(false)}>
      <aside className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-row">
            <FiShoppingBag />
            <h2>Your Cart</h2>
            <span className="drawer-count-badge">({cartCount} items)</span>
          </div>
          <button 
            className="drawer-close-btn" 
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart drawer"
          >
            <FiX />
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-drawer-view">
              <div className="icon-wrap"><FiShoppingBag /></div>
              <h3>Your cart is currently empty</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button 
                className="cta-btn primary margin-top"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/products');
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div key={item.id} className="drawer-item-card">
                  <img src={item.image || ''} alt={item.name || 'Product'} />
                  
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <span className="item-price">₹{formatPrice(item.price)}</span>
                    
                    <div className="drawer-stepper-row">
                      <div className="stepper-box compact">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease">
                          <FiMinus />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase">
                          <FiPlus />
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item-btn" 
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row green">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>-₹{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="drawer-cta-group">
              <button className="cta-btn primary full-width lg" onClick={handleCheckoutClick}>
                Proceed to Checkout <FiArrowRight />
              </button>
              <button className="cta-btn secondary full-width" onClick={handleViewBagClick}>
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
