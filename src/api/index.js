// Central API utility for all backend calls
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('shree_token');

// Generic fetch wrapper
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ─── Auth API ──────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => apiFetch('/auth/me'),

  addAddress: (address) =>
    apiFetch('/auth/address', {
      method: 'PUT',
      body: JSON.stringify(address),
    }),
};

// ─── Products API ──────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: () => apiFetch('/products'),
  getById: (id) => apiFetch(`/products/${id}`),
  seed: () => apiFetch('/products/seed', { method: 'POST' }),
};

// ─── Orders API ────────────────────────────────────────────────────────────────
export const ordersAPI = {
  create: (orderData) =>
    apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getMyOrders: () => apiFetch('/orders/my'),
  getById: (id) => apiFetch(`/orders/${id}`),
};

// ─── Inquiries API ─────────────────────────────────────────────────────────────
export const inquiriesAPI = {
  submit: (data) =>
    apiFetch('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ─── Auth helpers ──────────────────────────────────────────────────────────────
export const saveUser = (userData) => {
  localStorage.setItem('shree_token', userData.token);
  localStorage.setItem('shree_user', JSON.stringify({
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  }));
};

export const getLocalUser = () => {
  const user = localStorage.getItem('shree_user');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('shree_token');
  localStorage.removeItem('shree_user');
};
