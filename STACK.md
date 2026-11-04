# Hackerland-Desk — Contexto del proyecto

> Archivo de memoria del proyecto. Resume **qué es, qué se decidió, bajo qué
> reglas y en qué punto vamos**, para dar contexto rápido al abrir una nueva
> sesión. Mantener breve y factual. Última actualización: 2026-11-03 (noche)

## Qué es
Panel de administración para una empresa de **telecomunicaciones**. Incluye
gestión de clientes, mesa de trabajo (helpdesk) y control de suscripciones/pagos
del servicio. Pensado para crecer: a futuro aceptará imágenes/adjuntos y
descargas (PDF). Se permiten elementos alusivos a telecom (íconos de señal, etc.).

## Stack (decidido)
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (v4 — se configura desde `globals.css`, no hay archivo `tailwind.config`)
- **Linter:** ESLint
- **Base de datos:** PostgreSQL
- **ORM:** Drizzle
- **Hosting app (inicial):** Vercel ✅ desplegado
- **Base en la nube (inicial):** Neon
- **Archivos (futuro):** object storage (ej. Cloudflare R2), NUNCA en la base
- **Tema claro/oscuro:** `next-themes` (instalado, aún sin usar)

## Convenciones y restricciones
- **Idioma de la app:** español (`lang="es"`).
- **Estructura:** sin carpeta `src/`; el código vive en la raíz (`app/`, `components/`).
- **Alias de imports:** `@/` apunta a la raíz (ej. `@/components/Logo`).
- **Componentes reutilizables** en `components/` (raíz). Regla: lo que se repite y es fijo (logo, barra) → `layout.tsx` o componente; lo único de una pantalla → su `page.tsx`.
- **Interactividad:** todo componente con estado/clics necesita `"use client"` al inicio (por defecto los componentes corren en el servidor).
- **Metadata solo en componentes de servidor:** `page.tsx`/`layout.tsx` sin `"use client"`; lo interactivo va en componentes aparte.
- **Portabilidad (importante):** debe ser fácil migrar de Vercel/Neon a un VPS.
  - Config sensible en variables de entorno (`DATABASE_URL`), nada hardcodeado. En Vercel se cargan en *Settings → Environment Variables*.
  - Usar el **driver TCP estándar de Postgres**, NO el driver serverless de Neon (evita lock-in).
  - Evitar funciones exclusivas de Vercel. Next corre con `next start` como server Node normal.
  - Deploy a VPS (futuro): vía Docker. **Kubernetes NO** (sobredimensionado).
- **Archivos binarios:** nunca en la base; solo URL + metadatos.
- **Cuentas de plataformas de desarrollo** (Vercel, Neon, etc.): entrar siempre con **GitHub**.

## Deploy y Git
- Repo: `github.com/owensinuhe/hackerland-desk` (privado). Rama `main`.
- Vercel: workspace `owensinuhe` (plan Hobby). URL: https://hackerland-desk.vercel.app/
- La app de Vercel en GitHub tiene acceso solo a este repo.
- **Cada `git push` a `main` redespliega solo.** Si el build falla en Vercel, sigue en línea la última versión buena.
- Flujo: `npm run dev` (trabajar) → `npm run build` (verificar en cambios grandes) → `git add .` + `git commit -m "..."` + `git push`.
- Antes de cambios grandes: commit como punto de guardado. Emergencia (deshacer lo no guardado): `git restore .` (no borra archivos nuevos; si cambió `package.json`, correr `npm install`).
- Alias `git subir "mensaje"` (add + commit + push). **Estado: pendiente verificar**; quedó mal guardado (sin comillas en `$1`). Debe configurarse desde **Git Bash** (PowerShell borra las comillas):
  `git config --global alias.subir '!f() { git add . && git commit -m "$1" && git push; }; f'`
  Comprobar con `git config --global alias.subir`. Si falla, usar los 3 comandos normales.
- Avisos CRLF→LF de Git en Windows: normales, ignorar.

## Modelo mental de Next (App Router) ya entendido
- Carpeta dentro de `app/` = ruta/URL. Archivo `page.tsx` = página visible de esa ruta.
- `layout.tsx` = plantilla que envuelve su página y todo lo anidado debajo; recibe la página en la prop `children` (Next la inyecta solo según la URL).
- El nombre de la función es libre; obligatorio: `export default` y que el archivo se llame `page.tsx`/`layout.tsx`.
- React da las piezas (componentes, props, children); Next da las reglas (rutas por carpeta, page/layout).
- `npm run build` genera la versión de producción en `.next` (no se sube a Git; Vercel hace su propio build).
- **Route groups** `(nombre)`: agrupan rutas con su propio layout sin aparecer en la URL. Cada página pasa por el layout raíz + el de su grupo.

