const mongoose = require('mongoose');

// Mock Product model 
const Product = require('../models/Product');

describe('Product Model', () => {
  it('should have the correct schema fields', () => {
    const schema = Product.schema.obj;

    expect(schema).toHaveProperty('name');
    expect(schema).toHaveProperty('price');
    expect(schema).toHaveProperty('category');
    expect(schema).toHaveProperty('description');
    expect(schema).toHaveProperty('image');
    expect(schema).toHaveProperty('gallery');
    expect(schema).toHaveProperty('details');
    expect(schema).toHaveProperty('inStock');
    expect(schema).toHaveProperty('reviews');
  });

  it('should require name field', () => {
    expect(Product.schema.obj.name.required).toBeTruthy();
  });

  it('should require price field with min 0', () => {
    expect(Product.schema.obj.price.required).toBeTruthy();
    expect(Product.schema.obj.price.min).toBe(0);
  });

  it('should default inStock to true', () => {
    expect(Product.schema.obj.inStock.default).toBe(true);
  });

  it('should default gallery to empty array', () => {
    expect(Product.schema.obj.gallery.default).toEqual([]);
  });

  it('should validate product creation', () => {
    const product = new Product({
      name: 'Zardozi Bridal Lehenga',
      price: 85000,
      category: 'Bridal',
      description: 'Hand-embroidered bridal lehenga',
      image: 'https://example.com/lehenga.jpg',
    });

    const error = product.validateSync();
    expect(error).toBeUndefined();
    expect(product.name).toBe('Zardozi Bridal Lehenga');
    expect(product.price).toBe(85000);
    expect(product.inStock).toBe(true);
  });

  it('should fail validation without required fields', () => {
    const product = new Product({});
    const error = product.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('name');
    expect(error.errors).toHaveProperty('price');
    expect(error.errors).toHaveProperty('category');
  });

  it('should enforce review rating range (1-5)', () => {
    const product = new Product({
      name: 'Test',
      price: 100,
      category: 'Test',
      description: 'Test',
      image: 'test.jpg',
      reviews: [{ user: 'Test', rating: 6, comment: 'Great' }],
    });
    const error = product.validateSync();
    expect(error).toBeDefined();
  });
});

describe('Order Model', () => {
  const Order = require('../models/Order');

  it('should have the correct schema fields', () => {
    const schema = Order.schema.obj;

    expect(schema).toHaveProperty('userId');
    expect(schema).toHaveProperty('userEmail');
    expect(schema).toHaveProperty('items');
    expect(schema).toHaveProperty('total');
    expect(schema).toHaveProperty('paymentMethod');
    expect(schema).toHaveProperty('shippingAddress');
    expect(schema).toHaveProperty('status');
  });

  it('should only allow card or upi as payment method', () => {
    expect(Order.schema.obj.paymentMethod.enum).toEqual(['card', 'upi']);
  });

  it('should have correct order status lifecycle', () => {
    expect(Order.schema.obj.status.enum).toEqual([
      'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
    ]);
  });

  it('should default status to pending', () => {
    expect(Order.schema.obj.status.default).toBe('pending');
  });

  it('should require total with min 0', () => {
    expect(Order.schema.obj.total.required).toBe(true);
    expect(Order.schema.obj.total.min).toBe(0);
  });
});

describe('User Model', () => {
  const User = require('../models/User');

  it('should have the correct schema fields', () => {
    const schema = User.schema.obj;

    expect(schema).toHaveProperty('name');
    expect(schema).toHaveProperty('email');
    expect(schema).toHaveProperty('password');
    expect(schema).toHaveProperty('googleId');
    expect(schema).toHaveProperty('role');
    expect(schema).toHaveProperty('savedAddresses');
  });

  it('should only allow collector or admin roles', () => {
    expect(User.schema.obj.role.enum).toEqual(['collector', 'admin']);
  });

  it('should default role to collector', () => {
    expect(User.schema.obj.role.default).toBe('collector');
  });

  it('should require email as unique and lowercase', () => {
    expect(User.schema.obj.email.unique).toBe(true);
    expect(User.schema.obj.email.lowercase).toBe(true);
  });

  it('should have password min length of 6', () => {
    expect(User.schema.obj.password.minlength).toBe(6);
  });

  it('should not return password by default (select: false)', () => {
    expect(User.schema.obj.password.select).toBe(false);
  });
});

describe('Inquiry Model', () => {
  const Inquiry = require('../models/Inquiry');

  it('should have correct inquiry types', () => {
    expect(Inquiry.schema.obj.type.enum).toEqual([
      'Designer Showcase',
      'Artisan Application',
      'Collection Purchase Inquiry',
      'Other',
    ]);
  });

  it('should have correct status workflow', () => {
    expect(Inquiry.schema.obj.status.enum).toEqual(['new', 'read', 'responded']);
  });

  it('should default status to new', () => {
    expect(Inquiry.schema.obj.status.default).toBe('new');
  });

  it('should require name, email, type, and message', () => {
    const inquiry = new Inquiry({});
    const error = inquiry.validateSync();
    expect(error.errors).toHaveProperty('name');
    expect(error.errors).toHaveProperty('email');
    expect(error.errors).toHaveProperty('type');
    expect(error.errors).toHaveProperty('message');
  });
});
