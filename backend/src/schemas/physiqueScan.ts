import { z } from "zod";

//defines the shape of the AI response 
const MuscleGroupSchema = z.object({
  muscle: z.string(),
  visibility: z.enum(["clear", "partial", "not_visible"]),
  development: z.enum(["strong", "average", "needs_focus"]),
  assessment: z.string(),
});

const RecommendationSchema = z.object({
  muscleGroup: z.string(),
  recommendation: z.string(),
  exercises: z.array(z.string()),
});

export const PhysiqueScanSchema = z.object({
  overallAssessment: z.string(),
  strongestAreas: z.array(z.string()),
  priorityAreas: z.array(z.string()),
  muscleGroups: z.array(MuscleGroupSchema),
  recommendations: z.array(RecommendationSchema),
});

export type PhysiqueScan = z.infer<typeof PhysiqueScanSchema>;
