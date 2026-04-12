import React from 'react';

const exhibitions = [
  { status: "Upcoming", location: "Ludhiana", title: "The Heritage Showcase", date: "June 15, 2026", desc: "A live demonstration of Phulkari weaving and modern silhouettes.", img: "https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200" },
  { status: "Upcoming", location: "Amritsar", title: "Artisan Residency", date: "August 20, 2026", desc: "An intimate look into the lives and studios of our master karigars.", img: "https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=1200" },
  { status: "Past", location: "Delhi", title: "The Silk Road Reboot", date: "February 2025", desc: "A successful showcase of our bridal heritage collection.", img: "https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200" }
];

function Exhibitions() {
  return (
    <div className="exhibitions-page" style={{ paddingBottom: 'clamp(60px,10vw,120px)', overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{
        height: '70vh',
        minHeight: '360px',
        background: 'url(https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=3840) center/cover no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 'clamp(40px,8vh,80px)',
        marginBottom: 'clamp(50px,8vw,100px)',
        overflowX: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: 'clamp(10px,1.5vw,13px)', fontWeight: '700' }}>
            Active Showcases
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
            Exhibitions<br />& Events
          </h1>
        </div>
      </section>

      {/* Exhibition list */}
      <div className="container">
        {exhibitions.map((event, i) => (
          <div key={i} style={{
            marginBottom: 'clamp(60px,8vw,120px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
            gap: 'clamp(30px,4vw,60px)',
            alignItems: 'center',
          }}>
            {/* Image — always on top on mobile */}
            <div style={{ order: 0 }}>
              <img
                src={event.img}
                alt={event.location}
                style={{ width: '100%', height: 'clamp(220px,35vw,400px)', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
              />
            </div>
            {/* Text */}
            <div style={{ order: 1 }}>
              <span style={{
                fontSize: '12px', padding: '5px 15px',
                background: event.status === 'Upcoming' ? 'var(--accent)' : '#eee',
                color: event.status === 'Upcoming' ? 'white' : '#666',
                borderRadius: '50px', fontWeight: '700', textTransform: 'uppercase'
              }}>{event.status}</span>
              <span style={{ marginLeft: '15px', fontWeight: '600', color: '#999', fontSize: '14px' }}>{event.location}</span>
              <h3 style={{ fontSize: 'clamp(22px,3.5vw,36px)', margin: '20px 0', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>{event.title}</h3>
              <p style={{ fontSize: 'clamp(13px,1.2vw,16px)', color: '#888', marginBottom: '10px' }}>{event.date}</p>
              <p style={{ fontSize: 'clamp(14px,1.5vw,18px)', color: '#444', lineHeight: '1.6' }}>{event.desc}</p>
              <button className="video-btn" style={{ color: 'black', borderColor: 'black', marginTop: '30px' }}>View Gallery</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exhibitions;
