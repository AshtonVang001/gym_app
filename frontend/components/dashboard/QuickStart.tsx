import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { quickStartStyles as styles } from "@/constants/quickStartStyles";

export default function QuickStart() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Start</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.workoutName}>No workout planned</Text>
          <Text style={styles.workoutMeta}>— exercises · — min</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.actions}>
          <Pressable style={styles.startButton}>
            <Ionicons name="play" size={16} color={Colors.white} />
            <Text style={styles.startButtonText}>Start Workout</Text>
          </Pressable>
          <Pressable style={styles.newWorkoutButton}>
            <Text style={styles.newWorkoutText}>New Workout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

