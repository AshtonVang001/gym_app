import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import logger from "./utils/logger.js";

export const app = new Hono();

app.use("/*", cors({
  origin: `http://${process.env.IP_ADDRESS}:8081`,
  credentials: true,
}));

app.use("/*", async (c, next) => {
  const start = Date.now();
  const { method, url } = c.req.raw;
  const path = new URL(url).pathname;

  await next();

  const status = c.res.status;
  const ms = Date.now() - start;

  const log = status >= 500
    ? logger.error.bind(logger)
    : status >= 400
    ? logger.warn.bind(logger)
    : logger.info.bind(logger);

  log({ method, path, status, ms }, `${method} ${path} ${status}`);
});

app.get("/", (c) => c.text("Hello Hono!"));
