import { ScrollView } from "react-native";
import LoginForm from "@/components/signIn";

export default function SignInPage() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LoginForm />
    </ScrollView>
  );
}
