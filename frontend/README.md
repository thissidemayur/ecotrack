# 🌍 ecoTrack Frontend - Carbon Footprint Calculator UI

**A modern, accessible React + Next.js web application for tracking and managing household carbon footprints with real-time visualizations and analytics.**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

---

## 🎯 Project Overview

The ecoTrack frontend provides an intuitive, responsive interface for users to:
- Register and securely login
- Calculate their carbon footprint from daily activities
- Track emissions over time with interactive charts
- View personalized recommendations to reduce their impact
- Compare performance on leaderboards
- Manage their profile and preferences

Built with **Next.js 16** and **React 19**, the application features:
- ⚡ **Server Components** for optimized performance
- 🎨 **Accessible UI** with Radix UI components
- 🎯 **Responsive Design** using TailwindCSS
- 📊 **Rich Visualizations** with Recharts
- 🔐 **Secure Authentication** with JWT tokens
- 🌙 **Dark Mode Support** with next-themes

---

## ✨ Features

### User Features
- **🔐 Authentication**
  - Secure registration with email validation
  - Login/logout with JWT token management
  - Password reset functionality
  - Session persistence across browser restarts

- **📊 Carbon Footprint Calculation**
  - Multi-category input (Energy, Transport, Waste, Consumption)
  - Real-time CO₂e calculation display
  - Instant feedback and breakdown by category
  - Historical tracking and trend analysis

- **📈 Dashboard & Analytics**
  - Visual charts showing emission trends
  - Category-wise breakdown with pie charts
  - Progress indicators and monthly comparisons
  - Personal statistics and insights

- **🎯 Recommendations**
  - Personalized tips based on user data
  - Category-specific reduction strategies
  - Impact estimation for changes

- **👤 Profile Management**
  - View and edit personal information
  - Update password securely
  - Preferences and notification settings
  - Activity history and export data

### Admin Features
- **🌐 Analytics Dashboard**
  - Global emission statistics
  - Top performers leaderboard
  - User growth charts
  - Regional distribution analysis

- **⚙️ Factor Management**
  - View all emission factors
  - Create new factors
  - Update factor values
  - Delete outdated factors

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 16 | React meta-framework with SSR/SSG |
| **UI Library** | React 19 | Modern component-based UI |
| **Language** | TypeScript | Type safety and better DX |
| **Styling** | TailwindCSS 4 | Utility-first CSS framework |
| **Components** | Radix UI | Unstyled, accessible components |
| **Forms** | React Hook Form | Efficient form state management |
| **Validation** | Zod | Schema validation |
| **State Management** | Zustand | Lightweight state store |
| **HTTP Client** | Axios | Promise-based HTTP requests |
| **Charts** | Recharts | Composable charting library |
| **Icons** | Lucide React | Beautiful, consistent icons |
| **Animations** | Framer Motion | Smooth, performant animations |
| **Notifications** | Sonner | Toast notifications |
| **Theme** | next-themes | Dark mode support |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- **Backend API** running on `http://localhost:3000/api`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── admin/             # Admin pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   └── providers.tsx      # App providers (Zustand, Themes)
│   │
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Radix UI base components
│   │   ├── forms/             # Form components
│   │   ├── charts/            # Chart components
│   │   ├── layout/            # Header, Navbar, Footer
│   │   ├── dashboard/         # Dashboard-specific components
│   │   └── admin/             # Admin-specific components
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useFootprint.ts    # Footprint calculation hook
│   │   └── useApi.ts          # API request hook
│   │
│   ├── lib/                   # Utilities and helpers
│   │   ├── api.ts             # Axios instance
│   │   ├── auth.ts            # Auth utilities
│   │   ├── validators.ts      # Zod schemas
│   │   └── utils.ts           # General utilities
│   │
│   ├── store/                 # Zustand state management
│   │   ├── authStore.ts       # Auth state
│   │   ├── footprintStore.ts  # Footprint data state
│   │   └── uiStore.ts         # UI state (theme, modals, etc)
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── api.ts             # API response types
│   │   ├── models.ts          # Data model types
│   │   └── forms.ts           # Form types
│   │
│   └── styles/                # Global styles
│
├── public/                    # Static assets (images, fonts)
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── package.json
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # TailwindCSS configuration
├── .eslintrc.json             # ESLint configuration
├── .env.local                 # Environment variables (git ignored)
└── .env.example               # Environment variables template
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code (if Prettier is configured)
npm run format
```

### Development Workflow

1. **Component Development**
   ```bash
   # Start dev server
   npm run dev
   
   # Create new components in src/components/
   # Components use TypeScript and TailwindCSS
   ```

2. **State Management**
   - Use Zustand stores for global state
   - Example: `src/store/authStore.ts`
   - Import and use: `const { user, login } = useAuthStore()`

3. **API Integration**
   - Use the `useApi` hook for data fetching
   - Example: `const { data, loading, error } = useApi('/footprint/history')`
   - Or use axios directly: `import { api } from '@/lib/api'`

4. **Form Handling**
   - Use React Hook Form + Zod validation
   - Example form in `src/components/forms/`

5. **Testing Components**
   ```bash
   # Manual testing in dev server
   # Navigate to pages using Next.js App Router
   ```

### Code Style Guidelines

- Use **TypeScript** for all files (`.ts` or `.tsx`)
- Follow **Radix UI** patterns for accessible components
- Use **TailwindCSS** for styling (no CSS files unless necessary)
- Keep components small and focused (Single Responsibility)
- Export React components as default exports

### Environment Variables

Create `.env.local` in the frontend root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Add more as needed
NEXT_PUBLIC_APP_NAME=ecoTrack
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set Root Directory to `frontend`

3. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel project settings
   - Set to your backend API URL

4. **Deploy**
   ```bash
   # Automatically deployed on push to main
   ```

### Docker Deployment

1. **Build Docker image** (from project root)
   ```bash
   docker build -f frontend/Dockerfile -t ecotrack-frontend .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 ecotrack-frontend
   ```

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy using PM2 (for Node.js hosting)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "ecotrack-frontend" -- start
   pm2 save
   ```

---

## 📚 Documentation

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework docs
- **[React Documentation](https://react.dev)** - React 19 docs
- **[TailwindCSS](https://tailwindcss.com/docs)** - Utility CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Component library
- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **Backend API** - See [../backend/API.md](../backend/API.md)

---

## 🤝 Contributing

1. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. Make your changes and commit
   ```bash
   git commit -m 'Add amazing feature'
   ```

3. Push to branch
   ```bash
   git push origin feature/amazing-feature
   ```

4. Open a Pull Request

---

## 📄 License

ISC License - See LICENSE file for details

---

## 🔗 Related Documentation

- [Backend README](../backend/README.md)
- [Backend API Documentation](../backend/API.md)
- [Backend Architecture](../backend/ARCHITECTURE.md)
- [Main README](../README.md)

---

**Happy coding! 🚀**
