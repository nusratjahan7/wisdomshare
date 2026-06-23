# 📖 WisdomShare

A full-stack platform for writing, sharing, and discovering personal wisdom lessons. Users can publish free or premium lessons, engage with the community, and access curated content — while admins manage the platform with a dedicated dashboard.

🌐 **Live Site:** [wisdomshare.vercel.app](https://wisdomshare.vercel.app)
🔧 **Backend Repo:** [wisdomshare-server](https://github.com/nusratjahan7/wisdomshare-server)

---

## ✨ Features

### 👤 User Features

- Register and log in securely via **BetterAuth**
- Browse all lessons — free lessons visible to everyone, **premium lessons require login + Stripe payment**
- Lesson detail page is **protected** — login required to view
- Create, edit, and delete personal lessons
- Like, save, comment on, and report lessons
- Free plan save limit enforced per user
- Update profile information

### 🛡️ Admin Features

- Promote users to admin role
- Delete users from the platform
- Mark lessons as **Featured** — shown on the homepage
- View and manage all lessons across the platform
- Access reported lessons and user reports

### 🏠 Homepage

- Featured Lessons section (curated by admin, backed by a dedicated MongoDB collection)
- Public lesson feed — free content accessible without login

### 💳 Payments

- **Stripe** integration for premium lesson access
- Plan-based access control (free vs. premium)

---

## 🛠️ Tech Stack

### Frontend

| Technology               | Purpose                            |
| ------------------------ | ---------------------------------- |
| Next.js (JavaScript/JSX) | React framework, SSR/SSG, routing  |
| Tailwind CSS             | Utility-first styling              |
| Framer Motion            | Animations and transitions         |
| Recharts                 | Data visualization in dashboards   |
| React Hot Toast          | Toast notifications                |
| BetterAuth               | Authentication (client-side hooks) |
| Stripe.js                | Payment integration                |

### Backend

| Technology              | Purpose                      |
| ----------------------- | ---------------------------- |
| Node.js + Express.js    | REST API server              |
| MongoDB (native driver) | Database                     |
| BetterAuth              | Session-based authentication |
| Stripe                  | Payment processing           |
| Vercel                  | Deployment                   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payment keys)

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/nusratjahan7/wisdomshare.git
cd wisdomshare
npm install

# Backend
git clone https://github.com/nusratjahan7/wisdomshare-server.git
cd wisdomshare-server
npm install
```

### 2. Environment Variables

**Frontend `.env.local`:**

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string
AUTH_DB_NAME=your_auth_db_name

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Backend `.env`:**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

### 3. Run the development servers

```bash
# Backend (from wisdomshare-server/)
npm start

# Frontend (from wisdomshare/)
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

---

## 📊 Dashboards

### User Dashboard

- View and manage all personal lessons (create, edit, delete)
- See saved lessons (with free plan save limit)
- Update profile (name, avatar, bio)

### Admin Dashboard

- **Users Table** — promote to admin, delete users
- **Lessons Table** — manage all lessons, mark as featured
- **Reports** — view reported content from users
- **Analytics** — charts powered by Recharts

---

## 🔒 Auth & Access Control

Authentication is handled by **BetterAuth**. Route protection is enforced at both the frontend (middleware/redirects) and API level.

| Route                  | Access                             |
| ---------------------- | ---------------------------------- |
| `/` (Homepage)         | Public                             |
| `/lessons`             | Public (free lessons visible)      |
| `/lessons/[id]`        | Login required                     |
| Premium lesson content | Login + active Stripe subscription |
| `/dashboard/user`      | Authenticated users                |
| `/dashboard/admin`     | Admin role only                    |

---

## 💡 Key Implementation Details

- **Featured Lessons** — stored in a dedicated MongoDB collection; admins toggle featured status per lesson
- **Save Limit** — free-plan users have a capped number of saved lessons, enforced server-side
- **Stripe Payments** — checkout session created server-side; webhook updates user subscription status
- **Reports System** — users can flag lessons; admins review reports in the dashboard
- **Lesson Interactions** — likes, saves, comments, and reports all handled via dedicated API endpoints

---

## 📦 Backend Dependencies

```json
{
  "express": "^5.2.1",
  "mongodb": "^7.3.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2"
}
```

---

## 🌐 Deployment

Both frontend and backend are deployed on **Vercel**.

- Frontend: [wisdomshare.vercel.app](https://wisdomshare.vercel.app)
- Backend: [wisdomshare-server.vercel.app](https://wisdomshare-server.vercel.app)

The backend uses a `vercel.json` config to serve the Express app as a serverless function.

---

## 👩‍💻 Author

**Nusrat Jahan**
[GitHub](https://github.com/nusratjahan7)
