const API_URL = "http://localhost:3000";

export async function loginRequest(
  email: string,
  password: string,
  deviceInfo: string,
) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      deviceInfo,
    }),
  });

  return res.json();
}

export async function logoutRequest(refreshToken: string) {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  return res.json();
}
