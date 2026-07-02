export type HealthResponse = {
  status: string;
  message: string;
  version: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/api/health`);

  if (!res.ok) {
    throw new Error("Failed to fetch health");
  }

  return res.json();
}