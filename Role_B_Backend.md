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
