import { Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
      router.replace("/pages/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Account creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.flexColumn}>
        <Text style={styles.label}>Username</Text>
      </View>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.flexColumn}>
        <Text style={styles.label}>Email</Text>
      </View>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.flexColumn}>
        <Text style={styles.label}>Password</Text>
      </View>

      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.submitText}>{isLoading ? "Creating account..." : "Create Account"}</Text>
      </Pressable>

      <Text style={styles.p}>
        Already have an account?{" "}
        <Pressable onPress={() => router.push("/pages/startPage")}>
          <Text style={styles.span}>Sign In</Text>
        </Pressable>
      </Text>

      <Text style={styles.p}>Or With</Text>

      <View style={styles.flexRow}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Google</Text>
        </Pressable>

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Apple</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateAccountBox;

const styles = StyleSheet.create({
  form: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#ffffff",
    padding: 30,
    width: "100%",
    maxWidth: 450,
    borderRadius: 20,
  },

  flexColumn: {
    flexDirection: "column",
  },

  label: {
    color: "#151717",
    fontWeight: "600",
  },

  inputForm: {
    borderWidth: 1.5,
    borderColor: "#ecedec",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },

  input: {
    marginLeft: 10,
    borderRadius: 10,
    width: "85%",
    height: "100%",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },

  span: {
    fontSize: 14,
    color: "#2d79f3",
    fontWeight: "500",
  },

  submitButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#151717",
    borderRadius: 10,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  errorText: {
    color: "#e53935",
    fontSize: 13,
    textAlign: "center",
  },

  p: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
    marginVertical: 5,
  },

  btn: {
    marginTop: 10,
    width: "48%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ededef",
    backgroundColor: "white",
  },

  btnText: {
    fontWeight: "500",
  },
});
