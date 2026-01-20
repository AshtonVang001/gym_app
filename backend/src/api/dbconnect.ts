import postgres from "postgres";
import "dotenv/config";

const dbConfig = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export { dbConfig };
