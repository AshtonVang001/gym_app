import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { createTokens } from "../utils/createTokens.js";
import * as bcrypt from "bcrypt";
import "dotenv/config";
import logger from "../utils/logger.js";

app.post("/auth/login", async (c) => {
  try {
    const { email, password, deviceInfo } = await c.req.json();

    const user =
      await dbConfig`SELECT id, email, username, password FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      logger.warn({ email }, "login failed: user not found");
      return c.json(
        { success: false, message: "Invalid email or password" },
        401,
      );
    }

    const passowordMatches = await bcrypt.compare(password, user[0].password);

    if (!passowordMatches) {
      logger.warn({ email }, "login failed: wrong password");
      return c.json({ success: false, message: "Invalid email or password" }, 401);
    }

    const { accessToken, refreshToken } = await createTokens(user, deviceInfo);

    logger.info({ userId: user[0].id, username: user[0].username }, "login successful");
    console.log(accessToken);

    return c.json({
      success: true,
      message: "Successfully logged in!",
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    logger.error({ err: error }, "login error");
    return c.json({ success: false, message: `Error: ${error}` }, 500);
  }
});

//access and refresh token flow
//with every request the access token gets checked
//if access token is still valid that request gets a response
//if the access token is not valid check the refresh token
//if the refresh token is valid create a new access token (should be instantaneous, the user doesnt even notice)
//if the refresh token expires the user is logged out
