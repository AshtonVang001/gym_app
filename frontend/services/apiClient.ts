const API_URL = process.env.EXPO_PUBLIC_API_URL;

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
};

async function request<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T = unknown>(path: string, token?: string) =>
    request<T>(path, { method: "GET", token }),
  post: <T = unknown>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "POST", body, token }),
};
