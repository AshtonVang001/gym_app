import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { saveTokens, getTokens, clearTokens } from "@/storage/authStorage";
import { loginRequest, logoutRequest } from "@/services/authApi";

type User = {
  id: number;
  username: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredTokens = async () => {
      try {
        const tokens = await getTokens();

        if (tokens.accessToken) {
          setAccessToken(tokens.accessToken);
        }

        if (tokens.refreshToken) {
          setRefreshToken(tokens.refreshToken);
        }

        console.log("accessToken: ", tokens.accessToken);
        console.log("refreshToken: ", tokens.refreshToken)
      } catch (error) {
        console.log("Failed to load tokens", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredTokens();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password, "mock-iphone17");

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    await saveTokens(data.accessToken, data.refreshToken);

    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
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
        refreshToken,
        isLoading,
        login,
        logout,
        setUser,
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