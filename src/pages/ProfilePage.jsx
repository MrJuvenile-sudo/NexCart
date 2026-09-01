import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiPackage, 
  FiHeart, FiLogOut, FiPlus, FiTrash2, FiCheck, FiChevronRight,
  FiAward, FiCreditCard, FiBell, FiShield, FiTruck
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProfilePage() {
  const { user, logout, updateProfile, addresses, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders, wishlist } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info'); // info, wallet, orders, addresses, security, alerts
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  // Wallet simulator state
  const [walletBalance, setWalletBalance] = useState(2450);
  const [nexCoins, setNexCoins] = useState(450);
  const [addAmount, setAddAmount] = useState('');

  // Alerts preferences state
  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    whatsappAlerts: true,
    promoOffers: false,
    priceDropAlerts: true
  });

  // Address modal state
  const [newAddrModal, setNewAddrModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: 'Home',
    street: '',
    city: '',
    state: 'Karnataka',
    pin: '',
    phone: '+91 '
  });

  if (!user) {
    return (
      <div className="simple-page">
        <h2>Please Sign In</h2>
        <p>You need to sign in to access your luxury profile and account dashboard.</p>
        <Link to="/login" className="cta-btn primary">Sign In Now</Link>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    showToast('Profile updated successfully!', 'success');
  };

  const handleAddWallet = (e) => {
    e.preventDefault();
    const val = Number(addAmount);
    if (!val || val <= 0) return;
    setWalletBalance(prev => prev + val);
    setAddAmount('');
    showToast(`₹${val.toLocaleString('en-IN')} added to NexCart Wallet!`, 'success');
  };

  const handleRedeemCoins = () => {
    if (nexCoins <= 0) return;
    setWalletBalance(prev => prev + nexCoins);
    showToast(`Redeemed ${nexCoins} NexCoins for ₹${nexCoins} Wallet Cash!`, 'success');
    setNexCoins(0);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pin) return;
    addAddress(newAddr);
    setNewAddrModal(false);
    setNewAddr({ name: 'Home', street: '', city: '', state: 'Karnataka', pin: '', phone: '+91 ' });
    showToast('Delivery address saved successfully!', 'success');
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  return (
    <div className="profile-page-container">
      <div className="breadcrumbs" style={{ margin: '15px 0' }}>
        <Link to="/">Home</Link> <FiChevronRight /> <span>My Account</span> <FiChevronRight /> <strong style={{ color: '#1c1b1a' }}>Dashboard</strong>
      </div>

      {/* VIP Gold Club Luxury Card */}
      <div className="vip-gold-hero-card">
        <div className="vip-hero-left">
          <div className="vip-badge-label">
            <FiAward /> <span>NEX VIP GOLD CLUB</span>
          </div>
          <h2>Welcome Back, {user.name}</h2>
          <p>Enjoy exclusive 5% unlimited store cashback, 24-hr express priority delivery, and personalized customer care.</p>
          <div className="vip-progress-wrap">
            <div className="vip-progress-text">
              <span>Annual Spend: <strong>₹42,500</strong></span>
              <span>Platinum Goal: <strong>₹50,000</strong></span>
            </div>
            <div className="vip-progress-bar">
              <div className="vip-progress-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        <div className="vip-hero-right">
          <div className="vip-stat-box">
            <small>Wallet Balance</small>
            <strong>₹{walletBalance.toLocaleString('en-IN')}</strong>
          </div>
          <div className="vip-stat-box">
            <small>NexCoins Earned</small>
            <strong style={{ color: '#F59E0B' }}>★ {nexCoins}</strong>
          </div>
        </div>
      </div>

      <div className="profile-dashboard-layout">
        {/* Left Sidebar Navigation */}
        <aside className="profile-sidebar-card">
          <div className="user-avatar-header">
            <div className="large-avatar-circle">
              {user.name[0]?.toUpperCase() || 'U'}
            </div>
            <h3>{user.name}</h3>
            <span className="user-email-tag">{user.email}</span>
            {user.role === 'admin' && <span className="admin-chip">Administrator</span>}
          </div>

          <nav className="profile-side-nav">
            <button 
              className={activeTab === 'info' ? 'active' : ''}
              onClick={() => setActiveTab('info')}
            >
              <FiUser /> Personal Details
            </button>
            <button 
              className={activeTab === 'wallet' ? 'active' : ''}
              onClick={() => setActiveTab('wallet')}
            >
              <FiCreditCard /> Wallet & NexCoins
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FiPackage /> Orders & Tracking <span className="count-chip">{safeOrders.length}</span>
            </button>
            <button 
              className={activeTab === 'addresses' ? 'active' : ''}
              onClick={() => setActiveTab('addresses')}
            >
              <FiMapPin /> Saved Addresses <span className="count-chip">{safeAddresses.length}</span>
            </button>
            <button 
              className={activeTab === 'security' ? 'active' : ''}
              onClick={() => setActiveTab('security')}
            >
              <FiLock /> Password & Security
            </button>
            <button 
              className={activeTab === 'alerts' ? 'active' : ''}
              onClick={() => setActiveTab('alerts')}
            >
              <FiBell /> Notification Settings
            </button>
            <button onClick={() => navigate('/wishlist')}>
              <FiHeart /> Saved Wishlist <span className="count-chip">{Array.isArray(wishlist) ? wishlist.length : 0}</span>
            </button>
            <hr />
            <button 
              className="logout-nav-btn"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <FiLogOut /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="profile-content-area">
          
          {/* TAB 1: PERSONAL DETAILS */}
          {activeTab === 'info' && (
            <div className="profile-card">
              <div className="card-header-with-action">
                <div>
                  <h2>Personal Information</h2>
                  <p className="card-subtitle">Manage your verified identity, email, and phone contact details.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-group">
                  <label>Full Legal Name</label>
                  <div className="input-with-icon">
                    <FiUser className="input-icon" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Primary Contact Phone</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="cta-btn primary lg" style={{ marginTop: '10px' }}>
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: WALLET & COINS */}
          {activeTab === 'wallet' && (
            <div className="profile-card">
              <h2>NexCart Wallet & Rewards</h2>
              <p className="card-subtitle">Use your wallet balance for one-click instant checkout and redeem NexCoins.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', margin: '25px 0' }}>
                <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <small style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instant Cash Balance</small>
                  <div style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0' }}>₹{walletBalance.toLocaleString('en-IN')}</div>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiCheck /> Ready for 1-Click Checkout
                  </span>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fde68a', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <small style={{ color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>NexCoins Loyalty Balance</small>
                    <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#b45309', margin: '8px 0' }}>★ {nexCoins}</div>
                    <span style={{ fontSize: '0.8rem', color: '#92400e' }}>1 Coin = ₹1.00 Value at Checkout</span>
                  </div>
                  {nexCoins > 0 && (
                    <button 
                      type="button" 
                      onClick={handleRedeemCoins}
                      style={{ marginTop: '12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Convert to Wallet Cash
                    </button>
                  )}
                </div>
              </div>

              {/* Add Cash Form */}
              <div style={{ background: 'var(--n-cream, #f9f7f2)', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '14px', padding: '20px', marginBottom: '30px' }}>
                <h4 style={{ marginBottom: '10px' }}>Add Funds to NexCart Wallet</h4>
                <form onSubmit={handleAddWallet} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input 
                    type="number" 
                    placeholder="Enter amount (e.g. ₹500, ₹1,000)"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <button type="submit" className="cta-btn primary">
                    <FiPlus /> Add Cash
                  </button>
                </form>
              </div>

              <h4>Recent Wallet Transactions</h4>
              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '8px' }}>
                  <div>
                    <strong>VIP 5% Cashback Credited</strong>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Order NC1001 • Today</div>
                  </div>
                  <strong style={{ color: '#16a34a' }}>+₹165.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '8px' }}>
                  <div>
                    <strong>Welcome Bonus Coins</strong>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Registration Reward</div>
                  </div>
                  <strong style={{ color: '#F59E0B' }}>+100 Coins</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="profile-card">
              <div className="card-header-with-action">
                <div>
                  <h2>Orders & Shipments</h2>
                  <p className="card-subtitle">Track, return, or re-order your recent purchases.</p>
                </div>
                <Link to="/orders" className="cta-btn secondary">
                  View Full Orders History
                </Link>
              </div>

              {safeOrders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                  {safeOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid var(--n-line, #e6e2db)', borderRadius: '12px', padding: '18px', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--n-line, #e6e2db)', paddingBottom: '12px', marginBottom: '12px' }}>
                        <div>
                          <strong>Order #{order.id}</strong>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '10px' }}>Placed on {order.date}</span>
                        </div>
                        <span style={{ background: order.status === 'Delivered' ? '#dcfce7' : '#dbeafe', color: order.status === 'Delivered' ? '#15803d' : '#1d4ed8', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px' }}>
                          {order.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span>Total Amount: <strong>₹{order.total?.toLocaleString('en-IN')}</strong></span>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', marginLeft: '15px' }}>({order.items?.length || 1} items)</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link to="/track" className="cta-btn secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                            <FiTruck /> Track Order
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                  <FiPackage style={{ fontSize: '2.5rem', marginBottom: '10px' }} />
                  <p>You haven't placed any orders yet.</p>
                  <Link to="/products" className="cta-btn primary" style={{ marginTop: '15px' }}>Start Shopping</Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="profile-card">
              <div className="card-header-with-action">
                <div>
                  <h2>Saved Delivery Addresses</h2>
                  <p className="card-subtitle">Manage multiple shipping addresses for rapid checkout.</p>
                </div>
                <button className="cta-btn primary" onClick={() => setNewAddrModal(true)}>
                  <FiPlus /> Add New Address
                </button>
              </div>

              <div className="addresses-grid" style={{ marginTop: '20px' }}>
                {safeAddresses.map(addr => (
                  <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                    <div className="addr-top-bar">
                      <strong>{addr.name || 'Address'}</strong>
                      {addr.isDefault ? (
                        <span className="default-chip"><FiCheck /> Default</span>
                      ) : (
                        <button className="set-default-btn" onClick={() => {
                          setDefaultAddress(addr.id);
                          showToast('Default address updated', 'info');
                        }}>Set Default</button>
                      )}
                    </div>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} - {addr.pin}</p>
                    <p className="addr-phone">Phone: {addr.phone}</p>
                    <button className="delete-addr-btn" onClick={() => {
                      deleteAddress(addr.id);
                      showToast('Address removed', 'info');
                    }}>
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY */}
          {activeTab === 'security' && (
            <div className="profile-card">
              <h2>Password & Account Security</h2>
              <p className="card-subtitle">Keep your NexCart credentials safe with two-factor authentication and passwords.</p>

              <div style={{ background: 'var(--n-cream, #f9f7f2)', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '12px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiShield style={{ color: '#16a34a' }} /> Two-Factor Authentication (2FA)</strong>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>Protect your account with OTP login verification via SMS.</p>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px' }}>ENABLED</span>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); showToast('Password updated securely!', 'success'); }} className="profile-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Minimum 8 characters with numbers & symbols" required minLength={6} />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Repeat new password" required />
                </div>
                <button type="submit" className="cta-btn primary lg">
                  Update Account Password
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS */}
          {activeTab === 'alerts' && (
            <div className="profile-card">
              <h2>Communication & Notification Preferences</h2>
              <p className="card-subtitle">Choose how you want to receive order updates, flash sale alerts, and deals.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '10px' }}>
                  <div>
                    <strong>📦 Real-time Shipment & Delivery Updates</strong>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>SMS and Email notifications when your parcel is dispatched or out for delivery.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifs.orderUpdates} 
                    onChange={(e) => setNotifs({ ...notifs, orderUpdates: e.target.checked })} 
                    style={{ width: '20px', height: '20px', accentColor: 'var(--n-orange, #f15b2a)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '10px' }}>
                  <div>
                    <strong>💬 WhatsApp Instant Delivery Tracking</strong>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Receive instant live tracking maps and OTP codes directly via WhatsApp.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifs.whatsappAlerts} 
                    onChange={(e) => setNotifs({ ...notifs, whatsappAlerts: e.target.checked })} 
                    style={{ width: '20px', height: '20px', accentColor: 'var(--n-orange, #f15b2a)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--n-line, #e6e2db)', borderRadius: '10px' }}>
                  <div>
                    <strong>🔥 Exclusive VIP Flash Sale Early Access</strong>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Get notified 2 hours before major sales and limited drop launches.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifs.promoOffers} 
                    onChange={(e) => setNotifs({ ...notifs, promoOffers: e.target.checked })} 
                    style={{ width: '20px', height: '20px', accentColor: 'var(--n-orange, #f15b2a)' }}
                  />
                </div>
              </div>

              <button 
                type="button" 
                className="cta-btn primary" 
                style={{ marginTop: '25px' }}
                onClick={() => showToast('Preferences updated successfully!', 'success')}
              >
                Save Notification Settings
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Add Address Modal */}
      {newAddrModal && (
        <div className="modal-backdrop" onClick={() => setNewAddrModal(false)}>
          <div className="address-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Delivery Address</h3>

            <form onSubmit={handleAddAddressSubmit} className="checkout-form">
              <div className="form-group">
                <label>Address Label (e.g., Home, Office)</label>
                <input 
                  type="text" 
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <input 
                  type="text" 
                  placeholder="House No., Building, Area"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  required 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input 
                    type="text" 
                    value={newAddr.pin}
                    onChange={(e) => setNewAddr({ ...newAddr, pin: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input 
                  type="text" 
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  required 
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" className="cta-btn secondary" onClick={() => setNewAddrModal(false)}>Cancel</button>
                <button type="submit" className="cta-btn primary">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
