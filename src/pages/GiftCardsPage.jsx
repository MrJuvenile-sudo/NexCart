import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiGift, FiArrowRight, FiChevronRight, 
  FiBriefcase, FiSearch 
} from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function GiftCardsPage() {
  const { showToast } = useToast();
  
  // Custom purchase states
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [cardTheme, setCardTheme] = useState('gold-theme'); // gold-theme, silver-theme, platinum-theme

  // Balance checker states
  const [checkCardNum, setCheckCardNum] = useState('');
  const [checkedBalance, setCheckedBalance] = useState(null);

  // Corporate inquiry state
  const [corpName, setCorpName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpBudget, setCorpBudget] = useState('');

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!recipientEmail) return;
    const finalAmt = customAmount ? Number(customAmount) : amount;
    showToast(`NexCart Digital Gift Card (Value: ₹${finalAmt.toLocaleString('en-IN')}) successfully emailed to ${recipientName || recipientEmail}!`, 'success');
    setRecipientEmail('');
    setRecipientName('');
    setMessage('');
    setCustomAmount('');
  };

  const handleCheckBalance = (e) => {
    e.preventDefault();
    if (!checkCardNum.trim()) return;

    const code = checkCardNum.toUpperCase().replace(/\s/g, '');
    if (code.startsWith('NEXGIFT-')) {
      setCheckedBalance(2500);
      showToast('Gift card validated successfully!', 'success');
    } else {
      setCheckedBalance(0);
      showToast('Invalid gift card number format. Try starting with NEXGIFT-XXXX', 'error');
    }
  };

  const handleCorpSubmit = (e) => {
    e.preventDefault();
    showToast(`Corporate bulk inquiry registered for ${corpName}. Our B2B relationship manager will contact you at ${corpEmail} under 2 hours.`, 'success');
    setCorpName('');
    setCorpEmail('');
    setCorpBudget('');
  };

  const displayAmt = customAmount ? Number(customAmount) || 0 : amount;

  return (
    <div className="gift-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Digital Gift Cards</span>
      </div>

      <div className="gift-hero-banner" style={{ background: 'linear-gradient(135deg, #1c1b1a 0%, #44403c 100%)', color: '#fff', padding: '50px 40px', borderRadius: '20px', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 'bold', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '15px' }}>
          <FiGift style={{ marginRight: '6px', alignSelf: 'center' }} /> NEXCART DIGITAL GIFT SHELF
        </div>
        <h1 style={{ color: '#fff' }}>Give the Gift of Premium Choice</h1>
        <p style={{ color: '#d6d3d1' }}>Instant digital delivery gift cards redeemable across all 10,000+ curated products on the NexCart store. Valid forever.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '45px' }}>
        
        {/* Left Column: Live Card Preview & Details */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '20px', color: '#1c1b1a' }}>Live Gift Card Preview</h2>
          
          <div className={`luxury-gift-card ${cardTheme}`}>
            <div className="card-top">
              <span className="card-logo" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Nex<b>Cart</b> ✦</span>
              <span className="card-type" style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.8 }}>DIGITAL CARD</span>
            </div>
            <div className="card-body" style={{ margin: '20px 0' }}>
              <span className="card-amount" style={{ fontSize: '2.5rem', fontWeight: '700' }}>₹{displayAmt.toLocaleString('en-IN')}</span>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '8px' }}>
                {message ? `"${message}"` : "Redeemable across all Mobiles, Electronics, Fashion & Home Decor"}
              </p>
            </div>
            <div className="card-bottom" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.8 }}>
              <span>To: {recipientName || recipientEmail || 'Recipient'}</span>
              <span>Expires: Never</span>
            </div>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
            <button 
              className={`price-shelf-tab-btn ${cardTheme === 'gold-theme' ? 'active' : ''}`}
              onClick={() => setCardTheme('gold-theme')}
            >
              🏅 Luxury Gold
            </button>
            <button 
              className={`price-shelf-tab-btn ${cardTheme === 'silver-theme' ? 'active' : ''}`}
              onClick={() => setCardTheme('silver-theme')}
            >
              🥈 Classic Silver
            </button>
            <button 
              className={`price-shelf-tab-btn ${cardTheme === 'platinum-theme' ? 'active' : ''}`}
              onClick={() => setCardTheme('platinum-theme')}
            >
              🌌 Premium Platinum
            </button>
          </div>

          {/* Balance Checker */}
          <div style={{ marginTop: '40px', background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
              <FiSearch /> Check Gift Card Balance
            </h3>
            <form onSubmit={handleCheckBalance} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <input 
                type="text" 
                placeholder="e.g. NEXGIFT-8492-3024"
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                value={checkCardNum}
                onChange={(e) => setCheckCardNum(e.target.value)}
                required
              />
              <button type="submit" className="cta-btn secondary">Check</button>
            </form>

            {checkedBalance !== null && (
              <div style={{ marginTop: '15px', padding: '15px', borderRadius: '8px', background: checkedBalance > 0 ? '#dcfce7' : '#fee2e2', color: checkedBalance > 0 ? '#15803d' : '#b91c1c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Active Balance:</span>
                <strong>₹{checkedBalance.toLocaleString('en-IN')}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customization Form & Bulk Orders */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '20px', color: '#1c1b1a' }}>Personalize & Email Card</h2>
          
          <form onSubmit={handlePurchase} style={{ background: '#fff', border: '1px solid #e6e2db', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-group">
              <label>Select Preset Value (₹)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {[1000, 2500, 5000, 10000].map(val => (
                  <button 
                    key={val}
                    type="button"
                    className={`amount-pill ${amount === val && !customAmount ? 'active' : ''}`}
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount('');
                    }}
                    style={{ flex: 1, minWidth: '70px', padding: '10px', borderRadius: '8px', border: '1px solid #e6e2db', background: amount === val && !customAmount ? '#1c1b1a' : '#fff', color: amount === val && !customAmount ? '#fff' : '#1c1b1a', cursor: 'pointer', fontWeight: '600' }}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Or Enter Custom Amount (₹)</label>
              <input 
                type="number" 
                min="500"
                max="50000"
                placeholder="Custom Amount (Min. ₹500 - Max. ₹50,000)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Recipient's Full Name</label>
              <input 
                type="text" 
                placeholder="Rohan Sharma" 
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Recipient's Email Address</label>
              <input 
                type="email" 
                placeholder="rohan@example.com" 
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Add a Personal Message</label>
              <textarea 
                rows={3}
                placeholder="Wishing you a wonderful celebration! Enjoy shopping at NexCart."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength="120"
              />
            </div>

            <button type="submit" className="cta-btn primary full-width lg">
              Send Digital Gift Card <FiArrowRight />
            </button>
          </form>

          {/* Corporate Gifting Inquiry */}
          <div style={{ marginTop: '30px', background: '#f9f7f2', border: '1px solid #e6e2db', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
              <FiBriefcase /> Corporate Bulk Gifting
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px', lineHeight: '1.4' }}>
              Rewarding employees or hosting promotional campaigns? Submit a bulk inquiry for custom corporate discounts and API integrations.
            </p>
            <form onSubmit={handleCorpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Company Legal Name"
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                value={corpName}
                onChange={(e) => setCorpName(e.target.value)}
                required
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="email" 
                  placeholder="work@company.com"
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  value={corpEmail}
                  onChange={(e) => setCorpEmail(e.target.value)}
                  required
                />
                <input 
                  type="number" 
                  placeholder="Estimated Budget (₹)"
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  value={corpBudget}
                  onChange={(e) => setCorpBudget(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="cta-btn secondary full-width text-center" style={{ padding: '8px' }}>Send B2B Request</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
