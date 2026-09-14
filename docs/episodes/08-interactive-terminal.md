# Episode 08 — Interactive Terminal

At this point, users could create and manage a workspace from the dashboard.

But I wanted the workspace to feel like an actual development environment.

If someone starts an Ubuntu workspace, they should be able to actually use it.

So the next feature was an interactive terminal.

## Connecting the terminal to the workspace

I used three main pieces to build this:

- **Socket.IO** for real-time communication
- **node-pty** for the pseudo-terminal on the backend
- **xterm.js** for displaying the terminal in the browser

The basic architecture became:

```text
Browser
   │
   │ Socket.IO
   ▼
Express / Node.js
   │
   │ PTY + Docker
   ▼
Ubuntu Workspace
```

The browser sends keyboard input through the Socket.IO connection.

The backend creates and manages a pseudo-terminal connected to the workspace and sends the terminal output back to the browser.

## Using xterm.js

On the frontend, I added xterm.js to provide the terminal interface.

This was quite different from the other React components I had built.

Instead of displaying information returned by an API, the terminal had to continuously receive input and output.

Typing a command wasn't a normal HTTP request.

It was an ongoing interactive connection.

For example:

```text
User types "ls"
      ↓
Browser
      ↓
Socket.IO
      ↓
Backend
      ↓
Docker workspace
      ↓
Command output
      ↓
Socket.IO
      ↓
Terminal
```

## Creating the pseudo-terminal

On the backend, I used node-pty to create a pseudo-terminal.

The PTY provides the terminal-like interface needed for an interactive shell, while Docker provides the actual workspace environment.

This was one of the more interesting parts of the project because I had to deal with input, output, connection state, and process lifecycle rather than simply returning a JSON response.

## Handling the terminal lifecycle

The terminal also introduced another problem I hadn't really dealt with before.

A terminal connection has a lifecycle.

It can be created, receive input, produce output, and eventually close.

I had to make sure the backend handled these events properly instead of leaving terminal processes or socket connections behind.

This made me think more carefully about resource management.

With a normal REST endpoint, the request starts and ends.

With a terminal, the connection stays alive while the user is working.

## Testing it

Once the terminal was working locally, I tested it through the actual application.

I started a workspace, opened the terminal, and ran commands inside the Ubuntu environment.

That was the moment the project started feeling much more like the original idea.

I wasn't just managing a Docker container anymore.

I could actually interact with the environment through the browser.

I also tested the terminal through the production-style setup using Nginx.

That was important because Socket.IO needs the connection to be handled correctly by the reverse proxy.

## What I learned

The terminal feature introduced me to a completely different type of communication.

Most of the application so far had been based around REST:

```text
Request
   ↓
Response
```

The terminal was different:

```text
Connection
   ↕
Continuous input/output
   ↕
Workspace
```

That helped me understand why WebSockets are useful for applications that need real-time, bidirectional communication.

It also connected several things I had been learning separately:

```text
React
   ↓
Socket.IO
   ↓
Node.js
   ↓
node-pty
   ↓
Docker
   ↓
Ubuntu
```

The workspace was now something I could actually use from the browser.

The next problem was making all of these connections work properly through a single entry point.

That meant getting into **Nginx and networking**.