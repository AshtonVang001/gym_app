import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Redirect href="/" />;

  return (
    <Stack screenOptions={{ title: "Gym App", animation: "none" }}>
      <Stack.Screen name="scanner" options={{ headerShown: false }} />
    </Stack>
  );
}
