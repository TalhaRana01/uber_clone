# API Documentation

## Endpoints

### 1. User Registration

**Endpoint:**
```
POST /users/register
```

**Description:**
This endpoint allows users to register by providing their full name, email, and password. The password is securely hashed before being stored in the database.

**Method:** `POST`

**Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**
- `fullName.firstName`: Required, must be at least 3 characters long.
- `fullName.lastName`: Optional, must be at least 3 characters if provided.
- `email`: Required, must be a valid email format.
- `password`: Required, must be at least 6 characters long.

**Responses:**

- **Success Response (201 Created):**
```json
{
  "user": {
    "_id": "65f8a2d123456789abcd1234",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

- **Error Responses:**
  - **400 Bad Request (Validation Error):**
```json
{
  "errors": [
    {
      "msg": "firstName must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```
  - **400 Bad Request (Missing Fields):**
```json
{
  "error": "All fields are required"
}
```
  - **409 Conflict (Duplicate Email):**
```json
{
  "error": "Email already exists"
}
```

**Notes:**
- The password is stored securely using hashing.
- A JWT token is generated and returned upon successful registration.
- Ensure that the email is unique to prevent conflicts.

---

### 2. User Login

**Endpoint:**
```
POST /users/login
```

**Description:**
Authenticates an existing user by verifying the email and password. Returns an authentication token upon success.

**Method:** `POST`

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Responses:**

- **Success Response (200 OK):**
```json
{
  "user": {
    "_id": "65fdc2a1c1234abc567890de",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

- **Error Responses:**
  - **401 Unauthorized (Invalid Credentials):**
```json
{
  "message": "Invalid email or password"
}
```
  - **400 Bad Request (Validation Error):**
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Notes:**
- The returned `token` should be used for authentication in subsequent requests.

---

### 3. User Profile

**Endpoint:**
```
GET /users/profile
```

**Description:**
Fetches the profile details of the authenticated user.

**Method:** `GET`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Responses:**

- **Success Response (200 OK):**
```json
{
  "user": {
    "_id": "65fdc2a1c1234abc567890de",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

- **Error Responses:**
  - **401 Unauthorized (Invalid Token or Missing Token):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Notes:**
- The request must include a valid JWT token.
- This endpoint retrieves user details but does not return the password.

---

### 4. User Logout

**Endpoint:**
```
POST /users/logout
```

**Description:**
Logs out a user by blacklisting their authentication token.

**Method:** `POST`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Responses:**

- **Success Response (200 OK):**
```json
{
  "message": "User successfully logged out"
}
```

- **Error Responses:**
  - **401 Unauthorized (Invalid Token or Missing Token):**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Notes:**
- This endpoint adds the token to a blacklist, preventing further use.
- The token expires automatically after 24 hours.

---

## General Notes:
- The `token` returned in responses is a JWT token used for authentication in future requests.
- All protected routes require the token in the `Authorization` header.
- Passwords are securely hashed before storing in the database.
- Ensure that tokens are properly handled to maintain security.

🚀 Happy Coding!