# SHREE Collective — Viva Questions
### From Basic to Advanced | Full Stack Web Development

---

## 🟢 SECTION 1 — BASIC (Fundamentals)

### HTML & CSS

**Q1. What is the difference between `<div>` and `<section>`?**
> `<div>` is a generic block container with no semantic meaning. `<section>` is a semantic HTML5 element that represents a thematic grouping of content. In SHREE, `<section>` is used for the hero, collections, and visit sections for better accessibility and SEO.

**Q2. What is CSS specificity?**
> Specificity determines which CSS rule applies when multiple rules target the same element. Order: inline styles > IDs > classes/attributes > elements. In SHREE, the custom design system in `index.css` uses class-based selectors to maintain predictable specificity.

**Q3. What is the CSS Box Model?**
> Every HTML element is a box with: content → padding → border → margin. Understanding it is essential for the layout of product cards, navbar, and footer in SHREE.

**Q4. What is the difference between `position: relative`, `absolute`, and `fixed`?**
> - `relative`: positioned relative to its normal position
> - `absolute`: positioned relative to the nearest positioned ancestor
> - `fixed`: positioned relative to the browser viewport (used for SHREE's navbar on scroll)

**Q5. What is Flexbox and where is it used in SHREE?**
> Flexbox is a CSS layout model for one-dimensional layouts. Used extensively in SHREE for the navbar, product cards, cart drawer, and footer grid.

**Q6. What is a CSS variable (custom property)?**
> CSS variables store reusable values. In SHREE's `index.css`, variables like `--text-main`, `--bg-color`, and `--gold` define the entire design system.

---

### JavaScript Basics

**Q7. What is the difference between `var`, `let`, and `const`?**
> - `var`: function-scoped, hoisted, can be re-declared
> - `let`: block-scoped, not hoisted to usable state
> - `const`: block-scoped, cannot be reassigned
> SHREE uses `const` and `let` exclusively (ES6+).

**Q8. What is an arrow function?**
> A shorter syntax for functions: `const fn = () => {}`. Arrow functions don't have their own `this` context. Used throughout SHREE's React components and Express route handlers.

**Q9. What is a Promise and what is async/await?**
> A Promise represents a future value. `async/await` is syntactic sugar over Promises for writing asynchronous code in a synchronous style. SHREE uses `async/await` in all API calls and route handlers.

**Q10. What is the DOM?**
> The Document Object Model is a tree representation of an HTML page that JavaScript can manipulate. React manages the DOM through its Virtual DOM.

**Q11. What is `localStorage` and how is it used in SHREE?**
> `localStorage` is a browser API for storing key-value pairs persistently. SHREE stores the JWT token and user data in `localStorage` after login so the user stays logged in across page refreshes.

**Q12. What is JSON?**
> JavaScript Object Notation — a lightweight data format for exchanging data between client and server. All SHREE API responses are in JSON format.

---

## 🟡 SECTION 2 — INTERMEDIATE

### React

**Q13. What is React and why is it used?**
> React is a JavaScript library for building component-based UIs. It uses a Virtual DOM for efficient updates. SHREE uses React 19 for its entire frontend.

**Q14. What is JSX?**
> JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. React compiles JSX into `React.createElement()` calls.

**Q15. What is the difference between a functional and class component?**
> Functional components are plain functions that return JSX and use Hooks for state/lifecycle. Class components use `this.state` and lifecycle methods. SHREE uses only functional components with Hooks.

**Q16. What are React Hooks? Name the ones used in SHREE.**
> Hooks let functional components use state and lifecycle features:
> - `useState` — local component state (loading, products, selectedSize)
> - `useEffect` — side effects like API calls and scroll listeners
> - `useRef` — DOM references (carousel, video elements)
> - `useNavigate` — programmatic navigation
> - `useLocation` — reading current route
> - `useContext` (via `useCart`) — global cart state

**Q17. What is the Virtual DOM?**
> React keeps a lightweight copy of the real DOM in memory. On state changes, it computes the difference (diffing) and updates only the changed parts in the real DOM — making updates fast and efficient.

**Q18. What is `useEffect` and when does it run?**
> `useEffect` runs after every render by default. With a dependency array `[]`, it runs only once on mount. SHREE uses it to fetch products on page load and set up scroll listeners.

**Q19. What is Context API? How is it used in SHREE?**
> Context API provides a way to share state globally without prop drilling. SHREE uses `CartContext` to share `cartItems`, `cartCount`, `addToCart`, `removeFromCart` across all components — Navbar, ProductCard, CartDrawer, Checkout.

**Q20. What is React Router? What hooks does it provide?**
> React Router enables client-side routing without full page reloads. SHREE uses:
> - `<Routes>` and `<Route>` for defining pages
> - `useNavigate()` for programmatic redirection
> - `useLocation()` for reading the current URL
> - `<NavLink>` for active link styling

**Q21. What is prop drilling and how did SHREE avoid it?**
> Prop drilling is passing data through many levels of components via props. SHREE avoids it using Context API (`CartContext`) for cart state and storing auth data in `localStorage`.

**Q22. What is lazy loading and how is it implemented in SHREE?**
> Lazy loading defers loading of resources until needed. SHREE implements it using `IntersectionObserver` in the `LazyVideo` component — grid videos only load when scrolled into the viewport, saving bandwidth.

**Q23. What is a skeleton loader? Where is it used?**
> A skeleton loader is a placeholder UI shown while content is loading. SHREE has `Skeleton`, `ProductCardSkeleton`, `HeroSkeleton`, and `VideoSkeleton` components that display while API data is being fetched.

---

### Node.js & Express

**Q24. What is Node.js?**
> Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript on the server. SHREE's backend runs on Node.js ≥22.

**Q25. What is Express.js?**
> Express is a minimal, fast web framework for Node.js. SHREE uses Express 5 to define REST API routes, handle middleware, and send JSON responses.

**Q26. What is middleware in Express?**
> Middleware are functions that execute during the request-response cycle. SHREE uses:
> - `cors()` — handles cross-origin requests
> - `express.json()` — parses JSON request bodies
> - `morgan()` — logs HTTP requests
> - `protect()` — custom JWT auth middleware
> - `adminOnly()` — custom role-check middleware

**Q27. What is CORS and why is it needed?**
> Cross-Origin Resource Sharing is a browser security mechanism that blocks requests from different origins. SHREE's backend configures a strict allowlist (localhost ports + production URL) so only the frontend can call the API.

**Q28. What is the difference between `GET`, `POST`, `PUT`, and `DELETE`?**
> - `GET` — retrieve data (fetch products)
> - `POST` — create new data (register, place order)
> - `PUT` — update existing data (update order status)
> - `DELETE` — remove data (delete product)

**Q29. What is `dotenv` and why is it used?**
> `dotenv` loads environment variables from a `.env` file into `process.env`. SHREE uses it to store secrets like `MONGO_URI`, `JWT_SECRET`, and Cloudinary keys outside the codebase.

---

### MongoDB & Mongoose

**Q30. What is MongoDB?**
> MongoDB is a NoSQL document database that stores data as JSON-like BSON documents. SHREE uses it for users, products, orders, and inquiries.

**Q31. What is Mongoose?**
> Mongoose is an ODM (Object Document Mapper) for MongoDB in Node.js. It provides schema definitions, validation, middleware hooks, and model methods.

**Q32. What is a Mongoose Schema?**
> A Schema defines the structure, types, and validation rules for documents in a collection. Example: `Product` schema defines name (String), price (Number), category (String), inStock (Boolean), etc.

**Q33. What is the difference between SQL and NoSQL databases?**
> - SQL: Relational, tabular, fixed schema, uses JOIN (e.g., MySQL)
> - NoSQL: Non-relational, flexible schema, document-based (e.g., MongoDB)
> SHREE uses NoSQL because product data (with gallery arrays, review sub-documents) fits a flexible document model.

**Q34. What is `populate()` in Mongoose?**
> `populate()` replaces a referenced ObjectId with the actual document from another collection. SHREE uses it in the admin orders route: `.populate('userId', 'name email')` to show customer info with each order.

---

## 🔴 SECTION 3 — ADVANCED

### Authentication & Security

**Q35. What is JWT (JSON Web Token)?**
> JWT is a compact, self-contained token for securely transmitting information. It has 3 parts: `header.payload.signature`. SHREE issues a JWT on login valid for 30 days. The client sends it as `Authorization: Bearer <token>`.

**Q36. How does the `protect()` middleware work in SHREE?**
> 1. Reads the `Authorization` header
> 2. Extracts the Bearer token
> 3. Verifies it using `jwt.verify(token, JWT_SECRET)`
> 4. Fetches the user from MongoDB by the decoded ID
> 5. Attaches `req.user` for the next handler
> 6. Returns `401 Unauthorized` if token is invalid or missing

**Q37. How does bcrypt password hashing work?**
> bcrypt uses a one-way hashing algorithm with a configurable salt factor. SHREE uses `saltRounds = 12`. The `pre('save')` Mongoose hook hashes the password before storing it. On login, `bcrypt.compare()` checks the plain password against the stored hash — the original is never stored.

**Q38. What is `select: false` on the password field?**
> It prevents Mongoose from returning the `password` field in any query by default. SHREE only fetches it explicitly with `.select('+password')` in the login route — a security best practice.

**Q39. What is Role-Based Access Control (RBAC)?**
> RBAC restricts system access based on user roles. SHREE has two roles:
> - `collector` (default) — can browse, order, and manage their profile
> - `admin` — can manage products, view all orders, update statuses, and view inquiries
> The `adminOnly()` middleware enforces this on the server side.

**Q40. What are common security risks and how does SHREE address them?**
> - **XSS** → React escapes HTML by default
> - **CSRF** → JWT in headers (not cookies) avoids CSRF attacks
> - **Password exposure** → bcrypt + `select: false`
> - **Unauthorized access** → JWT middleware + RBAC
> - **Secret leakage** → `.env` files are git-ignored

**Q41. What is the difference between authentication and authorization?**
> - **Authentication** — verifying *who* you are (login)
> - **Authorization** — verifying *what* you can do (admin vs collector)
> SHREE uses JWT for authentication and `adminOnly()` middleware for authorization.

---

### System Design & Architecture

**Q42. What is a REST API?**
> REST is an architectural style for designing APIs using HTTP methods. SHREE's backend exposes 16 RESTful endpoints across 4 resource groups: auth, products, orders, inquiries.

**Q43. What is a Single Page Application (SPA)?**
> An SPA loads one HTML page and dynamically updates content via JavaScript without full page reloads. SHREE is a React SPA — navigation between pages doesn't trigger a server request.

**Q44. What is the difference between SSR and CSR?**
> - **CSR (SHREE)**: Browser downloads JS bundle, React renders UI client-side. Fast after initial load.
> - **SSR (Next.js)**: Server renders HTML per request. Better SEO, slower per-request.

**Q45. What is Vite and why is it used over Create React App?**
> Vite uses native ES modules for instant dev server startup and fast HMR. It is significantly faster than CRA's webpack-based bundler.

**Q46. Explain the 3-tier architecture of SHREE.**
> 1. **Presentation Tier** — React SPA in the browser
> 2. **Logic Tier** — Node.js + Express REST API on the server
> 3. **Data Tier** — MongoDB Atlas cloud database

**Q47. What is Cloudinary and why is it used?**
> Cloudinary is a cloud-based media CDN. SHREE uses it to store product images — `multer` handles the upload, `multer-storage-cloudinary` streams it to Cloudinary, and the returned URL is stored in MongoDB.

**Q48. What is an IntersectionObserver?**
> A browser API that observes when an element enters/exits the viewport. SHREE's `LazyVideo` component uses it to only load videos when scrolled into view — improving performance.

**Q49. What is the event loop in Node.js?**
> Node.js is single-threaded but handles concurrency via the event loop. Async operations (DB queries) are offloaded and their callbacks queued when complete. This is why SHREE's Express server handles multiple simultaneous API requests efficiently.

---

### Database Design

**Q50. Why MongoDB over a relational database for SHREE?**
> - Product data is heterogeneous (different details per category)
> - Reviews and gallery images are naturally stored as arrays within a document
> - Flexible schema allows easy addition of new fields without migrations

**Q51. How are orders linked to users in MongoDB?**
> Using a reference: `userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }`. Similar to a foreign key in SQL. The `populate()` method resolves this reference.

**Q52. What is a sub-document in Mongoose?**
> A document embedded inside another document. SHREE examples:
> - `savedAddresses[]` in User
> - `items[]` in Order
> Sub-documents are stored as part of the parent document.

**Q53. What is the Order status lifecycle in SHREE?**
> `pending → confirmed → shipped → delivered` or `cancelled`. Admins can transition between any state from the dashboard via `PUT /api/orders/:id/status`.

---

### Testing & Deployment

**Q54. What is Jest and how is it used in SHREE?**
> Jest is a JavaScript testing framework. SHREE uses it for backend testing — verifying auth routes, product CRUD, order placement, and middleware using `supertest` to simulate HTTP requests.

**Q55. What is Supertest?**
> Supertest allows making real HTTP requests to the Express app in tests without starting an actual server — enabling true end-to-end API testing.

**Q56. What is CI/CD?**
> Continuous Integration/Deployment. SHREE has `.github/` configured for GitHub Actions that automatically runs tests and linting on every push — preventing broken code from being merged.

**Q57. What is the purpose of the `seed.js` file?**
> It populates MongoDB with initial product data so the catalog has products to display without manual admin entry.

---

### Tricky / Deep Questions

**Q58. If the backend is down, does SHREE's frontend crash?**
> No. `fetchProducts()` in `Home.jsx` catches API errors and falls back to the local `products.js` data file. Users still see products even when the server is offline.

**Q59. How does the cart persist across page navigations?**
> The cart lives in `CartContext` (React Context). Since SHREE is an SPA and navigation doesn't reload the page, the Context state persists across all routes. Refreshing the page clears the cart (not persisted to `localStorage`).

**Q60. Can a regular user access admin API routes by manipulating the frontend?**
> No. Even if a user calls `/api/orders` manually, the `adminOnly()` middleware checks `req.user.role === 'admin'` from the verified JWT. Since the role is encoded in the JWT signed with the server's `JWT_SECRET`, it cannot be forged client-side.

**Q61. What is the scroll-reveal animation system in SHREE?**
> Elements with `.reveal` class are initially invisible. A `scroll` event listener in `Layout` uses `getBoundingClientRect()` to detect when `.reveal` elements enter the viewport (within 100px), then adds `.active` class which triggers the CSS animation.

**Q62. How would you scale SHREE for 100,000 users?**
> - MongoDB Atlas auto-scaling clusters
> - Redis for session caching and rate limiting
> - Kubernetes with horizontal pod autoscaling for the backend
> - CDN for all static assets (Cloudinary already used)
> - Database indexing on frequently queried fields
> - Load balancing across multiple Express instances

**Q63. What happens when two users register with the same email?**
> The `email` field in the User schema has `unique: true`, creating a MongoDB unique index. The server catches the duplicate key error and returns `400 — "An account with this email already exists."` before even hashing the password.

**Q64. Why is the JWT token valid for 30 days?**
> It balances security and user convenience. A shorter expiry (e.g., 1 hour) requires frequent re-login. A longer expiry risks token theft. 30 days is suitable for an e-commerce platform. For higher security, a refresh token system could be added.

**Q65. What is the purpose of `morgan('dev')` in SHREE?**
> Morgan logs every HTTP request in a concise colored format: `GET /api/products 200 5.234 ms - 1024`. This makes debugging API calls during development significantly easier by showing method, route, status code, and response time.

---

## 📋 QUICK REFERENCE TABLE

| Topic | Answer |
|-------|--------|
| Frontend Framework | React 19 |
| Build Tool | Vite 8 |
| Backend Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Auth Method | JWT (30-day expiry) |
| Password Hashing | bcrypt (12 rounds) |
| Image Storage | Cloudinary CDN |
| State Management | Context API (CartContext) |
| Routing | React Router DOM v7 |
| Total API Endpoints | 16 |
| DB Collections | 4 (Users, Products, Orders, Inquiries) |
| User Roles | collector, admin |
| Backend Testing | Jest + Supertest |
| Frontend Testing | Vitest + React Testing Library |
| Backend Port | 5000 |
| Frontend Dev Port | 5173 |

---

> *All the best for your viva! — SHREE Collective Project*
