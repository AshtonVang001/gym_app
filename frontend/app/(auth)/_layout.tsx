import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Redirect href="/dashboard" />;

  return <Stack screenOptions={{ title: "Gym App", animation: "none" }} />;
}
