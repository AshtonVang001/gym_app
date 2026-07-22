import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export default function QuickStart() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Start</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.workoutName}>No workout planned</Text>
          <Text style={styles.workoutMeta}>— exercises · — min</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.actions}>
          <Pressable style={styles.startButton}>
            <Ionicons name="play" size={16} color={Colors.white} />
            <Text style={styles.startButtonText}>Start Workout</Text>
          </Pressable>
          <Pressable style={styles.newWorkoutButton}>
            <Text style={styles.newWorkoutText}>New Workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionTitle: { color: Colors.dark, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  workoutName: { color: Colors.dark, fontSize: 18, fontWeight: "700" },
  workoutMeta: { color: Colors.muted, fontSize: 13, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.gray, marginVertical: 14 },
  actions: { flexDirection: "row", gap: 10 },
  startButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
  },
  startButtonText: { color: Colors.white, fontWeight: "700", fontSize: 15 },
  newWorkoutButton: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.borderAlt,
    justifyContent: "center",
  },
  newWorkoutText: { color: Colors.mutedMedium, fontWeight: "600", fontSize: 14 },
});
