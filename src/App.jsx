import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.css';

import { getLocalUser, authAPI, saveUser } from './api';
import { productsAPI } from './api';

// Pages
import Artisans from './pages/Artisans';
import Vision from './pages/Vision';
import Archive from './pages/Archive';
import Exhibitions from './pages/Exhibitions';
import Inquiries from './pages/Inquiries';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';

import { products as localProducts } from './data/products';
import { useCart } from './context/CartContext';

// --- SKELETON COMPONENTS ---
const Skeleton = ({ className, style }) => (
  <div className={`skeleton ${className}`} style={style} />
);

const ProductCardSkeleton = () => (
  <div className="carousel-item">
    <div className="carousel-card">
      <Skeleton className="skeleton-rect" style={{ height: '500px' }} />
    </div>
    <div className="product-card-footer" style={{ marginTop: '15px' }}>
      <Skeleton className="skeleton-title" style={{ width: '70%', height: '20px' }} />
      <Skeleton className="skeleton-text" style={{ width: '40%', height: '14px' }} />
      <Skeleton className="skeleton-rect" style={{ height: '40px', marginTop: '10px' }} />
    </div>
  </div>
);

const HeroSkeleton = () => (
  <section className="hero-video-container" style={{ background: '#f8f8f8' }}>
    <Skeleton className="skeleton-rect" />
    <div className="hero-content">
      <Skeleton className="skeleton-title" style={{ width: '150px', height: '15px', marginBottom: '20px' }} />
      <Skeleton className="skeleton-title" style={{ width: '70%', height: '100px', marginBottom: '20px' }} />
      <Skeleton className="skeleton-text" style={{ width: '40%', height: '20px', marginBottom: '40px' }} />
      <div className="hero-btns">
        <Skeleton className="skeleton-rect" style={{ width: '200px', height: '50px' }} />
      </div>
    </div>
  </section>
);

const VideoSkeleton = () => (
  <div className="grid-item">
    <Skeleton className="skeleton-rect" />
  </div>
);

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}


const megaMenuData = {
  THE_COLLECTIVE: {
    title: "The Collective",
    intro: "Ever evolving, timeless at heart. A curated sanctuary of Indian couture that speaks to the modern soul while honoring the heritage of Punjab.",
    image: "/images/catalog/pink-lehenga.jpg",
    links: [
      { title: "Trending Collections", items: ["In Her Moment", "Serenade - Bridal", "Noctelle", "Sufiyaana"] },
      { title: "Signature Edits", items: ["Zooni", "Bridal Edit", "Maahru", "Amirah"] },
      { title: "Couture Silhouettes", items: ["Zardozi Lehengas", "Ombre Sets", "Contemporary Shararas"] }
    ]
  },
  ARTISANS: {
    title: "Artisans",
    intro: "Intricate embroidery work and precision craftsmanship. Our artisans breathe life into every thread, creating legacies that turn moments into memories.",
    image: "/images/catalog/rani-pink.jpg",
    links: [
      { title: "Craftsmanship", items: ["Zardozi", "Gota Patti", "Thread Work"] },
      { title: "Meet the Masters", items: ["Studio Punjab"] }
    ]
  },
  VISION: {
    title: "Vision",
    intro: "Where Moments Turn Into Memories. Our philosophy is rooted in old-world charm, designed for easy cuts that ignore the noise of passing trends.",
    image: "/images/catalog/ivory-chikankari.jpg",
    links: [
      { title: "Our Story", items: ["Heritage", "Modernity"] },
      { title: "Sustainability", items: ["Handloom", "Ethical Craft"] }
    ]
  }
};

