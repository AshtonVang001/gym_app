import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  username: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser } },
    children,
  );
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
