import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";
import { db, schema } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: true, // nadie se registra solo; el admin crea los usuarios
  },

  plugins: [
    username(),    // iniciar sesión con usuario + contraseña
    admin(),       // roles (admin, técnico…), crear/bloquear usuarios
    nextCookies(), // permite iniciar sesión desde Server Actions (siempre al final)
  ],
});