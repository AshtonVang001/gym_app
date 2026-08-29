export type uploadedImage = {
  success: boolean;
  message: string;
  image: {
    name: string;
    size: number;
    type: string;
  };
};

export type MuscleGroup = {
  muscle: string;
  visibility: "clear" | "partial" | "not_visible";
  development: "strong" | "average" | "needs_focus";
  assessment: string;
};

export type Recommendation = {
  muscleGroup: string;
  recommendation: string;
  exercises: string[];
};

export type PhysiqueScan = {
  overallAssessment: string;
  strongestAreas: string[];
  priorityAreas: string[];
  muscleGroups: MuscleGroup[];
  recommendations: Recommendation[];
};
