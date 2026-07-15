import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { sign } from "hono/jwt";
import crypto from "crypto";
import * as bcrypt from "bcrypt";
import "dotenv/config";

app.post("/auth/register", async (c) => {
  const saltRounds = 10;

  try {
    const { username, email, password, deviceInfo } = await c.req.json();
    console.log(username);

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return c.json(
        {
          success: false,
          message: "Username, email, and password are required.",
        },
        400,
      );
    }

    const hashedPassowrd = await bcrypt.hash(password, saltRounds);

    //insert into db here

    //fix this later rn some of the columns are not the correct data - like online status and what not
    const user =
      await dbConfig`INSERT INTO users (username, email, password, role, email_verified, status, profile_completed, refresh_token)
                VALUES (${username}, ${email}, ${hashedPassowrd}, 'user', ${false}, 'online', ${false}, 'test')
                RETURNING id, username, email, created_at`;

    const accessPayload = {
      sub: username,
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

    return c.json(
      {
        success: true,
        message: "Account created successfully!",
        user: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      201,
    );
  } catch (error) {
    console.error("Error createding account: ", error);
    return c.json(
      {
        success: false,
        message: `Account creation failed. Error: ${error}`,
      },
      500,
    );
  }
});
