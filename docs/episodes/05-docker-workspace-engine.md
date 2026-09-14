# Episode 05 — Docker Workspace Engine

The workspace was now working as an application concept.

A user could create one, see it in the dashboard, and manage its database record.

But there was still a problem.

The workspace wasn't actually a development environment yet.

I wanted each workspace to become a real Docker container.

## Connecting the backend to Docker

I started using Dockerode to communicate with the Docker Engine from the Node.js backend.

This was a big step for the project because the backend was no longer just communicating with PostgreSQL.

It was now also communicating with the infrastructure running underneath the application.

The basic flow became:

```text
User
 ↓
React
 ↓
Express API
 ↓
Workspace Service
 ↓
Docker Engine
 ↓
Workspace Container
```

## Creating a workspace container

When a user creates a workspace, the backend now creates the corresponding Docker resources.

The project eventually settled on Ubuntu as the workspace environment.

The goal wasn't simply to start an Ubuntu container and leave it running.

I wanted the application itself to be responsible for the workspace lifecycle.

That meant implementing operations such as:

```text
Create
Start
Stop
Delete
Sync status
```
## Workspace lifecycle

I started thinking about a workspace as something with its own lifecycle.


```text
Create
   ↓
Container created
   ↓
Start
   ↓
Running
   ↓
Stop
   ↓
Stopped
   ↓
Start again
```

The backend had to keep the database state and Docker state in sync.

For example, the database could say that a workspace existed, while the corresponding Docker container might have stopped or disappeared.

That meant the application needed to check Docker rather than blindly trusting the database.

## Synchronizing Docker state

I added workspace synchronization logic to deal with this.

The backend checks the Docker container and updates the workspace state accordingly.

If the container is missing, the service can clear the old container reference so that the workspace can be recreated when necessary.

This was one of the first parts of the project where I really started dealing with the difference between **application state** and **infrastructure state**.

PostgreSQL knows about the workspace.

Docker knows about the container.

The application has to connect those two worlds.

## Start and stop operations

I then added API operations for starting and stopping workspaces.

The frontend could trigger these actions, while the backend service handled the Docker operation.

I also recorded these actions in the activity logs.

So instead of simply changing a database value, an operation could now affect the actual Docker environment:

```text
Start workspace
      ↓
Docker container starts
      ↓
Database state updated
      ↓
Activity logged
```
The same idea applied when stopping a workspace.

## Testing the Docker integration

I tested the workspace operations through the API and then through the web interface.

This was another stage where `curl` was useful.

I could test whether the API was correctly creating and managing Docker containers before involving the frontend.

Once the backend behavior was working, I could then check the same operations through the dashboard.

That made debugging much easier because I could separate problems in the frontend from problems in the Docker integration.

## What changed

This was a major turning point in the project.

Before this stage, a workspace was essentially a PostgreSQL record.

After connecting Docker, it represented an actual running environment.

The architecture was becoming:

```text
Browser
   ↓
React
   ↓
Express / TypeScript
   ├── PostgreSQL
   └── Docker Engine
           ↓
     Ubuntu Workspace
```

But I still had another problem to solve.

If the container was deleted or recreated, I didn't want the user's workspace data to disappear with it.

That led to the next challenge:

**persistent storage**.