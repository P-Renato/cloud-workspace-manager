# Episode 04 — Workspace Management

With the database and backend structure in place, I could finally start building the main feature of the project: managing development workspaces.

The idea was that an authenticated user should be able to create a workspace, see their workspaces, and manage them through the application.

## Building the workspace model

I started by creating the database migration for the `workspaces` table.

I had to think about how the PostgreSQL model should match what the backend would expect to receive and return.

After creating the migration, I ran:

```bash
npm run migrate
```

This gave me a reproducible way to create and update the database schema.

I also created TypeScript types for the workspace and its status.

At that point, I was already thinking ahead to the Docker part of the project, because the workspace data would eventually need to be connected to an actual Docker container.

## Creating the repository

Next, I created the workspace repository.

Its responsibility was deliberately limited to communicating with PostgreSQL.

It didn't need to know about HTTP requests, authentication, or business logic.

I added functions such as:

```text
createWorkspace()
findByUserId()
findById()
deleteWorkspace()
```

This made the database operations reusable by the rest of the application.

## Adding validation

I then created Zod schemas for workspace data.

The validation needed to match the database and the data the API was expecting.

This gave me a clear boundary between data coming into the application and the rest of the backend.

## Controllers and routes

Next came the workspace controller.

The controller's job was to deal with the HTTP side of the application:

```text
HTTP request
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
```

It reads information from the request, such as the request body, parameters, and authenticated user, and then calls the appropriate application logic.

I also noticed that every workspace route needed authentication.

Instead of adding the authentication middleware separately to every route, I applied it to the router:


```text
router.use(authenticate);
```

This meant that workspace endpoints were protected by default.

## Testing the API

Once the endpoints were working, I started testing them with curl.

This turned out to be very useful.

I found some typos and implementation mistakes while testing, and fixing them forced me to understand what was actually happening rather than simply assuming the endpoint worked.

It also gave me a way to test the backend independently from the frontend.

## Moving the logic into services

As the workspace functionality grew, I realized that some of the logic didn't really belong in the controller.

I moved the application logic into a service layer.

The controller could then focus on HTTP requests and responses, while the service handled what should actually happen when a workspace was created, deleted, or managed.

Because these operations involved asynchronous database calls, I also had to get used to using async and await throughout this part of the backend.

This separation became especially important once Docker entered the picture.

## Building the frontend

With the backend API working, I moved to the frontend.

I created the Login and Register pages, authentication context, API functions, and a protected route.

After authentication was working, I created the dashboard.

The dashboard became the place where a logged-in user could interact with the actual application.

The initial goal was simple:

```text
Login
  ↓
Dashboard
  ├── Create workspace
  ├── View workspaces
  └── Delete workspace
```

At this point, the project finally started feeling like the application I had originally imagined rather than just a collection of backend and frontend exercises.

## Adding activity logs

I also wanted the application to keep track of what happened to each workspace.

So I repeated the process I had already learned:

```text
Migration
   ↓
Type
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
Route
   ↓
Frontend
```

I added an activity log for workspace actions and connected it to the workspace management flow.

This was another good example of why the separation between controllers, services, repositories, and the database was useful.

Adding a new feature meant I could work through the different layers without having to put everything into one large file.

## What I learned

This was the point where I started understanding the difference between building individual features and building an application.

Creating a table, an API endpoint, or a React page by itself isn't particularly complicated.

The challenge was making all of these pieces work together:

```text
React
  ↓
REST API
  ↓
Authentication
  ↓
Service layer
  ↓
Repository
  ↓
PostgreSQL
```

And I knew the next step would make things considerably more interesting.

The workspace in the database was still just data.

I now needed to turn that workspace into an actual development environment.

That meant Docker.