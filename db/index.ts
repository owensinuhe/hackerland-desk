import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./schema/auth";
import * as locationsSchema from "./schema/locations";

// Todas las tablas juntas, para que Drizzle y Better Auth las conozcan.
export const schema = { ...authSchema, ...locationsSchema };

// En desarrollo Next recarga los archivos al guardar; guardamos el pool
// en globalThis para no abrir una conexión nueva en cada recarga.
const globalForDb = globalThis as unknown as { pool?: Pool };

const pool =
  globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool, { schema });