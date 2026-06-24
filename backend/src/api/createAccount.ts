import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { sign } from "hono/jwt";
import crypto from "crypto";
import * as bcrypt from "bcrypt";
import "dotenv/config";

//hash password
//user will enter username, email, and password

app.post("/auth/register", async (c) => {
  const saltRounds = 10;

  try {
    const { username, email, password, deviceInfo } = await c.req.json();
    console.log(username);

    const hashedPassowrd = await bcrypt.hash(password, saltRounds);

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return c.json(
        {
          success: false,
          message: "Username, email, and password are required.",
        },
        400,
      );
    }

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

    const secret = process.env.ACCESS_SECRET || "placeholder";

    const accessToken = await sign(accessPayload, secret);

    const refreshToken = crypto.randomBytes(64).toString("hex");

    const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // const refresh =
    await dbConfig`INSERT INTO refresh_tokens (user_id, expires_at, token_hash, device_info)
    VALUES (${user[0].id}, ${exp}, ${refreshToken}, ${deviceInfo})`;

    return c.json(
      {
        success: true,
        message: "Account created successfully!",
        data: user,
        accessToken: accessToken,
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
