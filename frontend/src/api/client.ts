const API_URL = import.meta.env.VITE_API_URL;

function buildHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...buildHeaders(token),
        ...(options.headers ?? {}),
      },
    }
  );

  if (!response.ok) {
    let message = "Request failed";

    try {
      const error = await response.json();

      message =
        error.message ??
        error.error ??
        message;
    } catch {
      // Ignore invalid JSON responses
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function get<T>(
  endpoint: string,
  token?: string
) {
  return request<T>(
    endpoint,
    {
      method: "GET",
    },
    token
  );
}

export function post<T>(
  endpoint: string,
  body: unknown,
  token?: string
) {
  return request<T>(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    token
  );
}

export function patch<T>(
  endpoint: string,
  body: unknown,
  token?: string
) {
  return request<T>(
    endpoint,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
    token
  );
}

export function del(
  endpoint: string,
  token?: string
) {
  return request<void>(
    endpoint,
    {
      method: "DELETE",
    },
    token
  );
}