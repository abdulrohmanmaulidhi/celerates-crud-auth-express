# CRUD Authentication Express API

A secure, full-featured Express.js API with user authentication and CRUD operations for managing data items. Built with PostgreSQL, JWT for authentication, and bcrypt for password encryption.

## 🌟 Features

- **User Authentication**: Secure registration and login system
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for data items
- **JWT Authentication**: Secure token-based authentication for protected routes
- **Password Encryption**: Bcrypt implementation for secure password storage
- **PostgreSQL Database**: Robust relational database with automatic table creation
- **RESTful API**: Clean, well-structured API endpoints

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (v5.1.0)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs
- **Environment Management**: dotenv
- **CORS**: Cross-origin resource sharing support

## 📋 Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL database server
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crud-auth-express
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and configure your environment variables based on `.env.example`:

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_db_password
   DB_NAME=crud_auth_db
   DB_PORT=5432

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # Server Configuration
   PORT=5000

   # Bcrypt salt rounds
   SALT=10
   ```

4. **Start the PostgreSQL server** and ensure your database is accessible

5. **Run the application**

   - For development (with auto-restart on changes):
     ```bash
     npm run dev
     ```
   
   - For production:
     ```bash
     npm start
     ```

## 🗄️ Database Schema

The application automatically creates two tables:

### Users Table
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- email: VARCHAR(255) UNIQUE NOT NULL
- password: VARCHAR(255) NOT NULL
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Items Table
```sql
- id: SERIAL PRIMARY KEY
- title: VARCHAR(255) NOT NULL
- description: TEXT
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

- **POST `/api/auth/register`** - User Registration
  - Request Body: `{ "name": "John Doe", "email": "john@example.com", "password": "securepassword" }`
  - Response: `{ "id": 1, "name": "John Doe", "email": "john@example.com", "token": "jwt_token" }`

- **POST `/api/auth/login`** - User Login
  - Request Body: `{ "email": "john@example.com", "password": "securepassword" }`
  - Response: `{ "id": 1, "name": "John Doe", "email": "john@example.com", "token": "jwt_token" }`

### Items Routes (`/api/items`) - *Requires Authentication*

All items routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

- **GET `/api/items`** - Get all items
  - Response: Array of all items

- **GET `/api/items/:id`** - Get a specific item by ID
  - Response: Single item object

- **POST `/api/items`** - Create a new item
  - Request Body: `{ "title": "Item Title", "description": "Item Description" }`
  - Response: Created item object

- **PUT `/api/items/:id`** - Update an existing item
  - Request Body: `{ "title": "Updated Title", "description": "Updated Description" }`
  - Response: Updated item object

- **DELETE `/api/items/:id`** - Delete an item
  - Response: `{ "message": "Data deleted successfully" }`

## 🧪 Testing

Currently, there are no automated tests included. You can use tools like Postman or curl to manually test the API endpoints.

## 🔐 Security Features

- Passwords are hashed using bcrypt with configurable salt rounds
- JWT tokens with configurable expiration (1 day by default)
- Protected routes that require valid authentication tokens
- Input validation and error handling
- Secure database connection with parameterized queries to prevent SQL injection

## 🛠️ Development Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reload
- `npm test` - Run tests (currently configured but no tests exist)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Celerates Assignment - CRUD Authentication Express API

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.
