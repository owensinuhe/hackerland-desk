"use server";

import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { z } from "zod";
import { auth } from "@/lib/auth";

const LoginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Escribe tu usuario y contraseña." };

  try {
    // nextCookies() guarda la cookie de sesión automáticamente
    await auth.api.signInUsername({ body: parsed.data });
  } catch (err) {
    if (err instanceof APIError) {
      return { error: "Usuario o contraseña incorrectos." };
    }
    throw err;
  }

  redirect("/dashboard"); // fuera del try: redirect funciona lanzando un aviso interno
}