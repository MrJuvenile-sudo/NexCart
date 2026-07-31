import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiCheckCircle, FiMapPin, FiPrinter, 
  FiArrowRight, FiShoppingBag, FiCheck 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { orders } = useCart();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="simple-page">
        <h2>Order Confirmation</h2>
        <p>Thank you for your purchase!</p>
        <Link to="/orders" className="cta-btn primary">View My Orders</Link>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: 'Order Confirmed', sub: 'Received & Processing' },
    { num: 2, label: 'Packed', sub: 'Quality Checked' },
    { num: 3, label: 'Shipped', sub: 'In Transit via Courier' },
    { num: 4, label: 'Out for Delivery', sub: 'Arriving Today' }
  ];

  const currentStep = order.trackingStep || 1;

  return (
    <div className="order-success-container">
      <div className="success-hero-banner">
        <div className="success-icon-badge">
          <FiCheckCircle />
        </div>
        <span className="eyebrow-text">ORDER #{order.id} CONFIRMED</span>
        <h1>Thank you for your order!</h1>
        <p>We've received your order and are preparing it for shipment. A confirmation summary has been sent to your email.</p>

        <div className="success-action-buttons no-print">
          <button className="cta-btn secondary" onClick={() => window.print()}>
            <FiPrinter /> Print Invoice
          </button>
          <button className="cta-btn primary" onClick={() => navigate('/orders')}>
            Track In My Orders <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Order Status Milestone Tracking Timeline */}
      <div className="order-tracking-card">
        <h3>Estimated Delivery: 3 to 5 Business Days</h3>
        
        <div className="tracking-timeline-pipeline">
          {stepsList.map((step) => (
            <div key={step.num} className={`timeline-step ${currentStep >= step.num ? 'completed' : ''}`}>
              <div className="step-node">
                {currentStep >= step.num ? <FiCheck /> : step.num}
              </div>
              <div className="step-label">
                <strong>{step.label}</strong>
                <small>{step.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="invoice-receipt-card">
        <div className="invoice-header-row">
          <div>
            <h2>Order Invoice & Receipt</h2>
            <p>Order ID: <strong>{order.id}</strong> • Placed on {order.date}</p>
          </div>
          <div className="payment-status-badge">
            Payment: <strong>{order.paymentMethod}</strong>
          </div>
        </div>

        <hr />

        <div className="receipt-grid-2">
          {/* Items Table */}
          <div className="receipt-items-list">
            <h4>Ordered Items</h4>
            {order.items.map((item, idx) => (
              <div key={idx} className="receipt-item-row">
                <img src={item.image} alt={item.name} />
                <div className="item-text">
                  <h5>{item.name}</h5>
                  <small>Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}</small>
                </div>
                <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>

          {/* Shipping & Cost Breakdown */}
          <div className="receipt-details-sidebar">
            <div className="detail-box">
              <h4><FiMapPin /> Delivery Address</h4>
              <p><strong>{order.shippingAddress?.name || 'Customer'}</strong></p>
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pin}</p>
              <p>Phone: {order.shippingAddress?.phone}</p>
            </div>

            <div className="detail-box grand-total-box">
              <div className="row">
                <span>Items Total:</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="row">
                <span>Shipping Fee:</span>
                <span className="green-text">FREE</span>
              </div>
              <hr />
              <div className="row grand">
                <span>Total Amount Paid:</span>
                <strong>₹{order.total.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-to-shop-footer no-print">
        <Link to="/products" className="cta-btn outline">
          <FiShoppingBag /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
