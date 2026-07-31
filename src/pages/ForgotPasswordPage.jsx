import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    addToast('Password reset link sent to your email address', 'success');
  };

  return (
    <section className="auth-page-container">
      <div className="auth-split-card single-column-card">
        <div className="auth-form-side full-width-padded">
          <Link to="/login" className="back-link">
            <FiArrowLeft /> Back to Login
          </Link>

          {!submitted ? (
            <>
              <div className="auth-header">
                <span className="eyebrow-text">PASSWORD RECOVERY</span>
                <h1>Reset your password</h1>
                <p>Enter the email address associated with your NexCart account and we'll send you a password reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="reset-email">Email Address</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input 
                      id="reset-email"
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="cta-btn primary full-width">
                  Send Reset Link <FiArrowRight />
                </button>
              </form>
            </>
          ) : (
            <div className="reset-success-box">
              <div className="success-icon-wrapper">
                <FiCheckCircle />
              </div>
              <h2>Check your inbox</h2>
              <p>We've sent a password reset email to <strong>{email}</strong>.</p>
              <p className="subtext">Click the link in the email to reset your password. If you don't see it, check your spam folder.</p>
              <button className="cta-btn secondary full-width" onClick={() => setSubmitted(false)}>
                Try another email address
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
