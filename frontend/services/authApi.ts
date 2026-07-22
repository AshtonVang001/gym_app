import { apiClient } from "./apiClient";

type DeviceInfo = {
  brand: string | null;
  modelName: string | null;
  osName: string | null;
  osVersion: string | null;
};

export const createAccountRequest = (
  username: string,
  email: string,
  password: string,
  deviceInfo: DeviceInfo,
) => apiClient.post("/auth/register", { username, email, password, deviceInfo });

export const loginRequest = (
  email: string,
  password: string,
  deviceInfo: DeviceInfo,
) => apiClient.post("/auth/login", { email, password, deviceInfo });

export const logoutRequest = (refreshToken: string) =>
  apiClient.post("/auth/logout", { refreshToken });

export const refreshTokenRequest = (refreshToken: string, deviceInfo: DeviceInfo) =>
  apiClient.post("/auth/refresh", { refreshToken, deviceInfo });
