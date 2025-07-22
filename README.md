# 🛍️ Cloth - Ecom

A full-featured, modern **E-Commerce platform for clothing** built using the **MERN stack** with separate interfaces for users and admin. It includes user authentication, product browsing, shopping cart, order placement, and admin product/order management.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👤 User Side (`frontend`)
- User registration and login (JWT-based)
- Browse clothing products with images
- Filter, search, and view details of each item
- Add to cart and manage items
- Secure checkout with **Stripe** and **Razorpay** support
- View past orders

### 🛠️ Admin Panel (`admin`)
- Admin login interface
- Add, edit, and delete products
- View and manage user orders
- Manage product inventory and images
- Hosted on **Vercel**

### ⚙️ Backend API (`backend`)
- Built with Node.js + Express
- MongoDB database with Mongoose ODM
- Secure routes using JWT & middleware
- Cloudinary integration for image upload
- Multer for file handling
- CORS and environment configuration with dotenv

---

## 🧰 Tech Stack

| Area         | Technology                        |
|--------------|------------------------------------|
| Frontend     | React, Vite, Tailwind (or CSS)     |
| Backend      | Node.js, Express, MongoDB, Mongoose|
| Admin Panel  | React, Vite                        |
| Auth         | JWT, Bcrypt                        |
| File Upload  | Multer, Cloudinary                 |
| Payments     | Razorpay, Stripe                   |
| Hosting      | Vercel                             |

---

## 📁 Folder Structure
Cloth - Ecom/
├── admin/ # Admin dashboard (React + Vite)
├── backend/ # Backend API (Node.js + Express)
├── frontend/ # User interface (React + Vite)

Each folder contains its own:
- `package.json`
- `.env` (for environment config)
- `src/` and `public/` for components and assets

---

## 🚀 Installation

> Make sure you have **Node.js**, **MongoDB**, and **npm** installed.

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/cloth-ecom.git
cd cloth-ecom

## Backend Setup
cd backend
npm install
# Add your .env file (MongoDB URI, JWT_SECRET, etc.)
npm run dev

## Frontend Setup
cd ../frontend
npm install
# Add your .env file (e.g., VITE_BACKEND_URL)
npm run dev
## Frontend Setup
cd ../admin
npm install
# Add your .env file (e.g., VITE_BACKEND_URL)
npm run dev

🔌 API Routes
Method	Endpoint	Description
GET	/api/v1/products	Get all products
POST	/api/v1/user/register	User registration
POST	/api/v1/user/login	User login
POST	/api/v1/cart	Add to cart
POST	/api/v1/order	Place an order
GET	/api/v1/order/:id	Get order by ID

(More routes available in backend/routes/ folder.)
🌐 Deployment
Backend: Deployed on Render/Node environment or local

Frontend: Deployed on Vercel

Admin Panel: Deployed on Vercel

Make sure to update API URLs in .env accordingly.
🤝 Contributing
Contributions are welcome! Feel free to fork this repo, open issues or submit pull requests.
