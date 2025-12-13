# Sweet Shop Management System

A comprehensive full-stack web application for managing a sweet shop inventory with advanced user authentication, admin controls, and modern UI components. Built using Test-Driven Development (TDD) principles with a focus on clean architecture and user experience.

## 🏗️ Architecture

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: Next.js 15 + TypeScript + shadcn/ui
- **Database**: MongoDB (real instance, not in-memory)
- **Authentication**: JWT with refresh tokens + user session management
- **UI Components**: shadcn/ui with custom implementations
- **Testing**: Jest + Supertest (TDD approach) + Playwright (E2E)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker (for MongoDB)
- npm or yarn

### 1. Start MongoDB

```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **Admin Dashboard**: http://localhost:3000/admin (admin role required)

## 🧪 Running Tests

### Backend Tests (TDD)

```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

### Frontend E2E Tests

```bash
cd frontend
npm run test:e2e
npm run test:e2e:ui
```

## 📋 Features

### 🔐 Authentication & User Management

- **User Registration**: Complete registration flow with validation
- **Secure Login**: JWT-based authentication with refresh tokens
- **Session Management**: Persistent login with automatic token refresh
- **Role-Based Access**: User and admin roles with different permissions
- **User Profile**: Display username in navigation with logout functionality
- **Protected Routes**: Admin-only access to management features

### 🍭 Sweet Management

- **Admin Dashboard**: Comprehensive table-based inventory management
- **CRUD Operations**: Create, read, update, delete sweets
- **Real-time Inventory**: Live quantity tracking with status badges
- **Search & Filter**: Advanced search by name, category, price range
- **Bulk Operations**: Efficient management of multiple items

### 📦 Inventory Management

- **Stock Tracking**: Real-time quantity monitoring
- **Purchase System**: User-friendly purchase flow
- **Restock Functionality**: Admin restock with modal interface
- **Status Indicators**: Visual stock status (In Stock/Out of Stock)
- **Inventory Alerts**: Low stock notifications

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with system preference detection
- **shadcn/ui Components**: Professional component library
- **Modal Dialogs**: Improved restock modal with backdrop blur
- **Form Validation**: Real-time validation with error handling
- **Loading States**: Smooth user experience with loading indicators

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login with JWT token
- `POST /api/v1/auth/logout` - User logout (clears refresh token)
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user information

### Sweets Management

- `POST /api/v1/sweets` - Create sweet (admin only)
- `GET /api/v1/sweets` - Get all sweets with pagination
- `GET /api/v1/sweets/search` - Search sweets with filters
- `PUT /api/v1/sweets/:id` - Update sweet (admin only)
- `DELETE /api/v1/sweets/:id` - Delete sweet (admin only)

### Inventory Management

- `POST /api/v1/sweets/:id/purchase` - Purchase sweet (reduces quantity)
- `POST /api/v1/sweets/:id/restock` - Restock sweet (admin only)

## 🗄️ Database Schema

### User Model

```javascript
{
  first_name: String,
  family_name: String,
  username: String (unique),
  password: String (hashed),
  role: String (user/admin),
  avatar_url: String
}
```

### Sweet Model

