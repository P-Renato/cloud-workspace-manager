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

## Session 7 – Service Layer Refactor

* Introduced workspace service layer
* Moved workspace business logic from controllers into services
* Refactored controllers to depend on services instead of repositories
* Improved separation of concerns:

  * Controllers handle HTTP requests and responses
  * Services contain business logic
  * Repositories manage database access
* Performed regression testing to verify existing API functionality remained unchanged

## Session 8 – Docker Infrastructure Foundation

* Dockerized frontend, backend, and PostgreSQL services
* Created `docker-compose.yml`
* Added backend and frontend Dockerfiles
* Configured container networking and service discovery
* Introduced environment variable management for containers
* Diagnosed and resolved container port conflicts
* Learned Docker networking concepts and service communication
* Verified multi-container application deployment

## Session 9 – Workspace Lifecycle Management

* Added `activity_logs` table and migration support
* Implemented activity log repository
* Added workspace lifecycle endpoints:

  * `PATCH /api/workspaces/:id/start`
  * `PATCH /api/workspaces/:id/stop`
* Implemented workspace state transitions:

  * `stopped → running`
  * `running → stopped`
* Added activity logging for:

  * Workspace creation
  * Workspace deletion
  * Workspace start
  * Workspace stop
* Updated frontend dashboard with workspace lifecycle actions
* Implemented live workspace status updates
* Verified persistence of workspace state and activity history

## Session 10 – Docker Workspace Runtime

* Created Docker service abstraction using Node.js child processes
* Implemented workspace container creation using Alpine Linux images
* Persisted Docker container IDs in PostgreSQL
* Implemented container metadata retrieval using `docker inspect`
* Implemented container removal during workspace deletion
* Mounted Docker socket into backend container
* Installed Docker CLI inside backend container
* Enabled backend container to manage Docker Engine directly
* Diagnosed and resolved Docker CLI and socket integration issues
* Verified end-to-end workspace provisioning:

  * React Dashboard
  * Express API
  * PostgreSQL persistence
  * Docker Engine
  * Workspace containers
* Introduced infrastructure orchestration concepts similar to small PaaS platforms

## Current Architecture

React Dashboard
↓
Express API
↓
Service Layer
↓
PostgreSQL
↓
Docker Engine
↓
Workspace Containers

## Testing

* Backend API tested manually using curl commands
* Verified workspace lifecycle operations end-to-end
* Verified Docker container provisioning and state synchronization
* Verified PostgreSQL persistence and migration system

## Session 11 – Frontend Authentication & Docker Integration

* Diagnosed frontend accessibility issues between VM, host machine, and Docker containers
* Investigated differences between Vite development server (`npm run dev`) and Docker production preview (`npm run preview`)
* Learned how Docker port mapping exposes the frontend on port `4173`
* Configured frontend environment variables for API communication
* Fixed API connectivity by updating `VITE_API_URL`
* Diagnosed browser networking and CORS behavior
* Verified frontend ↔ backend communication from the host machine
* Implemented complete frontend authentication flow:
  * User registration
  * User login
  * JWT persistence in localStorage
  * Automatic authentication restoration
  * Protected routes
  * Logout
* Added React Authentication Context
* Implemented reusable API client structure
* Verified complete authentication flow with PostgreSQL persistence

## Session 12 – Workspace Details & Frontend Component Architecture

### Backend

* Added workspace metadata endpoint:
  * `GET /api/workspaces/:id/metadata`
* Added workspace activity history endpoint:
  * `GET /api/workspaces/:id/logs`
* Implemented service methods for:
  * Workspace metadata retrieval
  * Activity log retrieval
* Added ownership validation for new workspace endpoints

### Frontend

* Created reusable workspace detail components
* Displayed workspace metadata and activity history
* Improved dashboard organization and component structure
* Verified end-to-end retrieval of workspace metadata and logs

## Session 13 – Workspace Templates & Runtime Images

### Backend

* Introduced workspace template configuration
* Added `workspaceTemplates.ts` as the central source of available runtimes
* Implemented workspace template endpoint:
  * `GET /api/workspace-templates`
* Refactored workspace creation to accept `templateId` instead of exposing Docker images through the public API
* Mapped template IDs to Docker images on the server side
* Preserved the Docker image reference in the database for runtime provisioning
* Updated Docker container creation to launch the image associated with each template
* Added validation for invalid template identifiers
* Improved service layer responsibilities by separating user input from infrastructure details

### Docker

* Successfully provisioned workspaces using multiple runtime images:
  * Alpine Linux
  * Node.js 22
* Verified correct Docker image selection during workspace startup
* Confirmed container creation, start, stop and deletion continue functioning after template refactor

### Testing

* Tested workspace template endpoint with curl
* Verified workspace creation using template IDs
* Verified Docker image persistence in PostgreSQL
* Verified end-to-end workspace lifecycle after template implementation
* Diagnosed and resolved stale container ID issues after Docker environment resets

## Current Architecture

React Dashboard
↓
Express API
↓
Controllers
↓
Service Layer
↓
Repositories
↓
PostgreSQL
↓
Docker Engine
↓
Workspace Containers

## Testing

* Backend API tested manually using curl
* Verified authentication flow
* Verified workspace CRUD operations
* Verified workspace lifecycle operations
* Verified Docker container provisioning
* Verified workspace template selection
* Verified PostgreSQL persistence
* Verified activity logging
* Verified metadata retrieval
* Verified migration system