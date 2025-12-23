
## 2. `ARCHITECTURE.md` (Markdown Format)

```markdown
# 📐 ARCHITECTURE.md: System Design and Environmental Logic

This document details the architectural decisions and core environmental logic of the Carbon Footprint Calculator backend.

## 1. System Architecture Overview

The backend employs a multi-layered design based on the **Service-Repository Pattern** to enforce **separation of concerns (SoC)**, leading to improved maintainability, testability, and scalability.

### Architecture Layers

| Layer | Responsibility | Key Components |
| :--- | :--- | :--- |
| **Controller** | **API Interface** (Handling HTTP request/response) | `footprint.controller.js`, `admin.controller.js` |
| **Service (Orchestrator)**| **Business Logic** (Coordinates operations, contains the 'How') | `footprint.service.js`, `admin.service.js` |
| **Repository** | **Database Abstraction** (Direct Mongoose queries) | `footprintLog.repository.js`, `emissionFactor.repository.js` |

### Benefits of Service-Repository Pattern
1.  **Testability:** Services can be tested independently by mocking their dependencies (Repositories).
2.  **Clarity:** Controllers remain thin, focused only on HTTP input and output formatting.

## 2. Data and Persistence Strategy

The system utilizes both MongoDB and Redis, each serving a distinct purpose.

### A. MongoDB (Mongoose) - Persistence Layer
* **Primary Source:** Stores all long-term, critical data.
* `FootprintLog`: A time-series collection storing raw user inputs and calculated $\text{CO}_2\text{e}$ results.
* `EmissionFactor`: Stores the essential **constants** used for the calculation engine.

### B. Redis - Caching and Specialized Data
Redis is used for high-speed, volatile operations:

| Redis Structure | Data Stored | Rationale |
| :--- | :--- | :--- |
| **Sorted Set (ZSET)** | `global_footprints` (User ID, Total $\text{CO}_2\text{e}$) | **Real-Time Leaderboard:** Enables instant $O(\log n)$ retrieval of Top 10/Bottom 10 scores for the Admin Dashboard, avoiding heavy database load. |
| **Key-Value Pair** | `global_avg_cfp` | **Caching:** Caches the complex global average calculation, refreshing periodically. |

## 3. The Carbon Footprint Calculation Engine

The core logic is isolated in the **`CalculationService`**.

### A. Environmental Logic Foundation

The calculation uses the standard life-cycle assessment (LCA) approach:

$$
\text{Total } \text{CO}_2\text{e} = \sum_{i=1}^{n} (\text{Activity Data}_i \times \text{Emission Factor}_i)
$$

* **Activity Data:** User inputs ($\text{kWh}$, $\text{km}$, spend).
* **Emission Factor ($\text{EF}$):** The constant multiplier ($\text{kg} \text{CO}_2\text{e}/\text{unit}$) fetched from the `EmissionFactor` collection.

### B. Calculation Flow Orchestration
The **`FootprintService`** acts as the orchestrator for calculation:
1.  Fetches Emission Factors (via Repository).
2.  Passes data to the **`CalculationService`** (The Engine).
3.  Receives calculated results.
4.  Logs persistent data to MongoDB (`FootprintLogRepository`).
5.  Updates the non-persistent leaderboard score in Redis.

## 4. Quality and Security Measures

* **Zod Validation:** Input validation middleware enforces strict schemas on all incoming data (`POST`, `PUT`) before the data reaches the service layer.
* **RBAC:** Role-Based Access Control middleware protects Admin-only routes.
* **Session Invalidation:** Password changes automatically invalidate the user's refresh token hash, forcing a secure re-login.