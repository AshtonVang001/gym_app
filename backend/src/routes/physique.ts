import { Hono } from "hono";
import { jwt } from "hono/jwt";
import OpenAI from "openai";
import { analyzePhysique } from "../services/physiqueAnalyzer.js";
import logger from "../utils/logger.js";

//HTTP layer: auth, input checks, calls the service

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const physiqueRouter = new Hono();

physiqueRouter.post(
  "/scan",
  jwt({ secret: process.env.ACCESS_SECRET!, alg: "HS256" }),
  async (c) => {
    const payload = c.get("jwtPayload") as { sub?: string };

    try {
      const body = await c.req.parseBody();
      const image = body["image"];

      if (!image || !(image instanceof File)) {
        return c.json({ success: false, message: "No image supplied." }, 400);
      }

      if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
        return c.json(
          {
            success: false,
            message: "Invalid image type. Supported formats: JPEG, PNG, WebP.",
          },
          400,
        );
      }

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const scan = await analyzePhysique(buffer, image.type);

      logger.info({ user: payload.sub }, "physique scan completed");

      return c.json({ success: true, data: scan }, 200);
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        logger.error(
          { err: error, status: error.status, user: payload?.sub },
          "OpenAI API error during physique scan",
        );
        return c.json(
          { success: false, message: "AI analysis service unavailable." },
          502,
        );
      }

      logger.error({ err: error, user: payload?.sub }, "physique scan error");
      return c.json({ success: false, message: "Analysis failed." }, 500);
    }
  },
);
