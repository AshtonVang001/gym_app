import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";

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

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.navy,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardPressed: { opacity: 0.85 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.navyLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  textWrap: { flex: 1 },
  title: { color: Colors.white, fontSize: 17, fontWeight: "700", marginBottom: 3 },
  subtitle: { color: Colors.slate, fontSize: 13 },
});
