# TypeORM Demo

A TypeScript-based REST API demonstration project showcasing TypeORM integration with PostgreSQL, featuring a school management system with students and classrooms.

## 🎯 Purpose

This project demonstrates:

- **TypeORM** implementation with PostgreSQL
- **Clean Architecture** principles with separation of concerns
- **Dependency Injection** using RSDI container
- **Express.js** REST API development
- **Data validation** with Zod schemas
- **Database migrations** and entity management
- **Docker** containerization for database

## 🏗️ Architecture

The project follows a layered architecture pattern:

```
src/
├── api/
│   └── controllers/          # REST API endpoints and request handling
├── models/                   # Domain models and validation schemas
├── persistence/
│   ├── entities/            # TypeORM database entities
│   ├── repositories/        # Data access layer
│   └── sql/                 # Database migration scripts
└── Utils/                   # Utility classes and helpers
```

### Key Components

- **Controllers**: Handle HTTP requests/responses and business logic
- **Models**: Domain objects with Zod validation schemas
- **Entities**: TypeORM database entities with decorators
- **Repositories**: Data access layer extending TypeORM repositories
- **Dependency Container**: RSDI-based dependency injection

### Domain Models

- **Student**: Represents a student with email, name, and age
- **Classroom**: Represents a classroom with subject and key stage
- **ClassroomMember**: Junction entity for student-classroom relationships

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bobby1072/TypeOrmDemo.git
   cd TypeOrmDemo
   ```

2. **Install dependencies**

   ```bash
   cd src/core
   npm install
   ```

3. **Start the PostgreSQL database**

   ```bash
   # From the root directory
   docker-compose up --build -d
   ```

4. **Build the TypeScript code**

   ```bash
   npm run build
   ```

5. **Run database migrations**
   The migrations will run automatically when the application starts.
   You can ignore errors since once migrations are run once they wil error a second time

6. **Start the application**

   ```bash
   # Development mode with auto-reload
   npm run start:dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 🗄️ Database Configuration

The application uses PostgreSQL running in Docker:

- **Host**: localhost
- **Port**: 5560
- **Database**: type_orm_demo
- **Username**: postgres
- **Password**: postgres

Database connection is configured in `src/persistence/dbPublicContextSource.ts`

## 📡 API Endpoints

### Student Management

- **POST** `/api/Student/Register`

  ```json
  {
    "email": "student@example.com",
    "name": "John Doe",
    "age": 20
  }
  ```

- **POST** `/api/Student/Update`

  ```json
  {
    "id": "guid-here",
    "email": "updated@example.com",
    "name": "Updated Name",
    "age": 21
  }
  ```

- **POST** `/api/Student/Delete`
  ```json
  {
    "id": "guid-here"
  }
  ```

### Classroom Management

- **POST** `/api/Classroom/Create`

  ```json
  {
    "name": "Mathematics 101",
    "subject": "MATHS",
    "keyStage": "KS2"
  }
  ```

- **POST** `/api/Classroom/Update`

  ```json
  {
    "id": "guid-here",
    "name": "Updated Classroom",
    "subject": "ENGLISH",
    "keyStage": "KS3"
  }
  ```

- **POST** `/api/Classroom/Delete`
  ```json
  {
    "id": "guid-here"
  }
  ```

## 🛠️ Available Scripts

```bash
# Development with auto-reload
npm run start:dev

# Build TypeScript
npm run build

# Start production server
npm start

# Build and start
npm run build-start

# Run tests
npm test

# Debug mode
npm run debug:start
```

## 🏗️ Development

### Project Structure

- **Models**: Domain objects with validation using Zod schemas
- **Entities**: TypeORM entities with database mappings
- **Repositories**: Data access layer with custom query methods
- **Controllers**: REST API endpoints with error handling
- **Dependency Injection**: RSDI container for managing dependencies

### Key Features

- **Type Safety**: Full TypeScript implementation with strict typing
- **Validation**: Zod schemas for request validation
- **Error Handling**: Structured error responses with proper HTTP status codes
- **GUID Support**: Custom GUID implementation for entity IDs
- **Database Migrations**: SQL-based migrations with TypeORM
- **Compression**: Express compression middleware for performance

### Database Schema

The application includes entities for:

- Students (id, email, name, age, timestamps)
- Classrooms (id, name, subject, keyStage, timestamps)
- ClassroomMembers (junction table for many-to-many relationship)

## 🐳 Docker Support

The project includes Docker Compose configuration for the PostgreSQL database:

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs postgres
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Tests are configured with Jest and can be found in the test directories.

## 📝 Environment Variables

- **PORT**: Server port (default: 5000)
- **NODE_ENV**: Environment mode (development/production/test)
- **DEBUG**: Express debug mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔧 Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **RSDI** - Dependency injection
- **Docker** - Containerization
- **Jest** - Testing framework
- **Nodemon** - Development auto-reload
