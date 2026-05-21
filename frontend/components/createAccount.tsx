import { Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";


const CreateAccountBox = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSumbit = async () => {
        const res = await fetch("http://localhost:3000/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })

        const data = await res.json();
        if(data.success){
            router.push("/pages/dashboard")
        }
        console.log("Response from backend", data);

    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
            }}
        >
            <View
                style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 300,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                    Create Account
                </Text>

                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 5,
                        height: 50,
                        paddingHorizontal: 15,
                        marginBottom: 15,
                        fontSize: 16,
                    }}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 5,
                        height: 50,
                        paddingHorizontal: 15,
                        marginBottom: 15,
                        fontSize: 16,
                    }}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 5,
                        height: 50,
                        paddingHorizontal: 15,
                        marginBottom: 15,
                        fontSize: 16,
                    }}
                />

                <Pressable
                    onPress={() => {
                        console.log("Creating account with:", { username, email, password });
                        handleSumbit();
                    }}
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? "#0056b3" : "#007bff",
                        borderRadius: 5,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                    })}
                >
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                        Enter
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default CreateAccountBox;
