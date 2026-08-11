const API_URL = import.meta.env.VITE_API_URL;

export interface AdminMetrics {
  workspaceStarts: number;
  workspaceStops: number;
  workspaceCreations: number;
  workspaceDeletions: number;
  workspaceStartupCount: number;
}

function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getAdminMetrics(
  token: string
): Promise<AdminMetrics> {
  const response = await fetch(
    `${API_URL}/admin/metrics`,
    {
      headers: getHeaders(token),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load admin metrics"
    );
  }

  return response.json();
}