const API_URL = process.env.EXPO_PUBLIC_API_URL;

let _getToken: (() => string | null) | null = null;
let _onRefresh: (() => Promise<string>) | null = null;
let _pendingRefresh: Promise<string> | null = null;

export function configureApiClient(opts: {
  getToken: () => string | null;
  onRefresh: () => Promise<string>;
}) {
  _getToken = opts.getToken;
  _onRefresh = opts.onRefresh;
}

async function withRefresh(
  sentToken: string | null,
  retry: (token: string) => Promise<Response>,
): Promise<Response> {
  // Only refresh if we actually sent a token — a 401 on an unauthenticated
  // request (e.g. wrong password on login) should not trigger a refresh.
  if (!sentToken || !_onRefresh) throw new Error("Unauthorized");

  if (!_pendingRefresh) {
    _pendingRefresh = _onRefresh().finally(() => {
      _pendingRefresh = null;
    });
  }

  return retry(await _pendingRefresh);
}

async function request<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const { method = "GET", body } = options;
  const token = _getToken?.() ?? null;

  const makeRequest = (t: string | null) =>
    fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let res = await makeRequest(token);
  if (res.status === 401) res = await withRefresh(token, makeRequest);
  return res.json() as Promise<T>;
}

async function upload<T = unknown>(
  path: string,
  formData: FormData,
): Promise<{ status: number } & T> {
  const token = _getToken?.() ?? null;

  const makeRequest = (t: string | null) =>
    fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: t ? { Authorization: `Bearer ${t}` } : {},
      body: formData,
    });

  let res = await makeRequest(token);
  if (res.status === 401) res = await withRefresh(token, makeRequest);
  const data = await res.json().catch(() => ({}) as T);
  return { status: res.status, ...data };
}

export const apiClient = {
  get: <T = unknown>(path: string) => request<T>(path, { method: "GET" }),
  post: <T = unknown>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body }),
  upload: <T = unknown>(path: string, formData: FormData) =>
    upload<T>(path, formData),
};
