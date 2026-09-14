import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { scanResultsStyles as styles } from "@/constants/scanResultsStyles";
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
