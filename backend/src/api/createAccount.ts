import { app } from "../index.js";
import { dbConfig } from "./dbconnect.js";
import * as bcrypt from "bcrypt";
import "dotenv/config";

//hash password
//user will enter username, email, and password

app.post("create-account", async (c) => {
  const saltRounds = 10;

  try {
    const { username, email, password } = await c.req.json();

    const hashedPassowrd = await bcrypt.hash(password, saltRounds);

    //insert into db here

    const user =
      await dbConfig`INSERT INTO users (username, email, password, role, email_verified, status, profile_completed, refresh_token)
                VALUES (${username}, ${email}, ${hashedPassowrd}, user, ${false}, online, test)
                RETURNING id, username, email, created_at`;

    if (user.length > 0) {
      return c.json(
        {
          success: true,
          message: "Account created successfully!",
          data: user[0],
        },
        201,
      );
    } else {
      return c.json(
        {
          success: false,
          message: "Account creation failed",
        },
        400,
      );
    }
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
