import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiArrowRight, 
  FiChevronRight, FiRefreshCw, FiMapPin, FiX 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function OrdersPage() {
  const { orders, addToCart } = useCart();
  const navigate = useNavigate();

  const [filterTab, setFilterTab] = useState('all');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);

  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];

  const filteredOrders = safeOrders.filter(o => {
    if (filterTab === 'active') return o.status !== 'Delivered';
    if (filterTab === 'delivered') return o.status === 'Delivered';
    return true;
  });

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  const handleReorder = (order) => {
    if (order && Array.isArray(order.items)) {
      order.items.forEach(item => item && addToCart(item, item.qty || 1));
    }
    navigate('/cart');
  };

  return (
    <div className="orders-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>My Orders</span>
      </div>

      <div className="orders-page-header">
        <h1>Your Orders</h1>
        <p>Track shipments, review past purchases, and manage returns.</p>
      </div>

      <div className="orders-tabs-bar">
        <button 
          className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`}
          onClick={() => setFilterTab('all')}
        >
          All Orders ({safeOrders.length})
        </button>
        <button 
          className={`tab-btn ${filterTab === 'active' ? 'active' : ''}`}
          onClick={() => setFilterTab('active')}
        >
          In Progress ({safeOrders.filter(o => o.status !== 'Delivered').length})
        </button>
        <button 
          className={`tab-btn ${filterTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilterTab('delivered')}
        >
          Delivered ({safeOrders.filter(o => o.status === 'Delivered').length})
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-orders-box">
          <div className="icon-circle"><FiPackage /></div>
          <h2>No orders found</h2>
          <p>When you place an order, it will appear here with live tracking updates.</p>
          <Link to="/products" className="cta-btn primary">
            Explore Products <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="orders-cards-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-history-card">
              <div className="order-card-header">
                <div>
                  <span className="order-id-tag">Order #{order.id}</span>
                  <span className="order-date-text">Placed on {order.date}</span>
                </div>
                <div className={`status-badge status-${(order.status || 'Processing').toLowerCase().replace(/\s+/g, '-')}`}>
                  {order.status === 'Delivered' ? <FiCheckCircle /> : <FiTruck />}
                  <span>{order.status || 'Confirmed'}</span>
                </div>
              </div>

              <div className="order-card-items-grid">
                {Array.isArray(order.items) && order.items.map((item, idx) => (
                  <div key={idx} className="order-item-chip">
                    <img src={item.image || ''} alt={item.name || 'Product'} />
                    <div className="chip-info">
                      <h4>{item.name}</h4>
                      <small>Qty: {item.qty || 1} • ₹{formatPrice(item.price)}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <div className="total-amount-display">
                  <span>Total Amount:</span>
                  <strong>₹{formatPrice(order.total)}</strong>
                </div>

                <div className="footer-action-btns">
                  <button 
                    className="cta-btn secondary"
                    onClick={() => setSelectedOrderForTracking(order)}
                  >
                    <FiTruck /> Track Order
                  </button>
                  <button 
                    className="cta-btn outline"
                    onClick={() => handleReorder(order)}
                  >
                    <FiRefreshCw /> Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrderForTracking && (
        <div className="modal-backdrop" onClick={() => setSelectedOrderForTracking(null)}>
          <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setSelectedOrderForTracking(null)}>
              <FiX />
            </button>

            <h3>Tracking Order #{selectedOrderForTracking.id}</h3>
            <p className="subtitle">Current Status: <strong>{selectedOrderForTracking.status}</strong></p>

            <div className="tracking-timeline-vertical">
              <div className={`track-node ${(selectedOrderForTracking.trackingStep || 1) >= 1 ? 'active' : ''}`}>
                <div className="icon-dot"><FiCheckCircle /></div>
                <div>
                  <strong>Order Confirmed</strong>
                  <p>Order received and sent to fulfillment center.</p>
                </div>
              </div>

              <div className={`track-node ${(selectedOrderForTracking.trackingStep || 1) >= 2 ? 'active' : ''}`}>
                <div className="icon-dot"><FiPackage /></div>
                <div>
                  <strong>Packed & Prepared</strong>
                  <p>Inspected, packed, and assigned courier tracking code.</p>
                </div>
              </div>

              <div className={`track-node ${(selectedOrderForTracking.trackingStep || 1) >= 3 ? 'active' : ''}`}>
                <div className="icon-dot"><FiTruck /></div>
                <div>
                  <strong>Shipped & In Transit</strong>
                  <p>En route with logistics partner to delivery hub.</p>
                </div>
              </div>

              <div className={`track-node ${(selectedOrderForTracking.trackingStep || 1) >= 4 ? 'active' : ''}`}>
                <div className="icon-dot"><FiMapPin /></div>
                <div>
                  <strong>Out for Delivery / Delivered</strong>
                  <p>Handed over to local delivery agent.</p>
                </div>
              </div>
            </div>

            <button 
              className="cta-btn primary full-width margin-top"
              onClick={() => setSelectedOrderForTracking(null)}
            >
              Close Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
