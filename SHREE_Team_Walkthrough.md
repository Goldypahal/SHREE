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

## Contributions
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

---

---

# 🅑 PERSON B — Backend Developer

## Introduction Script
> *"I built the entire backend server for SHREE using Node.js and Express.js. My work includes designing and implementing all 16 REST API endpoints across 4 route groups, building the JWT authentication system, writing middleware for security and logging, and setting up the complete server infrastructure."*

## Contributions
- Set up **Express.js** server with proper middleware pipeline
- Implemented **CORS** with a strict origin allowlist
- Built **JWT authentication** — register, login, token generation (30-day expiry)
- Implemented **bcrypt password hashing** with 12 salt rounds
- Built `protect()` middleware for JWT verification on private routes
- Built `adminOnly()` middleware for role-based access control
- Implemented all **Product routes** — GET all, GET by ID, POST (admin), PUT (admin), DELETE (admin), seed
- Implemented all **Order routes** — place order, get user orders, get single order, admin get all, update status
- Implemented all **Auth routes** — register, login, get me, add address
- Implemented all **Inquiry routes** — submit (public), get all (admin)
- Added **Morgan** HTTP request logger in dev mode
- Wrote the **seed script** (`seed.js`) to populate the database
- Set up **environment variable** management with `dotenv`
- Configured the **health check** endpoint at `/api/health`

## How to Walk Through (Demo Script)

**Step 1 — Server Entry Point**
> *"Our server starts in `server.js`. It loads environment variables, connects to MongoDB, sets up middleware (CORS, JSON parser, Morgan logger), mounts all 4 route groups, and starts listening on port 5000."*

**Step 2 — Authentication Flow**
> *"When a user registers, we check if the email already exists. If not, we create the user — Mongoose automatically hashes the password via the `pre('save')` hook. We then return a JWT token. On login, we fetch the user with the password field (normally hidden), compare using bcrypt, and return a new token."*

**Step 3 — Protected Routes**
> *"Any route that requires login goes through the `protect()` middleware. It reads the Authorization header, verifies the JWT, fetches the user from the database, and attaches it to `req.user`. Admin routes additionally pass through `adminOnly()` which checks the role field."*

**Step 4 — Product API**
> *"Public users can GET all products and GET a single product. Only admins can create, update, or delete products. We also have a seed endpoint for bulk-loading the initial catalog."*

**Step 5 — Order Flow**
> *"When a logged-in user places an order, the backend receives items, total, payment method, and shipping address, creates the order with `status: pending`, and returns it. Admins can see all orders and update their status through the lifecycle: pending → confirmed → shipped → delivered."*

---

## 🅑 Person B — Viva Questions

**Q1. What is Node.js?**
> Node.js is a JavaScript runtime built on Chrome's V8 engine that allows running JavaScript on the server. SHREE's backend runs on Node.js ≥22.

**Q2. What is Express.js?**
> Express is a minimal web framework for Node.js. I used it to define REST API routes, apply middleware, and send JSON responses.

**Q3. What is middleware? Name the ones used in SHREE.**
> Functions that run during the request-response cycle: `cors()`, `express.json()`, `morgan()`, `protect()`, `adminOnly()`.

**Q4. What is JWT and how does it work in SHREE?**
> JWT is a signed token with 3 parts: header.payload.signature. On login, the server creates a token using `jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' })`. The client sends it in `Authorization: Bearer <token>`. The `protect()` middleware verifies it with `jwt.verify()`.

**Q5. How does the `protect()` middleware work?**
> 1. Reads the Authorization header, extracts the token. 2. Calls `jwt.verify()`. 3. Fetches the user from MongoDB. 4. Attaches to `req.user`. 5. Returns 401 if token is missing or invalid.

**Q6. What is bcrypt and why is it used?**
> bcrypt is a one-way password hashing library. SHREE uses 12 salt rounds. Passwords are hashed in the Mongoose `pre('save')` hook before storing. On login, `bcrypt.compare()` checks the plain password against the stored hash.

