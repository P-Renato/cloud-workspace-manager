# Episode 02 — Project Foundation

With the development environment working, I could finally start building the actual application.

The original idea was quite ambitious. I wanted the project to demonstrate practical software engineering together with Linux administration, Docker, networking, and infrastructure.

The rough direction was:

```text
React
  ↓
Node / Express
  ↓
Docker
  ↓
Docker Compose
  ↓
Nginx
  ↓
PostgreSQL
```

I knew the architecture would probably change as I learned more, but I wanted to start with a working foundation rather than trying to design everything upfront.

## Starting the frontend

I initialized the frontend using Vite with React and TypeScript.

I created an initial structure to keep the project organized:

```text
src/
├── api/
├── components/
├── layout/
├── pages/
├── types/
├── App.tsx
└── main.tsx
```

I didn't want everything to end up inside `App.tsx`, so I started separating the application into areas with different responsibilities.

I also created an API layer. This gave me one place to handle communication with the backend instead of scattering API requests throughout the React components.

That made it easier to add things later, such as workspace operations and health checks.

## Starting the backend

Next, I created the Node.js backend using Express and TypeScript.

One of the first things I implemented was a simple health endpoint.

The idea was straightforward: before building complicated features, I wanted to know that the backend itself was actually running.

Once that worked, I connected the frontend to the backend and displayed the health information on the development page.

So I had my first complete path through the application:

```text
React frontend
      ↓
Express API
      ↓
Health endpoint
      ↓
Response back to React
```

It was a small feature, but it gave me confidence that the basic application architecture was working.

## Thinking about structure

As soon as I started adding real functionality, I realized that the backend needed more structure.

I didn't want authentication, validation, database queries, and business logic all mixed together in the route handlers.

I started separating responsibilities into areas such as:

```text
middleware
controllers
routes
services
types
error handling
```

I also created reusable API response helpers so that I could use the same response structure in different parts of the application.

At this point, I was starting to understand something important:

### Good structure becomes much more valuable as the application grows.

It might feel unnecessary when a project is small, but adding another feature becomes much easier when you already know where that feature belongs.

## Preparing for the database

Once the basic structure and CRUD functionality were working, I was ready to introduce PostgreSQL.

The original plan was to eventually move PostgreSQL into its own VM rather than keeping everything on the development VM.

That meant I was already thinking about separating application and database infrastructure instead of treating the whole project as one machine.

This was also the point where the project started becoming more than just a React and Node application.

I was now having to think about:

- how services communicate with each other
- where data lives
- how the backend accesses the database
- how the infrastructure should be separated
- and how all of these pieces could eventually work together

The foundation was in place. Now I could start building the actual application features.