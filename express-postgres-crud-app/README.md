# Express PostgreSQL CRUD Application

This is a basic CRUD application built with Express.js and PostgreSQL. It provides a simple API for managing items in a database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd express-postgres-crud-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your PostgreSQL connection details:
   ```
   DATABASE_URL=your_database_url
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- `POST /items` - Create a new item
- `GET /items` - Retrieve all items
- `GET /items/:id` - Retrieve a specific item by ID
- `PUT /items/:id` - Update a specific item by ID
- `DELETE /items/:id` - Delete a specific item by ID

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- dotenv

## License

This project is licensed under the MIT License.