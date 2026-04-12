import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

// Mock product for testing
const mockProduct = {
  id: 'test-1',
  name: 'Zardozi Lehenga',
  price: 45000,
  image: 'https://example.com/image.jpg',
  category: 'Bridal',
};

const mockProduct2 = {
  id: 'test-2',
  name: 'Ombre Sharara',
  price: 32000,
  image: 'https://example.com/image2.jpg',
  category: 'Contemporary',
};

// Helper to render the hook with CartProvider
const renderCartHook = () =>
  renderHook(() => useCart(), { wrapper: CartProvider });

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart', () => {
    const { result } = renderCartHook();
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it('adds a product to the cart', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('Zardozi Lehenga');
    expect(result.current.cartItems[0].size).toBe('M');
    expect(result.current.cartItems[0].quantity).toBe(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(45000);
  });

  it('increases quantity when same product+size is added again', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });
    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(90000);
  });

  it('adds same product with different size as separate item', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'S');
    });
    act(() => {
      result.current.addToCart(mockProduct, 'L');
    });

    expect(result.current.cartItems).toHaveLength(2);
    expect(result.current.cartCount).toBe(2);
  });

  it('removes a product from the cart', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
      result.current.addToCart(mockProduct2, 'L');
    });

    act(() => {
      result.current.removeFromCart('test-1', 'M');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('Ombre Sharara');
  });

  it('updates quantity with delta', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });

    act(() => {
      result.current.updateQuantity('test-1', 'M', 3);
    });

    expect(result.current.cartItems[0].quantity).toBe(4);
    expect(result.current.cartTotal).toBe(180000);
  });

  it('does not let quantity go below 1', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });

    act(() => {
      result.current.updateQuantity('test-1', 'M', -5);
    });

    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('clears the entire cart', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
      result.current.addToCart(mockProduct2, 'L');
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it('calculates correct total with multiple items', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');  // 45000
      result.current.addToCart(mockProduct2, 'L'); // 32000
      result.current.addToCart(mockProduct, 'M');  // +45000 (qty 2)
    });

    // (45000 * 2) + (32000 * 1) = 122000
    expect(result.current.cartTotal).toBe(122000);
    expect(result.current.cartCount).toBe(3);
  });

  it('persists cart to localStorage', () => {
    const { result } = renderCartHook();

    act(() => {
      result.current.addToCart(mockProduct, 'M');
    });

    const stored = JSON.parse(localStorage.getItem('shree_cart'));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Zardozi Lehenga');
  });
});
