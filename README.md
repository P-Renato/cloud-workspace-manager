# Cloud Workspace Manager

A full-stack portfolio project for creating and managing isolated Ubuntu development workspaces through a web interface.

## Overview

Cloud Workspace Manager combines full-stack application development with Linux, Docker, networking, and monitoring.

Authenticated users can create a workspace, start and stop it, open an interactive terminal, inspect its resource usage, and delete it. Each workspace uses persistent Docker storage, allowing the container to be recreated without losing its data.

The project was built as a hands-on way to develop practical experience across both software engineering and infrastructure.

## What I Built

- User registration and JWT-based authentication
- Protected workspace management
- Ubuntu-based development workspaces running in Docker containers
- Workspace start, stop, delete, and status synchronization
- Persistent Docker volumes and workspace recovery
- Interactive web terminal
- Workspace activity logging
- CPU, memory, network, and uptime information
- Application metrics with Prometheus
- Infrastructure metrics with Node Exporter
- Monitoring dashboards with Grafana
- Nginx reverse proxy for frontend, API, and WebSocket traffic

## Architecture

```text
                         Browser
                            │
                            ▼
                     ┌─────────────┐
                     │    Nginx    │
                     └──────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
      ┌──────────────┐            ┌──────────────┐
      │ React / Vite │            │ Express / TS │
      │   Frontend   │            │   Backend    │
      └──────────────┘            └──────┬───────┘
                                         │
                         ┌───────────────┼───────────────┐
                         ▼               ▼               ▼
                   PostgreSQL      Docker Engine     Prometheus
                                         │               │
                                         ▼               ▼
                                Ubuntu Workspaces     Grafana
                                  + Volumes


The application services are managed with Docker Compose. Nginx runs on the host and acts as the public entry point for the application.

## Workspace Lifecycle

```text
Create workspace
       │
       ▼
Docker container + persistent volume
       │
       ├── Start
       ├── Stop
       ├── Terminal
       ├── Inspect status/stats/logs
       └── Delete
              │
              ▼
       Persistent volume
       remains available


If a workspace container disappears, the backend can recreate it and attach the existing volume.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- CSS Modules
- Socket.IO client
- xterm.js

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- Zod
- Dockerode
- Socket.IO
- node-pty
- Prometheus client

### Infrastructure

- Ubuntu Server
- Docker
- Docker Compose
- Nginx
- Linux networking
- SSH
- PostgreSQL
- Docker persistent volumes

### Monitoring

- Prometheus
- Grafana
- Node Exporter

## Engineering Concepts

The project gave me practical experience with:

- Layered backend architecture
- Controllers, services, and repositories
- REST APIs
- Authentication and authorization
- Database migrations
- PostgreSQL connection management
- Docker Engine integration
- Persistent container storage
- WebSockets and interactive terminals
- Reverse proxies
- Linux server administration
- Application and infrastructure monitoring
- Debugging across multiple layers of a system

### Automation

- Python
- Bash
- GitHub Actions

---

## Development Environment

Development is performed on a dedicated Ubuntu Server virtual machine using:

- VS Code Remote SSH
- Git
- Ubuntu Server 24.04 LTS
- KVM / libvirt virtualization

## Monitoring

The application exposes Prometheus metrics for HTTP traffic, request duration, process resources, and workspace operations.

Prometheus collects both application metrics and host-level metrics from Node Exporter.

Grafana is used to visualize the collected data through dashboards covering areas such as:

- HTTP requests
- CPU usage
- memory usage
- Node.js event loop
- open file descriptors
- workspace creations
- workspace starts and stops
- workspace deletions

## Project Status

The core application is working end-to-end.

A complete workflow has been tested through the web application:


```text
Register
   ↓
Login
   ↓
Create workspace
   ↓
Start workspace
   ↓
Use interactive terminal
   ↓
Stop workspace
   ↓
Delete workspace


## Learning Journey

The development process is documented separately in `docs/episodes/`.

These episodes describe the project from my perspective, including the decisions I made, problems I encountered, debugging sessions, and what I learned while building the system.

## Project Goal

The main goal of this project was not simply to build another CRUD application.

I wanted to build something that would force me to work across the boundary between software development and infrastructure: from React and REST APIs to Linux, Docker, networking, persistent storage, and observability.