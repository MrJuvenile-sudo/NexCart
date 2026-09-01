import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiStar, FiChevronRight, FiSend 
} from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function DownloadApp() {
  const { showToast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    showToast(`App download link SMS sent to +91 ${phoneNumber}!`, 'success');
    setPhoneNumber('');
  };

  const featureComparison = [
    { feature: "Access to Catalog Products", web: true, app: true },
    { feature: "Push notifications for Flash Drops & Sale Alerts", web: false, app: true },
    { feature: "Extra 5% Club Member Cashback on all purchases", web: false, app: true },
    { feature: "Biometric Login & 1-Tap Secure UPI payments", web: false, app: true },
    { feature: "Offline Access to past Orders & Invoices", web: false, app: true },
    { feature: "Live GPS courier delivery maps integration", web: false, app: true },
  ];

  const appReviews = [
    { name: "Meera Nair", rating: 5, date: "August 2026", text: "The app checkout is incredibly smooth compared to the desktop site. The next-day delivery updates arrive via push notifications immediately! Highly recommended." },
    { name: "Vikram Malhotra", rating: 5, date: "July 2026", text: "Got an extra 5% cashback on my smartphone purchase! The app-exclusive discount codes saved me ₹1,200. Clean interface." },
    { name: "Anjali Gupta", rating: 5, date: "June 2026", text: "Excellent offline support. When I was in a low-reception area, I could still load my order invoice code to show the courier partner. Perfect design." }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Mobile Application</span>
      </div>

      {/* Hero section */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '50px', background: '#f9f7f2', border: '1px solid #e6e2db', padding: '40px', borderRadius: '24px' }}>
        <div style={{ flex: 1.2, minWidth: '320px' }}>
          <span className="badge-new" style={{ background: 'var(--n-orange, #f15b2a)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>NEXCART V2.0 APP</span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1c1b1a', margin: '15px 0' }}>The Luxury Checkout in Your Pocket</h1>
          <p style={{ color: '#484440', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '25px' }}>
            Download our native iOS and Android application to experience one-click checkouts, premium biometric lock safety, and app-only pricing brackets.
          </p>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
            <button className="store-btn apple" style={{ background: '#1c1b1a', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }} onClick={() => showToast('Redirecting to Apple App Store (Mock)...', 'info')}>
              <span style={{ fontSize: '24px' }}>🍏</span>
              <div style={{ textAlign: 'left' }}>
                <small style={{ fontSize: '0.65rem', display: 'block', opacity: 0.8 }}>Download on the</small>
                <strong style={{ fontSize: '1rem' }}>App Store</strong>
              </div>
            </button>

            <button className="store-btn google" style={{ background: '#1c1b1a', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }} onClick={() => showToast('Redirecting to Google Play Store (Mock)...', 'info')}>
              <span style={{ fontSize: '24px' }}>▶️</span>
              <div style={{ textAlign: 'left' }}>
                <small style={{ fontSize: '0.65rem', display: 'block', opacity: 0.8 }}>GET IT ON</small>
                <strong style={{ fontSize: '1rem' }}>Google Play</strong>
              </div>
            </button>
          </div>

          <div className="app-ratings" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="stars" style={{ color: '#F59E0B', display: 'flex', gap: '3px' }}>
              <FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" />
            </div>
            <strong style={{ fontSize: '0.9rem', color: '#1c1b1a' }}>4.9/5 Rating</strong>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>(12,400+ reviews)</span>
          </div>
        </div>

        <div style={{ flex: 0.8, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80" 
            alt="NexCart App Mockup" 
            style={{ width: '100%', maxWidth: '300px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', border: '6px solid #1c1b1a' }}
          />
        </div>
      </div>

      {/* SMS Sender */}
      <section style={{ background: '#fff', border: '1px solid #e6e2db', padding: '30px', borderRadius: '16px', marginBottom: '50px' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Get the download link sent directly to your phone</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>Enter your 10-digit mobile number to receive a secure SMS link.</p>
          </div>
          <form onSubmit={handleSendLink} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', flex: 1, border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
              <span style={{ padding: '10px 12px', background: '#f1f5f9', borderRight: '1px solid #cbd5e1', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>+91</span>
              <input 
                type="tel" 
                pattern="[0-9]{10}"
                placeholder="9876543210"
                style={{ border: 'none', padding: '10px', width: '100%', outline: 'none' }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="cta-btn primary"><FiSend /></button>
          </form>
        </div>
      </section>

      {/* Comparison Grid */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-header center" style={{ marginBottom: '30px' }}>
          <span className="section-subtitle">BENEFITS SHEET</span>
          <h2>Web vs. Native App Comparison</h2>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Shopping Feature</th>
                <th>Desktop / Mobile Web</th>
                <th>NexCart Mobile App</th>
              </tr>
            </thead>
            <tbody>
              {featureComparison.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.feature}</td>
                  <td>{f.web ? <span className="check-icon-y">✔ Available</span> : <span className="check-icon-n">❌ Not Available</span>}</td>
                  <td>{f.app ? <span className="check-icon-y" style={{ color: 'var(--n-orange, #f15b2a)', fontWeight: 'bold' }}>✦ Enabled (Premium)</span> : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customer Reviews Slider */}
      <section style={{ marginBottom: '40px', background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Loved by 10,000+ App Shoppers</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {appReviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveReviewIdx(idx)}
                style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', background: activeReviewIdx === idx ? 'var(--n-orange, #f15b2a)' : '#e2e8f0', cursor: 'pointer' }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e6e2db', paddingTop: '20px' }}>
          <p style={{ fontSize: '1.05rem', italic: 'true', color: '#484440', lineHeight: '1.6' }}>
            "{appReviews[activeReviewIdx].text}"
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block', color: '#1c1b1a' }}>{appReviews[activeReviewIdx].name}</strong>
              <small style={{ color: '#64748b' }}>App Store reviewer • {appReviews[activeReviewIdx].date}</small>
            </div>
            <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
              {[...Array(appReviews[activeReviewIdx].rating)].map((_, i) => <FiStar fill="currentColor" key={i} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
