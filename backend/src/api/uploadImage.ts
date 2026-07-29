import { app } from "../app.js";
import logger from "../utils/logger.js";
import { jwt } from "hono/jwt";

app.post(
  "/upload",
  jwt({
    secret: process.env.ACCESS_SECRET!,
    alg: "HS256",
  }),
  async (c) => {
    //verify access token
    //if its not valid then sends 401 to frontend
    //frontend calls refresh
    try {
      const payload = c.get("jwtPayload");

      console.log(payload);
      const body = await c.req.parseBody();
      const image = body["image"];
      console.log("image: ", image);
      return c.json({
        success: true,
        message: "Successfully uploaded image!",
        image: image,
      });
    } catch (error) {
      logger.error({ err: error }, "image upload error");
      return c.json({ success: false, message: `Error: ${error}` }, 500);
    }
  },
);
