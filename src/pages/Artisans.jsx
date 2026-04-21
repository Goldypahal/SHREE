import React, { useState } from 'react';

const Skeleton = ({ className, style }) => (
  <div className={`skeleton ${className}`} style={style} />
);

const artisans = [
  { name: "Ananya Sharma", role: "Master Embroidery Artist", special: "Phulkari", bio: "With over 20 years of experience, Ananya preserves the ancient art of thread work.", image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=832" },
  { name: "Rahul Dev", role: "Handloom Weaver", special: "Patiala Silk", bio: "Rahul's family has been weaving for three generations, maintaining the highest quality.", image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=832" },
  { name: "Sita Kumari", role: "Block Print Master", special: "Ludhiana Prints", bio: "Sita combines traditional motifs with modern ink technology for unique textiles.", image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/46_004bfc4c-cc05-44a1-996b-5194d5fb0877.jpg?v=1763966350&width=832" },
  { name: "Vikram Singh", role: "Zardozi Specialist", special: "Bridal Gold Work", bio: "Vikram's intricate gold thread work is a staple in bridal collections.", image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=832" }
];

function Artisans() {
  return (
    <div className="artisans-page" style={{ paddingBottom: 'clamp(60px,10vw,120px)', overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{
        height: '70vh',
        minHeight: '360px',
        background: 'url(https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=3840) center/cover no-repeat',
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
            The Creators
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 8vw, 90px)',
            marginTop: '20px',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(2px, 0.5vw, 4px)',
            lineHeight: '1.05',
            wordBreak: 'break-word',
          }}>
            The Master<br />Artisans
          </h1>
          <p style={{ maxWidth: '600px', fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.8)', marginTop: '20px', lineHeight: '1.6' }}>
            Meet the Karigars and designers whose hands shape the future of Punjabi heritage.
          </p>
        </div>
      </section>

      {/* Artisans Grid */}
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
          gap: 'clamp(30px,4vw,60px)',
        }}>
          {artisans.map((artisan, i) => (
            <div key={i} className="artisan-card reveal active" style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#fcfcfc',
              padding: 'clamp(20px,3vw,40px)',
              border: '1px solid #f0f0f0',
              gap: '20px',
            }}>
              <div style={{ width: '100%', height: 'clamp(200px,35vw,280px)', overflow: 'hidden', position: 'relative' }}>
                <ImageWithSkeleton src={artisan.image} alt={artisan.name} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{artisan.special}</span>
                <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', margin: '10px 0', fontFamily: 'var(--font-serif)' }}>{artisan.name}</h3>
                <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.6', fontSize: 'clamp(13px,1.2vw,15px)' }}>{artisan.role}</p>
                <p style={{ color: '#444', marginBottom: '20px', lineHeight: '1.6', fontSize: 'clamp(13px,1.2vw,15px)' }}>{artisan.bio}</p>
                <button className="video-btn" style={{ color: 'black', borderColor: 'black', padding: '10px 20px', fontSize: '10px', alignSelf: 'flex-start' }}>View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageWithSkeleton({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Skeleton className="skeleton-rect" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1 }} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transition: 'all 1s ease',
          opacity: loaded ? 1 : 0,
        }}
      />
    </>
  );
}

export default Artisans;
