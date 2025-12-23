# 📄 API.md: Carbon Footprint Calculator Backend Reference

This document details the RESTful API endpoints for the Carbon Footprint Calculator platform. All routes are prefixed with `/api/v1`.

## Global Conventions

* **Base URL:** `[Your_Server_URL]/api/v1`
* **Authentication:** Private routes require an `Authorization` header: `Bearer [accessToken]`.
* **Response Format:** All successful responses use the `ApiResponse` wrapper:

    ```json
    {
      "statusCode": 200,
      "data": { /* ... */ },
      "message": "..."
    }
    ```

## 1. Authentication and Authorization (`/auth`)

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Public | Creates a new user account. |
| `/auth/login` | `POST` | Public | Authenticates user and issues access/refresh tokens. |
| `/auth/refresh` | `POST` | Public | Issues new access/refresh tokens using a valid refresh token. |
| `/auth/logout` | `POST` | Private (User/Admin) | Invalidates the user's refresh token hash, forcing a logout. |

### Example: POST `/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}