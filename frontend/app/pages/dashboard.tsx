import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const todaysWorkout = {
  name: "Push Day",
  exercises: [
    { name: "Bench Press", sets: 4, reps: 8, weight: "185 lbs" },
    { name: "Overhead Press", sets: 3, reps: 10, weight: "105 lbs" },
    { name: "Incline DB Press", sets: 3, reps: 12, weight: "60 lbs" },
    { name: "Tricep Pushdown", sets: 3, reps: 15, weight: "50 lbs" },
  ],
};

const weeklyStats = {
  streak: 4,
  workoutsThisWeek: 3,
  volumeThisWeek: "12,400 lbs",
  daysActive: [true, true, false, true, true, false, false],
};

const personalRecords = [
  { lift: "Bench Press", weight: "225 lbs", date: "May 18" },
  { lift: "Squat", weight: "315 lbs", date: "May 12" },
  { lift: "Deadlift", weight: "365 lbs", date: "Apr 30" },
  { lift: "Overhead Press", weight: "145 lbs", date: "May 20" },
];

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function Dashboard() {
  return (
    <View style={styles.screen}>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Ashton</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#2d79f3" />
        </View>
      </View>

      {/* Weekly day dots */}
      <View style={styles.weekRow}>
        {dayLabels.map((day, i) => (
          <View key={i} style={styles.dayCol}>
            <Text style={styles.dayLabel}>{day}</Text>
            <View style={[styles.dayDot, weeklyStats.daysActive[i] && styles.dayDotActive]} />
          </View>
        ))}
      </View>

      {/* Stat cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={20} color="#ff6b35" />
          <Text style={styles.statValue}>{weeklyStats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={20} color="#2d79f3" />
          <Text style={styles.statValue}>{weeklyStats.workoutsThisWeek}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trending-up" size={20} color="#4caf50" />
          <Text style={styles.statValue}>{weeklyStats.volumeThisWeek}</Text>
          <Text style={styles.statLabel}>Volume</Text>
        </View>
      </View>

      {/* Today's workout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <View style={styles.workoutCard}>
          <View style={styles.workoutCardHeader}>
            <View>
              <Text style={styles.workoutName}>{todaysWorkout.name}</Text>
              <Text style={styles.workoutMeta}>{todaysWorkout.exercises.length} exercises</Text>
            </View>
            <Pressable style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </Pressable>
          </View>
          <View style={styles.divider} />
          {todaysWorkout.exercises.map((ex, i) => (
            <View key={i} style={styles.exerciseRow}>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseDetail}>
                {ex.sets} × {ex.reps} &nbsp;·&nbsp; {ex.weight}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Personal records */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Records</Text>
        <View style={styles.prCard}>
          {personalRecords.map((pr, i) => (
            <View key={i} style={[styles.prRow, i < personalRecords.length - 1 && styles.prRowBorder]}>
              <View style={styles.prTrophy}>
                <Ionicons name="trophy" size={16} color="#f5c518" />
              </View>
              <Text style={styles.prLift}>{pr.lift}</Text>
              <View style={styles.prRight}>
                <Text style={styles.prWeight}>{pr.weight}</Text>
                <Text style={styles.prDate}>{pr.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f1010",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  greeting: {
    color: "#888",
    fontSize: 14,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1c2020",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2e2e",
  },

  // Week row
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#151717",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dayCol: {
    alignItems: "center",
    gap: 6,
  },
  dayLabel: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
  },
  dayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2a2e2e",
  },
  dayDotActive: {
    backgroundColor: "#2d79f3",
  },

  // Stat cards
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#151717",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  statLabel: {
    color: "#666",
    fontSize: 11,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  // Workout card
  workoutCard: {
    backgroundColor: "#151717",
    borderRadius: 16,
    padding: 18,
  },
  workoutCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  workoutName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  workoutMeta: {
    color: "#666",
    fontSize: 13,
    marginTop: 2,
  },
  startButton: {
    backgroundColor: "#2d79f3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#2a2e2e",
    marginBottom: 14,
  },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  exerciseName: {
    color: "#ddd",
    fontSize: 14,
    fontWeight: "500",
  },
  exerciseDetail: {
    color: "#666",
    fontSize: 13,
  },

  // PR card
  prCard: {
    backgroundColor: "#151717",
    borderRadius: 16,
    paddingHorizontal: 18,
  },
  prRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  prRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2e2e",
  },
  prTrophy: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#1e1b10",
    justifyContent: "center",
    alignItems: "center",
  },
  prLift: {
    flex: 1,
    color: "#ddd",
    fontSize: 14,
    fontWeight: "500",
  },
  prRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  prWeight: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  prDate: {
    color: "#666",
    fontSize: 12,
  },
});
