import StartPage from "./pages/startPage";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerBackVisible: false }} />
      <ScrollView>
        <StartPage />
      </ScrollView>
    </>
  );
}
