# SHREE Collective — 3-Person Team Walkthrough & Viva Guide

> **Project:** SHREE — Luxury Indian Couture E-Commerce Platform
> **Team:** 3 Members | Frontend · Backend · Database & Cloud

---

## 👥 TEAM DIVISION

| Person | Role | Owns |
|--------|------|------|
| **Person A** | Frontend Developer | React UI, Pages, Cart, Animations, Routing |
| **Person B** | Backend Developer | Node.js, Express API, Auth, Routes, Middleware |
| **Person C** | Database & Cloud Engineer | MongoDB, Mongoose Models, Cloudinary, Firebase, Deployment |

---

# 🅐 PERSON A — Frontend Developer

## Introduction Script
> *"I was responsible for the entire frontend of SHREE — building the user interface using React 19 and Vite. My work includes everything the user sees and interacts with: the hero section, product carousel, cart drawer, checkout flow, and all 8 pages. I also designed the complete CSS design system with luxury aesthetics — animations, skeleton loaders, and a fully responsive layout."*

## Core Technical Implementations

### 1. Global State Management (Context API)
Instead of passing props down multiple levels (prop drilling), I implemented a centralized `CartContext`. It wraps the entire application and provides a single source of truth for:
- `cartItems` (Array of objects in the bag)
- `cartCount` & `cartTotal` (Derived dynamic states)
- Core actions: `addToCart`, `removeFromCart`, and `updateQuantity`.
This allows any component, from the Navbar bag icon to the Product Modal, to seamlessly read and update the cart.

### 2. Performance Optimization (Lazy Loading)
To ensure the site loads quickly despite having heavy luxury video assets, I implemented an `IntersectionObserver` via the `LazyVideo` component.
- **How it works:** The videos in the 4-grid section do not load on initial page load. The observer monitors when the user scrolls near the grid (within 200px).
- **Result:** Only when the user is about to see the videos does the `src` attribute populate and the video plays. This saves massive initial bandwidth.

### 3. User Experience (Skeleton Loaders & Offline Fallbacks)
Fetching products from the backend takes time. I prioritized UX by handling these states gracefully:
- **Skeleton Loaders:** I designed CSS-based animated `HeroSkeleton`, `ProductCardSkeleton`, and `VideoSkeleton` components. These show a shimmering grey layout while data loads, preventing jarring layout shifts.
- **Offline Fallback:** I integrated a local data fallback (`products.js`). If the backend server fails or is offline, the frontend catches the error and seamlessly falls back to serving local dummy data, ensuring the app never appears broken.

### 4. Advanced UI Features & Animations
- **Mega Menu:** Built a complex hover-based mega menu for desktop navigation that maps hierarchical category data alongside dynamic visual showcase images.
- **Scroll Reveal Animations:** Implemented a scroll event listener that adds an `.active` class to elements with a `.reveal` tag as they enter the viewport, triggering smooth CSS fade-up transitions.
- **Modals & Drawers:** Built custom overlays (`AuthModal`, `CartDrawer`) using fixed positioning. I specifically solved z-index and backdrop-blur styling issues to ensure luxury, clean overlays without screen distortion.

## Complete Contributions List
- Built the React SPA using **Vite** as the build tool
- Created the **mega-menu navigation** with hover dropdowns and mobile sidebar
- Implemented the **hero video section** with autoplay and poster fallback
- Built the **product carousel** with auto-scroll, pause on hover, and prev/next controls
- Designed all **skeleton loaders** (`HeroSkeleton`, `ProductCardSkeleton`, `VideoSkeleton`)
- Implemented **IntersectionObserver lazy loading** for the 4-video grid section
- Built the **CartDrawer** — slide-in panel with quantity controls and size selection
- Built the **AuthModal** — inline login/register popup
- Built the **ProductDetailModal** — full-screen product detail with image gallery, tabs, and reviews
- Set up **React Router DOM** for all 8 pages
- Managed global **cart state** using Context API (`CartContext`)
- Added the **account button** in the navbar (user avatar when logged in)
- Implemented **scroll-reveal animations** using IntersectionObserver
- Built pages: `Home`, `Archive`, `Artisans`, `Vision`, `Exhibitions`, `Inquiries`, `Auth`, `Dashboard`, `Checkout`

