/**
 * seed.js — Seeds the shree_studio MongoDB database with
 * products, a demo admin user, a sample inquiry, and a sample order.
 * Run with: node seed.js
 */

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Product  = require('./models/Product');
const User     = require('./models/User');
const Order    = require('./models/Order');
const Inquiry  = require('./models/Inquiry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shree_studio';

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const products = [
  {
    name: 'Rose Pink Couture Lehenga',
    price: 245000,
    category: 'In Her Moment',
    description: 'A hand-embroidered masterpiece in rose pink with delicate zardozi work.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/1_051ee979-99c5-4380-bae6-c470bacfecba.jpg?v=1763961079&width=1200',
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=1200',
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200',
    ],
    details: ['100% Pure Silk', 'Hand Zardozi Embroidery', 'Dry Clean Only', 'Made in Amritsar', 'Includes dupatta & blouse'],
    inStock: true,
    reviews: [
      { user: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning. Wore it to my cousin\'s wedding and got so many compliments.' },
      { user: 'Ananya M', rating: 5, comment: 'The craftsmanship is unreal. Worth every rupee.' },
    ],
  },
  {
    name: 'Coral Petal Lehenga',
    price: 185000,
    category: 'In Her Moment',
    description: 'Vibrant pink and coral hues interwoven with traditional heritage motifs.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/64.jpg?v=1763967817&width=1200',
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=1200',
    ],
    details: ['Georgette base', 'Phulkari-inspired border', 'Custom sizing available', 'Ships in 4 weeks'],
    inStock: true,
    reviews: [
      { user: 'Ritu K', rating: 4, comment: 'Beautiful colour. Took a while to arrive but worth it.' },
    ],
  },
  {
    name: 'Baby Pink Zardozi Set',
    price: 215000,
    category: 'In Her Moment',
    description: 'Exquisite baby pink couture featuring architectural embroidery.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/70.jpg?v=1763969018&width=1200',
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/46_004bfc4c-cc05-44a1-996b-5194d5fb0877.jpg?v=1763966350&width=1200',
    ],
    details: ['Silk organza', 'Gold zardozi', 'Dry clean only', 'Bridal collection'],
    inStock: true,
    reviews: [
      { user: 'Meera J', rating: 5, comment: 'A dream outfit. Wore it at my best friend\'s sangeet.' },
      { user: 'Sakshi T', rating: 5, comment: 'The gold work catches light beautifully.' },
    ],
  },
  {
    name: 'Blush Ombre Couture',
    price: 195000,
    category: 'In Her Moment',
    description: 'A regal ombre transition from blush to deep rose in silk.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/59_f9a9df58-3fc1-4bad-8b47-4fa91f15289b.jpg?v=1763967492&width=1200',
    ],
    details: ['Pure silk', 'Ombre dyed', 'Hand-finished hem', 'Includes blouse piece'],
    inStock: true,
    reviews: [],
  },
  {
    name: 'Mauve Embroidered Sharara',
    price: 125000,
    category: 'In Her Moment',
    description: 'Modern silhouettes meet traditional mauve embroidery.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/67.jpg?v=1763968812&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/67.jpg?v=1763968812&width=1200',
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/54.jpg?v=1763966774&width=1200',
    ],
    details: ['Chanderi silk', 'Resham embroidery', 'Sharara + short kurta'], 
    inStock: true,
    reviews: [
      { user: 'Divya R', rating: 4, comment: 'Loved the sharara silhouette. Very comfortable for long functions.' },
    ],
  },
  {
    name: 'Emerald Crushed Ensemble',
    price: 165000,
    category: 'In Her Moment',
    description: 'A deep emerald green lehenga for the contemporary bride.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/qw_35130be0-f48f-4b8c-aeec-0c58beaeb876.jpg?v=1771402739&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/qw_35130be0-f48f-4b8c-aeec-0c58beaeb876.jpg?v=1771402739&width=1200',
    ],
    details: ['Crushed silk', 'Contrast gold dupatta', 'Made to order — 6 weeks lead time'],
    inStock: true,
    reviews: [
      { user: 'Simran G', rating: 5, comment: 'This was my wedding outfit and I couldn\'t have asked for better.' },
    ],
  },
  {
    name: 'Golden Dust Anarkali',
    price: 95000,
    category: 'Festive',
    description: 'A flowing golden silhouette emphasizing craftsmanship.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/46_004bfc4c-cc05-44a1-996b-5194d5fb0877.jpg?v=1763966350&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/46_004bfc4c-cc05-44a1-996b-5194d5fb0877.jpg?v=1763966350&width=1200',
    ],
    details: ['Net + inner lining', 'Gota patti border', 'Anarkali floor length'],
    inStock: true,
    reviews: [],
  },
  {
    name: 'Ruby Silk Gown',
    price: 85000,
    category: 'Festive',
    description: 'Deep ruby silk gown with hand-applied gota patti.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/54.jpg?v=1763966774&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/54.jpg?v=1763966774&width=1200',
    ],
    details: ['Banarasi silk', 'Gota patti yoke', 'Side slit', 'Festive & cocktail ready'],
    inStock: true,
    reviews: [
      { user: 'Tanya M', rating: 5, comment: 'Perfect for Diwali parties. Got so many compliments!' },
      { user: 'Nisha V', rating: 4, comment: 'Quality is great. The color is even more vibrant in person.' },
    ],
  },
  {
    name: 'Nocteele Grey Drape',
    price: 275000,
    category: 'Real Brides',
    description: 'Maihma in our signature Nocteele grey drape lehenga.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/WhatsAppImage2026-01-16at13.12.14_1.jpg?v=1769078624&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/WhatsAppImage2026-01-16at13.12.14_1.jpg?v=1769078624&width=1200',
    ],
    details: ['Grey silk', 'Nocteele drape silhouette', 'Bridal collection', 'Custom fitting included'],
    inStock: false,
    reviews: [
      { user: 'Maihma', rating: 5, comment: 'I was the most confident bride. This lehenga made me feel iconic.' },
    ],
  },
  {
    name: 'Navy Blue Tulle Work',
    price: 235000,
    category: 'Real Brides',
    description: 'Avleen Kaur in our navy blue tulle bridal couture.',
    image: 'https://www.tamannapunjabikapoor.com/cdn/shop/files/Paolo_Avleenday3_0764.jpg?v=1769076254&width=1200',
    gallery: [
      'https://www.tamannapunjabikapoor.com/cdn/shop/files/Paolo_Avleenday3_0764.jpg?v=1769076254&width=1200',
    ],
    details: ['Navy tulle', 'Crystal work', 'Cathedral trail', 'Custom order only'],
    inStock: true,
    reviews: [],
  },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────
