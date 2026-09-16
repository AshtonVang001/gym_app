import { StyleSheet } from "react-native";
import { Colors } from "./theme";

export const physiqueScannerCardStyles = StyleSheet.create({
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
