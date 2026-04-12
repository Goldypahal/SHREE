import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import App from '../App';

// Helper to wrap components with required providers
const renderWithProviders = (ui) => {
  return render(
    <CartProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </CartProvider>
  );
};

describe('App Component', () => {
  it('renders without crashing', () => {
    // App includes its own BrowserRouter, so render directly with CartProvider
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    // The app should render the SHREE brand logo/text somewhere
    const logos = screen.getAllByText(/SHREE/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('contains navigation elements', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    // Should have navigation links
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shopping bag/i)).toBeInTheDocument();
  });
});
