# 🍬 Sweet Shop Management System

A full-stack application built to manage a boutique sweet shop inventory.  
This project demonstrates modern web development practices including **RESTful API design**, **Role-Based Access Control (RBAC)**, **Test-Driven Development (TDD)**, and **End-to-End (E2E) Testing**.

## 🚀 Live Demo

**Check out the live application here:**
👉 **[Sweet Shop Live (Vercel)](https://sweet-shop-kata-delta.vercel.app)**

---

### 🔑 Admin Access

To test the Admin features (Restock, Edit, Delete):

1. Go to the **Register** page.
2. Create a user with the username: **`admin`**
3. The system will automatically grant Admin privileges.

🏗️ Architecture

Backend: Node.js + Express.js + Mongoose

Frontend: Next.js (App Router) + TypeScript + Tailwind CSS

Database: MongoDB (Persistent data storage)

Authentication: Custom JWT-based stateless authentication

UI Styling: Mobile-first responsive design using utility-first CSS (Tailwind)

Testing:

Unit/Integration: Jest + Supertest (Backend)

## End-to-End (E2E): Cypress (Frontend)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (Local instance running on port 27017)
- npm or yarn

### 1. Start MongoDB

Ensure your local MongoDB instance is running.

```bash
# If using Docker (Optional)
docker run -d --name mongodb -p 27017:27017 mongo
2. Backend Setup
Bash

cd backend
npm install

# Create environment variables
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/sweetshop" >> .env
echo "JWT_SECRET=development_secret_key" >> .env

npm run dev
The backend will start on http://localhost:5000

3. Frontend Setup
Bash

cd frontend
npm install
npm run dev
The frontend will start on http://localhost:3000

4. Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/v1

Admin Controls: Log in with an Admin account to see "Add Sweet" and "Edit" buttons on the main dashboard.
```

🧪 Running Tests
Backend Tests (TDD)
Bash

cd backend
npm test # Run tests once

npm run test:watch # Run in watch mode

npm run test:coverage # Generate coverage report

Frontend E2E Tests
Bash

cd frontend
Ensure frontend is running on port 3000 first!
npm run test:e2e # Run headless (terminal)
npm run test:e2e:ui # Run interactive (browser)

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach using **Tailwind CSS**.
- **Interactive Feedback**: Dynamic UI states (loading spinners, disabled buttons on low stock).
- **Navigation**: Persistent navigation bar with role-aware controls (Admin vs. User).
- **Form Handling**: React-controlled inputs with error feedback for login/registration.
- **Visual Hierarchy**: clear distinction between primary actions (Purchase) and admin actions (Edit/Delete).

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user.
- `POST /api/v1/auth/login` - User login (Returns JWT).

### Sweets Management

- `GET /api/v1/sweets` - Get a list of all available sweets.
- `GET /api/v1/sweets/search` - Search sweets by name or category.
- `POST /api/v1/sweets` - Create a new sweet (**Admin only**).
- `PUT /api/v1/sweets/:id` - Update an existing sweet (**Admin only**).
- `DELETE /api/v1/sweets/:id` - Delete a sweet (**Admin only**).

### Inventory Operations

- `POST /api/v1/sweets/:id/purchase` - Purchase a sweet (Decrements quantity).
- `POST /api/v1/sweets/:id/restock` - Restock a sweet (**Admin only**, Increments quantity).

## 🗄️ Database Models

### User Model

Stores authentication data and user roles.

```javascript
{
  first_name: String,
  family_name: String,
  username: String, // Unique Index
  password: String, // Hashed (Bcrypt)
  role: String,     // 'user' or 'admin'
  avatar_url: String
}
```

## 🎨 Frontend Architecture

Built with **Next.js** and **Tailwind CSS**, focusing on component reusability and responsive design.

### Core Components

- **Form Elements**: Custom-styled Inputs and Buttons with loading states.
- **Layouts**: Responsive Grid system for the inventory dashboard.
- **Navigation**: Dynamic Navbar that adapts based on User Role (Admin vs. Customer).
- **Feedback**: Conditional rendering for error messages and success states.

### UI Features

- **Responsive Design**: Mobile-first approach ensuring usability on all devices.
- **State Management**: React Hooks (`useState`, `useEffect`) for real-time data handling.
- **Dynamic Styling**: Tailwind utility classes for rapid, consistent styling.
- **Visual Feedback**: Disabled states for "Out of Stock" items and loading spinners during API calls.

## 🔒 Security Features

- **Password Security**: **Bcrypt** hashing (Salt rounds: 10) to secure user credentials.
- **JWT Authentication**: Stateless, token-based authentication for scalable security.
- **Role-Based Authorization (RBAC)**: Middleware verification to restrict Admin endpoints.
- **CORS Configuration**: Configured to allow secure communication between Frontend and Backend.
- **Protected Routes**: Higher-Order Component (HOC) or logic to redirect unauthenticated users.
- **Input Sanitization**: Basic validation to prevent malformed data entry.

## 🧪 Test Coverage

### Backend Tests (Integration)

Powered by **Jest** and **Supertest**.

- **Authentication**: Successful registration, login, and error handling for invalid credentials.
- **Sweet Management**: Verification of GET, POST, PUT, and DELETE endpoints.
- **Role-Based Access**: Ensuring non-admins cannot create or delete sweets.
- **Inventory Logic**: Testing that purchasing decrements stock correctly.
- **Middleware**: Verifying that protected routes reject requests without valid JWTs.

## 🚀 Recent Updates & Features

### Latest Enhancements

- **Enhanced Authentication**: Secure JWT implementation with Role-Based Access Control.
- **Improved Registration Flow**: User feedback on success and automatic redirection to Login.
- **Admin Dashboard**: Grid-based inventory management with intuitive Edit/Delete controls.
- **Modern UI Components**: Custom-built responsive components using Tailwind CSS.
- **User Experience**: Role-aware navigation bar and real-time stock status indicators.
- **Security Improvements**: Input validation and protected API routes.

### Development Highlights

1. **TDD Implementation**: Backend features developed using a Test-First approach (Jest).
2. **Modern UI**: Mobile-first design using utility-first CSS (Tailwind).
3. **Database Integration**: Robust MongoDB schemas with data validation.
4. **Security**: Stateless JWT authentication and hashed passwords (Bcrypt).
5. **Frontend Features**: Separate views for Admins and Customers.
6. **Testing**: End-to-End (E2E) test coverage using Cypress.

### Key Improvements

1. ✅ **Authentication System**: Secure, stateless login flow.
2. ✅ **Inventory Management**: Real-time stock decrementing upon purchase.
3. ✅ **UI/UX**: responsive grid layout for desktop and mobile.
4. ✅ **Visual Feedback**: Loading states and "Out of Stock" badges.
5. ✅ **Code Quality**: Modular architecture (MVC Backend, Service-based Frontend).

### Frontend Tests (End-to-End)

Powered by **Cypress**.

- **User Workflows**: Simulating a complete user journey (Login → Browse Home → Purchase Item).
- **Admin Features**: Verifying that Admin controls (Add/Edit buttons) only appear for Admin users.
- **Error States**: Checking that the UI correctly displays "Invalid Credentials" on failed login.
- **Routing**: Ensuring users are redirected to the Login page when accessing protected areas.

## 📂 Detailed Project Structure

```plaintext
sweet-shop-kata/
├── backend/                       # Express.js REST API
│   ├── src/
│   │   ├── api/v1/
│   │   │   ├── controllers/       # Request handlers (Logic layer)
│   │   │   │   ├── auth.controller.js
│   │   │   │   └── sweet.controller.js
│   │   │   ├── middlewares/       # Custom middleware
│   │   │   │   └── auth.middleware.js  # JWT verification & Admin checks
│   │   │   └── routes/            # Route definitions
│   │   │       ├── auth.route.js
│   │   │       ├── sweet.route.js
│   │   │       └── index.route.js
│   │   ├── models/                # Mongoose Database Schemas
│   │   │   ├── User.js
│   │   │   └── Sweet.js
│   │   ├── app.js                 # App configuration (Express setup)
│   │   └── server.js              # Server entry point (Port listener)
│   ├── tests/                     # Integration Tests
│   │   └── sweet.test.js          # Jest test suite for API endpoints
│   ├── .env                       # Environment variables (Gitignored)
│   └── package.json
│
├── frontend/                      # Next.js 15+ Application
│   ├── app/                       # App Router (Pages & Layouts)
│   │   ├── auth/                  # Authentication Pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── add-sweet/             # Admin: Add new inventory
│   │   ├── edit-sweet/            # Admin: Edit existing inventory
│   │   ├── layout.tsx             # Root layout (Navbar, Fonts)
│   │   ├── page.tsx               # Homepage (Dashboard & Search)
│   │   └── globals.css            # Global styles & Tailwind directives
│   ├── lib/                       # Core utilities
│   │   └── axios.ts               # Axios instance with Interceptors
│   ├── services/                  # API Service Layer
│   │   └── sweetService.ts        # Typed API calls to Backend
│   ├── types/                     # TypeScript Interfaces
│   │   └── index.ts               # Shared types (User, Sweet, AuthResponse)
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   ├── next.config.ts             # Next.js configuration
│   └── package.json
│
├── .gitignore                     # Global gitignore
└── README.md                      # Project documentation
```

## 🛡️ API Endpoints

| Method   | Endpoint                      | Description                        | Access           |
| :------- | :---------------------------- | :--------------------------------- | :--------------- |
| `POST`   | `/api/v1/auth/register`       | Register a new user                | **Public**       |
| `POST`   | `/api/v1/auth/login`          | Login user & get token             | **Public**       |
| `GET`    | `/api/v1/sweets`              | Get a list of all sweets           | **Public**       |
| `GET`    | `/api/v1/sweets/search`       | Search sweets by query             | **Public**       |
| `POST`   | `/api/v1/sweets`              | Add a new sweet to inventory       | **Admin**        |
| `PUT`    | `/api/v1/sweets/:id`          | Update sweet details               | **Admin**        |
| `DELETE` | `/api/v1/sweets/:id`          | Remove a sweet                     | **Admin**        |
| `POST`   | `/api/v1/sweets/:id/purchase` | Buy a sweet (Decrements stock)     | **User / Admin** |
| `POST`   | `/api/v1/sweets/:id/restock`  | Restock a sweet (Increments stock) | **Admin**        |

## 🚀 Deployment Configuration

### Environment Variables

**Backend (`backend/.env`)**

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secure_secret
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
Frontend (frontend/.env.local)

Code snippet

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
Production Build Steps
Database: Set up a production MongoDB instance (e.g., MongoDB Atlas).

Backend:

Update .env with production credentials.

Run npm start (ensure your package.json points to node src/server.js).

Frontend:

Run npm run build to generate the optimized production build.

Run npm start to serve the Next.js application.

📊 Test Results
Bash

# Backend Test Coverage (Jest)
npm run test:coverage

# Typical Results:
# - Auth Controller: 100%
# - Sweet Controller: 100%
# - API Routes: >90%
Bash

# Frontend E2E Results (Cypress)

npm run test:e2e
```

## 👥 User Workflows

### Customer Journey

1. **Registration**: Create a new account with secure password validation.
2. **Login**: Authenticate and receive a JWT for session management.
3. **Browse**: View the sweet inventory with real-time stock status.
4. **Search**: Filter sweets by name or category to find specific treats.
5. **Purchase**: Buy items (Quantity is automatically decremented).

### Admin Workflow

1. **Access Control**: Login with Admin credentials to unlock management features.
2. **Dashboard**: View the complete inventory grid with management controls.
3. **Create**: Add new sweets (Name, Price, Category, Image URL).
4. **Update**: Edit details or correct pricing for existing items.
5. **Restock**: Increment inventory levels for popular items.
6. **Remove**: Delete discontinued items from the store.

## 🛠️ Development Commands

```bash
# Backend (Port 5000)
npm run dev            # Start Express server
npm test               # Run Jest integration tests
npm run test:watch     # Run tests in TDD mode
npm run test:coverage  # Generate code coverage report

# Frontend (Port 3000)
npm run dev            # Start Next.js server
npm run build          # Build for production
npm run test:e2e       # Run Cypress tests (Headless)
npm run test:e2e:ui    # Run Cypress tests (Interactive)

# Scenarios Covered:
# - Admin Login & Dashboard Access
# - Customer Purchase Flow
# - Error Handling & Form Validation

---
```

## 🤖 AI Usage Disclosure

This project was developed with the assistance of AI tools to simulate a modern, efficient workflow. AI was utilized for:

- **Boilerplate Generation:** Accelerating the setup of UI components.
- **Debugging:** Troubleshooting specific configuration issues (e.g., Cypress IPv4 bindings).
- **Documentation:** Drafting the initial README structure.
  **Co-author trailer used in commits:**
  `Co-authored-by: Gemini <gemini@google.com>`

**Note:** All code logic, architecture decisions, and final implementations were manually created, reviewed, tested, and understood by the developer.
