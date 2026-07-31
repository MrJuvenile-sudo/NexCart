import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiPackage, 
  FiHeart, FiLogOut, FiPlus, FiTrash2, FiCheck, FiChevronRight 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProfilePage() {
  const { user, logout, updateProfile, addresses, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders, wishlist } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info'); // info, addresses, security
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

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
        <p>You need to sign in to access your profile and saved settings.</p>
        <Link to="/login" className="cta-btn primary">Sign In Now</Link>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.pin) return;
    addAddress(newAddr);
    setNewAddrModal(false);
    setNewAddr({ name: 'Home', street: '', city: '', state: 'Karnataka', pin: '', phone: '+91 ' });
  };

  return (
    <div className="profile-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Account Profile</span>
      </div>

      <div className="profile-dashboard-layout">
        {/* Left Sidebar Navigation */}
        <aside className="profile-sidebar-card">
          <div className="user-avatar-header">
            <div className="large-avatar-circle">
              {user.name[0]?.toUpperCase()}
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
              className={activeTab === 'addresses' ? 'active' : ''}
              onClick={() => setActiveTab('addresses')}
            >
              <FiMapPin /> Saved Addresses ({addresses.length})
            </button>
            <button 
              className={activeTab === 'security' ? 'active' : ''}
              onClick={() => setActiveTab('security')}
            >
              <FiLock /> Password & Security
            </button>
            <button onClick={() => navigate('/orders')}>
              <FiPackage /> My Orders <span className="count-chip">{orders.length}</span>
            </button>
            <button onClick={() => navigate('/wishlist')}>
              <FiHeart /> Saved Wishlist <span className="count-chip">{wishlist.length}</span>
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
              <h2>Personal Information</h2>
              <p className="card-subtitle">Manage your personal information and contact preferences.</p>

              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
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
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="cta-btn primary lg">
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="profile-card">
              <div className="card-header-with-action">
                <div>
                  <h2>Saved Addresses</h2>
                  <p className="card-subtitle">Manage delivery locations for quicker checkout.</p>
                </div>
                <button className="cta-btn primary" onClick={() => setNewAddrModal(true)}>
                  <FiPlus /> Add New Address
                </button>
              </div>

              <div className="addresses-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                    <div className="addr-top-bar">
                      <strong>{addr.name || 'Address'}</strong>
                      {addr.isDefault ? (
                        <span className="default-chip"><FiCheck /> Default</span>
                      ) : (
                        <button className="set-default-btn" onClick={() => setDefaultAddress(addr.id)}>Set Default</button>
                      )}
                    </div>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} - {addr.pin}</p>
                    <p className="addr-phone">Phone: {addr.phone}</p>
                    <button className="delete-addr-btn" onClick={() => deleteAddress(addr.id)}>
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="profile-card">
              <h2>Password & Account Security</h2>
              <p className="card-subtitle">Update your password to keep your account safe.</p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Password updated successfully'); }} className="profile-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Minimum 6 characters" required minLength={6} />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Repeat new password" required />
                </div>
                <button type="submit" className="cta-btn primary lg">
                  Update Password
                </button>
              </form>
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
