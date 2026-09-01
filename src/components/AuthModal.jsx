import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser, FiShield, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function AuthModal() {
  const { login } = useAuth();
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    pendingAddToCart, 
    setPendingAddToCart, 
    addPendingProductAfterLogin,
    addToCart, 
    setCartDrawerOpen 
  } = useCart();
  const { showToast } = useToast();

  const [loginRole, setLoginRole] = useState('customer');
  const [email, setEmail] = useState('shubhank@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleRoleChange = (role) => {
    setLoginRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setEmail('admin@nexcart.dev');
      setPassword('Admin@123');
    } else {
      setEmail('shubhank@example.com');
      setPassword('password123');
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setPendingAddToCart(null);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const activeEmail = email.trim() || (loginRole === 'admin' ? 'admin@nexcart.dev' : 'shubhank@example.com');
      const activePassword = password.trim() || (loginRole === 'admin' ? 'Admin@123' : 'password123');

      const user = await login({ email: activeEmail, password: activePassword });

      if (user) {
        showToast(`Welcome, ${user.name.split(' ')[0]}!`, 'success');
        setIsAuthModalOpen(false);

        // If there was a pending item from "Add to Bag", add it to cart now!
        if (pendingAddToCart && pendingAddToCart.product && typeof addPendingProductAfterLogin === 'function') {
          addPendingProductAfterLogin(user);
        }

        // Open Cart Drawer
        setTimeout(() => {
          setCartDrawerOpen(true);
        }, 250);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Sign in failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={handleClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <FiX />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-badge">
            <FiShoppingBag /> Authentication Required
          </div>
          <h2>{pendingAddToCart ? 'Sign in to add items to your cart' : 'Sign in to NexCart'}</h2>
          <p>Please log in to your account to save items, view your cart, and complete orders.</p>
        </div>

        <div className="login-role-tabs margin-top-sm">
          <button
            type="button"
            className={`role-tab-btn ${loginRole === 'customer' ? 'active' : ''}`}
            onClick={() => handleRoleChange('customer')}
          >
            <FiUser /> Customer Sign In
          </button>
          <button
            type="button"
            className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            <FiShield /> Admin Login
          </button>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form margin-top-sm">
          <div className="form-group">
            <label htmlFor="modal-email">{loginRole === 'admin' ? 'Admin Email' : 'Email Address'}</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input 
                id="modal-email"
                type="email" 
                placeholder={loginRole === 'admin' ? 'admin@nexcart.dev' : 'you@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="modal-password">Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input 
                id="modal-password"
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="cta-btn primary full-width margin-top" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In & View Cart'} <FiArrowRight />
          </button>
        </form>

        <div className="auth-modal-footer">
          Don't have an account? <Link to="/register" onClick={handleClose}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
