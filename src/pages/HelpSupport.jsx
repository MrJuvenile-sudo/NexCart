import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiHelpCircle, FiChevronDown, 
  FiSend, FiChevronRight, FiRefreshCw, FiAlertCircle 
} from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

export default function HelpSupport() {
  const { showToast } = useToast();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [submittedTickets, setSubmittedTickets] = useState([]);

  // Live chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Aura, your NexCart Virtual Support Advisor. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const supportFaqs = [
    { q: "How can I track my shipment status?", cat: "shipping", a: "You can track your package by entering your 6-digit Order ID on our tracking page. Alternatively, click the 'Track Order' option under your profile dropdown menu." },
    { q: "What is your refund processing timeline?", cat: "payments", a: "Once your returned items pass auditing at our warehouse (typically 48 hours), the refund is processed immediately. UPI and Wallet refunds credit in 2 hours; Credit/Debit cards take 3-5 business days." },
    { q: "Can I edit or cancel my order after placing it?", cat: "orders", a: "Orders can only be modified or cancelled within 60 minutes of checkout. Go to My Orders page and click 'Cancel Order' if it hasn't entered fulfillment state." },
    { q: "Is Cash on Delivery (COD) supported?", cat: "payments", a: "Yes, COD is available for most pin codes across India on order totals under ₹10,000. Ensure you verify the OTP sent to your registered mobile at delivery." },
    { q: "How do I claim product brand warranties?", cat: "warranty", a: "All electronics and appliances come with full brand warranties. Contact details are inside the package, or submit a request to support for a brand authorized tax invoice copy." }
  ];

  const filteredFaqs = supportFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketBody) return;

    const mockId = Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      id: `TK-${mockId}`,
      subject: ticketSubject,
      body: ticketBody,
      priority: ticketPriority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-IN')
    };

    setSubmittedTickets(prev => [newTicket, ...prev]);
    showToast(`Support Ticket #${newTicket.id} created successfully!`, 'success');
    setTicketSubject('');
    setTicketBody('');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I apologize, I didn't quite catch that. Could you please specify if your query relates to 'returns', 'refunds', 'delivery', or 'payment'?";
      
      const lowerText = userText.toLowerCase();
      if (lowerText.includes('return') || lowerText.includes('refund')) {
        botResponse = "We offer a 14-day easy return policy. Refunds are processed back to original modes within 3-5 days after doorstep pick-up passes audit.";
      } else if (lowerText.includes('delivery') || lowerText.includes('shipping') || lowerText.includes('track')) {
        botResponse = "Standard shipping is free above ₹999. You can track packages live via the Track Order link in the subheader navigation.";
      } else if (lowerText.includes('payment') || lowerText.includes('coupon') || lowerText.includes('cod')) {
        botResponse = "We support UPI, Netbanking, Credit Cards, and COD under ₹10,000. Apply coupon code WELCOME20 for an extra 20% discount.";
      } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
        botResponse = "Hello! I can guide you through returns, tracking, coupons, or order problems. Please type your query.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="help-support-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <FiChevronRight /> <span>Help & Customer Care</span>
      </div>

      <div className="help-hero">
        <div style={{ display: 'inline-flex', background: '#e0e7ff', color: '#4f46e5', fontWeight: 'bold', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '15px' }}>
          <FiHelpCircle style={{ marginRight: '6px', alignSelf: 'center' }} /> NEXCARE CUSTOMER CENTER
        </div>
        <h1>How can we assist you today?</h1>
        <p>Search our detailed support files, start a live chat simulator with our support bot, or file a official ticket.</p>
        
        <div className="help-search-wrapper">
          <FiSearch className="help-search-icon" />
          <input 
            type="text" 
            placeholder="Type keywords (e.g. refund, cancellation, COD, warranty)..."
            className="help-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', margin: '40px 0' }}>
        
        {/* Left Column: FAQs & Search */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px', color: '#1c1b1a' }}>Frequently Answered Files</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #e6e2db', borderRadius: '12px', overflow: 'hidden' }}>
                    <button 
                      style={{ width: '100%', border: 'none', background: 'none', display: 'flex', justifyContent: 'space-between', padding: '16px 20px', textAlign: 'left', fontWeight: '600', cursor: 'pointer', color: '#1c1b1a' }}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 20px 20px', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', borderTop: '1px solid #e6e2db', paddingTop: '12px' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '20px', color: '#71717a', background: '#f9f7f2', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <FiAlertCircle /> No direct matches for "{searchQuery}".
              </div>
            )}
          </div>

          {/* Ticket Submission */}
          <div className="support-ticket-box" style={{ marginTop: '40px', padding: '30px' }}>
            <h2>File a Support Request</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '8px 0 20px 0' }}>Create an official escalation. Our customer experience advisors respond within 4 hours.</p>
            
            <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Issue Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Delayed package / missing invoice"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Severity Priority</label>
                <select 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                >
                  <option value="Low">Low - General query</option>
                  <option value="Medium">Medium - Standard issue</option>
                  <option value="High">High - Urgent / Order blocked</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description Details</label>
                <textarea 
                  rows={4} 
                  placeholder="Specify Order ID, item SKU, and detailed issue..."
                  value={ticketBody}
                  onChange={(e) => setTicketBody(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="cta-btn primary">Generate Support Ticket</button>
            </form>

            {submittedTickets.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '15px' }}>Your Filed Requests</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {submittedTickets.map(t => (
                    <div key={t.id} style={{ border: '1px solid #e6e2db', borderRadius: '8px', padding: '12px 16px', background: '#fcfcfc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{t.id} - {t.subject}</strong>
                        <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>{t.status}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>Priority: {t.priority} • Filed: {t.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Chat Simulator */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px', color: '#1c1b1a' }}>Instant Virtual Chat Assistant</h2>
          <div className="live-chat-card">
            <div className="chat-card-header">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                alt="Aura Advisor" 
                className="chat-advisor-avatar"
              />
              <div className="chat-header-info">
                <h4>Aura (AI Support)</h4>
                <div className="chat-status-active">Active Live Support</div>
              </div>
            </div>

            <div className="chat-messages-body">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`chat-bubble ${m.sender}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble bot" style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '8px 12px' }}>
                  <FiRefreshCw className="spin" style={{ fontSize: '0.85rem' }} /> <span>Aura is typing...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendChat} className="chat-input-row">
              <input 
                type="text" 
                placeholder="Ask about returns, delivery, payments..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="chat-send-btn" disabled={isTyping || !chatInput.trim()}>
                <FiSend />
              </button>
            </form>
          </div>

          <div style={{ marginTop: '25px', padding: '20px', borderRadius: '12px', background: '#f9f7f2', border: '1px solid #e6e2db' }}>
            <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '8px' }}>📞 Enterprise Phone Helpline</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.4' }}>
              Prefer to speak to a human? Call our toll-free customer loyalty center at <strong>+91 (800) 420-NCART</strong> (9 AM - 9 PM, Monday through Sunday).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
