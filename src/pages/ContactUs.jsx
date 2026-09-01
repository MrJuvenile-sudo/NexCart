import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, FiPhoneCall, FiMapPin, FiChevronRight, 
  FiSend, FiDownload, FiClock 
} from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function ContactUs() {
  const { showToast } = useToast();
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('support'); // support, billing, corporate, press
  const [msg, setMsg] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    
    showToast(`Thank you, ${name}! Your inquiry has been forwarded to our ${dept.toUpperCase()} team. Reference ID: #${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    setName('');
    setEmail('');
    setMsg('');
  };

  const officeLocations = [
    { name: "Bengaluru Technology Headquarters", status: "Open Now", address: "Outer Ring Rd, Bellandur, Bengaluru, Karnataka 560103", hours: "9:00 AM - 6:30 PM (Mon-Fri)", phone: "+91 80 4920 1000" },
    { name: "Delhi Northern Fulfillment Hub", status: "Open Now", address: "Dwarka Sector 21, New Delhi, Delhi 110077", hours: "8:00 AM - 8:00 PM (Daily)", phone: "+91 11 3920 4000" },
    { name: "Mumbai Fashion Relations Office", status: "Closed", address: "Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013", hours: "10:00 AM - 6:00 PM (Mon-Fri)", phone: "+91 22 2840 5000" }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Contact Us</span>
      </div>

      <div className="shipping-hero" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', background: '#fee2e2', color: '#b91c1c', fontWeight: 'bold', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '15px' }}>
          <FiMail style={{ marginRight: '6px', alignSelf: 'center' }} /> CORPORATE INFORMATION
        </div>
        <h1>Get in Touch with NexCart</h1>
        <p>Whether you are a customer seeking assistance, a brand looking to sell on our platform, or a journalist covering our tech, we are ready to assist.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '60px' }}>
        
        {/* Form Column */}
        <div style={{ background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '30px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold', marginBottom: '10px' }}>Send Us a Message</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Fill out the form below and the appropriate department will get back to you under 24 hours.</p>
          
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                placeholder="Shubhank Parihar" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Email Address</label>
              <input 
                type="email" 
                placeholder="shubhank@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Department Target</label>
              <select 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              >
                <option value="support">Customer Support & Returns</option>
                <option value="billing">Accounts & Payment Disputes</option>
                <option value="corporate">Brand Seller Partnership</option>
                <option value="press">Press & PR Relations</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message Content</label>
              <textarea 
                rows={5} 
                placeholder="Detail your inquiry here..." 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="cta-btn primary full-width">
              Submit Message <FiSend style={{ marginLeft: '8px' }} />
            </button>
          </form>
        </div>

        {/* Corporate channels & direct lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold', marginBottom: '20px' }}>Direct Communication</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', background: '#fff', border: '1px solid #e6e2db', borderRadius: '12px', padding: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <FiMail />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>E-Commerce Support Email</h4>
                  <a href="mailto:support@nexcart.dev" style={{ fontSize: '0.9rem', color: 'var(--n-orange, #f15b2a)', textDecoration: 'none', display: 'block', marginTop: '4px' }}>support@nexcart.dev</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', background: '#fff', border: '1px solid #e6e2db', borderRadius: '12px', padding: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#dcfce7', color: '#15803d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <FiPhoneCall />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>24x7 Customer Helpline</h4>
                  <a href="tel:+91800420639" style={{ fontSize: '0.9rem', color: 'var(--n-orange, #f15b2a)', textDecoration: 'none', display: 'block', marginTop: '4px' }}>+91 (800) 420-NCART</a>
                </div>
              </div>
            </div>
          </div>

          {/* Media Kit Downloads */}
          <div style={{ background: '#f9f7f2', border: '1px solid #e6e2db', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
              <FiDownload /> Brand Assets & Media Kit
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px', lineHeight: '1.4' }}>
              Downloading articles, press statements, or our vector logo files? Access official high-resolution media resources below.
            </p>
            <button 
              onClick={() => showToast('Downloading brand logo SVG pack (Mock)...', 'info')}
              className="cta-btn secondary full-width"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FiDownload /> Download Brand Assets (ZIP)
            </button>
          </div>
        </div>

      </div>

      {/* Offices Section */}
      <section style={{ borderTop: '1px solid #e6e2db', paddingTop: '40px' }}>
        <div className="section-header center" style={{ marginBottom: '30px' }}>
          <span className="section-subtitle">OUR BASES</span>
          <h2>Corporate Offices & Fulfillment Hubs</h2>
        </div>

        <div className="contact-locations-grid">
          {officeLocations.map((loc, idx) => (
            <div key={idx} className="office-card">
              <span className={`office-status-badge ${loc.status === "Closed" ? "closed" : ""}`}>{loc.status}</span>
              <h3>{loc.name}</h3>
              <p style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                <FiMapPin style={{ color: 'var(--n-orange, #f15b2a)', flexShrink: 0, marginTop: '3px' }} />
                <span>{loc.address}</span>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '15px', fontSize: '0.85rem', color: '#484440' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiClock /> {loc.hours}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiPhoneCall /> {loc.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
