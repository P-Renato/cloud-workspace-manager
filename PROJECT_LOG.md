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

## Session 6 – Workspace Management API

* Created workspace database migration
* Added workspaces table with user relationship
* Implemented Workspace TypeScript models
* Created workspace repository layer
* Added workspace request validation with Zod
* Implemented workspace controllers
* Added authenticated workspace routes
* Integrated workspace API with Express
* Tested complete workspace lifecycle using curl:
  * Create workspace
  * List workspaces
  * Retrieve workspace
  * Delete workspace
* Verified JWT authentication and ownership checks

## Testing

Backend API tested manually using curl commands.

## Session 7 – Service Layer Refactor

* Introduced workspace service layer
* Moved workspace business logic from controllers into services
* Refactored controllers to depend on services instead of repositories
* Improved separation of concerns:
  * Controllers handle HTTP requests and responses
  * Services contain business logic
  * Repositories manage database access
* Performed regression testing to verify existing API functionality remained unchanged

## Session 8 – Docker Workspace Runtime

* Added Docker service abstraction
* Implemented container creation and lifecycle management
* Added workspace start and stop endpoints
* Persisted Docker container IDs in PostgreSQL
* Implemented container metadata endpoint
* Added activity logging for workspace lifecycle events
* Integrated Express backend with Docker daemon
* Diagnosed and resolved Linux Docker socket permission issues
* Learned process permissions and Docker group membership handling

## Session 9 – Workspace Lifecycle & Activity Logging

* Added `activity_logs` table and migration system support
* Implemented activity log repository
* Added workspace lifecycle endpoints:
  * `PATCH /api/workspaces/:id/start`
  * `PATCH /api/workspaces/:id/stop`
* Implemented workspace status transitions:
  * `stopped → running`
  * `running → stopped`
* Added activity logging for:
  * Workspace creation
  * Workspace deletion
  * Workspace start
  * Workspace stop
* Extended service layer with workspace lifecycle business logic
* Updated frontend API client to support start and stop operations
* Added workspace start and stop actions to the dashboard
* Implemented live workspace status updates in the UI
* Verified persistence of workspace state and activity logs in PostgreSQL

## Session 10 – Docker Workspace Integration

* Created Docker service layer using Node.js child processes
* Implemented container creation using Alpine Linux images
* Implemented workspace start and stop through Docker
* Persisted Docker container IDs in PostgreSQL
* Implemented container metadata retrieval using `docker inspect`
* Implemented container removal during workspace deletion
* Connected workspace lifecycle operations to Docker Engine
* Verified synchronization between PostgreSQL state and container state
* Diagnosed and resolved Docker socket permission issues on Linux
* Tested end-to-end infrastructure management from React dashboard to Docker runtime
* Introduced real infrastructure orchestration concepts into the application