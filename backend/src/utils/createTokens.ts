import { dbConfig } from "../api/dbconnect.js";
import postgres from "postgres";
import { sign } from "hono/jwt";
import crypto from "crypto";
import "dotenv/config";

export const createTokens = async (
  user: postgres.RowList<postgres.Row[]>,
  deviceInfo: any,
) => {
  const accessPayload = {
    sub: user[0].username,
    role: user[0].role,
    exp: Math.floor(Date.now() / 1000) + 60 * 15, //15 minutes
  };

  const secret = process.env.ACCESS_SECRET!;

  const accessToken = await sign(accessPayload, secret);

  const refreshToken = crypto.randomBytes(64).toString("hex");

  const hashedRefresh = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const currentDate: Date = new Date();

  const familyID = crypto.randomUUID();

  // const refresh =
  await dbConfig`INSERT INTO refresh_tokens (user_id, expires_at, created_at, token_hash, device_info, family_id, last_used_at, revoked)
    VALUES (${user[0].id}, ${exp}, ${currentDate}, ${hashedRefresh}, ${deviceInfo}, ${familyID}, ${currentDate}, false)`;

  return {
    accessToken,
    refreshToken,
  };
};
