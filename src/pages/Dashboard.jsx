import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Package, Settings, LogOut, LayoutGrid, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getLocalUser, logoutUser } from '../api';
import { productsAPI } from '../api';

const Dashboard = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const navigate = useNavigate();

  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await productsAPI.seed();
      alert(`✅ ${result.message}`);
    } catch (err) {
      alert(`❌ Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  React.useEffect(() => {
    const localUser = getLocalUser();
    if (localUser) {
      setUser({
        name: localUser.name,
        email: localUser.email,
        role: localUser.role === 'admin' ? 'Admin' : 'Collector',
      });
    } else {
      navigate('/auth');
    }
    setLoading(false);
  }, [navigate]);

  const handleSignOut = () => {
    logoutUser();
    navigate('/auth');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc' }}>
      Loading...
    </div>
  );
  if (!user) return null;

  const savedItems = [
    { id: 1, title: "Floral Symphony in Silk", img: "https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=832" },
    { id: 2, title: "The Leheriya Study", img: "https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=832" }
  ];

  return (
    <div className="dashboard-page" style={{ paddingTop: '120px', minHeight: '100vh', background: '#fcfcfc' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '60px' }}>

        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-profile-card" style={{ background: 'white', padding: '30px', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px', textAlign: 'center' }}>
            <div className="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>{user.name}</h3>
            <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{user.role}</p>
            <p style={{ fontSize: '11px', color: '#aaa', marginTop: '5px' }}>{user.email}</p>
          </div>

          <nav className="dashboard-nav" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: <LayoutGrid size={18} />, label: "Overview", active: true },
              { icon: <Heart size={18} />, label: "The Vault" },
              { icon: <Package size={18} />, label: "My Orders" },
              { icon: <Database size={18} />, label: syncing ? "Syncing..." : "Sync Products", onClick: handleSync },
              { icon: <Settings size={18} />, label: "Settings" },
              { icon: <LogOut size={18} />, label: "Sign Out", onClick: handleSignOut }
            ].map((item, i) => (
              <div key={i} onClick={item.onClick} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '15px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                background: item.active ? 'var(--dark-bg)' : 'transparent',
                color: item.active ? 'white' : '#666',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'var(--transition-smooth)'
              }}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', marginBottom: '10px' }}>The Vault</h1>
            <p style={{ color: '#666' }}>Your curated collection of heritage and design.</p>
          </header>

          <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {savedItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}
              >
                <div style={{ height: '350px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{item.title}</h4>
                    <span style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase' }}>Added 2 days ago</span>
                  </div>
                  <Heart size={20} fill="var(--accent)" color="var(--accent)" style={{ cursor: 'pointer' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
