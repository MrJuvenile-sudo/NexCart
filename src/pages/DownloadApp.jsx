import React from 'react';
import PageLayout from '../components/PageLayout';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

export default function DownloadApp() {
  return (
    <PageLayout title="Download Mobile App - NexCart" description="Get the NexCart app for iOS and Android.">
      <div className="download-app-container">
        <div className="app-hero">
          <div className="app-hero-content">
            <span className="badge-new">NEW APP</span>
            <h1>The Ultimate Shopping Experience in Your Pocket</h1>
            <p>Download the NexCart app to enjoy exclusive app-only discounts, real-time order tracking, and a lightning-fast checkout experience.</p>
            
            <div className="app-store-buttons">
              <button className="store-btn apple" onClick={() => alert('App Store link coming soon!')}>
                <div className="store-icon">🍏</div>
                <div className="store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </button>
              
              <button className="store-btn google" onClick={() => alert('Play Store link coming soon!')}>
                <div className="store-icon">▶️</div>
                <div className="store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>
            
            <div className="app-ratings">
              <div className="stars" style={{ color: '#F59E0B', display: 'flex', gap: '4px' }}>
                <FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" />
              </div>
              <span style={{ marginLeft: '10px', color: '#64748b' }}>4.9/5 from 10,000+ Reviews</span>
            </div>
          </div>
          
          <div className="app-hero-image">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="NexCart Mobile App" className="phone-mockup" />
          </div>
        </div>

        <div className="app-features-grid">
          <div className="app-feature-card">
            <FiCheckCircle className="feature-icon" style={{ color: '#2874f0', fontSize: '24px', marginBottom: '15px' }} />
            <h3>App-Exclusive Deals</h3>
            <p style={{ color: '#64748b' }}>Get notified about flash sales and secret drops before anyone else.</p>
          </div>
          <div className="app-feature-card">
            <FiCheckCircle className="feature-icon" style={{ color: '#2874f0', fontSize: '24px', marginBottom: '15px' }} />
            <h3>One-Tap Checkout</h3>
            <p style={{ color: '#64748b' }}>Save your payment and shipping details securely for instant purchases.</p>
          </div>
          <div className="app-feature-card">
            <FiCheckCircle className="feature-icon" style={{ color: '#2874f0', fontSize: '24px', marginBottom: '15px' }} />
            <h3>Live Order Tracking</h3>
            <p style={{ color: '#64748b' }}>Watch your order move from our warehouse to your doorstep in real-time.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
