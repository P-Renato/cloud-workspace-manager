const PROMETHEUS_URL = process.env.PROMETHEUS_URL ?? "http://prometheus:9090";

interface PrometheusResponse {
  status: string;
  data: {
    resultType: string;
    result: unknown[];
  };
}

export async function queryPrometheus(
  query: string
): Promise<unknown[]> {

  const url = `${PROMETHEUS_URL}/api/v1/query` + `?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Prometheus request failed: ${response.status}`
    );
  }

  const data = await response.json() as PrometheusResponse;

  if (data.status !== "success") {
    throw new Error(
      "Prometheus query failed"
    );
  }

  return data.data.result;
}