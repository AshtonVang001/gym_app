import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

type Props = {
  title: string;
  actionLabel: string;
  onAction?: () => void;
  children: React.ReactNode;
};

export default function DashboardSection({ title, actionLabel, onAction, children }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
