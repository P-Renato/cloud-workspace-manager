# Episode 03 — PostgreSQL and Backend Architecture

Once the basic application was working, it was time to introduce a real database.

I chose PostgreSQL and started connecting it to the backend using the `pg` package.

## Connecting PostgreSQL

One thing I learned here was the difference between opening a new database connection for every request and using a connection pool.

I used PostgreSQL's connection pool so the application could reuse a limited number of database connections instead of creating a completely new connection for every request.

I also changed the database operations to use asynchronous functions, since the backend needs to wait for the database without blocking the rest of the application.

This was one of those things that looked simple from the outside, but made me understand a little more about what actually happens when an API communicates with a database.

## Database migrations

Instead of manually changing the database every time I needed a new table or column, I started using SQL migration files.

The idea was simple:

```text
001_create_users.sql
002_create_workspaces.sql
003_create_activity_logs.sql
```

Whenever a feature required a database change, I could add another migration.

I could then run:

`npm run migrate`

This made the database structure reproducible and gave me a clear history of how the schema evolved.

## Adding validation

I also introduced Zod schemas for request validation.

This meant that data coming into the API could be checked before the application tried to use it.

For example, workspace creation could validate that the required fields existed and had the expected types and format.

This gave me another layer of protection between the client and the database.

## Introducing repositories

As the application became more complex, I didn't want SQL queries inside my controllers.

I created repository functions whose responsibility was to communicate with PostgreSQL.

For example, the workspace repository contained functions such as:

```text
createWorkspace()
findByUserId()
findById()
deleteWorkspace()
```

The repository handles database access.

It doesn't need to know about HTTP requests, authentication, or how the frontend works.

That allowed the controller to stay focused on handling the HTTP side of the application.

## Controllers and protected routes

The next step was creating the workspace controller.

The controller receives the HTTP request, reads things such as the request body, parameters, and authenticated user, and then calls the appropriate repository or service.

I also noticed that the workspace routes should all require authentication, so instead of adding authentication individually to every route, I applied the authentication middleware to the router:

```text
router.use(authenticate);
```

This meant that the workspace API was protected by default.

## Testing with curl

I started testing the API directly with curl.

This was useful because it allowed me to test the backend independently from the frontend.

It also exposed some of my own mistakes.

I found typos and implementation problems that I wouldn't necessarily have noticed just by looking at the code.

Fixing those problems while testing the API helped me understand what the backend was actually doing rather than simply assuming that it worked.

## Adding the service layer

At this point, I realized that some of the logic I had put directly into the controllers didn't really belong there.

I introduced a service layer between the controllers and repositories.

The basic idea became:

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

The controller deals with HTTP.

The service handles application and business logic.

The repository handles database access.

This separation became increasingly useful as I started adding Docker workspaces, activity logs, and more complicated operations.

## What I learned

This was probably one of the biggest changes in how I was thinking about backend development.

At first, it was tempting to think of an API endpoint as simply:

```tect
request → database → response
```

But as the project grew, I started seeing the value of separating the different responsibilities.

The application was becoming more complex, but the structure was also becoming easier to reason about.

That gave me a much better foundation for the next stage: actually managing workspaces.