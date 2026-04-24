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
