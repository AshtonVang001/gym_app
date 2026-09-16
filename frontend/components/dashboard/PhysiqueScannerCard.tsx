import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { physiqueScannerCardStyles as styles } from "@/constants/physiqueScannerCardStyles";

export default function PhysiqueScannerCard() {
  return (
    <Pressable
      onPress={() => router.push("/scanner")}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="body-outline" size={32} color={Colors.primary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Physique Scanner</Text>
        <Text style={styles.subtitle}>AI-powered body analysis</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
    </Pressable>
  );
}
