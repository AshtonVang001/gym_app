import { app } from "../app.js";
import { dbConfig } from "./dbconnect.js";

app.post("/auth/logout", async (c) => {
  try {
    const { refreshToken } = await c.req.json();

    if (!refreshToken) {
      return c.json({ success: false, message: "No token provided" }, 400);
    }

    await dbConfig`DELETE FROM refresh_tokens WHERE token_hash = ${refreshToken}`;

    return c.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return c.json({ success: false, message: `Error: ${error}` }, 500);
  }
});
