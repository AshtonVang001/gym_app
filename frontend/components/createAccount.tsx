import { Text, TextInput, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { formStyles } from "@/constants/formStyles";

const CreateAccountBox = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { createAccount } = useAuth();

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await createAccount(username, email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Account creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={formStyles.form}>
      <View style={formStyles.flexColumn}>
        <Text style={formStyles.label}>Username</Text>
      </View>

      <View style={formStyles.inputForm}>
        <TextInput
          style={formStyles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

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
          keyboardType="email-address"
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error && <Text style={formStyles.errorText}>{error}</Text>}

      <Pressable
        style={[formStyles.submitButton, isLoading && formStyles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={formStyles.submitText}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Text>
      </Pressable>

      <Text style={formStyles.p}>
        Already have an account?{" "}
        <Pressable onPress={() => router.push("/")}>
          <Text style={formStyles.span}>Sign In</Text>
        </Pressable>
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
};

export default CreateAccountBox;
