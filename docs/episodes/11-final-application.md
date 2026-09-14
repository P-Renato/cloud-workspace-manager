# Episode 11 — The Final Application

After working through all the individual parts of the project, I finally reached the point where I could look at Cloud Workspace Manager as one complete application.

What started as an idea for a portfolio project had turned into something much more involved than I originally expected.

## Putting everything together

The final application connects several different areas of development and infrastructure:

```text
Browser
   ↓
Nginx
   ↓
React / TypeScript
   ↓
Express / TypeScript
   ├── PostgreSQL
   └── Docker Engine
           ↓
     Ubuntu Workspace
```

Alongside this, Prometheus and Grafana provide monitoring for the application and the host system.

The result is an application where an authenticated user can:

```text
Register
   ↓
Login
   ↓
Create Ubuntu workspace
   ↓
Start workspace
   ↓
Open terminal
   ↓
Work inside the environment
   ↓
Stop workspace
   ↓
Start it again
   ↓
Keep the workspace data
   ↓
Delete workspace
```

I tested this workflow through the actual web application rather than only testing individual API endpoints.

## Looking back at the architecture

One of the things I wanted from this project was to understand how the different pieces of a real application fit together.

I ended up working with:

```text
Frontend
   └── React / TypeScript

Backend
   ├── Express
   ├── Controllers
   ├── Services
   ├── Repositories
   └── REST API

Database
   └── PostgreSQL

Infrastructure
   ├── Linux
   ├── Docker
   ├── Docker Compose
   └── Nginx

Real-time communication
   ├── Socket.IO
   ├── node-pty
   └── xterm.js

Monitoring
   ├── Prometheus
   ├── Node Exporter
   └── Grafana
```

Each technology solved a different problem.

More importantly, I had to understand how they communicate with each other.

## The biggest lessons

The most valuable part of the project wasn't learning one particular technology.

It was learning how to debug problems across different layers.

I had situations where the code looked correct but the problem was actually related to networking, Docker, environment variables, dependencies, or the way different processes communicated.

That forced me to stop looking at problems as isolated pieces of code.

I started asking questions like:

```text
Where is this process running?
What does this address mean from there?
Which service is actually handling this request?
Is the problem in the frontend, API, database, Docker, or network?
What evidence can I use to find out?
```

That way of thinking was probably one of the most useful things I gained from the project.

## What this project represents

Cloud Workspace Manager is still a portfolio project.

It isn't meant to pretend that I have years of professional experience running production infrastructure.

What it does demonstrate is that I can take an idea, build it across multiple technologies, run into problems, investigate them, and gradually turn the different pieces into a working system.

I started this project mainly to improve my technical skills.

Along the way, I ended up learning much more about Linux, Docker, networking, backend architecture, persistent storage, WebSockets, monitoring, and debugging than I originally expected.

And I think that is the most valuable result of the project.

I didn't just build a CRUD application.

I built something that made me work across the boundary between **software engineering and infrastructure**.

That was the goal from the beginning.

And now I have a working project that I can actually show for it.