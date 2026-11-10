import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// drizzle-kit corre fuera de Next, así que cargamos el .env igual que Next
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "./db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});