import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength logic
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: '#e53e3e' };
    if (score <= 4) return { score, label: 'Medium', color: '#dd6b20' };
    return { score, label: 'Strong', color: '#38a169' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service to create your account.');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page-container">
      <div className="auth-split-card">
        {/* Left Side Aesthetic Banner */}
        <div className="auth-brand-side register-theme">
          <div className="brand-overlay-content">
            <Link to="/" className="brand-logo white">
              <b>Nex</b>Cart<span>.</span>
            </Link>
            <h2>Join our global shopping community.</h2>
            <p>Create your free NexCart account today and unlock exclusive shopper perks, wishlist syncing, and expedited checkout.</p>
            
            <div className="auth-perks-list">
              <div className="perk-item">
                <FiCheckCircle /> <span>Welcome 20% discount on first order</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle /> <span>Instant wishlist & cart persistence</span>
              </div>
              <div className="perk-item">
                <FiCheckCircle /> <span>Priority customer care & returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Register Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <span className="eyebrow-text">CREATE ACCOUNT</span>
            <h1>Join NexCart today</h1>
            <p>Enter your details below to get started</p>
          </div>

          {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input 
                  id="reg-name"
                  type="text" 
                  placeholder="e.g. Shubhank Parihar" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input 
                  id="reg-email"
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input 
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="At least 6 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password && (
                <div className="password-strength-meter">
                  <div className="meter-bar-track">
                    <div 
                      className="meter-bar-fill"
                      style={{ 
                        width: `${(strength.score / 5) * 100}%`,
                        backgroundColor: strength.color 
                      }} 
                    />
                  </div>
                  <span className="strength-label" style={{ color: strength.color }}>
                    Strength: <strong>{strength.label}</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input 
                  id="reg-confirm"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Repeat your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-options-row">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the Terms of Service & Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="cta-btn primary full-width" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'} <FiArrowRight />
            </button>
          </form>

          <div className="auth-footer-prompt">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
