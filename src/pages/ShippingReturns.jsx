import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiTruck, FiPackage, FiRefreshCw, FiDollarSign, FiClock, FiFileText, FiShield } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function ShippingReturns() {
  const { showToast } = useToast();
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('');

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnOrderId) return;
    showToast(`Return request registered for Order #${returnOrderId}. Doorstep pickup will be scheduled.`, 'success');
    setReturnOrderId('');
    setReturnReason('');
  };

  const deliveryZones = [
    { zone: "Metros & Tier 1 Cities", standard: "2 - 3 Business Days", express: "24 Hours (Next Day)", cost: "Free above ₹999 (else ₹49)" },
    { zone: "Tier 2 & Tier 3 Cities", standard: "3 - 5 Business Days", express: "48 Hours", cost: "Free above ₹999 (else ₹49)" },
    { zone: "Northeast, J&K, & Islands", standard: "5 - 7 Business Days", express: "Not Available", cost: "Free above ₹1,499 (else ₹99)" },
  ];

  const returnSteps = [
    { step: "1", icon: <FiFileText />, title: "Request Return", desc: "Select returns from My Account and specify reason." },
    { step: "2", icon: <FiPackage />, title: "Pack Items", desc: "Pack products in original tags and boxes securely." },
    { step: "3", icon: <FiTruck />, title: "Doorstep Pickup", desc: "Our courier agent picks up from your address for free." },
    { step: "4", icon: <FiRefreshCw />, title: "Quality Audit", desc: "Warehouse inspects returned goods under 48 hours." },
    { step: "5", icon: <FiDollarSign />, title: "Instant Refund", desc: "Refund credited directly back to your payment mode." }
  ];

  return (
    <div className="shipping-returns-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Shipping & Returns Policy</span>
      </div>

      <div className="shipping-hero">
        <div className="hero-badge"><FiTruck /> SHIPPING GUARANTEES</div>
        <h1>Hassle-Free Shipping & Easy Returns</h1>
        <p>Learn about our transparent transit zones, express next-day options, and how our simplified returns system keeps your shopping risk-free.</p>
      </div>

      {/* Transit Zones Table */}
      <section className="info-cards-section margin-top-lg" style={{ background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '30px' }}>
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <div>
            <span className="section-subtitle">DELIVERY SEGMENTS</span>
            <h2>Delivery Timelines & Shipping Costs</h2>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="shipping-timeline-table">
            <thead>
              <tr>
                <th>Region / Delivery Zone</th>
                <th>Standard Shipping</th>
                <th>Express Delivery</th>
                <th>Shipping Charges</th>
              </tr>
            </thead>
            <tbody>
              {deliveryZones.map((z, idx) => (
                <tr key={idx}>
                  <td><strong>{z.zone}</strong></td>
                  <td><FiClock /> {z.standard}</td>
                  <td><FiTruck style={{ color: '#F59E0B' }} /> {z.express}</td>
                  <td>{z.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Returns Interactive Guide */}
      <section className="margin-top-lg">
        <div className="section-header center">
          <span className="section-subtitle">REFUND FLOW</span>
          <h2>Our 5-Step Return Auditing Process</h2>
        </div>
        
        <div className="returns-stepper-visual">
          {returnSteps.map((s, idx) => (
            <div key={idx} className="return-step-card">
              <div className="return-step-number">{s.step}</div>
              <div style={{ fontSize: '24px', color: '#f15b2a', marginBottom: '10px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '8px', color: '#1c1b1a' }}>{s.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Return Request Panel */}
      <section className="support-ticket-box margin-top-lg">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2>Initiate an Instant Return</h2>
            <p style={{ color: '#64748b', marginTop: '10px', lineHeight: '1.5' }}>
              Have an issue with your size, fit, or product condition? Submit your details below to activate doorstep return pickup in seconds.
            </p>
            <div className="perks-list margin-top" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#484440' }}>
                <FiShield style={{ color: '#22c55e' }} /> 14-day replacement window
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#484440' }}>
                <FiShield style={{ color: '#22c55e' }} /> Free reverse pick-up service
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '30px' }}>
            <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Order ID (6-digit)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 849204" 
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Reason for Return</label>
                <select 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  required
                >
                  <option value="">-- Choose reason --</option>
                  <option value="size">Size / Fit issue</option>
                  <option value="damaged">Damaged / Faulty item</option>
                  <option value="wrong">Received incorrect item</option>
                  <option value="change">Changed my mind</option>
                </select>
              </div>
              <button type="submit" className="cta-btn primary full-width">Submit Return Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Courier Partners */}
      <section className="home-section brand-spotlight-section margin-top-lg" style={{ background: 'none', border: 'none', padding: '0' }}>
        <div className="section-header center">
          <span className="section-subtitle">OFFICIAL LOGISTICS</span>
          <h2>Our Logistics & Fulfillment Partners</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '30px', filter: 'grayscale(100%) opacity(60%)' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>🚚 BlueDart Express</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>📦 Delhivery Logistics</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>⚡ Shadowfax Tech</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'monospace' }}>💼 DHL Global</div>
        </div>
      </section>
    </div>
  );
}
