import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setTokens } = useAuth();

  const handleSumbit = async () => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        deviceInfo: "mock-iphone17"
      }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      await setTokens(data.accessToken, data.refreshToken);
      router.replace("/pages/dashboard");
    }
    console.log("Response from backend", data);
  };

  return (
    <View style={styles.form}>
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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.flexRow}>
        <View style={styles.rememberRow}>
          <Text style={styles.checkbox}>☐</Text>
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        <Pressable>
          <Text style={styles.span}>Forgot password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.submitButton} onPress={handleSumbit}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>

      <Text style={styles.p}>
        Don't have an account?
        <Pressable onPress={() => router.push("/pages/createAccountPage")}>
          <Text style={styles.span}>Sign Up</Text>
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
}

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

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  checkbox: {
    fontSize: 16,
  },

  rememberText: {
    fontSize: 14,
    color: "black",
    fontWeight: "400",
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
