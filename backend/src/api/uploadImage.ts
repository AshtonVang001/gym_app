import { app } from "../app.js";

import { jwt } from "hono/jwt";

app.get(
  "/upload",
  jwt({
    secret: process.env.ACCESS_SECRET!,
    alg: "HS256",
  }),
  async (c) => {
    const payload = c.get("jwtPayload");

    console.log(payload);

    return c.json({
      success: true,
      message: "Successfully uploaded image!",
      image: "placeholder",
    });
  },
);
