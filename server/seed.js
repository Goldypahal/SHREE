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
  // Trending Collections: In Her Moment
  {
    name: 'Rose Pink Zardozi Lehenga',
    price: 100700,
    category: 'In Her Moment',
    description: 'A pink silk lehenga featuring red and gold zardozi, dori, and silk thread embroidered kalis with sequins. Paired with a sleeveless blouse and orange net dupatta.',
    image: '/images/catalog/pink-lehenga.jpg',
    gallery: ['/images/catalog/pink-lehenga.jpg'],
    details: ['Pink Silk Base', 'Zardozi & Sequins', 'Orange Net Dupatta', 'Handcrafted by Aharin India'],
    inStock: true,
  },
  {
    name: 'Mirror Work Blossom Lehenga',
    price: 44500,
    category: 'In Her Moment',
    description: 'Stunning rose pink lehenga with intricate mirror work and stone embellishments for a premium studio look.',
    image: '/images/catalog/pink-lehenga.jpg',
    gallery: ['/images/catalog/pink-lehenga.jpg'],
    details: ['Rose Pink', 'Mirror Work', 'Stone Embellishments'],
    inStock: true,
  },
  {
    name: 'Pastel Floral Printed Lehenga',
    price: 38000,
    category: 'In Her Moment',
    description: 'Premium floral printed lehenga set in delicate pastel pink, perfect for day weddings.',
    image: '/images/catalog/pink-lehenga.jpg',
    gallery: ['/images/catalog/pink-lehenga.jpg'],
    details: ['Pastel Pink', 'Floral Print', 'Silk Organza'],
    inStock: true,
  },

  // Trending Collections: Serenade - Bridal
  {
    name: 'Rani Pink Organza Bridal',
    price: 189985,
    category: 'Serenade - Bridal',
    description: 'High-end rani pink lehenga in organza base with heavy gold zardozi embroidery.',
    image: '/images/catalog/rani-pink.jpg',
    videoUrl: 'https://player.vimeo.com/external/530514102.hd.mp4?s=4567ACDDDEF4927E96A53353933985FB&profile_id=175',
    details: ['Organza Silk', 'Heavy Zardozi', 'Bridal Collection'],
    inStock: true,
  },
  {
    name: 'Gold Radiance Lehenga',
    price: 148500,
    category: 'Serenade - Bridal',
    description: 'Luxurious gold and pink lehenga with mirror work and hand-embroidered detailing.',
    image: '/images/catalog/bridal-gold-red.png',
    gallery: ['/images/catalog/bridal-gold-red.png'],
    details: ['Gold & Pink', 'Mirror Work', 'Hand Embroidery'],
    inStock: true,
  },
  {
    name: 'Rose Gold Sequinned Set',
    price: 95000,
    category: 'Serenade - Bridal',
    description: 'Rose gold sequinned bridal lehenga with a modern aesthetic and traditional craftsmanship.',
    image: '/images/catalog/bridal-gold-red.png',
    gallery: ['/images/catalog/bridal-gold-red.png'],
    details: ['Rose Gold', 'Sequin Work', 'Modern Silhouette'],
    inStock: true,
  },

  // Trending Collections: Noctelle
  {
    name: 'Midnight Black Zardozi Set',
    price: 165000,
    category: 'Noctelle',
    description: 'A deep black silk lehenga with elaborate silver zardozi work, designed for high-end evening events.',
    image: '/images/catalog/black-zardozi.jpg',
    gallery: ['/images/catalog/black-zardozi.jpg'],
    details: ['Midnight Black', 'Silver Zardozi', 'Evening Wear'],
    inStock: true,
  },
  {
    name: 'Charcoal Embroidered Lehenga',
    price: 48000,
    category: 'Noctelle',
    description: 'Charcoal grey and black lehenga set with tonal embroidery and a contemporary silhouette.',
    image: '/images/catalog/evening-black-silver.png',
    gallery: ['/images/catalog/evening-black-silver.png'],
    details: ['Charcoal Grey', 'Tonal Embroidery', 'Modern Cut'],
    inStock: true,
  },

  // Trending Collections: Sufiyaana
  {
    name: 'Ivory Chikankari Lehenga',
    price: 58900,
    category: 'Sufiyaana',
    description: 'Ivory white lehenga with authentic Chikankari-inspired thread work and pearl embellishments.',
    image: '/images/catalog/ivory-chikankari.jpg',
    gallery: ['/images/catalog/ivory-chikankari.jpg'],
    details: ['Ivory White', 'Chikankari Work', 'Pearl Detailing'],
    inStock: true,
  },
  {
    name: 'Pristine White Silk Set',
    price: 88800,
    category: 'Sufiyaana',
    description: 'Premium white silk lehenga with gold zari and hand-embroidered floral patterns.',
    image: '/images/catalog/ivory-chikankari-new.png',
    gallery: ['/images/catalog/ivory-chikankari-new.png'],
    details: ['White Silk', 'Gold Zari', 'Floral Embroidery'],
    inStock: true,
  },

  // Signature Edits: Zooni
  {
    name: 'Purple Silk Bandhani Sharara',
    price: 68500,
    category: 'Zooni',
    description: 'Vibrant purple silk sharara set with traditional Bandhani print and modern hand embroidery.',
    image: '/images/catalog/purple-sharara.jpg',
    gallery: ['/images/catalog/purple-sharara.jpg'],
    details: ['Purple Silk', 'Bandhani Print', 'Signature Zooni'],
    inStock: true,
  },
  {
    name: 'Vibrant Floral Zooni Set',
    price: 12500,
    category: 'Zooni',
    description: 'A youthful and bright floral print set from the Zooni signature series.',
    image: '/images/catalog/pastel-floral-pink.png',
    gallery: ['/images/catalog/pastel-floral-pink.png'],
    details: ['Multi-color', 'Floral Print', 'Cotton Base'],
    inStock: true,
  },

  // Signature Edits: Amirah
  {
    name: 'Regal Baby Pink net Sharara',
    price: 135424,
    category: 'Amirah',
    description: 'Regal baby pink net sharara set with intricate silver dori and sequin embroidery.',
    image: '/images/catalog/rose-sharara.jpg',
    gallery: ['/images/catalog/rose-sharara.jpg'],
    details: ['Baby Pink Net', 'Silver Dori', 'Regal silhouette'],
    inStock: true,
  },
  {
    name: 'Royal Velvet Navy Edit',
    price: 95000,
    category: 'Amirah',
    description: 'Deep navy velvet set with antique gold embroidery, part of the Amirah royal edit.',
    image: '/images/catalog/navy-velvet.jpg',
    gallery: ['/images/catalog/navy-velvet.jpg'],
    details: ['Navy Velvet', 'Antique Gold', 'Bridal Edit'],
    inStock: true,
  },

  // Signature Edits: Maahru
  {
    name: 'Iconic JJ Valaya Maahru Print',
    price: 145000,
    category: 'Maahru',
    description: 'Iconic JJ Valaya printed silk set with earthy tones and heritage embroidery patterns.',
    image: '/images/catalog/maahru-silk.jpg',
    gallery: ['/images/catalog/maahru-silk.jpg'],
    details: ['Print Silk', 'JJ Valaya Design', 'Heritage Motif'],
    inStock: true,
  },
  {
    name: 'Antique Rose Dori Sharara',
    price: 39900,
    category: 'Maahru',
    description: 'Subtle antique rose pink set with refined dori hand embroidery for a sophisticated look.',
    image: '/images/catalog/rose-sharara.jpg',
    gallery: ['/images/catalog/rose-sharara.jpg'],
    details: ['Antique Rose', 'Dori Embroidery', 'Refined Silhouette'],
    inStock: true,
  },

  // Signature Edits: Bridal Edit
  {
    name: 'Masterpiece Zardozi Wedding Set',
    price: 210000,
    category: 'Bridal Edit',
    description: 'Masterpiece bridal lehenga with full-body zardozi and kundan work.',
    image: '/images/catalog/marwari-lehenga.jpg',
    gallery: ['/images/catalog/marwari-lehenga.jpg'],
    details: ['Zardozi', 'Kundan Work', 'Ultimate Bridal'],
    inStock: true,
  },
  {
    name: 'Marwari Gota Patti Lehenga',
    price: 250000,
    category: 'Bridal Edit',
    description: 'Traditional Marwari-inspired bridal lehenga with heavy gota patti and zardozi.',
    image: '/images/catalog/marwari-lehenga.jpg',
    gallery: ['/images/catalog/marwari-lehenga.jpg'],
    details: ['Marwari Style', 'Gota Patti', 'Heavy Bridal'],
    inStock: true,
  },

  // Couture Silhouettes: Zardozi
  {
    name: 'Heritage Maroon Zardozi',
    price: 65000,
    category: 'Zardozi Lehengas',
    description: 'Deep maroon velvet lehenga with zardozi borders and floral embroidery.',
    image: '/images/catalog/maroon-lehenga.jpg',
    gallery: ['/images/catalog/maroon-lehenga.jpg'],
    details: ['Maroon Velvet', 'Zardozi Border', 'Floral Motifs'],
    inStock: true,
  },

  // Couture Silhouettes: Ombre
  {
    name: 'Pink & Black Ombre Silk',
    price: 205000,
    category: 'Ombre Sets',
    description: 'Exclusive ombre silk printed lehenga set by master designer JJ Valaya.',
    image: '/images/catalog/ombre-silk.jpg',
    gallery: ['/images/catalog/ombre-silk.jpg'],
    details: ['Silk Print', 'Ombre Transition', 'JJ Valaya'],
    inStock: true,
  },
  {
    name: 'Charcoal Ombre Crepe',
    price: 19500,
    category: 'Ombre Sets',
    description: 'Modern ombre transition from grey to charcoal in Italian crepe with hand embroidery.',
    image: '/images/catalog/ombre-silk.jpg',
    gallery: ['/images/catalog/ombre-silk.jpg'],
    details: ['Italian Crepe', 'Grey to Charcoal', 'Hand Embroidery'],
    inStock: true,
  },

  // Couture Silhouettes: Contemporary Shararas
  {
    name: 'Rani Pink Silk Sharara',
    price: 62500,
    category: 'Contemporary Shararas',
    description: 'Vibrant pink silk sharara with Bandhani prints and intricate handwork.',
    image: '/images/catalog/royal-purple-sharara.png',
    gallery: ['/images/catalog/royal-purple-sharara.png'],
    details: ['Pink Silk', 'Bandhani Print', 'Contemporary Cut'],
    inStock: true,
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
