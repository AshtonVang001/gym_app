import { Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";


const CreateAccountBox = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput
                placeholder="enter texts"
                style={{ borderWidth: 1, height: 40, width: 200, margin:100}}
            />
        </View>
    );
}

export default CreateAccountBox;
