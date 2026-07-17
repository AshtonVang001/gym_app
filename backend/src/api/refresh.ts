import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { sign } from "hono/jwt";
import crypto from "crypto";
import * as bcrypt from "bcrypt";
import "dotenv/config";

app.post("/auth/refresh", async (c) => {
  try {
    const { refreshToken, deviceInfo } = await c.req.json();

    //check if refresh token, is expired, or is revoked
    if (!refreshToken) {
      throw new Error("Token does not exist");
    }

    const hashedRefresh = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const ID =
      await dbConfig`SELECT user_id, family_id FROM refresh_tokens WHERE token_hash = ${hashedRefresh}`;

    const user =
      await dbConfig`SELECT id, username, role FROM users WHERE id = ${ID[0].user_id}`;

    //create new access token
    const accessPayload = {
      sub: user[0].username,
      role: user[0].role,
      exp: Math.floor(Date.now() / 1000) + 60 * 15, //15 minutes
    };

    const secret = process.env.ACCESS_SECRET!;

    const accessToken = await sign(accessPayload, secret);

    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    const newHashedRefresh = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); //expiration of refresh

    const currentDate: Date = new Date();

    //revoke current refresh token
    await dbConfig`UPDATE refresh_tokens
    SET revoked_at = ${currentDate}, revoked = true
    WHERE token_hash = ${refreshToken}`;

    //insert new token into db w same family id
    await dbConfig`INSERT INTO refresh_tokens (user_id, expires_at, created_at, token_hash, device_info, family_id, last_used_at, revoked)
    VALUES (${user[0].id}, ${exp}, ${currentDate}, ${newHashedRefresh}, ${deviceInfo}, ${ID[0].family_id}, ${currentDate}, false)`;

    return c.json({
      success: true,
      message: "Successfully created new refresh token!",
      user: {
        id: user[0].id,
        username: user[0].username,
      },
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return c.json({
      message: `Could not create new token: ${error}`,
    });
  }
});
