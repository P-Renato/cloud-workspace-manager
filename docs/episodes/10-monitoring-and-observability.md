# Episode 10 — Monitoring and Observability

Once the application was working end-to-end, I wanted to answer a different question:

**How do I know what is happening inside the system?**

It wasn't enough to see that the application worked from the browser.

I wanted to be able to see things like HTTP traffic, CPU and memory usage, Node.js process information, and workspace operations.

That led me to monitoring and observability.

## Adding application metrics

I added `prom-client` to the backend and created a `/metrics` endpoint.

Prometheus can request this endpoint and collect the metrics exposed by the application.

I started tracking information such as:

```text
HTTP requests
Request duration
CPU usage
Memory usage
Workspace creations
Workspace starts
Workspace stops
Workspace deletions
```

I could then check the endpoint directly:

```text
curl http://localhost:3000/metrics
```

Seeing the metrics being returned made the monitoring setup much easier to understand.

The application wasn't just producing responses anymore.

It was also producing information about its own behaviour.

## Adding Prometheus

Next, I added Prometheus to the Docker Compose setup.

Prometheus periodically scrapes configured targets and stores the collected metrics.

I configured it to collect metrics from both the backend and Node Exporter.

The architecture became:

```text
Backend ──────────┐
                  ▼
             Prometheus
                  ▲
                  │
Node Exporter ────┘
```

This gave me two different perspectives.

The backend could tell me about the application.

Node Exporter could tell me about the host system.

## Adding Node Exporter

For infrastructure-level information, I added Node Exporter.

It exposes metrics about the Linux host, including things such as CPU, memory, and other system resources.

This helped me understand the difference between application monitoring and infrastructure monitoring.

For example:

```text
Application
   └── HTTP requests
   └── Workspace operations
   └── Node.js process metrics

Host
   └── CPU
   └── Memory
   └── System resources
```

Both are useful, but they answer different questions.

## Visualizing everything with Grafana

Prometheus is excellent for collecting and querying metrics, but I wanted a more visual way to inspect them.

So I connected Grafana to Prometheus.

I created a dashboard with panels for things such as:

```text
CPU Seconds Total
Node.js Event Loop
Process Heap
Open File Descriptors
Resident Memory
HTTP Requests / Second
Workspace Operations
```

I also added application metrics to the workspace dashboard itself.

This meant I could see information about the system without having to manually inspect Prometheus responses.

## Workspace operations

One of the more interesting dashboards was the workspace operations panel.

I could track the rate of workspace creations, starts, stops, and deletions.

For example, the queries used Prometheus's rate() function to show how frequently these operations were happening rather than simply showing their lifetime totals.

This was useful because it turned the application's activity into something I could actually observe over time.

## Monitoring the complete system

By this stage, the project had several layers that could be observed:

```text
Browser
   ↓
Nginx
   ↓
React / Express
   ↓
PostgreSQL
   ↓
Docker
   ↓
Ubuntu host
```

This was a big change in how I thought about the project.

Before, I mostly asked:

> Does it work?

Now I could ask:

> What is the system doing?

## What I learned

Monitoring made me realize that building an application doesn't end when the feature works.

Once a system becomes more complex, being able to observe it becomes increasingly important.

I also learned that application metrics and infrastructure metrics are different things, and that tools such as Prometheus and Grafana can connect those two perspectives.

At this point, all the major pieces of the project were in place.

The final step was to look at the application as a whole and document what I had actually built.

That became the final episode.