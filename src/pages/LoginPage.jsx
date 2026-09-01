import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiUser, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { addPendingProductAfterLogin, pendingAddToCart, setCartDrawerOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const [loginRole, setLoginRole] = useState('customer'); // 'customer' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (role) => {
    setLoginRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setEmail('admin@nexcart.dev');
      setPassword('Admin@123');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (loginRole === 'admin') {
        const user = await login({ email: email || 'admin@nexcart.dev', password: password || 'Admin@123' });
        if (user) navigate('/admin');
      } else {
        const user = await login({ email, password });
        if (user) {
          if (pendingAddToCart && typeof addPendingProductAfterLogin === 'function') {
            addPendingProductAfterLogin(user);
            setCartDrawerOpen(true);
          }
          navigate(redirectPath);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page-container">
      <div className="auth-split-card">
        {/* Left Side Aesthetic Banner */}
        <div className="auth-brand-side">
          <div className="brand-overlay-content">
            <Link to="/" className="brand-logo white">
              <b>Nex</b>Cart<span>.</span>
            </Link>
            <h2>Elevate your shopping experience.</h2>
            <p>Access your curated wishlist, track active orders, and enjoy tailored member discounts.</p>
            
            <div className="auth-perks-list">
              <div className="perk-item">
                <FiCheckCircle /> <span>Instant order tracking & history</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle /> <span>Saved delivery address book</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle /> <span>Exclusive promo codes (NEX10)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="auth-form-side">
          {/* Role Switcher Tabs */}
          <div className="login-role-tabs">
            <button
              className={`role-tab-btn ${loginRole === 'customer' ? 'active' : ''}`}
              onClick={() => handleRoleChange('customer')}
            >
              <FiUser /> Customer Sign In
            </button>
            <button
              className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <FiShield /> Administrator Login
            </button>
          </div>

          <div className="auth-header">
            <span className="eyebrow-text">{loginRole === 'admin' ? 'STORE MANAGEMENT' : 'WELCOME BACK'}</span>
            <h1>{loginRole === 'admin' ? 'Admin Portal Login' : 'Sign in to NexCart'}</h1>
            <p>{loginRole === 'admin' ? 'Enter admin credentials to manage store' : 'Enter your registered credentials to access your account'}</p>
          </div>

          {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">{loginRole === 'admin' ? 'Admin Email Address' : 'Email Address'}</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input 
                  id="email"
                  type="email" 
                  placeholder={loginRole === 'admin' ? 'admin@nexcart.dev' : 'you@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="password">Password</label>
                {loginRole === 'customer' && <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>}
              </div>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input 
                  id="password"
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

            <div className="form-options-row">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button type="submit" className="cta-btn primary full-width" disabled={loading}>
              {loading ? 'Signing in...' : (loginRole === 'admin' ? 'Login to Admin Dashboard' : 'Sign In')} <FiArrowRight />
            </button>
          </form>

          {loginRole === 'customer' && (
            <div className="auth-footer-prompt">
              Don't have an account yet? <Link to="/register">Create an account</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
