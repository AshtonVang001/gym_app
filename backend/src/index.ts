import { serve } from "@hono/node-server";
import { app } from "./app.js";
import "./routes/auth/createAccount.js";
import "./routes/auth/login.js";
import "./routes/auth/logout.js";
import "./routes/tokens/refresh.js";
import "./routes/image/uploadImage.js";
import { physiqueRouter } from "./routes/scan/physique.js";
import "dotenv/config";
import logger from "./utils/logger.js";

app.route("/physique", physiqueRouter);

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
