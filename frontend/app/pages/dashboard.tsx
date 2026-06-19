import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const username = user?.username ?? "";

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={22} color="#151717" />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name}>{username}</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="#151717" />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color="#2d79f3" />
            </View>
          </View>
        </View>

        {/* Quick Start Workout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.card}>
            <View style={styles.quickStartTop}>
              <Text style={styles.workoutName}>No workout planned</Text>
              <Text style={styles.workoutMeta}>— exercises · — min</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.quickStartActions}>
              <Pressable style={styles.startButton}>
                <Ionicons name="play" size={16} color="#fff" />
                <Text style={styles.startButtonText}>Start Workout</Text>
              </Pressable>
              <Pressable style={styles.newWorkoutButton}>
                <Text style={styles.newWorkoutText}>New Workout</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Physique Scanner */}
        <Pressable style={({ pressed }) => [styles.physiqueCard, pressed && styles.physiqueCardPressed]}>
          <View style={styles.physiqueIconWrap}>
            <Ionicons name="body-outline" size={32} color="#2d79f3" />
          </View>
          <View style={styles.physiqueTextWrap}>
            <Text style={styles.physiqueTitle}>Physique Scanner</Text>
            <Text style={styles.physiqueSubtitle}>AI-powered body analysis</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#2d79f3" />
        </Pressable>

        {/* Weekly Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Progress</Text>
            <Text style={styles.sectionSubtitle}>0 / 0 goal</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.weekRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
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
                <Ionicons name="flame" size={16} color="#ff6b35" />
                <Text style={styles.weekStatValue}>0</Text>
                <Text style={styles.weekStatLabel}>Day Streak</Text>
              </View>
              <View style={styles.weekStatDivider} />
              <View style={styles.weekStat}>
                <Ionicons name="barbell" size={16} color="#2d79f3" />
                <Text style={styles.weekStatValue}>0</Text>
                <Text style={styles.weekStatLabel}>This Week</Text>
              </View>
              <View style={styles.weekStatDivider} />
              <View style={styles.weekStat}>
                <Ionicons name="trending-up" size={16} color="#4caf50" />
                <Text style={styles.weekStatValue}>0</Text>
                <Text style={styles.weekStatLabel}>Volume</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No personal records yet.</Text>
          </View>
        </View>

        {/* Weight Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weight Progress</Text>
            <Pressable>
              <Text style={styles.seeAll}>Log weight</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No weight entries yet.</Text>
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <Pressable>
              <Text style={styles.seeAll}>Friends</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No leaderboard data yet.</Text>
          </View>
        </View>

        {/* Friend Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friend Activity</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No recent activity.</Text>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Goals</Text>
            <Pressable>
              <Text style={styles.seeAll}>Edit goals</Text>
            </Pressable>
          </View>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No goals set yet.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5f5f5" },
  logoutButton: { padding: 4 },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 48 },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  greeting: { color: "#888", fontSize: 14 },
  name: { color: "#151717", fontSize: 26, fontWeight: "700" },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8edf5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dde3ed",
  },

  // Section layout
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { color: "#151717", fontSize: 18, fontWeight: "700" },
  sectionSubtitle: { color: "#888", fontSize: 13 },
  seeAll: { color: "#2d79f3", fontSize: 13, fontWeight: "600" },

  // Card base
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 14 },
  placeholder: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },

  // Quick Start
  quickStartTop: { marginBottom: 0 },
  workoutName: { color: "#151717", fontSize: 18, fontWeight: "700" },
  workoutMeta: { color: "#888", fontSize: 13, marginTop: 2 },
  quickStartActions: { flexDirection: "row", gap: 10 },
  startButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#2d79f3",
    paddingVertical: 13,
    borderRadius: 12,
  },
  startButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  newWorkoutButton: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#dde3ed",
    justifyContent: "center",
  },
  newWorkoutText: { color: "#555", fontWeight: "600", fontSize: 14 },

  // Physique Scanner
  physiqueCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#2d79f3",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  physiqueCardPressed: { opacity: 0.85 },
  physiqueIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#2d79f330",
  },
  physiqueTextWrap: { flex: 1 },
  physiqueTitle: { color: "#fff", fontSize: 17, fontWeight: "700", marginBottom: 3 },
  physiqueSubtitle: { color: "#94a3b8", fontSize: 13 },

  // Weekly Progress
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
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleText: { color: "#aaa", fontSize: 12, fontWeight: "600" },
  dayLabel: { color: "#aaa", fontSize: 11 },
  progressBarTrack: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginBottom: 18,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2d79f3",
    borderRadius: 3,
  },
  weekStats: { flexDirection: "row", justifyContent: "space-around" },
  weekStat: { alignItems: "center", gap: 4 },
  weekStatValue: { color: "#151717", fontSize: 15, fontWeight: "700" },
  weekStatLabel: { color: "#888", fontSize: 11 },
  weekStatDivider: { width: 1, backgroundColor: "#eee", alignSelf: "stretch" },
});
