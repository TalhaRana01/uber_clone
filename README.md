# uber_clone
Build an Uber Clone App with MERN Stack

# API Documentation

## Endpoints

### 1. User Registration

**Endpoint:**
```
POST /users/register
```

**Description:**
Registers a new user with first name, last name, email, and password. The password is securely hashed before storing in the database.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
- **Success (201 Created):**
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Validation Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **Duplicate Email Error (400 Bad Request):**
```json
{
  "message": "Email already exists"
}
```

---

### 2. User Login

**Endpoint:**
```
POST /users/login
```

**Description:**
Authenticates an existing user by verifying the email and password. Returns an authentication token upon success.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
- **Success (200 OK):**
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Invalid Credentials (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

- **Validation Error (400 Bad Request):**
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

---

## Notes:
- The `token` returned in responses is a JWT token used for authentication in future requests.
- Both `register` and `login` require a valid email and password with a minimum length of 6 characters.
- Passwords are hashed before storing in the database to ensure security.


