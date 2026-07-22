import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/theme";
import QuickStart from "@/components/dashboard/QuickStart";
import PhysiqueScannerCard from "@/components/dashboard/PhysiqueScannerCard";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import DashboardSection from "@/components/dashboard/DashboardSection";

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
              <Ionicons name="log-out-outline" size={22} color={Colors.dark} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.name}>{username}</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color={Colors.dark} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color={Colors.primary} />
            </View>
          </View>
        </View>

        <QuickStart />
        <PhysiqueScannerCard />
        <WeeklyProgress />

        <DashboardSection title="Personal Records" actionLabel="See all">
          <Text style={styles.placeholder}>No personal records yet.</Text>
        </DashboardSection>

        <DashboardSection title="Weight Progress" actionLabel="Log weight">
          <Text style={styles.placeholder}>No weight entries yet.</Text>
        </DashboardSection>

        <DashboardSection title="Leaderboard" actionLabel="Friends">
          <Text style={styles.placeholder}>No leaderboard data yet.</Text>
        </DashboardSection>

        <DashboardSection title="Friend Activity" actionLabel="See all">
          <Text style={styles.placeholder}>No recent activity.</Text>
        </DashboardSection>

        <DashboardSection title="Goals" actionLabel="Edit goals">
          <Text style={styles.placeholder}>No goals set yet.</Text>
        </DashboardSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
