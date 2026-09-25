import { StyleSheet } from "react-native";
import { Colors, Shadows } from "./theme";

export const scanResultsStyles = StyleSheet.create({
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
    ...Shadows.card,
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
