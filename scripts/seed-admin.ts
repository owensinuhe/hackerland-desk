import { createInterface } from "node:readline/promises";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema/auth";

const ADMIN = {
  email: "owensinuhe@gmail.com",
  username: "owensinuhe",
  name: "Administrador",
};

async function main() {
  // Si ya existe, no hace nada (se puede correr varias veces sin duplicar)
  const existing = await db.query.user.findFirst({
    where: eq(user.email, ADMIN.email),
  });
  if (existing) {
    console.log("El admin ya existe, no se hizo nada.");
    return;
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const password = await rl.question("Contraseña para el admin (mín. 8 caracteres): ");
  rl.close();

  await auth.api.createUser({
    body: {
      email: ADMIN.email,
      password,
      name: ADMIN.name,
      role: "admin",
      data: { username: ADMIN.username, displayUsername: ADMIN.username },
    },
  });

  console.log("✅ Admin creado:", ADMIN.username);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });