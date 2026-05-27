import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import * as bcrypt from "bcrypt";
import "dotenv/config";

//hash password
//user will enter username, email, and password

app.post("/auth/register", async (c) => {
  const saltRounds = 10;

  try {
    const { username, email, password } = await c.req.json();
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

    return c.json(
      {
        success: true,
        message: "Account created successfully!",
        data: user,
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
