# 📖 WisdomShare

A full-stack platform for writing, sharing, and discovering personal wisdom lessons. Users can publish free or premium lessons, engage with the community, and access curated content — while admins manage the platform with a dedicated dashboard.

🌐 **Live Site:** [wisdomshare.vercel.app](https://wisdomshare.vercel.app)
🔧 **Backend Repo:** [wisdomshare-server](https://github.com/nusratjahan7/wisdomshare-server)

---

## ✨ Features

### 👤 User Features

- Register and log in securely via **BetterAuth** (email/password + Google OAuth)
- Browse all lessons — free lessons visible to everyone, **premium lessons require login + Stripe payment**
- Lesson detail page is **protected** — login required to view
- Create, edit, and delete personal lessons
- **AI Writing Assistant** — suggests titles, subtitles, short descriptions, and tags from your draft, and can tighten your prose (with one-click undo), powered by Google Gemini
- **AI Lesson Summarizer** — every published lesson gets an auto-generated TL;DR, shown on cards and the detail page
- Like, save, comment on (with threaded replies, one level deep), and report lessons
- **Follow other authors** — see followers/following counts and lists in your dashboard, follow directly from a comment or an author's profile
- **Following Feed** (`/lessons/following`) — a personalized feed of lessons from authors you follow
- **Notifications** — likes, comments/replies, follows, and admin moderation actions on your content all generate a notification, visible via the bell icon in the navbar (polls every 30s, unread badge, mark-as-read/mark-all-read)
- Free plan save limit enforced per user
- Update profile information

### 🛡️ Admin Features

- Promote users to admin role (promoted users get a notification)
- Delete users from the platform
- Mark lessons as **Featured** — shown on the homepage (owner gets notified, idempotent — no duplicate notifications for an already-featured lesson)
- Mark lessons as **Reviewed** (owner gets notified, idempotent)
- Delete a lesson via moderation or the reports queue — owner is notified even though the lesson itself is gone
- View and manage all lessons across the platform
- Access reported lessons and user reports — new reports notify all admins; resolving a report notifies both the lesson owner and the original reporter(s)
- New lesson submissions notify all admins

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

| Technology              | Purpose                                  |
| ----------------------- | ----------------------------------------- |
| Node.js + Express.js    | REST API server                          |
| MongoDB (native driver) | Database                                 |
| BetterAuth              | Session-based authentication             |
| Google Gemini (`@google/genai`) | AI writing assistant + lesson summaries |
| Stripe                  | Payment processing                       |
| Vercel                  | Deployment                               |

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
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string
AUTH_DB_NAME=your_auth_db_name

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> ⚠️ `NEXT_PUBLIC_BETTER_AUTH_URL` is required — without it, `authClient` can't reach the auth API and sign-in silently breaks.
>
> If your `MONGODB_URI` uses the `mongodb+srv://` scheme and your network blocks DNS SRV lookups (common on some corporate/restricted networks — surfaces as `querySrv ECONNREFUSED`), use the standard `mongodb://` connection string with explicit shard hosts instead (get it from Atlas → Connect → Drivers, or resolve the SRV/TXT records yourself via a DNS-over-HTTPS query).

**Backend `.env`:**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
AUTH_DB_NAME=your_auth_db_name

GEMINI_API_KEY=your_gemini_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

> Get a Gemini key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey). The AI features default to `gemini-flash-latest` — the free tier for `gemini-pro-latest` may return `429` quota errors depending on your account.
>
> **`AUTH_DB_NAME` and `MONGODB_URI` must match exactly between the frontend and backend `.env` files** — if they point at different databases, sign-in will appear to succeed (BetterAuth writes the session on the frontend's DB) while every backend API call 401s, because the backend can't find that session in its own DB.

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
- **Followers & Following** — see who follows you and who you follow, with quick follow/unfollow from each row
- Update profile (name, avatar, bio)

### Admin Dashboard

- **Users Table** — promote to admin, delete users
- **Lessons Table** — manage all lessons, mark as featured or reviewed
- **Reports** — view reported content from users, dismiss or remove the lesson
- **Analytics** — charts powered by Recharts

---

## 🔒 Auth & Access Control

Authentication is handled by **BetterAuth**. Route protection is enforced at both the frontend (middleware/redirects) and API level.

| Route                    | Access                             |
| ------------------------- | ----------------------------------- |
| `/` (Homepage)            | Public                             |
| `/lessons`                | Public (free lessons visible)      |
| `/lessons/[id]`           | Login required                     |
| `/lessons/following`      | Login required                     |
| `/authors/[id]`           | Public                             |
| Premium lesson content    | Login + active Stripe subscription |
| `/dashboard/user`         | Authenticated users                |
| `/dashboard/admin`        | Admin role only                    |

---

## 💡 Key Implementation Details

- **Featured Lessons** — stored in a dedicated MongoDB collection; admins toggle featured status per lesson
- **Save Limit** — free-plan users have a capped number of saved lessons, enforced server-side
- **Stripe Payments** — checkout session created server-side; webhook updates user subscription status
- **Reports System** — users can flag lessons; admins review reports in the dashboard
- **Lesson Interactions** — likes, saves, comments (with one-level-deep threaded replies), and reports all handled via dedicated API endpoints
- **Notifications** — a centralized `NOTIFICATION_TYPES` enum on the backend (`LESSON_LIKED`, `NEW_COMMENT`, `LESSON_FEATURED`, `LESSON_REVIEWED`, `LESSON_DELETED`, `LESSON_PROMOTED`, `NEW_LESSON`, `NEW_FOLLOWER`, `REPORT_CREATED`, `REPORT_RESOLVED`); every write normalizes the recipient's user ID to a string, since MongoDB's default `_id` is a BSON ObjectId while the rest of this codebase treats user IDs as strings elsewhere (`lesson.userId`, `follows.*`) — an ObjectId/string mismatch here will silently break notification delivery even though the record was written correctly
- **Follow System** — a `follows` collection (`followerId`/`followingId`); the Following Feed reuses the existing paginated `GET /api/lessons` endpoint with a `following=<comma-ids>` filter rather than a separate feed endpoint
- **AI Features** — `generateSummary()` runs synchronously on lesson publish/update (failure never blocks the write, `summary` is just `null`); `/api/ai/suggest-metadata` and `/api/ai/tighten-prose` wrap Gemini calls in a retry helper since the free tier intermittently returns `503 UNAVAILABLE` under load

---

## 📦 Backend Dependencies

```json
{
  "@google/genai": "^2.24.0",
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
