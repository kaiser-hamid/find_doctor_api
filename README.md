## Find Doctor - API
This repository contains the backend API for the "Find Doctor" application. It handles all the core logic, data storage, and business rules for the platform, providing data to the frontend application.

### Features
- RESTful API: A well-structured API for managing doctors, patients, appointments, and reviews.

- User Authentication & Authorization: Secure user registration and login using JSON Web Tokens (JWT). Role-based access control to protect routes.

- Database Integration: Connects to a MongoDB database to store and retrieve application data.

- Image Uploads: Functionality to handle doctor profile picture uploads and storage.

- Error Handling: Centralized error handling middleware for consistent and predictable error responses.

### Tech Stack & Dependencies
- This API is built with the following technologies and key packages:

- Runtime: Node.js

- Framework: Express.js

- Database: MongoDB with Mongoose ODM

- Authentication: JWT (JSON Web Token), bcrypt.js for password hashing

- File Uploads: Multer (or a cloud storage solution like Cloudinary)

- Environment Variables: dotenv
