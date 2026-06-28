# 🚀 Alex.dev — Full Stack Portfolio

A modern, professional portfolio website built with cutting-edge technologies.

## ✨ Features

- **Dark/Light Mode** — Smooth theme switching with persistent preference
- **Multilingual** — English, O'zbek, Русский (react-i18next)
- **Projects CRUD** — Full API with MongoDB
- **Search & Filter** — Real-time project filtering by category, name, tech
- **Favorites** — Save projects with Redux (persisted to localStorage)
- **Skeleton Loading** — Professional loading states
- **Toast Notifications** — Feedback for all user actions
- **Framer Motion** — Smooth page and component animations
- **404 Page** — Custom animated not-found page
- **Mobile Menu** — Responsive hamburger navigation
- **Scroll To Top** — Floating button
- **Form Validation** — Contact form with real-time validation
- **React Query** — Smart data fetching with caching

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Redux Toolkit (Theme, Favorites, Language)
- TanStack React Query
- React Router v6
- Framer Motion
- react-i18next
- Headless UI
- Lucide React Icons
- react-hot-toast
- CSS Modules

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

## 📁 Project Structure

```
imtixon-6.2/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/            # Redux store + hooks
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer, Layout
│   │   │   └── ui/         # Skeleton, ScrollToTop
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks (useForm)
│   │   ├── locales/        # i18n (en, uz, ru)
│   │   ├── pages/          # All pages
│   │   ├── services/       # Axios API
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # i18n config
│   └── .env
└── server/                 # Express backend
    ├── src/
    │   ├── config/         # MongoDB connection
    │   ├── controllers/    # Route handlers
    │   ├── models/         # Mongoose schemas
    │   ├── routes/         # Express routes
    │   └── seed.js         # Database seeder
    ├── index.js
    └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd server
# Edit .env and add your MongoDB URI
npm install
npm run seed    # Populate DB with sample projects
npm run dev     # Start server on :5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev     # Start on :5173
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Query Parameters (GET /projects)
- `category` — frontend, backend, fullstack, mobile, other
- `status` — completed, in-progress, archived
- `featured` — true/false
- `search` — text search in title, description, technologies
- `sort` — `-createdAt` (newest), `createdAt` (oldest)

## 🌍 Deploy

- **Frontend**: Vercel — connect GitHub repo, set `VITE_API_URL`
- **Backend**: Render — set `MONGODB_URI` and `CLIENT_URL` env vars

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app
```

### Client (.env)
```
VITE_API_URL=https://your-backend.render.com/api
```

---

Made with ❤️ using React + TypeScript
