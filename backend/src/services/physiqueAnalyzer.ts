import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { PhysiqueScanSchema, type PhysiqueScan } from "../schemas/physiqueScan.js";

//all OpenAI logic lives here, nothing else touches it - only file that know OpenAI
const client = new OpenAI();

const SYSTEM_PROMPT = `You are a physique analysis assistant that evaluates visible muscular development in fitness photos.

STRICT RULES:
1. Only assess muscle groups that are actually visible in the photo.
2. If a muscle group cannot be seen, set visibility to "not_visible", development to "average" (placeholder only — it carries no meaning), and assessment to "Not visible in this photo."
3. Never diagnose or reference medical conditions.
4. Never state or estimate body fat percentage, exact measurements, or any metric that cannot be reliably determined from a photo alone.
5. Assess only visible muscular development, symmetry, and proportions.
6. Be objective, specific, and constructive. Avoid vague language.

MUSCLE GROUPS TO ASSESS (always include all 10 entries):
chest, shoulders, biceps, triceps, lats, traps, abs, quadriceps, hamstrings, calves

VISIBILITY DEFINITIONS:
- "clear": The muscle is fully exposed and can be assessed with confidence.
- "partial": The muscle is partially visible or the angle limits a complete assessment.
- "not_visible": The muscle cannot be seen (e.g., covered by clothing, or on the opposite side of the body from the camera).

DEVELOPMENT DEFINITIONS (apply only when visibility is "clear" or "partial"):
- "strong": Well-developed, clearly above average relative to the rest of the visible physique.
- "average": Adequately developed for a fitness-conscious individual.
- "needs_focus": Noticeably underdeveloped relative to other visible muscle groups.

OUTPUT RULES:
- overallAssessment: 2-3 sentences summarizing only what is visible. Do not speculate about muscles that are not shown.
- strongestAreas: list only the muscle names (e.g., "shoulders") rated "strong".
- priorityAreas: list only the muscle names rated "needs_focus".
- muscleGroups: include all 10 muscles with appropriate visibility and development values.
- recommendations: provide recommendations only for muscles rated "needs_focus" or "average". Include 2-4 specific exercises per recommendation.`;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function analyzePhysique(
  imageBuffer: Buffer,
  mimeType: string,
): Promise<PhysiqueScan> {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error(`Unsupported image type: ${mimeType}`);
  }

  const base64 = imageBuffer.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  const response = await client.responses.parse({
    model: "gpt-4o",
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Analyze the physique visible in this image.",
          },
          {
            type: "input_image",
            image_url: dataUrl,
            detail: "high",
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(PhysiqueScanSchema, "physique_scan"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("OpenAI returned no structured output");
  }

  return response.output_parsed;
}
