import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { sign } from "hono/jwt";
import crypto from "crypto";
import * as bcrypt from "bcrypt";
import "dotenv/config";

//this is going to be refresh token rotation
//for when an access token expires
//so this generates new access token and refresh token together
app.post("/auth/refresh", async (c) => {
  //recieve refresh token - frontend should send it through the payload
  //then revoke that token
  //then create a new one
  try {
    const { refreshToken, deviceInfo } = await c.req.json();

    const ID =
      await dbConfig`SELECT user_id, family_id FROM refresh_tokens WHERE token_hash = ${refreshToken}`;

    //revoke refresh token

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

    const hashedRefresh = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); //expiration of refresh

    const currentDate: Date = new Date();

    //revoke current refresh token
    await dbConfig`UPDATE refresh_tokens
    SET revoked_at = ${currentDate}, revoked = true`;

    //insert new token into db w same family id
    await dbConfig`INSERT INTO refresh_tokens (user_id, expires_at, created_at, token_hash, device_info, family_id, last_used_at, revoked)
    VALUES (${user[0].id}, ${exp}, ${currentDate}, ${hashedRefresh}, ${deviceInfo}, ${ID[0].family_id}, ${currentDate}, false)`;

    return c.json({
      success: true,
      message: "Successfully created new refresh token!",
      user: {
        id: user[0].id,
        username: user[0].username,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return c.json({
      message: `Could not create new token: ${error}`,
    });
  }
});
