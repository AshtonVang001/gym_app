import StartPage from "./pages/startPage";
import { Pressable, ScrollView } from "react-native";
import { Stack, router } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerBackVisible: false }} />
      <ScrollView>
        <StartPage />
        <Pressable onPress={() => {router.push("/pages/dashboard")}}>
        </Pressable>
      </ScrollView>
    </>
  );
}