async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB:', MONGO_URI);

  // Clear existing data
  await Product.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});
  await Inquiry.deleteMany({});
  console.log('🗑️  Cleared all existing collections');

  // Insert products
  const insertedProducts = await Product.insertMany(products);
  console.log(`🛍️  Inserted ${insertedProducts.length} products`);

  // Create admin user (pre-save hook hashes the password automatically)
  const admin = await User.create({
    name: 'SHREE Admin',
    email: 'admin@shreecollective.com',
    password: 'Admin@1234',
    role: 'admin',
    savedAddresses: [
      { name: 'Studio', address: '12/A Heritage Lane', city: 'Amritsar', state: 'Punjab', zip: '143001' }
    ],
  });
  console.log('👤 Admin user created → admin@shreecollective.com / Admin@1234');

  // Create demo customer
  const customer = await User.create({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'Demo@1234',
    role: 'collector',
    savedAddresses: [
      { name: 'Home', address: '23 Green Avenue', city: 'Delhi', state: 'Delhi', zip: '110001' }
    ],
  });
  console.log('👤 Demo customer created → priya@example.com / Demo@1234');

  // Create sample order
  const product = insertedProducts[0];
  await Order.create({
    userId: customer._id,
    userEmail: customer.email,
    items: [{ productId: product._id.toString(), name: product.name, price: product.price, quantity: 1, size: 'M', image: product.image }],
    total: product.price,
    paymentMethod: 'card',
    shippingAddress: { name: 'Priya Sharma', address: '23 Green Avenue', city: 'Delhi', state: 'Delhi', zip: '110001' },
    status: 'confirmed',
  });
  console.log('📦 Sample order created');

  // Create sample inquiry
  await Inquiry.create({
    name: 'Anaya Gupta',
    email: 'anaya@example.com',
    type: 'Collection Purchase Inquiry',
    message: 'I am interested in a custom bridal lehenga for my wedding in October 2026. Can we schedule a virtual appointment?',
    status: 'new',
  });
  console.log('📩 Sample inquiry created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('─────────────────────────────────────');
  console.log('Collections in shree_studio:');
  console.log(`  products:  ${insertedProducts.length} documents`);
  console.log(`  users:     2 documents (1 admin, 1 customer)`);
  console.log(`  orders:    1 document`);
  console.log(`  inquiries: 1 document`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
