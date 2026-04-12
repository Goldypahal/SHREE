import React, { useState } from 'react';
import { inquiriesAPI } from '../api';

function Inquiries() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Other', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await inquiriesAPI.submit(form);
      setSuccess(true);
      setForm({ name: '', email: '', type: 'Other', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inquiries-page" style={{ overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{
        height: '60vh',
        minHeight: '320px',
        background: 'url(https://www.tamannapunjabikapoor.com/cdn/shop/files/qw_35130be0-f48f-4b8c-aeec-0c58beaeb876.jpg?v=1771402739&width=3840) center/cover no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 'clamp(40px,8vh,80px)',
        marginBottom: 'clamp(50px,8vw,100px)',
        overflowX: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: 'clamp(10px,1.5vw,13px)', fontWeight: '700' }}>
            Collaborate With Us
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px,8vw,90px)',
            marginTop: '20px',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(2px,0.5vw,4px)',
            lineHeight: '1.05',
            wordBreak: 'break-word',
          }}>
            Inquiries
          </h1>
        </div>
      </section>

      {/* Content — two columns stacked on mobile */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
        gap: 'clamp(40px,6vw,100px)',
        marginBottom: 'clamp(60px,8vw,100px)',
        alignItems: 'start',
      }}>

        {/* Left: info */}
        <div>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: 'clamp(10px,1.5vw,13px)', fontWeight: '700' }}>
            Collaborate With Us
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,64px)', marginTop: '20px', marginBottom: '30px', lineHeight: '1.1', wordBreak: 'break-word' }}>
            Let's Connect
          </h2>
          <p style={{ fontSize: 'clamp(14px,1.5vw,18px)', color: '#666', marginBottom: '40px', lineHeight: '1.8' }}>
            Whether you are a designer looking to showcase your work, a collector interested in our gallery pieces, or an artisan wanting to join the collective, we'd love to hear from you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className="fab fa-instagram" style={{ fontSize: '24px', color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Instagram</h4>
                <p style={{ color: '#888', fontSize: '14px' }}>@shree_collective</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <i className="fas fa-envelope" style={{ fontSize: '24px', color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Email</h4>
                <p style={{ color: '#888', fontSize: '14px' }}>hello@shreecollective.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: 'clamp(25px,4vw,60px)', background: '#fcfcfc', border: '1px solid #eee' }}
        >
          {success && (
            <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', padding: '15px', color: '#2e7d32', borderRadius: '4px', fontSize: '14px' }}>
              ✅ Your inquiry has been received. We will be in touch.
            </div>
          )}
          {error && (
            <div style={{ background: '#ffebee', border: '1px solid #ef9a9a', padding: '15px', color: '#c62828', borderRadius: '4px', fontSize: '14px' }}>
              ❌ {error}
            </div>
          )}

          {/* Name + Email in one row on desktop, stacked on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '15px' }}>
            <input
              type="text" name="name" placeholder="Full Name"
              value={form.name} onChange={handleChange} required
              style={{ padding: '15px', border: '1px solid #ddd', background: 'transparent', width: '100%', fontSize: '14px' }}
            />
            <input
              type="email" name="email" placeholder="Email Address"
              value={form.email} onChange={handleChange} required
              style={{ padding: '15px', border: '1px solid #ddd', background: 'transparent', width: '100%', fontSize: '14px' }}
            />
          </div>

          <select
            name="type" value={form.type} onChange={handleChange} required
            style={{ padding: '15px', border: '1px solid #ddd', background: 'transparent', color: '#666', fontSize: '14px', width: '100%' }}
          >
            <option value="">Nature of Inquiry</option>
            <option>Designer Showcase</option>
            <option>Artisan Application</option>
            <option>Collection Purchase Inquiry</option>
            <option>Other</option>
          </select>

          <textarea
            name="message" placeholder="Your Message" rows="6"
            value={form.message} onChange={handleChange} required
            style={{ padding: '15px', border: '1px solid #ddd', background: 'transparent', fontSize: '14px', resize: 'vertical', width: '100%' }}
          />

          <button
            type="submit" className="video-btn" disabled={loading}
            style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '20px', opacity: loading ? 0.7 : 1, width: '100%', textAlign: 'center' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inquiries;
