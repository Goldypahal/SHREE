import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ordersAPI, getLocalUser } from '../api';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = React.useState(1);
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const savedAddresses = [
    { id: 1, name: 'Home', address: '123 Royal Estate, Mall Road', city: 'Amritsar', state: 'Punjab', zip: '143001' },
    { id: 2, name: 'Studio', address: '45 Artisan Block, Heritage Way', city: 'Chandigarh', state: 'Punjab', zip: '160001' }
  ];

  const handlePlaceOrder = async () => {
    const user = getLocalUser();
    if (!user) {
      alert('Please sign in to complete your order.');
      navigate('/auth');
      return;
    }

    setIsProcessing(true);
    try {
      const selectedAddr = savedAddresses.find(a => a.id === selectedAddressId);

      const orderData = {
        items: cartItems.map(item => ({
          productId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image,
        })),
        total: cartTotal,
        paymentMethod,
        shippingAddress: selectedAddr,
      };

      await ordersAPI.create(orderData);

      clearCart();
      navigate('/dashboard');
      alert('Thank you for your order. Your heritage piece is being prepared.');
    } catch (error) {
      console.error('Order error:', error);
      alert(`Something went wrong: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '200px 60px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: '20px' }}>YOUR BAG IS EMPTY</h2>
        <button className="video-btn" style={{ color: 'black', borderColor: 'black' }} onClick={() => navigate('/')}>RETURN TO COLLECTIONS</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container" style={{ padding: '150px 60px' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', textTransform: 'uppercase', letterSpacing: '2px' }}>Checkout</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px' }}>
        <div className="checkout-form">
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Saved Addresses</h3>
          <div className="saved-addresses">
            {savedAddresses.map(addr => (
              <div
                key={addr.id}
                className={`saved-address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                onClick={() => setSelectedAddressId(addr.id)}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888', marginBottom: '5px' }}>{addr.name}</h4>
                  <p style={{ fontSize: '14px', margin: '0' }}>{addr.address}</p>
                  <p style={{ fontSize: '13px', color: '#666' }}>{addr.city}, {addr.state} - {addr.zip}</p>
                </div>
                <div className={`address-radio ${selectedAddressId === addr.id ? 'checked' : ''}`} />
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '40px' }}>New Shipping Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="Jane" style={{ background: '#f8f8f8', border: '1px solid #eee', padding: '15px', color: 'black' }} className="premium-input-field" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" style={{ background: '#f8f8f8', border: '1px solid #eee', padding: '15px', color: 'black' }} className="premium-input-field" />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="jane@example.com" style={{ background: '#f8f8f8', border: '1px solid #eee', padding: '15px', color: 'black' }} className="premium-input-field" />
            </div>
            <div className="input-group">
              <label>Shipping Address</label>
              <input type="text" placeholder="Street Address, Apartment, Suite" style={{ background: '#f8f8f8', border: '1px solid #eee', padding: '15px', color: 'black' }} className="premium-input-field" />
            </div>
          </div>

          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '60px' }}>Payment Method</h3>

          <div
            style={{ border: '1px solid #eee', padding: '20px', borderRadius: '4px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', borderColor: paymentMethod === 'card' ? 'black' : '#eee' }}
            onClick={() => setPaymentMethod('card')}
          >
            <div className={`address-radio ${paymentMethod === 'card' ? 'checked' : ''}`} />
            <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Credit / Debit Card</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <i className="fab fa-cc-visa" style={{ fontSize: '24px', opacity: 0.5 }}></i>
              <i className="fab fa-cc-mastercard" style={{ fontSize: '24px', opacity: 0.5 }}></i>
            </div>
          </div>

          <div
            style={{ border: '1px solid #eee', padding: '20px', borderRadius: '4px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', borderColor: paymentMethod === 'upi' ? 'black' : '#eee' }}
            onClick={() => setPaymentMethod('upi')}
          >
            <div className={`address-radio ${paymentMethod === 'upi' ? 'checked' : ''}`} />
            <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>UPI / Netbanking</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', border: '1px solid #ccc', padding: '2px 5px', color: '#999' }}>BHIM UPI</span>
            </div>
          </div>

          <button
            className="checkout-btn"
            style={{ padding: '25px', opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'PROCESSING...' : `PLACE ORDER • ₹${cartTotal.toLocaleString()}`}
          </button>
        </div>

        <div className="order-summary" style={{ background: '#fcfcfc', padding: '40px', border: '1px solid #eee', height: 'fit-content' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Order Summary</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '12px', textTransform: 'uppercase', marginBottom: '5px' }}>{item.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>SIZE: {item.size} | QTY: {item.quantity}</p>
                  <p style={{ fontSize: '13px', fontWeight: '600', marginTop: '5px' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span>Shipping</span>
              <span style={{ color: '#27ae60' }}>Complimentary</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '18px', fontWeight: '700', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
