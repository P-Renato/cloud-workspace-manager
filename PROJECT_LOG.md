# Project Log

## Session 1 – Development Environment

* Created Ubuntu development VM
* Configured SSH access using SSH keys
* Connected with VS Code Remote SSH

## Session 2 – Project Initialization

* Initialized Git repository
* Created React frontend with Vite and TypeScript
* Created Express backend with TypeScript
* Added `/api/health` endpoint

## Session 3 – Frontend Integration

* Connected React frontend to Express backend
* Created API abstraction layer
* Introduced frontend environment variables (`.env`)
* Implemented first frontend ↔ backend communication
* Created application layout and dashboard page
* Organized frontend into pages, layout, and API folders

## Session 4 – Authentication

* Added JWT authentication
* Implemented user registration endpoint
* Implemented login endpoint
* Added password hashing with bcrypt
* Implemented reusable authentication middleware
* Centralized authentication request types
* Improved backend folder structure for future scalability

## Session 5 – PostgreSQL Integration

* Installed PostgreSQL on the development VM
* Created application database and dedicated database user
* Configured database connection with `pg` connection pool
* Replaced in-memory user storage with PostgreSQL repository
* Implemented repository pattern for user persistence
* Created initial `users` table
* Added SQL migration system
* Added migration runner (`npm run migrate`)
* Automated database schema creation from migration files
* Implemented migration tracking to prevent duplicate execution