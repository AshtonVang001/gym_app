import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import { createTokens } from "../utils/createTokens.js";
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

    //fix this later rn some of the columns are not the correct data - like online status and what not
    //right now role is hardcoded
    const user =
      await dbConfig`INSERT INTO users (username, email, password, role, email_verified, status, profile_completed)
                VALUES (${username}, ${email}, ${hashedPassowrd}, 'user', ${false}, 'online', ${false})
                RETURNING id, username, email, created_at`;

    const { accessToken, refreshToken } = await createTokens(user, deviceInfo);

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
