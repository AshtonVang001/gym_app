import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "./routes/auth/createAccount.js";
import "./routes/auth/login.js";
import "./routes/auth/logout.js";
import "./routes/auth/refresh.js";
import "./routes/scan/uploadImage.js";
import "dotenv/config";
import logger from "./utils/logger.js";
import authRoutes from "./routes/auth/index.js";
import scanRoutes from "./routes/scan/index.js";

export const routes = new Hono();

routes.route("/auth", authRoutes);
routes.route("/scan", scanRoutes);

serve(
  {
    fetch: routes.fetch,
    port: 3000,
    hostname: "0.0.0.0",
  },
  (info) => {
    logger.info({ port: info.port }, "server started");
  },
);