const ProductCard = ({ product }) => {
  const { openProductModal, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  
  return (
    <div className="carousel-item">
      {/* Clickable image card */}
      <div 
        className="carousel-card reveal" 
        onClick={() => openProductModal(product)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!imageLoaded && <Skeleton className="skeleton-rect" style={{ position: 'absolute', top: 0, left: 0, height: '100%', zIndex: 1 }} />}
        
        {isHovered && product.videoUrl ? (
          <video
            ref={videoRef}
            src={product.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="product-card-video"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
          />
        )}

        <div className="carousel-overlay">
          <span className="carousel-tag">{product.category}</span>
          <h3 className="carousel-name">{product.name}</h3>
          <p style={{ fontSize: '14px', margin: '10px 0', opacity: 0.8 }}>₹{product.price.toLocaleString()}</p>
          
          <div className="size-picker" onClick={(e) => e.stopPropagation()} style={{ justifyContent: 'flex-start', margin: '15px 0' }}>
            {['S', 'M', 'L', 'XL'].map(size => (
              <button 
                key={size} 
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>

          <button 
            className="shop-now-btn" 
            style={{ marginTop: '10px', width: '100%' }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, selectedSize);
            }}
          >
            Add To Bag
          </button>
        </div>
      </div>

      {/* Always-visible info below card */}
      <div className="product-card-footer">
        <div className="product-card-meta">
          <h4>{product.name}</h4>
          <p>₹{product.price.toLocaleString()}</p>
        </div>
        <button
          className="view-details-btn"
          onClick={() => openProductModal(product)}
        >
          VIEW DETAILS &amp; REVIEWS
        </button>
      </div>
    </div>
  );
};

// LazyVideoGrid — grid videos only load & play when scrolled into view
const GRID_VIDEOS = [
  { src: "https://www.tamannapunjabikapoor.com/cdn/shop/videos/c/vp/20f60df686684776b5563f340775bce0/20f60df686684776b5563f340775bce0.HD-1080p-7.2Mbps-63005057.mp4?v=0", poster: "/images/catalog/pink-lehenga.jpg", label: "In Her Moment", href: "/archive" },
  { src: "https://www.tamannapunjabikapoor.com/cdn/shop/videos/c/vp/6896323f8e1c49c5b6fdddb611577180/6896323f8e1c49c5b6fdddb611577180.HD-1080p-7.2Mbps-52878130.mp4?v=0", poster: "/images/catalog/rani-pink.jpg", label: "Studio Craft", href: "/artisans" },
  { src: "https://www.tamannapunjabikapoor.com/cdn/shop/videos/c/vp/53f6a02bc5b443989356d04796895b8c/53f6a02bc5b443989356d04796895b8c.HD-1080p-7.2Mbps-61223084.mp4?v=0", poster: "/images/catalog/black-zardozi.jpg", label: "Noctelle Edit", href: "/archive" },
  { src: "https://www.tamannapunjabikapoor.com/cdn/shop/videos/c/vp/20f60df686684776b5563f340775bce0/20f60df686684776b5563f340775bce0.HD-1080p-7.2Mbps-63005057.mp4?v=0", poster: "/images/catalog/marwari-lehenga.jpg", label: "Heritage Bridal", href: "/archive" },
];

function LazyVideo({ src, poster, label, href }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters viewport
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  return (
    <div className="grid-item" ref={ref}>
      {!inView && <Skeleton className="skeleton-rect" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0 }} />}
      <video
        ref={videoRef}
        src={inView ? src : undefined}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
      />
      <div className="grid-overlay">
        <button className="grid-btn" onClick={() => window.location.href = href}>{label}</button>
      </div>
    </div>
  );
}

function LazyVideoGrid() {
  return (
    <section className="grid-loop-section reveal">
      {GRID_VIDEOS.map((v, i) => (
        <LazyVideo key={i} {...v} />
      ))}
    </section>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await productsAPI.getAll();
        if (fetched.length === 0) {
          setProducts(localProducts);
        } else {
          setProducts(fetched);
        }
      } catch (err) {
        console.error('Error fetching products from API, falling back to local:', err);
        setProducts(localProducts);
      } finally {
        setLoading(false);
        // Trigger reveal animation after a short delay to ensure DOM is updated
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!carouselRef.current || products.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      const { current } = carouselRef;
      const scrollAmount = current.offsetWidth / 2;
      
      if (current.scrollLeft + current.offsetWidth >= current.scrollWidth - 10) {
        current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [products, isPaused]);

  if (loading) return (
    <div className="home">
      <HeroSkeleton />
      <section className="collection-preview container">
        <div className="section-header">
          <Skeleton className="skeleton-title" style={{ margin: '0 auto 20px', width: '200px' }} />
          <Skeleton className="skeleton-title" style={{ margin: '0 auto 20px', width: '400px', height: '60px' }} />
        </div>
        <div className="carousel-container" style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
          {[1, 2, 3, 4].map(i => <ProductCardSkeleton key={i} />)}
        </div>
      </section>
      <section className="grid-loop-section">
        {[1, 2, 3, 4].map(i => <VideoSkeleton key={i} />)}
      </section>
    </div>
  );

  return (

    <div className="home">
      <section className="hero-video-container">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }}></div>

        {/* poster= shows instantly; preload=none means video only loads when browser is ready */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
          preload="auto"
          poster="/images/catalog/gallery-hero.jpg"
          src="https://www.tamannapunjabikapoor.com/cdn/shop/videos/c/vp/a8127fab6c7c4761b4d4129d0b410331/a8127fab6c7c4761b4d4129d0b410331.HD-1080p-4.8Mbps-63953119.mp4?v=0"
        />

        <div className="hero-content">
          <span className="hero-tag reveal">SPRING / SUMMER 2026</span>
          <h1 className="reveal">THE CHANDIGARH<br/>LEGACY</h1>
          <p className="reveal">A couture collection inspired by the grand architecture of contemporary Punjab.</p>
          <div className="hero-btns reveal">
            <button className="video-btn" onClick={() => window.location.href='/archive'}>EXPLORE THE ARCHIVE</button>
          </div>
        </div>
      </section>

      {/* Recent Collection (Carousel) */}
      <section className="collection-preview container" style={{ overflow: 'visible' }}>
        <div className="section-header">
          <span className="subtitle">THE RECENT LOOKS</span>
          <h2>THE COLLECTIVE</h2>
          <p className="section-intro">
            An intersection of traditional craftsmanship and modern silhouettes.
          </p>
        </div>
        
        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-nav-btn prev" onClick={() => carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' })}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="carousel-container" id="collection-carousel" ref={carouselRef}>
            {products.map(product => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>

          <button className="carousel-nav-btn next" onClick={() => carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' })}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>


      {/* Grid Loop Section — videos lazy-load on scroll */}
      <LazyVideoGrid />


      {/* Designers Section */}
      <section className="designers-section reveal">
        <div className="container designer-container">
          <div className="designer-image">
            <img src="/images/catalog/rani-pink.jpg" alt="Bridal Craft" />
          </div>
          <div className="designer-text">
            <span className="designer-tag">The Philosophy</span>
            <h2 className="designer-title">Old-World Charms</h2>
            <p className="designer-desc">
              "Every silhouette we create is a dialogue between legacy and lightness. We focus on intricate zardozi and gota patti work on cuts that move with the ease of a summer breeze."
            </p>
            <p className="designer-quote-author">— Label SHREE</p>
            <button className="video-btn designer-btn" onClick={() => window.location.href='/vision'}>Read Our Story</button>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="visit-section reveal">
        <div className="visit-bg">
          <img src="/images/catalog/gallery-hero.jpg" alt="Luxury Studio" />
          <div className="visit-overlay">
            <h2>LUXURY, TAILORED TO PERFECTION</h2>
            <div className="visit-actions">
              <div className="visit-btn-wrapper">
                <button className="visit-btn">VISIT STUDIO</button>
                <div className="visit-info">
                  <p>12/A Heritage Lane, Amritsar,</p>
                  <p>Punjab, India - 143001</p>
                </div>
              </div>
              <div className="visit-btn-wrapper">
                <button className="visit-btn" onClick={() => window.location.href='/inquiries'}>APPOINTMENT</button>
                <div className="visit-info">
                  <p>hello@shreecollect.com</p>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { 
    cartCount, 
    addToCart, 
    isProductModalOpen, 
    closeProductModal, 
    selectedProduct,
    openProductModal
  } = useCart();
  const location = useLocation();

  const isLightPage = ['/dashboard', '/checkout', '/auth'].includes(location.pathname);

  useEffect(() => {
    const localUser = getLocalUser();
    setUser(localUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isLightPage && !scrolled ? 'light-mode' : ''} ${mobileMenuOpen ? 'mobile-active' : ''}`} onMouseLeave={() => setActiveMenu(null)}>
        <div className="nav-left">
          <div className="nav-links desktop-only">
            {/* The Collective + Artisans from megaMenuData (skip Vision) */}
            {['THE_COLLECTIVE', 'ARTISANS'].map(key => {
              const path = key === 'THE_COLLECTIVE' ? '/' : `/${key.toLowerCase()}`;
              return (
                <NavLink
                  key={key}
                  to={path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveMenu(key)}
                >
                  {megaMenuData[key].title}
                </NavLink>
              );
            })}
            {/* Gallery added to topbar */}
            <NavLink
              to="/archive"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveMenu(null)}
            >
              Gallery
            </NavLink>
          </div>
        </div>


        <NavLink to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>SHREE</NavLink>

        <div className="nav-right">
          <div className="nav-icons">
            <button onClick={() => setSearchOpen(true)} aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
            {/* Account Button */}
            <NavLink
              to={user ? '/dashboard' : '/auth'}
              className="nav-account-btn"
              aria-label="Account"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              {user ? (
                <span className="nav-user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <i className="fas fa-user"></i>
              )}
            </NavLink>
            <button className="bag-btn-nav" onClick={() => setCartOpen(true)} aria-label="Shopping Bag">
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && <span className="bag-count">{cartCount}</span>}
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

      </nav>


      {/* Sidebar Menu */}
      <div className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`sidebar-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-links">

          {/* Main Navigation in Sidebar (for mobile) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {Object.keys(megaMenuData).map(key => {
              const path = key === 'THE_COLLECTIVE' ? '/' : `/${key.toLowerCase()}`;
              return (
                <NavLink 
                  key={key} 
                  to={path}
                  className="nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {megaMenuData[key].title}
                </NavLink>
              );
            })}
            <div className="sidebar-divider" />
          </div>

          {/* Vision moved from topbar to sidebar */}
          <NavLink
            to="/vision"
            className="nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            VISION
          </NavLink>
          <NavLink 
            to={user ? "/dashboard" : "/auth"} 
            className="nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            {user ? "DASHBOARD" : "ACCOUNT"}
          </NavLink>
          <NavLink 
            to="/inquiries" 
            className="nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            INQUIRIES
          </NavLink>
          
          <div className="sidebar-divider" />
          <p style={{ fontSize: '12px', color: '#999', letterSpacing: '1px' }}>CURATED BY SHREE COLLECTIVE</p>
        </div>
      </div>

      {/* Mega Menu Dropdown (Desktop Only) */}
      <div 
        className={`mega-menu ${activeMenu ? 'active' : ''} desktop-only`} 
        onMouseEnter={() => setActiveMenu(activeMenu)}
        onMouseLeave={() => setActiveMenu(null)}
      >

        {activeMenu && (
          <div className="mega-menu-content">
            <div className="mega-col-info">
              <h3>{megaMenuData[activeMenu].title}</h3>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                {megaMenuData[activeMenu].intro}
              </p>
              <div className="mega-col-image shadow-premium">
                {megaMenuData[activeMenu].image && (
                  <img src={megaMenuData[activeMenu].image} alt="Showcase" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
              </div>
            </div>
            <div className="mega-col-links">
              {megaMenuData[activeMenu].links.map((group, idx) => (
                <div key={idx} className="mega-link-block">
                  <h4>{group.title}</h4>
                  <ul>
                      {group.items.map((item, i) => {
                      const isArtisans = activeMenu === 'ARTISANS';
                      const destPath = isArtisans ? '/artisans' : '/archive';
                      return (
                        <li key={i}>
                          <Link 
                            to={destPath} 
                            state={{ filterCategory: item }}
                            style={{ color: 'inherit', textDecoration: 'none', display: 'block', padding: '4px 0' }}
                            onClick={() => { setActiveMenu(null); setMobileMenuOpen(false); }}
                          >
                            {item}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        onAuthRequired={() => setAuthModalOpen(true)}
        user={user}
      />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProductDetailModal 
        isOpen={isProductModalOpen} 
        onClose={closeProductModal} 
        product={selectedProduct}
        addToCart={addToCart}
      />

      <main>{children}</main>



      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-col">
            <h2 className="nav-logo" style={{ marginBottom: '30px' }}>SHREE</h2>
            <p style={{ color: '#666', maxWidth: '300px' }}>
              Bridging heritage and high-fashion. A sanctuary for the modern connoisseur of Punjabi couture.
            </p>
          </div>
          <div className="footer-col">
            <h4>Collections</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>The Collective</Link></li>
              <li><Link to="/artisans" style={{ color: 'inherit', textDecoration: 'none' }}>Artisans</Link></li>
              <li><Link to="/archive" style={{ color: 'inherit', textDecoration: 'none' }}>Archived Works</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/inquiries" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Orders</Link></li>
              <li><Link to="/inquiries" style={{ color: 'inherit', textDecoration: 'none' }}>Global Shipping</Link></li>
              <li><Link to="/inquiries" style={{ color: 'inherit', textDecoration: 'none' }}>Virtual Appointment</Link></li>
              <li><Link to="/inquiries" style={{ color: 'inherit', textDecoration: 'none' }}>Care Guide</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pinterest</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Vimeo</a></li>
            </ul>
          </div>
        </div>
        <div className="container" style={{ marginTop: '80px', paddingTop: '30px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '13px', color: '#999' }}>
          &copy; 2026 SHREE COLLECTIVE. INSPIRED BY THE LEGACY OF THE PUNJAB.
        </div>
      </footer>
    </div>
  );
}

const CartDrawer = ({ isOpen, onClose, onAuthRequired, user }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    if (!user) {
      onAuthRequired();
    } else {
      navigate('/checkout');
    }
  };


  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Your Bag</h2>
          <div className="cart-close" onClick={onClose}><i className="fas fa-times"></i></div>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>Your bag is currently empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-price">₹{item.price.toLocaleString()}</p>
                  <p style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', marginBottom: '10px' }}>Size: {item.size}</p>
                  <div className="cart-qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                    <button onClick={() => removeFromCart(item.id, item.size)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase' }}>Remove</button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Secure Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let userData;
      if (isLogin) {
        userData = await authAPI.login(email, password);
      } else {
        userData = await authAPI.register(name, email, password);
      }
      saveUser(userData);
      onClose();
      window.location.reload(); // refresh user state in navbar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay active" onClick={onClose} />
      <div className="auth-modal shadow-premium">
        <div className="auth-modal-close" onClick={onClose}><i className="fas fa-times"></i></div>
        <div className="auth-modal-content">
          <h2 className="nav-logo" style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '10px' }}>SHREE</h2>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '20px' }}>
            {isLogin ? 'Welcome back to the collective' : 'Join the SHREE legacy'}
          </p>
          {error && <div style={{ color: '#c62828', fontSize: '13px', marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>{error}</div>}
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            {!isLogin && (
              <input type="text" placeholder="Full Name" className="premium-input" value={name} onChange={e => setName(e.target.value)} required />
            )}
            <input type="email" placeholder="Email Address" className="premium-input" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="premium-input" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <button type="submit" className="checkout-btn" style={{ marginTop: '5px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '13px', color: '#666' }}>
            {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
            <span onClick={() => { setIsLogin(!isLogin); setError(null); }} style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate('/archive', { state: { filterCategory: query.trim() } });
      onClose();
      setQuery('');
    }
  };

  return (
    <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
      <div className="search-close" onClick={onClose}><i className="fas fa-times"></i></div>
      <div className="search-input-container">
        <input 
          type="text" 
          placeholder="Explore the collections (e.g. In Her Moment, Zooni...)" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          autoFocus 
        />
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '20px', fontSize: '12px', letterSpacing: '1px' }}>PRESS ENTER TO EXPLORE THE VAULT</p>
      </div>
    </div>
  );
};

const ProductDetailModal = ({ isOpen, onClose, product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isHovered, setIsHovered] = useState(false);
  const [sareeLength, setSareeLength] = useState(6);
  const { openProductModal } = useCart();

  const isSaree = product?.name?.toLowerCase().includes('saree') || product?.category?.toLowerCase().includes('saree');
  
  const calculatePrice = () => {
    if (!product) return 0;
    if (isSaree) {
      return Math.round((product.price / 6) * sareeLength);
    }
    return product.price;
  };

  const images = (product?.gallery && product.gallery.length > 0) 
    ? product.gallery 
    : [product?.image];

  useEffect(() => {
    if (!isOpen || images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, images.length, isHovered]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentImgIndex(0);
      setActiveTab('description');
    }
  }, [isOpen]);

  if (!product) return null;

  const relatedProducts = localProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const mockReviews = [
    { user: "Ravneet K.", rating: 5, date: "October 12, 2025", comment: "The embroidery is even more breathtaking in person. Truly a heirloom piece that I will cherish forever. The fit is perfect.", verified: true },
    { user: "Aman S.", rating: 4, date: "December 05, 2025", comment: "Exceptional quality and fit. The silk has a beautiful weight to it. Delivery was prompt and packaging was museum-grade.", verified: true },
    { user: "Priya M.", rating: 5, date: "January 20, 2026", comment: "Absolutely stunning! Wore it for my sister's wedding and received so many compliments. Worth every rupee.", verified: true }
  ];

  const reviews = product.reviews?.length > 0 ? product.reviews : mockReviews;
  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} style={{ zIndex: 3000 }} />
      <div className={`product-detail-modal ${isOpen ? 'active' : ''}`}>
        <div className="product-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </div>

        <div className="product-modal-container">
          {/* Left: Media Section */}
          <div 
            className="product-modal-media"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="main-image-viewport">
              {images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${product.name} ${idx}`} 
                  className={`modal-gallery-img ${currentImgIndex === idx ? 'active' : ''}`}
                />
              ))}
              
              <div className="gallery-nav-dots">
                {images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`dot ${currentImgIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentImgIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="thumbnail-strip">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumb-item ${currentImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentImgIndex(idx)}
                >
                  <img src={img} alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="product-modal-info">
            <div className="info-content-scroll">
              <nav className="breadcrumb">
                <span>Collections</span> / <span>{product.category}</span>
              </nav>

              <h2 className="product-title-premium">{product.name}</h2>
              
              <div className="rating-summary">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`${i < Math.floor(averageRating) ? 'fas' : 'far'} fa-star`}></i>
                  ))}
                </div>
                <span className="rating-text">{averageRating} ({reviews.length} Reviews)</span>
              </div>

              <p className="product-price-premium">₹{calculatePrice().toLocaleString()}</p>
              
              <div className="product-actions-premium">
                {isSaree ? (
                  <div className="saree-length-selector" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', letterSpacing: '1px' }}>
                      <span>SELECT LENGTH</span>
                      <span>{sareeLength}m</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="6" 
                      step="0.5" 
                      value={sareeLength} 
                      onChange={(e) => setSareeLength(parseFloat(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="size-selector-header">
                      <span>SELECT SIZE</span>
                      <button className="size-guide-btn">SIZE GUIDE</button>
                    </div>
                    <div className="size-options">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button 
                          key={size}
                          className={`size-option-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <button 
                  className="add-to-bag-premium"
                  onClick={() => {
                    const finalPrice = calculatePrice();
                    const itemToAdd = { ...product, price: finalPrice };
                    addToCart(itemToAdd, isSaree ? `${sareeLength}m` : selectedSize);
                    onClose();
                  }}
                >
                  ADD TO BAG — COMPLIMENTARY SHIPPING
                </button>
                <button className="wishlist-btn-premium"><i className="far fa-heart"></i> ADD TO WISHLIST</button>
              </div>

              {/* Tabs Section */}
              <div className="product-tabs-premium">
                <div className="tabs-header">
                  {['description', 'details', 'shipping'].map(tab => (
                    <button 
                      key={tab}
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="tab-content">
                  {activeTab === 'description' && (
                    <div className="tab-pane fade-in">
                      <p>{product.description || "A masterpiece of Punjabi heritage, handcrafted with precision and passion. This silhouette represents the transition from daylight to evening, featuring intricate hand-embroidery that catches the light with every movement."}</p>
                    </div>
                  )}
                  {activeTab === 'details' && (
                    <div className="tab-pane fade-in">
                      <ul className="details-list">
                        {product.details?.map((detail, idx) => <li key={idx}>{detail}</li>) || (
                          <>
                            <li>100% Raw Silk Base</li>
                            <li>Traditional Hand-work Zardozi</li>
                            <li>Dry Clean Only</li>
                            <li>Made in India</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="tab-pane fade-in">
                      <p>Complimentary express shipping on all orders. Each piece is made-to-order by our artisans and usually ships within 14-21 days.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="reviews-section-premium">
                <div className="reviews-header">
                  <h3>CLIENT VOICES</h3>
                  <button className="write-review-btn">WRITE A REVIEW</button>
                </div>
                <div className="reviews-list">
                  {reviews.map((rev, i) => (
                    <div key={i} className="review-card-premium">
                      <div className="review-top">
                        <span className="review-user">{rev.user}</span>
                        {rev.verified && <span className="verified-tag"><i className="fas fa-check-circle"></i> VERIFIED</span>}
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, star) => (
                          <i key={star} className={`${star < rev.rating ? 'fas' : 'far'} fa-star`}></i>
                        ))}
                      </div>
                      <p className="review-comment">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="related-products-premium">
                  <h3>YOU MAY ALSO LIKE</h3>
                  <div className="related-grid">
                    {relatedProducts.map(rp => (
                      <div key={rp.id} className="related-card" onClick={() => { openProductModal(rp); }}>
                        <img src={rp.image} alt={rp.name} />
                        <h4>{rp.name}</h4>
                        <p>₹{rp.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

      </Layout>
    </Router>
  );
}

export default App;
