import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();
    console.log("user.username: ", user);
    const username= String(user)

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>{username}</Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person" size={22} color="#2d79f3" />
          </View>
        </View>

        {/* Stat cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={20} color="#ff6b35" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="barbell" size={20} color="#2d79f3" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={20} color="#4caf50" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
        </View>

        {/* Today's workout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <View style={styles.card}>
            <View style={styles.workoutCardHeader}>
              <View>
                <Text style={styles.workoutName}>Workout Name</Text>
                <Text style={styles.workoutMeta}>0 exercises</Text>
              </View>
              <Pressable style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
              </Pressable>
            </View>
            <View style={styles.divider} />
            <Text style={styles.placeholder}>No exercises added yet.</Text>
          </View>
        </View>

        {/* Personal records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Records</Text>
          <View style={styles.card}>
            <Text style={styles.placeholder}>No personal records yet.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

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
    color: "#151717",
    fontSize: 26,
    fontWeight: "700",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e8edf5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dde3ed",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statValue: {
    color: "#151717",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  statLabel: {
    color: "#888",
    fontSize: 11,
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#151717",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

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
  workoutCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  workoutName: {
    color: "#151717",
    fontSize: 18,
    fontWeight: "700",
  },
  workoutMeta: {
    color: "#888",
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
    backgroundColor: "#eee",
    marginBottom: 14,
  },
  placeholder: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
});
