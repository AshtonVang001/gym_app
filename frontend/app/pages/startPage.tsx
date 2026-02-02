import { ScrollView } from "react-native";
import CreateAccountBox from "../components/createAccount";


const StartPage = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <CreateAccountBox />
        </ScrollView>
    )
}

export default StartPage;