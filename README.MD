<div align="center">

# 🌐 2minsite — AI-Powered Website Builder SaaS

> Build, launch, and manage stunning e-commerce websites in minutes — no coding required.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Website Themes](#-website-themes)
- [API Routes](#-api-routes)
- [License](#-license)

---

## 🚀 Overview

**TWOMINSITE** is a full-stack SaaS platform that lets users create beautiful, themed e-commerce websites without writing a single line of code. Users can manage products, track analytics, and launch their storefront — all from a polished dashboard.

---

## 📸 Screenshots

###  Landing Page
![Landing Page](images/frontendimages/landingpage.png)

###  Home (Logged In)
![Home](images/frontendimages/homeuser.png)

###  Dashboard
![Dashboard](images/frontendimages/managestore.png)

### Create Website
![Create Website](images/frontendimages/createwebsite.png)

###  Add Product
![Add Product](images/frontendimages/addproduct.png)

###  Pricing
![Pricing](images/frontendimages/pricing.png)

###  Login & Register
| Login | Register |
|-------|----------|
| ![Login](images/frontendimages/login.png) | ![Register](images/frontendimages/regsiter.png) |

### ℹ About & Contact
| About | Contact Us |
|-------|------------|
| ![About](images/frontendimages/about.png) | ![Contact](images/frontendimages/contactus.png) |

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black&style=flat-square) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square) | Build Tool |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) | Styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=flat-square) | Animations |
| ![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white&style=flat-square) | State Management |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=flat-square) | HTTP Client |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white&style=flat-square) | Routing |
| ![Recharts](https://img.shields.io/badge/Recharts-FF6384?logo=chartdotjs&logoColor=white&style=flat-square) | Analytics Charts |
| ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?logo=lucide&logoColor=white&style=flat-square) | Icons |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=flat-square) | Image Uploads |

### Backend

| Technology | Purpose |
|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square) | Runtime |
| ![Express](https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=white&style=flat-square) | Web Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) | Type Safety |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square) | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=flat-square) | ODM |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat-square) | Authentication |
| ![Bcrypt](https://img.shields.io/badge/Bcrypt-4A90D9?logo=lock&logoColor=white&style=flat-square) | Password Hashing |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white&style=flat-square) | Schema Validation |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?logo=gmail&logoColor=white&style=flat-square) | Email Service |
| ![Winston](https://img.shields.io/badge/Winston-231F20?logo=datadog&logoColor=white&style=flat-square) | Logging |
| ![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-FF4500?logo=shield&logoColor=white&style=flat-square) | API Protection |

---

## ✨ Features

- 🔐 **Auth System** — Secure JWT-based registration, login & logout with cookie management
- 🎨 **8 Website Themes** — Choose from Dark, Forest, Gothic, Neon Future, Soft Glass & more
- 🛒 **Product Management** — Add, update, and manage store products with image uploads via Cloudinary
- 📊 **Analytics Dashboard** — Visual charts powered by Recharts for store performance
- 📧 **Email Notifications** — Transactional emails via Nodemailer
- 🛡️ **Input Validation** — Full Zod schema validation on all API endpoints
- 🚦 **Rate Limiting** — Protection against API abuse
- 📝 **Structured Logging** — Winston-powered server logs
- 📱 **Responsive UI** — Mobile-first design with Tailwind CSS
- ⚡ **Animated UX** — Smooth transitions with Framer Motion

---

## 📁 Project Structure



├── backend/
│   └── src/
│       ├── controller/        # Business logic
│       ├── db/                # MongoDB connection
│       ├── middleware/        # Auth & upload guards
│       ├── models/            # Mongoose schemas
│       ├── routes/            # Express route definitions
│       ├── types/             # TypeScript interfaces
│       ├── utils/             # JWT, mailer, logger, website helpers
│       └── zodprotection/     # Zod validation schemas
│
├── frontend/
│   └── src/
│       ├── api/               # Axios instance
│       ├── components/        # Reusable UI components
│       ├── pages/             # Route-level page components
│       ├── store/             # Zustand global state
│       └── cloudinary/        # Image upload helper
│
├── images/                    # Screenshot assets
│   ├── frontendimages/
│   └── themeswebsiteimage/
│
└── websites/                  # Generated HTML website templates
├── darkfantasy/
└── premium/

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/webcraft.git
cd webcraft
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

See [Environment Variables](#-environment-variables) below.

### 5. Run in Development

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## 🎨 Website Themes

| Theme | Preview |
|-------|---------|
| **Default** | ![Default](images/themeswebsiteimage/default.png) |
| **Dark** | ![Dark](images/themeswebsiteimage/dark.png) |
| **Dark Blue** | ![Dark Blue](images/themeswebsiteimage/darkblue.png) |
| **Forest** | ![Forest](images/themeswebsiteimage/forest.png) |
| **Gothic** | ![Gothic](images/themeswebsiteimage/gothic.png) |
| **Green Woods** | ![Green Woods](images/themeswebsiteimage/greenwoods.png) |
| **Neon Future** | ![Neon Future](images/themeswebsiteimage/neonfuture.png) |
| **Soft Glass** | ![Soft Glass](images/themeswebsiteimage/softglass.png) |

---

## 🔌 API Routes

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Login & receive JWT cookie |
| `POST` | `/api/user/logout` | Logout & clear cookie |
| `PUT` | `/api/user/update-profile` | Update user profile |

### Website Builder
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/website/create` | Create a new website |
| `PUT` | `/api/website/update` | Update website settings |
| `GET` | `/api/website/preview` | Preview generated site |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Fetch dashboard stats |
| `POST` | `/api/dashboard/product` | Add a product |

### Misc
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/email/send` | Send contact email |

---

## 📜 License

This project is licensed under the **ISC License**.

---

<div align="center">
sabih ur rehamn ---author
Made with  using React, Express & MongoDB

</div>

