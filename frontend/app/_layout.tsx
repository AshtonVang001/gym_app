import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ title: "Gym App" }} />
    </AuthProvider>
  );
}
