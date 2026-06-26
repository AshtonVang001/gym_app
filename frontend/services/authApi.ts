const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API_URL: ", API_URL);

export async function createAccountRequest(
  username: string,
  email: string,
  password: string,
  deviceInfo: {
    brand: string | null;
    modelName: string | null;
    osName: string | null;
    osVersion: string | null;
  },
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      deviceInfo: deviceInfo,
    }),
  });

  return res.json();
}

export async function loginRequest(
  email: string,
  password: string,
  deviceInfo: {
    brand: string | null;
    modelName: string | null;
    osName: string | null;
    osVersion: string | null;
  },
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
