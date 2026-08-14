import { apiClient } from "./apiClient";

interface RefreshResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface AccountResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  image?: {
    name: string;
    size: number;
    type: string;
  };
}

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
): Promise<AccountResponse> =>
  apiClient.post("/auth/register", { username, email, password, deviceInfo });

export const loginRequest = (
  email: string,
  password: string,
  deviceInfo: DeviceInfo,
): Promise<AccountResponse> =>
  apiClient.post("/auth/login", { email, password, deviceInfo });

export const logoutRequest = (refreshToken: string) =>
  apiClient.post("/auth/logout", { refreshToken });

export const refreshTokenRequest = (
  refreshToken: string,
  deviceInfo: DeviceInfo,
): Promise<RefreshResponse> =>
  apiClient.post("/auth/refresh", { refreshToken, deviceInfo });

export const uploadImage = (uri: string): Promise<{ status: number } & UploadResponse> => {
  const formData = new FormData();
  formData.append("image", {
    uri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as unknown as Blob);

  return apiClient.upload("/upload", formData);
};
