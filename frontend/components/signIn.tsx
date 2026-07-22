import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { formStyles } from "@/constants/formStyles";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={formStyles.form}>
      <View style={formStyles.flexColumn}>
        <Text style={formStyles.label}>Email</Text>
      </View>

      <View style={formStyles.inputForm}>
        <TextInput
          style={formStyles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={formStyles.flexColumn}>
        <Text style={formStyles.label}>Password</Text>
      </View>

      <View style={formStyles.inputForm}>
        <TextInput
          style={formStyles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={formStyles.flexRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 16 }}>☐</Text>
          <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>Remember me</Text>
        </View>
        <Pressable>
          <Text style={formStyles.span}>Forgot password?</Text>
        </Pressable>
      </View>

      {error && <Text style={formStyles.errorText}>{error}</Text>}

      <Pressable
        style={[formStyles.submitButton, isLoading && formStyles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={formStyles.submitText}>{isLoading ? "Signing in..." : "Sign In"}</Text>
      </Pressable>

      <Text style={formStyles.p}>
        Don't have an account?{" "}
        <Text style={formStyles.span} onPress={() => router.push("/create-account")}>
          Sign Up
        </Text>
      </Text>

      <Text style={formStyles.p}>Or With</Text>

      <View style={formStyles.flexRow}>
        <Pressable style={formStyles.btn}>
          <Text style={formStyles.btnText}>Google</Text>
        </Pressable>
        <Pressable style={formStyles.btn}>
          <Text style={formStyles.btnText}>Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}
