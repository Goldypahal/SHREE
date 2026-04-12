import { useCart } from '../context/CartContext';

const archiveItems = [
  { id: 'a1', era: "Couture 2026", category: "In Her Moment", name: "Rose Pink Couture Lehenga", price: 245000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=1200", description: "A hand-embroidered masterpiece in rose pink with delicate zardozi work." },
  { id: 'a2', era: "Couture 2026", category: "In Her Moment", name: "Coral Petal Lehenga", price: 185000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=1200", description: "Vibrant pink and coral hues interwoven with traditional heritage motifs." },
  { id: 'a3', era: "Couture 2026", category: "In Her Moment", name: "Baby Pink Zardozi Set", price: 215000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200", description: "Exquisite baby pink couture featuring architectural embroidery." },
  { id: 'a4', era: "Couture 2026", category: "In Her Moment", name: "Blush Ombre Couture", price: 195000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=1200", description: "A regal ombre transition from blush to deep rose in silk." },
  { id: 'a5', era: "Couture 2026", category: "In Her Moment", name: "Mauve Embroidered Sharara", price: 125000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/67.jpg?v=1763968812&width=1200", description: "Modern silhouettes meet traditional mauve embroidery." },
  { id: 'a6', era: "Couture 2026", category: "In Her Moment", name: "Emerald Crushed Ensemble", price: 165000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/qw_35130be0-f48f-4b8c-aeec-0c58beaeb876.jpg?v=1771402739&width=1200", description: "A deep emerald green lehenga for the contemporary bride." },
  { id: 'a7', era: "Bride Story", category: "Real Brides", name: "Nocteele Grey Drape", price: 275000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/WhatsAppImage2026-01-16at13.12.14_1.jpg?v=1769078624&width=1200", description: "Maihma in our signature Nocteele grey drape lehenga." },
  { id: 'a8', era: "Bride Story", category: "Real Brides", name: "Serenade Pink Mirror", price: 225000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/N_G-DayThree-186.jpg?v=1769077176&width=1200", description: "Natasha Vora shines in our Serenade pink mirror-work lehenga." },
  { id: 'a9', era: "Bride Story", category: "Real Brides", name: "Navy Blue Tulle Work", price: 235000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/Paolo_Avleenday3_0764.jpg?v=1769076254&width=1200", description: "Avleen Kaur in our navy blue tulle bridal couture." },
  { id: 'a10', era: "Bride Story", category: "Real Brides", name: "Peach Georgette Couture", price: 185000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/It_sraretofindbrideslikeAnaqatwhoseinnerradianceamplifiesanyandalltheglamonecan.jpg?v=1769068111&width=1200", description: "Anaqat Kamboj in a custom peach georgette chevron lehenga." },
  { id: 'a11', era: "Collection 2025", category: "Festive", name: "Golden Dust Anarkali", price: 95000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/46_004bfc4c-cc05-44a1-996b-5194d5fb0877.jpg?v=1763966350&width=1200", description: "A flowing golden silhouette emphasizing craftsmanship." },
  { id: 'a12', era: "Collection 2025", category: "Festive", name: "Ruby Silk Gown", price: 85000, image: "https://www.tamannapunjabikapoor.com/cdn/shop/files/54.jpg?v=1763966774&width=1200", description: "Deep ruby silk gown with hand-applied gota patti." }
];

function Archive() {
  const { openProductModal } = useCart();

  return (
    <div className="archive-page" style={{ background: '#fff' }}>

      {/* Full-screen Hero — transparent navbar overlays this */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}>
        <img
          src="https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=1920"
          alt="Gallery Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }}
        />
        {/* Gradient overlay for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 'clamp(25px,5vw,80px)',
          color: 'white',
        }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '5px', color: 'var(--accent)', fontWeight: '700', marginBottom: '20px' }}>
            Masterpiece Archives
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,90px)', fontWeight: '400', letterSpacing: 'clamp(2px,0.5vw,4px)', lineHeight: '1', marginBottom: '20px', textTransform: 'uppercase', wordBreak: 'break-word' }}>
            The Curated<br />Vault
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(255,255,255,0.75)', maxWidth: '480px', lineHeight: '1.8', letterSpacing: '0.5px' }}>
            A legacy of threads, moments, and heritage. Every piece is a testament to the artisans of Punjab.
          </p>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="container" style={{ paddingTop: 'clamp(60px,8vw,100px)', paddingBottom: 'clamp(60px,10vw,120px)' }}>
        <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px), 1fr))', gap: 'clamp(30px,4vw,50px)' }}>
          {archiveItems.map((item, i) => (
            <div key={i} className="archive-card reveal" style={{ opacity: 1, transform: 'none', cursor: 'pointer' }} onClick={() => openProductModal(item)}>
              <div style={{ aspectRatio: '3/4', background: '#f8f8f8', marginBottom: '25px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '0 10px' }}>
                <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.era} — {item.category}</span>
                <h3 style={{ fontSize: '22px', margin: '15px 0', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>{item.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7' }}>{item.description}</p>
                <button 
                   style={{ marginTop: '20px', background: 'transparent', border: 'none', borderBottom: '1px solid black', paddingBottom: '5px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', fontWeight: '600' }}
                   onClick={(e) => { e.stopPropagation(); openProductModal(item); }}
                >
                  View Details & Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Archive;
