import React from 'react';

function Vision() {
  return (
    <div className="vision-page" style={{ overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{
        height: '90vh',
        background: 'url(https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=3840) center/cover no-repeat',
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        paddingBottom: 'clamp(40px, 8vh, 80px)',
        overflowX: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: 'clamp(10px,1.5vw,13px)', fontWeight: '700' }}>
            Our Purpose
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 8vw, 90px)',
            marginTop: '20px',
            lineHeight: '1',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(2px, 0.5vw, 4px)',
            wordBreak: 'break-word',
          }}>
            Preserving<br />Punjabi Heritage
          </h1>
        </div>
      </section>

      {/* Two-column content */}
      <section className="container" style={{ padding: 'clamp(60px,8vw,100px) 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 'clamp(40px,6vw,100px)' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,4vw,40px)', marginBottom: '30px' }}>Why We Created SHREE</h2>
          <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: '#666', lineHeight: '1.8' }}>
            The SHREE collective was born from a desire to bridge the gap between traditional Punjabi craftsmanship and the global stage. We saw ancient techniques fading and livelihoods disappearing, and we knew we had to act.
          </p>
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,4vw,40px)', marginBottom: '30px' }}>Supporting Local Artisans</h2>
          <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: '#666', lineHeight: '1.8' }}>
            By providing a digital platform and direct access to global inquiries, we empower our artisans to continue their legacy. Supporting SHREE is supporting the families that have kept our culture alive for centuries.
          </p>
        </div>
      </section>

      {/* Quote section */}
      <section style={{ background: 'var(--dark-bg)', color: 'white', padding: 'clamp(80px,10vw,150px) 0', textAlign: 'center', overflowX: 'hidden' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,4vw,56px)', marginBottom: '40px', color: 'var(--accent)', wordBreak: 'break-word' }}>
            An Emotional + Purposeful Journey
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(15px,1.5vw,20px)', opacity: '0.8', lineHeight: '1.8' }}>
            "Our mission is to ensure that the Phulkari of tomorrow is as vibrant and storied as the Phulkari of yesterday."
          </p>
        </div>
      </section>
    </div>
  );
}

export default Vision;
