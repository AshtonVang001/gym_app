import { StyleSheet } from "react-native";
import { Colors, Shadows } from "./theme";

export const weeklyProgressStyles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { color: Colors.dark, fontSize: 18, fontWeight: "700" },
  subtitle: { color: Colors.muted, fontSize: 13 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    ...Shadows.card,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dayCol: { alignItems: "center", gap: 5 },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleText: { color: Colors.mutedLight, fontSize: 12, fontWeight: "600" },
  dayLabel: { color: Colors.mutedLight, fontSize: 11 },
  progressBarTrack: {
    height: 6,
    backgroundColor: Colors.gray,
    borderRadius: 3,
    marginBottom: 18,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  weekStats: { flexDirection: "row", justifyContent: "space-around" },
  weekStat: { alignItems: "center", gap: 4 },
  weekStatValue: { color: Colors.dark, fontSize: 15, fontWeight: "700" },
  weekStatLabel: { color: Colors.muted, fontSize: 11 },
  weekStatDivider: { width: 1, backgroundColor: "#eee", alignSelf: "stretch" },
});
