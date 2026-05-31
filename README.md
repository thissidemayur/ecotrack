# 🌍 ecoTrack - Carbon Footprint Calculator for Households

**A full-stack MERN application empowering households to measure, track, and reduce their carbon footprint.**

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Overview

**ecoTrack** is a comprehensive platform designed to help households understand and manage their environmental impact. Users can:

- **Calculate** their household carbon footprint based on energy consumption, transportation, waste, and consumption patterns
- **Track** historical trends and monitor progress over time
- **Get Insights** through personalized recommendations to reduce their carbon footprint
- **Compare** performance on leaderboards and participate in sustainability challenges

Administrators can:
- **Analyze** global emission trends and user demographics
- **Manage** emission factors for accurate calculations
- **Monitor** platform metrics and generate reports

---

## ✨ Key Features

### User Features
- 🔐 **Secure Authentication** - JWT-based login/registration with role-based access control
- 📊 **Carbon Footprint Calculation** - Instant CO₂e calculation from activity data
- 📈 **Trend Tracking** - Visual dashboard showing historical footprint trends
- 🎯 **Personalized Recommendations** - AI-driven suggestions to reduce carbon footprint
- 👤 **Profile Management** - Secure password and profile updates

### Admin Features
- 🌐 **Global Analytics** - Real-time leaderboards (Top/Bottom 10 performers)
- 📉 **Data Aggregation** - Filter and analyze logs by region, home size, consumption patterns
- ⚙️ **Factor Management** - Update emission factors for calculation accuracy
- 📊 **Dashboard** - Comprehensive metrics and performance indicators

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | Modern, performant UI with server components |
| **Backend** | Node.js, Express.js 5 | Scalable RESTful API |
| **Database** | MongoDB | Flexible, persistent storage for user data |
| **Cache/Leaderboard** | Redis | High-speed Sorted Sets for real-time leaderboards |
| **Validation** | Zod | Runtime schema validation |
| **Authentication** | JWT, Bcrypt, RBAC | Secure auth and authorization |
| **UI Components** | Radix UI, TailwindCSS | Accessible, responsive design |
| **Charts** | Recharts | Data visualization |
| **Containerization** | Docker, Docker Compose | Easy deployment and environment consistency |
| **Observability** | Prometheus, Grafana, Node Exporter | Metrics collection and monitoring |
| **CI / DevOps** | Jenkins | Build automation and deployment orchestration |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ 
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Redis** (local or cloud)
- **Docker & Docker Compose** (optional, for containerized setup)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/thissidemayur/ecoTrack.git
   cd ecoTrack
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   
   **Backend** (`backend/.env`):
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecotrack
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # JWT
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRY=7d
   
   # Admin credentials
   ADMIN_EMAIL=admin@ecotrack.com
   ADMIN_PASSWORD=your_secure_password
   ```
   
   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Start services**
   
   **Option A: Using Docker Compose**
   ```bash
   docker-compose up
   ```
   
   **Option B: Manual startup**
   ```bash
   # Terminal 1: Start Backend
   cd backend
   npm run dev
   
   # Terminal 2: Start Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api

---

## 📁 Project Structure

```
ecoTrack/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Database & Redis configuration
│   │   ├── controllers/       # HTTP request handlers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # Mongoose schemas
│   │   ├── repositories/      # Database abstraction layer
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic & orchestration
│   │   ├── utils/             # Helpers & utilities
│   │   ├── validators/        # Zod validation schemas
│   │   ├── app.js             # Express app setup
│   │   └── index.js           # Server entry point
│   ├── API.md                 # Complete API documentation
│   ├── ARCHITECTURE.md        # System design & environmental logic
│   ├── deploy.md              # Deployment guide
│   ├── package.json
│   ├── Dockerfile
│   └── .env                   # Environment variables (git ignored)
│
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # Next.js 14 App Router
│   │   ├── components/        # Reusable React components
│   │   ├── lib/               # Utilities & helpers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # Zustand state management
│   │   └── styles/            # TailwindCSS configuration
│   ├── public/                # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.local             # Environment variables (git ignored)
│
├── docker-compose.yml         # Multi-service Docker orchestration
├── task-definition.json       # AWS ECS task definition
└── README.md                  # This file
```

---

## 📚 Documentation

For detailed information, refer to the following documents:

### Backend Documentation
- **[API.md](./backend/API.md)** - Complete REST API reference with request/response examples
- **[ARCHITECTURE.md](./backend/ARCHITECTURE.md)** - System design, Service-Repository pattern, calculation logic
- **[deploy.md](./backend/deploy.md)** - Production deployment guide

### Frontend
- **[README.md](./frontend/README.md)** - Frontend setup and development guide

---

## 🔧 Development

### Backend Development

```bash
cd backend

# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Structure Principles

- **Service-Repository Pattern**: Clean separation between business logic (Services) and data access (Repositories)
- **Centralized Error Handling**: All errors flow through middleware for consistent responses
- **Zod Validation**: Runtime schema validation for all user inputs
- **RBAC**: Role-based access control for protected routes
- **Redis Leaderboards**: Real-time performance tracking using Sorted Sets

---

## 🐳 Docker & Containerization

### Build Docker Images

```bash
# Build all services
docker-compose build

# Run services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

---

## 🌐 Deployment

For production deployment instructions, see [backend/deploy.md](./backend/deploy.md).

This repository also includes DevOps and monitoring tooling for a full production-ready deployment:
- **Prometheus** for metrics scraping
- **Grafana** for dashboards and visualizations
- **Node Exporter** for host-level monitoring
- **Jenkins** for CI/CD and build automation

The `docker-compose.yml` includes local orchestration for the app plus monitoring services. A Terraform configuration is provided in `terraform/` to provision AWS infrastructure:
- EC2 instance running the application stack
- Security Group with rules for SSH, HTTP/HTTPS, frontend, backend, Jenkins, Prometheus, Grafana, and Node Exporter
- AWS region and credentials configured via `terraform/variables.tf` and `terraform/terraform.tfvars`

**Supported Platforms:**
- AWS (EC2 + Terraform provisioning)
- Vercel (Frontend)
- Heroku
- DigitalOcean
- Railway

---

## 📊 Environmental Logic

The carbon footprint calculation follows the **Greenhouse Gas Protocol (GHG)** standard:

$$\text{Carbon Footprint (kg CO}_2\text{e)} = \sum_{\text{Activity}} (\text{Activity Data} \times \text{Emission Factor})$$

**Categories:**
1. **Energy** - Electricity, gas, heating oil consumption
2. **Transportation** - Car mileage, public transport usage
3. **Waste** - Landfill waste, recycling rates
4. **Consumption** - Food, clothing, goods purchases

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**GitHub ID:** [@thissidemayur](https://github.com/thissidemayur)

---

## 🔗 Links

- **GitHub Repository:** [thissidemayur/ecoTrack](https://github.com/thissidemayur/ecoTrack)
- **Live Deployment:** [ecotrack.thissidemayur.me](https://ecotrack.thissidemayur.me)  
- **API Documentation:** [Backend API.md](./backend/API.md)

---

## ❓ Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing documentation in `backend/API.md` and `backend/ARCHITECTURE.md`

---

