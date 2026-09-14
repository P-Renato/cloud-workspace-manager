# Episode 09 — Nginx and Networking

By this point, the application was working, but I was still accessing different parts of it through different ports.

The frontend, backend, Grafana, and other services were running separately.

I wanted the application to have a proper entry point.

That meant introducing Nginx.

## Why Nginx?

I used Nginx as a reverse proxy in front of the application.

Instead of the browser having to know which port belongs to which service, Nginx can receive the requests and forward them to the correct destination.

The basic idea became:

```text
Browser
   │
   ▼
 Nginx
   ├── /      → Frontend
   ├── /api   → Backend
   └── /socket.io → Backend
```

This also meant that the frontend could use `/api` rather than having to hard-code the backend's address.

## Running into networking problems

This part was more complicated than I expected.

I had to deal with the difference between:

```text
localhost
127.0.0.1
VM IP address
Docker service names
```

They don't all refer to the same thing.

For example, `localhost` inside a container refers to that container itself, not to another container or to the host machine.

I had already encountered this problem when PostgreSQL was moved away from the development environment.

Now I had to think about networking from the browser's perspective as well as from inside Docker.

## Host Nginx vs Docker Nginx

Another problem appeared because port 80 was already being used by Nginx running directly on the Ubuntu host.

That meant the Nginx container couldn't also bind to port 80.

Instead of forcing both to use the same port, I kept the host Nginx as the public entry point and configured it to forward requests to the application services.

The result was:

```text
Browser
   ↓
Host Nginx :80
   ↓
Frontend / Backend
```

This was a useful lesson in understanding that Docker doesn't automatically isolate a service from the host's networking.

Ports still have to be available on the host.

## Configuring the reverse proxy

I configured separate Nginx locations for the frontend, API, and Socket.IO traffic.

For the normal application traffic, Nginx forwards requests to the frontend or backend.

For Socket.IO, I also had to configure the connection upgrade headers required for the WebSocket connection.

That part was particularly important because the terminal depended on the real-time connection.

Without the correct proxy configuration, the terminal could work when connecting directly to the backend but fail when accessed through Nginx.

## Testing the complete path

I tested the Nginx configuration with:


```text
sudo nginx -t
```

Once the configuration was valid, I reloaded Nginx.

I then tested the application through the VM's IP address instead of accessing the individual frontend and backend ports directly.

The terminal was also tested through the Nginx setup.

One thing that initially confused me was getting a `400 Bad Request` when opening the Socket.IO path directly in a browser.

That turned out not to mean that Socket.IO was broken.

A normal browser request to `/socket.io/` isn't the same thing as a valid Socket.IO client handshake.

The actual application terminal connection worked correctly through the proxy.

## What I learned

This was probably one of the biggest networking lessons in the project.

I started with the idea that:


```text
frontend → backend
```

was basically enough.

But once multiple services and containers were involved, I had to understand **where a request originates, what address it can reach, which port is exposed, and which service should receive it**.

The final application path became:


```text
Browser
   ↓
Nginx
   ├── React frontend
   ├── Express API
   └── Socket.IO
             ↓
        Docker workspace
```

At this point, the application was not only functional — it also had a proper entry point and a networking layer.

The next step was to make the system observable.

I wanted to know what was happening inside the application and on the server instead of relying only on whether the interface appeared to be working.

That meant **monitoring and observability**.