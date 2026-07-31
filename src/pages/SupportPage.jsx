import React, { useState } from 'react';
import { FiHelpCircle, FiMessageSquare, FiPhoneCall, FiMail, FiArrowRight } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function SupportPage() {
  const { showToast } = useToast();
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    showToast('Support ticket submitted! Ticket ID #TK-9482 assigned.', 'success');
    setSubject('');
    setDetails('');
  };

  return (
    <div className="support-page-container">
      <div className="support-hero">
        <div className="hero-badge"><FiHelpCircle /> 24x7 CUSTOMER CARE</div>
        <h1>How can we help you today?</h1>
        <p>Get instant answers regarding order tracking, refunds, warranty claims, and account management.</p>
      </div>

      <div className="support-channels-grid margin-top">
        <div className="channel-card">
          <div className="icon blue"><FiMessageSquare /></div>
          <h3>Live Chat Support</h3>
          <p>Connect with a customer representative in under 2 minutes.</p>
          <button className="cta-btn secondary" onClick={() => showToast('Connecting to live chat advisor...', 'info')}>
            Start Live Chat
          </button>
        </div>

        <div className="channel-card">
          <div className="icon green"><FiPhoneCall /></div>
          <h3>Helpline Support</h3>
          <p>Call toll-free for immediate assistance on urgent orders.</p>
          <a href="tel:+91800420639" className="cta-btn outline">+91 (800) 420-NEX</a>
        </div>

        <div className="channel-card">
          <div className="icon purple"><FiMail /></div>
          <h3>Email Support</h3>
          <p>Send an email for returns, invoices, and business queries.</p>
          <a href="mailto:support@nexcart.dev" className="cta-btn outline">support@nexcart.dev</a>
        </div>
      </div>

      <div className="support-ticket-box margin-top-lg">
        <h2>Submit a Support Ticket</h2>
        <form onSubmit={handleTicketSubmit} className="ticket-form margin-top">
          <div className="form-group">
            <label>Issue Subject</label>
            <input 
              type="text" 
              placeholder="e.g. Order #849204 delivery inquiry" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required 
            />
          </div>
          <div className="form-group margin-top">
            <label>Detailed Description</label>
            <textarea 
              rows={4} 
              placeholder="Please provide order ID and issue details..." 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="cta-btn primary lg margin-top">
            Submit Support Ticket <FiArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
