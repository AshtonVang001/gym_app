import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

import {
  saveTokens,
  getTokens,
  clearTokens,
  saveUser,
  getUser,
  clearUser,
} from "@/storage/authStorage";
import {
  createAccountRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
} from "@/services/authApi";
import { configureApiClient } from "@/services/apiClient";
import * as Device from "expo-device";

export const deviceInfo = {
  brand: Device.brand,
  modelName: Device.modelName,
  osName: Device.osName,
  osVersion: Device.osVersion,
};

type User = {
  id: number;
  username: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  createAccount: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  refreshTokens: (refreshToken: string) => Promise<string>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() / 1000 > payload.exp;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessTokenRef = useRef<string | null>(null);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    configureApiClient({
      getToken: () => accessTokenRef.current,
      onRefresh: async () => {
        const { refreshToken: storedRefresh } = await getTokens();
        if (!storedRefresh) throw new Error("No refresh token available");
        const data = await refreshTokenRequest(storedRefresh, deviceInfo);
        if (!data.success) throw new Error(data.message || "Token refresh failed");
        await saveTokens(data.accessToken, data.refreshToken);
        accessTokenRef.current = data.accessToken;
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        return data.accessToken;
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const loadStoredTokens = async () => {
      try {
        const tokens = await getTokens();
        const storedUser = await getUser();

        if (!tokens.refreshToken || !storedUser) {
          return;
        }

        if (!tokens.accessToken || isTokenExpired(tokens.accessToken)) {
          const data = await refreshTokenRequest(
            tokens.refreshToken,
            deviceInfo,
          );

          if (data.success) {
            await saveTokens(data.accessToken, data.refreshToken);
            const refreshedUser = { ...storedUser, ...data.user };
            await saveUser(refreshedUser);
            setUser(refreshedUser);
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
          } else {
            await clearTokens();
            await clearUser();
          }
        } else {
          setUser(storedUser);
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
        }
      } catch (error) {
        console.log("Failed to restore session", error);
        await clearTokens();
        await clearUser();
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredTokens();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password, deviceInfo);

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    await saveTokens(data.accessToken, data.refreshToken);
    await saveUser(data.user);

    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const createAccount = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const data = await createAccountRequest(
      username,
      email,
      password,
      deviceInfo,
    );

    if (!data.success) {
      throw new Error(data.message || "Account creation failed");
    }

    await saveTokens(data.accessToken, data.refreshToken);
    await saveUser(data.user);

    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const refreshTokens = async (refreshToken: string): Promise<string> => {
    const data = await refreshTokenRequest(refreshToken, deviceInfo);

    if (!data.success) {
      throw new Error(data.message || "Failed to refresh tokens");
    }

    await saveTokens(data.accessToken, data.refreshToken);

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    return data.accessToken;
  };

  const logout = async () => {
    try {
      const tokens = await getTokens();

      if (tokens.refreshToken) {
        await logoutRequest(tokens.refreshToken);
      }
    } catch (error) {
      console.log("Logout request failed, clearing local tokens anyway", error);
    } finally {
      await clearTokens();
      await clearUser();

      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        createAccount,
        login,
        logout,
        setUser,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
};