## Arquitectura de layouts (decidida)
```
app/
├─ layout.tsx          ← raíz: <html>, tema, metadata (title). Envuelve todo
├─ login/page.tsx      → /login      (SIN barra, minimalista)
├─ (public)/
│  ├─ layout.tsx       ← NavigationGuest (logo → "/", "Iniciar sesión", luna)
│  └─ page.tsx         → /           (home, se moverá aquí)
└─ (app)/
   ├─ layout.tsx       ← panel lateral
   ├─ dashboard/       → /dashboard
   └─ clientes/, helpdesk/, ... (heredan el panel; layout extra solo si un módulo lo necesita)
```

## Estado actual de los archivos
- `app/layout.tsx` → metadata con plantilla: `title: { template: "Hackerland - %s", default: "Hackerland" }`, description "Panel de administración de Hackerland-Desk". `lang="es"`. Aún sin barra ni ThemeProvider.
- `app/page.tsx` → home: texto "Hackerland-Desk" centrado. Aún en la raíz (falta moverlo a `(public)`).
- `app/login/page.tsx` → login minimalista (logo + título + correo/contraseña + botón sin lógica).
- `app/dashboard/page.tsx` → placeholder con `metadata.title = "Tablero de mando"` (pestaña: "Hackerland - Tablero de mando").
- `components/Logo.tsx` → logo SVG de señal, prop `size`, usa `currentColor`.
- `app/globals.css` → ya tiene `@custom-variant dark (&:where(.dark, .dark *));` y el bloque `@media (prefers-color-scheme: dark)` se cambió por `.dark { ... }`. Resultado: **la app es siempre clara** (nadie pone la clase `dark` todavía). Decisión: así se queda hasta agregar el botón.
- `public/` → SVGs del template borrados.
- Posibles cambios sin commit: `globals.css` y `package.json` (next-themes). Revisar con `git status`.

## Próximo paso
1. Crear `components/NavigationGuest.tsx`: logo a la izquierda (`Link` a `/`), botón "Iniciar sesión" (`Link` a `/login`) a la derecha. **Sin luna por ahora.** Explicar parte por parte.
2. Crear `app/(public)/layout.tsx` con NavigationGuest y mover `app/page.tsx` a `app/(public)/page.tsx`.
3. Después: grupo `(app)` con panel lateral y mover `dashboard` ahí.

Más adelante (modo oscuro), solo sumar piezas:
- `components/ThemeProvider.tsx` (`"use client"`, NextThemesProvider `attribute="class"`, decidir `defaultTheme` "system" o "light"). Explicación ya dada.
- `components/ThemeToggle.tsx` (`"use client"`, `useTheme`, guard `mounted` con `useSyncExternalStore`, ícono luna/sol en SVG).
- En `layout.tsx` raíz: `suppressHydrationWarning` en `<html>` y envolver `children` con `<ThemeProvider>`.
- Agregar `<ThemeToggle />` en NavigationGuest.

## Pendientes por decidir / hacer
- [ ] Autenticación (solución y estrategia) — conectar el botón "Iniciar sesión"
- [ ] Modelo multi-cliente / multitenancy
- [ ] Librería de componentes UI
- [ ] Manejo de pagos / suscripciones
- [ ] Storage concreto para adjuntos
- [ ] Dónde vive Postgres en desarrollo (Docker local vs. Neon directo)
- [ ] Activar verificación en dos pasos en GitHub
- [ ] Reescribir `README.md` (aún es el de create-next-app) en español
- [ ] Más adelante: aprender ramas de Git

## Archivos de instrucciones (AGENTS.md / CLAUDE.md)
- Claude Code lee `AGENTS.md` de forma nativa (desde v2.1.277).
- Si existen `AGENTS.md` y `CLAUDE.md`, por defecto gana CLAUDE.md e ignora AGENTS.md.
- **Decisión:** mantener todo en `AGENTS.md` y NO crear `CLAUDE.md`. Si se necesita, que `CLAUDE.md` sea solo la línea `@AGENTS.md`.
- `AGENTS.md` debería referenciar este `STACK.md` como contexto de decisiones.

## Modo de trabajo
- El asistente **orienta y explica**; el dueño hace TODOS los cambios de código a mano.
- **Ir paso a paso:** un paso (o comando) a la vez, explicando qué hace cada cosa y por qué, antes de avanzar. El dueño está aprendiendo; no soltar muchos pasos de golpe.
- Pero cuando se arregla algo, dar la solución correcta y completa de una vez (sin idas y vueltas).
- El dueño tiene poca experiencia con Git y terminal: explicar comandos y qué salida esperar. Terminal: **Git Bash** (MINGW64).
- Explicaciones: máximo un párrafo de ~5 líneas, salvo que se pida profundizar.
- No dar recomendaciones de colores salvo que se pidan.