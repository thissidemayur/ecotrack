# 🌍 ecoTrack Backend - Carbon Footprint Calculation API

**A robust Node.js + Express.js API for calculating and tracking household carbon footprints with real-time analytics and leaderboards.**

**GitHub ID:** [@thissidemayur](https://github.com/thissidemayur)
**Main Repository:** [ecoTrack](https://github.com/thissidemayur/ecoTrack)

## 1. Project Overview

This is a full-stack platform designed to empower households to measure, track, and effectively reduce their carbon footprint ($\text{CO}_2\text{e}$). The application provides personalized recommendations based on user-submitted activity data (energy, transport, waste, and consumption). The platform includes a robust administrative panel for data analysis and emission factor management.

## 2. Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend Framework** | Node.js, Express.js | Robust, scalable RESTful API |
| **Database** | MongoDB (via Mongoose) | Flexible, persistent storage for logs and user data |
| **Cache/Metrics** | Redis | High-speed leaderboards (Sorted Sets), rate limiting, and session management |
| **Architecture** | **Service-Repository Pattern** | Clean separation of concerns (DB logic, Business logic, API layer) |
| **Validation** | Zod | Runtime schema validation for secure and type-safe data handling |
| **Security** | JWT, Bcrypt, Role-Based Access Control (RBAC) | Authentication and authorization |

## 3. Core Features

### User Functionality (Authenticated)
* **Registration/Login:** Secure token-based authentication.
* **Calculation:** Submits household activity data (kWh, km, spending) and instantly calculates total $\text{CO}_2\text{e}$ and breakdown.
* **Tracking:** Views historical footprint trends and progress over time.
* **Account:** Secure profile and password management.

### Administrator Functionality
* **Analytics:** Global average footprint, total users, and real-time Top/Bottom 10 performance leaderboards (powered by Redis).
* **Data Filtering:** Aggregated analysis of logs by region, home size, and consumption patterns.
* **Factor Management:** CRUD operations on all `EmissionFactors` to ensure calculation accuracy.

## 4. Setup and Installation

### Prerequisites

* **Node.js** v18 or higher
* **MongoDB** Instance (Local or Atlas)
* **Redis** Instance (Local or Cloud)
* **npm** or **yarn**

### Environment Configuration

Create a `.env` file in the backend root directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecotrack
MONGODB_DB_NAME=ecotrack

# Redis
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d

# Admin
ADMIN_EMAIL=admin@ecotrack.com
ADMIN_PASSWORD=your_secure_admin_password

# CORS
FRONTEND_URL=http://localhost:3000

# Email Service (Optional - if using Resend)
RESEND_API_KEY=your_resend_api_key

# File Upload
MAX_FILE_SIZE=5242880
```

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/thissidemayur/ecoTrack.git
   cd ecoTrack/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

4. **Start the Server**
   ```bash
   # Development (with hot reload via nodemon)
   npm run dev
   
   # Production
   npm start
   ```

5. **Verify Server is Running**
   ```bash
   curl http://localhost:3000/health
   ```

## 5. Quick Commands

```bash
# Development server with auto-reload
npm run dev

# Production server
npm start

# Run tests
npm test
```

## 6. Project Structure
```
/server
├── /config
│   ├── index.js             # Centralized environment variable management
│   ├── mongo.js             # Database connection setup for MongoDB
│   └── redis.js             # Database connection setup for Redis
├── /constants
│   └── index.js             # Static variables: error codes, user roles (e.g., ADMIN, USER)
├── /controllers
│   ├── auth.controller.js   # Handles request/response for auth routes
│   ├── user.controller.js           # NEW: Profile fetching/update
│   ├── footprint.controller.js      # NEW: Core user calculation/history
│   ├── admin.controller.js          # NEW: Admin analytics/summary
│   └── emissionFactor.controller.js # NEW: Admin factor management
├── /middlewares
│   ├── auth.middleware.js   # JWT verification (isAuth)
│   ├── role.middleware.js   # Role-based access control (hasRole)
│   ├── rateLimiter.js       # Global and specific rate limiting
│   ├── errorHandler.js      # Centralized error handling
│   ├── validation.js        # NEW: Zod schema validation middleware
│   └── inputSanitixation.js # Input sanitization logic
├── /models
│   ├── User.js              # Mongoose Schema and Model (Auth/Profile)
│   ├── EmissionFactor.js          # NEW: Reference data model (Calculation constants)
│   └── FootprintLog.js            # NEW: Time-series log data model (User results)
├── /repositories
│   ├── user.repository.js   # Direct DB interaction for User model
│   ├── emissionFactor.repository.js # NEW: Factor DB operations
│   └── footprintLog.repository.js   # NEW: Footprint log DB operations
├── /routes
│   ├── auth.routes.js       # Express routes for authentication
│   ├── user.route.js              # NEW: Profile routes
│   ├── footprint.routes.js        # NEW: Calculation routes
│   ├── admin.routes.js            # NEW: Admin analytics routes
│   ├── factor.routes.js           # NEW: Factor management routes
│   └── index.js             # Central route aggregator
├── /services
│   ├── auth.service.js      # Business logic: login, register, token rotation
│   ├── jwt.service.js       # Logic for generating, verifying JWTs
│   ├── bcrypt.js            # Logic for password hashing and comparison
│   ├── user.service.js              # NEW: Profile management logic
│   ├── calculation.service.js       # NEW: Core CFP formula engine
│   ├── footprint.service.js         # NEW: Calculation orchestration/Redis update
│   ├── admin.service.js             # NEW: Admin dashboard data logic
│   └── emissionFactor.service.js    # NEW: Factor management logic
├── /utils
│   ├── ApiError.js          # Custom error class for consistent handling
│   ├── apiResponse.js       # Standardized response wrapper
│   └── asyncHandler.js      # Utility to wrap controllers for error catching
├── /validators
│   ├── auth.validator.js            # Zod schemas for login/register
│   ├── user.validator.js            # Zod schemas for profile/password
│   ├── footprint.validator.js       # Zod schemas for CFP input
│   └── emissionFactor.validator.js  # Zod schemas for factor management
│
├── app.js                   # Express application setup
├── server.js                # Server entry point (starts app.js)
├── package.json
└── .env                     # Environment variables (IGNORED BY GIT)
```

## 7. API Documentation

### Authentication
All authenticated endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### Core Endpoints

#### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/refresh` - Refresh JWT token

#### User Profile
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password

#### Carbon Footprint
- `POST /api/footprint/calculate` - Calculate carbon footprint
- `GET /api/footprint/history` - Get calculation history
- `GET /api/footprint/summary` - Get summary and trends

#### Admin Only
- `GET /api/admin/analytics` - Get global analytics
- `GET /api/admin/leaderboard` - Get top/bottom performers
- `GET /api/factors` - Get all emission factors
- `POST /api/factors` - Create emission factor
- `PUT /api/factors/:id` - Update emission factor
- `DELETE /api/factors/:id` - Delete emission factor

**For complete API reference, see [API.md](./API.md)**

---

## 8. Architecture & Design Documentation

To provide a comprehensive overview, the following documentation files are included:

### [`API.md`](./API.md)
Details the complete contract for all REST endpoints, including:
- Request/response schemas
- Authentication requirements
- Query parameters
- Example payloads
- Error responses

**Use this for:** Frontend integration, Postman testing, API contract validation

### [`ARCHITECTURE.md`](./ARCHITECTURE.md)
Explains architectural decisions and design patterns:
- **Service-Repository Pattern** for clean code separation
- **Calculation Service** - Core CO₂e calculation engine
- **Redis Sorted Sets** for real-time leaderboards
- **Environmental logic** and emission factor calculations
- **Data persistence strategy**

**Use this for:** Understanding system design, contributing to architecture, code reviews

### [`deploy.md`](./deploy.md)
Production deployment instructions:
- Environment setup
- Database migrations
- Docker containerization
- CI/CD integration
- Monitoring and logging

**Use this for:** Deploying to production, infrastructure setup

---

## 9. Environmental Logic & Calculation Foundation

The carbon footprint calculation is based on the GFA (Greenhouse Gas Footprint Assessment) standard:

$$
\text{Carbon Footprint (kg } \text{CO}_2\text{e}) = \sum_{\text{Activity}} (\text{Activity Data} \times \text{Emission Factor})
$$

The `EmissionFactor` database table allows administrators to dynamically adjust the factors ($\text{kg} \text{CO}_2\text{e}/\text{unit}$) for localized or updated emissions standards.