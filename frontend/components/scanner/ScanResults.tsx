import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import type { PhysiqueScan, MuscleGroup, Recommendation } from "@/types/types";

type Props = {
  result: PhysiqueScan;
  onNewScan: () => void;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const devConfig = {
  strong:      { label: "Strong",      color: Colors.green,  bg: "rgba(76,175,80,0.12)"   },
  average:     { label: "Average",     color: Colors.muted,  bg: "rgba(0,0,0,0.06)"       },
  needs_focus: { label: "Needs Focus", color: Colors.orange, bg: "rgba(255,107,53,0.12)"  },
} as const;

const visConfig = {
  clear:       { label: "Visible", color: Colors.primary, bg: "rgba(45,121,243,0.1)"  },
  partial:     { label: "Partial", color: "#d97706",      bg: "rgba(217,119,6,0.1)"   },
  not_visible: { label: "—",       color: Colors.muted,   bg: "rgba(0,0,0,0.05)"      },
} as const;

const cardShadow = {
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
} as const;

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

function MuscleCard({ mg }: { mg: MuscleGroup }) {
  const vis = visConfig[mg.visibility];
  const dev = devConfig[mg.development];
  const isNotVisible = mg.visibility === "not_visible";

  return (
    <View style={[styles.card, isNotVisible && styles.muscleCardDim]}>
      <View style={styles.muscleRow}>
        <Text style={[styles.muscleName, isNotVisible && styles.textMuted]}>
          {capitalize(mg.muscle)}
        </Text>
        <View style={styles.badgeRow}>
          {isNotVisible ? (
            <Badge label="Not Visible" color={vis.color} bg={vis.bg} />
          ) : (
            <>
              <Badge label={vis.label} color={vis.color} bg={vis.bg} />
              <Badge label={dev.label} color={dev.color} bg={dev.bg} />
            </>
          )}
        </View>
      </View>
      {!isNotVisible && (
        <Text style={styles.muscleAssessment}>{mg.assessment}</Text>
      )}
    </View>
  );
}

function RecCard({ rec }: { rec: Recommendation }) {
  return (
    <View style={[styles.card, styles.recCard]}>
      <Text style={styles.recMuscle}>{capitalize(rec.muscleGroup)}</Text>
      <Text style={styles.recText}>{rec.recommendation}</Text>
      <View style={styles.exerciseList}>
        {rec.exercises.map((ex) => (
          <Text key={ex} style={styles.exercise}>{"• "}{ex}</Text>
        ))}
      </View>
    </View>
  );
}

export default function ScanResults({ result, onNewScan }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNewScan} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Physique Analysis</Text>
        <TouchableOpacity onPress={onNewScan} style={styles.newScanBtn}>
          <Text style={styles.newScanBtnText}>New Scan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Assessment */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Overall Assessment</Text>
          <Text style={styles.assessmentText}>{result.overallAssessment}</Text>
        </View>

        {/* Strongest / Priority */}
        <View style={styles.splitRow}>
          <View style={[styles.card, styles.splitCard]}>
            <Text style={styles.cardLabel}>Strongest</Text>
            {result.strongestAreas.length > 0 ? (
              result.strongestAreas.map((area) => (
                <View key={area} style={[styles.areaTag, { backgroundColor: "rgba(76,175,80,0.12)" }]}>
                  <Text style={[styles.areaTagText, { color: Colors.green }]}>{capitalize(area)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>None yet</Text>
            )}
          </View>
          <View style={[styles.card, styles.splitCard]}>
            <Text style={styles.cardLabel}>Priority Areas</Text>
            {result.priorityAreas.length > 0 ? (
              result.priorityAreas.map((area) => (
                <View key={area} style={[styles.areaTag, { backgroundColor: "rgba(255,107,53,0.12)" }]}>
                  <Text style={[styles.areaTagText, { color: Colors.orange }]}>{capitalize(area)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>None</Text>
            )}
          </View>
        </View>

        {/* Muscle Groups */}
        <Text style={styles.sectionHeading}>Muscle Groups</Text>
        {result.muscleGroups.map((mg) => (
          <MuscleCard key={mg.muscle} mg={mg} />
        ))}

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Recommendations</Text>
            {result.recommendations.map((rec) => (
              <RecCard key={rec.muscleGroup} rec={rec} />
            ))}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.dark,
    fontSize: 17,
    fontWeight: "700",
  },
  newScanBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  newScanBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  scroll: { flex: 1 },
  content: {
    padding: 16,
    gap: 10,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    gap: 8,
    ...cardShadow,
  },
  cardLabel: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  assessmentText: {
    color: Colors.dark,
    fontSize: 15,
    lineHeight: 23,
  },
  splitRow: {
    flexDirection: "row",
    gap: 10,
  },
  splitCard: { flex: 1 },
  areaTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 2,
  },
  areaTagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  emptyText: {
    color: Colors.mutedLight,
    fontSize: 13,
  },
  sectionHeading: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 2,
  },
  muscleCardDim: { opacity: 0.45 },
  muscleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
  },
  muscleName: {
    color: Colors.dark,
    fontSize: 15,
    fontWeight: "600",
  },
  textMuted: { color: Colors.mutedLight },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  muscleAssessment: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  recCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.orange,
  },
  recMuscle: {
    color: Colors.orange,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  recText: {
    color: Colors.dark,
    fontSize: 14,
    lineHeight: 21,
  },
  exerciseList: {
    gap: 3,
    marginTop: 4,
  },
  exercise: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
});
