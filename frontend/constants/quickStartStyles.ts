import { StyleSheet } from "react-native";
import { Colors, Shadows } from "./theme";

export const quickStartStyles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionTitle: { color: Colors.dark, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    ...Shadows.card,
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