**Q7. What is `select: false` on the password field?**
> It prevents the password from being returned in any Mongoose query by default. Only the login route fetches it explicitly with `.select('+password')`.

**Q8. What is CORS and why is it configured in SHREE?**
> Cross-Origin Resource Sharing is a browser security policy blocking requests from different origins. SHREE allows only whitelisted origins (localhost ports + production URL) to prevent unauthorized API access.

**Q9. What is the difference between GET, POST, PUT, DELETE?**
> GET — retrieve, POST — create, PUT — update, DELETE — remove. SHREE uses all four across its 16 endpoints.

**Q10. What is `dotenv` and why is it used?**
> It loads secrets from a `.env` file into `process.env`, keeping credentials like `MONGO_URI`, `JWT_SECRET`, and Cloudinary keys out of source code.

**Q11. What is Role-Based Access Control?**
> RBAC restricts access based on user role. SHREE has `collector` (default) and `admin`. The `adminOnly()` middleware checks `req.user.role === 'admin'` — returning 403 if not.

**Q12. Can a user bypass admin routes from the frontend?**
> No. Even if someone manually calls an admin endpoint, `adminOnly()` on the server checks the verified JWT's role. Since the JWT is signed with `JWT_SECRET`, the role cannot be forged client-side.

**Q13. What is Morgan and what does it log?**
> Morgan is an HTTP logger middleware. In dev mode it logs: method, URL, status code, and response time for every request — e.g. `GET /api/products 200 5ms`.

**Q14. What is the order status lifecycle?**
> `pending → confirmed → shipped → delivered` or `cancelled`. Admins update it via `PUT /api/orders/:id/status`.

---

---

# 🅒 PERSON C — Database & Cloud Engineer

## Introduction Script
> *"I was responsible for everything related to data storage and cloud services in SHREE. I designed and implemented all 4 MongoDB database collections using Mongoose, configured Firebase for authentication, set up Cloudinary for product image hosting, and handled the project's deployment and environment configuration."*

## Contributions
- Designed all **4 Mongoose schemas**: User, Product, Order, Inquiry
- Implemented **password hashing** hook in the User model (`pre('save')`)
- Implemented **sub-documents**: `savedAddresses[]` in User, `items[]` in Order
- Set up **MongoDB Atlas** cloud cluster connection via `config/db.js`
- Configured **Firebase** project (`shree-studio-2026`) with Auth, Firestore, and Storage
- Set up **Cloudinary** for product image CDN (with Multer integration)
- Wrote **Firestore security rules** (`firestore.rules`)
- Created **Firestore indexes** (`firestore.indexes.json`)
- Managed the **seed script** for populating initial product catalog
- Handled all **environment variables** (`.env`, `.env.example`)
- Configured **Firebase Hosting** (`firebase.json`) for frontend deployment

## How to Walk Through (Demo Script)

**Step 1 — Database Design**
> *"We use MongoDB — a NoSQL document database — because our product data is flexible. A lehenga has different attributes than a sherwani. Mongoose gives us schema validation, middleware hooks, and model methods on top of MongoDB."*

**Step 2 — User Model**
> *"The User schema stores name, email, hashed password, Google ID for OAuth, role (collector/admin), and an array of saved shipping addresses as sub-documents. The password is never returned in queries by default — `select: false` handles this."*

**Step 3 — Product Model**
> *"Products store name, price, category, description, a primary image URL, a gallery array of images, detail strings like fabric type, an inStock boolean, and a reviews array. This flexible structure handles all product types."*

**Step 4 — Order Model**
> *"Orders reference the User via ObjectId (like a foreign key). They store an items array (sub-documents with productId, name, price, size, quantity), total, payment method, shipping address, and a status enum with 5 states."*

**Step 5 — Cloudinary**
> *"Product images are uploaded to Cloudinary — a cloud CDN. The admin uploads an image via the product form, Multer handles the file, and `multer-storage-cloudinary` streams it directly to Cloudinary. The returned URL is stored in MongoDB."*

