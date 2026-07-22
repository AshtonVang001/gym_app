import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeeklyProgress() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <Text style={styles.subtitle}>0 / 0 goal</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.weekRow}>
          {DAYS.map((day, i) => (
            <View key={i} style={styles.dayCol}>
              <View style={styles.dayCircle}>
                <Text style={styles.dayCircleText}>{day}</Text>
              </View>
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: "0%" }]} />
        </View>
        <View style={styles.weekStats}>
          <View style={styles.weekStat}>
            <Ionicons name="flame" size={16} color={Colors.orange} />
            <Text style={styles.weekStatValue}>0</Text>
            <Text style={styles.weekStatLabel}>Day Streak</Text>
          </View>
          <View style={styles.weekStatDivider} />
          <View style={styles.weekStat}>
            <Ionicons name="barbell" size={16} color={Colors.primary} />
            <Text style={styles.weekStatValue}>0</Text>
            <Text style={styles.weekStatLabel}>This Week</Text>
          </View>
          <View style={styles.weekStatDivider} />
          <View style={styles.weekStat}>
            <Ionicons name="trending-up" size={16} color={Colors.green} />
            <Text style={styles.weekStatValue}>0</Text>
            <Text style={styles.weekStatLabel}>Volume</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
