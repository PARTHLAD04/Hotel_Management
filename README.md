# Hotel Management System API

A comprehensive RESTful API for managing hotel staff and menu items, built with Node.js, Express, MongoDB, and JWT authentication.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Person/Staff Management](#personsstaff-management)
  - [Menu Management](#menu-management)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Usage Examples](#usage-examples)

## 🎯 Overview

This Hotel Management System provides a backend API for managing hotel operations, including staff management (chefs, managers, waiters) and menu items. The system implements secure authentication using JWT tokens and password hashing with bcrypt.

## ✨ Features

### Staff Management
- ✅ User registration and login with JWT authentication
- ✅ Secure password hashing using bcrypt
- ✅ Role-based staff management (Chef, Manager, Waiter)
- ✅ CRUD operations for staff members
- ✅ Filter staff by work type
- ✅ User profile access with JWT middleware

### Menu Management
- ✅ Create, read, update, and delete menu items
- ✅ Categorize items by taste (spicy, sweet, sour)
- ✅ Track ingredients and sales numbers
- ✅ Distinguish between food and drinks
- ✅ Filter menu items by taste preference

### Security
- ✅ JWT-based authentication
- ✅ Password encryption with bcrypt
- ✅ Protected routes with middleware
- ✅ Local authentication strategy with Passport.js

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.19.4
- **Authentication**: 
  - JSON Web Tokens (JWT) v9.0.2
  - Passport.js v0.7.0
  - Passport-local v1.0.0
- **Security**: bcrypt v6.0.0
- **Environment Management**: dotenv v17.2.3
- **Development**: nodemon v3.1.11

## 📁 Project Structure

```
Hotel_mangement/
├── models/
│   ├── Person.js          # Staff/Employee schema with authentication
│   └── Menu.js            # Menu item schema
├── routers/
│   ├── personRouter.js    # Staff management routes
│   └── menuRouter.js      # Menu management routes
├── auth.js                # Passport local strategy configuration
├── jwt.js                 # JWT middleware and token generation
├── db.js                  # MongoDB connection configuration
├── server.js              # Express server setup and configuration
├── .env                   # Environment variables (not in repo)
├── .gitignore            # Git ignore rules
└── package.json          # Project dependencies
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hotel_mangement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   DB_URL=mongodb://localhost:27017/hotel
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**
   
   Ensure MongoDB is running on your system.

5. **Run the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npx nodemon server.js
   ```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017/hotel` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |

## 📡 API Endpoints

### Person/Staff Management

#### 1. **Signup (Register New Staff)**
- **Endpoint**: `POST /person/signup`
- **Authentication**: None
- **Description**: Register a new staff member
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "work": "Chef",
    "mobile": "1234567890",
    "email": "john@hotel.com",
    "address": "123 Main St",
    "salary": 50000,
    "username": "johndoe",
    "password": "securepassword"
  }
  ```
- **Response**: Returns person data and JWT token

#### 2. **Login**
- **Endpoint**: `POST /person/login`
- **Authentication**: None
- **Description**: Login with username and password
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword"
  }
  ```
- **Response**: Returns JWT token

#### 3. **Get Profile**
- **Endpoint**: `GET /person/profile`
- **Authentication**: Required (JWT)
- **Description**: Get authenticated user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns user profile data

#### 4. **Get All Staff**
- **Endpoint**: `GET /person`
- **Authentication**: Required (JWT)
- **Description**: Retrieve all staff members
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Returns array of all staff

#### 5. **Get Staff by Work Type**
- **Endpoint**: `GET /person/:worktype`
- **Authentication**: None
- **Description**: Filter staff by role (Chef, manager, waiter)
- **Example**: `GET /person/Chef`
- **Response**: Returns array of staff with specified work type

#### 6. **Update Staff**
- **Endpoint**: `PUT /person/:id`
- **Authentication**: Required (JWT)
- **Description**: Update staff member details
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Fields to update
- **Response**: Returns updated staff data

#### 7. **Delete Staff**
- **Endpoint**: `DELETE /person/:id`
- **Authentication**: Required (JWT)
- **Description**: Delete a staff member
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message

### Menu Management

#### 1. **Create Menu Item**
- **Endpoint**: `POST /menu`
- **Authentication**: None
- **Description**: Add a new menu item
- **Request Body**:
  ```json
  {
    "name": "Spicy Chicken Curry",
    "price": 299,
    "taste": "spicy",
    "is_drink": false,
    "ingredients": ["chicken", "spices", "curry leaves"],
    "num_sales": 0
  }
  ```
- **Response**: Returns created menu item

#### 2. **Get All Menu Items**
- **Endpoint**: `GET /menu`
- **Authentication**: None
- **Description**: Retrieve all menu items
- **Response**: Returns array of all menu items

#### 3. **Get Menu by Taste**
- **Endpoint**: `GET /menu/:tastOfFood`
- **Authentication**: None
- **Description**: Filter menu items by taste (spicy, sweet, sour)
- **Example**: `GET /menu/spicy`
- **Response**: Returns array of menu items with specified taste

#### 4. **Update Menu Item**
- **Endpoint**: `PUT /menu/:id`
- **Authentication**: None
- **Description**: Update menu item details
- **Request Body**: Fields to update
- **Response**: Returns updated menu item

#### 5. **Delete Menu Item**
- **Endpoint**: `DELETE /menu/:id`
- **Authentication**: None
- **Description**: Delete a menu item
- **Response**: Success message

## 🔒 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication:

1. **Registration/Login**: Users receive a JWT token upon successful signup or login
2. **Protected Routes**: Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Token Verification**: The `jwtMiddleware` validates tokens for protected routes
4. **Password Security**: Passwords are hashed using bcrypt before storage

## 💾 Database Models

### Person Schema
```javascript
{
  name: String (required),
  age: Number,
  work: String (enum: ['Chef', 'manager', 'waiter'], required),
  mobile: String (required),
  email: String (required, unique),
  address: String,
  salary: Number,
  username: String (required),
  password: String (required, hashed)
}
```

**Features**:
- Pre-save hook for password hashing
- `comparePassword` method for authentication
- Unique email constraint

### Menu Schema
```javascript
{
  name: String (required),
  price: Number (required),
  taste: String (enum: ['spicy', 'sweet', 'sour'], required),
  is_drink: Boolean (default: false),
  ingredients: [String] (default: []),
  num_sales: Number (default: 0)
}
```

## 📝 Usage Examples

### Example 1: Register and Login

```bash
# Register a new chef
curl -X POST http://localhost:3000/person/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gordon Ramsay",
    "work": "Chef",
    "mobile": "9876543210",
    "email": "gordon@hotel.com",
    "username": "gordon",
    "password": "chef123"
  }'

# Login
curl -X POST http://localhost:3000/person/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "gordon",
    "password": "chef123"
  }'
```

### Example 2: Access Protected Route

```bash
# Get profile (replace <token> with actual JWT)
curl -X GET http://localhost:3000/person/profile \
  -H "Authorization: Bearer <token>"
```

### Example 3: Menu Operations

```bash
# Add a menu item
curl -X POST http://localhost:3000/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chocolate Cake",
    "price": 150,
    "taste": "sweet",
    "is_drink": false,
    "ingredients": ["chocolate", "flour", "sugar", "eggs"]
  }'

# Get all spicy items
curl -X GET http://localhost:3000/menu/spicy
```

## 🔧 Development

### Logger Middleware
The application includes a custom logger that logs all requests:
```
[METHOD] [URL] - [TIMESTAMP]
```

### Error Handling
All routes include try-catch blocks with appropriate error responses and console logging.

## 📄 License

ISC

## 👤 Author

*Your Name Here*

---

**Note**: This is a backend API project. For production deployment, ensure to:
- Use strong JWT secrets
- Implement rate limiting
- Add input validation
- Set up CORS properly
- Use HTTPS
- Implement proper error logging
- Add API documentation (Swagger/OpenAPI)