**Step 6 — Firebase**
> *"Firebase is configured for Google Sign-In (Auth), Firestore as a secondary database option, and Hosting for deploying the frontend. The project ID is `shree-studio-2026`."*

---

## 🅒 Person C — Viva Questions

**Q1. What is MongoDB?**
> MongoDB is a NoSQL document database storing data as JSON-like BSON documents. SHREE uses it for all 4 collections: users, products, orders, inquiries.

**Q2. What is Mongoose?**
> Mongoose is an ODM (Object Document Mapper) for MongoDB. It provides schemas, validation, middleware hooks (`pre`/`post`), and model methods.

**Q3. What is a Mongoose Schema?**
> A schema defines the structure, types, and validation rules for documents. Example: Product schema defines `name: String`, `price: Number`, `inStock: Boolean`, etc.

**Q4. Why MongoDB over MySQL for SHREE?**
> Product data is heterogeneous — lehengas, sarees, and sherwanis have different attributes. MongoDB's flexible schema allows this without table migrations. Arrays (gallery, reviews, details) are natural in documents.

**Q5. What is a sub-document in Mongoose?**
> A document embedded inside another document — not a separate collection. SHREE examples: `savedAddresses[]` in User and `items[]` in Order.

**Q6. How are orders linked to users?**
> Using `userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }` — similar to a foreign key. The `populate('userId', 'name email')` call resolves this reference in the admin orders view.

**Q7. What is `populate()` in Mongoose?**
> It replaces an ObjectId reference with the actual document from the referenced collection. SHREE uses it in admin orders: `.populate('userId', 'name email')`.

**Q8. What is the `pre('save')` hook in the User model?**
> A Mongoose middleware that runs before saving a document. SHREE uses it to hash the password with bcrypt before it's stored in the database.

**Q9. What is Cloudinary and how is it integrated?**
> Cloudinary is a cloud media CDN. `multer` handles the multipart file upload, `multer-storage-cloudinary` streams it to Cloudinary, and the returned URL is saved in the Product's `image` field in MongoDB.

**Q10. What is Firebase and what services does SHREE use?**
> Firebase is Google's app development platform. SHREE uses: Firebase Auth (Google Sign-In), Firestore (secondary database), Firebase Storage, and Firebase Hosting for frontend deployment. Project ID: `shree-studio-2026`.

**Q11. What are Firestore Security Rules?**
> Rules defined in `firestore.rules` that control read/write access to Firestore collections. They act as server-side security without needing custom API code.

**Q12. What is the difference between SQL and NoSQL?**
> SQL: relational, fixed schema, uses JOINs. NoSQL: flexible schema, document-based, scales horizontally. SHREE uses NoSQL because product data is heterogeneous and documents with arrays (reviews, gallery) map naturally.

**Q13. What is indexing in MongoDB?**
> Indexes speed up queries by maintaining a sorted structure on a field. The `email` field in User has `unique: true` which auto-creates a unique index — preventing duplicates and enabling fast lookups.

**Q14. What is the purpose of `.env` and `.env.example`?**
> `.env` stores actual secrets (MONGO_URI, JWT_SECRET, Cloudinary keys) and is `.gitignore`d. `.env.example` is a safe template committed to the repo showing contributors which variables to configure.

**Q15. How would you scale the database for 100,000 users?**
> Use MongoDB Atlas auto-scaling clusters (M10+), add indexes on frequently queried fields (`userId` in orders, `category` in products), enable point-in-time recovery, and use Atlas Search for full-text product search.

---

## 📋 SUMMARY — Who Presents What

| Presentation Section | Person |
|----------------------|--------|
| Project intro & homepage demo | Person A |
| Product cards, cart, checkout demo | Person A |
| React architecture, Context API | Person A |
| Server setup, middleware pipeline | Person B |
| Auth flow (register/login/JWT) | Person B |
| API endpoints demo (Postman/browser) | Person B |
| Database schema walkthrough | Person C |
| Cloudinary & Firebase setup | Person C |
| Deployment & environment config | Person C |

---

> *SHREE Collective — Built by a team of 3. © 2026*
