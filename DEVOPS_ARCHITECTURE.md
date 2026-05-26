# 🏗️ EcoTrack DevOps Architecture & Infrastructure Guide

**Project:** EcoTrack - Carbon Footprint Tracking Platform  
**Type:** Full-Stack MERN Application (Monolithic)  
**Deployment Target:** Docker + Kubernetes / AWS ECS  
**Author:** Mayur Pal (@thissidemayur)  

---

## 📋 Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Repository Structure](#project-repository-structure)
4. [Application Architecture](#application-architecture)
5. [Deployment Architecture](#deployment-architecture)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Observability & Monitoring](#observability--monitoring)
8. [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
9. [Security Considerations](#security-considerations)
10. [Scaling Strategy](#scaling-strategy)

---

## 🎯 System Architecture Overview

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                      CDN / Edge Layer (CloudFront)             │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        v                    v                    v
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Next.js │          │ Next.js │          │ Next.js │
   │ (SSR)   │          │ (SSR)   │          │ (SSR)   │
   │ Port    │          │ Port    │          │ Port    │
   │ 3001    │          │ 3001    │          │ 3001    │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                        ┌────v────┐
                        │  ALB    │ (Application Load Balancer)
                        │Port 443 │
                        └────┬────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        v                    v                    v
   ┌──────────┐          ┌──────────┐          ┌──────────┐
   │ Node.js  │          │ Node.js  │          │ Node.js  │
   │ Express  │          │ Express  │          │ Express  │
   │ ECS Task │          │ ECS Task │          │ ECS Task │
   │ Port     │          │ Port     │          │ Port     │
   │ 32768+   │          │ 32768+   │          │ 32768+   │
   └────┬─────┘          └────┬─────┘          └────┬─────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
        ┌────────────────────┼────────────────────────────────┐
        │                    │                                │
        v                    v                                v
   ┌──────────┐          ┌──────────────┐              ┌────────────┐
   │ MongoDB  │          │ Redis Cache  │              │ CloudWatch │
   │ Replica  │          │ (Leaderboards│              │ Logs       │
   │ Set      │          │ Rate Limit)  │              │            │
   └──────────┘          └──────────────┘              └────────────┘
```

### Multi-Tier Architecture Pattern

| Tier | Component | Technology | Responsibility |
|------|-----------|-----------|-----------------|
| **Presentation** | Next.js Frontend | React 19, Next.js 16, TypeScript | UI rendering, client-side routing, state management (Zustand) |
| **API Gateway** | Express.js Backend | Node.js, Express 5.x | API routing, request validation, error handling |
| **Business Logic** | Service Layer | JavaScript (Node.js) | Core business logic, calculations, email services |
| **Data Access** | Repository Pattern | Mongoose ODM | Database operations abstraction |
| **Persistence** | MongoDB | NoSQL Document DB | User data, footprint logs, emission factors |
| **Cache Layer** | Redis | In-Memory Store | Leaderboards, rate limiting, session data |
| **Infrastructure** | Docker/Kubernetes | Container Orchestration | Containerization and orchestration |

---

## 🛠️ Technology Stack

### Backend Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | v24 (Alpine) | JavaScript runtime |
| **Framework** | Express.js | ^5.2.1 | REST API framework |
| **Database** | MongoDB | Latest | Document storage (Users, Logs, Factors) |
| **Cache** | Redis | ^5.10.0 | Leaderboards, rate limiting |
| **Validation** | Zod | ^4.1.13 | Schema validation |
| **Authentication** | JWT + Bcrypt | ^9.0.3, ^3.0.3 | Token-based auth, password hashing |
| **Security** | Helmet | ^8.1.0 | HTTP headers hardening |
| **Rate Limiting** | express-rate-limit | ^8.2.1 | DDoS protection |
| **Email** | Resend | ^6.12.3 | OTP & verification emails |
| **File Upload** | Multer | ^2.0.2 | Multipart form data handling |
| **Dev Tool** | Nodemon | ^3.1.11 | Auto-reload during development |

### Frontend Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | ^16.0.10 | React SSR/SSG framework |
| **Library** | React | ^19.2.1 | UI component library |
| **Language** | TypeScript | Latest | Type safety |
| **Styling** | Tailwind CSS | ^4 | Utility-first CSS |
| **Forms** | React Hook Form | ^7.69.0 | Efficient form handling |
| **State** | Zustand | ^5.0.9 | Global state management |
| **HTTP Client** | Axios | ^1.13.2 | API calls with interceptors |
| **UI Components** | Radix UI | Latest | Accessible component library |
| **Charts** | Recharts | ^2.15.4 | Data visualization |
| **Icons** | Lucide React | ^0.561.0 | Icon library |
| **Notifications** | Sonner | ^2.0.7 | Toast notifications |

### Infrastructure & DevOps

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Containerization** | Docker | Container images & multi-stage builds |
| **Orchestration** | Kubernetes / AWS ECS | Container orchestration |
| **Cloud Platform** | AWS | Primary cloud infrastructure |
| **CI/CD** | Jenkins / GitHub Actions | Automated deployment pipeline |
| **Monitoring** | Prometheus + Grafana | Metrics collection & visualization |
| **Logging** | ELK Stack / CloudWatch | Centralized logging |
| **IaC** | Terraform / CloudFormation | Infrastructure as Code |

---

## 📁 Project Repository Structure

### Root Level Structure

```
ecoTrack/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app initialization
│   │   ├── index.js               # Server entry point
│   │   ├── config/                # Configuration files
│   │   │   ├── index.js          # Config loader
│   │   │   ├── mongo.js          # MongoDB connection
│   │   │   ├── redis.js          # Redis connection
│   │   │   └── sendMail.js       # Email service config
│   │   ├── controllers/           # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── footprint.controller.js
│   │   │   ├── admin.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── emissionFactor.controller.js
│   │   ├── services/              # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── footprint.service.js
│   │   │   ├── admin.service.js
│   │   │   ├── calculation.service.js
│   │   │   ├── user.service.js
│   │   │   ├── emissionFactor.service.js
│   │   │   ├── bcrypt.service.js
│   │   │   ├── jwt.service.js
│   │   │   └── helperMethods.js
│   │   ├── repositories/          # Data access layer
│   │   │   ├── user.repository.js
│   │   │   ├── footprintLog.repository.js
│   │   │   └── emissionFactor.repository.js
│   │   ├── models/                # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── FootprintLog.js
│   │   │   └── EmissionFactor.js
│   │   ├── routes/                # Route definitions
│   │   │   ├── index.js          # Route aggregator
│   │   │   ├── auth.route.js
│   │   │   ├── footprint.routes.js
│   │   │   ├── user.route.js
│   │   │   ├── admin.route.js
│   │   │   ├── emmisionFactor.route.js
│   │   │   └── healthCheck.js
│   │   ├── middlewares/           # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── errorHandler.controller.js
│   │   │   ├── security.middleware.js
│   │   │   ├── InputSanitization.js
│   │   │   └── rateLimiter.middleware.js
│   │   ├── validators/            # Zod schemas
│   │   │   ├── auth.validator.js
│   │   │   ├── footprint.validator.js
│   │   │   ├── user.validator.js
│   │   │   ├── admin.validator.js
│   │   │   └── emmisionFactor.validator.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── apiResponse.utils.js
│   │   │   ├── apiError.utils.js
│   │   │   ├── asyncHandler.utils.js
│   │   │   └── emailHTMLTemplate.js
│   │   └── constants/             # Constants
│   │       └── index.js
│   ├── Dockerfile                 # Multi-stage Docker build
│   ├── .dockerignore              # Docker ignore rules
│   ├── package.json               # Dependencies
│   ├── .env                       # Environment variables
│   ├── ARCHITECTURE.md            # Backend architecture
│   ├── API.md                     # API documentation
│   ├── deploy.md                  # Deployment guide
│   └── README.md                  # Backend README
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verify-email/
│   │   │   └── forgot-password/
│   │   ├── (coverPage)/           # Public pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── guides/
│   │   │   ├── methodology/
│   │   │   ├── privacy/
│   │   │   ├── resources/
│   │   │   ├── terms/
│   │   │   └── layout.tsx
│   │   ├── dashboard/             # Protected routes
│   │   │   ├── page.tsx
│   │   │   ├── admin/
│   │   │   ├── calculate/
│   │   │   ├── history/
│   │   │   └── layout.tsx
│   │   ├── onboarding/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css
│   │   ├── manifest.json
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── dashboard/             # Dashboard components
│   │   ├── form/                  # Form components
│   │   ├── landingPage/           # Landing page components
│   │   ├── providers/             # Context providers
│   │   └── ui/                    # Reusable UI components
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuthApi.ts
│   │   ├── useFootprintApi.ts
│   │   ├── useAdminApi.ts
│   │   ├── useUserApi.ts
│   │   └── use-mobile.ts
│   ├── state/                     # Zustand stores
│   │   ├── authStore.ts
│   │   ├── useFootprintStore.ts
│   │   └── adminStore.ts
│   ├── types/                     # TypeScript types
│   │   ├── api.type.ts
│   │   ├── authApi.type.ts
│   │   ├── footprintApi.type.ts
│   │   └── admin.type.ts
│   ├── utils/                     # Utility functions
│   │   ├── api.utils.ts
│   │   ├── exportDataIntoJSON.ts
│   │   └── utils.ts
│   ├── lib/                       # Libraries & helpers
│   │   ├── constant.ts
│   │   ├── envVar.ts
│   │   └── utils.ts
│   ├── api/                       # API configuration
│   │   └── axios.ts               # Axios instance with interceptors
│   ├── public/                    # Static assets
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── README.md
│
├── docker-compose.yml             # Local development environment
├── task-definition.json           # AWS ECS task definition
├── README.md                       # Project README
├── ARCHITECTURE.md                # System architecture (this file)
└── deploy.md                      # Deployment instructions
```

---

## 🏗️ Application Architecture

### Backend Architecture Pattern: Service-Repository

```
┌────────────────────────────────────────────────────────────┐
│                        CLIENT REQUESTS                      │
└────────────────────────────┬───────────────────────────────┘
                             │
                        ┌────v────┐
                        │ ROUTE   │ (Express Router)
                        │ Handler │
                        └────┬────┘
                             │
                        ┌────v──────────┐
                        │ MIDDLEWARE    │ (Auth, Validation, Rate Limit)
                        └────┬──────────┘
                             │
                        ┌────v───────────┐
                        │ CONTROLLER     │ (Request/Response handling)
                        │ - Parse input  │
                        │ - Call service │
                        │ - Format output│
                        └────┬───────────┘
                             │
                        ┌────v────────────────┐
                        │ SERVICE             │ (Business Logic Orchestration)
                        │ - Coordinate ops    │
                        │ - Calculations      │
                        │ - Call repositories │
                        │ - Email/Cache ops   │
                        └────┬─────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────v────┐          ┌────v──┐           ┌────v────┐
   │REPOSITORY│          │ CACHE │           │ EMAIL   │
   │(MongoDB) │          │(Redis)│           │SERVICE  │
   └──────────┘          └───────┘           └─────────┘
```

### Data Models

#### 1. User Model

```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  role: Enum['user', 'admin'],
  profile: {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    homeSize: String,
    numberOfResidents: Number,
  },
  refreshTokenHash: String (for session invalidation),
  createdAt: DateTime,
  updatedAt: DateTime,
  isEmailVerified: Boolean,
}
```

#### 2. FootprintLog Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  category: Enum['Energy', 'Transport', 'Waste', 'Consumption'],
  activityData: {
    quantity: Number,
    unit: String,
    source: String,
  },
  emissionFactorId: ObjectId (ref: EmissionFactor),
  calculatedCO2e: Number (kg CO2e),
  breakdown: {
    scope1: Number,
    scope2: Number,
    scope3: Number,
  },
  metadata: {
    region: String,
    season: String,
  },
  createdAt: DateTime,
}
```

#### 3. EmissionFactor Model

```javascript
{
  _id: ObjectId,
  category: String,
  activityType: String,
  unit: String,
  factor: Number (kg CO2e per unit),
  source: String (e.g., 'IPCC', 'EPA'),
  region: String,
  updatedAt: DateTime,
  isActive: Boolean,
}
```

### Redis Data Structures

| Key | Type | Use Case | TTL |
|-----|------|----------|-----|
| `global_footprints` | Sorted Set | Real-time leaderboard (user ID → total CO2e) | Indefinite (manually managed) |
| `global_avg_cfp` | String | Cached average footprint calculation | 24 hours |
| `rate_limit:{userId}` | String | Rate limiter counter | 15 minutes |
| `session:{sessionId}` | Hash | Session data | 7 days |

---

## 🚀 Deployment Architecture

### AWS ECS Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                        AWS REGION                           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              VPC (Virtual Private Cloud)             │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Public Subnets (Multi-AZ)                    │ │  │
│  │  │                                                │ │  │
│  │  │  ┌──────────────────────────────────────────┐ │ │  │
│  │  │  │ Application Load Balancer (ALB)          │ │ │  │
│  │  │  │ - HTTPS/TLS Termination                  │ │ │  │
│  │  │  │ - Port 443 → Target Group Port 3000/3001 │ │ │  │
│  │  │  │ - Health Check: /health endpoint         │ │ │  │
│  │  │  └──────────────┬───────────────────────────┘ │ │  │
│  │  │                 │                              │ │  │
│  │  └─────────────────┼──────────────────────────────┘ │  │
│  │                    │                                │  │
│  │  ┌────────────────┼────────────────────────────┐  │  │
│  │  │  Private Subnets (Multi-AZ)                │  │  │
│  │  │                 │                          │  │  │
│  │  │  ┌──────────────v──────────────────────┐  │  │  │
│  │  │  │ ECS Cluster (ecotrack-cluster)     │  │  │  │
│  │  │  │                                    │  │  │  │
│  │  │  │ ┌────────┐ ┌────────┐ ┌────────┐ │  │  │  │
│  │  │  │ │ ECS    │ │ ECS    │ │ ECS    │ │  │  │  │
│  │  │  │ │ Task   │ │ Task   │ │ Task   │ │  │  │  │
│  │  │  │ │Backend │ │Backend │ │Backend │ │  │  │  │
│  │  │  │ └────────┘ └────────┘ └────────┘ │  │  │  │
│  │  │  │                                    │  │  │  │
│  │  │  │ ┌────────┐ ┌────────┐ ┌────────┐ │  │  │  │
│  │  │  │ │ ECS    │ │ ECS    │ │ ECS    │ │  │  │  │
│  │  │  │ │ Task   │ │ Task   │ │ Task   │ │  │  │  │
│  │  │  │ │Frontend│ │Frontend│ │Frontend│ │  │  │  │
│  │  │  │ │(Next.js)│ │(Next.js)│ │(Next.js)│ │  │  │  │
│  │  │  │ └────────┘ └────────┘ └────────┘ │  │  │  │
│  │  │  │                                    │  │  │  │
│  │  │  └────────────────────────────────────┘  │  │  │
│  │  │                                          │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ Data Layer (Managed Services)            │  │  │
│  │  │ - MongoDB Atlas / DocumentDB             │  │  │
│  │  │ - ElastiCache (Redis)                    │  │  │
│  │  │ - RDS (if needed)                        │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘

 Monitoring & Logging:
 - CloudWatch (Logs, Metrics, Alarms)
 - X-Ray (Distributed Tracing)
 - SNS (Alerts & Notifications)
```

### Docker Image Layer Structure

**Backend Dockerfile (Multi-Stage Build)**

```dockerfile
# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: Runtime
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1
USER node
EXPOSE 3000
CMD ["node", "src/index.js"]
```

### Docker Compose for Local Development

```yaml
version: '3.8'
services:
  ecotrack-api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - ./backend/.env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    depends_on:
      - mongodb
      - redis
    networks:
      - ecotrack-network

  ecotrack-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    env_file:
      - ./frontend/.env
    depends_on:
      - ecotrack-api
    networks:
      - ecotrack-network

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - ecotrack-network

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - ecotrack-network

volumes:
  mongo-data:
  redis-data:

networks:
  ecotrack-network:
    driver: bridge
```

### AWS ECS Task Definition (backend)

```json
{
  "family": "ecotrack-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "ecotrack-backend",
      "image": "your-ecr-repo/ecotrack-backend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:region:account-id:secret:ecotrack/mongodb-uri"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account-id:secret:ecotrack/jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ecotrack-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 10
      }
    }
  ]
}
```

---

## 🔄 CI/CD Pipeline

### Jenkins Pipeline Structure

```groovy
pipeline {
    agent any
    
    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        ECR_REPO_BACKEND = "ecotrack-backend"
        ECR_REPO_FRONTEND = "ecotrack-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        SLACK_WEBHOOK = credentials('slack-webhook-url')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    sh '''
                        cd backend
                        docker build -t ${ECR_REGISTRY}/${ECR_REPO_BACKEND}:${IMAGE_TAG} .
                        docker tag ${ECR_REGISTRY}/${ECR_REPO_BACKEND}:${IMAGE_TAG} \
                                   ${ECR_REGISTRY}/${ECR_REPO_BACKEND}:latest
                    '''
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    sh '''
                        cd frontend
                        docker build -t ${ECR_REGISTRY}/${ECR_REPO_FRONTEND}:${IMAGE_TAG} .
                        docker tag ${ECR_REGISTRY}/${ECR_REPO_FRONTEND}:${IMAGE_TAG} \
                                   ${ECR_REGISTRY}/${ECR_REPO_FRONTEND}:latest
                    '''
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    sh '''
                        cd backend
                        npm install
                        npm run test || true
                    '''
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    sh '''
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}
                        
                        docker push ${ECR_REGISTRY}/${ECR_REPO_BACKEND}:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${ECR_REPO_BACKEND}:latest
                        docker push ${ECR_REGISTRY}/${ECR_REPO_FRONTEND}:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${ECR_REPO_FRONTEND}:latest
                    '''
                }
            }
        }
        
        stage('Deploy to ECS') {
            steps {
                script {
                    sh '''
                        aws ecs update-service \
                            --cluster ecotrack-cluster \
                            --service ecotrack-backend-service \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                        
                        aws ecs update-service \
                            --cluster ecotrack-cluster \
                            --service ecotrack-frontend-service \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                    '''
                }
            }
        }
        
        stage('Smoke Tests') {
            steps {
                script {
                    sh '''
                        sleep 10
                        curl -f http://api.ecotrack.com/api/v1/health || exit 1
                        curl -f http://ecotrack.com/ || exit 1
                    '''
                }
            }
        }
    }
    
    post {
        success {
            script {
                sh '''
                    curl -X POST ${SLACK_WEBHOOK} \
                        -H 'Content-Type: application/json' \
                        -d '{
                            "text": "✅ EcoTrack Deployment Successful",
                            "blocks": [{
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "*Build #${BUILD_NUMBER}* deployed successfully\\nCommit: ${GIT_COMMIT_SHORT}"
                                }
                            }]
                        }'
                '''
            }
        }
        failure {
            script {
                sh '''
                    curl -X POST ${SLACK_WEBHOOK} \
                        -H 'Content-Type: application/json' \
                        -d '{
                            "text": "❌ EcoTrack Deployment Failed",
                            "blocks": [{
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "*Build #${BUILD_NUMBER}* failed\\nCheck logs for details"
                                }
                            }]
                        }'
                '''
            }
        }
    }
}
```

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand(\"ping\")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017
      
      redis:
        image: redis:latest
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '24'
        cache: 'npm'
    
    - name: Build Backend
      run: |
        cd backend
        npm ci
        npm run build || true
    
    - name: Build Frontend
      run: |
        cd frontend
        npm ci
        npm run build
    
    - name: Test Backend
      run: |
        cd backend
        npm run test || true
    
    - name: Test Frontend
      run: |
        cd frontend
        npm run lint
  
  push-to-registry:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to ECR
      run: |
        aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | \
        docker login --username AWS --password-stdin \
        ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Build and push Backend
      uses: docker/build-push-action@v4
      with:
        context: ./backend
        push: true
        tags: |
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/ecotrack-backend:latest
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/ecotrack-backend:${{ github.sha }}
    
    - name: Build and push Frontend
      uses: docker/build-push-action@v4
      with:
        context: ./frontend
        push: true
        tags: |
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/ecotrack-frontend:latest
          ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/ecotrack-frontend:${{ github.sha }}
  
  deploy:
    needs: push-to-registry
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to ECS
      run: |
        aws ecs update-service \
          --cluster ecotrack-cluster \
          --service ecotrack-backend-service \
          --force-new-deployment \
          --region ${{ secrets.AWS_REGION }}
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## 📊 Observability & Monitoring

### Prometheus Metrics Collection

#### Backend Prometheus Integration

```javascript
// backend/src/config/prometheus.js
import prometheus from 'prom-client';

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const mongoDbOperationDuration = new prometheus.Histogram({
  name: 'mongodb_operation_duration_seconds',
  help: 'Duration of MongoDB operations',
  labelNames: ['operation', 'collection'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1]
});

const redisOperationDuration = new prometheus.Histogram({
  name: 'redis_operation_duration_seconds',
  help: 'Duration of Redis operations',
  labelNames: ['operation', 'key'],
  buckets: [0.001, 0.01, 0.05, 0.1]
});

const calculationDuration = new prometheus.Histogram({
  name: 'footprint_calculation_duration_seconds',
  help: 'Duration of footprint calculations',
  labelNames: ['category'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5]
});

export { httpRequestDuration, httpRequestTotal, mongoDbOperationDuration, redisOperationDuration, calculationDuration };
```

### Grafana Dashboard Configuration

```json
{
  "dashboard": {
    "title": "EcoTrack Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Request Latency (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket)"
          }
        ]
      },
      {
        "title": "MongoDB Operation Latency",
        "targets": [
          {
            "expr": "rate(mongodb_operation_duration_seconds_sum[5m]) / rate(mongodb_operation_duration_seconds_count[5m])"
          }
        ]
      },
      {
        "title": "Redis Cache Hit Rate",
        "targets": [
          {
            "expr": "redis_keyspace_hits_total / (redis_keyspace_hits_total + redis_keyspace_misses_total)"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~'5..'}[5m])"
          }
        ]
      }
    ]
  }
}
```

### ELK Stack Configuration (Elasticsearch, Logstash, Kibana)

#### Logstash Configuration

```conf
# /etc/logstash/conf.d/ecotrack.conf

input {
  tcp {
    port => 5000
    codec => json
  }
  
  file {
    path => "/var/log/ecotrack/backend/*.log"
    start_position => "beginning"
    tags => ["backend"]
  }
  
  file {
    path => "/var/log/ecotrack/frontend/*.log"
    start_position => "beginning"
    tags => ["frontend"]
  }
}

filter {
  if "backend" in [tags] {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} \[%{DATA:level}\] %{DATA:logger} - %{GREEDYDATA:message}" }
    }
    
    if [level] == "ERROR" {
      mutate {
        add_field => { "severity" => "high" }
      }
    }
  }
  
  mutate {
    add_field => { "environment" => "production" }
    add_field => { "service" => "ecotrack" }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "ecotrack-%{+YYYY.MM.dd}"
  }
  
  if [level] == "ERROR" {
    email {
      to => "devops@ecotrack.com"
      subject => "EcoTrack Error Alert"
    }
  }
}
```

### CloudWatch Alarms

```yaml
# aws/cloudwatch-alarms.yaml
Alarms:
  - AlarmName: EcoTrack-HighErrorRate
    MetricName: HTTPErrorRate
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 5
    ComparisonOperator: GreaterThanThreshold
    AlarmActions:
      - !Ref SNSTopic
  
  - AlarmName: EcoTrack-HighLatency
    MetricName: TargetResponseTime
    Statistic: p95
    Period: 300
    EvaluationPeriods: 2
    Threshold: 1
    ComparisonOperator: GreaterThanThreshold
    AlarmActions:
      - !Ref SNSTopic
  
  - AlarmName: EcoTrack-LowCacheHitRate
    MetricName: CacheHitRate
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 70
    ComparisonOperator: LessThanThreshold
    AlarmActions:
      - !Ref SNSTopic
```

---

## 🏗️ Infrastructure as Code (IaC)

### Terraform Configuration for AWS

```hcl
# terraform/main.tf

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket         = "ecotrack-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "EcoTrack"
      Environment = var.environment
      Terraform   = "true"
    }
  }
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "ecotrack-vpc"
  }
}

# Public Subnets
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "ecotrack-public-subnet-1"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "ecotrack-public-subnet-2"
  }
}

# Private Subnets
resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "${var.aws_region}a"
  
  tags = {
    Name = "ecotrack-private-subnet-1"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "${var.aws_region}b"
  
  tags = {
    Name = "ecotrack-private-subnet-2"
  }
}

# ALB
resource "aws_lb" "main" {
  name               = "ecotrack-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]
  
  tags = {
    Name = "ecotrack-alb"
  }
}

# Target Group
resource "aws_lb_target_group" "backend" {
  name        = "ecotrack-backend-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
  
  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "ecotrack-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "backend" {
  family                   = "ecotrack-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  
  container_definitions = jsonencode([
    {
      name      = "ecotrack-backend"
      image     = "${var.ecr_registry}/ecotrack-backend:latest"
      essential = true
      
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
      
      secrets = [
        {
          name      = "MONGODB_URI"
          valueFrom = aws_secretsmanager_secret.mongodb_uri.arn
        },
        {
          name      = "JWT_SECRET"
          valueFrom = aws_secretsmanager_secret.jwt_secret.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backend.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "backend" {
  name            = "ecotrack-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.backend_task_count
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = [aws_subnet.private_1.id, aws_subnet.private_2.id]
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "ecotrack-backend"
    container_port   = 3000
  }
  
  depends_on = [aws_lb_listener.http]
}

# Auto-scaling
resource "aws_appautoscaling_target" "backend" {
  max_capacity       = 4
  min_capacity       = 2
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.backend.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "backend_cpu" {
  policy_name               = "ecotrack-backend-cpu-scaling"
  policy_type               = "TargetTrackingScaling"
  resource_id               = aws_appautoscaling_target.backend.resource_id
  scalable_dimension        = aws_appautoscaling_target.backend.scalable_dimension
  service_namespace         = aws_appautoscaling_target.backend.service_namespace
  
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
  }
}
```

---

## 🔐 Security Considerations

### Security Best Practices

1. **Network Security**
   - Use Security Groups to restrict traffic
   - Implement Network ACLs
   - Use VPN for private subnet access
   - Enable VPC Flow Logs for monitoring

2. **Data Protection**
   - Encrypt data in transit (TLS 1.3)
   - Encrypt data at rest (AES-256)
   - Use AWS KMS for key management
   - Rotate secrets regularly (use AWS Secrets Manager)

3. **Application Security**
   ```javascript
   // backend/src/middlewares/security.middleware.js
   import helmet from 'helmet';
   import rateLimit from 'express-rate-limit';
   
   const securityMiddleware = (app) => {
     // Helmet for security headers
     app.use(helmet());
     
     // Rate limiting
     const limiter = rateLimit({
       windowMs: 15 * 60 * 1000,
       max: 100,
       message: 'Too many requests, please try again later.'
     });
     app.use('/api/', limiter);
     
     // CORS
     app.use(cors({
       origin: process.env.FRONTEND_URL,
       credentials: true
     }));
     
     // Input sanitization
     app.use(sanitizeHtml());
   };
   ```

4. **Authentication & Authorization**
   - JWT with short expiry (15 min access, 7d refresh)
   - RBAC for admin routes
   - Session invalidation on password change
   - 2FA/OTP for sensitive operations

5. **IAM Policies**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Service": "ecs-tasks.amazonaws.com"
         },
         "Action": "sts:AssumeRole"
       },
       {
         "Effect": "Allow",
         "Action": [
           "ecr:GetDownloadUrlForLayer",
           "ecr:BatchGetImage",
           "ecr:PutImage",
           "ecr:InitiateLayerUpload"
         ],
         "Resource": "arn:aws:ecr:*:*:repository/ecotrack-*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "logs:CreateLogStream",
           "logs:PutLogEvents"
         ],
         "Resource": "arn:aws:logs:*:*:log-group:/ecs/*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "secretsmanager:GetSecretValue"
         ],
         "Resource": "arn:aws:secretsmanager:*:*:secret:ecotrack/*"
       }
     ]
   }
   ```

---

## 📈 Scaling Strategy

### Horizontal Scaling

```yaml
# Auto-scaling Configuration
ECS Service Auto Scaling:
  Min Tasks: 2
  Max Tasks: 8
  Target CPU Utilization: 70%
  Target Memory Utilization: 80%
  Scale-up Cooldown: 60 seconds
  Scale-down Cooldown: 300 seconds

Load Balancing:
  Algorithm: Least Outstanding Requests
  Health Check:
    Path: /health
    Interval: 30s
    Timeout: 5s
    Healthy Threshold: 2
    Unhealthy Threshold: 2
```

### Database Scaling

```
MongoDB:
- Replica Set (3 nodes) for high availability
- Connection pooling (max 100 connections per instance)
- Sharding if collection size > 100GB
- Automatic backups every 6 hours
- Point-in-time recovery enabled

Redis:
- Cluster mode enabled for horizontal scaling
- 3 shards x 2 replicas
- Automatic failover enabled
- 99.99% uptime SLA
```

### Caching Strategy

```
Multi-layer Caching:
1. CDN (CloudFront)
   - Static assets (CSS, JS, images)
   - TTL: 1 month
   - Geographic distribution

2. Application Cache (Redis)
   - Leaderboard data: 1 hour TTL
   - Emission factors: 24 hour TTL
   - Session data: 7 day TTL

3. Browser Cache
   - API responses: 5 minute TTL
   - Static assets: 1 month TTL
```

---

## 📚 Deployment Checklist

- [ ] Terraform plan reviewed and approved
- [ ] Secrets configured in AWS Secrets Manager
- [ ] RDS/MongoDB connection string validated
- [ ] Redis endpoint configured
- [ ] ECR repositories created
- [ ] IAM roles and policies attached
- [ ] Security groups configured
- [ ] Load balancer health checks passing
- [ ] CloudWatch logs configured
- [ ] Alarms set for critical metrics
- [ ] Backup policies configured
- [ ] DNS records updated
- [ ] SSL certificate installed
- [ ] smoke tests passing
- [ ] Monitoring dashboards created

---

## 🔗 References

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Prometheus Monitoring](https://prometheus.io/docs/)
- [Grafana Dashboards](https://grafana.com/docs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Last Updated:** May 2026  
**Maintainer:** Mayur Pal (@thissidemayur)  
**License:** ISC
