import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { weeklyProgressStyles as styles } from "@/constants/weeklyProgressStyles";

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

