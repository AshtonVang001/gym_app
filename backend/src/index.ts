import { serve } from "@hono/node-server";
import { app } from "./app.js";
import "./api/createAccount.js";
import "./api/login.js";
import "./api/logout.js";
import "./api/refresh.js";
import "./api/uploadImage.js"
import "dotenv/config";
import logger from "./utils/logger.js";

serve(
  {
    fetch: app.fetch,
    port: 3000,
    hostname: "0.0.0.0",
  },
  (info) => {
    logger.info({ port: info.port }, "server started");
  },
);
