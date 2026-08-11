import { Request, Response } from "express";
import { queryPrometheus, queryPrometheusRange } from "../services/prometheusService";

interface TimeSeriesPoint {
  timestamp: number;
  value: number;
}

function extractTimeSeries(
  result: unknown[]
): TimeSeriesPoint[] {
  if (!result.length) {
    return [];
  }

  const first = result[0] as {
    values?: [number, string][];
  };

  return (first.values ?? []).map(
    ([timestamp, value]) => ({
      timestamp,
      value: Number(value),
    })
  );
}

function extractValue(result: unknown[]): number {
  if (!result.length) {
    return 0;
  }

  const first = result[0] as {
    value?: [number, string];
  };

  return Number(first.value?.[1] ?? 0);
}

export const getAdminMetrics = async (
  _req: Request,
  res: Response
) => {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 30 * 60;                      
  const step = 30;

  try {
    const [
      httpRequestRate,
      httpRequestDuration,
      workspaceStarts,
      workspaceStops,
      workspaceCreations,
      workspaceDeletions,
      cpuUsage,

      workspaceCreationsHistory,
      workspaceStartsHistory,
      workspaceStopsHistory,
      workspaceDeletionsHistory,
      cpuUsageHistory,
    ] = await Promise.all([
      // Current HTTP request rate
      queryPrometheusRange(
        "sum(rate(cloud_workspace_http_requests_total[5m]))",
        start,
        end,
        step
      ),

      // Current average HTTP request duration
      queryPrometheus(
        "sum(rate(cloud_workspace_http_request_duration_seconds_sum[5m])) / sum(rate(cloud_workspace_http_request_duration_seconds_count[5m]))"
      ),

      // Current workspace counters
      queryPrometheus(
        "cloud_workspace_workspace_starts_total"
      ),

      queryPrometheus(
        "cloud_workspace_workspace_stops_total"
      ),

      queryPrometheus(
        "cloud_workspace_workspace_creations_total"
      ),

      queryPrometheus(
        "cloud_workspace_workspace_deletions_total"
      ),

      // Current CPU usage
      queryPrometheus(
        "100 - (avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)"
      ),

      // Historical workspace activity
      queryPrometheusRange(
        "rate(cloud_workspace_workspace_creations_total[5m])",
        start,
        end,
        step
      ),

      queryPrometheusRange(
        "rate(cloud_workspace_workspace_starts_total[5m])",
        start,
        end,
        step
      ),

      queryPrometheusRange(
        "rate(cloud_workspace_workspace_stops_total[5m])",
        start,
        end,
        step
      ),

      queryPrometheusRange(
        "rate(cloud_workspace_workspace_deletions_total[5m])",
        start,
        end,
        step
      ),

      // Historical CPU usage
      queryPrometheusRange(
        '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
        start,
        end,
        step
      ),
    ]);

    return res.json({
      // Current values
      httpRequestRateHistory:
        extractTimeSeries(httpRequestRate),

      httpRequestDuration:
        extractValue(httpRequestDuration),

      workspaceStarts:
        extractValue(workspaceStarts),

      workspaceStops:
        extractValue(workspaceStops),

      workspaceCreations:
        extractValue(workspaceCreations),

      workspaceDeletions:
        extractValue(workspaceDeletions),

      cpuUsage:
        extractValue(cpuUsage),

      // Historical values
      workspaceCreationsHistory:
        extractTimeSeries(
          workspaceCreationsHistory
        ),

      workspaceStartsHistory:
        extractTimeSeries(
          workspaceStartsHistory
        ),

      workspaceStopsHistory:
        extractTimeSeries(
          workspaceStopsHistory
        ),

      workspaceDeletionsHistory:
        extractTimeSeries(
          workspaceDeletionsHistory
        ),

      cpuUsageHistory:
        extractTimeSeries(
          cpuUsageHistory
        ),
    });
  } catch (error) {
    console.error(
      "Failed to retrieve admin metrics:",
      error
    );

    return res.status(500).json({
      message: "Failed to retrieve admin metrics",
    });
  }
};