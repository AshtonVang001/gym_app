import { StyleSheet } from "react-native";
import { Colors, Shadows } from "./theme";

export const dashboardStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  logoutButton: { padding: 4 },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 48 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  greeting: { color: Colors.muted, fontSize: 14 },
  name: { color: Colors.dark, fontSize: 26, fontWeight: "700" },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.card,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.avatarBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderAlt,
  },
  placeholder: {
    color: Colors.mutedLight,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
});
