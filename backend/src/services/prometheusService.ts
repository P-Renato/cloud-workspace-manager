const PROMETHEUS_URL = process.env.PROMETHEUS_URL || "http://prometheus:9090";

interface PrometheusResponse<T> {
  status: string;
  data: T;
}

interface PrometheusQueryData {
  resultType: string;
  result: unknown[];
}

export async function queryPrometheus(
  query: string
): Promise<unknown[]> {
  const url =
    `${PROMETHEUS_URL}/api/v1/query?query=` +
    encodeURIComponent(query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Prometheus request failed: ${response.status}`
    );
  }

  const result = await response.json() as PrometheusResponse<PrometheusQueryData>;

  if (result.status !== "success") {
    throw new Error(
      "Prometheus query was not successful"
    );
  }

  return result.data.result;
}

export async function queryPrometheusRange(
  query: string,
  start: number,
  end: number,
  step: number
): Promise<unknown[]> {
  const params = new URLSearchParams({
    query,
    start: String(start),
    end: String(end),
    step: String(step),
  });

  const url = `${PROMETHEUS_URL}/api/v1/query_range?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Prometheus range request failed: ${response.status} ${errorBody}`
    );
  }

  const result = (await response.json()) as PrometheusResponse<PrometheusQueryData>;

  if (result.status !== "success") {
    throw new Error(
      "Prometheus range query was not successful"
    );
  }

  return result.data.result;
}