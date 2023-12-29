# Student Management API

## Overview
This RESTful API is designed for managing student data at a university. It provides functionalities for creating, reading, updating, and deleting student information, including personal details, academic status, and contact information.

## Technologies
- Node.js
- Express.js
- Sequelize ORM
- MySQL

## Setup

### Prerequisites
- Node.js
- MySQL database

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   cd [project-name]
   npm install
   ```

### Configuration
Edit the `config/config.json` file to set up your database configuration for different environments (development, test, production).

### Running the Application
1. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### `GET /api/v1/students`
Lists all active students.

### `GET /api/v1/students/:id`
Retrieves a specific student by ID.

### `POST /api/v1/students`
Creates a new student. Required fields are `firstName`, `lastName`, `gender`, `studentId`, `collageCareer`, `birthDate`, and `status`.

### `PUT /api/v1/students/:id`
Updates an existing student. All fields are optional for updates.

### `DELETE /api/v1/students/:id`
Soft deletes a student (sets their status to inactive).

## Models

### Student
- `id`: Integer, primary key, auto-incremented
- `firstName`: String (max 25 characters), required
- `lastName`: String (max 25 characters), required
- `gender`: Char, required
- `studentId`: String (max 10 characters), required, unique
- `collageCareer`: String (max 50 characters), required
- `birthDate`: Date, required
- `address`: String (max 255 characters)
- `phoneNumber`: String
- `status`: Integer, required