import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";
import * as bcrypt from "bcrypt";
import "dotenv/config";

app.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const user =
      await dbConfig`SELECT id, email, password FROM users WHERE email = ${email}`;

      console.log(password)
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

    return c.json({
      success: true,
      message: "Successfully logged in!",
      user: {
        id: user[0].id,
        email: user[0].email,
      },
    });
  } catch (error) {
    return c.json({ success: false, message: `Error: ${error}` });
  }
});
