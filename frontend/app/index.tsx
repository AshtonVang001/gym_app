import StartPage from "./pages/startPage";
import Dashboard from "./pages/dashboard";
import { Pressable, ScrollView, Text } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <ScrollView>
      <StartPage />
      <Pressable onPress={() => {router.push("/pages/dashboard")}}>

        {/* <Text>Enter</Text> */}
      </Pressable>
    </ScrollView>
  );
}
