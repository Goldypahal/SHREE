import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Reset modules to get fresh imports
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
});

describe('API Utility', () => {
  it('getLocalUser returns null when no user is stored', async () => {
    const { getLocalUser } = await import('../api/index.js');
    expect(getLocalUser()).toBeNull();
  });

  it('getLocalUser returns parsed user data', async () => {
    const mockUser = { _id: '123', name: 'Test', email: 'test@test.com', role: 'collector' };
    localStorage.setItem('shree_user', JSON.stringify(mockUser));

    const { getLocalUser } = await import('../api/index.js');
    const user = getLocalUser();
    expect(user).toEqual(mockUser);
    expect(user.name).toBe('Test');
  });

  it('saveUser stores token and user data in localStorage', async () => {
    const { saveUser } = await import('../api/index.js');

    saveUser({
      token: 'jwt-token-123',
      _id: 'user1',
      name: 'Ravneet',
      email: 'ravneet@shree.com',
      role: 'collector',
    });

    expect(localStorage.getItem('shree_token')).toBe('jwt-token-123');
    const stored = JSON.parse(localStorage.getItem('shree_user'));
    expect(stored.name).toBe('Ravneet');
    expect(stored.email).toBe('ravneet@shree.com');
  });

  it('logoutUser clears token and user from localStorage', async () => {
    localStorage.setItem('shree_token', 'some-token');
    localStorage.setItem('shree_user', JSON.stringify({ name: 'Test' }));

    const { logoutUser } = await import('../api/index.js');
    logoutUser();

    expect(localStorage.getItem('shree_token')).toBeNull();
    expect(localStorage.getItem('shree_user')).toBeNull();
  });

  it('productsAPI.getAll calls the correct endpoint', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { productsAPI } = await import('../api/index.js');
    const result = await productsAPI.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products'),
      expect.any(Object)
    );
    expect(result).toEqual(mockProducts);
  });

  it('API throws error on non-ok response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Not found' }),
    });

    const { productsAPI } = await import('../api/index.js');
    await expect(productsAPI.getAll()).rejects.toThrow('Not found');
  });

  it('authAPI.login sends correct payload', async () => {
    const mockResponse = { token: 'jwt-123', _id: '1', name: 'Test', email: 'a@b.com', role: 'collector' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { authAPI } = await import('../api/index.js');
    const result = await authAPI.login('a@b.com', 'password123');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'a@b.com', password: 'password123' }),
      })
    );
    expect(result.token).toBe('jwt-123');
  });

  it('includes auth token in headers when available', async () => {
    localStorage.setItem('shree_token', 'my-jwt-token');

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { productsAPI } = await import('../api/index.js');
    await productsAPI.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer my-jwt-token',
        }),
      })
    );
  });
});
