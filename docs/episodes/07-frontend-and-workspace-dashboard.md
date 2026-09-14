# Episode 07 — Frontend and Workspace Dashboard

With the backend able to create and manage real Docker workspaces, I needed to make the whole thing usable from the browser.

The frontend had already started with authentication and a basic dashboard, but now it needed to become the main interface for the workspace functionality.

## Connecting authentication

I created the authentication flow with Login and Register pages.

After logging in, the user is taken to the dashboard.

I also added an authentication context and a protected route so that users couldn't access the dashboard without being authenticated.

The basic flow became:

```text
Register
   ↓
Login
   ↓
Authentication
   ↓
Protected Dashboard
```

The frontend could then use the JWT returned by the backend when making protected API requests.

## Building the workspace dashboard

The dashboard became the main place for managing workspaces.

I separated the different parts of the interface into reusable components instead of putting everything directly into the page.

The main areas were:

```text
Dashboard
├── Header
├── Workspace creation
├── Workspace list
├── System status
└── Metrics
```

The workspace form was kept simple.

Since the project had settled on Ubuntu as the development environment, the user could create an Ubuntu workspace directly rather than having to choose between different templates.

## Managing workspace state

The frontend needed to reflect what was happening in Docker.

A workspace could be:

```text
Creating
Running
Stopped
Missing
```

So the dashboard had to fetch the current state from the API and update the interface after operations such as starting or stopping a workspace.

I added refresh logic so the frontend could periodically check the current workspace state.

This was useful because the state shown in the browser should represent what was actually happening on the backend rather than just what button the user had clicked.

## Workspace actions

The dashboard eventually supported the main workspace operations:

```text
Create
Start
Stop
Delete
Refresh
```
The frontend sends the appropriate API request, and then refreshes the workspace information.

For example:

```text
Click "Start"
     ↓
PATCH /api/workspaces/:id/start
     ↓
Backend service
     ↓
Docker container starts
     ↓
Frontend refreshes workspace
     ↓
Status changes to Running
```
This made the connection between the React interface and the Docker infrastructure visible directly in the application.

## Workspace information

I also added workspace information such as status, resource usage, logs, and activity information.

This was important because I didn't want the dashboard to be just a collection of buttons.

I wanted it to give the user some visibility into what their workspace was actually doing.

The workspace became something that could be managed and inspected from one place.

## Keeping the frontend organized

As more functionality was added, I kept moving repeated UI elements into reusable components.

This helped avoid having the dashboard become one huge React component.

It also made later changes easier because I could update a specific component without having to search through the entire dashboard.

At this point, the project had a complete path from the browser to the Docker Engine:

```text
Browser
   ↓
React / TypeScript
   ↓
Express API
   ↓
Workspace Service
   ↓
Docker Engine
   ↓
Ubuntu Workspace
```

The only thing missing was one of the most important parts of a development environment:

**a terminal**.

I wanted users to be able to actually work inside their workspace rather than simply start and stop it.

That became the next challenge.