import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhoneCall, FiMapPin, FiClock, FiSend, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();
  const { storeInfo } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    addToast('Thank you! Your message has been sent. We will reply within 24 hours.', 'success');
  };

  return (
    <div className="contact-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Contact Us</span>
      </div>

      <div className="contact-header">
        <h1>We're here to help</h1>
        <p>Have a question about an order, return, or product recommendation? Reach out to us below.</p>
      </div>

      <div className="contact-grid-layout">
        {/* Left Column: Info Cards */}
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon"><FiMail /></div>
            <div>
              <h4>Email Support</h4>
              <p>{storeInfo?.email || 'support@nexcart.dev'}</p>
              <small>Average response time: &lt; 2 hours</small>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><FiPhoneCall /></div>
            <div>
              <h4>Customer Hotline</h4>
              <p>{storeInfo?.phone || '+91 (800) 420-NEX (639)'}</p>
              <small>Toll-free across India</small>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><FiClock /></div>
            <div>
              <h4>Support Hours</h4>
              <p>Monday – Sunday: 9:00 AM – 9:00 PM IST</p>
              <small>24/7 automated order tracking</small>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><FiMapPin /></div>
            <div>
              <h4>Headquarters</h4>
              <p>{storeInfo?.address || '42 Tech Hub Avenue, 5th Floor, Bengaluru, Karnataka 560001'}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-card">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Send us a message</h3>

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
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option value="Order Inquiry">Order Inquiry & Tracking</option>
                  <option value="Returns">Returns & Refunds</option>
                  <option value="Product Question">Product Specification Question</option>
                  <option value="Feedback">Store Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we assist you today?" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="cta-btn primary lg full-width">
                Send Message <FiSend />
              </button>
            </form>
          ) : (
            <div className="contact-success-state">
              <FiCheckCircle className="success-icon" />
              <h2>Message Received!</h2>
              <p>Thank you <strong>{name}</strong>. Our customer support team has received your message and will respond to <strong>{email}</strong> shortly.</p>
              <button className="cta-btn primary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
