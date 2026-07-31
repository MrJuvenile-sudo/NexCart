import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiChevronDown, FiSearch, FiChevronRight, FiPhoneCall, FiMail } from 'react-icons/fi';
import { FAQS } from '../data/mockData';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-page-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Help & FAQs</span>
      </div>

      <div className="faq-hero-section">
        <FiHelpCircle className="faq-hero-icon" />
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about shipping, returns, payment security, and order tracking.</p>

        <div className="faq-search-box">
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search keywords (e.g. returns, coupons, shipping)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="faq-accordion-list">
        {filteredFaqs.length === 0 ? (
          <p className="no-faqs">No matching questions found for "{searchQuery}".</p>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
              <button 
                className="faq-question-trigger"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <FiChevronDown className="arrow-icon" />
              </button>
              {openIndex === idx && (
                <div className="faq-answer-body">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="faq-support-box">
        <h3>Still have questions?</h3>
        <p>Our customer support team is available 7 days a week to help you.</p>
        <div className="support-links-row">
          <Link to="/contact" className="cta-btn primary"><FiMail /> Contact Support</Link>
          <a href="tel:+91800420639" className="cta-btn secondary"><FiPhoneCall /> Call +91 (800) 420-NEX</a>
        </div>
      </div>
    </div>
  );
}
