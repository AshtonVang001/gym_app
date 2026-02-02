import { Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";


const CreateAccountBox = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            </View>
        </View>
    );
}

export default CreateAccountBox;
