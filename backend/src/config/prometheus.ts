import client from "prom-client";

client.collectDefaultMetrics();

/*
 * HTTP metrics
 */

export const httpRequestCounter =
  new client.Counter({
    name: "cloud_workspace_http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
  });

export const httpRequestDuration =
  new client.Histogram({
    name: "cloud_workspace_http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [
      0.005,
      0.01,
      0.025,
      0.05,
      0.1,
      0.25,
      0.5,
      1,
      2.5,
      5,
      10,
    ],
  });

/*
 * Workspace metrics
 */

export const workspaceCreationCounter =
  new client.Counter({
    name: "cloud_workspace_workspace_creations_total",
    help: "Total number of workspaces created",
  });

export const workspaceDeletionCounter =
  new client.Counter({
    name: "cloud_workspace_workspace_deletions_total",
    help: "Total number of workspaces deleted",
  });

export const workspaceStartCounter =
  new client.Counter({
    name: "cloud_workspace_workspace_starts_total",
    help: "Total number of workspace start operations",
  });

export const workspaceStopCounter =
  new client.Counter({
    name: "cloud_workspace_workspace_stops_total",
    help: "Total number of workspace stop operations",
  });

export const workspaceStartupDuration =
  new client.Histogram({
    name: "cloud_workspace_workspace_startup_duration_seconds",
    help: "Time required to start a workspace in seconds",
    buckets: [
      0.1,
      0.25,
      0.5,
      1,
      2.5,
      5,
      10,
      30,
      60,
    ],
  });

/*
 * Registry
 */

export const register = client.register;