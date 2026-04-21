import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productsAPI } from '../api';
import { products as localProducts } from '../data/products';

const Skeleton = ({ className, style }) => (
  <div className={`skeleton ${className}`} style={style} />
);

const ProductCardSkeleton = () => (
  <div className="archive-card">
    <div style={{ aspectRatio: '3/4', background: '#f8f8f8', marginBottom: '25px' }}>
      <Skeleton className="skeleton-rect" style={{ height: '100%' }} />
    </div>
    <div style={{ padding: '0 10px' }}>
      <Skeleton className="skeleton-title" style={{ width: '40%', height: '14px', marginBottom: '15px' }} />
      <Skeleton className="skeleton-title" style={{ width: '80%', height: '28px', marginBottom: '15px' }} />
      <Skeleton className="skeleton-text" style={{ width: '100%', height: '14px', marginBottom: '8px' }} />
      <Skeleton className="skeleton-text" style={{ width: '90%', height: '14px', marginBottom: '20px' }} />
      <Skeleton className="skeleton-rect" style={{ width: '150px', height: '20px' }} />
    </div>
  </div>
);

function Archive() {
  const { openProductModal } = useCart();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await productsAPI.getAll();
        if (fetched.length > 0) {
          setProducts(fetched);
        } else {
          setProducts(localProducts);
        }
      } catch (err) {
        console.error('API Error:', err);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterFromState = location.state?.filterCategory;
    if (filterFromState) {
      setActiveFilter(filterFromState);
    } else {
      setActiveFilter(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (!activeFilter) {
      setFilteredProducts(products);
    } else {
      const lowerFilter = activeFilter.toLowerCase();
      const filtered = products.filter(p => 
        p.category.toLowerCase().includes(lowerFilter) || 
        p.name.toLowerCase().includes(lowerFilter) ||
        p.description.toLowerCase().includes(lowerFilter)
      );
      setFilteredProducts(filtered);
    }
  }, [activeFilter, products]);

  return (
    <div className="archive-page" style={{ background: '#fff' }}>
      {/* Full-screen Hero */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '60vh',
        overflow: 'hidden',
      }}>
        <img
          src="https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=1920"
          alt="Gallery Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '5px', color: 'var(--accent)', fontWeight: '700', marginBottom: '20px' }}>
            The Vault
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,64px)', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {activeFilter ? activeFilter : 'CURATED ARCHIVES'}
          </h1>
          {activeFilter && (
            <button 
              onClick={() => setActiveFilter(null)}
              style={{ 
                marginTop: '30px', 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.3)', 
                color: 'white', 
                padding: '10px 25px', 
                fontSize: '11px', 
                letterSpacing: '2px', 
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px' 
              }}
            >
              BROWSE ALL COLLECTIONS
            </button>
          )}
        </div>
      </div>

      {/* Archive Grid */}
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        {loading ? (
          <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,300px), 1fr))', gap: '50px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#666' }}>Moment not found in the archives.</h3>
            <p style={{ color: '#999', marginTop: '10px' }}>Try exploring our other signature edits.</p>
            <button 
              onClick={() => setActiveFilter(null)}
              style={{ marginTop: '30px', background: 'none', border: 'none', borderBottom: '1px solid black', paddingBottom: '5px', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px' }}
            >
              BROWSE EVERYTHING
            </button>
          </div>
        ) : (
          <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,350px), 1fr))', gap: '60px 40px' }}>
            {filteredProducts.map((item, i) => (
              <div key={item._id || i} className="archive-card reveal active" style={{ cursor: 'pointer' }} onClick={() => openProductModal(item)}>
                <div style={{ aspectRatio: '3/4', background: '#f8f8f8', marginBottom: '25px', overflow: 'hidden', position: 'relative' }}>
                  <MediaWithSkeleton item={item} />
                </div>
                <div style={{ padding: '0 10px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.category}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '15px' }}>
                    <h3 style={{ fontSize: '20px', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: '400' }}>{item.name}</h3>
                    <span style={{ fontSize: '14px', color: '#666' }}>₹{item.price?.toLocaleString()}</span>
                  </div>
                  <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7', marginTop: '15px', height: '4.8em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {item.description}
                  </p>
                  <button 
                    className="view-details-btn"
                    style={{ marginTop: '20px', border: 'none', background: 'none', padding: 0, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
                  >
                    View Couture Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MediaWithSkeleton({ item }) {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!loaded && <Skeleton className="skeleton-rect" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 1 }} />}
      
      {isHovered && item.videoUrl ? (
        <video
          src={item.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'opacity 0.5s ease',
            opacity: loaded ? 1 : 0
          }}
          onLoadedData={() => setLoaded(true)}
        />
      ) : (
        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setLoaded(true)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: loaded ? 1 : 0,
            transform: loaded && isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      )}
    </div>
  );
}

export default Archive;

