import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { sign } from "hono/jwt";
import crypto from "crypto";
import * as bcrypt from "bcrypt";
import "dotenv/config";

app.post("/auth/login", async (c) => {
  try {
    const { email, password, deviceInfo } = await c.req.json();

    const user =
      await dbConfig`SELECT id, email, username, password FROM users WHERE email = ${email}`;

    console.log(user[0].id);

    if (user.length === 0) {
      return c.json(
        { success: false, message: "Invalid email or passowrd" },
        401,
      );
    }

    const passowordMatches = await bcrypt.compare(password, user[0].password);

    if (!passowordMatches) {
      return c.json({ success: false, message: "Invalid email password" }, 401);
    }

    const accessPayload = {
      sub: user[0].username,
      role: user[0].role,
      exp: Math.floor(Date.now() / 1000) + 60 * 15, //15 minutes
    };

    const secret = process.env.ACCESS_SECRET || "placeholder";

    const accessToken = await sign(accessPayload, secret);

    const refreshToken = crypto.randomBytes(64).toString("hex");

    const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // const refresh =
    await dbConfig`INSERT INTO refresh_tokens (user_id, expires_at, device_info, token_hash)
    VALUES (${user[0].id}, ${exp}, ${deviceInfo}, ${refreshToken})`;

    console.log(refreshToken);

    return c.json({
      success: true,
      message: "Successfully logged in!",
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    return c.json({ success: false, message: `Error: ${error}` });
  }
});
