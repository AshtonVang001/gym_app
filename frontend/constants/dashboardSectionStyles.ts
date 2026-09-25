import { StyleSheet } from "react-native";
import { Colors, Shadows } from "./theme";

export const dashboardSectionStyles = StyleSheet.create({
  section: { marginBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { color: Colors.dark, fontSize: 18, fontWeight: "700" },
  action: { color: Colors.primary, fontSize: 13, fontWeight: "600" },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    ...Shadows.card,
  },
});
