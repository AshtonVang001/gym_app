import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
    base: { service: "gym-app" },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  },
  isDev
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:HH:MM:ss",
          ignore: "pid,hostname,service",
        },
      })
    : undefined,
);

export default logger;