```javascript
{
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Components

Built with shadcn/ui components and modern React patterns:

### Core Components

- **Form Components**: Input, Label, Button with validation
- **Layout Components**: Card, Badge, Alert with theme support
- **Data Display**: Table with sorting and responsive design
- **Navigation**: Header with user dropdown and theme toggle
- **Modals**: Restock modal with backdrop blur and animations

### UI Features

- **Theme System**: Dark/light mode with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and loading states
- **Form Validation**: Real-time validation with error messages

## 🔒 Security Features

- **Password Security**: bcryptjs hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Refresh Tokens**: Automatic token refresh for session management
- **Role-Based Authorization**: Admin/user role separation
- **Input Validation**: Comprehensive validation on all endpoints
- **CORS Configuration**: Secure cross-origin resource sharing
- **Protected Routes**: Authentication middleware for sensitive endpoints
- **Session Management**: Secure logout with token invalidation

## 🧪 Test Coverage

### Backend Tests (TDD Approach)

- **Authentication**: Register, login, logout, token refresh
- **User Management**: Profile retrieval, role-based access
- **Sweet Management**: CRUD operations with authorization
- **Inventory Management**: Purchase, restock, quantity tracking
- **Security**: Input validation, error handling, middleware
- **API Integration**: End-to-end API testing

### Frontend Tests

- **E2E Tests**: Complete user workflows with Playwright
- **Component Tests**: UI component integration
- **Authentication Flow**: Login, registration, logout
- **Admin Features**: Sweet management, inventory control
- **Responsive Design**: Mobile and desktop testing

## 📁 Project Structure

```
kata/
├── backend/
│   ├── src/
│   │   ├── api/v1/
│   │   │   ├── controllers/     # Route handlers (auth, sweets, users)
│   │   │   ├── models/         # MongoDB schemas (User, Sweet, RefreshToken)
│   │   │   ├── routes/         # API routes (auth, sweets, users)
│   │   │   ├── middlewares/   # Auth, validation, pagination
│   │   │   ├── services/       # Business logic (auth service)
│   │   │   └── validators/    # Input validation schemas
│   │   ├── app.js              # Express app setup
│   │   └── utils/              # JWT utilities
│   ├── tests/                  # Test files (auth, sweets, inventory)
│   ├── config/                 # Database, CORS, cookie config
│   └── bin/                    # Server startup
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/             # Admin dashboard page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── components/        # Layout components (header, footer)
│   │   └── globals.css        # Global styles
│   ├── components/ui/         # shadcn/ui components
│   ├── lib/                   # Utilities, API client, auth context
│   └── tests/                 # E2E tests with Playwright
└── README.md
```

## 🚀 Recent Updates & Features

### Latest Enhancements

- **Enhanced Authentication**: Added `/api/auth/me` endpoint for user profile management
- **Improved Registration Flow**: Fixed registration to redirect to login page with success message
- **Admin Dashboard**: Complete table-based inventory management with CRUD operations
- **Modern UI Components**: Upgraded to shadcn/ui with improved modal dialogs
- **User Experience**: Username display in navigation, theme switching, responsive design
- **Security Improvements**: Enhanced JWT handling and session management

### Development Highlights

1. **TDD Implementation**: All backend features developed test-first
2. **Modern UI**: shadcn/ui components with custom implementations
3. **Database Integration**: Real MongoDB connection with proper schemas
4. **Security**: JWT authentication with refresh tokens and role-based access
5. **Frontend Features**: Complete admin dashboard and user interface
6. **Testing**: Comprehensive test coverage for all features

### Key Improvements

1. ✅ **Authentication System**: Complete JWT implementation with user session management
2. ✅ **Admin Dashboard**: Professional table-based inventory management
3. ✅ **UI/UX**: Modern components with dark/light theme support
4. ✅ **Registration Flow**: Fixed redirect and user feedback
5. ✅ **Modal Dialogs**: Improved restock modal with backdrop blur
6. ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Deployment

### Environment Variables

**Backend (.env)**

```
NODE_ENV=development
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://admin:secret@127.0.0.1:27017/kata-api?authSource=admin
```

**Frontend (.env.local)**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production Deployment

1. Set up MongoDB Atlas or production MongoDB instance
2. Update environment variables
3. Build frontend: `npm run build`
4. Start backend: `npm start`

## 📊 Test Results

```bash
# Backend test results
npm run test:coverage

# Expected coverage:
# - Authentication: 100%
# - Sweet Management: 100%
# - Inventory Management: 100%
# - Overall: >90%
```

## 👥 User Workflows

### Customer Journey

1. **Registration**: Create account with validation
2. **Login**: Secure authentication with JWT tokens
3. **Browse Sweets**: View inventory with search and filters
4. **Purchase**: Buy sweets with quantity tracking
5. **Profile**: View username in navigation

### Admin Workflow

1. **Admin Login**: Access with admin role
2. **Dashboard**: Comprehensive inventory management
3. **Add Sweets**: Create new inventory items
4. **Edit/Delete**: Manage existing items
5. **Restock**: Add inventory with modal interface
6. **Monitor**: Track stock levels and status

## 🛠️ Development Commands

```bash
# Backend
npm run dev          # Start development server
npm test            # Run tests
npm run test:watch  # Watch mode
npm run test:coverage # Coverage report

# Frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run test:e2e    # Run E2E tests
```

## 📝 License

This project is part of a TDD Kata exercise and is for educational purposes.

---

**Built with ❤️ using Test-Driven Development principles**
