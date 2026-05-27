import { ScrollView } from "react-native";
import LoginForm from "@/components/signIn";


const StartPage = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LoginForm />
        </ScrollView>
    )
}

export default StartPage;