## How to Walk Through (Demo Script)

**Step 1 — Homepage**
> *"When the site loads, you see a full-screen hero video playing automatically. While the page data loads, skeleton loaders are shown instead of blank spaces — this is a UX best practice. The hero has a gradient overlay and a call-to-action button."*

**Step 2 — Product Carousel**
> *"Below the hero is our product carousel. It auto-scrolls every 4 seconds and pauses when you hover. Each card shows the product image, and on hover reveals the category tag, name, price, size picker, and an 'Add To Bag' button."*

**Step 3 — Lazy Video Grid**
> *"The 4-video grid uses IntersectionObserver — videos only load and play when they scroll into view. This significantly improves page load performance."*

**Step 4 — Navigation**
> *"The navbar is transparent on the hero and turns white on scroll. On desktop, hovering 'The Collective' or 'Artisans' opens a mega-menu with category links and a preview image. On mobile, a sidebar slides in."*

**Step 5 — Account Button**
> *"In the top-right, there's an account icon. If you're not logged in, it shows a person icon and takes you to the login page. If you're logged in, it shows a gold circle with your name initial and takes you to the dashboard."*

**Step 6 — Cart & Checkout**
> *"Clicking the bag icon opens the cart drawer. Items show image, name, price, size, and quantity controls. Clicking 'Secure Checkout' checks if you're logged in — if not, the login modal appears. If logged in, it goes to the Checkout page where you select address and payment method."*

---

## 🅐 Person A — Viva Questions

**Q1. What is React and why did you use it for SHREE?**
> React is a JavaScript library for building component-based UIs. I used it because it allows breaking the UI into reusable components (ProductCard, CartDrawer, AuthModal) and efficiently updates the DOM using a Virtual DOM.

**Q2. What build tool did you use and why?**
> Vite. It uses native ES modules for instant dev server startup and hot module replacement (HMR), making development much faster than Create React App.

**Q3. What React Hooks did you use?**
> `useState` for local state (loading, selectedSize, cartItems), `useEffect` for API calls and scroll listeners, `useRef` for the carousel and video DOM elements, `useNavigate` and `useLocation` from React Router.

**Q4. What is Context API and how did you use it?**
> Context API lets you share state globally without prop drilling. I created `CartContext` which provides `cartItems`, `cartCount`, `cartTotal`, `addToCart`, `removeFromCart`, and `updateQuantity` to all components.

**Q5. What is lazy loading and where did you implement it?**
> Lazy loading defers resource loading until needed. I used `IntersectionObserver` in the `LazyVideo` component — videos only load when scrolled into view, saving initial bandwidth.

**Q6. What is a skeleton loader?**
> A placeholder UI (grey animated boxes) shown while async data loads, preventing layout shift and improving perceived performance. SHREE has `HeroSkeleton`, `ProductCardSkeleton`, and `VideoSkeleton`.

**Q7. How does the scroll-reveal animation work?**
> Elements with the `.reveal` class are initially invisible. A `scroll` event listener uses `getBoundingClientRect()` to detect when they enter the viewport (within 100px), then adds the `.active` class which triggers a CSS fade-up animation.

**Q8. What is React Router and what routes does SHREE have?**
> React Router enables client-side routing without page reloads. SHREE routes: `/` Home, `/archive` Gallery, `/artisans`, `/vision`, `/exhibitions`, `/inquiries`, `/auth`, `/dashboard`, `/checkout`.

**Q9. What is the Virtual DOM?**
> A lightweight in-memory copy of the real DOM. React compares it after state changes (diffing) and only updates the changed parts in the real DOM — making updates fast.

**Q10. How does the cart persist across pages?**
> The cart lives in React Context (in-memory). Since SHREE is an SPA, navigation doesn't reload the page, so the Context state persists. Refreshing clears the cart as it's not saved to `localStorage`.

**Q11. How did you handle the product fallback when the server is offline?**
> In `Home.jsx`, `fetchProducts()` first calls the API. If it throws an error or returns empty, it catches the error and sets products to the local `products.js` data file as a fallback.

**Q12. What is the difference between `useEffect` with and without a dependency array?**
> Without `[]`: runs after every render. With `[]`: runs only once on mount (like componentDidMount). With `[dep]`: runs when `dep` changes.
