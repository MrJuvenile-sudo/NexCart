import React, { useState } from 'react';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function TrackOrderPage() {
  const { orders } = useCart();
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = searchId.replace('#', '').trim();
    if (!cleanId) return;

    const found = safeOrders.find(o => String(o.id) === cleanId);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg(`Order #${cleanId} not found. Please check your order ID or sign in to view your orders.`);
    }
  };

  const formatPrice = (val) => {
    if (typeof val === 'number' && !isNaN(val)) {
      return val.toLocaleString('en-IN');
    }
    return val || '0';
  };

  return (
    <div className="track-page-container">
      <div className="track-hero-card">
        <div className="track-icon-badge"><FiTruck /></div>
        <h1>Track Your Shipment Live</h1>
        <p>Enter your 6-digit Order ID to get real-time tracking updates, courier location, and estimated delivery dates.</p>

        <form onSubmit={handleTrackSubmit} className="track-search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="e.g. 849204 or #1001" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            required
          />
          <button type="submit" className="cta-btn primary">Track Package</button>
        </form>
      </div>

      {errorMsg && (
        <div className="track-error-card">
          <FiAlertCircle /> {errorMsg}
        </div>
      )}

      {searchedOrder && (
        <div className="track-result-card margin-top">
          <div className="result-header">
            <div>
              <h2>Order #{searchedOrder.id}</h2>
              <p>Placed on {searchedOrder.date} • Total: ₹{formatPrice(searchedOrder.total)}</p>
            </div>
            <div className="status-badge active">
              <FiTruck /> {searchedOrder.status || 'In Transit'}
            </div>
          </div>

          <div className="tracking-timeline-horizontal">
            <div className={`step-node ${(searchedOrder.trackingStep || 1) >= 1 ? 'completed' : ''}`}>
              <div className="dot"><FiCheckCircle /></div>
              <span>Order Placed</span>
            </div>
            <div className="line" />
            <div className={`step-node ${(searchedOrder.trackingStep || 1) >= 2 ? 'completed' : ''}`}>
              <div className="dot"><FiPackage /></div>
              <span>Packed</span>
            </div>
            <div className="line" />
            <div className={`step-node ${(searchedOrder.trackingStep || 1) >= 3 ? 'completed' : ''}`}>
              <div className="dot"><FiTruck /></div>
              <span>Shipped</span>
            </div>
            <div className="line" />
            <div className={`step-node ${(searchedOrder.trackingStep || 1) >= 4 ? 'completed' : ''}`}>
              <div className="dot"><FiMapPin /></div>
              <span>Delivered</span>
            </div>
          </div>

          <div className="track-items-summary">
            <h3>Items in Shipment</h3>
            <div className="items-list">
              {Array.isArray(searchedOrder.items) && searchedOrder.items.map((item, idx) => (
                <div key={idx} className="track-item-row">
                  <img src={item.image || ''} alt={item.name || ''} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty} • ₹{formatPrice(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
